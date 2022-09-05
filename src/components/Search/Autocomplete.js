import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import "@algolia/autocomplete-theme-classic"
import { Box } from '@mui/material';

export function Autocomplete(props){
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <Box sx={{width: "100%"}} ref={containerRef} />;

}