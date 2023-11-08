import { Box } from '@mui/material';
import ProfilePhoto from '../../../assets/webp/profile-photo.webp';
import HashImage from '../../HashImage';
export default function AboutMobile() {
  return (
    <Box
      style={{
        height: 'inherit',
      }}
    >
      <HashImage
        src={ProfilePhoto}
        alt="ProfilePhoto"
        hash="U9GHxU?bI:-:_~9F_2$zMdM{$f={=|?b9Gad"
        style={{
          width: '100%',
          transform: 'translate(0%, -20%)',
        }}
      />
    </Box>
  );
}
