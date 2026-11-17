import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './ui/App';
import './ui/style.css';

const NetworkCheck=lazy(()=>import('./ui/NetworkCheck').then(module=>({default:module.NetworkCheck})));
const check=new URLSearchParams(location.search).get('network-check');
createRoot(document.getElementById('root')!).render(check==='host'||check==='join'?<Suspense fallback={<p>Opening connection check…</p>}><NetworkCheck role={check} /></Suspense>:<App />);
