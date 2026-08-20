import server from "./server";

export const getCategoriesApi = async ({ cookies }) => {
  const response = await server({ cookies }).post(`/categories/search`, {});

  return response;
};

export const getSingleCategoryApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).post(
    `/categories/actions/get-category-by-slug`,
    {
      slug: slug,
    },
  );
  return response;
};

export const getCategoryProductsApi = async ({
  cookies,
  slug,
  min_price = null,
  max_price = null,
  in_stock = null,
  on_sale = null,
  sort = "newest",
  per_page = 20,
  page = 1,
}) => {
  const response = await server({ cookies }).post(
    `/categories/actions/get-category-products`,
    {
      slug: slug,
      min_price: min_price,
      max_price: max_price,
      in_stock: in_stock,
      on_sale: on_sale,
      sort: sort,
      per_page: per_page,
      page: page,
    },
  );
  return response;
};
