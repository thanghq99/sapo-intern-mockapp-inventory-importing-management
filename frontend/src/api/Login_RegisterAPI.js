import CallAPI from "./CallAPI";

function Login_RegisterAPI() {
    
    // [LOGIN] 
    this.logincall = (user) => {
        return CallAPI.post('login', user);
    }
}

export default new Login_RegisterAPI()
