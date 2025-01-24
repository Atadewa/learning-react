/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Logo from './assets/calculator.svg';

export default function App() {
  const [semester, setSemester] = useState(1);
  return (
    <>
      <Header />

      <div className='bg-white border border-sky-100 rounded m-3 shadow-md'>
        <div className='p-4'>
          <h1 className='mb-3'>Semester {semester}</h1>
          <div className='flex items-center'>
            <div className='grid grid-cols-2 gap-1'>
              <input type="text" placeholder='Course Name' className='col-span-2 w-full'/>
              <input type="text" placeholder='Course Name'/>
              <input type="text" placeholder='Course Name'/>
            </div>
            <DeleteButton />
          </div>
        </div>
      </div>
    </>
  )
}

function DeleteButton(){
  return(
    <button type="button" className='btn-delete' onClick={() => console.log('tes')}>&times;</button>
  );
}

function Header(){
  return(
    <header className='w-full p-5 flex items-center justify-start gap-5'>
      <img src={Logo} alt="" className='w-15'/>
      <p className='text-2xl font-bold'>GPA Calculator</p>
    </header>
  );
}