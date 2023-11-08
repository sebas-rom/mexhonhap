import { Stack } from '@mui/material';
import { HomeHeader } from '@ui/weblibs';
import { Work } from '@ui/weblibs';
import { ContactMe } from '@ui/weblibs';
import { About } from '@ui/weblibs';
import { Navbar } from '@ui/weblibs';
import { PlaybackProvider } from '@ui/weblibs';
import { Testimonials } from '@ui/weblibs';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t: lang } = useTranslation('home');
  return (
    <>
      <Navbar />
      <div style={{ width: '100%' }} id="Top">
        <HomeHeader />
      </div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div style={{ width: '100%' }} id={lang('work')}>
          <PlaybackProvider>
            <Work />
          </PlaybackProvider>
        </div>

        <div style={{ width: '100%' }} id={lang('about')}>
          <About />
        </div>

        <div style={{ width: '100%' }} id={lang('testimonials')}>
          <Testimonials />
        </div>
      </Stack>

      <div style={{ width: '100%' }} id={lang('contact')}>
        <ContactMe />
      </div>
    </>
  );
}

export default Home;
