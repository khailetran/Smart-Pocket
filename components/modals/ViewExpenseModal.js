import Modal from '@/components/Modal';
function ViewExpenseModal({ show, onClose, expense }) {
  return (
    <Modal show={show} onClose={onClose}>
      <div className='flex items-center justify-between'>
        <h2 className='text-4xl'>{expense.title}</h2>
        <button className='btn btn-danger'>Delete</button>
      </div>

      <div>
        <h3 className='my-4 text-2xl'>Expense Transactions</h3>
        {expense.items.map((item)=> {
            return <div 
            key = {item.id}
            className='flex items-center justify-between'>
             <small>{item.createdAt.toMillis
             ? new Date (item.createdAt.toMillis()).toISOString()
             : item.createdAt.toISOString() }
             </small>

            </div>
         })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
