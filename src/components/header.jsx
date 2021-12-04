
import { useLocation } from 'react-router';
import Button from './button';

const Header = ({ onAdd, showAdd }) => {
    const location=useLocation()
    return (
        <div className='header'>
            <h1 className=''> Task Tracker </h1>
            {location.pathName === '/' && <Button color={showAdd ? 'red' : 'green'} onClick={onAdd} text={showAdd ? 'Close' : 'Add'} />}
        </div>
    )
}

export default Header
