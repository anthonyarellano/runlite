import React from "react";
import * as stylex from "@stylexjs/stylex";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AppRoute } from "~/types/AppRoute/AppRoute";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useNotification } from "~/providers/NotificationProvider";
import { validateUserFile } from "~/utils/validateUserFile";
import { type DropzoneFile } from "~/types/Dropzone/DropzoneFile";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";
import { useTranslation } from "~/hooks/useTranslation";
import { BUTTON_TEXT } from "~/constants/ui-text";
import { translations } from "~/locales/translations";

const pulse = stylex.keyframes({
  "0%": { borderColor: "#fef08a", color: "#fef08a" },
  "50%": { borderColor: "rgba(0, 255, 255, 0)", color: "rgba(0, 255, 255, 0)" },
  "100%": { borderColor: "white" },
});

const styles = stylex.create({
  fileDropZone: {
    padding: "10px",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "transparent",
    border: "2px dashed white",
    color: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    ":hover": {
      animationName: pulse,
      animationDuration: "2s",
      animationIterationCount: "infinite",
    },
  },
});

export default function FileDropZone() {
  const router = useRouter();
  const { t } = useTranslation();
  const { notifySuccess, notifyFailure } = useNotification();
  const { setValidFileAvailable, setName, setMetricType, indexFromFile } =
    useRunTrackingStore((state) => state);

  const onDrop = React.useCallback(
    (acceptedFiles: DropzoneFile[]) => {
      const [acceptedFile] = acceptedFiles;
      validateUserFile(acceptedFile)
        .then(async (data) => {
          if (data.userFile && data.isValid) {
            // If user file is valid, index data for efficient lookups later
            await indexFromFile(acceptedFile as File);
            setValidFileAvailable(data.isValid);
            setName(data.userFile.name);
            setMetricType(data.userFile.metricType);
            notifySuccess("File successfully validated");
            router.push(AppRoute.DASHBOARD);
          }
        })
        .catch((error: Error) => {
          notifyFailure(`Error validating uploaded file: ${error.message}`);
        });
    },
    [
      notifySuccess,
      notifyFailure,
      setMetricType,
      setValidFileAvailable,
      setName,
      indexFromFile,
      router,
    ]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/json": [".json"] },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button {...stylex.props(styles.fileDropZone)}>
        {t(BUTTON_TEXT.DROP_SELECT_FILE)} <UploadFileIcon />
      </button>
    </div>
  );
}
