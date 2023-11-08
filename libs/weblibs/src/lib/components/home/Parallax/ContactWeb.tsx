import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
// import concert from '../../../assets/webp/concert.webp';
import concertVideo from '../../../assets/video/FooterVideo.mp4';
import { Stack } from '@mui/material';
// import HashImage from '../../HashImage';

export default function AboutWeb() {
  return (
    <ParallaxBanner style={{ height: 'inherit' }}>
      <ParallaxBannerLayer speed={-30}>
        {/* <HashImage
          src={concert}
          hash="UmFpTgw]S3oL}qsmjtoLs.a{snsnf6Wqj?oK"
          alt="ProfilePhoto"
          style={{ height: '100%', width: '100%' }}
        ></HashImage> */}
        <video
          src={concertVideo}
          style={{
            objectFit: 'cover',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
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
          sx={{ height: 'inherit' }}
        ></Stack>
      </ParallaxBannerLayer>
    </ParallaxBanner>
  );
}
