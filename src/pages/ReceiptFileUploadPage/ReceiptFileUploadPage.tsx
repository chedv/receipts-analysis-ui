import {Box, Button} from "@mui/material";
import {getReceiptOcrResult, getReceiptStatus, receiptUpload} from "../../api.ts";
import {useEffect, useState} from "react";
import ReceiptFileDropZone from "../../components/ReceiptFileDropZone/ReceiptFileDropZone.tsx";
import sx from "./ReceiptFileUploadPage.module.css";
import {sleep} from "../../utils/commonUtils.ts";
import {config} from "../../config.ts";
import { ReceiptTaskStatus } from "../../types/ReceiptTaskStatus.ts";

const ReceiptFileUploadPage = () => {
  const [fileContent, setFileContent] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [receiptId, setReceiptId] = useState<string>("");
  const [receiptOcrResult, setReceiptOcrResult] = useState(null);
  const [notification, setNotification] = useState<string>("");

  const onClick = async () => {
    if (!fileContent){
      return;
    }
    const responseData = await receiptUpload(fileContent, fileName);
    setReceiptId(responseData.receipt_id);
  };

  useEffect(() => {
    if (!receiptId) {
      return;
    }
    let isMounted = true;
    const controller = new AbortController();

    const pollReceiptOcrTaskStatus = async () => {
      while (!controller.signal.aborted) {
        const responseData = await getReceiptStatus(receiptId);
        if (!isMounted) {
          return;
        }
        if (responseData.status === ReceiptTaskStatus.success) {
          const ocrResponse = await getReceiptOcrResult(receiptId);
          setReceiptOcrResult(ocrResponse.receipt_text);
          break;
        }
        if (responseData.status === ReceiptTaskStatus.failed) {
          setNotification("Error during receipt ocr task");
          break;
        }
        await sleep(config.pollReceiptOcrTaskStatusIntervalMs);
      }
    };
    pollReceiptOcrTaskStatus();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [receiptId]);

  return (
    <Box className={sx.mainBox}>
      <Box className={sx.card}>
        <ReceiptFileDropZone
          fileContent={fileContent}
          setFileContent={setFileContent}
          fileName={fileName}
          setFileName={setFileName}
        />
      </Box>
      <Box>
        <Button
          onClick={onClick}
          disabled={!fileContent || !fileName}
          variant="contained"
          size="large"
        >
          Upload
        </Button>
      </Box>
      {
        notification &&
          <Box>{notification}</Box>
      }
      {
        receiptOcrResult &&
          <Box>{receiptOcrResult}</Box>
      }
    </Box>
  );
};

export default ReceiptFileUploadPage;