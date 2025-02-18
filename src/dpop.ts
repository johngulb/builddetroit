import {
  Artwork,
  Contact,
  ContentSignature,
  DPoPEventCheckIn,
  User,
  DPoPEvent,
  Community,
  Member,
  Venue,
  DPoPEventRsvp,
  DPoPEventComment,
  Artist,
  Content,
} from "./interfaces";

export type {
  Artwork,
  Contact,
  ContentSignature,
  DPoPEventCheckIn,
  User,
  DPoPEvent,
  Community,
  Member,
  Venue,
  DPoPEventRsvp,
  DPoPEventComment,
};

const hostname = "https://api.detroiter.network";

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
  if (typeof window === "undefined") return null;
  const user = getUser();
  const user_cid = localStorage.getItem("DPoPUserCID");
  return user_cid ? user_cid : user?.cid;
};

export const saveUserCID = (user_cid: string) => {
  localStorage.setItem("DPoPUserCID", user_cid);
};

export const storeCID = (cid: string) => {
  const contact = getContact();
  if (contact) {
    contact.cid = cid;
    console.log("STORE CID: ", contact);
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
  console.log("storeCheckIn: ", checkIn);
  localStorage.setItem(
    `DPoPEvent-${checkIn.event_cid}-checkin`,
    JSON.stringify(checkIn)
  );
};

export const getCheckIn = (event_cid: string) => {
  const checkIn = localStorage.getItem(`DPoPEvent-${event_cid}-checkin`);
  return checkIn ? JSON.parse(checkIn) : null;
};

const getDPoPToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("DPoPToken");
};

const setDPoPToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("DPoPToken", token);
};

export const getProfile = async (id: string) => {
  const result = await authorizedRequest(`user/${id}`);
  return result;
};

export const getUser = (): User => {
  if (typeof window === "undefined") return null;
  const u = localStorage.getItem("DPoPUser");
  return JSON.parse(u);
};

