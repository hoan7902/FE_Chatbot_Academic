import {
  useState, useCallback, useMemo,
} from 'react';
import styled from 'styled-components';
import { useToast } from '@chakra-ui/react'
import { globalColor } from '../theme';
import { login, signIn } from '../api';

const BackgroundImage = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: block;
  background-image: url('https://lms.hcmut.edu.vn/pluginfile.php/3/theme_academi/slide1image/1712844374/slbk.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 25px;
  transition: all ease 1s;
  z-index: 2;
  background: rgba(0, 0, 0, .5);
`;

const TextInputStyled = styled.input`
  width: 327px;
  height: 56px;
  background-color: ${global.white};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${globalColor.darkCharcoalBlack};
  padding-left: 40px;
  font-size: 17px;
  border: none;
  outline: none;
`;

const Title = styled.span`
  font-size: 47px;
  margin: 24px 0 0 0;
  color: ${globalColor.white};
  width: 320px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px #000000;
`;

const ButtonLogin = styled.button`
  background-color: ${globalColor.darkCharcoalBlack};
  color: ${globalColor.white};
  width: 320px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  opacity: 0.9;
`;

const TextLogin = styled.span`
  font-weight: bold;
  color: ${globalColor.white};
  font-size: 20px;
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const NoticeText = styled.span`
  color: ${globalColor.white};
`;

const SignUpText = styled.span`
  color: ${globalColor.white};
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
`;

const AuthPage = ({ reloadPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const toast = useToast()

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSwitchSign = useCallback(() => {
    setIsSignUp(prev => !prev);
  }, []);

  const handleSignIn = useCallback(async () => {
    const res = await login({ email, password });
    if (res) {
      toast({
        title: 'Thành công',
        description: 'Đăng nhập thành công.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userName', res.data.user.name);
      setTimeout(() => {
        reloadPage()
      }, 500)
    } else {
      toast({
        title: 'Thất bại',
        description: 'Thông tin của bạn chưa chính xác hoặc chưa đầy đủ',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [email, password]);

  const handleSignUp = useCallback(async () => {
    const res = await signIn({ name, email, password });
    if (res) {
      setIsSignUp(false);
      toast({
        title: 'Thành công',
        description: 'Đăng kí thành công! Đăng nhập để tiếp tục',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } else {
      toast({
        title: 'Thất bại',
        description: 'Thông tin của bạn chưa chính xác hoặc chưa đầy đủ',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [email, password, name]);

  const textNotice = useMemo(() => (isSignUp ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'), [isSignUp]);
  const textSwitch = useMemo(() => (isSignUp ? 'Đăng nhập ngay!' : 'Đăng ký ngay!'), [isSignUp]);

  return (
    <>
      <BackgroundImage />
      <Container>
        <Title>Chat BKU</Title>
        {isSignUp && <TextInputStyled placeholder="Name" value={name} onChange={handleNameChange} />}
        <TextInputStyled placeholder="Email" value={email} onChange={handleEmailChange} />
        <TextInputStyled placeholder="Password" value={password} onChange={handlePasswordChange} type="password" />
        <ButtonLogin onClick={isSignUp ? handleSignUp : handleSignIn}>
          <TextLogin>{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</TextLogin>
        </ButtonLogin>
        <NoticeContainer>
          <NoticeText>{textNotice}</NoticeText>
          <SignUpText onClick={handleSwitchSign}>{textSwitch}</SignUpText>
        </NoticeContainer>
      </Container>
    </>
  );
};

export default AuthPage;
