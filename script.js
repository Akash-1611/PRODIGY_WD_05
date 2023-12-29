document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '57374d33d772ff574d415b22019bf4a0';
    const form = document.getElementById('location-form');
    const locationBtn = document.getElementById('location-btn');

    
    const getWeather = async (location) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError();
        }
    };

    
    const displayWeather = (data) => {
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    };

    
    const displayError = () => {
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = '<p class="error">Error fetching weather data. Please try again.</p>';
    };

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const locationInput = document.getElementById('location');
        const location = locationInput.value.trim();

        if (location !== '') {
            getWeather(location);
        }
    });

    
    locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                getWeatherByCoordinates(latitude, longitude);
            }, () => {
                displayError();
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    
    const getWeatherByCoordinates = async (latitude, longitude) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError();
        }
    };
});
