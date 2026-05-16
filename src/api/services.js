import server from "./server";

export const getServicesApi = async ({
  cookies,
  limit = 20,
  page = 1,
  lat,
  lng,
  radius_km,
  pet_id,
  min_price,
  max_price,
  name,
  rating,
}) => {
  const body = {
    search: {
      limit: limit,
      page: page,
      lat: lat,
      lng: lng,
      radius_km: radius_km,
      pet_id: pet_id,
      min_price: min_price,
      max_price: max_price,
      name: name,
      rating: rating,
    },
  };

  const response = await server({ cookies }).post(`/services/search`, body);
  return response;
};

export const getServicesCategoriesApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/service-categories`, {});
  return response;
};

export const submitServiceRequestApi = async ({
  cookies,
  marketplace_service_id,
  customer_name,
  customer_phone,
  customer_email,
  message,
}) => {
  const body = {
    marketplace_service_id: marketplace_service_id,
    customer_name: customer_name,
    customer_phone: customer_phone,
    customer_email: customer_email,
    message: message,
  };

  const response = await server({ cookies }).post(
    `/service-contact-entries`,
    body,
  );
  return response;
};

export const getSingleServiceApi = async ({ cookies, slug }) => {
  const response = await server({ cookies }).get(`/services/by-slug/${slug}`);
  return response;
};

export const getServiceProvidersApi = async ({
  cookies,
  page = 1,
  per_page = 100,
  search,
  name,
  category_id,
  category_slug,
}) => {
  const response = await server({ cookies }).get(`/service-providers`, {
    params: {
      page,
      per_page,
      ...(search ? { search } : {}),
      ...(name ? { name } : {}),
      ...(category_id ? { category_id } : {}),
      ...(category_slug ? { category_slug } : {}),
    },
  });

  return response;
};

export const createBookingApi = async ({
  cookies,
  service_id,
  provider_id,
  pet_id,
  location_id,
  scheduled_at,
  addon_ids = [],
  pet_notes = "",
}) => {
  const body = {
    service_id: service_id,
    provider_id: provider_id,
    pet_id: pet_id,
    location_id: location_id,
    scheduled_at: scheduled_at,
    addon_ids: addon_ids,
    pet_notes: pet_notes,
  };

  const response = await server({ cookies }).post(
    `/bookings/actions/create-booking`,
    body,
  );

  return response;
};

export const addServiceToFavoritesApi = async ({ cookies, service_id }) => {
  const response = await server({ cookies }).post(`/favorites`, {
    service_id: service_id,
  });

  return response;
};

export const removeServiceFromFavoritesApi = async ({
  cookies,
  service_id,
}) => {
  const response = await server({ cookies }).delete(`/favorites/${service_id}`);
  return response;
};

export const getFavoriteServicesApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/favorites`);
  return response;
};

export const getServicesProvidersApi = async ({
  cookies,
  page = 1,
  per_page = 100,
  search,
  name,
  category_id,
  category_slug,
}) => {
  const response = await server({ cookies }).post(`/service-providers/search`, {
    params: {
      page,
      per_page,
      ...(search ? { search } : {}),
      ...(name ? { name } : {}),
      ...(category_id ? { category_id } : {}),
      ...(category_slug ? { category_slug } : {}),
    },
  });

  return response;
};

export const getSingleServiceProviderApi = async ({
  cookies,
  service_provider_slug,
  slug,
  provider_id,
  page = 1,
  per_page = 20,
}) => {
  const providerSlug = service_provider_slug || slug || provider_id;

  const response = await server({ cookies }).get(
    `/service-providers/by-slug/${providerSlug}`,
    {
      params: {
        page,
        per_page,
      },
    },
  );
  return response;
};
