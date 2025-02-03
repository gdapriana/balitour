import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {LoadingProvider} from "@/provider/loading.tsx";
import {ScrollProvider} from "@/provider/scroll.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoadingProvider>
      <ScrollProvider>
        <App />
      </ScrollProvider>
    </LoadingProvider>
  </BrowserRouter>
)
