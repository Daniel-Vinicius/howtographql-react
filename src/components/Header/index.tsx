import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AUTH_TOKEN } from '../../services/constants';

export function Header() {
  const history = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const AuthToken = localStorage.getItem(AUTH_TOKEN);
    setAuthToken(AuthToken);
  }, [authToken]);

  if (authToken !== null && typeof authToken !== 'string') {
    return null;
  }

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
        <Link href="/search">
          <a className="ml1 no-underline black">
            Search
          </a>
        </Link>
        {authToken && (
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
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push(`/`);
            }}
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
