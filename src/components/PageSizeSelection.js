import React from 'react';
import { HitsPerPage } from 'react-instantsearch-dom';

// using default page size dropper for now
// TODO: convert this to MUI-d dropdown

function PageSizeSelection(props) {
  return (
    <HitsPerPage
      defaultRefinement={20}
      items={[
        { value: 10, label: 'Show 10 items' },
        { value: 20, label: 'Show 20 items' },
        { value: 50, label: 'Show 50 items' },
        { value: 100, label: 'Show 100 items' },
      ]}
    />
  )
}

export default PageSizeSelection;
