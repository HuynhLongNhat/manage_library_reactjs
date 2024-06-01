
import './App.scss';

import { BrowserRouter, Route, Routes, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";
import 'font-awesome/css/font-awesome.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";

import Home from './components/Home/Home';
import AppRoutes from './routes/AppRoutes';
import SideBar from './components/sideBar/sideBar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='side-bar'>
          {/* <SideBar /> */}
        </div>
        <div className='app-routes'>
          <AppRoutes />
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition: Bounce,
      />
    </div>
  );
}

export default App;
