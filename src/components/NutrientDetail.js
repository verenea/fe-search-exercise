import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';

export default function NutrientDetail({ amount, uom, dailyPct, name }) {
  let valuesText = amount ? `${Math.floor(toNumber(amount))}${uom}` : '';
  if (dailyPct) valuesText = `${valuesText} (Daily Pct: ${Math.floor(toNumber(dailyPct))}%)`;
  return <span><strong>{name}:</strong> {valuesText}</span>;
}

NutrientDetail.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.string,
  uom: PropTypes.string,
  dailyPct: PropTypes.string,
};
