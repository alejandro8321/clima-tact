import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Col, Row } from "react-bootstrap";
import { DEVICE_SIZES } from "react-bootstrap/esm/createUtilityClasses";


const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=> {
        setWeather(result);
        setQuery('');
        //console.log(result)
      });
    }
  }

  const datebuilder = (d)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const day = days[d.getDay()];
    const date  = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (

    <Container fluid className={(typeof weather.main != "undefined") ? ((weather.main.temp > 70) ? 'app warm'  : 'app'): 'app'}>

    
      <Col>
        <Row className="p-4">
          <div className="search-box">
            <input 
            type="text" 
            placeholder="City Name..." 
            className="search-bar"
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
              />
          </div>
        </Row>

        <Row >
        {
          (typeof weather.main != "undefined") ? 
          (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{datebuilder(new Date())}</div>
            </div>


            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}℉
              </div>
              <div className="weather">
                {weather.weather[0].description}
              </div>
            </div>


            <div className="extra-container">
                <div className="extra-weather-box">
                  <div className="main-extra">
                    {/* <div className="feel_like">Feels like: {Math.round(weather.main.feels_like)} ℉</div> */}
                    <div>Lo: {Math.round(weather.main.temp_min)} ℉</div>
                    <div>Hi: {Math.round(weather.main.temp_max)} ℉</div>
                  </div>
                </div>

                <div className="extra-weather-box">
                        <div>Pressure: {weather.main.pressure} hPa</div>
                        <div>Humidity: {weather.main.humidity} %</div>
                </div>

                <div className="extra-weather-box">
                  <div>Wind Speed: {weather.wind.speed} mph</div>
                  <div className="clouds">Cloudiness: {weather.clouds.all}%</div>
                </div>
            </div>




          </div>
          )
          :
          (
            ''
          )
        }
        </Row>
        
      </Col>


        
     

    </Container>

   

     
   
  );
}

export default App;
