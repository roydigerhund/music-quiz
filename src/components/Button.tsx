import { SVGIcon } from '../types/types-and-enums';
import React from 'react';
import { classNames } from '../utils/class-names';
import { Link } from '@reach/router';

type Props = {
  onClick?: () => void;
  label: string;
  leadingIcon?: SVGIcon;
  disabled?: boolean;
  to?: string;
  htmlType?: 'button' | 'submit' | 'reset';
};

const Button = ({ onClick, label, leadingIcon, disabled, to, htmlType }: Props) => {
  const LeadingIcon = leadingIcon;

  const renderContent = () => (
    <>
      {!!LeadingIcon && <LeadingIcon className="h-6 w-6 mr-4 -ml-2" />}
      <span>{label}</span>
    </>
  );

  const buttonClassName = classNames(
    'flex items-center shadow-lg text-white tracking-wide font-semibold py-4 px-8 rounded-full border-b-4 hover:border-b-2 hover:translate-y-[2px] transition-all transform-gpu',
    disabled ? 'pointer-events-none bg-gray-500 border-gray-700' : 'bg-pink-500 hover:bg-pink-600 border-pink-700',
  );

  return to ? (
    <Link to={to} className={buttonClassName}>
      {renderContent()}
    </Link>
  ) : (
    <button role="button" type={htmlType || 'button'} onClick={() => onClick && onClick()} className={buttonClassName}>
      {renderContent()}
    </button>
  );
};

export default Button;
