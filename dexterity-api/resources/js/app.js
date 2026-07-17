import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Changed to lowercase 'app.jsx' to match your file

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);