import React, {useState} from 'react';
import FormComponent from "../Components/formComponent/formComponent.jsx";
import {useNavigate} from "react-router-dom";
import {baseUrl, saveRole, saveToken} from "../helper/tools.jsx";
import apiRoutes from "../helper/apiRoutes.js";
import {toast} from "react-toastify";

const SignIn = () => {
    const navigate= useNavigate()
    const [state, setState] = useState({
        userName : "",
        password : "",
    })
    const handleChange = (value, name) => {
        setState(prev => ({...prev, [name] : value?.target?.value ?? value}))
    }

    const onSubmit = () => {
        localStorage.clear();
        axios.post(baseUrl(apiRoutes.login),state).then(r => {
            if (r.data?.data) {
                saveToken(r.data.data?.token);
                saveRole(r.data.data?.role)
                if (r.data?.data?.branch?.isMain) {
                    localStorage.setItem("b","y")
                }
                navigate('/dashboard')
            }
        }).catch(e => {
            toast(`${e?.response?.data?.message ?? "something went wrong"}`, {type: "error"})
        })
    }
    // toast(msg, {type: result.success ? "success" : "error"})

    return (
      <>
           <FormComponent>

               <div className="h1 text-dark text-center">
                   LOGO
               </div>
               <input
                   value={state.userName}
                   onChange={(e) => handleChange(e,"userName")}
                    placeholder="اسم المستخدم"  type="text"/>
               <input value={state.password}
                      onChange={(e) => handleChange(e,"password")} placeholder="كلمة المرور" id="password" name="password" type="password"/>
               <button onClick={onSubmit}  className="btn" type="submit">
                   تسجيل الدخول
               </button>
           </FormComponent>
      </>
    );
};

export default SignIn;
