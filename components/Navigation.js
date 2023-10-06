import {useContext, useState, useEffect} from 'react';
import { authContext } from '@/lib/store/auth-context';
import {MdQueryStats}  from 'react-icons/md';
import {IoMdLogOut}  from 'react-icons/io';
import { financeContext } from '@/lib/store/finance-context';
import {currencyFormatter} from '@/lib/utils'


function Nav() {

    //state for balance
    const [balance, setBalance] = useState(0);

  //destructuring financeContext for expenses
  const { expenses, income } = useContext(financeContext);

    const {user, loading, logout} = useContext(authContext);




      //useEffect to set balance every time the page is rendered
  //whenever expenses or income arrays change, the newBalance will be calculated 
  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      //looping through income array to get the total
      return total + i.amount
     }, 0) -
     //minus the looping through expense array to get the expense total
     expenses.reduce((total, e) => {
      return total + e.total;
      },0)

      setBalance(newBalance);
  }, [expenses,income]);


    return  <header className=" bg-slate-200 py-4 rounded-3xl container max-w-2xl px-6 mx-auto text-slate-600 ">
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

   <section className='py-3'>
          <small className='text-slate-700 text-md'>My Balance:</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(balance)}</h2>
        </section>
  </header>
 }

 export default Nav;