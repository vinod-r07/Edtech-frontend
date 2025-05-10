import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { store } from './store.js';
import { Provider } from 'react-redux'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Provider store={store}>
 <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
 </Provider>
 </BrowserRouter>,
)
