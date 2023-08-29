"use client";
import {useState} from 'react';
import {currencyFormatter} from '@/lib/utils'
import ExpenseItem from '@/components/ExpenseItem'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from '@/components/Modal';

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

  const [modalIsOpen, setModalIsOpen] = useState(true);
  
  
  return ( 
    <>
    {/* Modal */}

    <Modal show = {modalIsOpen} onClose={setModalIsOpen}> 
    <h3>helllo world</h3>
    </Modal>



  <main className="container max-w-2xl px-6 mx-auto">
  <section className="py-3">
    <small className="text-gray-400 text-md"> 
      My Balance
    </small>
    <h2 className ="text-4xl font-bold">{currencyFormatter(100000)}</h2>
  </section>

  <section className="flex items-center gap-2 py-3">
    <button onClick= {() => {setModalIsOpen(true)}}className="btn btn-primary">- Expenses</button>
    <button className="btn btn-primary-outline"> + Income</button>
  </section>
  {/* Expenses */}
  <section className='py-6'>
    <h3 className='text-2xl'>My Expenses</h3>
    <div className='flex flex-col gap-4 mt-6'>
    {dummy_data.map(expense => {
      return (
      <ExpenseItem 
      color={expense.color} 
      title ={expense.title}
      total = {expense.total}
      />
      );
     })}
    </div>
  </section>

  {/* Chart Session */}
  <section className='py-6'></section>
  <h3 className='text-2xl'> Stats </h3>
  <div className='w-1/2 mx-auto '>
    <Doughnut data= {{
      labels: dummy_data.map(expense => expense.title),
      datasets: [
        {
          label: "Expenses",
          data: dummy_data.map (expense => expense.total),
          backgroundColor: dummy_data.map(expense => expense.color),
          borderColor: ['#18181b'],
          borderWidth: 5,
        }
      ]
    }}/>
  </div>
  </main>
      </>
  );
}