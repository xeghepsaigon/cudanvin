import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'button';
  variant?: 'default' | 'interactive';
}

export function Card({
  children,
  className = '',
  onClick,
  as: Component = 'div',
  variant = 'default'
}: CardProps) {
  const baseClasses = 'text-left rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden';
  const interactiveClasses = 'hover:shadow-lg hover:border-[#00A86B] transition-all cursor-pointer';
  const variantClasses = variant === 'interactive' ? interactiveClasses : '';

  const finalClassName = `${baseClasses} ${variantClasses} ${className}`;

  if (Component === 'button') {
    return (
      <button
        onClick={onClick}
        className={finalClassName}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={finalClassName}>
      {children}
    </div>
  );
}

export default Card;
