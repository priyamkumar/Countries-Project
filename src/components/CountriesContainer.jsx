import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesContainer({query, regionQuery}) {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCountryData(data);
      });
  }, []);

  if (!countryData.length) {
    return <CountriesListShimmer />;
  }

  return (
    <div className="countries-container">
      {countryData
        .filter(
          (country) =>
            country.name.common.toLowerCase().includes(query) 
        ).filter(
          (country) =>
            country.region.toLowerCase().includes(regionQuery)
        )
        .map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0]}
            data={country}
          />
        ))}
    </div>
  );
}
