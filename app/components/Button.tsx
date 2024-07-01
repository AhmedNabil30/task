import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  color: 'blue' | 'yellow' | 'red';
  href?: string;
  type?: 'button' | 'submit'; // Define type prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color,
  href,
  type,
}) => {
  const baseClasses = 'py-2 px-4 rounded shadow-md text-white ';
  let colorClasses = '';

  switch (color) {
    case 'blue':
      colorClasses = 'bg-blue-600 hover:bg-blue-700';
      break;
    case 'yellow':
      colorClasses = 'bg-yellow-500 hover:bg-yellow-600';
      break;
    case 'red':
      colorClasses = 'bg-red-500 hover:bg-red-600';
      break;
    default:
      break;
  }

  const classes = `${baseClasses} ${colorClasses}`;

  if (href) {
    return (
      <Link href={href}>
        <a className={classes}>{children}</a>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type={type || 'button'}>
      {' '}
      {/* Ensure type attribute */}
      {children}
    </button>
  );
};

export default Button;
