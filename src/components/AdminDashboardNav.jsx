import React from 'react';

const AdminDashboardNav = (props) => {
  return (
    <nav className='flex items-center justify-between py-4 w-full px-8 mx-auto max-w-[1200px]'>
      <h1 className='font-black text-white text-3xl md:text-5xl'>APP</h1>
      <button
        className='p-4 px-8 bg-color-link hover:bg-color-link-visited duration-300 rounded-full block'
        onClick={props.logout}
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminDashboardNav;
