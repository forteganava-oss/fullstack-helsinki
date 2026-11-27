const Countries = ({ filterCountries, details, handleClick,weather }) => {
    if (filterCountries.length > 10) {
        return (
            <div>Too many matches escpecify another filter</div>
        )
    }
    if (details) {
        return (
            <Country details={details} weather={weather} />
        )
    }

    return (
        filterCountries.map((country) => (
            <div key={country.cca3}>{country.name.common}
                <button onClick={handleClick} id={country.name.common.toLowerCase()}>Show</button></div>
        ))
    )
}

const Country = ({ details, weather }) => {
    return (<>
        <h1>{details.name.common}</h1>
        <div>Capital {details.capital}</div>
        <div>Area {details.area} </div>
        <h2>Languages</h2>
        <ul>
            {Object.keys(details.languages).map(lang => {
                return (
                    <li key={lang}>{lang}</li>
                )
            })}
        </ul>
        <img src={details.flags.png} alt={details.flags.alt} />
        <Weather capital={details.capital} weather={weather}/>
    </>
    )
}

const Weather = ({capital,weather}) => {
    if (!weather) return null
    return (
        <div>
                <h2>Weather in {capital}</h2>
                <div>Temperature {weather.temperature_2m} Celsius</div>
                <div>Wind {weather.wind_speed_10m} m/s</div>
            </div>
    )
} 

export default Countries