import styled from "styled-components";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";

const Container = styled.div`
  text-align: center;
`;

interface Profile {
  email: string;
  password: string;
}

const Home = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function signIn() {
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current;
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }

  return (
    <div>
      <h1>登入</h1>
      <label htmlFor="email">信箱</label>
      <input type="text" id="email" ref={emailRef} />
      <label htmlFor="password">密碼</label>
      <input type="text" id="password" ref={passwordRef} />
      <div onClick={signIn}>送出</div>
    </div>
  );
};

export default Home;
