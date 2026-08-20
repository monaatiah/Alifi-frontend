import React, { useEffect, useMemo, useState } from "react";
import {
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import {
  addServiceToFavorites,
  getFavoritesServices,
  removeServiceFromFavorites,
} from "@/store/actions";

import { GoHeart, GoShareAndroid } from "react-icons/go";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import SliderImg from "./assets/img.png";
import { FiMapPin } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import {
  createBookingApi,
  getProviderLocationBookingScheduleApi,
  getServiceProvidersApi,
} from "@/api/services";
import { createPetApi, searchPetsApi } from "@/api/pets";

const Flatpickr = dynamic(() => import("react-flatpickr"), {
  ssr: false,
});

const normalizePets = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const normalizeProviders = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  // handle double-nested { data: { data: [...] } } (Laravel ApiResource)
  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const normalizeLocations = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.preview)) {
    return payload.preview;
  }

  return [];
};

const normalizeFavouriteServices = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const getLocationLabel = (location) => {
  if (!location) {
    return "";
  }

  return [location.address, location.city, location.state, location.country]
    .filter(Boolean)
    .join(", ");
};

const toDateKey = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const dateKeyToDate = (dateKey) => {
  if (!dateKey) {
    return null;
  }

  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: toDateKey(firstDay),
    to: toDateKey(lastDay),
  };
};

