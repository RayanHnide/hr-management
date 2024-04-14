import React, {useEffect, useState} from 'react';
import DashboardLayOut from "../../../layouts/DashboardLayOut.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {baseUrl, getToken} from "../../../helper/tools.jsx";
import apiRoutes from "../../../helper/apiRoutes.js";

const ViewDetails = () => {
    const {id} =  useParams()
    const [data,setData] = useState({})

    const schema = {
        code:"الكود",
        fullName:"الاسم الثلاثي",
        motherName:"اسم الام ",
        birthDate:"تاريخ الميلاد",
        placeOfBirth:"مكان الولادة",
        Constraint:"القيد",
        nationalId:"الرقم الوطني",
        education:"المؤهل العلمي",
        specialization:"التخصص",
        mainSalary:"الراتب الأساسي",
        phone:"رقم الهاتف",
        email:"البريد الالكتروني",
        salary:"الراتب",
        vacation:"الاجازات",
        position:"الصفة الوظيفيّة",
        department:"القسم",
        startDate:"تاريخ المباشرة بالعمل",
        endDate:"تاريخ الانفكاك",
        experience:"الخبرات",
        changeSalary:"التغيرات في الراتب",
        lastWork:"العمل القديم",
        created_at:"انشء بتاريخ",
    }

    const getEmployee=()=>{
        axios.get(baseUrl(apiRoutes.employee.details(id)),{
            headers: {
                Authorization:getToken()
            }
        }).then((res)=>{
            if (res.data?.data) {
                setData(res.data.data)
            }
        })
    }
    useEffect(()=>{
        getEmployee()
    },[])

    return (
         <>
              <DashboardLayOut>
                  <h2 className='p-3'> التفاصيل</h2>

                 <div className='row mx-0'>
                     {
                         Object.entries(schema).map(([k,v]) => <div className='col-4 p-4'>{v}: <h5> {data[k]}</h5>,</div>)
                     }
                     <div className='mb-4'> الفرع:  <h3>
                         {data?.branch?.name}
                     </h3></div>
                 </div>
               </DashboardLayOut>
         </>
    );
};

export default ViewDetails;
