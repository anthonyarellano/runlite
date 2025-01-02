import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { type DropzoneFile } from "~/types/Dropzone/DropzoneFile";
import { useDropzone } from "react-dropzone";
import { validateUserFile } from "~/utils/validateUserFile";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";
import * as stylex from "@stylexjs/stylex";
import { useNotification } from "~/providers/NotificationProvider";
import { useRouter } from "next/navigation";
import { AppRoute } from "~/types/AppRoute/AppRoute";

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
  const { notifySuccess, notifyFailure } = useNotification();
  const { setValidFileAvailable, setName, setMetricType, initializeFromFile } = useRunTrackingStore(
    (state) => state
  );

  const onDrop = React.useCallback(
    (acceptedFiles: DropzoneFile[]) => {
      const [acceptedFile] = acceptedFiles;
      initializeFromFile(acceptedFile as File);
      validateUserFile(acceptedFile)
        .then((data) => {
          if (data.userFile && data.isValid) {
            // If UserFile is valid, set to in memory state
            setValidFileAvailable(data.isValid);
            setName(data.userFile.name);
            setMetricType(data.userFile.metricType);
            notifySuccess("File successfully validated");
            router.push(AppRoute.DASHBOARD);
            // TODO: When Shoe and Run data is available, set in memory state
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
        Drop / select file <UploadFileIcon />
      </button>
    </div>
  );
}
