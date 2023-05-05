import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const AdminTableHeader = () => {
  return (
    <div className='p-4 px-6 my-2 grid grid-cols-12 items-center gap-8'>
      <div className='flex items-center col-span-12 md:col-span-6 gap-4'>
        <p className='text-light text-color-icon-secondary text-[14px]'>#</p>
        <p className='text-light text-color-icon-secondary text-[14px]'>
          Title
        </p>
      </div>
      <div className='flex items-center justify-between col-span-12 md:col-span-6 gap-4'>
        <p className='text-light text-color-icon-secondary text-[14px]'>
          Author
        </p>
        <p className='text-light text-color-icon-secondary text-[14px] flex items-center gap-2'>
          Most Liked <MdKeyboardArrowDown />
        </p>
      </div>
    </div>
  );
};

export default AdminTableHeader;
