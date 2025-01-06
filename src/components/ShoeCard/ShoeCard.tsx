import React from "react";
import Card from "../Card/Card";
import Stack from "../Stack/Stack";
import CardTitle from "../Card/CardTitle";
import RunningShoe from "../Icons/RunningShoe";
import { type Shoe } from "~/types/Shoe/Shoe";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { type MetricType } from "~/types/MetricType/MetricType";
import { formatShortDate } from "~/utils/formatDate";

interface ShoeCardProps {
  shoe: Shoe;
  metricType: MetricType;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, metricType }) => {
  return (
    <Card backgroundColor={ThemeColors.GLASS}>
      <Stack direction="column" spacing={10}>
        <Stack spacing={20}>
          <RunningShoe width="40px" />
          <CardTitle color={ThemeColors.WHITE} component="h3">
            {shoe.name}
          </CardTitle>
        </Stack>
        <Card backgroundColor={ThemeColors.SECONDARY}>
          <Stack spacing={20}>
            <p>
              Distance: {shoe.distance} {metricType}
            </p>
            <p>Created: {formatShortDate(shoe.createdAt)}</p>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
};

export default React.memo(ShoeCard);
