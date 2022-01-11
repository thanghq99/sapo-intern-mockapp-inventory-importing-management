import callAPI from "./CallAPI";

function Payment() {
  // [GET] /
  this.Paid = (orderId, data) => {
    return callAPI.post(`orders/${orderId}/payment`, data);
  };
}
export default new Payment();