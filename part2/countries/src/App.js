import { useEffect, useState } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
const MAX_COUNTRIES = 10

function App() {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
  }, [])

  const handleFilter = (e) => setNameFilter(e.target.value)
  
  let countriesToShow = countries.filter((country) => country?.name?.common.toLowerCase().includes(nameFilter.toLowerCase()))
  console.log(countriesToShow)
  return (
    <div>
      find countries: <input value={nameFilter} onChange={handleFilter}/>

      {
        countriesToShow.length > MAX_COUNTRIES 
        ? <p>Too many matches, specify another filter</p> 
        : countriesToShow.map((country) => {
          return(
            <div key={country.name.common}>
              <p>
                {country.name.common}
              </p>
              {countriesToShow.length > 1 ? <button onClick={(event) => setNameFilter(country.name.common)}>Show</button> : <></>}
              {console.log(countriesToShow)}
            </div>
          )
        })
      }

      {
        countriesToShow.length === 1 ? <CountryInfo country={countriesToShow[0]}/> : <></>
      }

    </div>
  )
}

export default App;
