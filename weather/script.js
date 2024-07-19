document.getElementById('cityForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const cityName = document.getElementById('cityInput').value.trim();
    const apiKey = 'f7f72366b63326d3b2e6c3fe0546fe38'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
      
      // Update city name
      document.getElementById('cityName').textContent = data.name;
      
      // Update weather details
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      document.getElementById('weatherDetails').textContent = `${weatherDescription}, Humidity: ${humidity}%, Wind: ${windSpeed} km/hr`;
      
      // Update temperature
      const temperature = Math.round(data.main.temp);
      document.getElementById('temperature').textContent = `${temperature}°C`;
      
      // Update weather icon
      const weatherIcon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      document.getElementById('weatherIcon').innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
      
      // Fetch forecast data
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
      } else {
        throw new Error('Forecast data not available');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error (e.g., display a message to the user)
    }
  });
  
  function displayForecast(data) {
    const forecastElements = data.list.slice(0, 5).map(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const icon = item.weather[0].icon;
      const maxTemp = Math.round(item.main.temp_max);
      const minTemp = Math.round(item.main.temp_min);
      
      return `
        <div class="col">
          <div>${day}</div>
          <div><img src="http://openweathermap.org/img/w/${icon}.png" alt="Forecast Icon"></div>
          <div>${maxTemp}° &nbsp;<span>${minTemp}°</span></div>
        </div>
      `;
    });
    
    document.getElementById('forecast').innerHTML = forecastElements.join('');
  }
  