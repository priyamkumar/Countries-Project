import { useState } from "react";
import Search from "./Search.jsx";
import Dropdown from "./dropdown.jsx";
import CountriesContainer from "./CountriesContainer.jsx";

function Home() {
  const [query, setQuery] = useState("");

  return (
    <>
      <main>
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