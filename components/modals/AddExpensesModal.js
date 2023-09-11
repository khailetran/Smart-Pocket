import Modal from '@/components/Modal';
import { useState, useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';

function AddExpensesModal({show,onClose}) {
    const [expenseAmount, setExpenseAmount] = useState("");

    const { expenses } = useContext(financeContext);

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
        {expenses.map(expense => {
          return (
            <button>
              <div className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl '>
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
      </Modal>
    );

 }

 export default AddExpensesModal;