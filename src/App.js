import './App.css';
import './styles/mixins/global.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
      <Routes/>
    </>
  );
}

export default App;
