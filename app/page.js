"use client";
import {useState, useRef} from 'react';
import {currencyFormatter} from '@/lib/utils'
import ExpenseItem from '@/components/ExpenseItem'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from '@/components/Modal';
//Firebase
import { db } from '@/lib/firebase';
import { collection, addDoc} from 'firebase/firestore'

ChartJS.register(ArcElement, Tooltip, Legend);

const dummy_data = [
   {
    id: 1,
    title: "Entertainment",
    color: '#001',
    total: 100
   },
   {
    id: 2,
    title: "Gas",
    color: '#900',
    total: 500
   },
   {
    id: 3,
    title: "Rent",
    color: '#000',
    total: 600
   },
   {
    id: 4,
    title: "Food",
    color: '#000',
    total: 700
   },
  ]

export default function Home() {

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);


  const amountRef = useRef();
  const descriptionRef = useRef();
  
  // Handler functions
  const addIncomeHandler = async (e) => {
    e.preventDefault()

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
     }

     //function that requires db and collection from the db
     const collectionRef = collection(db, 'income')

     try {
      //addDoc will return a document in the firestore db adding newIncome to the collection 
      const docSnap = await addDoc(collectionRef, newIncome)
      }catch {
        console.log(error.message)
       }
   } 
  
  return (
    <>
      {/* Add Income Modal */}

      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form onSubmit = {addIncomeHandler} className='flex flex-col gap-4'>
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

          <button type = "submit" className='btn btn-primary'>Add Transaction</button>
        </form>
        <div className='flex flex-col gap-4 mt-6'> 
          <h3 className='text-2xl font-bold'>Income History</h3>
        </div>
      </Modal>

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
            {dummy_data.map(expense => {
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
              labels: dummy_data.map(expense => expense.title),
              datasets: [
                {
                  label: 'Expenses',
                  data: dummy_data.map(expense => expense.total),
                  backgroundColor: dummy_data.map(expense => expense.color),
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
