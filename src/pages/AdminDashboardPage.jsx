import React, { useState } from 'react';
import { HiOutlineArrowLongUp } from 'react-icons/hi2';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { useContext, useEffect } from 'react';
import { AuthContext, tokenExpireError } from '../authContext';
import { GlobalContext } from '../globalContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboardNav from '../components/AdminDashboardNav';
import MkdSDK from '../utils/MkdSDK';
import AdminTableHeader from '../components/AdminTableHeader';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let sdk = new MkdSDK();
    const getVideosData = async () => {
      sdk._table = 'video';
      try {
        const request = await sdk.callRestAPI(
          {
            payload: {},
            page: 1,
            limit: 10,
          },
          'PAGINATE'
        );

        console.log(request);
        setData(request);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        tokenExpireError(authDispatch, error.message);
        setIsLoading(false);
      }
    };

    getVideosData();
  }, []);

  const logoutHandler = () => {
    authDispatch({ type: 'LOGOUT' });
    navigate('/admin/login');
  };

  return (
    <>
      <section className='w-full min-h-screen pb-16 bg-bg-dark'>
        <AdminDashboardNav logout={logoutHandler} />

        {/* Main Body */}
        {isLoading && !data && (
          <p className='text-center font-light text-3xl md:text-4xl text-white'>
            Loading...
          </p>
        )}
        {!isLoading && data && (
          <div className='mt-24'>
            <div className='flex flex-col items-start justify-center lg:flex-row lg:items-center lg:justify-between w-full px-8 mx-auto max-w-[1200px] gap-8'>
              <h2 className='font-light text-3xl md:text-4xl text-white'>
                Today`s Leaderboard
              </h2>
              <div className='font-light rounded-2xl bg-bg-item-bg p-4 px-8 flex items-center justify-between gap-4'>
                <p className='text-color-icon-secondary'>
                  {new Date().toLocaleDateString('default', {
                    month: 'long',
                  })}{' '}
                  {new Date().getDate()} {new Date().getUTCFullYear()}
                </p>
                <div className='h-1 w-1 bg-color-icon-secondary rounded-full'></div>
                <div className='py-2 px-4 rounded-xl bg-color-link'>
                  SUBMISSIONS OPEN
                </div>
                <div className='h-1 w-1 bg-color-icon-secondary rounded-full'></div>
                <p className='text-color-icon-secondary'>
                  {new Date().getHours() > 12
                    ? new Date().getHours() - 12
                    : new Date().getHours()}
                  :{new Date().getMinutes()}
                </p>
              </div>
            </div>

            {/* VIDEOS */}
            <div className='mt-16 px-8 mx-auto max-w-[1200px]'>
              <AdminTableHeader />
              {data.list?.map((item) => (
                <div key={item.id}>
                  <div className='p-4 px-6 rounded-xl my-2 border-[1px] border-color-icon-secondary grid grid-cols-12 items-center gap-8'>
                    <div className='flex items-center justify-between col-span-12 md:col-span-6 gap-4'>
                      <p className='text-light text-color-icon-secondary text-[14px] col-span-1'>
                        0{item?.id}
                      </p>
                      <div className='flex items-center gap-4 col-span-6'>
                        <img
                          src={item?.photo}
                          alt={item?.title}
                          className='w-[112px] h-[64px] rounded-lg'
                        />
                        <p className='text-light text-color-icon-secondary col-span-1'>
                          {item?.title}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between col-span-12 md:col-span-6'>
                      <p className='text-color-link-visited text-[14px] font-light'>
                        {item?.username}
                      </p>
                      <p className='font-light flex text-color-icon-secondary items-center gap-2'>
                        {item?.like}
                        <HiOutlineArrowLongUp className='text-color-link' />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='w-full mx-auto flex items-center justify-center p-4 gap-4 text-lg text-white'>
              <button className='cursor-pointer p-2 rounded-full border-[1px] border-color-icon-secondary hover:border-color-link duration-300'>
                <HiOutlineArrowLeft />
              </button>
              <button className='cursor-pointer p-2 rounded-full border-[1px] border-color-icon-secondary hover:border-color-link duration-300'>
                <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        )}

        {!isLoading && !data && (
          <p className='mt-24 text-center font-light text-3xl md:text-4xl text-white'>
            NO VIDEO DATA
          </p>
        )}
      </section>
    </>
  );
};

export default AdminDashboardPage;
