import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../authContext';
import { GlobalContext } from '../globalContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboardNav from '../components/AdminDashboardNav';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: globalDispatch } = useContext(GlobalContext);

  const logoutHandler = () => {
    authDispatch({ type: 'LOGOUT' });
    navigate('/admin/login');
  };

  return (
    <>
      <section className='w-full h-screen bg-bg-dark'>
        <AdminDashboardNav logout={logoutHandler} />

        {/* Main Body */}
        <div className='mt-24'>
          <div className='flex flex-col items-start justify-center md:flex-row md:items-center md:justify-between py-4 w-full px-8 mx-auto max-w-[1200px] gap-8'>
            <h2 className='font-light text-3xl md:text-4xl text-white'>
              Today`s Leaderboard
            </h2>
            <div className='font-light rounded-2xl bg-bg-item-bg p-4 px-8 flex items-center justify-between gap-4'>
              <p className='text-white'>30 May 2022</p>
              <div className='h-1 w-1 bg-color-icon-secondary rounded-full'></div>
              <div className='py-2 px-4 rounded-xl bg-color-link'>
                SUBMISSIONS OPEN
              </div>
              <div className='h-1 w-1 bg-color-icon-secondary rounded-full'></div>
              <p className='text-white'>11:34</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
