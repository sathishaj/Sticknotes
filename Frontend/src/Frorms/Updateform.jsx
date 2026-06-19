import {
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const schema = z.object({
  Title: z.string().min(3, { message: 'Title Required' }),
  Color: z.string().min(1, { message: 'Color Required' }),
  Description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
});

function Updateform({ open, onclose, onNoteUpdated, note }) {

       const APIKEY = import.meta.env.VITE_API_KEY;
      const [loading, setLoaging]= useState(false)
      const [snackbaropen, setSnackbaropen] = useState(false)
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    reset
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      Title: "",
      Color: "",
      Description: "",
    },
  });

  useEffect(() => {
    if (note) {
      setValue("Title", note.Title);
      setValue("Color", note.Color);
      setValue("Description", note.Description);
    }
      console.log( "updateform", note)
  }, [note, setValue]);

    const handleSnackbarClose = () => {
    setSnackbaropen(false);
  };

 const onSubmit = async (data) => {
  if (!note || !note._id) {
    console.error("Note is undefined or missing _id");
    return;
  }

   setLoaging(true)

  try {
    const response = await fetch(`${APIKEY}/api/notes/${note._id}`
, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: data.Title,
        Description: data.Description,
        Color: data.Color,
      }),
    
    });
     if (!response.ok) throw new Error("Failed to update note");
    await delay(700)
    const result = await response.json();
    console.log("Updated note:", result);
    setSnackbaropen(true)
    onNoteUpdated()
    reset()  
    onclose()
    

  } catch (err) {
    console.error("Error updating note:", err);
  } finally{
    setLoaging(false)
  }
};


  return (
    <>
       <Dialog open={open} maxWidth>
      <form className="w-80 sm:w-[700px] " onSubmit={handleSubmit(onSubmit)}>
        <div className="p-7">
          <div className="flex justify-between">
            <div className="font-semibold">Update Note</div>
            <div>
              <IconButton onClick={onclose} size="small" className="!bg-black">
                <CloseIcon className="!text-white" />
              </IconButton>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 mb-4">
            <Controller
              name="Title"
              {...register("Title")}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Title"
                  className="w-full"
                  error={!!errors.Title}
                  helperText={errors.Title?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="Color"
              {...register("Color")}
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.Color}>
                  <InputLabel>Select Color</InputLabel>
                  <Select label="Select Color" {...field}>
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
                </FormControl>
              )}
            />

            <Controller
              name="Description"
              {...register("Description")}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Description"
                  className="w-full"
                  multiline
                  rows={5}
                  error={!!errors.Description}
                  helperText={errors.Description?.message}
                  {...field}
                />
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={loading} loadingPosition="end" variant="outlined" className="!capitalize"> 
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>

            </div>
          </div>
        </div>
      </form>
    </Dialog>
     
       <Snackbar
        open={snackbaropen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Note updated successfully!"
      />

    </>
  
  );
}

export default Updateform;
