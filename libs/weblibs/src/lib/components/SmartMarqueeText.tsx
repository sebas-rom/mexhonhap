import React, { useRef, useEffect, useState } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Marquee from 'react-fast-marquee';

interface MarqueeTextProps {
  typographyProps: TypographyProps;
  text: string;
}

export const SmartMarqueeText: React.FC<MarqueeTextProps> = ({
  typographyProps,
  text,
}) => {
  // State variable to track whether text overflows
  const [textOverflow, setTextOverflow] = useState(false);

  // Ref for the text element
  const textRef = useRef<HTMLDivElement | null>(null);

  // Function to check if text overflows
  const checkTextOverflow = () => {
    if (textRef.current) {
      setTextOverflow(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  };

  // Listen for changes in the text prop and check text overflow accordingly
  useEffect(() => {
    checkTextOverflow();
  }, [text]);

  return textOverflow ? (
    <Marquee speed={15} delay={1}>
      <Typography {...typographyProps} noWrap ref={textRef}>
        {text}
      </Typography>
      <Typography {...typographyProps} sx={{ color: 'transparent' }}>
        {'_____'}
      </Typography>
    </Marquee>
  ) : (
    <Typography {...typographyProps} noWrap ref={textRef}>
      {text}
    </Typography>
  );
};

export default SmartMarqueeText;
