import {FaAngry} from "react-icons/fa";

const Nothing = () => {
  return (
    <div className='bg-brownPrimary flex justify-center items-center flex-col gap-3 h-screen'>
        <h2 className='font-bold'>Halaman Tidak Ditemukan...</h2>
        <FaAngry size={60} className='animate-spin' />
    </div>
  )
}

export default Nothing