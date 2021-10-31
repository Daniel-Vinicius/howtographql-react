import { useQuery, gql } from '@apollo/client';

import { Link } from '../Link';
import type { Link as LinkType } from '../../services/api-types';

export type FeedType = {
  feed: {
    id: string;
    links: LinkType[];
  }
}


export const FEED_QUERY = gql`
{
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export function LinkList() {
  const { data } = useQuery<FeedType>(FEED_QUERY);
  const links = data?.feed.links ?? [];

  return (
    <div>
      {links.map((link, index) => (
        <Link key={link.id} index={index} link={link} />
      ))}
    </div>
  );
};
