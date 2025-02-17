import React from "react";
import Card from "~/components/Card/Card";
import Stack from "~/components/Stack/Stack";
import Divider from "~/components/Card/Divider";
import ShoeCard from "~/components/ShoeCard/ShoeCard";
import CardTitle from "~/components/Card/CardTitle";
import StyledButton from "~/components/Button/StyledButton";
import AddShoeModal from "./AddShoeModal/AddShoeModal";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";
import { useTranslation } from "~/hooks/useTranslation";
import { SECTION_TITLES } from "~/constants/ui-text";

export default function ShoeSection() {
  const { t } = useTranslation();
  const shoes = useRunTrackingStore((state) => state.shoes);
  const metricType = useRunTrackingStore((state) => state.metricType);
  // const getShoeData = useRunTrackingStore((state) => state.getShoeData);
  const [modalOpen, setModalOpen] = React.useState(false);

  // getShoeData("shoe-1736026133297-99999").then((data) => console.log(data));

  return (
    <Card backgroundColor={ThemeColors.PRIMARY}>
      <AddShoeModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Stack direction="column" justifyContent="flex-start">
        <Stack justifyContent="space-between">
          <CardTitle color={ThemeColors.WHITE}>
            {t(SECTION_TITLES.SHOES)}
          </CardTitle>
          <StyledButton
            sx={{ maxHeight: "2.5rem" }}
            size="small"
            variant="contained"
            onClick={() => setModalOpen(true)}
          >
            Create new shoe
          </StyledButton>
        </Stack>
        <Divider color={ThemeColors.SECONDARY} />
        <Stack direction="column" spacing={20}>
          {shoes?.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} metricType={metricType} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
