import Head from 'next/head';

type Props = {
  title?: string;
  favicon?: string;
};

export function HeadComponent({ title, favicon }: Props): JSX.Element {
  return (
    <div>
      <Head>
        <title>{title ?? 'Hacker News'}</title>
        {favicon && <link rel='icon' href={favicon} /> }
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content="Hackernews GraphQL" />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='localhost:3000' />
        <meta
          property='og:description'
          content='Hackernews clone created using GraphQL based on React Apollo tutorial from howtographql.com'
        />

        <meta name='theme-color' content='##e00083' />
        <meta charSet='utf-8' />
      </Head>
    </div>
  );
}