import callAPI from './index';


function OrderAPI() {

    // [GET] /
    this.OrderList = () => {
        return callAPI.get('orders');
    }

    // [GET]
    this.OrderItem = (data) =>{
        return callAPI.get(`orders/${data}`);
    }

    // [POST]
    this.createOrder = (data) => {
        return callAPI.post('orders/', data)
    }

    // [PUT]
    this.updateOrder = (id, data) => {
        return callAPI.put(`orders/${id}`,data)
    }


}
export default new OrderAPI();