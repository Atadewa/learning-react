import Logo from '../assets/calculator.svg'

export default function Header(){
  return(
    <header className='w-full p-5 flex items-center justify-start gap-5'>
      <img src={Logo} alt="" className='w-15'/>
      <p className='text-2xl font-bold'>GPA Calculator</p>
    </header>
  );
} 