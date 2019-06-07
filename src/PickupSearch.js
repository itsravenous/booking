import React from 'react';
import './PickupSearch.css';

export const PickupSearch = () => (
  <form className="c-pickup-search">
    <h2 className="c-heading">Where are you going?</h2>
    <div className="c-form-field">
      <label htmlFor="pickup">Pick-up Location</label>
      <input
        id="pickup"
        type="text"
        placeholder="city, airport, station, region, district…"
      />
    </div>
  </form>
);
