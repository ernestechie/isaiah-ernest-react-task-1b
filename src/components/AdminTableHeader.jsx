import React from 'react';

const AdminTableHeader = () => {
  return (
    <div className='p-4 px-6 rounded-xl my-2 border-[1px] border-color-icon-secondary grid grid-cols-12 items-center gap-8'>
      <div className='flex items-center justify-between col-span-12 md:col-span-6 gap-4'>
        <p className='text-light text-color-icon-secondary text-[14px] col-span-1'>
          #
        </p>
        <p className='text-light text-color-icon-secondary text-[14px] col-span-1'>
          Title
        </p>
      </div>
      <div className='flex items-center justify-between col-span-12 md:col-span-6 gap-4'>
        <p className='text-light text-color-icon-secondary text-[14px] col-span-1'>
          Author
        </p>
        <p className='text-light text-color-icon-secondary text-[14px] col-span-1'>
          Most Liked
        </p>
      </div>
    </div>
  );
};

export default AdminTableHeader;
