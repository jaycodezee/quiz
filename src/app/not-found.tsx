import Link from "next/link";

export default function Home() {
  return (
      <div className="container">
      <title>quiz web app</title>
        <h1>This Page Is Not Found </h1>
        <Link href="/">
          <button>Plz Goto The Home Page</button>
        </Link>
      </div>
  );
}
