import axios from "axios"
import { useEffect, useState } from "react"

const api_key = process.env.REACT_APP_API_KEY

console.log(api_key);

const Weather = ({ capital }) => {
    const [weatherInfo, setWeatherInfo] = useState({})

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => setWeatherInfo(response.data))
    }, [capital])

    console.log(weatherInfo)

    return(
        <div>
            <h2>Weather on {capital}</h2>

            <p>
                temperature is {weatherInfo.main?.temp} Celsius
            </p>

            {
                weatherInfo?.weather 
                ? <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={`Icon ${weatherInfo.weather[0].description}`}/>
                : <p>Loading...</p>
            }
            
            <p>
                wind is {weatherInfo.wind?.speed} m/s
            </p>
        </div>
    )
}

const CountryInfo = ({ country }) => {
    const languageKeys = Object.keys(country.languages)

    console.log(languageKeys);

    return (
        <div>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {
                    languageKeys.map((languageKey) => {
                        return (<li key={languageKey}>{country.languages[languageKey]}</li>)
                    })
                }
            </ul>
            <img src={`${country.flags.png}`} alt={`${country.name.common + 'flag'}`} />
            <Weather capital={country.capital}/>
        </div>
    )
}


export default CountryInfo