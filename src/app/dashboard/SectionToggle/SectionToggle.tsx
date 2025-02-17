import RunningShoe from "~/components/Icons/RunningShoe";
import { SECTIONS } from "~/constants/sections";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { DirectionsRun } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";

interface SectionToggleProps {
  value: string | null;
  setValue: (value: string | null) => void;
}

const ACTIVITY_LOG_TITLE = 'Activity Log';
const SHOES_TITLE = 'Shoes';

export default function SectionToggle({ value, setValue }: SectionToggleProps) {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      sx={{ border: "0.5px solid white" }}
    >
      <Tooltip title={ACTIVITY_LOG_TITLE}>
        <ToggleButton value={SECTIONS.ACTIVITIES} key={SECTIONS.ACTIVITIES}>
          <DirectionsRun
            htmlColor={
              value === SECTIONS.ACTIVITIES ? ThemeColors.SECONDARY : ThemeColors.WHITE
            }
          />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={SHOES_TITLE}>
        <ToggleButton value={SECTIONS.SHOES} key={SECTIONS.SHOES}>
          <RunningShoe
            width="24px"
            height="24px"
            htmlColor={
              value === SECTIONS.SHOES ? ThemeColors.SECONDARY : ThemeColors.WHITE
            }
          />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
