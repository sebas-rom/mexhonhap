import React, { Suspense } from 'react';
import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  Collapse,
} from '@mui/material';
import Upwork from '../../assets/svg/upwork-logo.svg';
import TopRated from '../../assets/svg/top-rated.svg';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HandymanIcon from '@mui/icons-material/Handyman';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ChatIcon from '@mui/icons-material/Chat';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PianoIcon from '@mui/icons-material/Piano';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import { Link as ScrollLink } from 'react-scroll';
import { Loading } from '../Loading';
import { useThemeContext } from '../../utils/ThemeContext';
import { SvgIconComponent } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AboutWeb = React.lazy(() => import('./Parallax/AboutWeb')); // Create a separate WebParallax component
const AboutMobile = React.lazy(() => import('./Parallax/AboutMobile')); // Create a separate MobileHeader component

interface IconTextProps {
  icon: SvgIconComponent;
  text: string;
}
const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {React.createElement(icon, { fontSize: 'large', color: 'action' })}
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};
const servicesWith = 215; //important to keep services aligned
function About() {
  const { t: lang } = useTranslation('home');
  const [showServices, setCollapseServices] = React.useState(false);

  const handleShowServices = () => {
    setCollapseServices((prev) => !prev);
  };
  const isMobile = window.innerWidth <= 768;
  const { themeColor } = useThemeContext();
  const buttonColor = themeColor === 'light' ? 'primary' : 'secondary';

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div />
        <Typography variant="h3" textAlign="center">
          {lang('about')}
        </Typography>
        <div />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Box
            sx={{
              height: {
                xs: '250px',
                sm: '450px',
                md: 600,
              },
              width: {
                xs: '60%',
                sm: '60%',
                md: '100%',
              },
              overflow: 'hidden',
              // backgroundColor: 'red',
            }}
          >
            <Suspense fallback={<Loading></Loading>}>
              {isMobile ? <AboutMobile /> : <AboutWeb />}
            </Suspense>
          </Box>
          <Stack
            sx={{
              width: '100%',
            }}
            direction={'column'}
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" textAlign="justify">
              {lang('aboutDescription1')}
            </Typography>
            <Typography variant="body1" textAlign="justify">
              {lang('aboutDescription2')}
            </Typography>
            <Typography variant="body1" textAlign="justify">
              {lang('aboutDescription3')}
            </Typography>
            <img src={Upwork} alt="upwork logo" loading="lazy" height="40" />
            <Stack
              direction={'row'}
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={TopRated}
                alt="top rated badge"
                loading="lazy"
                height="30"
              />
              <Typography variant="h6">Top Rated</Typography>
            </Stack>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                color={buttonColor}
                href="https://www.upwork.com/workwith/sebastian"
                target="_blank"
              >
                {lang('hireMe')}
              </Button>
              <ScrollLink
                to={'Contact'}
                smooth={true}
                offset={-90}
                duration={750}
              >
                <Button variant="outlined" color={buttonColor}>
                  {lang('sayHello')}
                </Button>
              </ScrollLink>
            </Stack>
          </Stack>
        </Stack>
        <div />
        <Typography variant="h3" textAlign="center">
          {lang('services')}
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="baseline"
          spacing={2}
          sx={{ width: servicesWith }}
        >
          <IconText icon={MusicNoteIcon} text={lang('musicProduction')} />
          <IconText icon={HandymanIcon} text={lang('audioRestoration')} />
          <IconText icon={GraphicEqIcon} text={lang('soundDesign')} />
          <IconText icon={KeyboardVoiceIcon} text={lang('podcastProduction')} />
        </Stack>

        <Collapse in={showServices}>
          <Stack alignItems={'center'} spacing={2}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="baseline"
              spacing={2}
              sx={{ width: servicesWith }}
            >
              <IconText icon={ChatIcon} text={lang('dialogueEditing')} />
              <IconText
                icon={HeadphonesIcon}
                text={lang('liveSoundEngineering')}
              />
              <IconText icon={PianoIcon} text={lang('musicArrangement')} />
              <IconText
                icon={LibraryMusicIcon}
                text={lang('jingleProduction')}
              />
              <IconText icon={VideoChatIcon} text={lang('consultation')} />
            </Stack>
            <div />
          </Stack>

          <Typography variant="body1" align="justify">
            {lang('servicesDescription')}
          </Typography>
        </Collapse>
        <Button onClick={handleShowServices} color={buttonColor}>
          {showServices ? lang('showLess') : lang('showMore')}
        </Button>
        <div />
      </Stack>
    </Container>
  );
}

export { About };
