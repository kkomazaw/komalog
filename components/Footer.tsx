import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <div className="mb-2">
            <Link href="/feed" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              RSS Feed
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} komalog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
