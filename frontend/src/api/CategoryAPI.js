import callAPI from "./CallAPI";

function CategoryAPI() {
  // [GET] /
  this.CategoryList = () => {
    return callAPI.get("categories");
  };
}
export default new CategoryAPI();