import { useContext, useRef } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userDocType, AuthType } from "../common/authType";
import { AuthActionKind } from "../store/auth-reducer";
import { AuthContext } from "../store/auth-context";
import { getFirestoreDataById } from "../common/firebaseFun";

const LoggedIn = () => {
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
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          getFirestoreDataById("users", user.uid, updateloggedInState);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }
  return (
    <>
      <h1>登入</h1>
      <label htmlFor="email">信箱</label>
      <input type="text" id="email" ref={emailRef} />
      <label htmlFor="password">密碼</label>
      <input type="text" id="password" ref={passwordRef} />
      <div onClick={signIn}>送出</div>
    </>
  );
};

export default LoggedIn;
