import callAPI from "./index";

function Login_RegisterAPI() {
    
    // [LOGIN] 
    this.logincall = (user) => {
        return callAPI.post('login', user);
    }
}

export default new Login_RegisterAPI()
