"use client";

import React from "react";
import Fade from "~/components/Transitions/Fade";
import Card from "~/components/Card/Card";
import Stack from "~/components/Stack/Stack";
import ActivitySection from "./ActivitySection/ActivitySection";
import Background from "~/components/Background/Background";
import ShoeSection from "./ShoeSection/ShoeSection";
import SectionToggle from "./SectionToggle/SectionToggle";
import { useRouter } from "next/navigation";
import { formatDate } from "~/utils/formatDate";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { getGreeting } from "~/utils/getGreeting";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";
import * as stylex from "@stylexjs/stylex";
import { NotificationProvider } from "~/providers/NotificationProvider";
import { SECTIONS } from "~/constants/sections";

const styles = stylex.create({
  baseText: {
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: "white",
    textAlign: "center",
    margin: 0,
  },
  smallText: {
    fontSize: "1.5rem",
  },
  largeText: {
    fontSize: "2.5rem",
  },
  secondarySpan: (color: ThemeColors) => ({
    color,
  }),
});

export default function Home() {
  const router = useRouter();
  const { validFileAvailable, name } = useRunTrackingStore((state) => state);

  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [sectionValue, setSectionValue] = React.useState<string | null>("runs");

  // If no valid file is available, redirect to "/"
  React.useEffect(() => {
    if (!validFileAvailable) {
      router.push("/");
    }
  }, [router, validFileAvailable]);

  // Update current date every second
  React.useEffect(() => {
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(dateInterval);
  }, []);

  return (
    <NotificationProvider>
      <Background justifyContent="flex-start">
        <Fade in timeout={2000}>
          <Stack direction="column" spacing={30}>
            <Card backgroundColor={ThemeColors.PRIMARY}>
              <Stack
                direction="column"
                spacing={15}
                justifyContent="center"
                alignItems="center"
              >
                <p {...stylex.props(styles.baseText, styles.smallText)}>
                  {formatDate(currentDate)}
                </p>
                <p {...stylex.props(styles.baseText, styles.largeText)}>
                  {getGreeting(currentDate)}
                  <span
                    {...stylex.props(
                      styles.secondarySpan(ThemeColors.SECONDARY)
                    )}
                  >
                    {name}
                  </span>
                </p>
                <SectionToggle
                  value={sectionValue}
                  setValue={setSectionValue}
                />
              </Stack>
            </Card>
            {sectionValue === SECTIONS.SHOES && <ShoeSection />}
            {sectionValue === SECTIONS.ACTIVITIES && <ActivitySection />}
          </Stack>
        </Fade>
      </Background>
    </NotificationProvider>
  );
}
