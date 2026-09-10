import {
  getLocalizedValue,
  isCashOnDelivery,
  toPaymentMethodOptions,
} from "../checkoutOptions";

// Shape of GET /api/settings/payment-methods in production (2026-09).
const productionMethods = [
  { code: "visa", name: "visa", display_name: "visa", description: null },
  { code: "COD", name: "COD", display_name: "COD", description: null },
];

describe("toPaymentMethodOptions", () => {
  it("offers every API method and submits its code verbatim", () => {
    const options = toPaymentMethodOptions(productionMethods, "ar");

    expect(options.map((option) => option.value)).toEqual(["visa", "COD"]);
  });

  it("labels cash on delivery in the shopper's language whatever the code's case", () => {
    expect(toPaymentMethodOptions([{ code: "COD" }], "ar")[0].label).toBe(
      "الدفع عند الاستلام",
    );
    expect(toPaymentMethodOptions([{ code: "cod" }], "en")[0].label).toBe(
      "Cash on delivery",
    );
  });

  it("uses the server display name for other methods", () => {
    const [option] = toPaymentMethodOptions(
      [{ code: "stripe", display_name: "Stripe" }],
      "ar",
    );

    expect(option).toEqual({ value: "stripe", label: "Stripe" });
  });

  it("invents no fallback method when the API returns none", () => {
    expect(toPaymentMethodOptions([], "ar")).toEqual([]);
    expect(toPaymentMethodOptions(undefined, "ar")).toEqual([]);
    expect(toPaymentMethodOptions(null, "ar")).toEqual([]);
  });

  it("drops rows without a code", () => {
    expect(
      toPaymentMethodOptions([{ name: "orphan", display_name: "Orphan" }], "ar"),
    ).toEqual([]);
  });
});

describe("isCashOnDelivery", () => {
  it.each(["cod", "COD", "Cod", " cod "])("matches %p", (code) => {
    expect(isCashOnDelivery(code)).toBe(true);
  });

  it.each(["visa", "cash", "", null, undefined])("rejects %p", (code) => {
    expect(isCashOnDelivery(code)).toBe(false);
  });
});

describe("getLocalizedValue", () => {
  it("prefers the requested locale, then Arabic", () => {
    expect(getLocalizedValue({ en: "Card", ar: "بطاقة" }, "en")).toBe("Card");
    expect(getLocalizedValue({ ar: "بطاقة" }, "en")).toBe("بطاقة");
    expect(getLocalizedValue(null, "en")).toBe("");
  });
});
