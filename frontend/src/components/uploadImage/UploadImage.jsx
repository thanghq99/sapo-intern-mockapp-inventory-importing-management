import React from "react";
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};


export default function UploadImage(props) {

    const [progress, setProgress] = useState(0);
    const uploadImage = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    props.changeImageUrl(downloadURL);
                })
            }
        )
    }

    const [displayState, setDisplayState] = React.useState("none")
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleCancelImg = () => {
        setSelectedImage(null);
        setProgress(0);
        props.changeImageUrl(null);
        setDisplayState("none");
    }

    return (
        <div>
            {selectedImage && (
                <div style={{height:"18em"}}>
                    <img alt="not fount" style={{ height: "100%", width: "100%", objectFit: "contain" }} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <div style={{
                        display: "flex",
                        marginTop: "0.8em",
                        textAlign: "center",
                        justifyContent: "space-around"
                    }}>
                        <IconButton onClick={() => handleCancelImg()} aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
            )
            }
            <br />
            <br />  
            <div style={{ display: displayState }}>
                <h2>{(progress === 100) ? "Hoàn thành" : "Đang tải"}</h2>
                <Box sx={{ width: '80%', marginLeft: "3em" }}>
                    <LinearProgressWithLabel value={progress} />
                </Box>
            </div>
            <br />
            <label
                style={{
                    cursor: "pointer",
                    background: "#1976d2",
                    padding: "0.5em",
                    borderRadius: " 0.4em",
                    color: "white",
                    fontWeight: "500",
                }}
                for="file-upload"
                class="custom-file-upload"
            >
                Thêm ảnh
            </label>
            <input
                type="file"
                name="myImage"
                style={{ display: "none" }}
                id="file-upload"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                    uploadImage(event.target.files[0]);
                    setDisplayState("block");
                }}
            />
        </div >
    );
};
