
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Home from './pages/home.tsx';

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <Home />
    </StrictMode>,
);
