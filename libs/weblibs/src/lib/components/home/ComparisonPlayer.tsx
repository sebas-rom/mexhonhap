import React, { useRef, useState, useEffect, useMemo } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import {
  Box,
  Paper,
  Typography,
  Slider,
  IconButton,
  Stack,
  Switch,
} from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { usePlayback } from './PlaybackContext';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[500],
    '&:hover': {
      backgroundColor: alpha(green[50], theme.palette.action.hoverOpacity),
    },
  },

  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[500],
  },

  '& .MuiSwitch-switchBase:not(.Mui-checked)': {
    color: red[900],
    '&:hover': {
      backgroundColor: alpha(red[50], theme.palette.action.hoverOpacity),
    },
  },

  '& .MuiSwitch-switchBase:not(.Mui-checked) + .MuiSwitch-track': {
    backgroundColor: red[500],
  },
}));



interface ComparisonPlayerProps {
  audioBefore: string; // Path to the 'before' audio file
  audioAfter: string; // Path to the 'after' audio file
  labelBefore?: string; // Label for the 'before' audio file
  labelAfter?: string; // Label for the 'after' audio file
  text1?: string;
  text2?: string;
  text3?: string;
}

function ComparisonPlayer({
  audioBefore,
  audioAfter,
  labelBefore = 'Before',
  labelAfter = 'After',
  text1 = '',
  text2 = '',
  text3 = '',
}: ComparisonPlayerProps) {
  const mainIconColor = useTheme().palette.mode === 'dark' ? '#fff' : '#000';

  // Refs for audio and stored time
  const audioRef = useRef(new Audio(audioBefore));

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

  // Function to handle slider change
  const handleSliderChange = (value: number) => {
    setPosition(value);
    audioRef.current.currentTime = value;
  };

  audioRef.current.ontimeupdate = () => {
    //Avoid updating position while user is dragging the slider
    if (Math.abs(audioRef.current.currentTime - position) < 1) {
      setPosition(audioRef.current.currentTime);
    }

    if (audioRef.current.currentTime === audioRef.current.duration) {
      audioRef.current.currentTime = 0;
      setPosition(0);
    }
  };

  // Effect to set the duration when audio metadata is loaded
  useEffect(() => {
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration || 0);
    };
  }, []);

  //Switch state variables
  const [switchLabel, setSwitchLabel] = useState(labelBefore);
  const [isSwitched, setIsSwitched] = useState(false);

  // Function to handle switch change
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitched((prev) => !prev);

    // Pause the current player
    if (!paused) {
      pause(audioRef.current);
    }
    // Create a new audio element with the updated source
    const storedTimeRef = audioRef.current.currentTime;
    const newAudioRef = new Audio(isSwitched ? audioBefore : audioAfter);
    newAudioRef.currentTime = storedTimeRef ?? 0;
    audioRef.current = newAudioRef;

    // Play the new player if it was playing before the switch
    if (!paused) {
      play(audioRef.current);
    }
    setSwitchLabel(event.target.checked ? labelAfter : labelBefore);
  };

  useEffect(() => {
    setSwitchLabel(isSwitched ? labelBefore : labelAfter);
  }, [isSwitched, labelBefore, labelAfter]);

  const isSwitchedStyle = {
    color: isSwitched ? green[500] : red[500], // Change color based on switch state
  };

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: '16px',
        padding: '10px 16px',
        width: { xs: '90%', sm: 400, md: 450 },
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Stack direction={'row'} justifyContent="space-between">
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={0}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {text1}
          </Typography>
          <Typography noWrap variant="body1" fontWeight={500}>
            {text2}
          </Typography>
          <Typography noWrap variant="body2">
            {text3}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <CustomSwitch onChange={handleSwitchChange} />
          <Typography style={isSwitchedStyle}>{switchLabel}</Typography>
        </Stack>
      </Stack>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        max={duration}
        onChange={(_, value) => setPosition(value as number)}
        onChangeCommitted={(_, value) => handleSliderChange(value as number)}
        sx={{
          '& .MuiSlider-thumb': {
            color: isSwitched ? green[500] : red[500],
          },
          '& .MuiSlider-track': {
            color: isSwitched ? green[500] : red[500],
          },
        }}
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
      </Box>
    </Paper>
  );
}

export default ComparisonPlayer;