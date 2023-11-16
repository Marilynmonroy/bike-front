import Titulo from "./Tittle";

interface LayoutProps {
  titulo: string;
  children: any;
}

export default function Layout(props: LayoutProps) {
  return (
    <div
      className={`
    flex flex-col w-auto bg-white text-gray-800
    rounded-md
    `}
    >
      <Titulo>{props.titulo}</Titulo>
      <div className="p-6">{props.children}</div>
    </div>
  );
}
