import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailsShimmer";
import "./CountryDetails.css";
import { ThemeContext } from "../contexts/ThemeContext";

export default function CountryDetails() {
  const params = useParams();
  const countryName = params.CountryDetail;
  console.log(countryName);
  const [isDark] = useContext(ThemeContext);

  const [countryDetail, setCountryDetail] = useState(null);
  const { state } = useLocation();
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(data) {
    setCountryDetail({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      flag: data.flags?.svg,
      tld: data.tld,
      languages: Object.values(data.languages || {}).join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      borders: [],
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryDetail({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          flag: data.flags.svg,
          tld: data.tld,
          languages: Object.values(data.languages).join(', '),
          currencies: Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(', '),
          borders: []
        });
        // updateCountryData(state);
        console.log(countryDetail);
        
        if(!data.borders) {
          data.borders = []
        }

        Promise.all(data.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
        })).then((borders) => {
          setTimeout(setCountryDetail((prevState) => ({...prevState, borders })))
        })
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country not found</div>;
  }

  if (countryDetail === null) {
    return <CountryDetailShimmer />;
  }

  return (
    <main className={`${isDark? 'dark' : ''}`}>
    <div className="country-details-container">
      <span className="back-button" onClick={() => history.back()}>
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
      </span>
      <div className="country-details">
        <img src={countryDetail.flag} alt={`${countryDetail.name} flag`} />
        <div className="details-text-container">
          <h1>{countryDetail.name}</h1>
          <div className="details-text">
            <p>
              <b>Native Name: {countryDetail.nativeName}</b>
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
              <b>Capital: {countryDetail.capital?.join(", ")}</b>
              <span className="capital"></span>
            </p>
            <p>
              <b>Top Level Domain: {countryDetail.tld}</b>
              <span className="top-level-domain"></span>
            </p>
            <p>
              <b>Currencies: {countryDetail.currencies}</b>
              <span className="currencies"></span>
            </p>
            <p>
              <b>Languages: {countryDetail.languages}</b>
              <span className="languages"></span>
            </p>
          </div>
          {countryDetail.borders.length !== 0 && (
            <div className="border-countries">
              <b>Border Countries: {
              countryDetail.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)}</b>&nbsp;
            </div>
          )}
        </div>
      </div>
    </div>
    </main>
  );
}
