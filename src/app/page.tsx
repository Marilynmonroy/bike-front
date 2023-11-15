import Link from "next/link";

export default function App() {
  return (
    <ul>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <Link href="/home">Home</Link>
      </li>
      <li>
        <Link href="/blog/hello-worl/">Blog Post</Link>
      </li>
    </ul>
  );
}
