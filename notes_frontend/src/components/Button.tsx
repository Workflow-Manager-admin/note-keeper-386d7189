import { ButtonHTMLAttributes } from "react";

// PUBLIC_INTERFACE
export default function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-primary hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
