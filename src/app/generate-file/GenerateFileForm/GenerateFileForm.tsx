import React from "react";
import Card from "~/app/components/Card/Card";
import Input from "~/app/components/Input/Input";
import Stack from "~/app/components/Stack/Stack";
import Divider from "~/app/components/Card/Divider";
import CardTitle from "~/app/components/Card/CardTitle";

interface GenerateFileFormProps {
  fadeIn: boolean;
}

export default function GenerateFileForm({ fadeIn }: GenerateFileFormProps) {
  return (
    <Card
      fade
      fadeIn={fadeIn}
      fadeTimeout={2000}
      backgroundColor="rgba(254, 240, 138, 1)"
    >
      <CardTitle>Enter some information to get started 🏃</CardTitle>
      <Divider />
      <Stack direction="column" spacing={20}>
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
      </Stack>
    </Card>
  );
}
