import { useState } from "react";
import Search from "./Search.jsx";
import Dropdown from "./dropdown.jsx";
import CountriesContainer from "./CountriesContainer.jsx";
import { useTheme } from "../hook/useTheme.jsx";

function Home() {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme();

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