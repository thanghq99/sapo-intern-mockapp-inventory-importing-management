import callAPI from './CallAPI';


function ProductAPI() {

    // [GET] /
    this.ProductList = () => {
        return callAPI.get('variants');
    }

}
export default new ProductAPI();