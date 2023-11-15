interface inputProps {
  type?: "text" | "number" | "checkbox" | "";
  value: any;
  id: string;
  text: string;
  placeholder: string;
  className?: string;
  onChange: (value: any) => void;
}

export default function Input(props: inputProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2 text-green-600 font-bold">{props.text}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
        className={`
        border-slate-200 placeholder-slate-30 text-gray-800 outline-green-500 border px-4 py-2 rounded-md`}
      />
    </div>
  );
}
