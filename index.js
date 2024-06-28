document.addEventListener('DOMContentLoaded', function() {
   let apiKey = 'ea712579bc237cf2d06efae53a72fb35';
   let city = 'munich';
   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
           let message = `${temp} degrees Celsius  ${name}!`;
           
           document.getElementById('weather').textContent = message;
           document.getElementById('weather-icon').src = iconUrl;

           console.log(message);
           console.log(`Weather icon URL: ${iconUrl}`);
       })
       .catch(error => {
           console.error('Fetching error:', error);
       });
});
