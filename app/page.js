"use client";
import {useState, useContext, useEffect} from 'react';
import { financeContext } from '@/lib/store/finance-context';
import { authContext } from '@/lib/store/auth-context';
import {currencyFormatter} from '@/lib/utils'
import ExpenseItem from '@/components/ExpenseItem'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import SignIn from '@/components/Signin';
import AddIncomeModal from '@/components/modals/AddIncomeModal'
import AddExpensesModal from '@/components/modals/AddExpensesModal';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Home() {


  //state for modals
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  //state for balance
  const [balance, setBalance] = useState(0);

  //destructuring financeContext for expenses
  const { expenses, income } = useContext(financeContext);
  const { user, loading } = useContext(authContext)

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


  if(!user) {
    return <SignIn />
  }
  return (
    <>
      {/* Add Income and Expense Modal */}

     <AddIncomeModal 
     show={showAddIncomeModal} 
     onClose={setShowAddIncomeModal} 
     />

     <AddExpensesModal 
     show={showAddExpenseModal}
     onClose={setShowAddExpenseModal}
     />

      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-3'>
          <small className='text-gray-400 text-md'>My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(balance)}</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button onClick={() => {
            setShowAddExpenseModal(true)
          }} 
          className='btn btn-primary'>
            - Expenses
          </button>

          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className='btn btn-primary-outline'
          >
            {' '}
            + Income
          </button>
        </section>
        {/* Expenses */}
        <section className='py-6'>
          <h3 className='text-2xl'>My Expenses</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map(expense => {
              return (
                <ExpenseItem
                  key ={expense.id}
                  expense={expense}

                />
              );
            })}
          </div>
        </section>

        {/* Chart Session */}
        <section className='py-6'></section>
        <h3 className='text-2xl'> Stats </h3>
        <div className='w-1/2 mx-auto '>
          <Doughnut
            data={{
              labels: expenses.map(expense => expense.title),
              datasets: [
                {
                  label: 'Expenses',
                  data: expenses.map(expense => expense.total),
                  backgroundColor: expenses.map(expense => expense.color),
                  borderColor: ['#18181b'],
                  borderWidth: 5,
                },
              ],
            }}
          />
        </div>
      </main>
    </>
  );
}
