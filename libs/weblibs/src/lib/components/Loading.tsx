import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Typography, BoxProps } from '@mui/material';

interface LoadingProps {
  text?: string | false;
  sx?: BoxProps['sx'];
  iconSize?: number; // Size of the CircularProgress icon
  textSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Typography variant size
}

export function Loading({
  text = 'Loading...',
  sx,
  iconSize = 1,
  textSize = 'h5',
}: LoadingProps) {
  return (
    <div style={{ transform: `scale(${iconSize})` }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={sx}
      >
        {text && <Typography variant={textSize}>{text}</Typography>}

        <CircularProgress />
      </Stack>
    </div>
  );
}
