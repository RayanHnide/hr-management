export default {
    login : "/api/login",
    employee : {
        add : "/api/employee/add",
        deleteEmployee : (id) => `/api/employee/delete/${id}`,
        details : (id) => `/api/employee/details/${id}`,
        viewEmployee:"/api/employee/view",
        addEmployee:'/api/employee/add'
    },
    password:{
      changePassword:'/api/change-password'
    },
    admin:{
      add:  '/api/admin/add'
    },
    branches : {
        getAll : "/api/view/branches"
    }
}
