import { useContext, useRef } from "react";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userDocType, AuthType } from "../../common/authType";
import { AuthActionKind } from "../../store/auth-reducer";
import { AuthContext } from "../../store/auth-context";
import { getFirestoreDataById } from "../../common/firebaseFun";
import { useLoadingService } from "../../store/loading-context";
import { Button } from "../common/Common";
import { Container, InputContainer, InputStyle, Title } from "./LoggedIn.style";

export const LoggedIn = () => {
  const { showLoading, hideLoading } = useLoadingService();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { state, dispatch } = useContext(AuthContext);

  function updateloggedInState(user: userDocType) {
    const userData: AuthType = {
      isLoggedIn: true,
      userInfo: {
        email: user.email,
        userName: user.name,
        userImg: user.img,
        userIntro: user.intro,
      },
    };
    dispatch({ type: AuthActionKind.LOGGEDIN, payload: userData });
  }

  function signIn() {
    if (emailRef.current && passwordRef.current) {
      showLoading();
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          getFirestoreDataById("users", user.uid, updateloggedInState);
          hideLoading();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }
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
      <Button onClick={signIn} style={{ alignSelf: "center" }}>
        送出
      </Button>
    </Container>
  );
};
