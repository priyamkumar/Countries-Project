import { useState, useEffect } from "react";
import CountryDetailShimmer from "./CountryDetailsShimmer";

export default function CountryDetails() {
  const countryName = new URLSearchParams(location.search).get("name");
  const [countryDetail, setCountryDetail] = useState(null);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setCountryDetail(data[0]);
        console.log(countryDetail)
      });
  }, []);

if(countryDetail === null)
{
  return <CountryDetailShimmer/>
}
  
  return (
    <div className="country-details-container">
      <span className="back-button">
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
      </span>
      <div className="country-details">
        <img src={countryDetail.flags.svg} alt={`${countryDetail.name.common} flag`} />
        <div className="details-text-container">
          <h1>{countryDetail.name.common}</h1>
          <div className="details-text">
            <p>
              <b>Native Name: {countryDetail.name.official}</b>
              <span className="native-name"></span>
            </p>
            <p>
              <b>Population: {countryDetail.population}</b>
              <span className="population"></span>
            </p>
            <p>
              <b>Region: {countryDetail.region}</b>
              <span className="region"></span>
            </p>
            <p>
              <b>Sub Region: {countryDetail.subregion}</b>
              <span className="sub-region"></span>
            </p>
            <p>
              <b>Capital: {countryDetail.capital?.[0]}</b>
              <span className="capital"></span>
            </p>
            <p>
              <b>Top Level Domain: {countryDetail.tld[0]}</b>
              <span className="top-level-domain"></span>
            </p>
            <p>
              <b>Currencies: {countryDetail.currencies[0]}</b>
              <span className="currencies"></span>
            </p>
            <p>
              <b>Languages: </b>
              <span className="languages"></span>
            </p>
          </div>
          <div className="border-countries">
            <b>Border Countries: </b>&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
