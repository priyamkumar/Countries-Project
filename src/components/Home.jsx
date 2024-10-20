import { useState } from "react";
import Search from "./Search.jsx";
import Dropdown from "./Dropdown.jsx";
import CountriesContainer from "./CountriesContainer.jsx";
import { useTheme } from "../hook/useTheme.jsx";

function Home() {
  const [query, setQuery] = useState("");
  const [regionQuery, setRegionQuery] = useState("");
  const [isDark] = useTheme();

  return (
    <>
      <main className={`${isDark? 'dark' : ''}`}>
        <div className="search-filter-container">
          <Search setQuery={setQuery} setRegionQuery={setRegionQuery}/>
          <Dropdown setRegionQuery={setRegionQuery}/>
        </div>
        <CountriesContainer query={query} regionQuery={regionQuery}/>
      </main>
    </>
  );
}

export default Home;