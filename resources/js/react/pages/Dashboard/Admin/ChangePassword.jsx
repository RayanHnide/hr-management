import React, {useState} from 'react';
import FormComponent from "../../../Components/formComponent/formComponent.jsx";
import {useNavigate} from "react-router-dom";
import DashboardLayOut from "../../../layouts/DashboardLayOut.jsx";
import {baseUrl, getToken} from "../../../helper/tools.jsx";
import apiRoutes from "../../../helper/apiRoutes.js";
import {toast} from "react-toastify";

const ChangePassword = () => {
    const navigate= useNavigate()
    const [state,setState]=useState({
         password:'',
         oldPassword:'',
         password_confirmation:''
    })
    const handleChange = (value, name) => {
        setState(prev => ({...prev, [name] : value?.target?.value ?? value}))
    }
    const handleAdd=()=>{
        axios.post(baseUrl(apiRoutes.password.changePassword),state,{
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
                <FormComponent >
                    <div className="h1 text-dark text-center">
                       تغيير كلمة المرور
                    </div>
                    <input
                        value={state.oldPassword}
                        onChange={(e)=>handleChange(e,"oldPassword")}
                        placeholder=" كلمة المرور القديمة"  type="password"/>
                    <input value={state.password}  placeholder="كلمة المرور الجديدة"     type="password"
                           onChange={(e)=>handleChange(e ,"password")}
                    />
                    <input value={state.password_confirmation}  placeholder="تأكيد كلمة المرور الجديدة"   type="password"
                           onChange={(e)=>handleChange(e,"password_confirmation")}
                    />
                    <button onClick={handleAdd}  className="btn" type="submit">
                        حفظ
                    </button>
                </FormComponent>
          </DashboardLayOut>
      </>
    );
};

export default ChangePassword;
