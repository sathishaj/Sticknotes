import { Button, Dialog, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import {z} from "zod"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";


const schema = z.object({
    Title : z.string().min(3, {message : 'Title Required'}),
    Color : z.string().min(1, {message : 'Color Required'}),
    Description: z.string().min(10, {message : 'Description must be at least 10 characters long'}),
})


function Createform({open , onclose , onNoteCreated  }){

 const APIKEY = import.meta.env.VITE_API_KEY;

  const { control, formState: { isSubmitSuccessful, errors , mode:all }, reset, handleSubmit, register, setValue, getValues } = useForm({
    mode:"all",
    resolver: zodResolver(schema),
    defaultValues: {

      Title :"" ,
      Color : ""  ,    
      Description: "" ,
    },
  });

      useEffect(() => {
  
    if (isSubmitSuccessful) {
         reset();
    }
  }, [isSubmitSuccessful]);
  
 
const onSubmit = async (data) => {
  try {
    const response = await fetch(`${APIKEY}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: data.Title,
        Description: data.Description,
        Color: data.Color,
      }),
    });

    const result = await response.json();
    console.log("Saved note:", result);
     onNoteCreated();
  } catch (err) {
    console.error("Error posting note:", err);
  }
};

    return(
        <>
          
 <Dialog open={open} maxWidth >
    <form  className="w-80 sm:w-[700px] " onSubmit={handleSubmit(onSubmit)} > <div className="p-7" >
        <div className="flex justify-between" >
            <div className="font-semibold"  >Create Notes </div>
            <div><IconButton onClick={onclose} size="small" className="!bg-black" ><CloseIcon className="!text-white" /></IconButton></div>
            </div>
            <div className="flex flex-col gap-3 mt-4 mb-4 " >
                <Controller
                name="Title"{...register("Title")}
                control={control}
                ref={null}
                render={({field})=>
                <TextField 
                label="Title" 
                className=" flex-grow "
                error={!!errors.Title}
                        helperText={errors.Title ? errors.Title.message : ''}
                        {...field} />
                 }/>
               
                <Controller
                name="Color"{...register("Color")}
                control={control}
                ref={null}
                render={({field})=>
                <FormControl  error={!!errors.Color} >
                    <InputLabel  error={!!errors.Color} >Select Color</InputLabel>
                    <Select 
                     error={!!errors.Color}
                    {...field} label="Select Color" >
                        <MenuItem value={"#FFEB3B"}>
                        <span className="flex gap-2 items-center">
                            <div className="w-5 h-5 rounded-full bg-[#FFEB3B]"></div>
                            <div>Yellow</div>
                            </span>
                        </MenuItem>

<MenuItem value={"#FFCDD2"}>
  <span className="flex gap-2 items-center">
    <div className="w-5 h-5 rounded-full bg-[#FFCDD2]"></div>
    <div>Rose</div>
  </span>
</MenuItem>

<MenuItem value={"#C8E6C9"}>
  <span className="flex gap-2 items-center">
    <div className="w-5 h-5 rounded-full bg-[#C8E6C9]"></div>
    <div>Mint</div>
  </span>
</MenuItem>

<MenuItem value={"#BBDEFB"}>
  <span className="flex gap-2 items-center">
    <div className="w-5 h-5 rounded-full bg-[#BBDEFB]"></div>
    <div>Sky Blue</div>
  </span>
</MenuItem>

<MenuItem value={"#FFF9C4"}>
  <span className="flex gap-2 items-center">
    <div className="w-5 h-5 rounded-full bg-[#FFF9C4]"></div>
    <div>Lemon</div>
  </span>
</MenuItem>

<MenuItem value={"#D1C4E9"}>
  <span className="flex gap-2 items-center">
    <div className="w-5 h-5 rounded-full bg-[#D1C4E9]"></div>
    <div>Lavender</div>
  </span>
</MenuItem>

 </Select>
  <FormHelperText>{errors.Color?.message}</FormHelperText>

</FormControl> }/>
  
                       <Controller
                        name="Description"{...register("Description")}
                        control={control}
                        ref={null}
                        render={({field})=>
                       <TextField
                         label="Description" 
                          className="w-[100%] flex-grow" 
                          multiline
                          rows={4}  error={!!errors.Description}
                        helperText={errors.Description ? errors.Description.message : ''}
                        {...field}  /> } />

                      <div className="flex justify-end" ><Button type="submit" color="secondary" variant="outlined" className="!capitalize" > Submit </Button></div>

                 </div>                
             </div>

           </form>

          </Dialog>
           
        
        
        </>
    )
}
 export default Createform