import React, { ReactNode } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './CustomCarrousel.css';

interface CustomCarouselProps {
  children: ReactNode;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ children }) => {
  const totalSlides = React.Children.count(children);
  const theme = useTheme();
  return (
    <Box>
      <CarouselProvider
        naturalSlideWidth={1000}
        naturalSlideHeight={500}
        visibleSlides={1}
        infinite={true}
        totalSlides={totalSlides}
        interval={4000}
        isPlaying={true}
        className="SR-carousel-container"
        isIntrinsicHeight={true}
      >
        <Container
          maxWidth="md"
          sx={{
            paddingLeft: {
              xs: 4,
              md: 0,
            },
            paddingRight: {
              xs: 4,
              md: 0,
            },
          }}
        >
          <Slider>
            {React.Children.map(children, (child, index) => (
              <Slide index={index}>{child}</Slide>
            ))}
          </Slider>
        </Container>

        <ButtonBack>
          <NavigateBeforeIcon
            htmlColor={theme.palette.primary.contrastText}
            fontSize="large"
          />
        </ButtonBack>

        <ButtonNext>
          <NavigateNextIcon
            htmlColor={theme.palette.primary.contrastText}
            fontSize="large"
          />
        </ButtonNext>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <DotGroup />
        </div>
      </CarouselProvider>
    </Box>
  );
};


export default CustomCarousel;
