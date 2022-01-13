import { Button } from "@mui/material";
import React, { Component } from "react";

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };

        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    render() {
        return (
            <div>
                <div>
                    <div>
                        <img style={{ width: "17em", marginBottom: "1em" }} src={this.state.image} />
                        <br />
                        <label style={{
                            cursor: "pointer",
                            background: "#1976d2",
                            padding: "0.8em",
                            borderRadius: " 0.4em",
                            color: "white",
                            fontWeight: "500",
                        }} for="file-upload" class="custom-file-upload">
                            Thêm ảnh
                        </label>
                        <input style={{ display: "none" }} id="file-upload" type="file" name="myImage" onChange={this.onImageChange} />
                    </div>
                </div>
            </div >
        );
    }
}
export default UploadImage;