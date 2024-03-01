import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";

import './index.css'

import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store.ts';
import theme from './theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
     <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
    </ThemeProvider>
  </React.Fragment>,
)
