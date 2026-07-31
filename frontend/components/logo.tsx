import React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="m0 24c15.2548 0 24-8.7452 24-24 0 15.2548 8.7452 24 24 24-15.2548 0-24 8.7452-24 24 0-15.2548-8.7452-24-24-24z"
        fill="#ff3300"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Logo;
