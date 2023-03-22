import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import LoggedIn from "../../components/LoggedIn";
import { EditProfile } from "../../components/editProfile/EditProfile";

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);

  return <>{state.isLoggedIn ? <EditProfile /> : <LoggedIn />}</>;
};

export default Home;
