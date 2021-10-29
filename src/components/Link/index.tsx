import type { Link as LinkType } from '../../services/api-types';

type LinkComponentProps = {
  link: LinkType;
}

export function Link({ link }: LinkComponentProps) {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};
