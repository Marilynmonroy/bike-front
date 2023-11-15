interface buttonProps {
  className?: string;
  children: any;
  type?: string;
  onClick?: () => void;
  disabled?: boolean;
}
export default function Button(props: buttonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={` ${props.className}`}
    >
      {props.children}
    </button>
  );
}
