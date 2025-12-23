import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from '@/components/GlobalStyles/GlobalStyles.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <GlobalStyles>
                <GoogleOAuthProvider clientId="873497435582-8hf9tmpqb9gp274e2monc7ae5ku37mql.apps.googleusercontent.com">
                    <App />
                </GoogleOAuthProvider>
            </GlobalStyles>
        </BrowserRouter>
    </StrictMode>,
);
