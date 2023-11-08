import { Box, Container, Stack, Typography } from '@mui/material';
import CreateTestimonial from './CreateTestimonial';
import michelle_eng from '../../assets/webp/michelle-eng.webp';
import david_schwantes from '../../assets/webp/david-schwantes.webp';
import jon_langberg from '../../assets/webp/jon-langberg.webp';
import marcus_maurer from '../../assets/webp/marcus-maurer.webp';
import steve_han from '../../assets/webp/steve-han.webp';
import CustomCarrousel from '../CustomCarrousel';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export function Testimonials() {
  const theme = useTheme();
  const { t: lang } = useTranslation('home');
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: '100%',
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <div />
          <div />
          <Typography
            variant="h3"
            textAlign="center"
            color={'primary.contrastText'}
          >
            {lang('testimonials')}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color={'primary.contrastText'}
          >
            {lang('testimonialDescription')}
          </Typography>

          <div />
        </Stack>
      </Container>
      <Container maxWidth="md">
        <CustomCarrousel>
          <CreateTestimonial
            name="Michelle Eng"
            occupation="Artist - Game Orchestra"
            testimonial='"Sebastian is a great communicator, asks questions when needed, met
            deadlines, and produced great work! I highly recommend him for all your
            audio needs!"'
            picture={michelle_eng}
          />

          <CreateTestimonial
            name="Steve Han"
            occupation="Artist"
            testimonial={
              "Sebastian completed the work on time & per my requests. He was communicative, responsive, and took my suggestions into consideration. Overall, I'm happy with the quality of the finished work."
            }
            picture={steve_han}
          />

          <CreateTestimonial
            name="Jon Langberg"
            occupation="Artist - Borne"
            testimonial={
              'Sebastian was patient, informative and did a great job mixing and mastering a song for me.'
            }
            picture={jon_langberg}
          />

          <CreateTestimonial
            name="Marcus Maurer"
            occupation="Liorama Visuals"
            testimonial={
              'Super easy going. Good communication. Very patient. Great job.'
            }
            picture={marcus_maurer}
          />

          <CreateTestimonial
            name="David Schwantes "
            occupation="Action Certification"
            testimonial={
              'Sebastian is very talented and easy to work with. Highly recommended.'
            }
            picture={david_schwantes}
          />
        </CustomCarrousel>
      </Container>

      <Box height={25}></Box>
    </Box>
  );
}

export default Testimonials;
