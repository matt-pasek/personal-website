interface IconProps {
  className?: string;
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.75 6.75h14.5v10.5H4.75V6.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5.25 7.25 6.75 5.4 6.75-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
