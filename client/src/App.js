
import './styles/App.css';
import LandingPage from './FrontEndComponents/LandingPage';
import Footer from './FrontEndComponents/Footer';
import Login from './Authentication/Login';

function App() {
   return (
      <div>
         <Login/>
         <button className="bg-blue-500 text-white px-4 py-2 rounded">Tailwind Button</button>

      </div>
   );
}

export default App;
