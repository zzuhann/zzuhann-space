import { useContext } from 'react';
import { AuthContext } from '@/store/auth-context';
import { LoggedIn } from '@/components/LoggedIn';
import { EditProfile } from '@/features/editProfile';

const Home = () => {
  const { state } = useContext(AuthContext);

  return <>{state.isLoggedIn ? <EditProfile /> : <LoggedIn />}</>;
};

export default Home;
