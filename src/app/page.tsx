import Link from "next/link";

export default function App() {
  return (
    <ul>
      <li>
        <Link href="/">Login</Link>
      </li>
      <li>
        <Link href="/home">Home</Link>
      </li>
    </ul>
  );
}
