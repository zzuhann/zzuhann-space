import { useRef } from 'react';
import { auth } from '@/firebase-config';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { userDocType, AuthType } from '@/common/authType';
import { useLoadingService } from '@/store/loading-context';
import { Button } from '@/components/common/Common';
import { Container, InputContainer, InputStyle, Title } from './LoggedIn.style';
import { getDataById } from '@/common/firebaseFun';
import { useStore } from '@/store/useStore';

export const LoggedIn = () => {
  const { updateUser } = useStore();
  const { showLoading, hideLoading } = useLoadingService();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function updateLoggedInState() {
    updateUser({ isLoggedIn: true });
  }

  function signIn() {
    if (emailRef.current && passwordRef.current) {
      showLoading();
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await getData(user);
          hideLoading();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }

  const getData = async (user: User) => {
    const users = await getDataById<userDocType>('users', user.uid);
    if (users) {
      updateLoggedInState();
    }
  };
  return (
    <Container>
      <Title>登入</Title>
      <InputContainer>
        <label htmlFor="email">信箱</label>
        <InputStyle type="text" id="email" ref={emailRef} />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">密碼</label>
        <InputStyle type="password" id="password" ref={passwordRef} />
      </InputContainer>
      <Button onClick={signIn} style={{ alignSelf: 'center' }}>
        送出
      </Button>
    </Container>
  );
};
