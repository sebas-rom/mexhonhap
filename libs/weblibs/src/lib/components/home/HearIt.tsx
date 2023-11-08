import { Typography, Stack, Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ComparisonPlayer from './ComparisonPlayer';
import mixBefore from './mp3/comparison/mix-before.mp3';
import mixAfter from './mp3/comparison/mix-after.mp3';
import restorationBefore from './mp3/comparison/restoration-before.mp3';
import restorationAfter from './mp3/comparison/restoration-after.mp3';
import CustomParticles from './CustomParticles';
import { useTranslation } from 'react-i18next';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';
// import { useThemeContext } from '../../utils/ThemeContext';
function HearIt() {
  const { t: lang } = useTranslation('home');
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute', // Set position to absolute
          zIndex: 0, // Set z-index to place it behind the Container
          height: '700px',
          width: '100%',
        }}
      >
        <CustomParticles />
      </Box>
      <Container maxWidth="md">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <div />
          <div />

          <Typography
            variant="h3"
            textAlign="center"
            color={'primary.contrastText'}
          >
            {lang('hearIt')}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color={'primary.contrastText'}
          >
            {lang('beWitness')}
          </Typography>

          <ComparisonPlayer
            audioBefore={mixBefore}
            audioAfter={mixAfter}
            labelBefore={lang('unmixed')}
            labelAfter={lang('mixed')}
            text1={lang('musicComparison')}
            text2="Voy Caminando"
            text3="Floral Power"
          />

          <div />
          <div />

          <ComparisonPlayer
            audioBefore={restorationBefore}
            audioAfter={restorationAfter}
            labelBefore={lang('damaged')}
            labelAfter={lang('restored')}
            text1={lang('audioComparison')}
            text2="Voice Over"
            text3="Olivia Brown"
          />

          <div />
          <div />
          <div />
          {/* <Link to="/explore-more">
            <Button variant="contained" color="secondary">
              Explore More Projects
            </Button>
          </Link>

          <div />
          <div />
          <div /> */}
        </Stack>
      </Container>
    </Box>
  );
}

export default HearIt;
