import React, {useState} from 'react';
import './PickupSearch.css';
import fetch from 'cross-fetch';

const PickupSearchResults = ({results, searchTerm}) =>
  results.length ? (
    <ul className="c-pickup-search__results">
      {results.map(result => (
        <li key={result.index}>
          {result.name} {result.iata && `(${result.iata})`}
        </li>
      ))}
    </ul>
  ) : searchTerm.length ? (
    <div className="c-pickup-search__results">No results found</div>
  ) : null;

export const PickupSearch = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <form className="c-pickup-search">
      <h2 className="c-heading">Where are you going?</h2>
      <div className="c-form-field">
        <label htmlFor="pickup">Pick-up Location</label>
        <input
          id="pickup"
          type="text"
          placeholder="city, airport, station, region, district…"
          onChange={async e => {
            const searchTerm = e.target.value;
            setSearchTerm(searchTerm);
            if (searchTerm.length < 2) {
              setResults([]);
              return;
            }
            const response = await fetch(
              `https://cors.io?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${searchTerm}`,
            );
            const responseJson = await response.json();
            if (results.numFound === 0) results.docs = [];
            setResults(responseJson.results.docs);
          }}
        />

        <PickupSearchResults results={results} searchTerm={searchTerm} />
      </div>
    </form>
  );
};
