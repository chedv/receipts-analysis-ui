import {Box, Button} from "@mui/material";
import {getReceiptStatuses, receiptUpload} from "../../api.ts";
import {useEffect, useState} from "react";
import ReceiptFileDropZone from "../../components/ReceiptFileDropZone/ReceiptFileDropZone.tsx";
import sx from "./ReceiptFileUploadPage.module.css";
import {sleep} from "../../utils/commonUtils.ts";
import {config} from "../../config.ts";
import {type ReceiptStatusResponseType, ReceiptTaskStatus} from "../../types/ReceiptTaskStatus.ts";
import {type FileType, NotificationLevelType} from "../../types/commonTypes.ts";
import {useDispatch} from "react-redux";
import {addNotification} from "../../store/notificationReducer.ts";

const ReceiptFileUploadPage = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [receiptIds, setReceiptIds] = useState<string[]>([]);
  const dispatch = useDispatch();

  const onClick = async () => {
    if (files.length === 0){
      return;
    }
    const responseDataList = await Promise.all(files.map(file => receiptUpload(file)));
    setReceiptIds(responseDataList.map(responseData => responseData.receipt_id));
  };

  useEffect(() => {
    if (receiptIds.length === 0) {
      return;
    }
    let isMounted = true;
    const controller = new AbortController();
    let receiptIdsForStatuses = new Set<string>(receiptIds);

    const processReceiptOcrTaskStatus = async (receiptId: string, responseData: ReceiptStatusResponseType) => {
      if (responseData.status === ReceiptTaskStatus.success || responseData.status === ReceiptTaskStatus.failed) {
        receiptIdsForStatuses.delete(receiptId);
        if (responseData.status === ReceiptTaskStatus.failed) {
          let detail = `error during processing '${receiptId}' receipt`;
          if (responseData.detail) {
            detail += `: ${responseData.detail}`
          }
          dispatch(addNotification({level: NotificationLevelType.info, message: detail}));
        }
      }
    };
    const pollReceiptOcrTaskStatuses = async () => {
      while (!controller.signal.aborted) {
        const responseData = await getReceiptStatuses(receiptIds);
        if (!isMounted) {
          return;
        }
        await Promise.all(
          Array.from(responseData.entries()).map(async ([receiptId, receiptStatus]) => {
            await processReceiptOcrTaskStatus(receiptId, receiptStatus);
          })
        );
        if (receiptIdsForStatuses.size === 0) {
          break;
        }
        await sleep(config.pollReceiptOcrTaskStatusIntervalMs);
      }
    };
    pollReceiptOcrTaskStatuses();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [receiptIds]);

  return (
    <Box className={sx.mainBox}>
      <Box className={sx.card}>
        <ReceiptFileDropZone
          files={files}
          setFiles={setFiles}
        />
      </Box>
      <Box>
        <Button
          onClick={onClick}
          disabled={files.length === 0}
          variant="contained"
          size="large"
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default ReceiptFileUploadPage;