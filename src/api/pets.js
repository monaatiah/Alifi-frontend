import server from "./server";

export const getPetOptionsApi = async ({ cookies }) => {
  const response = await server({ cookies }).get(`/pets/options`);

  return response;
};

export const searchPetsApi = async ({ cookies, search = {} }) => {
  const response = await server({ cookies }).post(`/pets/search`, {
    search,
  });

  return response;
};

export const createPetApi = async ({ cookies, attributes }) => {
  const response = await server({ cookies }).post(`/pets/mutate`, {
    mutate: [
      {
        operation: "create",
        attributes,
      },
    ],
  });

  return response;
};

export const updatePetApi = async ({ cookies, key, attributes }) => {
  const response = await server({ cookies }).post(`/pets/mutate`, {
    mutate: [
      {
        operation: "update",
        key,
        attributes,
      },
    ],
  });

  return response;
};

export const deletePetApi = async ({ cookies, resources }) => {
  const normalizedResources = (Array.isArray(resources) ? resources : [])
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item));

  if (normalizedResources.length === 0) {
    throw new Error("Pet id is required for delete");
  }

  try {
    const response = await server({ cookies }).delete(`/pets`, {
      data: {
        resources: normalizedResources,
      },
    });

    return response;
  } catch (error) {
    // Fallback لبعض البيئات التي لا تدعم DELETE body بنفس الطريقة.
    const response = await server({ cookies }).post(`/pets/mutate`, {
      mutate: normalizedResources.map((key) => ({
        operation: "delete",
        key,
      })),
    });

    return response;
  }
};
