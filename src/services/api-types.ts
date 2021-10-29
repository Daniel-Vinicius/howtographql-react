type User = {
  id: string;
  name: string;
  email: string;
  links: [Link];
}

type Link = {
  id: string;
  description: string;
  url: string;
  postedBy: User;
  votes: [Vote];
  createdAt: Date;
}

type Vote = {
  id: string;
  link: Link;
  user: User;
}

export type { User, Link, Vote };
