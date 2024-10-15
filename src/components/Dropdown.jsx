export default function Dropdown({setRegionQuery})
{
    return (
        <select className="filter-by-region" onChange={(e) => setRegionQuery(e.target.value.toLowerCase())}>
          <option hidden>Filter by Region</option>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="America">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
    )
}