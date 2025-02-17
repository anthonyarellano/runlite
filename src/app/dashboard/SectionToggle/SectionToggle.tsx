import RunningShoe from "~/components/Icons/RunningShoe";
import { SECTIONS } from "~/constants/sections";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { DirectionsRun } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useTranslation } from "~/hooks/useTranslation";
import { TOOLTIP_TEXT } from "~/constants/ui-text";

interface SectionToggleProps {
  value: string | null;
  setValue: (value: string | null) => void;
}

export default function SectionToggle({ value, setValue }: SectionToggleProps) {
  const { t } = useTranslation();

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
      <Tooltip title={t(TOOLTIP_TEXT.ACTIVITY_LOG)}>
        <ToggleButton value={SECTIONS.ACTIVITIES} key={SECTIONS.ACTIVITIES}>
          <DirectionsRun
            htmlColor={
              value === SECTIONS.ACTIVITIES
                ? ThemeColors.SECONDARY
                : ThemeColors.WHITE
            }
          />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t(TOOLTIP_TEXT.SHOES)}>
        <ToggleButton value={SECTIONS.SHOES} key={SECTIONS.SHOES}>
          <RunningShoe
            width="24px"
            height="24px"
            htmlColor={
              value === SECTIONS.SHOES
                ? ThemeColors.SECONDARY
                : ThemeColors.WHITE
            }
          />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
