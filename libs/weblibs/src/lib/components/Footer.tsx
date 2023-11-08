// import React from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ height: 250, backgroundColor: 'primary.main' }}>
      <Container maxWidth="md" sx={{ height: 'inherit' }}>
        <Stack
          direction={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          sx={{ height: 'inherit' }}
        >
          <Typography
            variant="subtitle1"
            textAlign="center"
            color={'secondary'}
          >
            Copyright © 2023 Sebastian Romero
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export { Footer };
