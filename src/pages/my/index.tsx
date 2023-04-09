import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";
import { LoggedIn } from "@/components/common/LoggedIn";
import { EditProfile } from "@/components/page/editProfile";

const Home = () => {
  const { state } = useContext(AuthContext);

  return <>{state.isLoggedIn ? <EditProfile /> : <LoggedIn />}</>;
};

export default Home;
