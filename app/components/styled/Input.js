import styled from 'styled-components';
import ReactQuill from 'react-quill';

export const Input = styled.input`
  display: block;
  width: 95%;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;
export const Checkbox = styled.input`
  margin-top: 3px;
  margin-left: 5px;
  border-radius: 5px;
`;
export const NewLabel = styled.label`
  color: blue;

  padding-left: 15px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
`;

export const InputFeedback = styled.div`
  display: block;
  width: 95%;
  color: #f43b43;
  padding: 0.5rem;
  font-size: 0.75rem;
`;

export const TextField = styled.textarea`
  display: block;
  width: 95%;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  overflow: scroll;
  resize: none;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;

export const Label = styled.label`
  display: block;
  width: 95%;
  font-size: 1rem;
  padding: 0 0.5rem;
  margin-top: 1rem;
`;

export const Dropdown = styled.select`
  min-width: 100px;
  border: 1px solid lightgray;
  height: 1rem;
  &:hover {
    border: 1px solid #007bff;
    outline: none;
  }
  &:active {
    border: 1px solid #007bff;
    outline: none;
  }
`;

export const SmallDropdown = styled.select`
  mix-width: auto;
`;

export const Option = styled.option`
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;

export const FormattableTextArea = styled(ReactQuill)`
  min-height: 300px;
  display: block;
  width: 95%;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  overflow: scroll;
  resize: none;
  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;
