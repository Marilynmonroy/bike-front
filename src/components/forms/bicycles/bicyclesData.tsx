import { Bicycle } from "@/interface";

interface BicycleProps {
  bicycle: Bicycle | null | undefined;
}

export default function BicycleData({ bicycle }: BicycleProps): JSX.Element {
  return <div className="text-slate-800 ml-4">{bicycle?.color}</div>;
}
