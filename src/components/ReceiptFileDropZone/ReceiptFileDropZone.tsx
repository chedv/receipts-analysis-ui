import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {Box, Typography} from "@mui/material";
import sx from "./ReceiptFileDropZone.module.css";

type ReceiptFileDropZoneProps = {
  fileContent: Blob | null;
  setFileContent: (fileContent: Blob) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
}

const ReceiptFileDropZone = ({fileContent, setFileContent, fileName, setFileName}: ReceiptFileDropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileBuffer = reader.result;
        if (fileBuffer instanceof ArrayBuffer) {
          const extname = file.name.split(".").pop();
          const imageBlob = new Blob([fileBuffer], {type: `image/${extname}`});
          setFileContent(imageBlob);
          setFileName(file.name);
        }
      }
      reader.readAsArrayBuffer(file);
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <Box className={sx.dropzoneBox} {...getRootProps()}>
      <input {...getInputProps()}/>
      {
        !fileContent &&
          <Typography variant="h5">
              Drag 'n' drop receipt image here, or click to select file
          </Typography>
      }
      {
        fileContent &&
          <Box className={sx.fileContentBox}>
            <img className={sx.uploadImage} src="/assets/file.png" alt={fileName}/>
            <Typography variant="h6">{fileName}</Typography>
          </Box>
      }
    </Box>
  );
};

export default ReceiptFileDropZone;