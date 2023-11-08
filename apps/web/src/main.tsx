import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { ParallaxProvider } from 'react-scroll-parallax';
import { I18nextProvider } from 'react-i18next';
import { i18next } from '@ui/shared';
import { ThemeContextProvider } from '@ui/weblibs';
import { initLang } from '@ui/weblibs';
import { BrowserRouter } from 'react-router-dom';
initLang(); //important for i18next on web

let currentBaseName = '';
if (import.meta.env.MODE === 'development') {
  currentBaseName = '/';
} else {
  currentBaseName = '/audiosebasdev';
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <ThemeContextProvider>
          <ParallaxProvider>
            <BrowserRouter basename={currentBaseName}>
              <App />
            </BrowserRouter>
          </ParallaxProvider>
        </ThemeContextProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}