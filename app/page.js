"use client";
import {useState, useContext, useEffect} from 'react';
import { financeContext } from '@/lib/store/finance-context';
import {currencyFormatter} from '@/lib/utils'
import ExpenseItem from '@/components/ExpenseItem'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import AddIncomeModal from '@/components/modals/AddIncomeModal'

ChartJS.register(ArcElement, Tooltip, Legend);





export default function Home() {



  //state for modal
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  //state for balance
  const [balance, setBalance] = useState(0);

  //destructuring financeContext for expenses
  const { expenses, income } = useContext(financeContext);


  //useEffect to set balance every time the page is rendered
  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount
     }, 0) -
     expenses.reduce((total, e) => {
      return total + e.total;
      },0)

      setBalance(newBalance);
  }, [expenses,income]);

  return (
    <>
      {/* Add Income Modal */}

     <AddIncomeModal 
     show={showAddIncomeModal} 
     onClose={setShowAddIncomeModal} 
     />

      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-3'>
          <small className='text-gray-400 text-md'>My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(100000)}</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button onClick={() => {}} className='btn btn-primary'>
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
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
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
