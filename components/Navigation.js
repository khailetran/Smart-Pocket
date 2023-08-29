import {ImStatsDots}  from 'react-icons/im'

function Nav() {
    return  <header className="container max-w-2xl px-6 py-6 mx-auto">
    <div  className="flex items-center justify-between">
    {/* User information */}
    <div className = "flex items-center gap-2">
      {/* profile image */}
      <div className = "h-[40px] w-[40px] rounded-full overflow-hidden">  
      <img 
      className ="object-cover w-full h-full"
      src = "https://vapa.vn/wp-content/uploads/2022/12/avatar-doremon-cute-001.jpg"
      alt = "Image Profile"
      />
      </div>
      {/* name */}
      <small>Hi, Khaile!</small>
    </div>

    {/* right side of nav */}
    <nav className="flex items-center gap-4">
      <div>
      <ImStatsDots className = "text-2xl"/>
      </div>

      <div>
      <button className='btn btn-danger'>Sign Out</button>
      </div>
    </nav>
   </div>
  </header>
 }

 export default Nav;