import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import LoggedIn from "../../components/LoggedIn";

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <h1>hello! {state.userInfo.userName}</h1>
        </>
      ) : (
        <LoggedIn />
      )}
    </>
  );
};

export default Home;
