import React from 'react';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-dom';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MuiSearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <Paper
    component="form"
    sx={{ p: '6px 8px', display: 'flex', alignItems: 'center', minWidth: 400, m: '0 8px' }}
  >
    <SearchIcon />
    <InputBase
      placeholder="Search for products..."
      inputProps={{ "aria-label": "search for products" }}
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
      searchasyoutype="false"
      sx={{ ml: 1, flex: 1, minHeight: 40 }}
    />
    {currentRefinement && (
      <React.Fragment>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" aria-label="directions" onClick={() => refine('')}>
          <CloseIcon />
        </IconButton>
      </React.Fragment>
    )}
  </Paper>
);

MuiSearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  isSearchStalled: PropTypes.bool,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(MuiSearchBox);
