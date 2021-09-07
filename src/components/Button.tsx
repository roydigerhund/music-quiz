import React from "react";

type Props = {
  onClick: () => void;
  label: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Button = ({ onClick, label, icon }: Props) => {
  const Icon = icon;

  return (
    <button
      role="button"
      onClick={onClick}
      className="flex items-center mt-12 from-pink-500 to-pink-600 bg-gradient-to-b hover:from-pink-600 hover:to-pink-600 shadow-lg text-white tracking-wide font-semibold py-4 px-8 rounded-lg"
    >
      {!!icon && <Icon className="h-6 w-6 mr-4 -ml-2" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
