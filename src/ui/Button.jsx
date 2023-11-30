import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    " inline-block rounded-full text-sm bg-yellow-400  font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const style = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      " inline-block text-sm rounded-full border-2 border-red-400  font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 ",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2",
  };

  if (to) {
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
