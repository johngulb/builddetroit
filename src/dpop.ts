
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

const hostname = 'https://api.detroiter.network';
// const hostname = 'http://localhost:9090';

export const isAuthorized = () => {
  const cid = getUserCID();
  if (cid) return true;
  return localStorage.getItem("DPoPToken") ? true : false;
};

export const getContact = (): Contact => {
  const contact = localStorage.getItem("DPoPContact");
  return contact ? JSON.parse(contact) : null;
};

export const saveContact = (contact: Contact) => {
  localStorage.setItem("DPoPContact", JSON.stringify(contact));
};

export const getUserCID = (): string | null => {
  if (typeof window === 'undefined') return null;
  const user_cid = localStorage.getItem("DPoPUserCID");
  return user_cid ? user_cid : null;
};

export const saveUserCID = (user_cid: string) => {
  localStorage.setItem("DPoPUserCID", user_cid);
};

export const storeCID = (cid: string) => {
  const contact = getContact();
  if (contact) {
    contact.cid = cid;
    console.log('STORE CID: ', contact);
    saveContact(contact);
    saveUserCID(cid);
  }
};

export const logout = () => {
  localStorage.removeItem("DPoPUser");
  localStorage.removeItem("DPoPToken");
  localStorage.removeItem("DPoPUserCID");
  localStorage.removeItem("DPoPContact");
  window.location.href = "/login";
};

export const storeCheckIn = (checkIn: DPoPEventCheckIn) => {
  console.log("storeCheckIn: ", checkIn)
  localStorage.setItem(`DPoPEvent-${checkIn.event_cid}-checkin`, JSON.stringify(checkIn));
};

export const getCheckIn = (event_cid: string) => {
  const checkIn = localStorage.getItem(`DPoPEvent-${event_cid}-checkin`);
  return checkIn ? JSON.parse(checkIn) : null;
};

const getDPoPToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("DPoPToken");
};

const setDPoPToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("DPoPToken", token);
};

export const getProfile = async (id: string) => {
  const result = await authorizedRequest(`user/${id}`);
  return result;
};

export const getUser = (): User => {
  if (typeof window === 'undefined') return null;
  const u = localStorage.getItem("DPoPUser");
  return JSON.parse(u);
};

const setUser = (user: User) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("DPoPUser", JSON.stringify(user));
};

export const getUserId = () => {
  const token = getDPoPToken();
  if (!token) return 0;
  const jwtData = parseJwt(token);
  console.log("jwtData: ", jwtData);
  return jwtData.sub;
};

const authorizedRequest = async (endpoint: string, options: any = {}) => {
  const headers = options?.headers ?? {};
  const DPoPToken = getDPoPToken();
  if (DPoPToken) headers["Authorization"] = `Bearer ${DPoPToken}`;
  const cid = getUserCID();
  if (cid) headers["DPoP-CID"] = `${cid}`;
  options.headers = headers;
  // const res = await fetch(`http://localhost:9090/api/${endpoint}`, options);
  const res = await fetch(`${hostname}/api/${endpoint}`, options);
  return await res.json();
};

