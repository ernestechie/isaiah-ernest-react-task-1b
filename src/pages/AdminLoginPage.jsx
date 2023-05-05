import { useContext, useState } from 'react';
import { showToast } from '../globalContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MkdSDK from '../utils/MkdSDK';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { GlobalContext } from '../globalContext';

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    //TODO
    const BODY = { ...data, role: 'admin' };
    setIsLoading(true);
    try {
      // Call the SDK "Login" method and await the response
      const request = await sdk.login(BODY);

      console.log(request);

      if (request.ok) {
        const { token, user_id, role } = await request.json();

        showToast(globalDispatch, 'Welcome');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('token', JSON.stringify(token));

        authDispatch({
          type: 'LOGIN',
          payload: { token, user: user_id, role, isAuthenticated: true },
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className='w-full max-w-xs mx-auto py-10 px-5'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 '
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            placeholder='Email'
            {...register('email')}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? 'border-red-500' : ''
            }`}
          />
          <p className='text-red-500 text-xs italic'>{errors.email?.message}</p>
        </div>

        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='******************'
            {...register('password')}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? 'border-red-500' : ''
            }`}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.password?.message}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <input
            type='submit'
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading
                ? 'cursor-not-allowed bg-gray-300'
                : 'cursor-pointer bg-blue-500 hover:bg-blue-700'
            }`}
            value={isLoading ? 'Authenticating...' : 'Sign In'}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
