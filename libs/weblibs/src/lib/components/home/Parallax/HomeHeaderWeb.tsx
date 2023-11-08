// import studio from '../../../assets/webp/studio.webp';
// import HashImage from '../../HashImage';

import studioVideo from '../../../assets/video/HeaderVideo.mp4';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { Stack, Typography } from '@mui/material';
// import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { useTransition, config, animated } from 'react-spring';

const phrases = ['Capturing Emotions', 'Elevating Sound', 'Sebastian Romero'];
function FadingPhrases() {
  const [index, setIndex] = useState(0);

  // Define transitions for the phrases
  const transitions = useTransition(index, {
    from: { opacity: 0, transform: 'scale(1.2)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
    config: config.molasses, // Adjust the config for smoother animation
    onRest: () => {
      // When the animation is done, increment the index with a delay
      setTimeout(() => {
        if (index < phrases.length - 1) {
          setIndex(index + 1);
        }
      }, 0); // Adjust the delay duration (in milliseconds) as needed
    },
  });

  return (
    <>
      {transitions((props, item) => (
        <animated.div
          style={{
            ...props,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
          }}
          key={item}
        >
          <Typography variant="h1" textAlign="center" color="secondary">
            {phrases[item]}
          </Typography>
        </animated.div>
      ))}
    </>
  );
}

export default function HomeHeaderWeb() {
  // const { t: lang } = useTranslation('home');
  return (
    <ParallaxBanner style={{ height: 'inherit' }}>
      <ParallaxBannerLayer speed={-30}>
        <video
          src={studioVideo}
          style={{
            objectFit: 'cover',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: 'auto',
          }}
          autoPlay
          playsInline
          muted
          loop
        />
      </ParallaxBannerLayer>
      <ParallaxBannerLayer style={{ height: 'inherit' }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: 'inherit',
            backgroundColor: 'rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          <FadingPhrases />
        </Stack>
      </ParallaxBannerLayer>
    </ParallaxBanner>
  );
}
