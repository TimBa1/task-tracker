import {FaTimes} from 'react-icons/fa'


const Task2 = ({task,onDelete,onBug}) => {
    return (
        <div className={`task ${task.reminder && 'reminder'}`}
            onDoubleClick = {()=> onBug(task.id)}>
            <h3>{task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)} /></h3>
            <p>{task.day}</p>
            <p>{ task.time}</p>
        </div>
    )
}

export default Task2
