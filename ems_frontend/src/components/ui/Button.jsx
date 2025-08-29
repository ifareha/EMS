import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className = "",
  variant = "solid",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button
      className={clsx(
        base,
        variants[variant] || variants.solid,
        sizes[size] || sizes.md,
        className
      )}
      {...props}>
      {children}
    </button>
  );
};
