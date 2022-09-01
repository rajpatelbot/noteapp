import './Button.css'

const Button = ({ text, className, handleLogout, toggleTheme }) => {
  return (
    <button className={className} onClick={handleLogout || toggleTheme}>
      {text}
    </button>
  )
}

export default Button
