import Link from 'next/link';

export function Header() {
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
        <Link href="/create">
          <a className="ml1 no-underline black">
            Create
          </a>
        </Link>
      </div>
    </div>
  );
};
