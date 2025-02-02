export interface Navigation {
  title: string;
  path: string;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  phoneNumber?: string;
  gender?: Gender;
  token?: string;
  role: Role;
  stories: Story[];
  users_comment_stories: users_comment_stories[];
  users_like_stories: users_like_stories[];
  users_save_stories: users_save_stories[];
  users_view_stories: users_view_stories[];
  users_comment_destinations: users_comment_destinations[];
  users_like_destinations: users_like_destinations[];
  users_save_destinations: users_save_destinations[];
  users_view_destinations: users_view_destinations[];
  users_comment_cultures: users_comment_cultures[];
  users_like_cultures: users_like_cultures[];
  users_save_cultures: users_save_cultures[];
  users_view_cultures: users_view_cultures[];
}

export interface Story {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string;
  cover: string;
  body: string;
  readingTime: number;
  username: string;
  _count: {
    users_comment_stories: number;
    users_like_stories: number;
    users_save_stories: number;
    users_view_stories: number;
  };
  users_comment_stories: users_comment_stories[];
  users_like_stories: users_like_stories[];
  users_save_stories: users_save_stories[];
  users_view_stories: users_view_stories[];
  User?: User;
}

export interface Destination {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string;
  cover: string;
  address: string;
  price?: number;
  map: string;
  _count: {
    users_comment_destinations: number;
    users_like_destinations: number;
    users_save_destinations: number;
    users_view_destinations: number;
  };
  users_comment_destinations: users_comment_destinations[];
  users_like_destinations: users_like_destinations[];
  users_save_destinations: users_save_destinations[];
  users_view_destinations: users_view_destinations[];
  District?: District;
  districtSlug?: string;
  Category?: Category;
  categorySlug?: string;
}

export interface Culture {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string;
  body: string;
  cover: string;
  address?: string;
  _count: {
    users_comment_cultures: number;
    users_like_cultures: number;
    users_save_cultures: number;
    users_view_cultures: number;
  };
  users_comment_cultures: users_comment_cultures[];
  users_like_cultures: users_like_cultures[];
  users_save_cultures: users_save_cultures[];
  users_view_cultures: users_view_cultures[];
  districtSlug?: string;
  District?: District;
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  name: string;
  description?: string;
  destination: Destination[];
}

export interface District {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  logo?: string;
  cover?: string;
  description?: string;
  body?: string;
  destinations: Destination[];
  cultures: Culture[];
}

export interface users_comment_stories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  body: string;
  user: User;
  story: Story;
}

export interface users_like_stories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  user: User;
  story: Story;
}

export interface users_save_stories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  user: User;
  story: Story;
}

export interface users_view_stories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  user: User;
  story: Story;
}

export interface users_like_destinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  user: User;
  destination: Destination;
}

export interface users_comment_destinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  body: string;
  user: User;
  destination: Destination;
}

export interface users_save_destinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  user: User;
  destination: Destination;
}

export interface users_view_destinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  user: User;
  destination: Destination;
}

export interface users_comment_cultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  body: string;
  user: User;
  culture: Culture;
}

export interface users_like_cultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  user: User;
  culture: Culture;
}

export interface users_save_cultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  user: User;
  culture: Culture;
}

export interface users_view_cultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  user: User;
  culture: Culture;
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum Role {
  ADMIN = "ADMIN",
  BASIC = "BASIC",
}