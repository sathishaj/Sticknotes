import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import logo from "../assets/logo.svg"
function Notesdrawer({}){
 

     const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
    setOpen(false);
  };


    return(
        <>
          
                     <IconButton 
                      size="large"
                      edge="start"
                      sx={{ mr: 2 }}
                      onClick={()=>setOpen(true)} >
                      <MenuIcon />
                      </IconButton>


           <Drawer open={open} onClose={toggleDrawer} >
            <div className="w-60" >
                  
                  <div className="w-full h-[63px] flex justify-center items-center p-5" >
                     <img src={logo} className="w-14 h-14" />
                    <Typography variant="h6" className=" text-blue-500  !font-bold">Sticky Notes</Typography>
                    
                  </div>
                  <Divider/>
              
               <List>            
                <ListItem >
                    
                    <ListItemButton>
                           <ListItemIcon><DescriptionIcon/></ListItemIcon>
                           <ListItemText primary="Create Notes" className="!font-semibold"  ></ListItemText>
                    </ListItemButton>
                    
                </ListItem>
             </List>
            </div>
            

           </Drawer>
        
        
        
        </>
    )
}
export default Notesdrawer