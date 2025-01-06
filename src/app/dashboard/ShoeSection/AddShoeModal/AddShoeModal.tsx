import React from "react";
import Input from "~/components/Input/Input";
import Stack from "~/components/Stack/Stack";
import Divider from "~/components/Card/Divider";
import CardTitle from "~/components/Card/CardTitle";
import StyledButton from "~/components/Button/StyledButton";
import ModalContentContainer from "~/components/Modal/ModalContentContainer";
import { type Shoe } from "~/types/Shoe/Shoe";
import { ThemeColors } from "~/types/Colors/ThemeColors";
import { Fade, Modal } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNotification } from "~/providers/NotificationProvider";
import { useRunTrackingStore } from "~/providers/RunTrackingStoreProvider";

interface AddShoeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddShoeModal({ open, onClose }: AddShoeModalProps) {
  const addShoe = useRunTrackingStore((state) => state.addShoe);
  const { notifyFailure, notifySuccess } = useNotification();

  const [shoeName, setShoeName] = React.useState<string>("");
  const [existingDistance, setExistingDistance] = React.useState<number>(0);

  const [shoeNameError, setShoeNameError] = React.useState<boolean>(false);
  const [shoeNameChanged, setShoeNameChanged] = React.useState<boolean>(false);

  const metricType = useRunTrackingStore((state) => state.metricType);

  const onShoeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShoeNameChanged(true);
    setShoeName(e.target.value);
  };

  const onExistingDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExistingDistance(Number(e.target.value));
  };

  const resetState = () => {
    setShoeName("");
    setExistingDistance(0);
    setShoeNameError(false);
    setShoeNameChanged(false);
  };

  const handleSaveShoe = () => {
    if (shoeNameError) {
      notifyFailure("Shoe name is required.");
      return;
    }
    const shoe: Shoe = {
      id: uuidv4(),
      name: shoeName,
      distance: existingDistance,
      createdAt: new Date(),
    };
    addShoe(shoe);
    notifySuccess(`"${shoeName}" successfully saved`);
    resetState();
    onClose();
  };

  React.useEffect(() => {
    setShoeNameError(shoeNameChanged && !shoeName);
  }, [shoeName, shoeNameChanged]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Fade in={open}>
        <div>
          <ModalContentContainer>
            <CardTitle color={ThemeColors.WHITE} id="parent-modal-title">
              Shoe details
            </CardTitle>
            <Divider color={ThemeColors.SECONDARY} />
            <Stack direction="column" spacing={20}>
              <Input
                required
                label="Shoe name"
                error={shoeNameError}
                id="shoe-name-input"
                value={shoeName}
                onChange={onShoeNameChange}
                placeholder="Shoe name"
                color={ThemeColors.WHITE}
                helperText={
                  shoeNameError ? "Shoe name is required" : "Max characters: 32"
                }
                maxLength={32}
              />
              <Input
                required
                type="number"
                label={`Existing distance (${metricType})`}
                id="existing-distance-input"
                value={existingDistance}
                onChange={onExistingDistanceChange}
                placeholder="Existing distance"
                color={ThemeColors.WHITE}
                min="0"
              />
              <StyledButton
                disabled={!shoeName || shoeNameError}
                variant="contained"
                onClick={handleSaveShoe}
              >
                Save shoe
              </StyledButton>
            </Stack>
          </ModalContentContainer>
        </div>
      </Fade>
    </Modal>
  );
}
