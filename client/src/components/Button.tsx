const Button = ({
  className = "",
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={`inline-flex items-center h-10 px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
