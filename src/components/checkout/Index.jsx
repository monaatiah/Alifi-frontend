import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  getCountryCities,
  getCountryStates,
  processCheckout,
  removeCoupon,
} from "@/store/actions";
import { useRouter } from "next/router";
import CartItems from "./CartItems";
import ShippingForm from "./ShippingForm";
import ShippingMethods from "./ShippingMethods";
import PaymentMethods from "./PaymentMethods";
import CouponBox from "./CouponBox";
import CartSummary from "./CartSummary";

const defaultShippingFields = [
  { key: "country_id", visible: true, required: true, order: 1 },
  { key: "city_id", visible: true, required: true, order: 2 },
  { key: "region_id", visible: true, required: true, order: 3 },
  { key: "phone", visible: true, required: true, order: 4 },
  { key: "postal_code", visible: true, required: true, order: 5 },
  { key: "address", visible: true, required: true, order: 6 },
  { key: "notes", visible: true, required: false, order: 7 },
];

const defaultShippingMethods = [
  {
    name: "free_shipping",
    description: "Free Shipping",
    price: 0,
  },
];

const defaultPaymentMethods = [
  {
    code: "visa",
    name: "visa",
    display_name: "visa",
    description: null,
  },
];

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

const mapToOptions = (items = [], locale, includeCountryCode = false) => {
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
        countryCode: includeCountryCode
          ? String(countryCode || "").toUpperCase()
          : undefined,
      };
    })
    .filter(Boolean);
};

