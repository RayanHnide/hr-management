import React from 'react';
import {Link} from "react-router-dom";
import {getRoutes} from "../helper/tools.jsx";

const DashboardLayOut = ({children}) => {
    return (
       <>

           <div className="container-fluid " dir='rtl' style={{background:'rgb(238, 223, 180)'}}  >
               <div className="row flex-nowrap">
                   <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 text-white  " style={{background:'rgba(127, 4, 4, 0.76)'}}>
                       <div
                           className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">


                           <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                               id="menu">
                               {
                                   getRoutes(true).map((e,i)=>{
                                       console.log(e)
                                       if (!e.path) {
                                           return (
                                               <>

                                                   <li key={i} className="nav-item">
                                                       <button onClick={e.onClick} className="nav-link align-middle px-0 text-white">
                                                           <i className="fs-4 bi-house"></i>
                                                           <span className="ms-1 d-none d-sm-inline">{e.label}</span>
                                                       </button>
                                                       <hr style={{width:'9rem'}}/>
                                                   </li>
                                               </>
                                           )
                                       }
                                       return(<>

                                               <li key={i} className="nav-item">
                                                   <Link to={`/dashboard${e.path}`} className="nav-link align-middle px-0 text-white">
                                                       <i className="fs-4 bi-house"></i>
                                                       <span className="ms-1 d-none d-sm-inline">{e.label}
                                                       </span>
                                                   </Link>
                                                   <hr style={{width:'9rem'}}/>
                                               </li>
                                           </>
                                           )
                                   })
                               }
                           </ul>
                           <hr/>

                       </div>



                   </div>

                  <div   >
                      {children}
                  </div>
               </div>
           </div>


       </>
    );
};

export default DashboardLayOut;
