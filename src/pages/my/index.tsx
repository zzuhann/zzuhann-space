import { LoggedIn } from '@/components/LoggedIn';
import { EditProfile } from '@/features/editProfile';
import { useStore } from '@/store/useStore';

const Home = () => {
  const { user } = useStore();

  return <>{user.isLoggedIn ? <EditProfile /> : <LoggedIn />}</>;
};

export default Home;
