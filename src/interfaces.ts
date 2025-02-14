export interface Artist {
  id: number;
  name: string;
  slug: string;
  profile_picture: string;
  bio: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ArtworkData {
  image?: string;
  collaborators?: number[];
}

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  description: string;
  artist: Artist;
  data: ArtworkData;
  meta: any[];
}

export interface Content {
  id: number;
  user: User;
  data: {
    width: number;
    height: number;
    type: string;
    youtubeId?: string;
  };
  caption: string;
  timestamp: string;
  artwork: Artwork;
}

export interface Contact {
  cid?: string;
  name: string;
  email: string;
  phone: string;
  public_name: string;
  organization?: string;
}

export interface DPoPEvent {
  id: number;
  cid: string;
  title: string;
  slug: string;
  start_date: string;
  end_date: string;
  venue: Venue;
  comments?: DPoPEventComment[];
}

export interface Member {
  id: number;
  user: User;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Community {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  cover: string;
  data: {
    type: string;
  };
  members?: Member[];
  is_member?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: number;
  cid: string;
  title: string;
  slug: string;
  geo: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
}

export interface DPoPEventRsvp {
  cid?: string;
  event_cid: string;
  user_cid: string;
  user?: User;
  number?: number;
  confirmed?: boolean;
}

export interface DPoPEventCheckIn {
  cid?: string;
  event_cid: string;
  user_cid: string;
  user?: User;
  rsvp?: DPoPEventRsvp;
}

export interface DPoPEventComment {
  id: number;
  text: string;
  user: User;
}

export interface User {
  cid: string;
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  phone: string | null;
  public_address: string | null;
  public_name: string | null; 
  organization: string | null;
  profile_picture: string | null;
  communities?: Community[];
  updated_at: string;
}

export interface ContentSignature {
  content_id: string;
  signature: string;
  address: string;
}

