import React, {useEffect, useState} from 'react';
import DashboardLayOut from "../../../layouts/DashboardLayOut.jsx";
import Employee from "../../../Components/Employee/Employee.jsx";
import {baseUrl, getToken} from "../../../helper/tools.jsx";
import apiRoutes from "../../../helper/apiRoutes.js";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [data,setData] = useState([])
   const navigate = useNavigate()
    const getEmployee=()=>{
        axios.get(baseUrl(apiRoutes.employee.viewEmployee),{
            headers: {
                Authorization:getToken()
            }
        }).then((res)=>{
            setData(res.data.data)
        })
    }
    useEffect(()=>{
        getEmployee()
    },[])
    return (
       <>
           <DashboardLayOut>
               <div className=' align-items-center text-end p-4' >
                   <div>
                       <div className='fs-4 mb-5 '>
                           <input type="Search" placeholder='ابحث' style={{
                               border:'none',borderBottom:'1px solid black',
                               outline:'none'
                           }} />


                       </div>

                       <div className='container row  mx-0   justify-content-between  d-flex '>
                           {
                               data.map((e,i)=>{
                                   return(

                                       <>
                                           <div key={i}     >
                                               <Employee handleDetails={()=>{
                                                  navigate(`/dashboard/user/${e.id}`)
                                                }
                                               } name={e.fullName} country={e.code}/>
                                           </div>
                                       </>
                                   )
                               })
                           }
                       </div>
                   </div>


               </div>


           </DashboardLayOut>
       </>
    );
};

export default HomePage;
