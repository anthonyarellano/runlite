"use client";
import React from "react";
import styles from "~/app/index.module.css";
import Stack from "../../components/Stack/Stack";
import GenerateFileForm from "./GenerateFileForm/GenerateFileForm";
import DashboardLoading from "./DashboardLoading/DashboardLoading";
import { Fade } from "@mui/material";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";
import * as stylex from "@stylexjs/stylex";
import Background from "~/components/Background/Background";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { useTranslation } from "~/hooks/useTranslation";
import { HEADING } from "~/constants/ui-text";

const stylexStyles = stylex.create({
  container: {
    maxWidth: "80vw",
  },
  secondarySpan: (color: ThemeColors) => ({
    color,
  }),
});

export default function Home() {
  const { t } = useTranslation();
  const { fileDownload } = useRunTrackingStore((state) => state);
  const [titleVisible, setTitleVisible] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTitleVisible(false);

      return () => {
        clearInterval(timeout);
      };
    }, 3000);
  }, []);

  if (fileDownload) {
    return <DashboardLoading />;
  }

  return (
    <Background>
      <Stack direction="column" spacing={50}>
        {titleVisible && (
          <Fade in={titleVisible}>
            <div {...stylex.props(stylexStyles.container)}>
              <Stack spacing={10} justifyContent="center" alignItems="center">
                <h1 className={styles.subTitle}>
                  {t(HEADING.GENERATE_FILE_INTRO)}{" "}
                  <span
                    {...stylex.props(
                      stylexStyles.secondarySpan(ThemeColors.SECONDARY)
                    )}
                  >
                    {t(HEADING.RUNNING)}
                  </span>
                </h1>
                <img
                  height={75}
                  width={75}
                  src="./images/naruto.gif"
                  alt="naruto GIF"
                />
              </Stack>
            </div>
          </Fade>
        )}
        <GenerateFileForm fadeIn={!titleVisible} />
      </Stack>
    </Background>
  );
}
