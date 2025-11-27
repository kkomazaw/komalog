import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
            komalog
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/categories"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/tags"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Tags
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
