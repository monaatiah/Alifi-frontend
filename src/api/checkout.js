import server from "./server";
import { parseCookies } from "nookies";

export const getCheckoutFormSchemaApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/settings/checkout`);
  return response.data;
};

export const getPaymentMethodsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/settings/payment-methods`);
  return response.data;
};

export const getShippingMethodsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/settings/shipping-methods`);
  return response.data;
};

// ==================================================
// ==================================================

export const getCountriesApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/locations/countries`);
  return response.data;
};

export const getCountryCitiesApi = async ({ cookies, countryId }) => {
  const response = await server({ cookies }).get(
    `/locations/countries/${countryId}/cities`,
  );
  return response.data;
};

export const getCountryStatesApi = async ({ cookies, countryId }) => {
  const response = await server({ cookies }).get(
    `/locations/countries/${countryId}/states`,
  );
  return response.data;
};

export const getRegionCitiesApi = async ({ cookies, regionId }) => {
  const response = await server({ cookies }).get(
    `/locations/regions/${regionId}/cities`,
  );
  return response.data;
};

export const getStateCitiesApi = async ({ cookies, stateId }) => {
  const response = await server({ cookies }).get(
    `/locations/states/${stateId}/cities`,
  );
  return response.data;
};

// ==================================================
// ==================================================

export const getShippingMethodsByAddressApi = async (payload) => {
  const response = await server().post(
    `/checkout/actions/list-shipping-methods`,
    payload,
  );
  return response.data;
};

export const processCheckoutApi = async (payload) => {
  const cookies = parseCookies();
  const body = payload?.body || payload;
  const cartToken = cookies?.cart_token;

  const response = await server().post(`/checkout/actions/process`, body, {
    headers: {
      ...(cartToken ? { "X-Cart-Token": cartToken } : {}),
    },
  });
  return response;
};

export const getOrderDetailsApi = async ({ cookies, orderId }) => {
  const response = await server({ cookies }).get(`/orders/${orderId}`);
  return response.data;
};
