import { SVGIcon } from '../types/types';
import React from 'react';

type Props = {
  onClick: () => void;
  label: string;
  leadingIcon?: SVGIcon;
};

const Button = ({ onClick, label, leadingIcon }: Props) => {
  const LeadingIcon = leadingIcon;

  return (
    <button
      role="button"
      onClick={onClick}
      className="flex items-center mt-12 bg-pink-500 hover:bg-pink-600 shadow-lg text-white tracking-wide font-semibold py-4 px-8 rounded-full border-b-4 border-pink-700 hover:border-b-2 hover:translate-y-[2px] transition-all transform-gpu"
    >
      {!!LeadingIcon && <LeadingIcon className="h-6 w-6 mr-4 -ml-2" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
