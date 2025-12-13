interface TransmissionIconProps {
  size?: number;
  className?: string;
}

export default function TransmissionIcon({ size = 32, className = '' }: TransmissionIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="18" cy="6" r="1.5" stroke="currentColor" />
      <circle cx="18" cy="18" r="1.5" stroke="currentColor" />
      <circle cx="12" cy="6" r="1.5" stroke="currentColor" />
      <circle cx="12" cy="18" r="1.5" stroke="currentColor" />
      <circle cx="6" cy="6" r="1.5" stroke="currentColor" />
      <path 
        d="M18 8V12M18 16V12M12 8V16M6 8V11.5C6 11.7761 6.22386 12 6.5 12H18" 
        stroke="currentColor" 
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
