import { useQuery, gql } from '@apollo/client';

import { Link } from '../Link';
import type { Link as LinkType } from '../../services/api-types';

type DataType = {
  feed: {
    id: string;
    links: LinkType[];
  }
}


const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export function LinkList() {
  const { data } = useQuery<DataType>(FEED_QUERY);
  const links = data?.feed.links ?? [];

  return (
    <div>
      {links.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};
