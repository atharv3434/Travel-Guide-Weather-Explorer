const weatherAPIKey = "YOUR_OPENWEATHER_API_KEY";
const geoDBAPIKey = "YOUR_GEO_DB_API_KEY";

function fetchData() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    fetchWeather(city);
    fetchAttractions(city);
    loadMap(city);
}

// 🌦 Fetch Weather Data
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather").innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>☁ Condition: ${data.weather[0].description}</p>
                <p>💨 Wind Speed: ${data.wind.speed} km/h</p>
            `;
        })
        .catch(error => alert("Could not fetch weather data."));
}

// 🏛 Fetch Top Attractions
function fetchAttractions(city) {
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`, {
        headers: { "X-RapidAPI-Key": geoDBAPIKey }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data.length === 0) {
            document.getElementById("attractions").innerHTML = "<p>No attractions found.</p>";
            return;
        }

        let attractionsHTML = `<h2>Top Attractions in ${city}</h2>`;
        attractionsHTML += data.data.map(place => `<p>🏙 ${place.city}, ${place.country}</p>`).join("");
        document.getElementById("attractions").innerHTML = attractionsHTML;
    })
    .catch(error => alert("Could not fetch attractions."));
}

// 🗺 Load Map with Google Maps
function loadMap(city) {
    document.getElementById("map").innerHTML = `
        <iframe width="100%" height="300"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${city}"
            frameborder="0" allowfullscreen>
        </iframe>
    `;
}
