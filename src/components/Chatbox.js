/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import CurrentChat from './CurrentChat';
import Conversation from './Conversation'
import { globalColor } from '../theme';
import TopNav from './TopNav';
import useIsMobile from '../hooks/useIsMobile';

const CustomBox = styled.div`
  @media (min-width: 768px) {
    display: flex;
    margin-left: 320px;
    align-items: center;
    flex-direction: column;
    background: ${globalColor.slateBlack};
    width: 100%;
  }
  @media (max-width: 767) {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: ${globalColor.slateBlack};
    width: 100%;
  }
  width: 100%;
  z-index: 1;
`;

const Chatbox = ({ onOpenMyChats }) => {
  const isMobile = useIsMobile()
  return (
    <CustomBox>
      {isMobile && <TopNav onOpenMyChats={onOpenMyChats} />}
      <Conversation isMobile={isMobile} />
      <CurrentChat />
    </CustomBox>
  )
};

export default Chatbox;
