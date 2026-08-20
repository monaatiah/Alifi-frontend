import React, { useEffect, useMemo, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./styles/styles.module.scss";
import { FiMapPin } from "react-icons/fi";
import { LuClock9 } from "react-icons/lu";

const imgSrc = (img) => (typeof img === "string" ? img : (img?.src ?? img));

const mapMarkerIcon = L.icon({
  iconRetinaUrl: imgSrc(markerIcon2x),
  iconUrl: imgSrc(markerIcon),
  shadowUrl: imgSrc(markerShadow),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const dayNames = {
  0: "الأحد",
  1: "الإثنين",
  2: "الثلاثاء",
  3: "الأربعاء",
  4: "الخميس",
  5: "الجمعة",
  6: "السبت",
};

const normalizeService = (singleService) =>
  singleService?.id != null ? singleService : (singleService?.data ?? singleService);

const normalizeLocations = (locations) =>
  Array.isArray(locations) ? locations : Array.isArray(locations?.data) ? locations.data : [];

const getLocationLabel = (location) =>
  [location?.address, location?.city, location?.state, location?.country]
    .filter(Boolean)
    .join(", ");

const formatTime = (time) => (time ? time.slice(0, 5) : "");

const ServiceLocationsMap = ({ locations }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const markerLocations = useMemo(
    () =>
      locations
        .map((location) => ({
          ...location,
          latitude: Number(location?.latitude),
          longitude: Number(location?.longitude),
        }))
        .filter(
          (location) =>
            Number.isFinite(location.latitude) &&
            Number.isFinite(location.longitude),
        ),
    [locations],
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !markerLocations.length) {
      return;
    }

    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
    };
  }, [markerLocations.length]);

  useEffect(() => {
    if (!mapRef.current || !markerLocations.length) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = markerLocations.map((location) =>
      L.marker([location.latitude, location.longitude], {
        icon: mapMarkerIcon,
      })
        .bindPopup(getLocationLabel(location) || `#${location.id}`)
        .addTo(mapRef.current),
    );

    const bounds = L.latLngBounds(
      markerLocations.map((location) => [location.latitude, location.longitude]),
    );

    if (markerLocations.length === 1) {
      mapRef.current.setView(
        [markerLocations[0].latitude, markerLocations[0].longitude],
        14,
      );
    } else {
      mapRef.current.fitBounds(bounds, { padding: [28, 28] });
    }
  }, [markerLocations]);

  if (!markerLocations.length) {
    return (
      <div className="map empty-map">
        لا توجد إحداثيات متاحة لعرض مواقع الخدمة على الخريطة.
      </div>
    );
  }

  return <div ref={mapContainerRef} className="map" />;
};

const Index = () => {
  const { singleService } = useSelector((state) => state.services);
  const serviceData = normalizeService(singleService);
  const locations = normalizeLocations(serviceData?.locations);

  return (
    <div className={styles["work-hours-section"]}>
      <Container>
        <Row>
          <Col lg={6} xs={12}>
            <div className="info">
              <h3>الموقع وساعات العمل</h3>
              {locations.length > 0 ? (
                <ul>
                  {locations.map((location) => {
                    const windows = Array.isArray(
                      location?.calendar?.availability_windows,
                    )
                      ? location.calendar.availability_windows
                      : [];

                    return (
                      <li key={location.id || getLocationLabel(location)}>
                        <h4 className="d-flex align-items-center gap-3">
                          <div className="icon">
                            <FiMapPin />
                          </div>
                          العنوان
                        </h4>
                        <p>{getLocationLabel(location) || "غير متوفر"}</p>

                        <h4 className="d-flex align-items-center gap-3 mt-3">
                          <div className="icon">
                            <LuClock9 />
                          </div>
                          ساعات العمل
                        </h4>
                        {windows.length > 0 ? (
                          windows.map((window, index) => (
                            <p key={`${window.day_of_week}-${index}`}>
                              {window.date || dayNames[window.day_of_week] || ""}
                              : {formatTime(window.start_time)} -{" "}
                              {formatTime(window.end_time)}
                            </p>
                          ))
                        ) : (
                          <p>لا توجد ساعات عمل متاحة لهذا الموقع.</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="empty-state">لا توجد مواقع متاحة لهذه الخدمة.</div>
              )}
            </div>
          </Col>
          <Col lg={6} xs={12}>
            <ServiceLocationsMap locations={locations} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
