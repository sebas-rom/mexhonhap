import Marquee from 'react-fast-marquee';
import akg from '../../assets/brands/akg.svg';
import allen_and_heath from '../../assets/brands/allen_and_heath.svg';
import arturia from '../../assets/brands/arturia.svg';
import audient from '../../assets/brands/audient.svg';
import fender from '../../assets/brands/fender.svg';
import gibson from '../../assets/brands/gibson.svg';
import krk from '../../assets/brands/krk.svg';
import lewitt from '../../assets/brands/lewitt.svg';
import shure from '../../assets/brands/shure.svg';
import sonible from '../../assets/brands/sonible.webp';
import fabfilter from '../../assets/brands/fabfilter.webp';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Brands() {
  const { themeColor } = useThemeContext();
  const invert = themeColor === 'light' ? 0 : 1;
  const margin = 30;
  const grafientBool = themeColor === 'light' ? true : false;
  const { t: lang } = useTranslation('home');

  return (
    <Box sx={{ paddingBottom: 3 }}>
      <Typography
        variant="h4"
        textAlign={'center'}
        style={{ paddingBottom: 15 }}
      >
        {lang('studioEssentials')}
      </Typography>
      <Marquee speed={20} delay={0} gradient={grafientBool} autoFill={true}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={fabfilter}
            loading="lazy"
            alt="logo"
            style={{ width: 50, marginRight: 20, filter: `invert(${invert})` }}
          />
          <img
            src={sonible}
            loading="lazy"
            alt="logo"
            style={{
              width: 80,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={shure}
            loading="lazy"
            alt="logo"
            style={{
              width: 120,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={lewitt}
            loading="lazy"
            alt="logo"
            style={{
              width: 140,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={krk}
            loading="lazy"
            alt="logo"
            style={{
              width: 60,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={gibson}
            loading="lazy"
            alt="logo"
            style={{
              width: 80,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={fender}
            loading="lazy"
            alt="logo"
            style={{
              width: 120,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={audient}
            loading="lazy"
            alt="logo"
            style={{
              width: 150,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={arturia}
            loading="lazy"
            alt="logo"
            style={{
              width: 150,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={akg}
            loading="lazy"
            alt="logo"
            style={{
              width: 50,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
          <img
            src={allen_and_heath}
            loading="lazy"
            alt="logo"
            style={{
              width: 200,
              marginRight: margin,
              filter: `invert(${invert})`,
            }}
          />
        </div>
      </Marquee>
    </Box>
  );
}
