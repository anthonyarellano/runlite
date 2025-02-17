import React, { type ChangeEvent } from "react";
import Card from "~/components/Card/Card";
import Input from "~/components/Input/Input";
import Stack from "~/components/Stack/Stack";
import Divider from "~/components/Card/Divider";
import CardTitle from "~/components/Card/CardTitle";
import {
  Fade,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { MetricType } from "~/types/MetricType/MetricType";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { initialUserFile } from "~/types/UserFile/UserFile";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";
import * as stylex from "@stylexjs/stylex";
import StyledButton from "~/components/Button/StyledButton";
import { useTranslation } from "~/hooks/useTranslation";
import { HEADING } from "~/constants/ui-text";

interface GenerateFileFormProps {
  fadeIn: boolean;
}

const styles = stylex.create({
  secondaryText: (textColor: ThemeColors) => ({
    color: textColor,
  }),
});

export default function GenerateFileForm({ fadeIn }: GenerateFileFormProps) {
  const { t } = useTranslation();
  const {
    setFileDownload,
    setFileName,
    setName: setStoreName,
    setMetricType: setStoreMetricType,
  } = useRunTrackingStore((state) => state);

  const [name, setName] = React.useState("");
  const [metricType, setMetricType] = React.useState(MetricType.MI);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [inputNameChanged, setInputNameChanged] = React.useState(false);
  const [inputNameError, setInputNameError] = React.useState(false);

  const handleMetricTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMetricType(event.target.value as MetricType);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNameChanged(true);
    setName(event.target.value);
  };

  const generateAndDownloadJson = () => {
    // Set initial user information to object
    const initialFile = { ...initialUserFile };
    initialFile.name = name;
    initialFile.metricType = metricType;
    const jsonStr = JSON.stringify(initialFile);

    // Set initial data in client store
    setStoreName(name);
    setStoreMetricType(metricType);

    // Create file download
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    setFileDownload(url);
    setFileName(`${name}_runlite_data.json`);
  };

  React.useEffect(() => {
    setButtonDisabled(!name);
    setInputNameError(!name && inputNameChanged);
  }, [name, inputNameChanged]);

  return (
    <Card
      fade
      fadeIn={fadeIn}
      fadeTimeout={2000}
      backgroundColor={ThemeColors.GLASS}
    >
      <CardTitle color={ThemeColors.WHITE}>
        {t(HEADING.INFORMATION_PROMPT.PREFIX)}{" "}
        <span {...stylex.props(styles.secondaryText(ThemeColors.SECONDARY))}>
          {t(HEADING.INFORMATION_PROMPT.HIGHLIGHT)}
        </span>{" "}
        {t(HEADING.INFORMATION_PROMPT.SUFFIX)}
      </CardTitle>
      <Divider color={ThemeColors.WHITE} />
      <Fade in={fadeIn} timeout={3000}>
        <div>
          <Stack direction="column" spacing={20}>
            <Input
              required
              label="What should we call you?"
              error={inputNameError}
              maxLength={50}
              helperText={
                inputNameError
                  ? "Name or username is required"
                  : "Max characters: 50"
              }
              id="name-username-input"
              value={name}
              onChange={handleNameChange}
              placeholder="Name or username *"
              color={ThemeColors.WHITE}
            />
            <FormControl>
              <label
                htmlFor="radio-button-group"
                style={{ color: ThemeColors.WHITE }}
              >
                Metric preference
              </label>
              <RadioGroup
                id="radio-button-group"
                value={metricType}
                onChange={handleMetricTypeChange}
                aria-labelledby="metric-radio-buttons-group-label"
                defaultValue="mi"
                name="metric-radio-buttons-group"
              >
                <FormControlLabel
                  value="mi"
                  sx={{ color: ThemeColors.WHITE }}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: ThemeColors.WHITE,
                        "&.Mui-checked": { color: ThemeColors.SECONDARY },
                      }}
                    />
                  }
                  label="mi (miles)"
                />
                <FormControlLabel
                  value="km"
                  sx={{ color: ThemeColors.WHITE }}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: ThemeColors.WHITE,
                        "&.Mui-checked": { color: ThemeColors.SECONDARY },
                      }}
                    />
                  }
                  label="km (kilometers)"
                />
              </RadioGroup>
            </FormControl>
            <StyledButton
              disabled={buttonDisabled}
              variant="contained"
              onClick={generateAndDownloadJson}
            >
              Generate file
            </StyledButton>
          </Stack>
        </div>
      </Fade>
    </Card>
  );
}
