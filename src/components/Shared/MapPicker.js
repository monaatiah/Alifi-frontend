import React, { useState, useRef, useEffect, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Next.js returns StaticImageData objects ({ src, width, height }) for PNG imports.
// L.icon expects plain URL strings, so we extract .src when needed.
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

const MapPicker = ({
  selectedPosition,
  defaultCenter = [24.7136, 46.6753],
  mapHeight = "500px",
  selectedZoom = 15,
  defaultZoom = 11,
  useSatellite = false,
  maxBounds,
  maxBoundsViscosity,
  minZoom,
  restrictToBounds = false,
  onChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const initialCenterRef = useRef(selectedPosition || defaultCenter);
  const initialZoomRef = useRef(selectedPosition ? selectedZoom : defaultZoom);
  const debounceTimerRef = useRef(null);
  const searchContainerRef = useRef(null);
  const cacheRef = useRef({});

  // Keep a stable ref to onChange so callbacks never need to declare it as a dep.
  // This prevents the entire map from being destroyed/recreated when the parent
  // re-renders and passes a new inline arrow function as onChange.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const isInsideBounds = useCallback(
    (lat, lng) => {
      if (!Array.isArray(maxBounds) || maxBounds.length !== 2) {
        return true;
      }

      const [[south, west], [north, east]] = maxBounds;
      return lat >= south && lat <= north && lng >= west && lng <= east;
    },
    [maxBounds],
  );

  const tileUrl = useSatellite
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tileAttribution = useSatellite
    ? "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const getPreservedZoom = () => {
    const currentZoom = mapRef.current?.getZoom?.();
    if (Number.isFinite(currentZoom)) {
      return currentZoom;
    }
    return initialZoomRef.current;
  };

  // Stable — no dependency on onChange (uses onChangeRef instead).
  const ensureMarker = useCallback((lat, lng) => {
    if (!mapRef.current) {
      return;
    }

    if (!markerRef.current) {
      markerRef.current = L.marker([lat, lng], {
        icon: mapMarkerIcon,
        draggable: true,
      })
        .on("dragend", (event) => {
          const { lat: nextLat, lng: nextLng } = event.target.getLatLng();
          if (typeof onChangeRef.current === "function") {
            onChangeRef.current(nextLat, nextLng);
          }
        })
        .addTo(mapRef.current);
    } else {
      markerRef.current.setLatLng([lat, lng]);
    }
  }, []);

  // Stable — no dependency on onChange (uses onChangeRef instead).
  const handlePick = useCallback(
    (lat, lng, shouldFly = false) => {
      if (restrictToBounds && !isInsideBounds(lat, lng)) {
        alert("الموقع خارج النطاق المسموح به");
        return;
      }

      ensureMarker(lat, lng);

      if (shouldFly && mapRef.current) {
        mapRef.current.flyTo([lat, lng], getPreservedZoom());
      }

      if (typeof onChangeRef.current === "function") {
        onChangeRef.current(lat, lng);
      }
    },
    [ensureMarker, isInsideBounds, restrictToBounds],
  );

  // Keep a stable ref to handlePick so the Leaflet click listener registered
  // inside the init effect always calls the latest version without needing to
  // re-attach (which would destroy/recreate the map).
  const handlePickRef = useRef(handlePick);
  useEffect(() => {
    handlePickRef.current = handlePick;
  }, [handlePick]);

  // Initialize Leaflet map ONCE on mount. All deps here are truly stable:
  // – initial center/zoom come from refs (captured at mount)
  // – the click listener delegates to handlePickRef so it never goes stale
  // – tile/bounds props are applied reactively by their own effects below
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: true,
      minZoom,
      maxBounds,
      maxBoundsViscosity,
      scrollWheelZoom: true,
    });

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: tileAttribution,
      noWrap: useSatellite,
    }).addTo(mapRef.current);

    mapRef.current.setView(initialCenterRef.current, initialZoomRef.current);

    // Use ref so this handler never becomes stale and never causes re-init.
    mapRef.current.on("click", (event) => {
      const { lat, lng } = event.latlng;
      handlePickRef.current(lat, lng);
    });

    if (
      Array.isArray(initialCenterRef.current) &&
      initialCenterRef.current !== defaultCenter
    ) {
      ensureMarker(initialCenterRef.current[0], initialCenterRef.current[1]);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
      tileLayerRef.current = null;
    };
  }, []);

  // Sync marker position whenever the controlled selectedPosition prop changes.
  // flyTo is intentionally NOT called here — clicking on the map must not
  // reset the zoom level. flyTo only happens via search (handleSuggestionClick /
  // handleSearch).
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (Array.isArray(selectedPosition) && selectedPosition.length === 2) {
      ensureMarker(selectedPosition[0], selectedPosition[1]);
      return;
    }

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [ensureMarker, selectedPosition]);

  // Update tile layer when map style changes.
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: tileAttribution,
      noWrap: useSatellite,
    }).addTo(mapRef.current);
  }, [tileAttribution, tileUrl, useSatellite]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const cacheKey = query.toLowerCase().trim();
    if (cacheRef.current[cacheKey]) {
      setSuggestions(cacheRef.current[cacheKey]);
      setShowSuggestions(cacheRef.current[cacheKey].length > 0);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}&limit=5&addressdetails=1`,
        { signal: AbortSignal.timeout(3000) },
      );
      const data = await response.json();

      cacheRef.current[cacheKey] = data || [];

      setSuggestions(data || []);
      setShowSuggestions(data && data.length > 0);
    } catch (error) {
      if (error.name !== "TimeoutError" && error.name !== "AbortError") {
        console.error("Suggestion fetch error:", error);
      }
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Debounced search on input change
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 100);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    const latitude = parseFloat(suggestion.lat);
    const longitude = parseFloat(suggestion.lon);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return;
    }

    setSearchQuery(suggestion.display_name);
    setShowSuggestions(false);
    handlePick(latitude, longitude, true);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}&limit=1`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
          handlePick(latitude, longitude, true);
        }
      } else {
        alert("الموقع غير موجود. حاول البحث بكلمات أخرى.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("خطأ في البحث. حاول مرة أخرى.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={searchContainerRef}
        style={{
          position: "absolute",
          top: "15px",
          left: "10px",
          right: "10px",
          zIndex: 800,
          display: "flex",
          gap: "8px",
          width: "90%",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                setShowSuggestions(false);
              }
            }}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder="ابحث عن موقع (مثال: الرياض، السعودية)"
            className="form-control map-form-control"
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
            disabled={searching}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "4px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                zIndex: 1001,
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    borderBottom:
                      index < suggestions.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    fontSize: "14px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <div style={{ fontWeight: "500", marginBottom: "2px" }}>
                    {suggestion.display_name.split(",")[0]}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {suggestion.display_name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={searching || !searchQuery.trim()}
          className="btn btn-blue map-search-button"
        >
          {searching ? "..." : "بحث"}
        </button>
      </div>

      <div
        ref={mapContainerRef}
        style={{
          height: mapHeight,
          width: "100%",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default MapPicker;
