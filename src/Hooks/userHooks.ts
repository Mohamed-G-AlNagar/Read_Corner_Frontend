import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateMyAccount, userLogin, userSignup } from '../services/userAPI';
import { ILoginUserData } from '../models/loginUserData';
import { ISignupUserData } from '../models/signupUserData';
import { IUser } from '../models/IUser';
import toast from 'react-hot-toast';

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

export function useUpdateMyAccount() {
  //? to use it to invalidate the quire to update the data after insterting in the DB

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