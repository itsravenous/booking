import 'jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {PickupSearch} from './PickupSearch';

describe('Pick-up search widget', () => {
  it('displays a title', () => {
    const {queryByText} = render(<PickupSearch />);

    expect(queryByText('Where are you going?')).toBeInTheDocument();
  });

  it('provides an accessibly-labeled search input with placeholder text', () => {
    const {queryByText, queryByLabelText} = render(<PickupSearch />);

    const searchLabel = queryByText('Pick-up Location');
    const searchInput = queryByLabelText('Pick-up Location');

    expect(searchLabel.getAttribute('for')).toBe(searchInput.id);
    expect(searchInput).toHaveAttribute(
      'placeholder',
      'city, airport, station, region, district…',
    );
  });
});
