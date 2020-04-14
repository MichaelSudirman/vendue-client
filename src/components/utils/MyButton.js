import React, { Fragment } from "react";
// Material UI core imports
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
// Material UI core icons
import IconButton from "@material-ui/core/IconButton";

export default ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  tipPlacement,
}) => (
  <Tooltip title={tip} className={tipClassName} placement={tipPlacement}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
