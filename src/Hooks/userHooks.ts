import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateMyAccount, userLogin, userSignup } from '../services/userAPI.js';
import { ILoginUser } from '../models/ILoginUser';
import { ISignupUser } from '../models/ISignupUser.ts';
import { IUser } from '../models/IUser';
import toast from 'react-hot-toast';

export function useUserLogin(userData: ILoginUser) {
  // prettier-ignore
  const { data } = useQuery({
    queryKey: ['logedInUser'],
    queryFn: () => userLogin(userData)
  });
  console.log(data, 'userData from custom hook');
}

export function useUserSignup(userData: ISignupUser) {
  // prettier-ignore
  const { data } = useQuery({
    queryKey: ['signupUser'],
    queryFn: () => userSignup(userData)
  });
  console.log(data, 'userData from custom hook');
}

export function useUpdateMyAccount() {
  const { mutate } = useMutation({
    mutationFn: (userData: IUser) => updateMyAccount(userData),
    onSuccess: () => {
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
}