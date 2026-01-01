import server from "./server";

export const getPageDataApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).post(
    `/pages/actions/get-by-slug`,
    { slug: slug }
  );

  return response.data;
};

export const getSettingsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get("/settings");
  return response.data;
};

export const joinUsApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).post(
    `/application-requests/mutate`,
    data
  );
  return response.data;
};
