import styled from 'styled-components';

export default styled.button`
  display: block;
  width: 30%;
  border: ${props => (props.secondary ? '1px solid #7992FF' : '0')};
  border-radius: 3px;
  color: ${props => (props.secondary ? 'white' : '#7992FF')};
  background-color: ${props => (props.secondary ? '#7992FF' : 'white')};
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.secondary ? '#7992FF' : '#ededed'}
    color: white';
}
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: lightgray;
    color: gray;
  }
`;
