import server from "./server";

export const getProductsApi = async ({
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

  const response = await server({ cookies }).post(`/products/search`, body);

  return response;
};

export const getSingleProductApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).post(
    `/products/actions/get-product-by-slug`,
    {
      slug: slug,
    },
  );
  return response;
};
