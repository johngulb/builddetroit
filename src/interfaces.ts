export interface Artist {
  id: number;
  name: string;
  handle: string;
  slug: string;
  profile_picture: string;
  bio: string;
  artwork?: Artwork[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ArtworkData {
  image?: string;
  collaborator_ids?: number[];
}

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  description: string;
  artist_id?: number;
  artist?: Artist;
  collaborators?: Artist[];
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
    url?: string;
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

export interface ImageData {
  file: string;
  width: number;
  height: number;
  "mime-type": string;
  filesize: number;
  url: string;
}

export interface DPoPEvent {
  id: number;
  title: string;
  cid: string;
  slug: string;
  host: string | null;
  venue_id?: number;
  venue: Venue;
  start_date: string;
  end_date: string;
  event_categories: string[];
  categories: string[];
  comments?: DPoPEventComment[];
  excerpt: string;
  featured: boolean;
  image_data: ImageData;
  image: string;
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
  image: string;
  geo: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  event_count?: number;
  event_ids?: number[];
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

