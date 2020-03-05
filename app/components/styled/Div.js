import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
`;

export const Paper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Hr = styled.hr`
  display: block;
  width: 95%;
  margin: 1rem;
`;
export const HrBlue = styled.hr`
  display: block;
  width: 95%;
  margin: 1rem;
  background-color: tomato;
`;
export const Row = styled.div`
  display: block;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.flexStart
      ? 'flex-start'
      : props.flexEnd
      ? 'flex-end'
      : 'space-between'};
  align-items: center;
  margin: 0.5rem;
`;
