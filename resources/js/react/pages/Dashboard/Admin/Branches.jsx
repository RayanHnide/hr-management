import React, {useEffect, useState} from 'react';
import DashboardLayOut from "../../../layouts/DashboardLayOut.jsx";
import {baseUrl, getToken} from "../../../helper/tools.jsx";
import apiRoutes from "../../../helper/apiRoutes.js";

const Branches = () => {
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

    return (
         <>
            <DashboardLayOut>
                <h1 className='p-3'> جميع الفروع</h1>
                <hr/>
                <div className='row mx-0'>
                    {
                        branches.map((e)=>{
                            return(
                                <>
                                    <h4 className='mt-4'>
                                        {`${e.name}${e.isMain ? " (رئيسي)" : ""}`}
                                    </h4>
                                    <hr/>
                                </>
                            )
                        })
                    }

                 </div>
            </DashboardLayOut>
         </>
    );
};

export default Branches;
