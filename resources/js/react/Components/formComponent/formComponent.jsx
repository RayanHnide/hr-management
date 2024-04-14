import React from 'react';
import './formComponentStyle.css'
import {useNavigate} from "react-router-dom";
const FormComponent = ({children}) => {

    return (
        <>

            <div className='sign-in-father bg-dark '>
                <div className="login1 wrap    ">
                    <div className='mt-5'>
                        {children}
                    </div>
                    </div>
            </div>

        </>
    );
};

export default FormComponent;
