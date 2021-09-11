import { SVGIcon } from '../types/types-and-enums';
import React from 'react';
import { classNames } from '../utils/class-names';

type Props = {
  onClick: () => void;
  label: string;
  leadingIcon?: SVGIcon;
  disabled?: boolean;
};

const Button = ({ onClick, label, leadingIcon, disabled }: Props) => {
  const LeadingIcon = leadingIcon;

  return (
    <button
      role="button"
      onClick={onClick}
      className={classNames(
        'flex items-center shadow-lg text-white tracking-wide font-semibold py-4 px-8 rounded-full border-b-4 hover:border-b-2 hover:translate-y-[2px] transition-all transform-gpu',
        disabled ? 'pointer-events-none bg-gray-500 border-gray-700' : 'bg-pink-500 hover:bg-pink-600 border-pink-700',
      )}
    >
      {!!LeadingIcon && <LeadingIcon className="h-6 w-6 mr-4 -ml-2" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
