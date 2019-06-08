import 'jest-dom/extend-expect';
import React from 'react';
import nock from 'nock';
import pickupSearchResults from './fixtures/pickup-search-results';
import pickupSearchResultsEmpty from './fixtures/pickup-search-results-empty';
import {
  wait,
  waitForElementToBeRemoved,
  render,
  fireEvent,
} from '@testing-library/react';
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

  describe('search auto-complete', () => {
    const setupNock = (searchTerm, results = pickupSearchResults) =>
      nock('https://cors.io?')
        .get('/')
        .query({
          'https://www.rentalcars.com/FTSAutocomplete.do?solrIndex': 'fts_en',
          solrRows: 6,
          solrTerm: searchTerm,
        })
        .reply(200, results);

    it("doesn't fetch results if only one character is entered", async () => {
      const scope = nock('https://cors.io?')
        .get('/')
        .reply(200, pickupSearchResults);

      const {queryByText, queryByLabelText, findByText} = render(
        <PickupSearch />,
      );
      const searchInput = queryByLabelText('Pick-up Location');
      fireEvent.change(searchInput, {target: {value: 'M'}});
      await wait();
      expect(scope.isDone()).toBe(false);
      expect(queryByText('No results found')).not.toBeInTheDocument();
    });

    it('fetches and displays results when at least two characters are entered', async () => {
      const scope = setupNock('MA');
      const {queryByLabelText, findByText} = render(<PickupSearch />);
      const searchInput = queryByLabelText('Pick-up Location');
      fireEvent.change(searchInput, {target: {value: 'MA'}});
      const result = await findByText(/Manchester Airport/);
      expect(result).toHaveTextContent('(MAN)');
      expect(scope.isDone()).toBe(true);
    });

    it('hides IATA text for non-airport locations', async () => {
      const scope = setupNock('MA');

      const {queryByLabelText, findByText} = render(<PickupSearch />);
      const searchInput = queryByLabelText('Pick-up Location');
      fireEvent.change(searchInput, {target: {value: 'MA'}});
      await findByText('Manhattan');
      expect(scope.isDone()).toBe(true);
    });

    it('handles no results found', async () => {
      const scope = setupNock('XZF', pickupSearchResultsEmpty);

      const {queryByLabelText, findByText} = render(<PickupSearch />);
      const searchInput = queryByLabelText('Pick-up Location');
      fireEvent.change(searchInput, {target: {value: 'XZF'}});
      await findByText('No results found');
      expect(scope.isDone()).toBe(true);
    });

    it('hides the results list when the search field text is deleted', async () => {
      const scope = setupNock('MA');

      const {
        queryByLabelText,
        findByText,
        queryByText,
        queryAllByText,
      } = render(<PickupSearch />);
      const searchInput = queryByLabelText('Pick-up Location');
      fireEvent.change(searchInput, {target: {value: 'MA'}});
      await findByText(/Manchester Airport/);
      fireEvent.change(searchInput, {target: {value: ''}});
      expect(queryByText(/Manchester Airport/)).not.toBeInTheDocument();
      expect(scope.isDone()).toBe(true);
    });
  });
});
