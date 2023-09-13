"use client"

import { createContext, useState, useEffect} from "react";

//Firebase
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";


export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
    addExpenseItem: async () => {},
    addExpenseCat: async () => {},
    deleteExpenseItem: async () => {},
 })

//wrapper function
//provider component that will provide context to the rest of the application 
//any value passed in the value prop available to any component in the application 
 export default function FinanceContextProvider({children}) {
    const [income,setIncome] = useState([])
    const [expenses, setExpenses] = useState([])

    //adding a new expense category on db firestore
    const addExpenseCat = async (category) => {
      try {
        const collectionRef = collection(db, 'expenses');
        const docSnap = await addDoc(collectionRef,{
          ...category,
          items: [],
        })

        //update state
        setExpenses(prevExpenses => {
          return [
            ...prevExpenses,
            {
              id: docSnap.id,
              items:  [],
              ...category
             } 
           ]
         })
       }catch (error){
        throw(error)
        }
     }

    //adding expense to a category on db firestore
    const addExpenseItem = async(expenseCatId, newExpense ) => {
      //reference to the specific doc in db
      const docRef = doc(db, 'expenses', expenseCatId)

      try{
        //updates doc in db with newExpense
        await updateDoc (docRef, {...newExpense})
        //update state
        setExpenses(prevState => {
          //creates copy of previous state
          const updatedExpenses = [...prevState]
          //find index of the expense item in updatedExpenses that matched the expenseCatId
          const foundIndex = updatedExpenses.findIndex(expense => {
            return expense.id === expenseCatId
           });
           //if match is found, it updates that specific expense item with the new expense data
           updatedExpenses[foundIndex] = { id: expenseCatId, ...newExpense}

           return updatedExpenses;
         })

       }catch (error) {
        throw error;
        }
     };

     //function to delete expense item
     const deleteExpenseItem = async (updatedExpense, expenseCatId) => {

      const docRef = doc (db, 'expenses',expenseCatId)

      try {
        //updating since we are updating the item not deleting the expense itself
        await updateDoc( docRef, {
          ...updatedExpense
         })

         //updating the state

         setExpenses( prevExpenses => {
          const updatedExpenses =[...prevExpenses];
          //find position of expense that needs to be updated
          const pos = updatedExpenses.findIndex((expense) => 
            expense.id === expenseCatId
           );

           //updating the items and total of the updated expenses
           updatedExpenses[pos].items = [...updatedExpense.items];
           updatedExpenses[pos].total = updatedExpense.total;
           return updatedExpenses;
          })
       }catch(error){
        throw error;
        }
      };



    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income')
        try {
         //addDoc will return a document in the firestore db adding newIncome to the collection 
         const docSnap = await addDoc(collectionRef, newIncome)
         //update state to change previous state and returning the new state with the array with previous incomes
         setIncome((prevState) => {
           return [
             ...prevState,
             {
               id: docSnap.id,
               ...newIncome,
              },
           ]
          })
    }catch (error) {
        console.log(error.message);
        throw error;
      }
    };


    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, 'income',incomeId)

        try {
        await deleteDoc(docRef);
    
        //update state to delete return a new state where i.id is not equal to income deleted
        setIncome(prevState => {
          return prevState.filter((i) => i.id !== incomeId)
         })
    
         }catch (error){
          console.log(error.message)
          throw error;
          }
    };



    const values = {
      income, 
      expenses, 
      addIncomeItem, 
      removeIncomeItem, 
      addExpenseItem, 
      addExpenseCat,
      deleteExpenseItem
    
    };

    useEffect(() => {
        const getIncomeData = async () => {
            const collectionRef = collection(db, 'income')
            const docsSnap = await getDocs(collectionRef)  
    
            //array to loop through docsSnap for each income data
            const data = docsSnap.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis())
               }
             })
             setIncome(data)
         }

         //function to get expenses
         const getExpensesData = async () => {
            const collectionRef = collection(db, 'expenses')
            const docSnap = await getDocs(collectionRef)

            const data = docSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                 }
             });

             setExpenses(data);


          }
    
         getIncomeData();
         getExpensesData();
    
       }, [])
    

    return <financeContext.Provider value= {values}>
        {children}
    </financeContext.Provider>
  }