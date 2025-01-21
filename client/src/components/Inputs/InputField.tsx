interface InputFieldProps {
  label: string;
  value: string;
}

export function InputField({ label, value }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 items-start mt-4">
      <label
        htmlFor={label}
        className="text-lg font-medium text-gray-600 dark:text-gray-300"
      >
        {label}:
      </label>
      <input
        type="text"
        id={label}
        value={value || ""}
        readOnly
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      />
    </div>
  );
}
