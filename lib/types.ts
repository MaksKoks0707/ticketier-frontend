export type Venue = {
  id: number;
  address: string;
  city: string;
  country: string;
};

export type Artist = {
  id: number;
  name: string;
};

export type Event = {
  id: number;
  date: string;
  event_type: string;
  artist_id: number;
  venue_id: number;
};

export type Ticket = {
  id: number;
  price: number;
  event_id: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export type AccessTokenResponse = {
  access_token: string;
};
