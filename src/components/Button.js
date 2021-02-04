const Button = ({ color, text, customClickProp }) => {
  return (
    <button
    onClick={customClickProp}
    className="btn"
    style={{ backgroundColor: color }}>
      { text }
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue'
}

export default Button
