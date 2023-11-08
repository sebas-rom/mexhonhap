import { Container, Typography, Stack } from '@mui/material';
import MusicPlayer, { AudioData, Song } from './MusicPlayer';
import HearIt from './HearIt';
import pop1 from './mp3/pop/Ecstasy.mp3';
import pop2 from './mp3/pop/Puzzle.mp3';
import pop3 from './mp3/pop/Shela-Ya-Marhaba.mp3';
import pop4 from './mp3/pop/Your-Star.mp3';
import rock1 from './mp3/rock/Same-Kind-Of-Life.mp3';
import hipHop1 from './mp3/hip-hop/Saudade-Do-Teu-Beijo.mp3';
import assorted1 from './mp3/assorted/The-Saga-Of-Harrison-Crabfeathers.mp3';
import cold1Img from './albumArt/cold1.webp';
import cold2Img from './albumArt/cold2.webp';
import cold3Img from './albumArt/cold3.webp';
import cold4Img from './albumArt/cold4.webp';
import green1Img from './albumArt/green1.webp';
import vibrant1Img from './albumArt/vibrant1.webp';
import warm1Img from './albumArt/warm1.webp';
import ConsoleText from './ConsoleText';
import Brands from './Brands';
import { useTranslation } from 'react-i18next';
const popSongs: Song[] = [
  {
    audio: pop1,
    artist: '',
    album: 'Retro Electronica',
    trackName: 'Ecstasy',
    image: cold1Img,
    hash: 'UVEfQTiaIWof~ArWbwae?ai_Rlaft3bIV@kC',
  },
  {
    audio: pop2,
    artist: '',
    album: 'Italian Electronica',
    trackName: 'Puzzle',
    image: cold2Img,
    hash: 'UJF~%O-;M{WBKUIUV[of0OxuodRk^ZWBRlt5',
  },
  {
    audio: pop3,
    artist: '',
    album: 'Electronic Dance-Pop',
    trackName: 'Shela Ya Marhaba',
    image: cold3Img,
    hash: 'U7I;^v~p01o#%j9Z?aV@00WFoKR%00s7R*NI',
  },
  {
    audio: pop4,
    artist: '',
    album: 'Pop/EDM',
    trackName: 'Your Star',
    image: cold4Img,
    hash: 'UcJbBSMxRjx]H;XSj?aJITaffkt7_NV@ofWX',
  },
];

const rockSongs: Song[] = [
  {
    audio: rock1,
    artist: '',
    album: 'Singer-Songwriter',
    trackName: 'Same Kind Of Life',
    image: green1Img,
    hash: 'USDKJKxni_Se_4s*sosp-YtSV?WVIBRntQs.',
  },
];

const hipHopSongs: Song[] = [
  {
    audio: hipHop1,
    artist: '',
    album: 'Brazilian R&B',
    trackName: 'Saudade Do Teu Beijo',
    image: vibrant1Img,
    hash: 'UOHUqTN59axs%QIps+of0?EfxCRRCT-6i]W=',
  },
];

const assortedSongs: Song[] = [
  {
    audio: assorted1,
    artist: '',
    album: 'Jazz',
    trackName: 'The Saga Of Harrison Crabfeathers',
    image: warm1Img,
    hash: 'UiKT#obIWEoJ_NoJofbHpHWUjEbGRPjYjEbb',
  },
];

function Work() {
  const { t: lang } = useTranslation('home');
  const words: string[] = [
    lang('production'),
    lang('mixing'),
    lang('mastering'),
  ];
  // Create the playlist
  const playlist: AudioData = {
    Pop: [popSongs[0], popSongs[1], popSongs[2], popSongs[3]],
    Rock: [rockSongs[0]],
    'Hip Hop': [hipHopSongs[0]],
    [lang('assorted')]: [assortedSongs[0]],
  };
  return (
    <>
      {/* <HashImage src={cold1Img} hash="UVEfQTiaIWof~ArWbwae?ai_Rlaft3bIV@kC" /> */}
      <Container maxWidth="md">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <div />
          <div />
          <Typography variant="h3" textAlign="center">
            {lang('work')}
          </Typography>
          <Typography variant="body1" align="justify">
            {lang('workDescription')}
          </Typography>
          <div />
          <ConsoleText words={words} underscore={'_'} />
          <MusicPlayer audioData={playlist} />

          <div />
          <div />
          <div />
        </Stack>
      </Container>
      <Brands />
      <HearIt />
    </>
  );
}

export { Work };
