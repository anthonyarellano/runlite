import Card from "~/components/Card/Card";
import Stack from "~/components/Stack/Stack";
import Divider from "~/components/Card/Divider";
import CardTitle from "~/components/Card/CardTitle";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { useTranslation } from "~/hooks/useTranslation";
import { SECTION_TITLES } from "~/constants/ui-text";

export default function ActivitySection() {
  const { t } = useTranslation();
  return (
    <Card backgroundColor={ThemeColors.PRIMARY}>
      <Stack direction="column" justifyContent="flex-start">
        <CardTitle color={ThemeColors.WHITE}>
          {t(SECTION_TITLES.ACTIVITIES)}
        </CardTitle>
        {/* TODO: Add Activity UI */}
      </Stack>
      <Divider color={ThemeColors.SECONDARY} />
    </Card>
  );
}
