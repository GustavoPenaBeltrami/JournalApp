import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useFormControl,
} from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: activeNote,
    savedMessage,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, id, onInputChange, formState } =
    useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date();
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const fileInputRef = useRef();

  const SaveNote = () => {
    dispatch(startSaveNote());
    if (savedMessage.length > 0) {
      Swal.fire("Nota guardada con exito!", "", "success");
    }
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  }

  return (
    <Grid
      container
      className="animate__animated animate__fadeIn"
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" disabled={isSaving} onClick={()=> fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <input
          multiple
          type="file"
          onChange={onFileInputChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <Button
          onClick={SaveNote}
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Write a title"
          label="Title"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          label="Description"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>
      <Grid>
        <Button
          onClick={onDelete}
          sx={{mt:2}}
          color="error"
        >
          <DeleteOutline/>
          Borrar
        </Button>
      </Grid>
      <ImageGallery images={activeNote.imageUrls}/>
    </Grid>
  );
};
