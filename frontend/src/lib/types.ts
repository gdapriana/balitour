export interface Navigation {
  title: string;
  path: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Role {
  ADMIN = "ADMIN",
  BASIC = "BASIC",
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
  stories?: Story[];
  _count: {
    stories: number;
    users_comment_cultures: number;
    users_comment_destinations: number;
    users_comment_stories: number;
    users_like_cultures: number;
    users_like_destinations: number;
    users_like_stories: number;
    users_save_cultures: number;
    users_save_destinations: number;
    users_save_stories: number;
    users_view_cultures: number;
    users_view_destinations: number;
    users_view_stories: number;
  }
  users_comment_stories?: UsersCommentStories[];
  users_like_stories?: UsersLikeStories[];
  users_save_stories?: UsersSaveStories[];
  users_view_stories?: UsersViewStories[];
  users_comment_destinations?: UsersCommentDestinations[];
  users_like_destinations?: UsersLikeDestinations[];
  users_save_destinations?: UsersSaveDestinations[];
  users_view_destinations?: UsersViewDestinations[];
  users_comment_cultures?: UsersCommentCultures[];
  users_like_cultures?: UsersLikeCultures[];
  users_save_cultures?: UsersSaveCultures[];
  users_view_cultures?: UsersViewCultures[];
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
  User?: User;
  relatedDestinationSlug?: string;
  Destination?: Destination;
  relatedCultureSlug?: string;
  Culture?: Culture;
  relatedDistrictSlug?: string;
  District?: District;
  Source?: Source[];
  Image?: Image[];
  _count: {
    Source: number
    Images: number
    users_comment_stories: number
    users_likestories: number
    users_savestories: number
    users_viewstories: number
  };
  users_comment_stories?: UsersCommentStories[];
  users_like_stories?: UsersLikeStories[];
  users_save_stories?: UsersSaveStories[];
  users_view_stories?: UsersViewStories[];
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
  districtSlug?: string;
  categorySlug?: string;
  District?: District;
  Category?: Category;
  Story?: Story[];
  Source?: Source[];
  Image?: Image[];
  _count: {
    Source: number
    Story: number
    Images: number
    users_comment_destinations: number
    users_like_destinations: number
    users_save_destinations: number
    users_view_destinations: number
  };
  users_comment_destinations?: UsersCommentDestinations[];
  users_like_destinations?: UsersLikeDestinations[];
  users_save_destinations?: UsersSaveDestinations[];
  users_view_destinations?: UsersViewDestinations[];
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
  districtSlug?: string;
  District?: District;
  Story?: Story[];
  Source?: Source[];
  images?: Image[];
  _count: {
    Source: number
    Story: number
    Images: number
    users_comment_cultures: number
    users_like_cultures: number
    users_save_cultures: number
    users_view_cultures: number
  };
  users_comment_cultures?: UsersCommentCultures[];
  users_like_cultures?: UsersLikeCultures[];
  users_save_cultures?: UsersSaveCultures[];
  users_view_cultures?: UsersViewCultures[];
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  name: string;
  description?: string;
  destination?: Destination[];
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
  body?: string | null;
  destinations?: Destination[];
  cultures?: Culture[];
  Story?: Story[];
}

export interface Image {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  cultureSlug?: string;
  destinationSlug?: string;
  storySlug?: string;
  Culture?: Culture;
  Destination?: Destination;
  Story?: Story | null;
}

export interface Source {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  year?: string;
  publisher?: string;
  doi?: string;
  weblink?: string;
  accessed?: Date;
  storySlug?: string;
  destinationSlug?: string;
  cultureSlug?: string;
  story?: Story;
  destination?: Destination;
  culture?: Culture;
}

// Pivot Models
export interface UsersCommentStories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  body: string;
  user: User;
  story: Story;
}

export interface UsersLikeStories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  user: User;
  story: Story;
}

export interface UsersSaveStories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  user: User;
  story: Story;
}

export interface UsersViewStories {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  storySlug: string;
  user: User;
  story: Story;
}

export interface UsersCommentDestinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  body: string;
  user: User;
  destination: Destination;
}

export interface UsersLikeDestinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  user: User;
  destination: Destination;
}

export interface UsersSaveDestinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  user: User;
  destination: Destination;
}

export interface UsersViewDestinations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  destinationSlug: string;
  user: User;
  destination: Destination;
}

export interface UsersCommentCultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  body: string;
  user: User;
  culture: Culture;
}

export interface UsersLikeCultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  user: User;
  culture: Culture;
}

export interface UsersSaveCultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  user: User;
  culture: Culture;
}

export interface UsersViewCultures {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  cultureSlug: string;
  user: User;
  culture: Culture;
}
