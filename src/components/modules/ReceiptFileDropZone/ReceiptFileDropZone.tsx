import {useEffect} from "react";
import {useDropzone} from "react-dropzone";
import {Box, Button, Typography} from "@mui/material";
import sx from "./ReceiptFileDropZone.module.css";
import type {FileType} from "../../../types/commonTypes.ts";

type ReceiptFileDropZoneProps = {
  files: FileType[];
  setFiles: (files: FileType[]) => void;
}

const ReceiptFileDropZone = ({files, setFiles}: ReceiptFileDropZoneProps) => {
  const {getRootProps, getInputProps, open} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div className={sx.thumb} key={file.name}>
      <div className={sx.thumbInner}>
        <img
          src={file.preview}
          className={sx.img}
          onLoad={() => {URL.revokeObjectURL(file.preview)}}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <Box className={sx.dropzoneBox} {...getRootProps()}>
        <input {...getInputProps()}/>
        <Typography variant="h5">
          Drag 'n' drop receipt image here, or click to select file
        </Typography>
        <Box className={sx.openFileDialogButtonBox}>
          <Button variant="contained" size="large" onClick={
            (event) => {
              event.stopPropagation();
              open();
            }
          }>
            Open File Dialog
          </Button>
        </Box>
      </Box>
      <Box className={sx.thumbsBox}>
        <aside className={sx.thumbsContainer}>
          {thumbs}
        </aside>
      </Box>
    </>
  );
};

export default ReceiptFileDropZone;