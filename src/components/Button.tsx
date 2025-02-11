import React from "react";
import styled from "@emotion/styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "text";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "medium", fullWidth = false, children, className, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        className={`${variant} ${size} ${fullWidth ? "full-width" : ""} ${className || ""}`}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &.small {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  &.medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  &.large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  &.full-width {
    width: 100%;
  }

  &.default {
    background-color: #28303d;
    color: white;
    &:hover {
      background-color: #1a1f28;
    }
  }

  &.outline {
    background-color: transparent;
    border-color: currentColor;
    color: #28303d;
    &:hover {
      background-color: rgba(40, 48, 61, 0.05);
    }
  }

  &.text {
    background-color: transparent;
    color: #28303d;
    &:hover {
      background-color: rgba(40, 48, 61, 0.05);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
