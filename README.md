Smart Weather App
A simple weather app built with React and Material-UI that allows users to search for a city and view its current weather and a 3-day forecast.

Features
Search for a city and view its current weather.
Display a 3-day weather forecast for the selected city.
Show loading spinner while fetching weather data.
Support for auto-suggestion when searching for cities.
Technologies Used
React.js
Material-UI
Axios (for API requests)
Geonames API (for city search)
WeatherAPI (for weather data)
Getting Started
To get started with the project, follow these steps:

Clone the repository:
bash
Copy code
git clone git@github.com:kajol-vish/smart-weather.git
cd weather-app
Install the dependencies:
bash
Copy code
npm install
Run the development server:
bash
Copy code
npm start
The app should now be running on http://localhost:3000.

Configuration
The app uses two APIs for fetching data: Geonames API for city search and WeatherAPI for weather data. To use these APIs, you need to sign up and get the API keys.

Get Geonames API key:

Sign up for an account at Geonames.
Once logged in, go to the API key request page and follow the instructions to get your API key.
Add your Geonames API key in the fetchCities function in MainSection.js file.
Get WeatherAPI key:

Sign up for an account at WeatherAPI.
Once logged in, go to the API key page and get your API key.
Add your WeatherAPI key in the fetchCurrentWeather function in MainSection.js file.

Acknowledgments
The weather icons used in this app are provided by WeatherAPI.
Thanks to Material-UI for providing the beautiful UI components.
Feel free to make any adjustments to the README file based on your actual project details and preferences. Remember to update the placeholders such as <kajol_vish> with your actual GitHub username and provide proper credit and links to any third-party resources used in the project.
