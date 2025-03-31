import React, { useState } from 'react';
import './App.css';

function App() {
    const [imageUrl, setImageUrl] = useState('');
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');

    const fetchAnimalImage = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/random-animal');
            const data = await response.json();
            setImageUrl(data.imageUrl);
        } catch (error) {
            console.error('Error fetching the animal image:', error);
            setImageUrl('');
        }
    };

    const fetchWeather = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error fetching the weather data:', error);
            setWeather(null);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1 className="title">Funky Random Animals and Weather Checker</h1> {/* Updated title */}
            </header>
            <main className="main-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <section className="section" style={{ flex: 1, marginRight: '10px' }}>
                    <h2>Random Animal Generator</h2>
                    <button onClick={fetchAnimalImage}>Get Random Animal</button>
                    {imageUrl && (
                        <div className="image-container">
                            <img src={imageUrl} alt="Random Animal" className="animal-image" />
                        </div>
                    )}
                </section>
                <section className="section" style={{ flex: 1, marginLeft: '10px' }}>
                    <h2>Weather App</h2>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                fetchWeather();
                            }
                        }}
                        className="input"
                    />
                    <button onClick={fetchWeather}>Get Weather</button>
                    {weather && (
                        <div className="weather-container">
                            <div className="weather-header">
                                <h3>{weather.city}</h3>
                                <img src={weather.icon} alt="Weather Icon" />
                            </div>
                            <div className="weather-details">
                                <p className="temperature">{weather.temperature}°C</p>
                                <p className="description">{weather.description}</p>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <footer className="footer">
                <p>© 2023 Funky Animal & Weather App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
