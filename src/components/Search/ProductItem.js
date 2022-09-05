import { Box } from '@mui/material';
import React, { createElement } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProductItem({ hit, components }) {
  const getLink = () => {
    if(hit.type=="collection") return('/collection/' + hit.id);
    else return (`/collection/${hit.type}/${hit.id}`)
  }

  return (
    <a href={getLink()} className="aa-ItemLink">
      <Box className="aa-ItemContent">
        <Box className="aa-ItemType">
            Found in: <components.Highlight hit={hit} attribute="type" />
        </Box>
        <Box className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="name" />
        </Box>
        <Box className="aa-ItemText">
          <components.Highlight hit={hit} attribute="text" /> 
        </Box>
      </Box>
    </a>
  );
}