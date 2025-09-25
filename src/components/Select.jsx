import React, { useId } from "react";

function Select({ label, options, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`px-4 rounded py-2 bg-black/5 text-black w-full ${className}`}
        id={id}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
