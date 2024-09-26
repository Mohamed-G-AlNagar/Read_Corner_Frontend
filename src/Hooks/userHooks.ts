import { useQuery } from '@tanstack/react-query';
import { userLogin, userSignup } from '../services/userAPI';
import { ILoginUserData } from '../models/loginUserData';
import { ISignupUserData } from '../models/signupUserData';
import { useCart } from './cartHooks';

export function useUserLogin(userData: ILoginUserData) {
  // prettier-ignore
  const { data, isLoading, error } = useQuery({
    queryKey: ['logedInUser'],
    queryFn: () => userLogin(userData)
  });
  console.log(data, 'userData from custom hook');
}

export function useUserSignup(userData: ISignupUserData) {
  // prettier-ignore
  const { data, isLoading, error } = useQuery({
    queryKey: ['signupUser'],
    queryFn: () => userSignup(userData)
  });
  console.log(data, 'userData from custom hook');
}
