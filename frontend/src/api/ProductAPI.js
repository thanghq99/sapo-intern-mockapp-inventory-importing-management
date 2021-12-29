import callAPI from "./index";

function ProductAPI() {
  // [GET] /
  this.VariantList = () => {
    return callAPI.get("variants");
  };
  // [GET] /
  this.productList = () => {
    return callAPI.get("products");
  };
  // [GET] /
  this.product = (id) => {
    return callAPI.get(`products/${id}`);
  };
  // [POST] /
  this.createProduct = (data) => {
    return callAPI.post(`products`, data);
  };
}
export default new ProductAPI();
