import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ExploreMore() {
  // console.log('ExploreMore loaded');
  return (
    <Link to="/home">
      <Button>Go back</Button>
    </Link>
  );
}

export default ExploreMore;
