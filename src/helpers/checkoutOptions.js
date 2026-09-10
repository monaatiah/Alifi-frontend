const CASH_ON_DELIVERY_CODE = "cod";

const CASH_ON_DELIVERY_LABELS = {
  ar: "الدفع عند الاستلام",
  en: "Cash on delivery",
};

/**
 * Resolve an API value that is either a plain string or a translation map ({ ar, en }).
 * @param {unknown} value
 * @param {string} locale
 * @returns {string}
 */
export const getLocalizedValue = (value, locale) => {
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

/**
 * True when a payment method code is cash on delivery. The backend matches codes
 * case-insensitively (production returns "COD"), so the storefront does too.
 * @param {unknown} code
 * @returns {boolean}
 */
export const isCashOnDelivery = (code) =>
  String(code ?? "")
    .trim()
    .toLowerCase() === CASH_ON_DELIVERY_CODE;

/**
 * Map GET /settings/payment-methods rows to radio options. The API is the only source:
 * no method is invented client-side, and each value is the API code sent back verbatim.
 * @param {Array<{ code?: unknown, name?: unknown, display_name?: unknown, description?: unknown }> | null | undefined} methods
 * @param {string} locale
 * @returns {Array<{ value: string, label: string }>}
 */
export const toPaymentMethodOptions = (methods, locale) => {
  if (!Array.isArray(methods)) {
    return [];
  }

  return methods
    .map((method) => {
      const value = typeof method?.code === "string" ? method.code : "";
      const label = isCashOnDelivery(value)
        ? CASH_ON_DELIVERY_LABELS[locale] || CASH_ON_DELIVERY_LABELS.ar
        : getLocalizedValue(method?.display_name, locale) ||
          getLocalizedValue(method?.description, locale) ||
          getLocalizedValue(method?.name, locale) ||
          value;

      return { value, label };
    })
    .filter((option) => option.value && option.label);
};
