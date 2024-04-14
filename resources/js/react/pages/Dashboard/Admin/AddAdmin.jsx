import React, {useEffect, useState} from 'react';
import DashboardLayOut from "../../../layouts/DashboardLayOut.jsx";
import FormComponent from "../../../Components/formComponent/formComponent.jsx";
import { SelectPicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import {baseUrl, getToken} from "../../../helper/tools.jsx";
import apiRoutes from "../../../helper/apiRoutes.js";
import {toast} from "react-toastify";

const AddAdmin = () => {
    const [branches, setBranches] = useState([])

    useEffect(() => {
        getBranches();
    }, []);

    const getBranches = () => {
        axios.get(baseUrl(apiRoutes.branches.getAll),{
            headers : {
                Authorization : getToken()
            }
        }).then(r => {
            if (r.data?.data) {
                setBranches(r.data.data)
            }
        })
    }

    const data = branches.map(b => ({ label: `${b.name}${b.isMain ? " (رئيسي) " : ""}`, value: b.id }));
    const [state,setState] = useState({
        fullName:'',
        userName:'',
        password:'',
        password_confirmation:'',
        branchId:'',
        isAdmin:true
    })
    const handleChange = (value, name) => {
        setState(prev => ({...prev, [name] : value?.target?.value ?? value}))
    }
    const handleAdd=()=>{
        axios.post(baseUrl(apiRoutes.admin.add),state,{
            headers:{
                Authorization:getToken()
            }
        }).then((res)=>{
            if (res?.data?.success){
                toast(res?.data?.message ?? "Success", {type: "success"})
            }
        }).catch(r => {
            let msg = "something went wrong";
            if (r?.response?.data?.message) {
                if (typeof(r?.response?.data?.message) === "object") {
                    msg = Object.values(r?.response?.data?.message).map(m => m.map(x => `${x}\n`)).join(",");
                } else {
                    msg = r?.response?.data?.message;
                }
            }
            toast(msg, {type: "error"})
        })
    }
    return (
      <>
           <DashboardLayOut>
               <FormComponent>
                   <div className="h3 text-dark text-center">
                       اضافة أدمن
                   </div>
                   <input placeholder="االاسم الثلاثي" onChange={(value)=>handleChange(value,"fullName")}  type="text"/>
                   <input placeholder="   اسم المستخدم" onChange={(value)=>handleChange(value,"userName")}   type="text"/>
                   <input placeholder="كلمة المرور  " id="password" onChange={(value)=>handleChange(value,"password")}    type="password"/>
                   <input placeholder=" تأكيد كلمة المرور  " id="password_confirmation" onChange={(value)=>handleChange(value,"password_confirmation")}    type="password"/>
                   <div className='mt-3'>
                       <SelectPicker placement="auto" onChange={(value)=>handleChange(value,"branchId")} placeholder='select Branch' data={data} style={{ width: 900 ,background:'none'}} />
                   </div>

                   <button onClick={handleAdd}
                     className="btn" type="submit">
                       حفظ
                   </button>
               </FormComponent>
           </DashboardLayOut>
      </>
    );
};

export default AddAdmin;
