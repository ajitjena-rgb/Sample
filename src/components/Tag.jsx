import React from 'react';
import styled from 'styled-components';

const TagWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 100px;
  border: 1.5px solid #DDDFE4;
  background: ${({ active }) => (active ? '#EEF2FF' : '#FFFFFF')};
  color: ${({ active }) => (active ? '#4F46E5' : '#11304F')};
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #48B5B5;
    color: #48B5B5;
  }

  &:active {
    transform: scale(0.97);
  }
`;

/**
 * Tag / chip component.
 * Maps to Figma "Tags" — Emphasis: Subtle, Size: Large, Color: Gray
 */
export default function Tag({ label, active = false, onClick, ...props }) {
  return (
    <TagWrapper active={active} onClick={onClick} {...props}>
      {label}
    </TagWrapper>
  );
}
