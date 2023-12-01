// Import necessary dependencies from React and React Router
import React from "react";
import { Link } from "react-router-dom";

// Button component creates a button or link based on provided props
function Button({ children, disabled, to, type, onClick }) {
  // Base styles shared across different button types
  const base =
    " inline-block rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed ";

  // Styles for different button types and sizes
  const style = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      " inline-block text-sm rounded-full border-2 border-red-400 font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 ",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2",
  };

  // Render a Link component if 'to' prop is provided
  if (to) {
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  }

  // Render a button with onClick event if 'onClick' prop is provided
  if (onClick) {
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  // Render a simple button if neither 'to' nor 'onClick' props are provided
  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

// Export the Button component as the default export
export default Button;
