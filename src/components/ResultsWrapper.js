import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import LinearProgress from '@mui/material/LinearProgress';

const ResultsWrapper = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      searchResults
        ? <div className="no-results">No results were been found for "{searchState.query}".</div>
        : <LinearProgress />
    )
);

export default ResultsWrapper;
