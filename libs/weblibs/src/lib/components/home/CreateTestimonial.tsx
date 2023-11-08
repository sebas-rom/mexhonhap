import { Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HashImage from '../HashImage';

const TestimonialContainer = styled('div')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
// const TestimonialImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   objectFit: 'cover',
// });

interface CreateTestimonialProps {
  name: string;
  occupation: string;
  testimonial: string;
  picture: string;
}
function CreateTestimonial({
  name,
  occupation,
  testimonial,
  picture,
}: CreateTestimonialProps) {
  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <TestimonialContainer>
          <HashImage
            src={picture}
            alt="testimonial picture"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </TestimonialContainer>

        <Typography
          variant="h5"
          textAlign="center"
          color={'primary.contrastText'}
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color={'secondary.dark'}
        >
          {occupation}
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color={'primary.contrastText'}
        >
          {testimonial}
        </Typography>
      </Stack>
    </Container>
  );
}

export default CreateTestimonial;
