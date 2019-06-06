import React from 'react';

export const PickupSearch = () => (
  <form>
    <h2>Where are you going?</h2>
    <label htmlFor="pickup">Pick-up Location</label>
    <input
      id="pickup"
      type="text"
      placeholder="city, airport, station, region, district…"
    />
  </form>
);
