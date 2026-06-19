import { Divider, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Sticknotes = ({date, title , description , stickycolor , menuopen }) => {
    return (
       <>
           <div className={` w-90 h-64 bg-[${stickycolor}] rounded-3xl p-4 flex flex-col gap-2 hover:scale-105 ease-in-out transition duration-300 sm:w-72 `} >
            <div className='flex justify-between items-center' >
                  <div className='text-sm text-gray-700' >{date}</div>
            <div><IconButton  onClick={menuopen} size='small' ><MoreHorizIcon/></IconButton></div>
            </div>
           
           
             <div className='text-lg font-bold text-gray-800 ' >{title}</div>
             <Divider/>

                <div className='text-sm text-gray-700' >{description}</div>
            
            </div>   
           
       </>
    );
};

export default Sticknotes;