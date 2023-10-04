import {useRef, useEffect, useContext} from 'react';
import {currencyFormatter} from '@/lib/utils'
import {financeContext} from '@/lib/store/finance-context'
import { authContext } from '@/lib/store/auth-context';
import { toast} from "react-toastify";
import Modal from '@/components/Modal';

//importing icon
import { FaRegTrashAlt } from "react-icons/fa";


function AddIncomeModal({show,onClose}) {

    const amountRef = useRef();
    const descriptionRef = useRef();
    const {income, addIncomeItem, removeIncomeItem} = useContext(financeContext);

    const { user } = useContext(authContext);

// Handler functions
  const addIncomeHandler = async (e) => {
    e.preventDefault()

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
     };

     //using addIncomeItem from financeContext 
     try {
        await addIncomeItem(newIncome);
        descriptionRef.current.value = "";
        amountRef.current.value = "";
        toast.success("Income item successfully added!")
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
      }
    };
  

     
       //handler to delete income
   const deleteIncomeEntryHandler = async (incomeId) => {

     //using removeIncomeItem from financeContext 
    try {
        await removeIncomeItem(incomeId);
        toast.success("Income item successfully deleted!")
     }catch (error){
        console.log(error.message);
        toast.error(error.message)
      }
    }

    return (
        <Modal show={show} onClose={onClose}>
        <form onSubmit = {addIncomeHandler} className='flex flex-col gap-4'>

        <div className='input-group'>
            <label htmlFor='amount'> Description </label>
            <input

              type='string'
              min={0.1}
              name= "description"
              ref={descriptionRef}
              step={0.1}
              placeholder='Enter income amount'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='amount'> Income Amount </label>
            <input
              type='number'
              min={0.1}
              ref={amountRef}
              name ="amount"
              step={0.1}
              placeholder='Enter income amount'
              required
            />
          </div>

          <button type = "submit" className='btn btn-primary-outline'>Add Transaction</button>
        </form>
        <div className='flex flex-col gap-4 mt-6'> 
          <h3 className='text-2xl font-bold'>Income History</h3>


          {income.map ((i) => {
            return (
              <div className='flex items-center justify-between' key= {i.id}>
                <div>
                <p className='font-semibold'>{i.description}</p>
                <small className='text-xs'>{i.createdAt.toISOString()}</small>
                </div>
              <p className='flex items-center gap-2'>
                {currencyFormatter(i.amount)}
                <button 
                onClick= {() => { 
                  deleteIncomeEntryHandler(i.id)
                  }}
                  >
                <FaRegTrashAlt />
                </button>
              </p>
              
              </div>

             )
           })}
        </div>
      </Modal>
    )
 }


 export default AddIncomeModal;