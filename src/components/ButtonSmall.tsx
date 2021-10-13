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
  className?: string;
};

const ButtonSmall = ({ onClick, label, leadingIcon, disabled, to, htmlType, className }: Props) => {
  const LeadingIcon = leadingIcon;

  const renderContent = () => (
    <>
      {!!LeadingIcon && <LeadingIcon className="w-4 h-4 mr-2 -ml-2" />}
      <span>{label}</span>
    </>
  );

  const buttonClassName = classNames(
    'flex items-center justify-center px-4 py-2 text-sm tracking-wide bg-indigo-800 rounded-lg select-none',
    disabled ? 'pointer-events-none text-indigo-300' : 'text-indigo-100 hover:bg-indigo-900 hover:text-white',
    className,
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

export default ButtonSmall;
