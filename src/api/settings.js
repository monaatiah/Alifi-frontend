import server from "./server";

export const getPageDataApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).get(`/pages/${slug}`);
  return response.data;
};

export const getSectionDataApi = async ({ cookies, pageSlug, sectionSlug }) => {
  const response = await server({ cookies }).get(
    `/pages/${pageSlug}/sections/${sectionSlug}`
  );
  return response.data;
};

export const getSettingsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get("/settings/siteInfo");
  return response.data;
};

export const contactUsApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).post("/contactUs", data);
  return response.data;
};

export const startObjectionApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).post("/objectionRequests", data);
  return response.data;
};

export const developerRequestApi = async ({ cookies, data }) => {
  const response = await server({ cookies }).post("/developerRequests", data);
  return response.data;
};
