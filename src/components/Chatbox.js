import styled from 'styled-components';
import CurrentChat from './CurrentChat';
import Conservation from './Conservation';

const CustomBox = styled.div`
display: none;
@media (min-width: 768px) {
  display: flex;
}
align-items: center;
flex-direction: column;
background: #343541;
width: 100%;
flex: 1;
`;

const Chatbox = () => (
  <CustomBox>
    <Conservation />
    <CurrentChat />
  </CustomBox>
);

export default Chatbox;
