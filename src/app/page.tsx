import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <div className="container">
      <title>quiz web app</title>
        <h1> quiz web app</h1>
        <Link href="/quiz">
          <button>start the quiz </button>
        </Link>
      </div>
  );
}
