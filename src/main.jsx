import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ToastContainer, toast } from 'react-toastify';
import UserAuthApi from './contextApi.jsx/UserAuthApi.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

 <UserAuthApi>
 <App />

<ToastContainer 
position = "top-center"
limit = {1}
theme = "dark"
hideProgressBar={true}/>
 </UserAuthApi>
  </StrictMode>
)
