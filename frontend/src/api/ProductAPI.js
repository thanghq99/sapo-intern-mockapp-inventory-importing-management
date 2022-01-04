import callAPI from './CallAPI';


function ProductAPI() {

  //PRODUCT
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
  // [PUT] /
  this.updateProduct = (id, data) => {
    return callAPI.put(`products/${id}`, data);
  };
  // [DELETE] /
  this.deleteProduct = (id) => {
    return callAPI.delete(`products/${id}`);
  };
  

  //VARIANT
  // [GET] /
  this.variantList = (id) => {
    return callAPI.get(`products/${id}/variants`);
  };
}
export default new ProductAPI();
