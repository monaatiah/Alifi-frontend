import server from "./server";

export const getCategoriesApi = async ({ cookies }) => {
  const response = await server({ cookies }).post(`/categories/search`, {});

  return response;
};

export const getSingleCategoryApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).get(
    `/categories/actions/get-category-by-slug`,
    {
      slug: slug,
    },
  );
  return response;
};
