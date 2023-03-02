export interface Contact {
  name: string;
  email: string;
  phone: string;
  public_name: string;
  organization: string;
}

export interface Event {
  id: number;
  cid: string;
  title: string;
  slug: string;
  start_date: string;
  end_date: string;
  venue: Venue;
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
}

export interface DPoPEventCheckIn {
  cid?: string;
  event_cid: string;
  user_cid: string;
  user?: User;
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
  updated_at: string;
}

export interface ContentSignature {
  content_id: string;
  signature: string;
  address: string;
}

const hostname = 'https://api.dpop.tech';
// const hostname = 'http://localhost:9090';

export const isAuthorized = () => {
  return localStorage.getItem("DPoPToken") ? true : false;
};

export const getContact = (): Contact => {
  const contact = localStorage.getItem("DPoPContact");
  return contact ? JSON.parse(contact) : null;
};

export const saveContact = (contact: Contact) => {
  localStorage.setItem("DPoPContact", JSON.stringify(contact));
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
  return localStorage.getItem("DPoPToken");
};

const setDPoPToken = (token: string) => {
  localStorage.setItem("DPoPToken", token);
};

export const getUser = (): User => {
  const u = localStorage.getItem("DPoPUser");
  return JSON.parse(u);
};

const setUser = (user: User) => {
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
  if (result.authorization.token) {
    setDPoPToken(result.authorization.token);
  }
  if (result.user) {
    setUser(result.user);
  }
  return result;
};

interface RegisterParams extends Contact {
  password: string;
}

export const register = async (params: RegisterParams) => {
  const result = await (
    await fetch(`${hostname}/api/register`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "content-type": "application/json" },
    })
  ).json();
  if (result.authorization.token) {
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

export const getContent = async (cid: string) => {
  const result = await (
    await fetch(`https://dpop.nyc3.digitaloceanspaces.com/${cid}`)
  ).json();
  return result;
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
  if (result?.data?.user_cid)
    saveContact(result.data);
  return result?.data;
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

export const submitEventRsvp = async (event: string, contact?: Contact) => {
  const result = await authorizedRequest(`event/${event}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: contact ? JSON.stringify(contact) : null,
  });
  return result.data;
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
