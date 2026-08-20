import React from "react";
import { Col } from "react-bootstrap";
import Select from "react-select";
import * as flags from "country-flag-icons/react/3x2";
import { Controller } from "react-hook-form";

const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "50px",
    border: "1px solid #e0e0e0",
    padding: "8px 15px",
    minHeight: "50px",
    direction: "rtl",
  }),
  placeholder: (base) => ({
    ...base,
    textAlign: "right",
    color: "#999",
  }),
  singleValue: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
};

const getLocalizedValue = (value, locale) => {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return (
      value?.[locale] ||
      value?.ar ||
      value?.en ||
      Object.values(value)?.[0] ||
      ""
    );
  }

  return "";
};

const mapToOptions = (items = [], locale) => {
  return items
    ?.map((item) => {
      const value =
        item?.id ||
        item?.value ||
        item?.code ||
        item?.country_id ||
        item?.city_id ||
        item?.region_id;
      const label =
        getLocalizedValue(item?.name, locale) ||
        getLocalizedValue(item?.label, locale) ||
        getLocalizedValue(item?.title, locale);

      if (!value || !label) {
        return null;
      }

      const countryCode =
        item?.code ||
        item?.iso2 ||
        item?.country_code ||
        item?.alpha2 ||
        item?.value;

      return {
        value,
        label,
        countryCode: String(countryCode || "").toUpperCase(),
      };
    })
    .filter(Boolean);
};

const getFieldPlaceholder = (field, locale) => {
  const normalizedKey = normalizeFieldKey(field?.key);
  const forcedArabicPlaceholders = {
    email: "البريد الإلكتروني",
    zip_code: "الرمز البريدي",
    postal_code: "الرمز البريدي",
    postcode: "الرمز البريدي",
  };

  if (forcedArabicPlaceholders[normalizedKey]) {
    return forcedArabicPlaceholders[normalizedKey];
  }

  const placeholder =
    getLocalizedValue(field?.placeholder, locale) ||
    getLocalizedValue(field?.label, locale);

  if (placeholder) {
    return placeholder;
  }

  const fallbackLabels = {
    name: "الاسم الكامل",
    country_id: "الدولة",
    city_id: "المدينة",
    region_id: "المنطقة",
    phone: "رقم الهاتف",
    postal_code: "رمز بريدي",
    address: "العنوان الكامل",
    notes: "ملاحظات التوصيل (اختياري)",
  };

  return fallbackLabels[field?.key] || field?.key;
};

const normalizeFieldKey = (key = "") => {
  return String(key).toLowerCase().replace(/[-\s]/g, "_");
};

const countryKeys = new Set(["country", "country_id", "shipping_country"]);
const stateKeys = new Set([
  "state",
  "state_id",
  "region",
  "region_id",
  "shipping_state",
  "shipping_region",
]);
const cityKeys = new Set(["city", "city_id", "shipping_city"]);

const emailKeys = new Set(["email"]);
const phoneKeys = new Set(["phone", "phone_number", "mobile"]);

const getArabicSelectPlaceholder = ({
  isCountryField,
  isCityField,
  isRegionField,
}) => {
  if (isCountryField) {
    return "اختر الدولة";
  }

  if (isCityField) {
    return "اختر المدينة";
  }

  if (isRegionField) {
    return "اختر المنطقة";
  }

  return "اختر";
};

const getValidationRules = ({
  normalizedKey,
  isCountryField,
  isCityField,
  isRegionField,
  required,
}) => {
  const isRequiredField =
    required || isCountryField || isCityField || isRegionField;

  if (emailKeys.has(normalizedKey)) {
    return {
      required: isRequiredField,
      pattern: /^\S+@\S+\.\S+$/,
    };
  }

  if (phoneKeys.has(normalizedKey)) {
    return {
      required: isRequiredField,
      pattern: /^\+?[0-9]{8,15}$/,
    };
  }

  return {
    required: isRequiredField,
  };
};

