import "./MainSection.scss";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import rain from "../Assets/rain.jpg";
import Loading from "./Loading";
import { useEffect, useState } from "react";
const MainSection = () => {
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState([]);

  // Function to fetch cities from the API based on the search text
  const fetchCities = async (searchText) => {
    await fetch(
      `http://api.geonames.org/searchJSON?q=${searchText}&maxRows=10&username=kajolvish`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        setCityList(data.geonames);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to fetch current weather data for the selected city
  const fetchCurrentWeather = async (selectedCity) => {
    setCurrentWeather("");
    await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=80d41fa0812040d3a50161959231707&q=${selectedCity}&days=3`
    )
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((data) => {
        setCurrentWeather(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handler for city selection in the Autocomplete component
  const handleCityChange = (event, value) => {
    setSelectedCity(value);
  };

  // Helper function to format date in the format "Day Month"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  // Fetch current weather data when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      setCurrentWeather([]);
      fetchCurrentWeather(selectedCity);
    }
    if (!selectedCity) {
      setCurrentWeather([]);
    }
  }, [selectedCity]);
  return (
    <div id="main-section">
      <div className="search-input">
        <Autocomplete
          freeSolo
          id="input-field"
          sx={{ width: 600 }}
          options={cityList.map((option) => option?.toponymName)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "City",
              }}
              placeholder="Search City..."
              onChange={(event) => {
                fetchCities(event.target.value);
              }}
            />
          )}
          onChange={handleCityChange}
          defaultValue=""
          value={selectedCity}
        />
      </div>
      {currentWeather?.current ? (
        <>
          <div className="main-card-container">
            <Card
              sx={{ minWidth: 800 }}
              image={rain}
              className="main-card-wrapper"
            >
              <CardMedia sx={{ height: 140 }} title={selectedCity} />
              <CardContent className="main-card-content">
                <div className="main-card-content-left">
                  <Typography variant="h2" component="div">
                    {currentWeather?.location?.name}
                    <span style={{ fontSize: 18 }}>
                      {" "}
                      &nbsp;
                      {currentWeather?.location?.region},&nbsp;
                      {currentWeather?.location?.country}
                    </span>
                  </Typography>
                  <Typography variant="body1" component="div"></Typography>
                  <Typography variant="h6" component="div">
                    {formatDate(currentWeather?.location?.localtime)}
                  </Typography>
                </div>
                <div className="main-card-content-middle">
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    {currentWeather?.current?.temp_c}°C
                  </Typography>
                  <Typography variant="body2" component="div">
                    {currentWeather?.current?.condition?.text}
                  </Typography>
                </div>
                <div className="main-card-content-right">
                  <img
                    src={`http:${currentWeather?.current?.condition?.icon}`}
                    alt="Weather Icon"
                    width="100px"
                    height="100px"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="forecast-container">
            <div className="forecast-wrapper">
              {currentWeather?.forecast?.forecastday.map((item) => (
                <Card
                  className="forecast-card-wrapper"
                  sx={{ minWidth: 300, maxWidth: 600, minHeight: 300 }}
                  key={item.date}
                >
                  <CardContent>
                    <div className="forecast-card-container-left">
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{ fontWeight: 700 }}
                      >
                        {item?.day?.avgtemp_c}°C
                      </Typography>
                      <Typography variant="h6" color="white">
                        {formatDate(item?.date)}
                      </Typography>
                    </div>
                    <div className="forecast-card-container-right">
                      <img
                        src={`http:${item?.day?.condition?.icon}`}
                        alt="Weather Icon"
                        width="100px"
                        height="100px"
                      />
                      <Typography variant="h6" color="white">
                        {item?.day?.condition?.text}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : !currentWeather?.current && selectedCity ? (
        <Loading />
      ) : (
        <></>
      )}
    </div>
  );
};
export default MainSection;
