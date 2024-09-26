import axios from 'axios';
import toast from 'react-hot-toast';
// import { getCartById } from './cartAPI';
import { baseURL } from './var';

export async function userLogin(userData) {
  const { data } = await axios
    .post(`${baseURL}/auth/login`, userData)
    .catch((err) => {
      console.log(err.response);
      toast.error(err.response.data?.error);
      return err.response.data;
    });
  console.log(data);
  if (data?.status === 'SUCCESS') {
    toast.success(data.message);
    localStorage.setItem('token', data.content.access_token);
    // const cart = await getCartById();
    // localStorage.setItem('cartId', cart._id);
  }
  return data;
}


export async function userSignup(userData) {
  const { data } = await axios
    .post(`${baseURL}/auth/register`, userData)
    .catch((err) => {
      console.log(err.response.data);
      if(err.response.data?.validationErrors?.length > 0){
        err.response.data.validationErrors.forEach(ValidErr => {
          toast.error(ValidErr)
        });
      }else{
        toast.error(err.response.data?.error);
      }
      return err.response.data;
    });
  // console.log(data);
  if (data?.status === 'SUCCESS') {
    toast.success(data.message);
  }
  return data;
}

// get loogedin user data

export async function getUserData() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(`${baseURL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Failed to get user data');
    localStorage.removeItem('token');
    return null;
  }
}

// export async function verifyMail(verifyToken) {
//   const {data, error  } = await axios.get(
//     `${baseURL}/auth/activate-account?token=${verifyToken}`
//   );
// console.log(data,"data");
// console.log(error,"error");
//   if (error) return error;
//   return data;
// }