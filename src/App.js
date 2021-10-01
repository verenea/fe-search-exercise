import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination, Stats } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { createURL, urlToSearchState, searchStateToUrl } from './util';
import ToggleThemeModeButton from './components/ToggleThemeModeButton';
import CustomSearchBox from './components/CustomSearchBox';
import CustomSearchResults from './components/CustomSearchResults';
import ResultsWrapper from './components/ResultsWrapper';
import Logo from './components/Logo';
import './App.css';
import PageSizeSelection from './components/PageSizeSelection';

const DEBOUNCE_TIME = 700;

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY,
  { protocol: 'https:' }
);

////////////////////////////////////////////////////////////////
// this is for testing...
////////////////////////////////////////////////////////////////
// const index = searchClient.initIndex('stg_choicemarket_products');
// index.search('', {
//   hitsPerPage: 5,
//   getRankingInfo: true,
//   // filters: `category:Candy`
// })
//   .then(({ hits }) => { console.log(hits); })
//   .catch(err => { console.log(err); });
////////////////////////////////////////////////////////////////

function App(props) {
  const { location, history } = props;

  ////////////////////////////////////////////////////////////////
  // Search Routing management, for allowing navigation of search history
  ////////////////////////////////////////////////////////////////
  const [searchState, setSearchState] = useState(urlToSearchState(location));
  const [lastLocation, setLastLocation] = useState(location);
  const [debouncedSetState, setDebouncedSetState] = useState(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        history.push(
          searchStateToUrl(location, updatedSearchState),
          updatedSearchState
        );
      }, DEBOUNCE_TIME)
    );

    setSearchState(updatedSearchState);
  };

  // trigger state sync upon route change and comparison of location vs prev.
  useEffect(() => {
    if (location !== lastLocation) {
      setSearchState(urlToSearchState(location));
      setLastLocation(location);
    }
    return null;
  }, [location, lastLocation]);
  // ====================================================================

  return (
    <div>
      {/*-- https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/ --*/}
      {/*-- https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/ --*/}
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        {/*-- HeaderWithSearch: logo/title, searchbar, and theme toggle  --*/}
        <header className="header">
          <div className="flex-horiz">
            <h1 className="header-title">
              <a href="/"><Logo /></a>
            </h1>
            <CustomSearchBox />
            {/*<Stats />*/}
          </div>
          <ToggleThemeModeButton />
        </header>

        {/*-- main content wrapper beings here --*/}
        <main className="container">
          <div className="search-panel">
            {/* << Ideally, this is where we'd add FILTERS and other REFINEMENTS, PANELS, etc. with <aside /> */}
            {/*-- results and pagination sections --*/}
            <section className="search-panel__results">
              {/*-- the wrapper allows us to dynamically display loading|hits|no-results --*/}
              <ResultsWrapper>
                {/*-- show count and fetch time --*/}
                <div className="search-meta">
                  <Stats />
                  <PageSizeSelection />
                </div>
                {/*-- using custom connected hits, as opposed to default rom algolia --*/}
                <CustomSearchResults />
              </ResultsWrapper>
              <div className="pagination">
                {/*-- using default pager from InstantSearch for now --*/}
                {/*-- TODO: convert this to MUI-d dropdown --*/}
                <Pagination />
              </div>
            </section>
          </div>
        </main>
      </InstantSearch>
    </div>
  );
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default App;
