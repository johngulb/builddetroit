export const getEnvironment = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const layout =
    url === "https://artnightdetroit.com/" ? "artnight" : "default";
  const category = layout === "artnight" ? "Art" : "Tech";
  const image =
    layout === "artnight"
      ? "https://detroitartdao.com/wp-content/uploads/2023/02/272781136_145778497837915_7308205238901618223_n-1.jpg"
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