const ShippingForm = ({
  shippingAddressFields,
  locale,
  control,
  register,
  setValue,
  countryOptions,
  cityOptions,
  regionOptions,
  selectedCountry,
  selectedCity,
  selectedRegion,
  setSelectedCountry,
  setSelectedCity,
  setSelectedRegion,
}) => {
  return (
    <>
      <div className="form-head">
        <h3> التوصيل</h3>
      </div>
      {shippingAddressFields.map((field) => {
        const placeholder = getFieldPlaceholder(field, locale);
        const key = field?.key;
        const normalizedKey = normalizeFieldKey(key);
        const isCountryField = countryKeys.has(normalizedKey);
        const isCityField = cityKeys.has(normalizedKey);
        const isRegionField = stateKeys.has(normalizedKey);
        const schemaOptions = mapToOptions(field?.options || [], locale);
        const validationRules = getValidationRules({
          normalizedKey,
          isCountryField,
          isCityField,
          isRegionField,
          required: field?.required,
        });
        const isWideField = [
          "country_id",
          "name",
          "address",
          "notes",
          "address_line_1",
          "address_line_2",
        ].includes(key);

        if (isCountryField || isCityField || isRegionField) {
          const options = schemaOptions.length
            ? schemaOptions
            : isCountryField
              ? countryOptions
              : isCityField
                ? cityOptions
                : regionOptions;

          const selectedValue = isCountryField
            ? selectedCountry
            : isCityField
              ? selectedCity
              : selectedRegion;

          return (
            <Col lg={isWideField ? 12 : 6} key={key}>
              <div className="form-group">
                <Controller
                  name={key}
                  control={control}
                  rules={validationRules}
                  render={({ field: controlledField }) => (
                    <Select
                      options={options}
                      value={selectedValue}
                      onChange={(selectedOption) => {
                        if (isCountryField) {
                          setSelectedCountry(selectedOption || null);
                          setSelectedCity(null);
                          setSelectedRegion(null);
                          setValue("city_id", "");
                          setValue("city", "");
                          setValue("region_id", "");
                          setValue("region", "");
                          setValue("state_id", "");
                          setValue("state", "");
                        }

                        if (isCityField) {
                          setSelectedCity(selectedOption || null);
                        }

                        if (isRegionField) {
                          setSelectedRegion(selectedOption || null);
                          setSelectedCity(null);
                          setValue("city_id", "");
                          setValue("city", "");
                        }

                        controlledField.onChange(selectedOption?.value || "");
                      }}
                      placeholder={getArabicSelectPlaceholder({
                        isCountryField,
                        isCityField,
                        isRegionField,
                      })}
                      isDisabled={
                        !schemaOptions.length &&
                        !isCountryField &&
                        !selectedCountry?.value
                      }
                      styles={selectStyles}
                      formatOptionLabel={(option) => {
                        if (isCountryField) {
                          const FlagComponent = flags[option?.countryCode];

                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              {FlagComponent && (
                                <FlagComponent
                                  style={{
                                    width: "24px",
                                    height: "16px",
                                  }}
                                />
                              )}
                              <span>{option.label}</span>
                            </div>
                          );
                        }

                        return <span>{option.label}</span>;
                      }}
                    />
                  )}
                />
              </div>
            </Col>
          );
        }

        return (
          <Col lg={isWideField ? 12 : 6} key={key}>
            <div className="form-group">
              <input
                type={field?.type || "text"}
                placeholder={placeholder}
                className="form-control"
                {...register(key, validationRules)}
              />
            </div>
          </Col>
        );
      })}
      <Col lg={12}>
        <div className="form-group">
          <label className="d-flex align-items-center gap-3">
            <input type="checkbox" {...register("save_for_next_time")} />
            <span>احفظ هذه المعلومات للمرات القادمة</span>
          </label>
        </div>
      </Col>
    </>
  );
};

export default ShippingForm;
