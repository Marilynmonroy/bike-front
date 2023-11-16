import { User } from "@/interface";

import Select from "./Select";

interface userProps {
  user?: User;
  options: string;
}
export default function UserMenu(props: userProps) {
  <div>
    <Select tittle={"Profile"} onChange={() => {}} placeholder={"Profile"}>
      <option>{props.options}</option>
      <option>{props.options}</option>
    </Select>
  </div>;
}
