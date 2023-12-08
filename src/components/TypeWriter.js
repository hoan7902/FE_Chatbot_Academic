import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react'
import { globalColor } from '../theme';
import IconComponent from '../base/IconComponent';
import { nameImage } from '../utils/nameImage';

const BoxTxtChat = styled.div`
  color: ${globalColor.white};
  background-color: ${globalColor.darkGrayBlue};
  padding: 50px 200px;
  padding-left: ${props => (props.isSpinner ? '200px' : '120px')};
  width: 100%;
  will-change: transform, box-shadow, z-index;
  display: flex;
  .icon {
    margin-right: 20px;
    height: 40px;
  }
`;

const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('check text: ', text)
  console.log('check currentIndex: ', currentIndex)

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentText('')
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => {
        clearTimeout(timeout)
      };
    }
    return null
  }, [currentIndex, delay, text]);

  if (!text) return <BoxTxtChat isSpinner><Spinner /></BoxTxtChat>

  return (
    <BoxTxtChat>
      <IconComponent className="icon" fileName={nameImage.logoBku} alt="logoBKU" />
      {currentText}
    </BoxTxtChat>
  );
};

export default Typewriter;
