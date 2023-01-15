import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { AuthActionKind, AuthType } from "../../store/auth-reducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

interface userDocType {
  email: string;
  img: string;
  intro: string;
  name: string;
}

const Home = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { state, dispatch } = useContext(AuthContext);

  async function getFirestoreDataById(collection: string, id: string) {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user: userDocType = docSnap.data() as userDocType;
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
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
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
          getFirestoreDataById("users", user.uid);
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
      {state.isLoggedIn ? (
        <>
          <h1>hello! {state.userInfo.userName}</h1>
        </>
      ) : (
        <>
          <h1>登入</h1>
          <label htmlFor="email">信箱</label>
          <input type="text" id="email" ref={emailRef} />
          <label htmlFor="password">密碼</label>
          <input type="text" id="password" ref={passwordRef} />
          <div onClick={signIn}>送出</div>
        </>
      )}
    </>
  );
};

export default Home;
