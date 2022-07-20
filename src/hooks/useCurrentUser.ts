import { useAppSelector } from '../store/hooks';

const useCurrentUser = () => {
  const user = useAppSelector(state => state.auth.login?.currentUser) as any;
  return user;
};

export default useCurrentUser;
