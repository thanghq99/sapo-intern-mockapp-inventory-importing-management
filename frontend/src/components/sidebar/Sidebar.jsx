import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./sidebar.scss";
import Topbar from '../topbar/Topbar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const navList = [{ title: 'Danh sách sản phẩm', url: '/san-pham/' }, { title: 'Quản lý kho', url: 'kho-hang' }, { title: 'Nhập hàng', url: 'nhap-hang' }, { title: 'Kiểm hàng', url: 'kiem-hang' }, { title: 'Nhà cung cấp', url: 'nha-cung-cap' }, { title: 'Cài đặt', url: 'cai-dat' }];
const subMenuList = [{ title: 'Hotline: 1900 0000', url: '/hotline' }, { title: 'Trợ giúp', url: '/tro-giup' }, { title: 'Thông tin tài khoản', url: '/tai-khoan' }, { title: 'Đăng xuất', url: '/dang-xuat' }]
export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openSubMenu, setopenSubMenu] = React.useState(false);

    //them 2 cai mang vao day
    const navListIcons = [
        <></>
    ]

    const handleSubMenu = () => {
        setopenSubMenu(!openSubMenu);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex', width: "100%", background: "gray"
        }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader className="leftbar_header" >
                    {open && <img className='logo_image' src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg" alt="" />}
                    {open ?
                        <MoreVertIcon className="button_close" onClick={handleDrawerClose}>
                        </MoreVertIcon>
                        :
                        <MoreVertIcon className="button_open" onClick={handleDrawerOpen}>
                        </MoreVertIcon>}
                </DrawerHeader>
                <Divider />
                <List className="nav_leftbar">
                    {navList.map((navItem, index) => (
                        <Link to={navItem.url} className="nav_link">
                            <ListItem className="nav_leftbar_item" button key={navItem.title}>
                                <ListItemIcon className="nav_item_icon">
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        </Link>
                    ))}
                    <Divider />

                    <ListItemButton onClick={handleSubMenu}>
                        <ListItemIcon>
                            {/* {React.createElement(Icons['AccountCircleIcon'])} */}
                            <AccountCircleIcon sx={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Tài khoản" />
                        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {subMenuList.map((navItem, index) => (
                                <Link to={navItem.url} className="nav_link">
                                    <ListItemButton className="nav_leftbar_item" button key={navItem.title} sx={{ pl: 4 }}>
                                        <ListItemIcon className="nav_item_icon">
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={navItem.title} />
                                    </ListItemButton>
                                </Link>
                            ))}
                        </List>
                    </Collapse>
                </List>

            </Drawer>
            <Box className="box_content" component="main">
                <Topbar />
            </Box>
        </Box >
    );
}