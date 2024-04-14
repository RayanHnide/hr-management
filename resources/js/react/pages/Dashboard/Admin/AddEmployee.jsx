import React, {useEffect, useState} from 'react';
import DashboardLayOut from "../../../layouts/DashboardLayOut.jsx";
import axios from "axios";
import {baseUrl, getToken} from "../../../helper/tools.jsx";
import apiRoutes from "../../../helper/apiRoutes.js";
import {SelectPicker} from "rsuite";
import {toast} from "react-toastify";

const AddEmployee = ({hideBranches = false}) => {
    const [branches, setBranches] = useState([])
    const [branch,setBranch] = useState('')

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
    const [email,setEmail] = useState('')
    const [textType,setTextType]=useState({
        fullName:'',
        motherName:'',
        placeOfBirth:'',
        Constraint:'',
        education:'',
        position:'',
        department:'',
        experience:'',
        changeSalary:'',
        vacation:'',
        nationalId:'',
        phone:'',
        specialization:'',
        code:''
    })
    const [numberType,setNumberType] = useState({
        salary:'',
        branchId:'',
        mainSalary:''
    })
    const [dateType,setDateType]=useState({
        birthDate:'',
        endDate:'',
        startDate:''
    })
    const InputText=
        [
            {
                placeholder:'الاسم الثلاثيّ',
                name:'fullName'
            },
            {
                placeholder:'اسم الأم',
                name:'motherName'
            },
            {
                placeholder:'مكان الولادة',
                name:'placeOfBirth'
            },
            {
                placeholder:'القيد',
                name:'Constraint'
            },

            {
                placeholder:'المؤهل العلمي',
                name:'education'
            },
            {
                placeholder:'الصفة الوظيفيّة',
                name:'position'
            },
            {
                placeholder:'القسم او المديرية',
                name:'department'
            },

            {
                placeholder:'الخبرات والمؤهلات',
                name:'experience'
            },
            {
                placeholder:' التغييرات  على الراتب',
                name:'changeSalary'
            },
            {
                placeholder:'الإجازات ',
                name:'vacation'
            },
            {
                placeholder:'الرقم الوطني',
                name:'nationalId'
            },
            {
                placeholder:'رقم التواصل',
                name:'phone'
            },
            {
                placeholder:'   التخصص',
                name:'specialization'
            },
            {
                placeholder:'الكود',
                name:'code'
            },
        ]
    const InputNumber=[

        {
            placeholder:'الراتب ',
            name:'salary'
        },
        {
            placeholder:'الراتب الأساسي ',
            name:'mainSalary'
        },
        {
            placeholder:'رقم تعريف القسم ',
            name:'branchId'
        },


    ]
    const InputDate=[
        {
            placeholder:'تاريخ الولادة',
            name:'birthDate'
        },
        {
            placeholder:'تاريخ المباشرة بالعمل',
            name:'startDate'
        },
        {
            placeholder:'تاريخ الانفكاك',
            name:'endDate'
        }
    ]
    const handleChangeText = (value, name) => {
        setTextType(prev => ({...prev, [name] : value?.target?.value ?? value}))
    }
    const handleChangeNumber= (value, name) => {
        setNumberType(prev => ({...prev, [name] : value?.target?.value ?? value}))
     }
    const handleChangeDate= (value, name) => {
        setDateType(prev => ({...prev, [name] : value?.target?.value ?? value}))
    }
    const handleAdd=()=>{
        const apiData = {
            ...textType,
            ...numberType,
            ...dateType,
            email,
        };
        if (!hideBranches) {
            apiData.branchId = branch;
        }
        axios.post(baseUrl(apiRoutes.employee.addEmployee),
            apiData,
            {
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
              <h1 className='text-end p-3'>اضافة موظف</h1>
              <hr/>
              <div style={{marginLeft:'20rem'}}>
                  <div className='row  mx-0 justify-content-around mx-3 '>
                      {
                          InputText.map((e,i)=>{
                              return(

                                  <>
                                      <div  className='col-md-4 d-flex justify-content-around p-5  '>
                                          <div >
                                              <input  onChange={(value)=>{
                                                     handleChangeText(value,`${e.name}`)
                                              }} type="text" placeholder= {e.placeholder} />
                                          </div>

                                      </div>
                                  </>
                              )
                          })
                      }

                  </div>
                  <div className='row  mx-0 justify-content-around '>
                      {
                          InputNumber.map((e,i)=>{
                              return(
                                  <>
                                      <div className='col-md-3 d-flex justify-content-around p-5  '>
                                          <div >
                                              <input onChange={(value)=>{
                                                  handleChangeNumber(value,`${e.name}`)
                                              }} type="number" placeholder= {e.placeholder} />
                                          </div>

                                      </div>
                                  </>
                              )
                          })
                      }

                  </div>
                  <div className='row  mx-0 justify-content-around '>
                      {
                          InputDate.map((e,i)=>{
                              return(
                                  <>
                                      <div className='col-md-3 d-flex justify-content-around p-5  '>
                                          <div >
                                              <input onChange={(value)=>{
                                                 handleChangeDate(value,`${e.name}`)
                                              }} type="date" placeholder= {e.placeholder} />
                                          </div>

                                      </div>
                                  </>
                              )
                          })
                      }

                  </div>
                  <div className='row mt-5  mx-0 justify-content-center   '>


                      <>
                          <div className="col-md-4 mb-5  d-flex justify-content-center">
                              <input onChange={(value)=>{

                                  setEmail(value.target.value)
                              }
                              } type="email" placeholder="البريد الالكتروني" />
                          </div>

                      </>
                      {
                          !hideBranches && <SelectPicker placement="auto" onChange={(e)=>{
                              setBranch(e)
                          }
                          } placeholder='select Branch' data={data} style={{ width: 900 ,background:'none'}} />
                      }



                  </div>
              </div>
                 <div className='d-flex justify-content-center mb-5 ' style={{marginLeft:'20rem'}}>
                     <button className='w-25 btn btn-dark' onClick={handleAdd}>
                         اضافة
                     </button>
                 </div>
          </DashboardLayOut>
      </>
    );
};

export default AddEmployee;
