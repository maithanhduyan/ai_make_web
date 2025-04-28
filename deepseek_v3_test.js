import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Together from "together-ai";
import checkUser from "./middlewares/checkUser.js";
import { PROVIDERS } from "./utils/providers.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

app.use(cookieParser());
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

const PORT = process.env.APP_PORT || 3000;

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/api/@me", async (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/ask-ai", async (req, res) => {
  const { prompt, html, previousPrompt, provider } = req.body;
  console.log("Received prompt:", prompt.toString());
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `ONLY USE HTML, CSS AND JAVASCRIPT. If you want to use ICON make sure to import the library first. Try to create the best UI possible by using only HTML, CSS and JAVASCRIPT. Use as much as you can TailwindCSS for the CSS, if you can't do something with TailwindCSS, then use custom CSS (make sure to import <script src="https://cdn.tailwindcss.com"></script> in the head). Also, try to ellaborate as much as you can, to create something unique. ALWAYS GIVE THE RESPONSE INTO A SINGLE HTML FILE`,
        },
        { role: "user", content: prompt.toString() },
      ],
      model: "deepseek-ai/DeepSeek-V3",
    });

    // Set up response headers for streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // res.json({ reply: response.choices[0].message.content.toString() });
    console.log(
      "Received content:",
      response.choices[0].message.content.toString()
    );
    res.write(response.choices[0].message.content.toString());
  } catch (error) {
    res.status(500).json({ error: "Error generating response." });
  }
});

// Start http server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
