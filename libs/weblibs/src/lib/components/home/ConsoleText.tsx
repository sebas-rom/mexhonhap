import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import './ConsoleText.css';

interface ConsoleTextProps {
  words: string[];
  underscore?: string;
}

export default function ConsoleText({
  words,
  underscore = '',
}: ConsoleTextProps) {
  const [visible, setVisible] = useState(true);
  const [letterCount, setLetterCount] = useState(0);
  const [x, setX] = useState(1);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const target = document.getElementById('text-for-console');

    if (target) {
      const letterCountInterval = setInterval(() => {
        if (letterCount === -1 && !waiting) {
          setWaiting(true);
          target.innerHTML = words[0]?.substring(0, letterCount + 1);

          setTimeout(() => {
            const usedWord = words?.shift();
            if (usedWord) words.push(usedWord);
            setX(1);
            setLetterCount((prevCount) => prevCount + x);
            setWaiting(false);
          }, 1000);
        } else if (letterCount === (words[0]?.length ?? -1) && !waiting) {
          setWaiting(true);

          setTimeout(() => {
            setX(-1);
            setLetterCount((prevCount) => prevCount + x);
            setWaiting(false);
          }, 1500);
        } else if (!waiting) {
          target.innerHTML = words[0]?.substring(0, letterCount + 1);
          setLetterCount((prevCount) => prevCount + x);
        }
      }, 110);

      const visibilityToggleInterval = setInterval(() => {
        setVisible((prevVisible) => !prevVisible);
      }, 400);

      return () => {
        clearInterval(letterCountInterval);
        clearInterval(visibilityToggleInterval);
      };
    }
  }, [letterCount, waiting, x, words]);

  return (
    <Box height="40px">
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography id="text-for-console" variant="h4"></Typography>
        <Typography
          variant="h4"
          className={`console-underscore ${visible ? '' : 'hidden'}`}
        >
          {underscore}
        </Typography>
      </Stack>
    </Box>
  );
}
