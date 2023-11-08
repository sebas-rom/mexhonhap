import { Box } from '@mui/material';
import concertVideo from '../../../assets/video/FooterVideo.mp4';
// import concert from '../../../assets/webp/concert.webp';
// import HashImage from '../../HashImage';
export default function AboutMobile() {
  return (
    <Box position="relative" width="100%" style={{ height: 'inherit' }}>
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
    </Box>
  );
}
