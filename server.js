const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Middleware to parse JSON
app.use(express.json());

// API Endpoint to grab "system status" and skills for the portfolio
app.get('/api/skills', (req, res) => {
    res.json({
        status: 'online',
        uptime: process.uptime(),
        backend: ['FastAPI', 'Node.js', 'Express', 'MySQL', 'SQLite'],
        ai_ml: ['Scikit-Learn', 'LLaMA 2', 'Gemma', 'Ollama', 'LangChain'],
        systems: ['Docker', 'Linux', 'Raspberry Pi 5', 'ESP-32'],
        message: 'System systems nominal. Neural pathways connected.'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving static files from ${path.join(__dirname, 'public')}`);
});
