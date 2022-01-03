const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                token: action.payload,
                error: null
            }
        }
        case "LOGIN_FAILURE": {
            return {
                token: null,
                error: action.payload
            }
        }
        default:
            return state;
    }
}
export default Reducer;