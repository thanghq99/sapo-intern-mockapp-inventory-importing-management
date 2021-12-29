import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import "./topbar.scss";
import { Avatar, Button, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function Topbar({headerTitle}) {

    return (
        <Box sx={{ flexGrow: 1, background: "white"}}>
            <AppBar sx={{ background: "white" }} position="static">
                <Toolbar>
                    <Typography className="title_topbar" >
                        {headerTitle}
                    </Typography>
                    <Box className='right_topbar' >
                        <Button className="right_topbar_button" variant="text">Tro giup
                            <HelpIcon className="button_icon" />
                        </Button>
                        <Button className="right_topbar_button" variant="text">Gop y
                            <FavoriteBorderIcon className="button_icon"/>
                        </Button>
                        <Avatar src=""/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
