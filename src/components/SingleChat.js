import styled from 'styled-components';
import { memo } from 'react';
import Typewriter from './TypeWriter';
import { globalColor } from '../theme';
import IconComponent from '../base/IconComponent';
import { nameImage } from '../utils/nameImage';

const BoxTxtUser = styled.div`
  @media (min-width: 768px) {
    padding: 50px 200px;
    padding-left: 120px;
  }
  color: ${globalColor.white};
  background-color: ${globalColor.slateBlack};
  width: 100%;
  display: flex;
  min-height: 70px;
  align-items: center;
  .icon {
    margin-right: 20px;
    height: 58px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(314deg) brightness(114%) contrast(101%);
  }
`;

const BoxTxtChat = styled.div`
  @media (min-width: 768px) {
    padding: 50px 200px;
    padding-left: ${props => (props.isSpinner ? '200px' : '120px')};
  }
  color: ${globalColor.white};
  background-color: ${globalColor.darkGrayBlue};
  width: 100%;
  will-change: transform, box-shadow, z-index;
  display: flex;
  min-height: 70px;
  align-items: center;
  .icon {
    margin-right: 20px;
    height: 40px;
  }
`;

const WrapSingleChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


const SingleChat = ({ textUser, textResponse, isOldChat }) => (
  <WrapSingleChat>
    <BoxTxtUser>
      <IconComponent className="icon" fileName={nameImage.logoUser} alt="logoBKU" />
      {textUser}
    </BoxTxtUser>
    {isOldChat ? (
      <BoxTxtChat>
        <IconComponent className="icon" fileName={nameImage.logoBku} alt="logoBKU" />
        <div style={{ whiteSpace: 'pre-line' }}>{textResponse}</div>
      </BoxTxtChat>
    ) : <Typewriter text={textResponse} delay={20} />}
  </WrapSingleChat>
);

export default memo(SingleChat)
