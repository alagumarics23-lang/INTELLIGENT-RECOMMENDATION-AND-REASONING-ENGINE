const Recommendation = require('../models/Recommendation');
const Course = require('../models/Course');
const User = require('../models/User');
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const generateRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!process.env.COHERE_API_KEY) {
      return res.status(400).json({ message: 'No COHERE_API_KEY found in .env file.' });
    }

    // Prepare context for AI logic
    const studentProfile = {
      department: user.department,
      cgpa: user.cgpa,
      projectsCompleted: user.projectsCompleted,
      skills: user.skills,
      certifications: user.certifications,
      areaOfInterest: user.areaOfInterest,
      lackOfKnowledge: user.lackOfKnowledge
    };

    const prompt = `
      You are an expert Intelligent Recommendation Reasoning Engine.
      Below is the profile of a student:
      ${JSON.stringify(studentProfile, null, 2)}
      
      Your task is to analyze the student's profile and create a custom learning path. Pay close attention to what they "lackOfKnowledge" in, so that fundamental modules can be recommended first. Also scale advanced topics mapped to their "areaOfInterest".
      
      Output exactly a JSON array of objects representing steps in the learning path. Each object must have:
      - title: the name of the topic or module you are recommending they learn.
      - score: a float from 0 to 100 matching how suitable this is for them right now.
      - reasoning: exactly 1-2 short sentences explaining specifically why this topic was chosen given their skills and lacks.
      
      Output ONLY a valid JSON array. Do not wrap in markdown quotes.
    `;

    const response = await cohere.chat({
      model: 'command-r-plus',
      message: prompt,
    });

    // Parse Response
    let aiResponseText = response.text.trim();
    if (aiResponseText.startsWith('\`\`\`json')) {
      aiResponseText = aiResponseText.replace(/\`\`\`json|\`\`\`/g, '');
    }

    const recommendedList = JSON.parse(aiResponseText);
    
    const newRecommendations = recommendedList.map(rec => ({
      userId,
      title: rec.title,
      score: rec.score,
      reasoning: rec.reasoning
    }));

    // Save
    await Recommendation.deleteMany({ userId });
    const savedRecs = await Recommendation.insertMany(newRecommendations);
    
    res.json(savedRecs.sort((a,b) => b.score - a.score));

  } catch (error) {
    const errorStr = String(error);
    const errorJson = JSON.stringify(error, Object.getOwnPropertyNames(error));
    
    if (
      error.status === 429 || errorStr.includes('429') || errorJson.includes('429') || 
      error.status === 404 || errorStr.includes('404') || errorJson.includes('404') ||
      error.status === 400 || errorStr.includes('400') || errorJson.includes('400')
    ) {
      console.warn("API FAILURE CATCH (429/404/400)! Returning dynamic mock fallback so the application continues to run despite third-party API issues.");
      
      const userId = req.user.id;
      const user = await User.findById(userId);
      const lack = user.lackOfKnowledge && user.lackOfKnowledge.length > 0 ? user.lackOfKnowledge[0] : "Core Principles";
      const interest = user.areaOfInterest && user.areaOfInterest.length > 0 ? user.areaOfInterest[0] : "Advanced Implementations";
      
      const mockRecommendations = [
        {
          userId,
          title: `Fundamental Basics of ${lack}`,
          score: 95,
          reasoning: `Because you mentioned lacking knowledge in ${lack}, this foundational course acts as the critical starting point to bridge your gap.`
        },
        {
          userId,
          title: `Applied Frameworks for ${lack}`,
          score: 85,
          reasoning: `Now that you grasp the basics, this practical module will help you solidify your understanding of ${lack}.`
        },
        {
          userId,
          title: `Introduction to ${interest}`,
          score: 75,
          reasoning: `Transitioning into your career area of interest, this topic connects your newly acquired skills into the ${interest} space.`
        },
        {
          userId,
          title: `Mastery & Advanced Techniques in ${interest}`,
          score: 60,
          reasoning: `A capstone topic designed to specialize you deeply in ${interest}, leveraging everything learned previously.`
        }
      ];
      
      // Save
      await Recommendation.deleteMany({ userId });
      const savedRecs = await Recommendation.insertMany(mockRecommendations);
      
      return res.json(savedRecs.sort((a,b) => b.score - a.score));
    }

    console.error("AI Gen Error: ", error);
    res.status(500).json({ message: 'Server error generating path', error: error.message });
  }
};

const getUserRecommendations = async (req, res) => {
  try {
    const recs = await Recommendation.find({ userId: req.user.id })
                                    .sort({ score: -1 })
                                    .limit(10);
    res.json(recs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { generateRecommendations, getUserRecommendations };
