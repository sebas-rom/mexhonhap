import { Suspense, useState } from 'react';
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  SnackbarOrigin,
} from '@mui/material';
import { Loading } from '../Loading';
import ContactMobile from './Parallax/ContactMobile';
import ContactWeb from './Parallax/ContactWeb';
// import { useTranslation } from 'react-i18next';
import SoundWaves from './SoundWaves';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface SnackbarState {
  openSuccess: boolean;
  openError1: boolean;
  openError2: boolean;
}

function ContactMe() {
  const { t: lang } = useTranslation('home');
  const isMobile = window.innerWidth <= 768;

  // Initialize state variables for name, email, and message
  const [formName, setformName] = useState('');
  const [formEmail, setformEmail] = useState('');
  const [formMessage, setformMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading state

  // State variable for snackbar
  const [snackbarState, setSnackbarState] = useState({
    openSuccess: false,
    openError1: false,
    openError2: false,
  });

  const snackbarPosition: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'center',
  };

  const handleSnackbarClose =
    (key: keyof SnackbarState) =>
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarState((prevState) => ({ ...prevState, [key]: false }));
    };

  const handleSubmit = async () => {
    if (!formName || !formEmail || !formMessage) {
      setSnackbarState((prevState) => ({ ...prevState, openError1: true }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail)) {
      setSnackbarState((prevState) => ({ ...prevState, openError2: true }));
      return;
    }

    setIsLoading(true); // Set loading state to true when submitting

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios
      .post('https://formsubmit.co/ajax/0de7ea8f9e22a00ef57167f384788002', {
        name: formName,
        email: formEmail,
        message: formMessage,
      })
      .then(() => {
        setSnackbarState((prevState) => ({ ...prevState, openSuccess: true }));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false); // Set loading state to false when request is complete
      });
  };

  return (
    <Box
      position="relative"
      width="100%"
      sx={{
        height: {
          xs: 700,
          md: 600,
        },
        backgroundColor: 'black',
      }}
    >
      {Object.entries(snackbarState).map(([key, isOpen]) => (
        <Snackbar
          key={key}
          anchorOrigin={snackbarPosition}
          open={isOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose(key as keyof SnackbarState)}
        >
          <Alert
            onClose={handleSnackbarClose(key as keyof SnackbarState)}
            severity={key === 'openSuccess' ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {key === 'openSuccess'
              ? 'Message sent successfully!'
              : key === 'openError1'
              ? 'Please fill in all fields.'
              : 'Please enter a valid email address'}
          </Alert>
        </Snackbar>
      ))}
      <Suspense fallback={<Loading></Loading>}>
        {isMobile ? <ContactMobile /> : <ContactWeb />}
      </Suspense>
      <Container
        maxWidth="md"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Stack alignContent={'center'} alignItems={'center'} spacing={2}>
          <div />
          <div />
          <SoundWaves />
          <Typography variant="h3" color={'secondary'} textAlign={'center'}>
            {lang('someNoise')}
          </Typography>

          <Stack
            spacing={2}
            sx={{
              width: {
                xs: '100%',
                sm: 400,
              },
            }}
          >
            <Paper>
              <TextField
                {...(isLoading && { disabled: true })}
                required
                label={lang('name')}
                name="name"
                variant="filled"
                fullWidth
                value={formName}
                onChange={(e) => {
                  setformName(e.target.value);
                }}
              />
            </Paper>
            <Paper>
              <TextField
                {...(isLoading && { disabled: true })}
                required
                fullWidth
                label={lang('email')}
                name="email"
                type="email"
                variant="filled"
                value={formEmail}
                onChange={(e) => setformEmail(e.target.value)}
              />
            </Paper>
            <Paper>
              <TextField
                {...(isLoading && { disabled: true })}
                fullWidth
                required
                multiline
                name="query"
                rows={5}
                label={lang('message')}
                variant="filled"
                value={formMessage}
                onChange={(e) => setformMessage(e.target.value)}
              />
            </Paper>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleSubmit}
              sx={{ overflow: 'hidden', height: 45 }}
            >
              {isLoading && <Loading text={false} iconSize={0.7} />}
              {!isLoading && lang('submit')}
            </Button>
            <div />
            <div />
            <div />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export { ContactMe };
