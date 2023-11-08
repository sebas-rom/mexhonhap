import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import ProfilePhoto from '../../../assets/webp/profile-photo.webp';
import { Box } from '@mui/material';
export default function AboutWeb() {
  return (
    <Box
      style={{
        height: 'inherit',
      }}
    >
      <ParallaxBanner
        style={{
          height: 'inherit',
        }}
      >
        <ParallaxBannerLayer speed={-20}>
          <img
            src={ProfilePhoto}
            alt="sebastian profile"
            style={{
              objectFit: 'cover',
              width: '100%',
              transform: 'translate(0%,15%)',
            }}
          />
        </ParallaxBannerLayer>
      </ParallaxBanner>
    </Box>
  );
}