const getFirstValue = (data, keys = []) => {
  for (const key of keys) {
    const value = data?.[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return "";
};

const Index = () => {
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const {
    checkoutFields,
    countries,
    countryCities,
    countryStates,
    paymentMethods,
    shippingMethods,
  } = useSelector((state) => state.checkout);
  const { cart } = useSelector((state) => state.cart);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const isCartEmpty = !cart?.items?.length;

  const countryOptions = useMemo(
    () => mapToOptions(countries, locale, true),
    [countries, locale],
  );

  const cityOptions = useMemo(
    () => mapToOptions(countryCities, locale),
    [countryCities, locale],
  );

  const regionOptions = useMemo(
    () => mapToOptions(countryStates, locale),
    [countryStates, locale],
  );

  const shippingAddressFields = useMemo(() => {
    const fields = checkoutFields?.form?.shipping_address?.fields;

    if (!Array.isArray(fields) || !fields.length) {
      return defaultShippingFields;
    }

    return fields
      .filter((field) => field?.visible)
      .sort((a, b) => (a?.order || 0) - (b?.order || 0));
  }, [checkoutFields]);

  const { control, register, handleSubmit, setValue } = useForm();

  const shippingMethodOptions = useMemo(() => {
    const source =
      Array.isArray(shippingMethods) && shippingMethods.length
        ? shippingMethods
        : defaultShippingMethods;

    return source
      .map((method) => ({
        value: method?.name || method?.code || method?.id || "",
        label:
          getLocalizedValue(method?.display_name, locale) ||
          getLocalizedValue(method?.description, locale) ||
          getLocalizedValue(method?.name, locale) ||
          method?.code ||
          "",
        price: Number(method?.price || 0),
      }))
      .filter((method) => method.value && method.label);
  }, [shippingMethods, locale]);

  const paymentMethodOptions = useMemo(() => {
    const source =
      Array.isArray(paymentMethods) && paymentMethods.length
        ? paymentMethods
        : defaultPaymentMethods;

    return source
      .map((method) => ({
        value: method?.code || method?.name || method?.id || "",
        label:
          getLocalizedValue(method?.display_name, locale) ||
          getLocalizedValue(method?.description, locale) ||
          getLocalizedValue(method?.name, locale) ||
          method?.code ||
          "",
      }))
      .filter((method) => method.value && method.label);
  }, [paymentMethods, locale]);

  useEffect(() => {
    if (!selectedCountry?.value) {
      return;
    }

    dispatch(
      getCountryCities({
        cookies: {},
        countryId: selectedCountry.value,
      }),
    );

    dispatch(
      getCountryStates({
        cookies: {},
        countryId: selectedCountry.value,
      }),
    );
  }, [dispatch, selectedCountry?.value]);

  useEffect(() => {
    if (cart?.coupon_code) {
      setCouponCode(cart?.coupon_code);
    } else {
      setCouponCode("");
    }
  }, [cart?.coupon_code]);

  useEffect(() => {
    if (shippingMethodOptions.length) {
      setValue("shipping_method", shippingMethodOptions[0].value);
    }

    if (paymentMethodOptions.length) {
      setValue("payment_method", paymentMethodOptions[0].value);
    }
  }, [paymentMethodOptions, setValue, shippingMethodOptions]);

  const submitForm = (data) => {
    const payload = {
      shipping_address: {
        name: getFirstValue(data, ["name"]),
        phone: getFirstValue(data, ["phone", "phone_number"]),
        email: getFirstValue(data, ["email"]),
        country: getFirstValue(data, [
          "country",
          "country_id",
          "shipping_country",
        ]),
        state: getFirstValue(data, [
          "state",
          "state_id",
          "region",
          "region_id",
          "shipping_state",
        ]),
        city: getFirstValue(data, ["city", "city_id", "shipping_city"]),
        address: getFirstValue(data, ["address", "address_line_1"]),
        zip_code: getFirstValue(data, ["zip_code", "postal_code", "postcode"]),
      },
      same_as_shipping: true,
      shipping_method:
        getFirstValue(data, ["shipping_method"]) ||
        shippingMethodOptions?.[0]?.value ||
        "method",
      payment_method:
        getFirstValue(data, ["payment_method"]) ||
        paymentMethodOptions?.[0]?.value ||
        "cod",
      notes: getFirstValue(data, ["notes"]),
    };

    dispatch(processCheckout(payload));
  };

  return (
    <div className={styles["checkout-section"]}>
      <Container>
        {isCartEmpty ? (
          <div className="cart-coupon text-center empty-cart-box">
            <div className="head">
              <h4>سلة التسوق فارغة</h4>
              <span>
                لإكمال عملية الدفع، يرجى إضافة منتجات إلى سلة التسوق أولاً.
              </span>
            </div>
            <Link href="/shop">
              <a className="btn">الانتقال إلى المتجر</a>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitForm)}>
            <Row>
              <Col lg={6}>
                <Row>
                  <ShippingForm
                    shippingAddressFields={shippingAddressFields}
                    locale={locale}
                    control={control}
                    register={register}
                    setValue={setValue}
                    countryOptions={countryOptions}
                    cityOptions={cityOptions}
                    regionOptions={regionOptions}
                    selectedCountry={selectedCountry}
                    selectedCity={selectedCity}
                    selectedRegion={selectedRegion}
                    setSelectedCountry={setSelectedCountry}
                    setSelectedCity={setSelectedCity}
                    setSelectedRegion={setSelectedRegion}
                  />
                  <ShippingMethods
                    shippingMethodOptions={shippingMethodOptions}
                    register={register}
                  />
                  <PaymentMethods
                    paymentMethodOptions={paymentMethodOptions}
                    register={register}
                  />
                </Row>
              </Col>
              <Col lg={6}>
                <CartItems cart={cart} />
                <CouponBox
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  onCouponAction={() => {
                    if (cart?.coupon_code) {
                      dispatch(removeCoupon({}));
                    } else {
                      dispatch(
                        applyCoupon({
                          body: {
                            code: couponCode,
                          },
                        }),
                      );
                    }
                  }}
                />

                <div className="cart-coupon notes">
                  <div className="head">
                    <h4>ملاحظة الطلب</h4>
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="ملاحظات حول طلبك، على سبيل المثال، ملاحظات خاصة للتوصيل."
                      className="form-control"
                      {...register("notes")}
                    />
                  </div>
                </div>
              </Col>
              <CartSummary cart={cart} />
            </Row>
          </form>
        )}
      </Container>
    </div>
  );
};

export default Index;
