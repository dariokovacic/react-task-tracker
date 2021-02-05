import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ onAdd, showAddTask }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Task Tracker</h1>
      {location.pathname === '/' && <Button text={showAddTask ? 'Close' : 'Add'} color={showAddTask ? 'red' : 'steelblue'} customClickProp={onAdd} />}
    </header>
  )
}

export default Header
