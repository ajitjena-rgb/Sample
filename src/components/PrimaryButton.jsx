import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ disabled }) => (disabled ? '#E5E8EC' : '#48B5B5')};
  color: ${({ disabled }) => (disabled ? '#A0AAB4' : '#FFFFFF')};
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    filter: brightness(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

/**
 * Primary button.
 * Maps to Figma "Primary" — Type: Primary, State: Default/Disabled
 */
export default function PrimaryButton({ children, disabled = false, onClick, ...props }) {
  return (
    <StyledButton disabled={disabled} onClick={!disabled ? onClick : undefined} {...props}>
      {children}
    </StyledButton>
  );
}
