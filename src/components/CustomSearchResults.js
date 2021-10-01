import React from 'react';
import PropTypes from 'prop-types';
import { connectHits } from 'react-instantsearch-dom';
import HitDetailsDialog from './HitDetailsDialog';
import HitCard from './HitCard';
import './CustomSearchResults.css';

function SearchResults({ hits }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (hit) => {
    setExpanded(hit || false);
  };
  return (
    <div>
      <ul className="hits-list">
        {hits.map(hit => (
          <li key={hit.Sku} className="hit-item">
            <HitCard hit={hit} onHitClick={hit => handleExpandClick(hit)} containerClass="flex-vert" />
          </li>
        ))}
      </ul>
      {/*-- when we click on an actual hit, here we expand the details --*/}
      <HitDetailsDialog
        open={!!expanded}
        details={expanded}
        onClose={() => handleExpandClick(false)}
      />
    </div>
  );
}

SearchResults.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Sku: PropTypes.string.isRequired,
    ProductId: PropTypes.string.isRequired,
    Categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    Tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    Description: PropTypes.string,
    Brand: PropTypes.string,
    Upc: PropTypes.string,
    ingredients: PropTypes.string,
    nutrition: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
};

export default connectHits(SearchResults);
