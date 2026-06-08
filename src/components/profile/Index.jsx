import React, { useEffect, useMemo, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import Link from "next/link";
import {
  FiCalendar,
  FiCheckCircle,
  FiClipboard,
  FiEdit2,
  FiEye,
  FiFileText,
  FiPackage,
  FiPlusCircle,
  FiStar,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  cancelBookingApi,
  searchBookingsApi,
  submitBookingReviewApi,
} from "@/api/bookings";
import {
  cancelOrderApi,
  getMyOrdersApi,
  getOrderDetailsApi,
} from "@/api/orders";
import {
  createPetApi,
  deletePetApi,
  getPetOptionsApi,
  searchPetsApi,
  updatePetApi,
} from "@/api/pets";
import { fetchUser } from "@/store/actions";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CallIcon from "./assets/phone.svg";
import ChatIcon from "./assets/chat.svg";
import WhatsAppIcon from "./assets/whatsapp.svg";
import AvatarIcon from "./assets/dog.png";

const normalizeBookingDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const normalizeBookingTime = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getBookingStatusLabel = (status) => {
  const statuses = {
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    completed: "مكتمل",
    cancelled: "ملغي",
    canceled: "ملغي",
  };

  return statuses[status] || status || "قادم";
};

const getOrderStatusLabel = (status) => {
  const statuses = {
    pending: "قيد الانتظار",
    processing: "قيد المعالجة",
    completed: "مكتمل",
    cancelled: "ملغي",
    canceled: "ملغي",
  };

  return statuses[status] || status || "-";
};

const normalizeBookings = (payload) => {
  const list = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return list.map((booking) => ({
    id: booking.id,
    title: booking.service?.title || `موعد #${booking.id}`,
    date: normalizeBookingDate(booking.scheduled_at || booking.scheduled_date),
    time: normalizeBookingTime(booking.scheduled_at),
    status: getBookingStatusLabel(booking.status),
    rawStatus: booking.status,
    reviewed: Boolean(booking.reviewed || booking.review),
    petName: booking.pet?.name || "",
    location:
      booking.location?.address ||
      booking.location?.city ||
      booking.location?.country ||
      "",
    price: booking.total_price ? `${booking.total_price} ر.س` : "",
    paymentStatus: booking.payment_status || "",
    duration: booking.total_duration_minutes || 0,
    addonsCount: Array.isArray(booking.booking_addons)
      ? booking.booking_addons.length
      : 0,
  }));
};

const normalizePets = (payload) => {
  const list = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return list.map((pet, index) => ({
    id: pet?.id || `pet-${index}`,
    name: pet?.name || `حيوان ${index + 1}`,
    species: pet?.species || pet?.type || "",
    breed: pet?.breed || "",
    type: pet?.type || pet?.species || "غير محدد",
    age: pet?.birth_date
      ? normalizeBookingDate(pet.birth_date)
      : pet?.age || pet?.breed || "-",
    gender: pet?.sex || pet?.gender || "غير محدد",
    note: pet?.description || pet?.medical_notes || "",
    isActive: pet?.is_active !== false && pet?.active !== false,
  }));
};

const normalizePetSpeciesOptions = (payload) => {
  const typeOptions = Array.isArray(payload?.data?.type)
    ? payload.data.type
    : Array.isArray(payload?.type)
      ? payload.type
      : [];

  return typeOptions
    .map((option) => ({
      label: option?.label || option?.name || option?.title || option?.value,
      value: option?.value || option?.label || option?.name || option?.title,
    }))
    .filter((option) => option.label && option.value);
};

const normalizeOrders = (payload) => {
  const list = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return {
    list: list.map((order) => ({
      id: order?.id,
      code: order?.code || `ORD-${order?.id}`,
      date: normalizeBookingDate(order?.created_at),
      rawDate: order?.created_at || "",
      total: order?.amount ? `${order.amount} ر.س` : "",
      status: order?.status || "pending",
      rawStatus: order?.status || "pending",
      subTotal: order?.sub_total ? `${order.sub_total} ر.س` : "",
      taxAmount: order?.tax_amount ? `${order.tax_amount} ر.س` : "",
      shippingAmount: order?.shipping_amount
        ? `${order.shipping_amount} ر.س`
        : "",
      discountAmount: order?.discount_amount
        ? `${order.discount_amount} ر.س`
        : "",
      itemCount: Array.isArray(order?.line_items) ? order.line_items.length : 0,
      items: Array.isArray(order?.line_items)
        ? order.line_items.map((item) => ({
            id: item?.id,
            text: `${item?.name || "منتج"}${item?.quantity ? ` × ${item.quantity}` : ""}`,
            quantity: item?.quantity || 0,
            price: item?.unit_price || item?.price || "",
          }))
        : [],
    })),
    meta: payload?.meta || {},
  };
};

const normalizeOrderDetails = (payload) => {
  const order = payload?.data || payload || {};
  const list = Array.isArray(order?.items)
    ? order.items
    : Array.isArray(order?.line_items)
      ? order.line_items
      : [];

  return {
    id: order?.id,
    code: order?.code || `ORD-${order?.id}`,
    status: order?.status || "pending",
    total: order?.amount ? `${order.amount} ر.س` : "",
    subTotal: order?.sub_total ? `${order.sub_total} ر.س` : "",
    taxAmount: order?.tax_amount ? `${order.tax_amount} ر.س` : "",
    shippingAmount: order?.shipping_amount
      ? `${order.shipping_amount} ر.س`
      : "",
    discountAmount: order?.discount_amount
      ? `${order.discount_amount} ر.س`
      : "",
    date: normalizeBookingDate(order?.created_at),
    storeName: order?.store?.name || "",
    isConfirmed: Boolean(order?.is_confirmed),
    isFinished: Boolean(order?.is_finished),
    items: list.map((item) => ({
      id: item?.id,
      text: `${item?.name || "منتج"}${item?.quantity ? ` × ${item.quantity}` : ""}`,
      price: item?.unit_price || item?.price || "",
    })),
  };
};

const getUserLocation = (user) => {
  const parts = [user?.city, user?.state, user?.country].filter(Boolean);
  return parts.length > 0 ? parts.join(" - ") : "";
};

const toHrefPhone = (value) => {
  if (!value) {
    return "";
  }

  return value.replace(/[^\d+]/g, "");
};

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = parseCookies()?.token;
  const { user } = useSelector((state) => state.auth || {});
  const [pets, setPets] = useState([]);
  const [editingPetId, setEditingPetId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLastPage, setOrdersLastPage] = useState(1);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isLoadingOrderDetails, setIsLoadingOrderDetails] = useState(false);
  const [orderDetailsError, setOrderDetailsError] = useState("");
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);
  const [cancelOrderReason, setCancelOrderReason] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [cancellingBookingId, setCancellingBookingId] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewBookingId, setReviewBookingId] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isLoadingPets, setIsLoadingPets] = useState(false);
  const [petsError, setPetsError] = useState("");
  const [petFormMode, setPetFormMode] = useState("create");
  const [petFormId, setPetFormId] = useState(null);
  const [petForm, setPetForm] = useState({
    name: "",
    species: "",
    breed: "",
  });
  const [isSubmittingPet, setIsSubmittingPet] = useState(false);
  const [deletingPetId, setDeletingPetId] = useState(null);
  const [isPetFormVisible, setIsPetFormVisible] = useState(false);
  const [petSpeciesOptions, setPetSpeciesOptions] = useState([]);

  const userName =
    user?.name || user?.full_name || user?.username || "المستخدم";
  const userLocation = getUserLocation(user);
  const userEmail = user?.email || "";
  const userPhone = user?.phone || user?.mobile || user?.phone_number || "";
  const telValue = toHrefPhone(userPhone);

  const stats = useMemo(
    () => [
      {
        label: "حيواناتي الأليفة",
        value: pets.filter((pet) => pet.isActive).length,
        caption: "كل شيء صحي",
        icon: <IoPawOutline />,
      },
      {
        label: "المواعيد",
        value: bookings.filter(
          (booking) =>
            booking.rawStatus !== "cancelled" &&
            booking.rawStatus !== "canceled",
        ).length,
        caption: "هذا الشهر",
        icon: <FiCalendar />,
      },
      {
        label: "الطلبات",
        value: ordersTotal || orders.length,
        caption: "مكتمل",
        icon: <FiFileText />,
      },
    ],
    [bookings, orders.length, ordersTotal, pets.length],
  );

  const selectedOrder = orders.find(
    (order) => String(order.id) === String(selectedOrderId),
  );

  const totalOrderPages = ordersLastPage || 1;
  const canGoPreviousOrdersPage = ordersPage > 1;
  const canGoNextOrdersPage = ordersPage < totalOrderPages;

  const resetPetForm = () => {
    setPetFormMode("create");
    setPetFormId(null);
    setEditingPetId(null);
    setPetForm({
      name: "",
      species: "",
      breed: "",
    });
  };

  const closePetForm = () => {
    resetPetForm();
    setIsPetFormVisible(false);
  };

  const loadPets = async () => {
    if (!token) {
      setPets([]);
      setPetsError("");
      return;
    }

    setIsLoadingPets(true);
    setPetsError("");

    try {
      const { data } = await searchPetsApi({
        cookies: parseCookies(),
        search: {},
      });

      setPets(normalizePets(data));
    } catch (error) {
      setPetsError(
        error?.response?.data?.message || "تعذر تحميل الحيوانات الأليفة",
      );
    } finally {
      setIsLoadingPets(false);
    }
  };

  const loadPetOptions = async () => {
    if (!token) {
      setPetSpeciesOptions([]);
      return;
    }

    try {
      const { data } = await getPetOptionsApi({
        cookies: parseCookies(),
      });

      const normalizedSpecies = normalizePetSpeciesOptions(data);
      setPetSpeciesOptions(normalizedSpecies);
    } catch (error) {
      setPetSpeciesOptions([]);
    }
  };

  const loadBookings = async () => {
    setIsLoadingBookings(true);
    setBookingsError("");

    try {
      const { data } = await searchBookingsApi({
        search: {
          limit: 20,
          page: 1,
        },
      });

      setBookings(normalizeBookings(data));
    } catch (error) {
      setBookingsError(error?.response?.data?.message || "تعذر تحميل المواعيد");
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const loadOrders = async (page = ordersPage) => {
    if (!token) {
      setOrders([]);
      setOrdersError("");
      setOrdersTotal(0);
      setOrdersPage(1);
      setOrdersLastPage(1);
      setSelectedOrderId(null);
      return;
    }

    setIsLoadingOrders(true);
    setOrdersError("");

    try {
      const { data } = await getMyOrdersApi({
        cookies: parseCookies(),
        limit: 5,
        page,
      });

      const normalized = normalizeOrders(data);
      setOrders(normalized.list);
      setOrdersTotal(normalized.meta?.total || normalized.list.length || 0);
      setOrdersPage(normalized.meta?.current_page || page);
      setOrdersLastPage(normalized.meta?.last_page || 1);
      setSelectedOrderId((currentId) => {
        const hasCurrent = normalized.list.some(
          (order) => String(order.id) === String(currentId),
        );

        if (hasCurrent) {
          return currentId;
        }

        return normalized.list[0]?.id || null;
      });
    } catch (error) {
      setOrdersError(error?.response?.data?.message || "تعذر تحميل الطلبات");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const loadOrderDetails = async (orderId) => {
    if (!token || !orderId) {
      setSelectedOrderDetails(null);
      setOrderDetailsError("");
      return;
    }

    setIsLoadingOrderDetails(true);
    setOrderDetailsError("");

    try {
      const { data } = await getOrderDetailsApi({
        cookies: parseCookies(),
        orderId,
      });

      setSelectedOrderDetails(normalizeOrderDetails(data));
    } catch (error) {
      setOrderDetailsError(
        error?.response?.data?.message || "تعذر تحميل تفاصيل الطلب",
      );
      setSelectedOrderDetails(null);
    } finally {
      setIsLoadingOrderDetails(false);
    }
  };

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUser(parseCookies()));
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    const loadPetsOnMount = async () => {
      await loadPets();
    };

    loadPetsOnMount();
  }, [token]);

  useEffect(() => {
    loadPetOptions();
  }, [token]);

  useEffect(() => {
    const loadOrdersOnMount = async () => {
      await loadOrders(1);
    };

    loadOrdersOnMount();
  }, [token]);

  useEffect(() => {
    if (!selectedOrderId) {
      setSelectedOrderDetails(null);
      setOrderDetailsError("");
      return;
    }

    loadOrderDetails(selectedOrderId);
  }, [selectedOrderId, token]);

  useEffect(() => {
    loadBookings();
  }, []);

  const addPet = () => {
    resetPetForm();
    setIsPetFormVisible(true);
  };

  const handleEditPet = (petId) => {
    const selectedPet = pets.find((pet) => pet.id === petId);
    if (!selectedPet) {
      return;
    }

    setPetFormMode("update");
    setPetFormId(petId);
    setPetForm({
      name: selectedPet.name || "",
      species: selectedPet.species || selectedPet.type || "",
      breed: selectedPet.breed || "",
    });
    setEditingPetId(petId);
    setIsPetFormVisible(true);
  };

  const handlePetFormChange = (event) => {
    const { name, value } = event.target;
    setPetForm((current) => ({
      ...current,
      [name]: name === "species" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmitPet = async (event) => {
    event.preventDefault();

    if (!petForm.name || !petForm.species || !petForm.breed) {
      toast.error("يرجى تعبئة الاسم والنوع والسلالة");
      return;
    }

    setIsSubmittingPet(true);

    try {
      const attributes = {
        name: petForm.name,
        species: petForm.species.toLowerCase(),
        breed: petForm.breed,
      };

      if (petFormMode === "update" && petFormId) {
        await updatePetApi({
          cookies: parseCookies(),
          key: petFormId,
          attributes,
        });
        toast.success("تم تحديث الحيوان الأليف بنجاح");
      } else {
        await createPetApi({
          cookies: parseCookies(),
          attributes,
        });
        toast.success("تمت إضافة الحيوان الأليف بنجاح");
      }

      await loadPets();
      closePetForm();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "تعذر حفظ بيانات الحيوان الأليف",
      );
    } finally {
      setIsSubmittingPet(false);
    }
  };

  const handleDeletePet = async (petId) => {
    const normalizedPetId = Number(petId);

    if (!Number.isFinite(normalizedPetId)) {
      toast.error("لا يمكن حذف هذا الحيوان لأن معرفه غير صالح");
      return;
    }

    const result = await Swal.fire({
      title: "تأكيد الحذف",
      text: "هل أنت متأكد من حذف هذا الحيوان الأليف؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) {
      return;
    }

    setDeletingPetId(normalizedPetId);

    try {
      await deletePetApi({
        cookies: parseCookies(),
        resources: [normalizedPetId],
      });

      if (petFormMode === "update" && Number(petFormId) === normalizedPetId) {
        closePetForm();
      }

      await loadPets();
      toast.success("تم حذف الحيوان الأليف بنجاح");
    } catch (error) {
      toast.error(error?.response?.data?.message || "تعذر حذف الحيوان الأليف");
    } finally {
      setDeletingPetId(null);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "تأكيد إلغاء الموعد",
      text: "هل أنت متأكد من إلغاء هذا الموعد؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "إلغاء الموعد",
      cancelButtonText: "رجوع",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) {
      return;
    }

    setCancellingBookingId(bookingId);

    try {
      await cancelBookingApi({
        bookingId,
        cookies: parseCookies(),
      });
      await loadBookings();
      toast.success("تم إلغاء الموعد بنجاح");
    } catch (error) {
      toast.error(error?.response?.data?.message || "تعذر إلغاء الموعد");
    } finally {
      setCancellingBookingId(null);
    }
  };

  const handleCancelOrder = async () => {
    const activeOrder = selectedOrderDetails || selectedOrder;

    if (!activeOrder?.id) {
      return;
    }

    setCancelOrderReason("");
    setIsCancelOrderModalOpen(true);
  };

  const handleBookAppointment = () => {
    router.push("/services");
  };

  const handleShopNow = () => {
    router.push("/shop");
  };

  const quickActions = [
    { label: "إضافة حيوان أليف", icon: <FiPlusCircle />, onClick: addPet },
    {
      label: "احجز موعد",
      icon: <FiCalendar />,
      onClick: handleBookAppointment,
    },
    { label: "اطلب", icon: <FiClipboard />, onClick: handleShopNow },
  ];

  const handleCloseCancelOrderModal = () => {
    if (isCancellingOrder) {
      return;
    }

    setIsCancelOrderModalOpen(false);
    setCancelOrderReason("");
  };

  const handleSubmitCancelOrder = async (event) => {
    event.preventDefault();

    const activeOrder = selectedOrderDetails || selectedOrder;

    if (!activeOrder?.id) {
      return;
    }

    const reason = cancelOrderReason.trim();

    if (!reason) {
      toast.error("سبب الإلغاء مطلوب");
      return;
    }

    setIsCancellingOrder(true);

    try {
      await cancelOrderApi({
        cookies: parseCookies(),
        orderId: activeOrder.id,
        reason,
      });

      toast.success("تم إلغاء الطلب بنجاح");
      handleCloseCancelOrderModal();
      await loadOrders();
      await loadOrderDetails(activeOrder.id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "تعذر إلغاء الطلب");
    } finally {
      setIsCancellingOrder(false);
    }
  };

  const handleOpenOrderDetailsModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsOrderDetailsModalOpen(true);
  };

  const handleOrdersPageChange = async (nextPage) => {
    if (nextPage < 1 || nextPage > totalOrderPages || nextPage === ordersPage) {
      return;
    }

    await loadOrders(nextPage);
  };

  const handleCloseOrderDetailsModal = () => {
    if (isCancellingOrder) {
      return;
    }

    setIsOrderDetailsModalOpen(false);
  };

  const handleReviewBooking = (bookingId) => {
    setReviewBookingId(bookingId);
    setReviewForm({
      rating: 5,
      comment: "",
    });
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    if (isSubmittingReview) {
      return;
    }

    setIsReviewModalOpen(false);
    setReviewBookingId(null);
    setReviewForm({
      rating: 5,
      comment: "",
    });
  };

  const handleReviewFormChange = (event) => {
    const { name, value } = event.target;

    setReviewForm((current) => ({
      ...current,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    if (!reviewBookingId) {
      return;
    }

    if (!reviewForm.rating || reviewForm.rating < 1 || reviewForm.rating > 5) {
      toast.error("التقييم يجب أن يكون من 1 إلى 5");
      return;
    }

    setIsSubmittingReview(true);

    try {
      await submitBookingReviewApi({
        bookingId: reviewBookingId,
        cookies: parseCookies(),
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });

      toast.success("تم إرسال التقييم بنجاح");
      handleCloseReviewModal();
      await loadBookings();
    } catch (error) {
      toast.error(error?.response?.data?.message || "تعذر إرسال التقييم");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const modalOrder = selectedOrderDetails || selectedOrder;
  const modalOrderStatus = modalOrder?.status || "";
  const modalOrderItems = modalOrder?.items || [];
  const orderPageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, ordersPage - 2);
    let end = Math.min(totalOrderPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    return pages;
  }, [ordersPage, totalOrderPages]);

  return (
    <div className={styles["profile-section"]}>
      <Container>
        <div className="author-wrap d-flex align-items-start gap-3 justify-content-between">
          <div className="author d-flex align-items-center gap-3">
            <div className="img">
              <Image src={AvatarIcon} alt="author" width={110} height={110} />
            </div>
            <div className="info">
              <h3>{userName}</h3>
              <p>{userLocation || "-"}</p>
            </div>
          </div>
          <div className="action-btns d-flex align-items-center gap-4">
            <div className="icons d-flex align-items-center gap-2">
              <Link href={telValue ? `tel:${telValue}` : "#"}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <CallIcon />
                </a>
              </Link>
              <Link href={userEmail ? `mailto:${userEmail}` : "#"}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <ChatIcon />
                </a>
              </Link>
              <Link href={telValue ? `https://wa.me/${telValue}` : "#"}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <WhatsAppIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="profile-dashboard" dir="rtl">
          <div className="dashboard-stats">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span className="stat-icon">{stat.icon}</span>
                <div>
                  <h3>{stat.label}</h3>
                  <strong>{stat.value}</strong>
                  <p>{stat.caption}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 
          <section className="quick-actions">
            <div className="section-head">
              <h2>إجراءات سريعة</h2>
            </div>
            <div className="quick-actions-list">
              {quickActions.map((action) => (
                <button
                  type="button"
                  key={action.label}
                  onClick={action.onClick}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </section> */}

          <section className="pets-panel">
            <div className="section-head">
              <h2>حيواناتي الأليفة</h2>
              <button type="button" onClick={addPet}>
                <FiPlusCircle />
                حيوان جديد
              </button>
            </div>
            {isPetFormVisible && (
              <div className="pet-form-card mb-3">
                <h3>
                  {petFormMode === "update"
                    ? "تحديث بيانات الحيوان"
                    : "إضافة حيوان أليف"}
                </h3>
                <form className="pet-form" onSubmit={handleSubmitPet}>
                  <div className="pet-form-grid">
                    <div className="field">
                      <label htmlFor="pet-name">اسم الحيوان</label>
                      <input
                        id="pet-name"
                        className="pet-input"
                        type="text"
                        name="name"
                        value={petForm.name}
                        onChange={handlePetFormChange}
                        placeholder="مثال: لولو"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="pet-species">النوع</label>
                      <select
                        id="pet-species"
                        className="pet-input is-select"
                        name="species"
                        value={petForm.species}
                        onChange={handlePetFormChange}
                        required
                      >
                        <option value="">اختر النوع</option>
                        {petSpeciesOptions.length > 0
                          ? petSpeciesOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))
                          : [
                              { label: "كلب", value: "dog" },
                              { label: "قط", value: "cat" },
                            ].map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="field field-full">
                      <label htmlFor="pet-breed">السلالة</label>
                      <input
                        id="pet-breed"
                        className="pet-input"
                        type="text"
                        name="breed"
                        value={petForm.breed}
                        onChange={handlePetFormChange}
                        placeholder="مثال: Golden Retriever"
                        required
                      />
                    </div>
                  </div>
                  <div className="pet-form-actions">
                    <button type="submit" disabled={isSubmittingPet}>
                      {isSubmittingPet
                        ? "جاري الحفظ..."
                        : petFormMode === "update"
                          ? "تحديث"
                          : "إضافة"}
                    </button>
                    <button
                      className="is-secondary"
                      type="button"
                      onClick={closePetForm}
                    >
                      {petFormMode === "update" ? "إلغاء التعديل" : "إغلاق"}
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="pets-list">
              {isLoadingPets && (
                <div className="booking-state">
                  جاري تحميل الحيوانات الأليفة...
                </div>
              )}
              {!isLoadingPets && petsError && (
                <div className="booking-state">{petsError}</div>
              )}
              {!isLoadingPets && !petsError && pets.length === 0 && (
                <div className="booking-state">
                  لا توجد حيوانات أليفة حتى الآن
                </div>
              )}
              {pets.map((pet) => (
                <article
                  className={`pet-card ${
                    editingPetId === pet.id ? "is-editing" : ""
                  } ${pet.isActive ? "is-active" : "is-inactive"}`}
                  key={pet.id}
                >
                  <div className="pet-avatar">
                    <IoPawOutline />
                  </div>
                  <div className="pet-info">
                    <h3>{pet.name}</h3>
                    <p>
                      {pet.type} • {pet.age} • {pet.gender}
                    </p>
                    <span
                      className={`pet-status ${pet.isActive ? "is-active" : "is-inactive"}`}
                    >
                      {pet.isActive ? "نشط" : "غير نشط"}
                    </span>
                    <span>{pet.note}</span>
                  </div>
                  <div className="pet-actions">
                    {pet.isActive && (
                      <>
                        <button
                          type="button"
                          aria-label="تعديل الحيوان"
                          onClick={() => handleEditPet(pet.id)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          aria-label="حذف الحيوان"
                          onClick={() => handleDeletePet(pet.id)}
                          disabled={deletingPetId === pet.id}
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="orders-panel">
            <div className="section-head">
              <h2>الطلبات</h2>
            </div>
            <div className="orders-layout">
              <div className="orders-list">
                {isLoadingOrders && (
                  <div className="booking-state">جاري تحميل الطلبات...</div>
                )}
                {!isLoadingOrders && ordersError && (
                  <div className="booking-state">{ordersError}</div>
                )}
                {!isLoadingOrders && !ordersError && orders.length === 0 && (
                  <div className="booking-state">لا توجد طلبات حتى الآن</div>
                )}
                {orders.map((order) => (
                  <button
                    className={`order-card ${
                      selectedOrderId === order.id ? "is-active" : ""
                    }`}
                    type="button"
                    key={order.id}
                    onClick={() => handleOpenOrderDetailsModal(order.id)}
                  >
                    <div className="order-card-main">
                      <div className="order-card-head">
                        <strong>{order.code}</strong>
                        <span
                          className={`status-badge is-${String(order.rawStatus || "pending").toLowerCase()}`}
                        >
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </div>
                      <p>{order.date}</p>
                      <div className="order-meta-inline">
                        <span>عدد المنتجات: {order.itemCount || 0}</span>
                        <span>المجموع: {order.total || "-"}</span>
                      </div>
                    </div>
                    <span className="order-preview-icon" aria-hidden="true">
                      <FiEye />
                    </span>
                  </button>
                ))}
                {!isLoadingOrders && !ordersError && totalOrderPages > 1 && (
                  <div
                    className="orders-pagination"
                    role="navigation"
                    aria-label="Pagination"
                  >
                    <button
                      type="button"
                      className="page-btn"
                      onClick={() => handleOrdersPageChange(ordersPage - 1)}
                      disabled={!canGoPreviousOrdersPage}
                    >
                      السابق
                    </button>

                    {orderPageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        className={`page-btn ${ordersPage === pageNumber ? "is-active" : ""}`}
                        onClick={() => handleOrdersPageChange(pageNumber)}
                        aria-current={
                          ordersPage === pageNumber ? "page" : undefined
                        }
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      type="button"
                      className="page-btn"
                      onClick={() => handleOrdersPageChange(ordersPage + 1)}
                      disabled={!canGoNextOrdersPage}
                    >
                      التالي
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className={`${styles["bookings-panel"]} bookings-panel`}>
            <div className="section-head">
              <h2>المواعيد القادمة</h2>
            </div>
            <div className={`${styles["bookings-list"]} bookings-list`}>
              {isLoadingBookings && (
                <div className={`${styles["booking-state"]} booking-state`}>
                  جاري تحميل المواعيد...
                </div>
              )}
              {!isLoadingBookings && bookingsError && (
                <div className={`${styles["booking-state"]} booking-state`}>
                  {bookingsError}
                </div>
              )}
              {!isLoadingBookings &&
                !bookingsError &&
                bookings.length === 0 && (
                  <div className={`${styles["booking-state"]} booking-state`}>
                    لا توجد مواعيد حتى الآن
                  </div>
                )}
              {!isLoadingBookings &&
                !bookingsError &&
                bookings.map((booking) => (
                  <article
                    className={`${styles["booking-card"]} booking-card ${
                      booking.rawStatus === "cancelled" ||
                      booking.rawStatus === "canceled"
                        ? `${styles["is-cancelled"] || ""} is-cancelled`
                        : ""
                    }`}
                    key={booking.id}
                  >
                    <div className={`${styles["booking-icon"]} booking-icon`}>
                      <FiCalendar />
                    </div>
                    <div className={`${styles["booking-title"]} booking-title`}>
                      <h3>{booking.title}</h3>
                      <span>
                        {booking.status}
                        {booking.petName ? ` • ${booking.petName}` : ""}
                      </span>
                      {(booking.location || booking.price) && (
                        <span>
                          {booking.location ? booking.location : ""}
                          {booking.location && booking.price ? " • " : ""}
                          {booking.price ? booking.price : ""}
                        </span>
                      )}
                      {(booking.paymentStatus || booking.duration) && (
                        <span>
                          {booking.paymentStatus
                            ? `الدفع: ${booking.paymentStatus}`
                            : ""}
                          {booking.paymentStatus && booking.duration
                            ? " • "
                            : ""}
                          {booking.duration
                            ? `المدة: ${booking.duration} دقيقة`
                            : ""}
                          {booking.addonsCount > 0
                            ? ` • إضافات: ${booking.addonsCount}`
                            : ""}
                        </span>
                      )}
                    </div>
                    <div className={`${styles["booking-date"]} booking-date`}>
                      <span>{booking.date}</span>
                      <strong>{booking.time}</strong>
                    </div>
                    <div
                      className={`${styles["booking-actions"]} booking-actions`}
                    >
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={
                          cancellingBookingId === booking.id ||
                          booking.rawStatus === "cancelled" ||
                          booking.rawStatus === "canceled"
                        }
                      >
                        <FiXCircle />
                        إلغاء
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReviewBooking(booking.id)}
                        disabled={
                          booking.reviewed ||
                          booking.rawStatus === "cancelled" ||
                          booking.rawStatus === "canceled"
                        }
                      >
                        {booking.reviewed ? <FiCheckCircle /> : <FiStar />}
                        {booking.reviewed ? "تم التقييم" : "تقييم"}
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </div>
        <Modal
          dialogClassName={styles["order-details-modal-dialog"]}
          contentClassName={styles["order-details-modal-content"]}
          centered
          show={isOrderDetailsModalOpen}
          onHide={handleCloseOrderDetailsModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div className={styles["order-details-panel"]}>
                <div className={styles["order-head"]}>
                  <span className={styles["details-icon"]}>
                    <FiPackage />
                  </span>
                  <div className={styles["head-text"]}>
                    <h3>{modalOrder?.code || "-"}</h3>
                    <p>{modalOrder?.date || "-"}</p>
                  </div>
                  <span
                    className={`${styles["status-badge"]} ${styles[`is-${String(modalOrderStatus || "pending").toLowerCase()}`] || ""}`}
                  >
                    {getOrderStatusLabel(modalOrderStatus)}
                  </span>
                </div>

                <div className={styles["order-total-card"]}>
                  <small>الإجمالي النهائي</small>
                  <strong>{modalOrder?.total || "-"}</strong>
                </div>

                {isLoadingOrderDetails && <p>جاري تحميل تفاصيل الطلب...</p>}
                {!isLoadingOrderDetails && orderDetailsError && (
                  <p>{orderDetailsError}</p>
                )}

                {!isLoadingOrderDetails && !orderDetailsError && (
                  <>
                    <div className={styles["order-meta-grid"]}>
                      {modalOrder?.storeName && (
                        <div className={styles["meta-item"]}>
                          <span>المتجر</span>
                          <strong>{modalOrder.storeName}</strong>
                        </div>
                      )}
                      {(modalOrder?.subTotal || selectedOrder?.subTotal) && (
                        <div className={styles["meta-item"]}>
                          <span>الإجمالي الفرعي</span>
                          <strong>
                            {modalOrder?.subTotal || selectedOrder?.subTotal}
                          </strong>
                        </div>
                      )}
                      {(modalOrder?.taxAmount || selectedOrder?.taxAmount) && (
                        <div className={styles["meta-item"]}>
                          <span>الضريبة</span>
                          <strong>
                            {modalOrder?.taxAmount || selectedOrder?.taxAmount}
                          </strong>
                        </div>
                      )}
                      {modalOrder?.shippingAmount && (
                        <div className={styles["meta-item"]}>
                          <span>الشحن</span>
                          <strong>{modalOrder.shippingAmount}</strong>
                        </div>
                      )}
                      {modalOrder?.discountAmount && (
                        <div className={styles["meta-item"]}>
                          <span>الخصم</span>
                          <strong>{modalOrder.discountAmount}</strong>
                        </div>
                      )}
                      {selectedOrderDetails && (
                        <div className={styles["meta-item"]}>
                          <span>الحالة</span>
                          <strong>
                            {selectedOrderDetails.isConfirmed
                              ? "مؤكد"
                              : "غير مؤكد"}{" "}
                            •{" "}
                            {selectedOrderDetails.isFinished
                              ? "منتهي"
                              : "قيد التنفيذ"}
                          </strong>
                        </div>
                      )}
                    </div>

                    <div className={styles["order-items-block"]}>
                      <h4>عناصر الطلب</h4>
                      <ul>
                        {modalOrderItems.map((item) => (
                          <li key={item.id || item.text}>
                            <span>{item.text}</span>
                            <em>{item.price ? `${item.price} ر.س` : "-"}</em>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div className={styles["order-actions"]}>
                  <button
                    type="button"
                    onClick={handleCancelOrder}
                    disabled={
                      isCancellingOrder || modalOrderStatus !== "pending"
                    }
                  >
                    {isCancellingOrder ? "جاري الإلغاء..." : "إلغاء الطلب"}
                  </button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
        <Modal
          dialogClassName={styles["cancel-order-modal-dialog"]}
          contentClassName={styles["cancel-order-modal-content"]}
          centered
          show={isCancelOrderModalOpen}
          onHide={handleCloseCancelOrderModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>إلغاء الطلب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className={styles["cancel-order-form"]}
              onSubmit={handleSubmitCancelOrder}
            >
              <div className={styles["cancel-order-field"]}>
                <label htmlFor="cancel-order-reason">سبب الإلغاء</label>
                <textarea
                  id="cancel-order-reason"
                  value={cancelOrderReason}
                  onChange={(event) => setCancelOrderReason(event.target.value)}
                  placeholder="اكتب سبب إلغاء الطلب"
                  rows={4}
                  autoFocus
                />
              </div>
              <div className={styles["cancel-order-actions"]}>
                <button
                  type="button"
                  className={styles["cancel-order-secondary"]}
                  onClick={handleCloseCancelOrderModal}
                  disabled={isCancellingOrder}
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  className={styles["cancel-order-primary"]}
                  disabled={isCancellingOrder}
                >
                  {isCancellingOrder ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal
          dialogClassName={styles["review-modal-dialog"]}
          contentClassName={styles["review-modal-content"]}
          centered
          show={isReviewModalOpen}
          onHide={handleCloseReviewModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>تقييم الموعد</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className={styles["review-form"]}
              onSubmit={handleSubmitReview}
            >
              <div className={styles["review-field"]}>
                <label htmlFor="booking-review-rating">التقييم</label>
                <input
                  id="booking-review-rating"
                  className={styles["review-rating-input"]}
                  type="number"
                  min={1}
                  max={5}
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewFormChange}
                  readOnly
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <div
                  className={styles["review-stars"]}
                  role="radiogroup"
                  aria-label="اختر التقييم"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles["review-star"]} ${reviewForm.rating >= value ? styles["is-active"] : ""}`}
                      onClick={() =>
                        setReviewForm((current) => ({
                          ...current,
                          rating: value,
                        }))
                      }
                      disabled={isSubmittingReview}
                      role="radio"
                      aria-checked={reviewForm.rating === value}
                      aria-label={`${value} ${value === 1 ? "نجمة" : "نجوم"}`}
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles["review-field"]}>
                <label htmlFor="booking-review-comment">تعليق</label>
                <textarea
                  id="booking-review-comment"
                  name="comment"
                  rows={4}
                  value={reviewForm.comment}
                  onChange={handleReviewFormChange}
                  placeholder="اكتب تعليقك على الخدمة"
                />
              </div>
              <div className={styles["review-actions"]}>
                <button
                  className={styles["review-cancel"]}
                  type="button"
                  onClick={handleCloseReviewModal}
                  disabled={isSubmittingReview}
                >
                  إلغاء
                </button>
                <button
                  className={styles["review-submit"]}
                  type="submit"
                  disabled={isSubmittingReview}
                >
                  {isSubmittingReview ? "جاري الإرسال..." : "إرسال التقييم"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Index;
