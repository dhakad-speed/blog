import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-black/5",
  textColor = "black",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${bgColor} ${className} ${textColor} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
