import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";
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

import { searchBookingsApi } from "@/api/bookings";
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
    location: booking.location?.address || booking.location?.country || "",
    price: booking.total_price,
  }));
};

const Index = () => {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "لولو",
      type: "كلب",
      age: "3 سنوات",
      gender: "ذكر",
      note: "مطعم وجاهز للفحص الدوري",
    },
    {
      id: 2,
      name: "مشمش",
      type: "قط",
      age: "سنة واحدة",
      gender: "أنثى",
      note: "تحتاج متابعة تنظيف الأسنان",
    },
  ]);
  const [editingPetId, setEditingPetId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState("00245");
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState("");

  const orders = useMemo(
    () => [
      {
        id: "00245",
        date: "11 november 2025",
        total: "$250.00",
        status: "مكتمل",
        items: ["طعام طبيعي للكلاب", "لعبة تفاعلية"],
      },
      {
        id: "00246",
        date: "13 november 2025",
        total: "$180.00",
        status: "قيد التجهيز",
        items: ["سرير مريح للحيوانات"],
      },
      {
        id: "00247",
        date: "15 november 2025",
        total: "$95.00",
        status: "مكتمل",
        items: ["استشارة بيطرية"],
      },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      {
        label: "حيواناتي الأليفة",
        value: pets.length,
        caption: "كل شيء صحي",
        icon: <IoPawOutline />,
      },
      {
        label: "المواعيد",
        value: bookings.filter(
          (booking) =>
            booking.rawStatus !== "cancelled" && booking.rawStatus !== "canceled",
        ).length,
        caption: "هذا الشهر",
        icon: <FiCalendar />,
      },
      {
        label: "الطلبات",
        value: 12,
        caption: "مكتمل",
        icon: <FiFileText />,
      },
    ],
    [bookings, pets.length],
  );

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      setIsLoadingBookings(true);
      setBookingsError("");

      try {
        const { data } = await searchBookingsApi({
          limit: 20,
          page: 1,
        });

        if (isMounted) {
          setBookings(normalizeBookings(data));
        }
      } catch (error) {
        if (isMounted) {
          setBookingsError(
            error?.response?.data?.message || "تعذر تحميل المواعيد",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingBookings(false);
        }
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  const addPet = () => {
    const nextId = Date.now();
    setPets((currentPets) => [
      ...currentPets,
      {
        id: nextId,
        name: `حيوان ${currentPets.length + 1}`,
        type: "قط",
        age: "جديد",
        gender: "غير محدد",
        note: "أضف بيانات الحيوان الأليف",
      },
    ]);
    setEditingPetId(nextId);
  };

  const quickActions = [
    { label: "إضافة حيوان أليف", icon: <FiPlusCircle />, onClick: addPet },
    { label: "احجز موعد", icon: <FiCalendar /> },
    { label: "اطلب", icon: <FiClipboard /> },
  ];

  const handleEditPet = (petId) => {
    setPets((currentPets) =>
      currentPets.map((pet) =>
        pet.id === petId
          ? {
              ...pet,
              name: pet.name.endsWith(" (معدل)")
                ? pet.name
                : `${pet.name} (معدل)`,
            }
          : pet,
      ),
    );
    setEditingPetId(petId);
  };

  const handleDeletePet = (petId) => {
    setPets((currentPets) => currentPets.filter((pet) => pet.id !== petId));
    if (editingPetId === petId) {
      setEditingPetId(null);
    }
  };

  const handleCancelBooking = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "ملغي", rawStatus: "cancelled" }
          : booking,
      ),
    );
  };

  const handleReviewBooking = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, reviewed: true } : booking,
      ),
    );
  };

  return (
    <div className={styles["profile-section"]}>
      <Container>
        <div className="author-wrap d-flex align-items-start gap-3 justify-content-between">
          <div className="author d-flex align-items-center gap-3">
            <div className="img">
              <Image src={AvatarIcon} alt="author" width={110} height={110} />
            </div>
            <div className="info">
              <h3>Pet Vet Clinic Services</h3>
              <p>الرياض - المملكة العربية السعودية</p>
              <div className="rating d-flex align-items-center gap-4">
                15 تقييم
                <div className="stars d-flex align-items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      <GoStarFill color="#000" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="action-btns d-flex align-items-center gap-4">
            <Link href="/profile">
              <a className="btn">زيارة الموقع</a>
            </Link>
            <div className="icons d-flex align-items-center gap-2">
              <Link href="tel:+966555555555">
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <CallIcon />
                </a>
              </Link>
              <Link href="mailto:mail@info.com">
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <ChatIcon />
                </a>
              </Link>
              <Link href="https://wa.me/966555555555">
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <WhatsAppIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="description">
          <h1>هذا النص هو مثال لنص</h1>
          <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
            هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو
            العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها
            التطبيق.
          </p>
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
          </section>

          <section className="pets-panel">
            <div className="section-head">
              <h2>حيواناتي الأليفة</h2>
              <button type="button" onClick={addPet}>
                <FiPlusCircle />
                إضافة
              </button>
            </div>
            <div className="pets-list">
              {pets.map((pet) => (
                <article
                  className={`pet-card ${
                    editingPetId === pet.id ? "is-editing" : ""
                  }`}
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
                    <span>{pet.note}</span>
                  </div>
                  <div className="pet-actions">
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
                    >
                      <FiTrash2 />
                    </button>
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
                {orders.map((order) => (
                  <button
                    className={`order-card ${
                      selectedOrderId === order.id ? "is-active" : ""
                    }`}
                    type="button"
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <span>{order.date}</span>
                    <strong>ORDER #{order.id}</strong>
                    <em>{order.total}</em>
                    <small>المجموع</small>
                    <FiEye />
                  </button>
                ))}
              </div>
              {selectedOrder && (
                <aside className="order-details">
                  <span className="details-icon">
                    <FiPackage />
                  </span>
                  <h3>ORDER #{selectedOrder.id}</h3>
                  <p>{selectedOrder.status}</p>
                  <strong>{selectedOrder.total}</strong>
                  <ul>
                    {selectedOrder.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </section>

          <section className="bookings-panel">
            <div className="section-head">
              <h2>المواعيد القادمة</h2>
              <button type="button">عرض الكل</button>
            </div>
            <div className="bookings-list">
              {isLoadingBookings && (
                <div className="booking-state">جاري تحميل المواعيد...</div>
              )}
              {!isLoadingBookings && bookingsError && (
                <div className="booking-state">{bookingsError}</div>
              )}
              {!isLoadingBookings && !bookingsError && bookings.length === 0 && (
                <div className="booking-state">لا توجد مواعيد حتى الآن</div>
              )}
              {!isLoadingBookings &&
                !bookingsError &&
                bookings.map((booking) => (
                  <article
                    className={`booking-card ${
                      booking.rawStatus === "cancelled" ||
                      booking.rawStatus === "canceled"
                        ? "is-cancelled"
                        : ""
                    }`}
                    key={booking.id}
                  >
                    <div className="booking-icon">
                      <FiCalendar />
                    </div>
                    <div className="booking-title">
                      <h3>{booking.title}</h3>
                      <span>
                        {booking.status}
                        {booking.petName ? ` • ${booking.petName}` : ""}
                      </span>
                    </div>
                    <div className="booking-date">
                      <span>{booking.date}</span>
                      <strong>{booking.time}</strong>
                    </div>
                    <div className="booking-actions">
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={
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
                        disabled={booking.reviewed}
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
      </Container>
    </div>
  );
};

export default Index;
