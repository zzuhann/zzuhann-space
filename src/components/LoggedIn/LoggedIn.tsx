import { useContext, useRef } from 'react';
import { auth } from '@/firebase-config';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { userDocType, AuthType } from '@/common/authType';
import { AuthActionKind } from '@/store/auth-reducer';
import { AuthContext } from '@/store/auth-context';
import { useLoadingService } from '@/store/loading-context';
import { Button } from '@/components/common/Common';
import { Container, InputContainer, InputStyle, Title } from './LoggedIn.style';
import { getDataById } from '@/common/firebaseFun';

export const LoggedIn = () => {
  const { showLoading, hideLoading } = useLoadingService();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { state, dispatch } = useContext(AuthContext);

  function updateloggedInState(user: userDocType) {
    const userData: AuthType = {
      isLoggedIn: true,
    };
    dispatch({ type: AuthActionKind.LOGGEDIN, payload: userData });
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
      updateloggedInState(users);
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
