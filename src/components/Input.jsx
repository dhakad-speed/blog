import React from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-[#56565c]" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        {...props}
        ref={ref}
        type={type}
        className={`bg-black/5 text-[#56565c] px-3 py-2 w-full rounded-lg ${className}`}
      />
    </div>
  );
}

export default React.forwardRef(Input);
