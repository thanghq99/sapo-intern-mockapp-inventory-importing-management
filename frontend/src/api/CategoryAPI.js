import callAPI from "./index";

function CategoryAPI() {
  // [GET] /
  this.CategoryList = () => {
    return callAPI.get("categories");
  };
}
export default new CategoryAPI();