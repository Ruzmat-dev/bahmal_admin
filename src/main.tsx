import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ModalsProvider } from '@mantine/modals';


const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
    <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
        <App />
    </ModalsProvider>

    </MantineProvider>
  </React.StrictMode>,
)
