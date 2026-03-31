import server from "./server";

export const getContentApi = async ({
  cookies,
  filters = [],
  sorts = [],
  limit = 20,
  page = 1,
}) => {
  const body = {
    search: {
      filters: filters,
      sorts: sorts,
    },
    limit: limit,
    page: page,
  };

  const response = await server({ cookies }).post(`/contents/search`, body);

  return response;
};

export const getContentBySlugApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).post(
    `/contents/actions/get-by-slug`,
    {
      slug: slug,
    },
  );
  return response;
};

export const getContentCategoriesApi = async ({
  cookies,
  filters = [],
  sorts = [],
  limit = 20,
  page = 1,
}) => {
  const body = {
    search: {
      filters: filters,
      sorts: sorts,
      limit: limit,
      page: page,
    },
  };

  const response = await server({ cookies }).post(
    `/content-categories/search`,
    body,
  );

  return response;
};
