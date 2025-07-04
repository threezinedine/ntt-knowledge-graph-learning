import React from 'react';
import { createRoot } from 'react-dom/client';

import Application from './app';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Application />);
