import styled from '@emotion/styled';
import Chatbox from '../components/Chatbox';
import MyChats from '../components/MyChats';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
`

const Chatpage = () => (
  <Container>
    <Wrap>
      <MyChats />
      <Chatbox />
    </Wrap>
  </Container>
);

export default Chatpage;
