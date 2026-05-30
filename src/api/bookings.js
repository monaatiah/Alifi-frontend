import server from "./server";

export const searchBookingsApi = async ({
  cookies,
  limit = 20,
  page = 1,
  search = {},
}) => {
  const response = await server({ cookies }).post(`/bookings/search`, {
    search: {
      limit,
      page,
      ...search,
    },
  });

  return response;
};
