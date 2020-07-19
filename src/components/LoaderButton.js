import React from "react";
import { Button } from "react-bootstrap";
import "./LoaderButton.css";
import { FcSynchronize } from "react-icons/fc";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <FcSynchronize className="spin" />}
      {props.children}
    </Button>
  );
}
