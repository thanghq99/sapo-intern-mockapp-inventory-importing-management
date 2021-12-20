import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./sidebar.scss";
import Topbar from '../topbar/Topbar';
import Supply from '../../pages/Supply/Supply';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemButton from '@mui/material/ListItemButton';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PhoneIcon from '@mui/icons-material/Phone';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';

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
const navListIcons = [
    <LocalMallIcon />, <WarehouseIcon />, <AddShoppingCartIcon />, <AssignmentTurnedInIcon />, <AddBusinessIcon />, <SettingsIcon />
]
const userNavListIcons = [<PhoneIcon />, <LiveHelpIcon />, <ContactMailIcon />, <LogoutIcon />]

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openSubMenu, setopenSubMenu] = React.useState(false);



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
            display: 'flex', width: "100%", background: "#27274b"
        }}>
            <CssBaseline />
            <Drawer className="drawer" variant="permanent" open={open}>
                <DrawerHeader className="leftbar_header" >
                    {open && <img className='logo_image' src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg" alt="" />}
                    {open ? <IconButton className="button_close" onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MoreVertIcon size="large" />}
                    </IconButton> : <IconButton className="button_open" onClick={handleDrawerOpen}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuIcon />}
                    </IconButton>}
                </DrawerHeader>
                <List className="nav_leftbar">
                    {navList.map((navItem, index) => (
                        <Link to={navItem.url} className="nav_link">
                            <ListItem className="nav_leftbar_item" button key={navItem.title}>
                                <ListItemIcon className="nav_item_icon">
                                    {navListIcons[index]}
                                </ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        </Link>
                    ))}

                    <ListItemButton onClick={handleSubMenu}>
                        <ListItemIcon>
                            <AccountCircleIcon sx={{ color: 'white' }} />
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
                                            {userNavListIcons[index]}
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
                <Supply />
            </Box>
        </Box >
    );
}