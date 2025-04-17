import React, { useState } from 'react'

export default function Container() {

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState("")
    const [index, setIndex] = useState(null) //to store the index , on which we have to update task
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    function getInputData(e) {
        setTask(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (task.trim() === '')
            return

        if (index !== null) {
            const updateTasksList = [...tasks]
            updateTasksList[index] = task;
            setTasks(updateTasksList)
            setIndex(null)
        } else {
            setTasks([...tasks, task])
 
        }
           setTask("")  // clearing input
    }

    function editTask(index) {
        setIndex(index);
        setTask(tasks[index])
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    return (
        <>
            <div className='container d-flex justify-content-center flex-column text-light mt-5 w-50'>
                <form className='flex-grow-1' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="text-field" className="form-label fs-4 fw-bold">Task</label>
                        <input type="text" className="form-control" id="text-field" placeholder='Add task ....' value={task} required onChange={getInputData} />
                    </div>

                    <button type="submit" className="btn btn-primary px-5">
                        {index == null ? 'Add' : 'Update'}</button>
                </form>

                <div>
                    <div className='d-flex justify-content-between mt-3'>
                        <h5 className=''>Todo-List</h5>
                        <h5 className='d-inline'>{date}</h5>
                    </div>
                    <table className='table border table-hover table-bordered text-center'>
                        <thead>
                            <th>Sr No.</th>
                            <th>Task</th>
                            <th>Time</th>
                            <th>Action</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                            {
                                tasks.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item}</td>
                                        <td>{time}</td>
                                        <td>
                                        <button className='btn' onClick={() => editTask(index)}><i class="bi bi-pencil-square text-success"></i></button>
                                        <button className='btn' onClick={() => deleteTask(index)}><i class="bi bi-trash text-danger"></i></button>
                                        </td>
                                        <td>
                                            <div className='d-flex justify-content-between'>
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}
