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

// get time in arabic from timestamp
export const getTime = (timestamp, locale) => {
  if (!timestamp) return;
  return new Date(timestamp).toLocaleTimeString(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      hour: "numeric",
      minute: "numeric",
    }
  );
};

// get data depend on slug
export const getDataBySlug = (data, slug) => {
  return data?.find((item) => item.slug === slug);
};