const setUser = (user: User) => {
  if (typeof window === "undefined") return;
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
  if (result.status === "error") {
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
  if (result.status === "error") {
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

/** Events */
export const getEvent = async (event: string) => {
  const result = await (await fetch(`${hostname}/api/event/${event}`)).json();
  return result.data;
};

interface EventQueryParams {
  type?: string;
  venue?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
}

export const createEvent = async (event: Partial<DPoPEvent>) => {
  const result = await (
    await fetch(`${hostname}/api/event`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result.data;
};

export const updateEvent = async (event: Partial<DPoPEvent>) => {
  const result = await (
    await fetch(`${hostname}/api/event/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result.data;
};


export const getEvents = async ({
  type,
  venue,
  limit,
  offset,
  featured,
}: EventQueryParams) => {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (venue) params.set("venue", venue);
  params.set("limit", limit?.toString() ?? "18");
  params.set("offset", offset?.toString() ?? "0");
  if (featured) params.set("featured", "true");
  const result = await (
    await fetch(`${hostname}/api/events?${params.toString()}`)
  ).json();
  return result.data;
};

/** Artists */
export const getArtists = async () => {
  const result = await (await fetch(`${hostname}/api/artists`)).json();
  return result.data;
};

export const getArtist = async (artist: string) => {
  const result = await (await fetch(`${hostname}/api/artist/${artist}`)).json();
  return result.data;
};

export const createArtist = async (artist: Partial<Artist>) => {
  const result = await (
    await fetch(`${hostname}/api/artist`, {
      method: "POST",
      body: JSON.stringify(artist),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result.data;
};

export const updateArtist = async (artist: Partial<Artist>) => {
  const result = await (
    await fetch(`${hostname}/api/artist/${artist.id}`, {
      method: "PUT",
      body: JSON.stringify(artist),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result.data;
};

export const getArtistArtwork = async (artist: string) => {
  const result = await (
    await fetch(`${hostname}/api/artist/${artist}/artwork`)
  ).json();
  return result.data;
};

/** Artwork */

export const getArtwork = async (artwork: string) => {
  const result = await (
    await fetch(`${hostname}/api/artwork/${artwork}`)
  ).json();
  return result;
};

export const createArtwork = async (artwork: Partial<Artwork>) => {
  const result = await (
    await fetch(`${hostname}/api/artwork`, {
      method: "POST",
      body: JSON.stringify(artwork),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result;
};

export const getArtworks = async () => {
  const result = await (await fetch(`${hostname}/api/artwork`)).json();
  return result.data;
};

export const updateArtwork = async (artwork: Partial<Artwork>) => {
  const result = await (
    await fetch(`${hostname}/api/artwork/${artwork.id}`, {
      method: "PUT",
      body: JSON.stringify(artwork),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result;
};

export const addArtworkContent = async (
  artwork: string,
  content: Partial<Content>
) => {
  const result = await (
    await fetch(`${hostname}/api/artwork/${artwork}/content`, {
      method: "POST",
      body: JSON.stringify(content),
    })
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
  const result = await authorizedRequest(
    `user/events${user_cid ? `?user_cid=${user_cid}` : ""}`
  );
  return result?.data;
};

export const createContact = async (contact: Contact, user_cid?: string) => {
  const data = contact;
  if (user_cid) data["attestator"] = user_cid;
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
      phone,
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
      secret,
    }),
  });
  return result;
};

export const submitEventCheckIn = async (
  event: string,
  contact: Contact,
  user_cid: string
) => {
  const data = contact;
  data["attestator"] = user_cid;
  const result = await authorizedRequest(`event/${event}/check-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: contact ? JSON.stringify(contact) : null,
  });
  if (result?.data?.user_cid) storeCheckIn(result.data);
  return result?.data;
};

export const submitEventConfirmationCheckIn = async (
  event: string,
  user_cid: string,
  attestator: string
) => {
  const data = { attestator, user_cid };
  const result = await authorizedRequest(`event/${event}/check-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (result?.data?.user_cid) storeCheckIn(result.data);
  return result?.data;
};

export const submitEventRsvp = async (
  event: string,
  contact?: Contact,
  referral?: string
) => {
  const data = contact ? (contact as any) : {};
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
  if (result.status === "error") {
    throw new Error(result.message);
  }
  return result.data;
};

export const submitEventConfirmationRsvp = async (
  event: string,
  user_cid: string,
  referral: string
) => {
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

export const getConnections = async (event: string) => {
  const result = await authorizedRequest(`event/${event}/connections`);
  return result.data;
};

export const getRsvps = async () => {
  const result = await authorizedRequest("rsvps");
  return result.data;
};

export const inRSVPs = (rsvps) => {
  const userId = getUserId();
  return rsvps.filter((rsvp) => rsvp.user?.id == userId)?.length ? true : false;
};

export const myRSVP = (rsvps) => {
  const cid = getUserCID();
  const user = getUser();
  const matches = rsvps.filter(
    (rsvp) => rsvp.user?.cid == cid || rsvp.user?.id == user?.id
  );
  return matches[0];
};

export const parseJwt = (token) => {
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

/** Venues */

export const getVenues = async ({ type, limit, offset }: { type?: string, limit?: number, offset?: number }) => {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  params.set("limit", limit?.toString() ?? "100");
  params.set("offset", offset?.toString() ?? "0");
  const result = await (
    await fetch(`${hostname}/api/venues?${params.toString()}`)
  ).json();

  return result.data;
};

export const getVenue = async (id: string) => {
  const result = await authorizedRequest(`venue/${id}`);
  return result.data;
};

/** Communities */

export const getCommunity = async (id: string) => {
  const result = await authorizedRequest(`community/${id}`);
  return result ?? null;
};

export const createCommunity = async (community: Partial<Community>) => {
  const result = await authorizedRequest(`community`, {
    method: "POST",
    body: JSON.stringify(community),
  });
  return result;
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

/** Search */

export const searchEvents = async (query: string) => {
  const result = await authorizedRequest(`search/events`, {
    method: "POST",
    body: JSON.stringify({ query }),
  });
  return result.data;
};

export const getEventCategories = async () => {
  // const result = await authorizedRequest(`event-categories`);
  // return result.data;
  return [
    {
      id: 1,
      name: "All",
      slug: "all",
    },
    {
      id: 2,
      name: "Music",
      slug: "music",
    },
    {
      id: 3,
      name: "Art",
      slug: "art",
    },
    {
      id: 4,
      name: "Tech",
      slug: "tech",
    },
    {
      id: 5,
      name: "Fitness",
      slug: "fitness",
    },
  ];
};
