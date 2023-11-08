import React, { Suspense } from 'react';
import { Box } from '@mui/material';
// import { Loading } from '../Loading';
import { Blurhash } from 'react-blurhash';
const HomeHeaderWeb = React.lazy(() => import('./Parallax/HomeHeaderWeb')); // Create a separate WebParallax component
const HomeHeaderMobile = React.lazy(
  () => import('./Parallax/HomeHeaderMobile')
);
// import HomeHeaderMobile from './Parallax/HomeHeaderMobile';
// import HomeHeaderWeb from './Parallax/HomeHeaderWeb';

function HomeHeader() {
  const isMobile = window.innerWidth <= 768;
  return (
    <Box
      sx={{
        height: {
          xs: 250,
          sm: 350,
          md: 550,
        },
      }}
    >
      <Suspense
        fallback={
          <Blurhash
            hash={'U69suE4o0zNH~BRkNaIp9us;xZWBxuM{W=%L'}
            width="100%"
            height="100%"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              objectFit: 'cover',
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
        }
      >
        {isMobile ? <HomeHeaderMobile /> : <HomeHeaderWeb />}
      </Suspense>
    </Box>
  );
}

export { HomeHeader };
