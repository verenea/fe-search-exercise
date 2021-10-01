import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import NutrientDetail from './NutrientDetail';

export default function NutrientsList({ nutritionValues }) {
  return (
    <ul style={{ margin: '0 0 0 1rem', padding: 0, listStyleType: 'square' }}>
      {map(nutritionValues, (vals, key) => {
        return (
          <li key={key} style={{ marginLeft: '0.5rem' }}>
            <NutrientDetail name={key} {...vals} />
          </li>
        );
      })}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutritionValues: PropTypes.object.isRequired
};
