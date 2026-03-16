import {Box, Button} from "@mui/material";
import {getReceiptTaskStatuses, receiptUpload} from "../../../api.ts";
import {useEffect, useState} from "react";
import ReceiptFileDropZone from "../../modules/ReceiptFileDropZone/ReceiptFileDropZone.tsx";
import sx from "./ReceiptFileUploadPage.module.css";
import {sleep} from "../../../utils/commonUtils.ts";
import {config} from "../../../config.ts";
import {
  type ReceiptStatusesType,
  ReceiptTaskStatus
} from "../../../types/ReceiptTaskStatus.ts";
import {type FileType, NotificationLevelType} from "../../../types/commonTypes.ts";
import {addNotification} from "../../../store/notificationReducer.ts";
import {useAppDispatch} from "../../../store/hooks.ts";

const ReceiptFileUploadPage = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [receiptIds, setReceiptIds] = useState<string[]>([]);
  const [receiptStatuses, setReceiptStatuses] = useState<ReceiptStatusesType[]>([]);
  const dispatch = useAppDispatch();

  const onClick = async () => {
    if (files.length === 0){
      return;
    }
    const promiseResults = await Promise.allSettled(files.map(file => receiptUpload(file)));
    const responseReceiptIds: string[] = [];
    promiseResults.forEach((promiseResult, index) => {
      if (promiseResult.status === "fulfilled") {
        responseReceiptIds.push(promiseResult.value.receipt_id);
      } else {
        dispatch(addNotification({
          level: NotificationLevelType.error,
          message: `Error during uploading file with '${files[index].name}' name`,
        }));
      }
    });
    setReceiptIds(responseReceiptIds);
  };

  useEffect(() => {
    if (receiptIds.length === 0) {
      return;
    }
    let isMounted = true;
    const controller = new AbortController();
    let pollReceiptTaskStatusAttempt = 1;

    const processReceiptTaskStatuses = async () => {
      const receiptStatusesById = await getReceiptTaskStatuses(receiptIds);
      if (!isMounted) {
        return true;
      }
      const receiptStatusesResult = Array.from(
        Object.entries(receiptStatusesById)
      ).map(([receiptId, receiptStatus]) => {
        if (receiptStatus.status === ReceiptTaskStatus.failed) {
          let detail = `Error during processing '${receiptId}' receipt`;
          if (receiptStatus.detail) {
            detail += `: ${receiptStatus.detail}`
          }
          dispatch(addNotification({level: NotificationLevelType.error, message: detail}));
        }
        return {
          receipt_id: receiptId,
          status: receiptStatus.status,
          detail: receiptStatus.detail,
        }
      });
      setReceiptStatuses(receiptStatusesResult);

      return receiptStatusesResult.every(receiptStatus => (
          receiptStatus.status === ReceiptTaskStatus.success || receiptStatus.status === ReceiptTaskStatus.failed
        )
      );
    };

    const pollReceiptTaskStatuses = async () => {
      while (!controller.signal.aborted) {
        try {
          const completedStatus = await processReceiptTaskStatuses();
          if (completedStatus || pollReceiptTaskStatusAttempt === config.pollReceiptTaskStatusAttemptCount) {
            break;
          }
        } catch {
          receiptIds.map(receiptId =>
            dispatch(addNotification({
              level: NotificationLevelType.error,
              message: `Error during getting receipt task status by '${receiptId}' UUID`,
            }))
          )
        }
        pollReceiptTaskStatusAttempt += 1;

        await sleep(config.pollReceiptTaskStatusIntervalMs);
      }
    };
    pollReceiptTaskStatuses()
      .catch(
        _ => dispatch(
          addNotification({level: NotificationLevelType.info, message: "Error during processing receipts"})
        )
      );
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
      <Box>
        {
          receiptStatuses.map(receiptStatus => (
            <Box key={receiptStatus.receipt_id}>
              <Box>{receiptStatus.receipt_id}</Box>
              <Box>{receiptStatus.status}</Box>
              <Box>{receiptStatus.detail}</Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  );
};

export default ReceiptFileUploadPage;