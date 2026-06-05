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

export const cancelBookingApi = async ({ cookies, bookingId }) => {
  const response = await server({ cookies }).patch(
    `/bookings/${bookingId}/cancel`,
  );

  return response;
};

export const submitBookingReviewApi = async ({
  cookies,
  bookingId,
  rating,
  comment,
}) => {
  const response = await server({ cookies }).post(
    `/bookings/${bookingId}/review`,
    {
      rating,
      comment,
    },
  );

  return response;
};
