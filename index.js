document.addEventListener('DOMContentLoaded', function() {
   let apiKey = 'your-api-key-here';
   let weatherElement = document.getElementById('weather');
   let weatherIcon = document.getElementById('weather-icon');
   let cityInput = document.getElementById('city-input');
   let getWeatherButton = document.getElementById('get-weather');

   // Function to fetch weather data by city name
   function fetchWeatherByCity(city) {
       let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
       fetchWeather(url);
   }

   // Function to fetch weather data by coordinates
   function fetchWeatherByCoords(lat, lon) {
       let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
       fetchWeather(url);
   }

   // Function to fetch weather data
   function fetchWeather(url) {
       fetch(url)
           .then(response => {
               if (!response.ok) {
                   throw new Error('Network response was not ok ' + response.statusText);
               }
               return response.json();
           })
           .then(weather => {
               let temp = weather.main.temp;
               let name = weather.name;
               let iconCode = weather.weather[0].icon;
               let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
               let message = `${temp} degrees Celsius in ${name}!`;

               weatherElement.textContent = message;
               weatherIcon.src = iconUrl;

               console.log(message);
               console.log(`Weather icon URL: ${iconUrl}`);
           })
           .catch(error => {
               console.error('Fetching error:', error);
               weatherElement.textContent = 'Unable to fetch weather data.';
           });
   }

   // Get weather data based on user input
   getWeatherButton.addEventListener('click', function() {
       let city = cityInput.value;
       if (city) {
           fetchWeatherByCity(city);
       }
   });

   // Get weather data based on current location
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
           let lat = position.coords.latitude;
           let lon = position.coords.longitude;
           fetchWeatherByCoords(lat, lon);
       }, error => {
           console.error('Geolocation error:', error);
           weatherElement.textContent = 'Unable to retrieve your location.';
       });
   } else {
       weatherElement.textContent = 'Geolocation is not supported by this browser.';
   }
});
