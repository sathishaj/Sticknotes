import { Button, Menu, MenuItem, Skeleton, Snackbar, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Createform from "../Frorms/Createform";
import { useEffect, useState } from "react";
import Sticknotes from "../Components/Sticknotes";
import moment from "moment";
import Updateform from "../Frorms/Updateform";
import emty from "../assets/emty.jpg"
import StickyNotesSkeleton from "../Components/StickynotesSkeleton";



function NotesPage() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [editopen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const colors = ["#FFEB3B", "#FFCDD2", "#BBDEFB", "#C8E6C9", "#D1C4E9"];
  const [anchorEl, setAnchorEl] = useState(null);
  const MenuPopup = Boolean(anchorEl);
  const [deleting , setDeleting] = useState(false);
  const [snackbaropen, setSnackbaropen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  
  const APIKEY = import.meta.env.VITE_API_KEY
  

  
  const menuhandleClick = (event, note) => {
    setAnchorEl(event.currentTarget);
    setSelectedNote(note);
  };

  const menuhandleClose = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const editformclose = () => {
    setEditOpen(false);
    
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${APIKEY}/api/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
       
      setTimeout((ms)=> setLoading(false), 1000 )
    }
  };
   
  useEffect(() => {
    fetchNotes();
  }, []);

   
  const deleteNote = async () => {
  if (!selectedNote?._id) return;

  setDeleting(true);
  try {
    const res = await fetch(`${APIKEY}/api/notes/${selectedNote._id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete note");

    setSnackbarMsg("Note deleted successfully");
    setSnackbaropen(true);
    fetchNotes();
  } catch (err) {
    console.error("Delete failed:", err);
    setSnackbarMsg("Failed to delete note");
    setSnackbaropen(true);
  } finally {
    setDeleting(false);
    setAnchorEl(null); 
  }
};
  
   

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={MenuPopup} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={menuhandleClose}>Edit Notes</MenuItem>
        <MenuItem onClick={deleteNote}>
        {deleting ? "Deleting..." : "Delete Notes"}
        </MenuItem>
      </Menu>

      <Updateform
        open={editopen}
        onclose={editformclose}
        onNoteUpdated={fetchNotes}
        note={selectedNote}
      />

      <Createform open={open} onclose={handleClose} onNoteCreated={fetchNotes} />

      <div className=" mt-16 p-5 flex justify-between ">
        <h1 className="text-xl font-bold text-gray-500">My Notes</h1>
        <Button
          onClick={handleOpen}
          variant="outlined"
          className="!capitalize"
          startIcon={<AddIcon />}
        >
          New Notes
        </Button>
      </div>

      <div className=" w-[100%] flex pl-7.5 p-5  " >

          <div className=" flex flex-wrap gap-5 ">
  {loading ? (
    Array.from({ length: 5 }).map((_, index) => (

      <StickyNotesSkeleton key={index} />

      // <Stack key={index} >
      //    <Skeleton variant="text"width={100} ></Skeleton >
      //    <Skeleton width={250} ></Skeleton>
      //    <Skeleton width={250} height={200} ></Skeleton>


      // </Stack>
     
       
    ))
  ) : notes.length === 0 ? (
    <div className="text-center w-[100%] h-full flex justify-center items-center ">
      <img src={emty} className="w-52" alt="" />
    </div>
  ) : (
    notes.map((note) => (
      <div  key={note._id}>
        <Sticknotes
          date={moment(note.date).format("DD MMM YYYY")}
          title={note.Title}
          description={note.Description}
          stickycolor={note.Color}
          menuopen={(e) => menuhandleClick(e, note)}
        />
      </div>
    ))
  )}
</div>

      </div>

   


  <Snackbar
  open={snackbaropen}
  autoHideDuration={3000}
  onClose={() => setSnackbaropen(false)}
  message={snackbarMsg}
/>
    </>
  );
}

export default NotesPage;
