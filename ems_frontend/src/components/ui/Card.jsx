import React from "react";
import clsx from "clsx";

export const Card = ({ children, className = "", ...props }) => (
  <div
    className={clsx(
      "rounded-xl bg-white shadow-md border border-gray-200",
      className
    )}
    {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={clsx("p-4", className)} {...props}>
    {children}
  </div>
);
