import {currencyFormatter} from '@/lib/utils'
import ViewExpenseModal from './modals/ViewExpenseModal';
import {useState} from 'react';

function ExpenseItem({expense }) {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

    return (
      <>
      <ViewExpenseModal 
      show = {showViewExpenseModal}
      onClose = {setShowViewExpenseModal}
      expense = {expense}

      />
        <button onClick={()=>{
          setShowViewExpenseModal(true)
        }}>
          <div className="flex items-center justify-between px-4 py-4 bg-slate-50 rounded-3xl text-black">
            <div className="flex items-center gap-2">
              <div
                className="w-[25px] h-[25px] rounded-full"
                style={{ backgroundColor: expense.color }}
              />
              <h4 className="capitalize">{expense.title}</h4>
            </div>
            <p>{currencyFormatter(expense.total)}</p>
          </div>
        </button>
  </>
      );
    }

export default ExpenseItem;