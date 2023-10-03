import Modal from '@/components/Modal';
import { useState, useContext, useRef } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import {v4 as uuidv4} from 'uuid';
import { toast} from "react-toastify";

function AddExpensesModal({show, onClose}) {
    //states to update expense and expense cat
    const [expenseAmount, setExpenseAmount] = useState("");
    const [selectedCat, setSelectedCat] = useState(null)
    const [showAddExpense, setShowAddExpense] = useState(false)

    //pulling expenses from financeContext
    const { expenses, addExpenseItem, addExpenseCat } = useContext(financeContext);

    //adding in new expense category
    const titleRef = useRef();
    const colorRef = useRef();


    //function to pull data from the expense in firestore and inherit values to newExpense 

    const addExpenseItemHandler = async ( ) => {

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

        try {
        await addExpenseItem(selectedCat, newExpense);

        console.log(newExpense)
        setExpenseAmount("")
        setSelectedCat(null)
        onClose();
        toast.success("Expense item successfully added!")
         }catch(error){
           console.log(error.message)
           toast.error(error.message)
         }  

     }

     //Handler to add expense category into the db

     const addCategoryHandler  = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;

        try {
            await addExpenseCat({title, color, total:0})
            setShowAddExpense(false);
            toast.success("Category successfully created!")
         }catch(error){
            console.log(error.message)
            toast.error(error.message);
          }
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
            <div className='flex items-center justify-between'>
              <h3 className='text-2xl capitalize'>Select expense category: </h3>
              <button onClick={() => {
                setShowAddExpense(true);
              }} 
              className='text-lime-400'>New Category</button>
            </div>

            {showAddExpense && (
              <div className='flex items-center justify-between'>
                <input
                  type='text'
                  placeholder='Enter category'
                  ref={titleRef}
                />
                <label>Category Color</label>
                <input type='color' className='w-24 h-10' ref={colorRef} />
                <button onClick = {addCategoryHandler}
                className='btn btn-primary-outline'>Create </button>
                <button onClick={() => {
                    setShowAddExpense(false);
                 }}
                 className='btn btn-danger'>Cancel</button>
              </div>
            )}

            {expenses.map(expense => {
              return (
                <button
                  key={expense.id}
                  onClick={() => {
                    setSelectedCat(expense.id);
                  }}
                >
                  <div
                    style={{
                      boxShadow:
                        expense.id === selectedCat ? '1px 1px 4px' : 'none',
                    }}
                    className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl '
                  >
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
            <button className='btn btn-primary' onClick={addExpenseItemHandler}>
              Add Expense
            </button>
          </div>
        )}
      </Modal>
    );

 }

 export default AddExpensesModal;