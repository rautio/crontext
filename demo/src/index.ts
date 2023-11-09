// Shoelace
import '@shoelace-style/shoelace/dist/themes/dark.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/copy-button/copy-button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

// App components
import './cron-editor';
import './icons/what-is-cron';
import './app-header';

// Set the base path to the folder you copied Shoelace's assets to
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Vercel speed insights API
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

reportWebVitals(sendToVercelAnalytics);
