import { gql, useMutation } from '@apollo/client';

import type { Link as LinkType } from '../../services/api-types';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../../services/constants';

import { timeDifferenceForDate } from '../../utils/timeDifferenceForDate';
import { FEED_QUERY, FeedType } from '../LinkList';

type LinkComponentProps = {
  link: LinkType;
  index: number;
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export function Link({ link, index }: LinkComponentProps) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    },
    update(cache, { data: { vote } }) {
      const response = cache.readQuery<FeedType>({
        query: FEED_QUERY
      });

      if (response?.feed) {
        const { feed } = response;

        const updatedLinks = feed.links.map((feedLink) => {
          if (feedLink.id === link.id) {
            return {
              ...feedLink,
              votes: [...feedLink.votes, vote]
            };
          }

          return feedLink;
        });
  
        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: updatedLinks
            }
          }
        });
      }
    }
});

  async function handleVote() {
    await vote();
  }

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={handleVote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};
