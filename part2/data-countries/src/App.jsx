
import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import CountryServer from './services/CountryServer'
import WeatherServer from './services/WeatherServer'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [details, setDetails] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)


  useEffect(() => {
    CountryServer
      .getAll()
      .then(initCountries => setCountries(initCountries))
  }, [])


  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const countryToSelect = selectedCountry || (filteredCountries.length === 1 ? filteredCountries[0].name.common.toLowerCase() : null)
  const handleClick = (e) => {
    setSelectedCountry(e.currentTarget.id)
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  };
  useEffect(() => {
    if (!countryToSelect) {
      setDetails(null)
      setWeatherInfo(null)
      return
    }
    CountryServer
      .getByCountry(countryToSelect.toLowerCase())
      .then((countryData) => {
        setDetails(countryData)
        if (countryData.capitalInfo?.latlng?.length >= 2) {
          const [lat, long] = countryData.capitalInfo.latlng

          WeatherServer
            .getWeather(lat, long)
            .then(weatherData => setWeatherInfo(weatherData))
        } else {
          setWeatherInfo(null)
        }
      })


  }, [countryToSelect]);




  return (
    <div>
      find countries{' '}
      <input value={filter} onChange={handleFilterChange} />
      <div>
        <Countries filterCountries={filteredCountries} details={details} weather={weatherInfo} handleClick={handleClick} />
      </div>
      <div>

      </div>
    </div>
  );
};

export default App;
