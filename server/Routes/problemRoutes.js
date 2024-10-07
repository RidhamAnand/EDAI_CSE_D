const express = require('express');
const router = express.Router();
const axios = require('axios');

const callOpenAI = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo', 
        prompt: prompt,
        max_tokens: 60,
        temperature: 0.0, 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to communicate with OpenAI API');
  }
};

// POST /api/problems/submit
router.post('/submit', async (req, res) => {
  const { userId, description } = req.body;

  if (!userId || !description) {
    return res.status(400).json({ message: 'userId and description are required.' });
  }

  try {
    const categoryPrompt = `Categorize the following disaster-related problem into one of the predefined categories (e.g., Health, Food, Shelter, Water, etc.):\n\nProblem: ${description}\n\nCategory:`;
    const category = await callOpenAI(categoryPrompt);

    const severityPrompt = `Assess the severity of the following disaster-related problem on a scale of 1 to 10, where 10 is the most severe:\n\nProblem: ${description}\n\nSeverity (1-10):`;
    let severityStr = await callOpenAI(severityPrompt);
    let severity = parseInt(severityStr);
    if (isNaN(severity) || severity < 1 || severity > 10) severity = 5; 

    const priorityPrompt = `Assign a priority score between 1 and 10 for addressing the following disaster-related problem. Consider the severity and urgency:\n\nProblem: ${description}\n\nSeverity: ${severity}\n\nPriority (1-10):`;
    let priorityStr = await callOpenAI(priorityPrompt);
    let priority = parseInt(priorityStr);
    if (isNaN(priority) || priority < 1 || priority > 10) priority = 5; 

   



  
    res.status(201).json({
      category,
      severity,
      priority,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
