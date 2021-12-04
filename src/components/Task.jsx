import Task2 from './task2';


const Task = ({task,onDelete,onToggle}) => {
   
    return (
        <div> 
            {task.map((task) => (
                <Task2 key={task.id} task={task} onDelete={onDelete} onBug={ onToggle}/>
            ))}
        </div>
    )
}

export default Task


