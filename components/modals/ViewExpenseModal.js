import Modal from '@/components/Modal';
import { currencyFormatter } from '@/lib/utils';
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import { useAmp } from 'next/amp';
import { toast} from "react-toastify";

function ViewExpenseModal({ show, onClose, expense }) {

  const {deleteExpenseItem, deleteExpenseCat} = useContext(financeContext)


  //Expense modal handlers
  const deleteExpenseItemHandler = async (item) => {
    try {
      //remove item from the array
      //filter the item from the array
      //keep the item if id is not equal to item id
      //updating the state of item
      const updatedItems = expense.items.filter((i) => 
        i.id !== item.id);

      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
       }

       await deleteExpenseItem(updatedExpense, expense.id);
       toast.success("Expense item successfully deleted!")
     }catch(error){
      console.log(error.message)
      toast.error(error.message)
      }
   }

  
   const deleteExpenseCatHandler = async () => {

    try { 
      await deleteExpenseCat(expense.id)
      toast.success("Expense category successfully deleted!")
    }catch (error) {
      console.log(error.message)
      toast.error(error.message)
     }


    }


  return (
    <Modal show={show} onClose={onClose}>
      <div className='flex items-center justify-between'>
        <h2 className='text-4xl text-white'>{expense.title}</h2>
        <button onClick = {deleteExpenseCatHandler} className='btn btn-danger'>Delete</button>
      </div>

      <div>
        <h3 className='my-4 text-2xl text-white'>Expense Transactions</h3>
        {expense.items.map((item)=> {
            return (<div 
            key = {item.id}
            className='flex items-center justify-between text-white'>
             <small>
              {item.createdAt.toMillis
             ? new Date (item.createdAt.toMillis()).toISOString()
             : item.createdAt.toISOString() }
             </small>
            <p className='flex items-center gap-2'>
              {currencyFormatter(item.amount)}
              <button onClick = {()=> {
                deleteExpenseItemHandler(item);
                 }}>
                <FaRegTrashAlt />
              </button>
            </p>
            </div>
            );
         })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
