import {React} from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <LandingPage/>
      <Footer/>
    </div>
  );
}

export default App;
