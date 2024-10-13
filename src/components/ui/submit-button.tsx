import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";

type SubmitButtonProps = Omit<ButtonProps, "children"> & {
  children: React.ReactNode | ((pending: boolean) => React.ReactNode);
};

export default function SubmitButton({
  children,
  ...props
}: SubmitButtonProps) {
  const result = useFormStatus();

  return (
    <Button {...props}>
      {typeof children === "function" ? children(result.pending) : children}
    </Button>
  );
}
