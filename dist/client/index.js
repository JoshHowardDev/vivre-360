import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
var root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
