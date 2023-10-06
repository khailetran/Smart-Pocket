import {useContext} from 'react';
import { authContext } from '@/lib/store/auth-context';
import {MdQueryStats}  from 'react-icons/md';
import {IoMdLogOut}  from 'react-icons/io';

function Nav() {

    const {user, loading, logout} = useContext(authContext);

    return  <header className="container max-w-2xl mx-auto gap-2 ">
    <div  className="flex items-center justify-between">
    {/* User information */}
    {user && !loading &&(
          <div className = "flex items-center gap-2">
      {/* profile image */}
      <div className = "h-[50px] w-[50px] rounded-full overflow-hidden hover:scale-110">  
      <img 
      className ="object-cover w-full h-full "
      src = {user.photoURL}
      alt = {user.displayName}
      referrerPolicy='no-referrer'
      />
      </div>
      {/* name */}
      <small>Hi, {user.displayName}!</small>
    </div>
    )}

    {/* right side of nav */}
    {user && !loading && (
       <nav className="flex items-center gap-4">
      <div>
      <a href="#stats">
      <MdQueryStats className = "text-2xl hover:scale-110"/>
      </a>
      </div>

      <div>
      {/* <button onClick={logout} className='btn btn-danger'>Sign Out</button> */}
      <a href="#">
      <IoMdLogOut onClick={logout} className = "text-2xl hover:scale-110"/>
      </a>
      </div>
    </nav>
     )}
   </div>
  </header>
 }

 export default Nav;