
import { useState } from 'react';
import './App.css';

const api = {
  key: "[get key from site]",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setWeather(result)
        console.log(result)
      }) 
    }
  }

  const dateBuilder = (d)=>{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
    
  }

  return (
    <div className={weather.main ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown= {search} 
          />
        </div>
        {weather.main ? 
          (<>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {`${Math.round(weather.main.temp)}°c`}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </> )
          :
          <>
            {weather.cod &&
            <div className="weather-box">
            <div className="temp">
              {`${weather.cod}`}
            </div>
            <div className="weather">{weather.message}</div>
          </div>
            }
            
          </>
          
        }
        
       
      </main>
      
    </div>
  );
}

export default App;
