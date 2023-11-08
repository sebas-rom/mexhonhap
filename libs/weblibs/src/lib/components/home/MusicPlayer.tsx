// How to use in other component
// import pop1 from './mp3/pop/Ecstasy.mp3';
// import pop2 from './mp3/pop/Puzzle.mp3';
// import pop3 from './mp3/pop/Shela-Ya-Marhaba.mp3';
// import pop4 from './mp3/pop/Your-Star.mp3';
// import rock1 from './mp3/rock/Same-Kind-Of-Life.mp3';
// import hipHop1 from './mp3/hip-hop/Saudade-vv-Teu-Beijo.mp3';
// import assorted1 from './mp3/assorted/The-Saga-Of-Harrison-Crabfeathers.mp3';
// type AudioData = {
//   [genre: string]: string[];
// };
// const playlist: AudioData = {
//   Pop: [pop1, pop2, pop3, pop4],
//   Rock: [rock1],
//   'Hip Hop': [hipHop1],
//   Assorted: [assorted1],
// };
//<MusicPlayer audioData={playlist} />

import { useRef, useState, useEffect, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Paper,
  Typography,
  Slider,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import { usePlayback } from './PlaybackContext';
import SmartMarqueeText from '../SmartMarqueeText';
import defaultImg from './albumArt/cold7.webp';
import HashImage from '../HashImage';
import { useTranslation } from 'react-i18next';

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export interface Song {
  audio: string;
  artist: string;
  album: string;
  trackName: string;
  image: string;
  hash?: string;
}

export interface AudioData {
  [genre: string]: Song[];
}

type MusicPlayerProps = {
  audioData: AudioData;
};

export default function MusicPlayer({ audioData }: MusicPlayerProps) {
  const { t: lang } = useTranslation('home');
  const theme = useTheme();
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';

  // Refs for audio and stored time
  const firstGenre = Object.keys(audioData)[0]; // Get the first key

  const audioRef = useRef(new Audio(audioData[firstGenre][0].audio));
  const artistRef = useRef(audioData[firstGenre][0].artist);
  const trackNameRef = useRef(audioData[firstGenre][0].trackName);
  const albumRef = useRef(audioData[firstGenre][0].album);
  const imageRef = useRef(audioData[firstGenre][0].image);
  const hashRef = useRef(audioData[firstGenre][0].hash);
  const currentIndex = useRef(0);

  // State variables
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const paused = audioRef.current.paused;

  // State variable to track the integer part of position
  const [integerPosition, setIntegerPosition] = useState(0);

  // Update integerPosition when position changes
  useEffect(() => {
    setIntegerPosition(Math.floor(position));
  }, [position]);

  const formatDuration = useMemo(() => {
    const minute = Math.floor(integerPosition / 60);
    const secondLeft = integerPosition - minute * 60;
    const currentTime = `${minute}:${
      secondLeft < 10 ? `0${secondLeft}` : secondLeft
    }`;

    const remainingTimeInSeconds = Math.floor(duration - integerPosition);
    const remainingMinute = Math.floor(remainingTimeInSeconds / 60);
    const remainingSecondLeft = remainingTimeInSeconds - remainingMinute * 60;
    const remainingTime = `-${remainingMinute}:${
      remainingSecondLeft < 10 ? `0${remainingSecondLeft}` : remainingSecondLeft
    }`;

    return {
      currentTime,
      remainingTime,
    };
  }, [integerPosition, duration]);

  const { play, pause } = usePlayback();

  // Function to handle play/pause
  const handlePlayPause = () => {
    if (paused) {
      play(audioRef.current);
    } else {
      pause(audioRef.current);
    }
  };

  // Function to change the current audio source
  function updateAudio(newAudio: Song) {
    const newAudioFileName = newAudio.audio.split('/').pop();
    const oldAudioFileName = audioRef.current.src.split('/').pop();

    if (newAudioFileName === oldAudioFileName) {
      // console.log('same audio');
      if (!paused) {
        pause(audioRef.current);
      }
      audioRef.current.currentTime = 0;
      setPosition(0);
      play(audioRef.current);
    } else {
      if (!paused) {
        pause(audioRef.current);
      }

      const nextAudio = new Audio(newAudio.audio);
      nextAudio.currentTime = 0; // Start from the beginning
      audioRef.current = nextAudio;

      play(audioRef.current);

      artistRef.current = newAudio.artist;
      albumRef.current = newAudio.album;
      trackNameRef.current = newAudio.trackName;
      imageRef.current = newAudio.image;
      hashRef.current = newAudio.hash;

      // Update the duration and position
      setDuration(nextAudio.duration || 0);
      setPosition(0);
    }
  }
  // Function to handle forward and backward
  const handleForward = () => {
    const newIndex =
      (currentIndex.current + 1) % (audioData[selectedGenre] as Song[]).length;

    updateAudio(audioData[selectedGenre][newIndex]);

    // Update the currentIndex
    currentIndex.current = newIndex;
  };

  const handleBackward = () => {
    const newIndex =
      (currentIndex.current - 1 + (audioData[selectedGenre] as Song[]).length) %
      (audioData[selectedGenre] as Song[]).length;

    updateAudio(audioData[selectedGenre][newIndex]);

    // Update the currentIndex
    currentIndex.current = newIndex;
  };

  // Function to handle slider change
  const handleSliderChange = (value: number) => {
    setPosition(value as number);
    audioRef.current.currentTime = value;
  };

  audioRef.current.ontimeupdate = () => {
    //Avoid updating position while user is dragging the slider
    if (Math.abs(audioRef.current.currentTime - position) < 1) {
      setPosition(audioRef.current.currentTime);
    }
    if (audioRef.current.currentTime === audioRef.current.duration) {
      handleForward();
    }
  };

  // Effect to set the duration when audio metadata is loaded
  useEffect(() => {
    audioRef.current.onloadedmetadata = () => {
      // console.log('duration', audioRef.current.duration);
      setDuration(audioRef.current.duration || 0);
    };
  }, [audioRef.current.src]);

  //Genere Controls

  const [selectedGenre, setSelectedGenre] = useState(Object.keys(audioData)[0]);
  const handleGenereChange = (event: SelectChangeEvent) => {
    // console.log('new genre selected', event.target.value);
    const newGenre = event.target.value as string;
    currentIndex.current = 0;
    setSelectedGenre(newGenre);
    updateAudio(audioData[event.target.value][currentIndex.current]);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: '16px',
        padding: '16px',
        width: {
          xs: '90%',
          sm: 400,
          md: 450,
        },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CoverImage>
          <HashImage
            src={imageRef.current || defaultImg}
            alt="Album Cover"
            hash={hashRef.current || 'UcJbBSMxRjx]H;XSj?aJITaffkt7_NV@ofWX'}
            style={{ transform: 'scale(1.1)' }}
          />
        </CoverImage>
        <Box
          sx={{
            ml: 1.5,
            minWidth: 0,
          }}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {artistRef.current}
          </Typography>
          <SmartMarqueeText
            typographyProps={{
              noWrap: true,
              variant: 'body1',
              fontWeight: 500,
            }}
            text={albumRef.current}
          />
          <SmartMarqueeText
            typographyProps={{
              noWrap: true,
              variant: 'body2',
            }}
            text={trackNameRef.current}
          />
        </Box>
      </Box>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        max={duration}
        onChange={(_, value) => setPosition(value as number)}
        onChangeCommitted={(_, value) => handleSliderChange(value as number)}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: -2,
        }}
      >
        <TinyText>{formatDuration.currentTime}</TinyText>
        <TinyText>{formatDuration.remainingTime}</TinyText>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: -1,
        }}
      >
        <IconButton aria-label="previous-song" onClick={handleBackward}>
          <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
        <IconButton
          aria-label={paused ? 'play' : 'pause'}
          onClick={() => handlePlayPause()}
        >
          {paused ? (
            <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
              htmlColor={mainIconColor}
            />
          ) : (
            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
          )}
        </IconButton>
        <IconButton aria-label="next-song" onClick={handleForward}>
          <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          marginTop: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          mt: -1,
        }}
      >
        {Object.keys(audioData).length > 1 && (
          <FormControl sx={{ m: 1, width: 120 }} variant="standard">
            <InputLabel id="demo-simple-select-label">
              {lang('genre')}
            </InputLabel>
            <Select
              value={selectedGenre}
              label="selectedGenre"
              onChange={handleGenereChange}
            >
              {Object.keys(audioData).map((genre: string, index: number) => (
                <MenuItem key={index} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
    </Paper>
  );
}
