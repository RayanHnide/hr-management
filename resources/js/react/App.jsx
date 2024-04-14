import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import MainDashboard from "./pages/Dashboard/index.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
const App = () => {
    return (
      <>
          <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
         <BrowserRouter>
             <Routes>
                 <Route index element={<SignIn/>}/>
                 <Route >
                     <Route path='/dashboard/*' element={<MainDashboard />}/>
                 </Route>
             </Routes>
         </BrowserRouter>
      </>
    );
};

export default App;
