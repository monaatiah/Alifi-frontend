// get the numeric date
export const getFullDate = (date, locale) => {
  if (!date) return;
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
};
//handle the image link if it is not a full link then add the base url
export const handleImageLink = (image) => {
  if (image?.includes("http")) {
    return image;
  } else {
    // eslint-disable-next-line no-undef
    return `${process.env.NEXT_PUBLIC_MAIN_URL}/${image}`;
  }
};

export const getId = (obj) => obj?._id || obj?.id;

// get component data by component_identifier
export const getComponentByIdentifier = (pageComponents, identifier) => {
  if (!pageComponents || !Array.isArray(pageComponents)) return null;

  const component = pageComponents.find(
    (comp) => comp?.component_identifier === identifier
  );

  return component || null;
};
