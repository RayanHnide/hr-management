import React from 'react';

const Employee = ({name,country,handleDetails}) => {
    return (
        <>
        <div style={{borderBottom: "1px solid grey"}} className=' d-flex justify-content-around p-1 mt-2'>
            <div >
                {name}
            </div>
            <div >
                {country}
            </div>
            <button onClick={handleDetails} className=' btn-dark p-1'>التفاصيل</button>
        </div>
          </>
    );
};
export default Employee;
