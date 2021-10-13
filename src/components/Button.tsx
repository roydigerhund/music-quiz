import { SVGIcon } from '../types/types-and-enums';
import React from 'react';
import { classNames } from '../utils/class-names';
import { Link } from '@reach/router';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

type Props = {
  onClick?: () => void;
  label: string;
  leadingIcon?: SVGIcon;
  disabled?: boolean;
  to?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  type?: ButtonType;
  className?: string;
};

const Button = ({
  onClick,
  label,
  leadingIcon,
  disabled,
  to,
  htmlType,
  type = ButtonType.PRIMARY,
  className,
}: Props) => {
  const LeadingIcon = leadingIcon;

  const renderContent = () => (
    <>
      {!!LeadingIcon && <LeadingIcon className="w-6 h-6 mr-3 -ml-2" />}
      <span>{label}</span>
    </>
  );

  const buttonClassName = classNames(
    'flex items-center justify-center shadow-lg text-white tracking-wide font-semibold rounded-full mb-0 active:translate-y-[2px] transition-all transform-gpu select-none',
    disabled
      ? 'pointer-events-none bg-gray-500 shadow-button-disabled'
      : 'bg-pink-500 active:bg-pink-600 shadow-button active:shadow-button-hover text-white',
    type === ButtonType.PRIMARY && 'py-4 px-8',
    type === ButtonType.SECONDARY && 'py-3 px-6 text-sm',
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

export default Button;
