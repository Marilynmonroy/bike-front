interface selectProps {
  tittle: string;
  className?: string;
  onChange: (value: any) => void;
  children?: any;
  placeholder: string;
  value?: string;
  id?: string;
}

export default function Select(props: selectProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2 text-green-600 font-bold">{props.tittle}</label>
      <select
        className={` 
          border-slate-200 placeholder-slate-30 text-gray-800 outline-green-500 border px-4 py-2 rounded-md`}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        id={props.id}
      >
        {props.children}
      </select>
    </div>
  );
}
