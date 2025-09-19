import { Link } from 'react-router-dom';
import {Store,Plus} from 'lucide-react'
import { useProductStore } from "../../store/product";
import { Search } from "lucide-react";


const Navbar = () => {
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  return (
      <nav className='flex justify-between my-2'>
      
      <div className='flex items-center'>
          <Link to="/" className='flex items-center'>
          <Store size={40} className=' text-white tracking-tight cursor-pointer hover:text-gray-300'/>
          <h1 className="ml-3 text-4xl font-serif font-bold text-white tracking-tight cursor-pointer hover:text-gray-300">
            Product Store  
            </h1>
        </Link>
      </div>

         <div className="flex items-center w-1/2 mt-2 mr-70">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      
     <Link
        to="/create"
        className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-600 mr-5 flex items-center"
      >
      
       <p className='mr-2'> Add </p>
       <Plus size={20}/>
      </Link>

      </nav>
  );
}

export default Navbar