import { Box } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import studio from '../../../assets/webp/studio.webp';
import studioVideo from '../../../assets/video/HeaderVideo.mp4';
// import HashImage from '../../HashImage';

export default function HomeHeaderMobile() {
  // const { t: lang } = useTranslation('home');

  return (
    <Box
      position="relative"
      width="100%"
      style={{
        height: 'inherit',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'black',
      }}
    >
      <video
        src={studioVideo}
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

      {/* <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          color: 'secondary',
        }}
      >
        <Typography variant="h1" textAlign="center" color="secondary">
          {lang('elevating')}
        </Typography>
      </Box> */}
    </Box>
  );
}
