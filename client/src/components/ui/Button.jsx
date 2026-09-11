// components/ui/Button.jsx
import './Button.css'

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button