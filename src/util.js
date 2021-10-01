import qs from 'qs';
import isNil from 'lodash/isNil';
import toString from 'lodash/toString';
import find from 'lodash/find';

export const createURL = state => `?${qs.stringify(state)}`;

export const searchStateToUrl = (location, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : '';

export const urlToSearchState = location => qs.parse(location.search.slice(1));

export const cleanValue = (input, nullResult = 'N/A') => {
  if (input === true || input === false) {
    return boolToYesNo(input);
  }
  if (isNil(input) || input === '') {
    return nullResult;
  }
  return toString(input);
};

export const boolToYesNo = value => value ? 'Yes' : 'No';

export const isGlutFree = tags => find(tags, t => t.Name === 'Gluten Free');
export const isVegan = tags => find(tags, t => t.Name === 'Vegan');
export const isKeto = tags => find(tags, t => t.Name === 'Keto');
export const isAllergyFree = tags => find(tags, t => t.Name.indexOf('Major 8') > -1);