export const login = async (email: string, password: string) => {
  const result = await (
    await fetch(`${hostname}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    })
  ).json();
  if (result.status === 'error') {
    throw new Error(result.message);
  }
  if (result.authorization?.token) {
    setDPoPToken(result.authorization.token);
  }
  if (result.user) {
    setUser(result.user);
  }
  return result;
};

interface RegisterParams {
  name: string;
  email: string;
  phone: string | null;
  public_name: string | null; 
  organization: string | null;
  profile_picture: string | null;
  password: string;
}

export const updateUser = async (params: Partial<User>) => {
  const result = await authorizedRequest(`user`, {
    method: "PUT",
    body: JSON.stringify(params),
  });
  if (result.data) {
    setUser(result.data);
  }
  return result;
};

export const register = async (params: RegisterParams) => {
  const result = await (
    await fetch(`${hostname}/api/register`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "content-type": "application/json" },
    })
  ).json();
  if (result.status === 'error') {
    throw new Error(result.message);
  }
  if (result.authorization?.token) {
    setDPoPToken(result.authorization.token);
  }
  if (result.user) {
    setUser(result.user);
  }
  return result;
};

export const getEvent = async (event: string) => {
  const result = await (
    await fetch(`${hostname}/api/event/${event}`)
  ).json();
  return result.data;
};

interface EventQueryParams {
  type?: string;
  limit?: number;
  offset?: number;
}

export const getEvents = async ({type, limit, offset}: EventQueryParams) => {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  params.set('limit', limit?.toString() ?? '18');
  params.set('offset', offset?.toString() ?? '0');
  const result = await (
    await fetch(`${hostname}/api/events?${params.toString()}`)
  ).json();
  return result.data;
};

export const getArtwork = async (artwork: string) => {
  const result = await (
    await fetch(`${hostname}/api/artwork/${artwork}`)
  ).json();
  return result;
};

export const getContent = async (cid: string) => {
  const result = await (
    await fetch(`https://dpop.nyc3.digitaloceanspaces.com/${cid}`)
  ).json();
  return result;
};

export const getUserEvents = async (user_cid?: string) => {
  const result = await authorizedRequest(`user/events${user_cid ? `?user_cid=${user_cid}` : ''}`);
  return result?.data;
};

export const createContact = async (contact: Contact, user_cid?: string) => {
  const data = contact;
  if (user_cid)
    data['attestator'] = user_cid;
  const result = await authorizedRequest(`user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: contact ? JSON.stringify(contact) : null,
  });
  if (result?.data?.user_cid || result?.data?.cid) {
    const save = result.data;
    save.email = contact.email;
    saveContact(save);
  }
  return result?.data;
};

export const requestPhoneNumberVerification = async (phone: string) => {
  const result = await authorizedRequest(`request-phone-number-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone
    }),
  });
  return result;
};

export const verifyPhoneNumber = async (code: string, secret: string) => {
  const result = await authorizedRequest(`verify-phone-number`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      secret
    }),
  });
  return result;
};

export const submitEventCheckIn = async (event: string, contact: Contact, user_cid: string) => {
  const data = contact;
  data['attestator'] = user_cid;
  const result = await authorizedRequest(`event/${event}/check-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: contact ? JSON.stringify(contact) : null,
  });
  if (result?.data?.user_cid)
    storeCheckIn(result.data);
  return result?.data;
};

export const submitEventConfirmationCheckIn = async (event: string, user_cid: string, attestator: string) => {
  const data = { attestator, user_cid };
  const result = await authorizedRequest(`event/${event}/check-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (result?.data?.user_cid)
    storeCheckIn(result.data);
  return result?.data;
};

export const submitEventRsvp = async (event: string, contact?: Contact, referral?: string) => {
  const data = contact ? contact as any : {};
  data.referral = referral;
  const result = await authorizedRequest(`event/${event}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
  if (result.data?.user?.cid) {
    storeCID(result.data?.user?.cid);
  }
  if (result.status === 'error') {
    throw new Error(result.message);
  }
  return result.data;
};

export const submitEventConfirmationRsvp = async (event: string, user_cid: string, referral: string) => {
  const data = { referral, user_cid };
  const result = await authorizedRequest(`event/${event}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (result.data?.user?.cid) {
    storeCID(result.data?.user?.cid);
  }
  return result?.data;
};

export const submitSignedEventRsvp = async (
  event: string,
  cs: ContentSignature
) => {
  const result = await authorizedRequest(`event/${event}/signed-rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cs),
  });
  return result.data;
};

export const getRsvps = async () => {
  const result = await authorizedRequest("rsvps");
  return result.data;
};

export const inRSVPs = (rsvps) => {
  const userId = getUserId();
  return rsvps.filter((rsvp) => rsvp.user.id == userId)?.length ? true : false;
};

export const myRSVP = (rsvps) => {
  const cid = getUserCID();
  const matches = rsvps.filter((rsvp) => rsvp.user.cid == cid);
  return matches[0]; 
};

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

/** Communities */

export const getCommunity = async (id: string) => {
  const result = await authorizedRequest(`community/${id}`);
  return result ?? null;
};

export const getCommunityDetails = async (slug: string) => {
  const result = await authorizedRequest(`community/${slug}/details`);
  return result ?? null;
};

export const getCommunities = async () => {
  const result = await authorizedRequest("communities");
  return result.data ?? [];
};

export const joinCommunity = async (id: string) => {
  const result = await authorizedRequest(`community/${id}/join`, {
    method: "POST",
  });
  return result;
};

export const leaveCommunity = async (id: string) => {
  const result = await authorizedRequest(`community/${id}/leave`, {
    method: "POST",
  });
  return result;
};

export const getCommunityMembers = async (id: string) => {
  const result = await authorizedRequest(`community/${id}/members`);
  return result;
};



