import { useState } from 'react';
import { useRouter } from 'next/router'
import { useMutation, gql } from '@apollo/client';

import { FEED_QUERY, FeedType } from '../LinkList';
import { LINKS_PER_PAGE } from '../../services/constants';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const defaultFormState = {
  description: '',
  url: ''
};

export function CreateLink() {
  const router = useRouter();
  const [formState, setFormState] = useState(defaultFormState);

  const [createLink, result] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const response = cache.readQuery<FeedType>({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy
        }
      });

      if (response?.feed) {
        const { feed } = response;

        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: [post, ...feed.links]
            }
          },
          variables: {
            take,
            skip,
            orderBy
          }
        });
      }
    },
    onCompleted: () => {
      setFormState(defaultFormState);
      router.push('/');
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
