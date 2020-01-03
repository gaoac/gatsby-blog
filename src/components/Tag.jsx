import React from 'react';
import styled from 'styled-components';

const SCTag = styled.span`
  box-sizing: border-box;
  margin: 0 8px 0 0;
  color: ${props => (props.color ? '#fff' : '#555')};
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  display: inline-block;
  height: auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: ${props => props.color || '#fafafa'};
  border: 1px solid ${props => (props.color ? 'transparent' : '#d9d9d9')};
  border-radius: 4px;
  cursor: default;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
`;

const Tag = ({ color, children }) => {
  return <SCTag color={color}>{children}</SCTag>;
};

export default Tag;
