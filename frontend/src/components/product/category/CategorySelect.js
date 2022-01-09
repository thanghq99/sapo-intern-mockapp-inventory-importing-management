import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  InputBase,
} from "@mui/material";
import { Search, ArrowDropDown, Add } from "@mui/icons-material";
import { useHistory, Link } from "react-router-dom";
import CategoryAPI from "../../../api/CategoryAPI";
import "./style.scss";

function CategorySelect({}) {
  const history = useHistory();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  function getData() {
    CategoryAPI.CategoryList().then((pResult) => {
      setCategories(pResult.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <div
        className={`dropDownSelect` + (menuOpen ? " open" : "")}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Typography>
          {category ? category.name : "Chọn loại sản phẩm"}
        </Typography>
        <ArrowDropDown
          className={`dropDownIcon` + (menuOpen ? " iconOpen" : "")}
        />
      </div>
      {menuOpen ? (
        <div className="menuDiv">
          <div>
            <InputBase
              fullWidth
              name="category"
              placeholder="Tìm kiếm hoặc thêm sản phẩm mới"
              // onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <Add />
            <Typography>Thêm loại sản phẩm mới</Typography>
          </div>
        </div>
      ) : (
        ""
      )}
    </Box>
  );
}

export default CategorySelect;
