import { useAppSelector } from '../store/hooks';

const useToken = () => {
  const user = useAppSelector(state => state.auth.login?.currentUser) as any;
  return user?.accessToken;
};

export default useToken;
