import { useState } from "react";
import Search from "./Search.jsx";
import Dropdown from "./dropdown.jsx";
import CountriesContainer from "./CountriesContainer.jsx";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [isDark] = useOutletContext();

  return (
    <>
      <main className={`${isDark? 'dark' : ''}`}>
        <div className="search-filter-container">
          <Search setQuery={setQuery}/>
          <Dropdown />
        </div>
        <CountriesContainer query={query}/>
      </main>
    </>
  );
}

export default Home;