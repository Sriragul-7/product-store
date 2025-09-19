import './index.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';



function App() {
  return(
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />

        </Routes>
         <Toaster position="bottom-center" reverseOrder={false} />
    </div>
 
  )
}

export default App
