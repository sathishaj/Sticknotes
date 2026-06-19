import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import Notesdrawer from "./Notesdrawer";
import logo from "../assets/logo.svg"


const Navbar = () => {
    return (
        <> 
             <AppBar position="fixed" className="!bg-white" >
            <Toolbar>
             <Notesdrawer/>
              <div className="w-full h-[63px] flex items-center">
             <img src={logo} className="w-14 h-14 hidden sm:block" />
            <Typography variant="h6" className="text-blue-500 !font-bold hidden sm:block ">
             Sticky Notes
             </Typography>
</div>

                </Toolbar>               
             </AppBar>
           

        </>
    );
};

export default Navbar;
