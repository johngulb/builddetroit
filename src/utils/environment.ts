export const getEnvironment = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  let layout =
    url === "https://artnightdetroit.com/" ? "artnight" : "default";
  if (process.env.SITE_LAYOUT || process.env.NEXT_PUBLIC_SITE_LAYOUT)
    layout = process.env.SITE_LAYOUT || process.env.NEXT_PUBLIC_SITE_LAYOUT;
  let category = layout === "artnight" ? "Art" : "Tech";
  if (layout === 'detroiter')
    category = ''
  const image =
    layout === "artnight"
      ? "https://dpop.nyc3.digitaloceanspaces.com/uploads/resized/800w/oOVcomL9Ybez4Tzt2cFIPSwjZ0o0J88ewsM78ie1.png"
      : "https://detroitartdao.com/wp-content/uploads/2023/04/Screenshot-2023-04-08-at-3.33.24-PM.png";
  const site_name =
    layout === "artnight" ? "Art Night Detroit" : "Build Detroit";

  return {
    category,
    image,
    layout,
    site_name,
    url,
  };
};
