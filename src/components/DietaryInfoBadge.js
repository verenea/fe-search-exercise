import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

export default function DietaryInfoBadge({ size = 24, color, fontSize, label, children, ...other }) {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: fontSize || (size * 0.6),
        bgcolor: color
      }}
      {...other}
    >
      {label || children}
    </Avatar>
  );
}

DietaryInfoBadge.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  children: PropTypes.any,
};