const ProductInfo = ({ singleService }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth || {});
  const { favouriteServices, favouriteServicesLoaded } = useSelector(
    (state) => state.services || {},
  );
  const hasAuthToken = Boolean(parseCookies()?.token);
  const canManagePets = isLoggedIn || hasAuthToken;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [isLoadingPets, setIsLoadingPets] = useState(false);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [didLoadPets, setDidLoadPets] = useState(false);
  const [didLoadProviders, setDidLoadProviders] = useState(false);
  const [providers, setProviders] = useState([]);
  const [bookingSchedule, setBookingSchedule] = useState(null);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [isSubmittingPet, setIsSubmittingPet] = useState(false);
  const [userPets, setUserPets] = useState([]);
  const [selectedBookingDates, setSelectedBookingDates] = useState([]);
  const [selectedBookingDateKey, setSelectedBookingDateKey] = useState("");
  const [petForm, setPetForm] = useState({
    name: "",
    species: "",
    breed: "",
  });
  const [bookingForm, setBookingForm] = useState({
    service_id: "",
    provider_id: "",
    pet_id: "",
    location_id: "",
    scheduled_at: "",
    addon_ids: [],
    pet_notes: "",
  });

  const fallbackPetOptions = useMemo(
    () =>
      singleService?.pets ||
      singleService?.customer_pets ||
      singleService?.user_pets ||
      [],
    [singleService],
  );

  const petOptions = useMemo(
    () => (canManagePets ? userPets : fallbackPetOptions),
    [canManagePets, fallbackPetOptions, userPets],
  );

  // unwrap { data: {...} } wrapper if the API returns one
  const serviceData = useMemo(
    () =>
      singleService?.id != null
        ? singleService
        : (singleService?.data ?? singleService),
    [singleService],
  );

  const favouriteServiceIds = useMemo(
    () =>
      normalizeFavouriteServices(favouriteServices)
        .map((service) => Number(service?.id))
        .filter(Boolean),
    [favouriteServices],
  );

  const isFavorite = useMemo(() => {
    if (!serviceData?.id) {
      return false;
    }

    if (favouriteServicesLoaded) {
      return favouriteServiceIds.includes(Number(serviceData.id));
    }

    return Boolean(serviceData?.is_favorited || singleService?.is_favorited);
  }, [
    favouriteServiceIds,
    favouriteServicesLoaded,
    serviceData,
    singleService,
  ]);

  const handleToggleFavorite = () => {
    if (!canManagePets) {
      router.push("/login");
      return;
    }

    if (!serviceData?.id) {
      return;
    }

    if (isFavorite) {
      dispatch(
        removeServiceFromFavorites({ cookies: {}, service_id: serviceData.id }),
      );
      return;
    }

    dispatch(
      addServiceToFavorites({ cookies: {}, service_id: serviceData.id }),
    );
  };

  const matchedProvider = useMemo(() => {
    const serviceProviderId = Number(
      serviceData?.provider_id ||
        serviceData?.service_provider_id ||
        serviceData?.provider?.id ||
        0,
    );
    const serviceId = Number(serviceData?.id || 0);
    const serviceSlug = serviceData?.slug || "";

    if (serviceProviderId) {
      const directProviderMatch = providers.find(
        (provider) => Number(provider.id) === serviceProviderId,
      );

      if (directProviderMatch) {
        return directProviderMatch;
      }
    }

    return (
      providers.find((provider) =>
        provider?.services?.preview?.some(
          (service) =>
            (serviceId && Number(service?.id) === serviceId) ||
            (serviceSlug && service?.slug === serviceSlug),
        ),
      ) || null
    );
  }, [providers, serviceData]);

  const embeddedLocationOptions = useMemo(() => {
    const embeddedLocations =
      serviceData?.provider?.locations ||
      serviceData?.locations ||
      serviceData?.provider_locations ||
      serviceData?.service_locations ||
      singleService?.locations ||
      singleService?.provider_locations ||
      singleService?.service_locations ||
      [];

    return normalizeLocations(embeddedLocations);
  }, [serviceData, singleService]);

  const locationOptions = useMemo(() => {
    const providerLocations = normalizeLocations(matchedProvider?.locations);

    if (providerLocations.length > 0) {
      return providerLocations;
    }

    return embeddedLocationOptions;
  }, [embeddedLocationOptions, matchedProvider?.locations]);

  const addonOptions = useMemo(
    () => serviceData?.addons || serviceData?.service_addons || [],
    [serviceData],
  );

  const galleryImages = useMemo(() => {
    const images = [
      serviceData?.cover_url,
      ...(Array.isArray(serviceData?.gallery_urls)
        ? serviceData.gallery_urls
        : []),
    ].filter(Boolean);

    return images.length > 0 ? images : [SliderImg.src || SliderImg];
  }, [serviceData]);

  const primaryLocationLabel = useMemo(
    () => getLocationLabel(embeddedLocationOptions[0]),
    [embeddedLocationOptions],
  );

  const reviews = useMemo(
    () => (Array.isArray(serviceData?.reviews) ? serviceData.reviews : []),
    [serviceData],
  );

  const reviewsCount =
    Number(
      serviceData?.reviews_count || serviceData?.reviews_count_total || 0,
    ) || reviews.length;

  const reviewAverage = useMemo(() => {
    const explicitRating = Number(
      serviceData?.reviews_avg_rating ?? serviceData?.rating ?? 0,
    );

    if (explicitRating) {
      return explicitRating;
    }

    if (!reviews.length) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => sum + Number(review?.rating || review?.rate || 0),
      0,
    );

    return total / reviews.length;
  }, [reviews, serviceData]);

  const availableDateKeys = useMemo(
    () =>
      Array.isArray(bookingSchedule?.available_dates)
        ? bookingSchedule.available_dates
        : [],
    [bookingSchedule],
  );

  const enabledBookingDates = useMemo(
    () => availableDateKeys.map(dateKeyToDate).filter(Boolean),
    [availableDateKeys],
  );

  const selectedDateSlots = useMemo(() => {
    if (!selectedBookingDateKey) {
      return [];
    }

    const slots = bookingSchedule?.slots_by_date?.[selectedBookingDateKey];

    return Array.isArray(slots) ? slots : [];
  }, [bookingSchedule, selectedBookingDateKey]);

  const scheduleRange = bookingSchedule?.schedule_range || {};

  useEffect(() => {
    setBookingForm((prev) => ({
      ...prev,
      service_id: String(serviceData?.id || ""),
      provider_id: String(
        serviceData?.provider_id ||
          serviceData?.service_provider_id ||
          serviceData?.provider?.id ||
          "",
      ),
    }));
  }, [serviceData]);

  useEffect(() => {
    if (!hasAuthToken || favouriteServicesLoaded) {
      return;
    }

    dispatch(getFavoritesServices({ cookies: {} }));
  }, [dispatch, favouriteServicesLoaded, hasAuthToken]);

  useEffect(() => {
    if (!router.isReady || !hasAuthToken) {
      return;
    }

    if (router.query.startBooking === "1") {
      setIsBookingMode(true);

      const restQuery = { ...router.query };
      delete restQuery.startBooking;

      router.replace(
        {
          pathname: router.pathname,
          query: restQuery,
        },
        undefined,
        { shallow: true },
      );
    }
  }, [hasAuthToken, router]);

  useEffect(() => {
    if (!isBookingMode || !canManagePets || didLoadPets) {
      return;
    }

    let isMounted = true;

    const loadPets = async () => {
      setIsLoadingPets(true);

      try {
        const { data } = await searchPetsApi({
          cookies: {},
          search: {},
        });

        if (!isMounted) {
          return;
        }

        setUserPets(normalizePets(data));
        setDidLoadPets(true);
      } catch (error) {
        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "تعذر تحميل الحيوانات الأليفة",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingPets(false);
        }
      }
    };

    loadPets();

    return () => {
      isMounted = false;
    };
  }, [canManagePets, didLoadPets, isBookingMode]);

  useEffect(() => {
    if (
      !isBookingMode ||
      embeddedLocationOptions.length > 0 ||
      providers.length > 0 ||
      isLoadingProviders ||
      didLoadProviders
    ) {
      return;
    }

    let isMounted = true;

    const loadProviders = async () => {
      setIsLoadingProviders(true);

      try {
        const { data } = await getServiceProvidersApi({
          cookies: {},
          page: 1,
          per_page: 100,
        });

        if (!isMounted) {
          return;
        }

        setProviders(normalizeProviders(data));
        setDidLoadProviders(true);
      } catch (error) {
        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "تعذر تحميل مقدمي الخدمة",
          );
          setDidLoadProviders(true);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProviders(false);
        }
      }
    };

    loadProviders();

    return () => {
      isMounted = false;
    };
  }, [
    didLoadProviders,
    embeddedLocationOptions.length,
    isBookingMode,
    isLoadingProviders,
    providers.length,
  ]);

  useEffect(() => {
    if (!matchedProvider?.id) {
      return;
    }

    if (String(bookingForm.provider_id) !== String(matchedProvider.id)) {
      setBookingForm((prev) => ({
        ...prev,
        provider_id: String(matchedProvider.id),
      }));
    }
  }, [bookingForm.provider_id, matchedProvider]);

  useEffect(() => {
    if (!locationOptions.length) {
      return;
    }

    const hasSelectedLocation = locationOptions.some(
      (location) => String(location.id) === String(bookingForm.location_id),
    );

    if (!bookingForm.location_id || !hasSelectedLocation) {
      setBookingForm((prev) => ({
        ...prev,
        location_id: String(locationOptions[0]?.id || ""),
      }));
    }
  }, [bookingForm.location_id, locationOptions]);

  useEffect(() => {
    if (!isBookingMode || !bookingForm.location_id || !bookingForm.service_id) {
      setBookingSchedule(null);
      setSelectedBookingDates([]);
      setSelectedBookingDateKey("");
      setBookingForm((prev) => ({ ...prev, scheduled_at: "" }));
      return;
    }

    let isMounted = true;
    const { from, to } = getCurrentMonthRange();

    const loadSchedule = async () => {
      setIsLoadingSchedule(true);
      setBookingSchedule(null);
      setSelectedBookingDates([]);
      setSelectedBookingDateKey("");
      setBookingForm((prev) => ({ ...prev, scheduled_at: "" }));

      try {
        const { data } = await getProviderLocationBookingScheduleApi({
          cookies: {},
          provider_location_id: bookingForm.location_id,
          service_id: bookingForm.service_id,
          from,
          to,
        });

        if (!isMounted) {
          return;
        }

        setBookingSchedule(data?.data || data || null);
      } catch (error) {
        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "تعذر تحميل مواعيد الحجز المتاحة",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingSchedule(false);
        }
      }
    };

    loadSchedule();

    return () => {
      isMounted = false;
    };
  }, [bookingForm.location_id, bookingForm.service_id, isBookingMode]);

  const rating = Number(reviewAverage ?? 0);
  const normalizedRating = Math.max(0, Math.min(5, rating));
  const roundedRating = Math.round(normalizedRating * 2) / 2;
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (roundedRating >= starValue) {
      return "full";
    }

    if (roundedRating >= starValue - 0.5) {
      return "half";
    }

    return "empty";
  });

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    }
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "location_id") {
      setBookingSchedule(null);
      setSelectedBookingDates([]);
      setSelectedBookingDateKey("");
    }

    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "location_id" ? { scheduled_at: "" } : {}),
    }));
  };

  const handlePetFormChange = (e) => {
    const { name, value } = e.target;

    setPetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddonChange = (addonId) => {
    const normalizedAddonId = Number(addonId);

    setBookingForm((prev) => {
      const exists = prev.addon_ids.includes(normalizedAddonId);

      return {
        ...prev,
        addon_ids: exists
          ? prev.addon_ids.filter((id) => id !== normalizedAddonId)
          : [...prev.addon_ids, normalizedAddonId],
      };
    });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    if (
      !bookingForm.service_id ||
      !bookingForm.provider_id ||
      !bookingForm.pet_id ||
      !bookingForm.location_id ||
      !bookingForm.scheduled_at
    ) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setIsSubmittingBooking(true);

    try {
      await createBookingApi({
        cookies: {},
        service_id: Number(bookingForm.service_id),
        provider_id: Number(bookingForm.provider_id),
        pet_id: Number(bookingForm.pet_id),
        location_id: Number(bookingForm.location_id),
        scheduled_at: bookingForm.scheduled_at,
        addon_ids: bookingForm.addon_ids,
        pet_notes: bookingForm.pet_notes,
      });

      toast.success("تم إنشاء الحجز بنجاح");
      setIsBookingMode(false);
      setBookingForm((prev) => ({
        ...prev,
        pet_id: "",
        location_id: "",
        scheduled_at: "",
        addon_ids: [],
        pet_notes: "",
      }));
      setSelectedBookingDates([]);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "تعذر إنشاء الحجز، حاول مرة أخرى",
      );
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleCreatePet = async (e) => {
    e.preventDefault();

    if (!petForm.name || !petForm.species || !petForm.breed) {
      toast.error("يرجى تعبئة بيانات الحيوان الأليف");
      return;
    }

    setIsSubmittingPet(true);

    try {
      await createPetApi({
        cookies: {},
        attributes: {
          name: petForm.name,
          species: petForm.species,
          breed: petForm.breed,
        },
      });

      const { data } = await searchPetsApi({
        cookies: {},
        search: {},
      });

      const pets = normalizePets(data);
      const newestPet = pets[0] || null;

      setUserPets(pets);
      setDidLoadPets(true);
      setShowAddPetModal(false);
      setPetForm({
        name: "",
        species: "",
        breed: "",
      });

      if (newestPet?.id) {
        setBookingForm((prev) => ({
          ...prev,
          pet_id: String(newestPet.id),
        }));
      }

      toast.success("تمت إضافة الحيوان الأليف بنجاح");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "تعذر إضافة الحيوان الأليف",
      );
    } finally {
      setIsSubmittingPet(false);
    }
  };

  const handleStartBooking = () => {
    if (!hasAuthToken) {
      toast.error("يجب تسجيل الدخول أولاً لإتمام الحجز");

      const redirectTo = `${router.asPath}${router.asPath.includes("?") ? "&" : "?"}startBooking=1`;
      router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
      return;
    }

    setIsBookingMode(true);
  };

  return (
    <div className="product-info">
      <Container>
        <div className="inner">
          <Row>
            <Col lg={5} xs={12}>
              <div className="product-images">
                <Swiper
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Thumbs]}
                  spaceBetween={10}
                  className="product-main-image"
                >
                  {galleryImages.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <img
                          src={item}
                          alt={serviceData?.title || "Service image"}
                          width={420}
                          height={370}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={3}
                  modules={[Thumbs]}
                  className="product-thumbs"
                >
                  {galleryImages.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <img
                          src={item}
                          alt={serviceData?.title || "Service image thumbnail"}
                          width={100}
                          height={90}
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
            <Col lg={7} xs={12}>
              <div className="product-details">
                <div className="title">
                  <div className="actions d-flex align-items-center gap-4">
                    <button
                      type="button"
                      aria-label="favorite button"
                      onClick={handleToggleFavorite}
                      style={{ color: isFavorite ? "#e74c3c" : "inherit" }}
                    >
                      <GoHeart size={30} />
                    </button>
                    <div className="share">
                      <button
                        type="button"
                        aria-label="share button"
                        onClick={() => setShowShareOptions(!showShareOptions)}
                      >
                        <GoShareAndroid size={30} />
                      </button>
                      <div
                        className={`share-list d-flex align-items-center flex-column gap-2 ${showShareOptions ? "active" : ""}`}
                      >
                        <button
                          type="button"
                          aria-label="share on facebook"
                          onClick={() => handleShare("facebook")}
                        >
                          <FaFacebook />
                        </button>
                        <button
                          type="button"
                          aria-label="share on twitter"
                          onClick={() => handleShare("twitter")}
                        >
                          <FaXTwitter />
                        </button>
                        <button
                          type="button"
                          aria-label="share on whatsapp"
                          onClick={() => handleShare("whatsapp")}
                        >
                          <FaWhatsapp />
                        </button>
                        <button
                          type="button"
                          aria-label="share on linkedin"
                          onClick={() => handleShare("linkedin")}
                        >
                          <FaLinkedin />
                        </button>
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id={`tooltip-copy`}>نسخ الرابط</Tooltip>
                          }
                        >
                          <button
                            type="button"
                            aria-label="copy link"
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                navigator.clipboard.writeText(
                                  window.location.href,
                                );
                                toast.success("تم نسخ الرابط");
                              }
                            }}
                          >
                            <IoCopyOutline />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                  <h1>{serviceData?.title}</h1>
                </div>
                <div className="review d-flex align-items-center gap-3">
                  <div className="stars d-flex align-items-center gap-1">
                    {stars.map((type, index) => (
                      <span key={index} className="star">
                        {type === "full" && <FaStar color="#000" />}
                        {type === "half" && (
                          <FaStarHalfAlt
                            color="#000"
                            style={{ transform: "scaleX(-1)" }}
                          />
                        )}
                        {type === "empty" && <FaStar color="#000" />}
                      </span>
                    ))}
                  </div>
                  <span>{reviewsCount} تقييمات</span>
                </div>
                {(primaryLocationLabel || serviceData?.category?.name) && (
                  <div className="service-meta d-flex align-items-center gap-3 flex-wrap">
                    {primaryLocationLabel && (
                      <div className="location d-flex align-items-center gap-3">
                        <div className="icon">
                          <FiMapPin />
                        </div>
                        <span>{primaryLocationLabel}</span>
                      </div>
                    )}
                    {serviceData?.category?.name && (
                      <div className="category-badge">
                        {serviceData.category.name}
                      </div>
                    )}
                  </div>
                )}
                {!isBookingMode && (
                  <>
                    <div className="description">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            serviceData?.short_description ||
                            serviceData?.description ||
                            "",
                        }}
                      />
                    </div>
                    {serviceData?.duration_minutes && (
                      <div className="duration">
                        مدة الخدمة: {serviceData.duration_minutes} دقيقة
                      </div>
                    )}
                    <div className="price-range">
                      <h4>النطاق السعري</h4>

                      <p className="d-flex align-items-center gap-2">
                        <span>
                          {serviceData?.base_price}
                          <SaudiRiyalIcon
                            width={20}
                            height={20}
                            stroke="#7267C3"
                          />
                        </span>
                      </p>
                    </div>
                    <div className="btns d-flex align-items-center justify-content-between">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleStartBooking}
                      >
                        احجز الآن
                      </button>
                    </div>
                  </>
                )}

                {isBookingMode && (
                  <form className="booking-form" onSubmit={handleSubmitBooking}>
                    {!bookingForm.service_id && (
                      <div className="form-group">
                        <label htmlFor="service_id">معرف الخدمة</label>
                        <input
                          id="service_id"
                          type="number"
                          name="service_id"
                          className="form-control"
                          placeholder="أدخل معرف الخدمة"
                          value={bookingForm.service_id}
                          onChange={handleBookingInputChange}
                          required
                        />
                      </div>
                    )}

                    {!bookingForm.provider_id && (
                      <div className="form-group">
                        <label htmlFor="provider_id">معرف مقدم الخدمة</label>
                        <input
                          id="provider_id"
                          type="number"
                          name="provider_id"
                          className="form-control"
                          placeholder="أدخل معرف مقدم الخدمة"
                          value={bookingForm.provider_id}
                          onChange={handleBookingInputChange}
                          required
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="scheduled_at">موعد الحجز</label>
                      <div className="booking-calendar">
                        <Flatpickr
                          id="scheduled_at"
                          className="form-control"
                          value={selectedBookingDates}
                          options={{
                            inline: true,
                            enableTime: false,
                            dateFormat: "Y-m-d",
                            disableMobile: true,
                            minDate: scheduleRange.from || undefined,
                            maxDate: scheduleRange.to || undefined,
                            enable: enabledBookingDates,
                          }}
                          onChange={(selectedDates) => {
                            const selectedDate = selectedDates?.[0] || null;
                            const dateKey = selectedDate
                              ? toDateKey(selectedDate)
                              : "";

                            setSelectedBookingDates(selectedDates || []);
                            setSelectedBookingDateKey(dateKey);
                            setBookingForm((prev) => ({
                              ...prev,
                              scheduled_at: "",
                            }));
                          }}
                        />
                        {isLoadingSchedule && (
                          <div className="schedule-state">
                            جاري تحميل المواعيد المتاحة...
                          </div>
                        )}
                        {!isLoadingSchedule &&
                          bookingForm.location_id &&
                          bookingSchedule &&
                          enabledBookingDates.length === 0 && (
                            <div className="schedule-state">
                              لا توجد مواعيد متاحة لهذا الموقع خلال الشهر
                              الحالي.
                            </div>
                          )}
                        {!isLoadingSchedule && !bookingForm.location_id && (
                          <div className="schedule-state">
                            اختر الموقع لعرض الأيام والمواعيد المتاحة.
                          </div>
                        )}
                      </div>
                      {selectedBookingDateKey && (
                        <div className="time-slots">
                          <h5>الأوقات المتاحة</h5>
                          {selectedDateSlots.length > 0 ? (
                            <div className="slots-grid">
                              {selectedDateSlots.map((slot) => (
                                <button
                                  type="button"
                                  key={slot.start}
                                  className={
                                    bookingForm.scheduled_at === slot.start
                                      ? "active"
                                      : ""
                                  }
                                  disabled={slot.status !== "available"}
                                  onClick={() =>
                                    setBookingForm((prev) => ({
                                      ...prev,
                                      scheduled_at: slot.start,
                                    }))
                                  }
                                >
                                  {slot.label}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="schedule-state">
                              لا توجد أوقات متاحة لهذا اليوم.
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="pet_id">الحيوان الأليف</label>
                      {isLoadingPets ? (
                        <div className="empty-pets-state">
                          جاري تحميل الحيوانات الأليفة...
                        </div>
                      ) : petOptions.length > 0 ? (
                        <select
                          id="pet_id"
                          name="pet_id"
                          className="form-select"
                          value={bookingForm.pet_id}
                          onChange={handleBookingInputChange}
                          required
                        >
                          <option value="">اختر الحيوان الأليف</option>
                          {petOptions.map((pet) => {
                            if (pet.is_active === false) {
                              return null;
                            }
                            return (
                              <option key={pet.id} value={pet.id}>
                                {pet.name || `#${pet.id}`}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <div className="empty-pets-state">
                          <p>لا يوجد لديك حيوانات أليفة مضافة.</p>
                          {canManagePets && (
                            <button
                              type="button"
                              className="btn add-pet-btn"
                              onClick={() => setShowAddPetModal(true)}
                            >
                              إضافة حيوان أليف
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="location_id">الموقع</label>
                      {isLoadingProviders &&
                      !didLoadProviders &&
                      !locationOptions.length ? (
                        <div className="empty-pets-state">
                          جاري تحميل مواقع مقدم الخدمة...
                        </div>
                      ) : locationOptions.length > 0 ? (
                        <select
                          id="location_id"
                          name="location_id"
                          className="form-select"
                          value={bookingForm.location_id}
                          onChange={handleBookingInputChange}
                          required
                        >
                          <option value="">اختر الموقع</option>
                          {locationOptions.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name ||
                                location.address ||
                                `#${location.id}`}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="empty-pets-state">
                          لا توجد مواقع متاحة لمقدم الخدمة.
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="pet_notes">ملاحظات</label>
                      <textarea
                        id="pet_notes"
                        name="pet_notes"
                        className="form-control"
                        rows={3}
                        placeholder="اكتب ملاحظاتك"
                        value={bookingForm.pet_notes}
                        onChange={handleBookingInputChange}
                      />
                    </div>

                    {addonOptions.length > 0 && (
                      <div className="form-group">
                        <label>الإضافات</label>
                        <div className="addons-list">
                          {addonOptions.map((addon) => (
                            <label
                              key={addon.id}
                              className={`addon-item d-flex align-items-center gap-2 ${bookingForm.addon_ids.includes(Number(addon.id)) ? "selected" : ""}`}
                              onClick={() => handleAddonChange(addon.id)}
                            >
                              {addon?.logo_url && (
                                <div className="img">
                                  <img
                                    src={addon.logo_url}
                                    alt={addon.title || `Addon #${addon.id}`}
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              <div className="info d-flex flex-column align-items-start">
                                <h4>{addon.title}</h4>
                                <p>
                                  {addon?.price_delta}
                                  <SaudiRiyalIcon
                                    width={16}
                                    height={16}
                                    stroke="#7267C3"
                                  />
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="btns booking-actions d-flex align-items-center justify-content-between">
                      <button
                        type="submit"
                        className="btn"
                        disabled={isSubmittingBooking}
                      >
                        {isSubmittingBooking
                          ? "جاري إرسال الحجز..."
                          : "تأكيد الحجز"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setIsBookingMode(false)}
                        disabled={isSubmittingBooking}
                      >
                        رجوع
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Modal
        show={showAddPetModal}
        onHide={() => setShowAddPetModal(false)}
        centered
        dialogClassName="add-pet-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>إضافة حيوان أليف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="add-pet-form" onSubmit={handleCreatePet}>
            <div className="form-group">
              <label htmlFor="pet_name">الاسم</label>
              <input
                id="pet_name"
                type="text"
                name="name"
                className="form-control"
                placeholder="Buddy"
                value={petForm.name}
                onChange={handlePetFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pet_species">النوع</label>
              <select
                id="pet_species"
                name="species"
                className="form-select"
                value={petForm.species}
                onChange={handlePetFormChange}
                required
              >
                <option value="">اختر النوع</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pet_breed">السلالة</label>
              <input
                id="pet_breed"
                type="text"
                name="breed"
                className="form-control"
                placeholder="Golden Retriever"
                value={petForm.breed}
                onChange={handlePetFormChange}
                required
              />
            </div>

            <div className="btns booking-actions d-flex align-items-center justify-content-between">
              <button type="submit" className="btn" disabled={isSubmittingPet}>
                {isSubmittingPet ? "جاري الإضافة..." : "حفظ الحيوان الأليف"}
              </button>
              <button
                type="button"
                className="btn btn-light"
                disabled={isSubmittingPet}
                onClick={() => setShowAddPetModal(false)}
              >
                إلغاء
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductInfo;
