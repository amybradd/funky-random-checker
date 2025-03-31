require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Ensure cors is installed: npm install cors
const https = require('https');
const app = express();
const port = 3000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Use environment variable for origin
}));

const quotes = [
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "Your time is limited, so don’t waste it living someone else’s life.",
    "The only way to do great work is to love what you do.",
    "If you can dream it, you can achieve it."
];

// Create an HTTPS agent that ignores SSL certificate errors
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

app.get('/api/random-animal', async (req, res) => {
    try {
        // Use Dog CEO API to fetch a random dog image
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        res.json({ imageUrl: response.data.message }); // Return the image URL
    } catch (error) {
        console.error('Error fetching random animal image:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        res.status(500).json({ error: 'Failed to fetch random animal image' });
    }
});

app.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'London'; // Default to London if no city is provided
    const apiKey = process.env.OPENWEATHER_API_KEY; // Use environment variable for API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
