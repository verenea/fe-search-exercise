import React from 'react';
import logoImg from '../choice-market-logo-transparent.png';

export default function Logo(props) {
  if (logoImg) {
    return (
      <img
        src={logoImg}
        style={{ maxHeight: 52, maxWidth: 250 }}
        alt={process.env.REACT_APP_WEBSITE_TITLE}
      />
    )
  }
  return <span>{process.env.REACT_APP_WEBSITE_TITLE}</span>;
}
