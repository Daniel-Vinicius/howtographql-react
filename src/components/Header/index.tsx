import Link from 'next/link';

import { useAuth } from '../../contexts/auth';

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link href="/">
          <a className="ml1 no-underline black">
            List
          </a>
        </Link>
        <div className="ml1">|</div>
        <Link href="/top">
          <a className="ml1 no-underline black">
            Top
          </a>
        </Link>
        <div className="ml1">|</div>
        <Link href="/search">
          <a className="ml1 no-underline black">
            Search
          </a>
        </Link>
        {isAuthenticated && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link
              href="/create">
              <a className="ml1 no-underline black">
                Create
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {isAuthenticated ? (
          <div
            className="ml1 pointer black"
            onClick={logout}
          >
            logout
          </div>
        ) : (
          <Link
            href="/login">
            <a className="ml1 no-underline black">
              Login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
