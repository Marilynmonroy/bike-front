export default function Titulo(props: any) {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="px-5 py-5 text-center font-bold text-green-600 text-2xl">
        {props.children}
      </h1>
      <hr className="" />
    </div>
  );
}
