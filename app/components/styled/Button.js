import styled from 'styled-components';

import { Anchor } from './Font';

export const Button = styled.button`
  display: inline-block;
  border: ${props => (props.secondary ? '1px solid #7992FF' : '0')};
  border-radius: 3px;
  color: ${props => (props.secondary ? '#7992FF' : 'white')};
  background-color: ${props => (props.secondary ? 'white' : '#7992FF')};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #6175cc;
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

export const ToolbarButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 3px;
  color: #444444;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  &:hover {
    background-color: '#6175CC';
    color: white;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    color: lightgray;
  }
`;

export const AnchorButton = styled(Anchor)`
  display: inline-block;
  width: 95%;
  border: ${props => (props.secondary ? '1px solid #7992FF' : '0')};
  border-radius: 3px;
  color: ${props => (props.secondary ? '#7992FF' : 'white')};
  background-color: ${props => (props.secondary ? 'white' : '#7992FF')};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #6175cc;
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
