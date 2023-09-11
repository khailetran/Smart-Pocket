import Modal from '@/components/Modal';
import { useState, useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import {v4 as uuidv4} from 'uuid';

function AddExpensesModal({show,onClose}) {
    //states to update expense and expense cat
    const [expenseAmount, setExpenseAmount] = useState("");
    const [selectedCat, setSelectedCat] = useState(null)

    //pulling expenses from financeContext
    const { expenses } = useContext(financeContext);


    //function to pull data from the expense in firestore and inherit values to newExpense 

    const addExpenseItemHandler = ( ) => {

        const expense = expenses.find(e => {
            return e.id === selectedCat
         })


        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                //adding on new expense 
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4(),
                 },
            ]
        };

        console.log(newExpense)
     }

    return (
      <Modal show={show} onClose={onClose}>
        <div className='flex flex-col gap-4'>
          <label>Enter an amount..</label>
          <input
            type='number'
            min={0.01}
            step={0.01}
            placeholder='Enter expense amount..'
            value={expenseAmount}
            onChange={e => {
              setExpenseAmount(e.target.value);
            }}
          />
        </div>

        {/* expense categories */}
        {expenseAmount > 0 && (
          <div className='flex flex-col gap-4 mt-6'>
        {expenses.map(expense => {
          return (
            <button
            key={expense.id}
            onClick={() => {
                setSelectedCat(expense.id);
             }}
            >
              <div style={{
                boxShadow: expense.id === selectedCat? "1px 1px 4px": "none",
              }}
              className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl '>
                <div className='flex items-center gap-2'>
                  {/* colored circle */}
                  <div
                    className='w-[25px] h-[25px] rounded-full'
                    style={{
                      backgroundColor: expense.color,
                    }}
                  />
                  <h4 className='capitalize'>{expense.title}</h4>
                </div>
              </div>
            </button>
          );
        })}
        </div>  
        )}

        {expenseAmount > 0 && selectedCat && (
            <div className='mt-6'>
            <button
            className='btn btn-primary'
            onClick = {addExpenseItemHandler}>
                Add Expense
            </button>
          </div>
         )}
      </Modal>
    );

 }

 export default AddExpensesModal;