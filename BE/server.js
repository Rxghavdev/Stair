const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
dotenv.config();

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// OpenRouter API key and URL setup using environment variables
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY, // Use API key from .env
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL, // Use site URL from .env
    "X-Title": process.env.SITE_NAME, // Use site name from .env
  },
});

// POST route to handle chatbot queries
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // Call OpenRouter API for generating a response
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo-0125", // Use OpenRouter GPT-3.5
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // Send the generated response back to the frontend
    return res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
