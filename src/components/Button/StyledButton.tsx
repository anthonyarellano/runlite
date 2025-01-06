import React from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import { ThemeColors } from "~/types/Colors/ThemeColors";

const StyledButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      sx={{
        ...props.sx,
        backgroundColor: ThemeColors.GLASS,
        "&:hover": {
          backgroundColor: ThemeColors.SECONDARY,
          color: "black",
        },
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      }}
    >
      {props.children}
    </Button>
  );
};

export default React.memo(StyledButton);
