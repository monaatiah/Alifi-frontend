import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Image from "next/image";
import Link from "next/link";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { getComponentByIdentifier, handleImageLink } from "@/helpers/functions";

const currencyLabel = "ر.س";

const formatAmount = (value) => {
  const numericValue = Number(value ?? 0);
  if (Number.isNaN(numericValue)) return "0.00";
  return numericValue.toFixed(2);
};

const escapeHtml = (value) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const extractRawValue = (value) => {
  if (!value) return "";
  if (typeof value !== "string") return value;
  return value.split("/").pop() || value;
};

const getOrderCustomerDetails = (order) => {
  const address =
    order?.shipping_address || order?.billing_address || order?.address || {};

  return {
    fullName:
      order?.customer_name ||
      address?.full_name ||
      [address?.first_name, address?.last_name].filter(Boolean).join(" ") ||
      order?.user?.name ||
      "-",
    phone:
      order?.customer_phone ||
      address?.phone ||
      order?.phone ||
      order?.user?.phone ||
      "-",
    email:
      order?.customer_email ||
      address?.email ||
      order?.email ||
      order?.user?.email ||
      "-",
    city: address?.city || address?.region || "-",
    postalCode: address?.postal_code || address?.zip || "-",
    line:
      address?.address_line_1 ||
      address?.line_1 ||
      address?.street ||
      address?.address ||
      "-",
  };
};

const buildInvoiceHtml = ({ order, customer, settings }) => {
  const itemRows = (order?.items || [])
    .map((item, index) => {
      const quantity = Number(item?.quantity || 0);
      const unitPrice = Number(
        item?.price ?? item?.product?.sale_price ?? item?.product?.price ?? 0,
      );
      const total = quantity * unitPrice;

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(item?.product?.name || "-")}</td>
          <td>${quantity}</td>
          <td>${formatAmount(unitPrice)} ${currencyLabel}</td>
          <td>${formatAmount(total)} ${currencyLabel}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>فاتورة الطلب ${escapeHtml(order?.id || "")}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 28px;
            font-family: Tahoma, Arial, sans-serif;
            color: #1a1a1a;
            background: #f8fafc;
          }
          .invoice {
            max-width: 980px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e4e8ef;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          }
          .header {
            padding: 28px 32px;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;
          }
          .brand {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .muted {
            color: #8ea0b8;
            font-size: 13px;
          }
          .header-meta {
            text-align: left;
            min-width: 220px;
          }
          .header-meta p {
            margin: 0 0 8px;
            font-size: 13px;
          }
          .chip {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 12px;
            color: #0f172a;
            background: #e2e8f0;
            font-weight: 700;
          }
          .content {
            padding: 28px 32px 32px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 22px;
          }
          .card {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 14px 16px;
            background: #fcfdff;
          }
          .card h4 {
            margin: 0 0 10px;
            font-size: 15px;
            color: #0f172a;
          }
          .card p {
            margin: 0 0 6px;
            font-size: 13px;
            color: #334155;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 13px;
          }
          thead th {
            background: #f1f5f9;
            color: #0f172a;
            border-bottom: 1px solid #dce3ec;
            padding: 10px;
          }
          tbody td {
            padding: 10px;
            border-bottom: 1px solid #eef2f7;
            color: #1e293b;
            text-align: center;
          }
          .summary {
            margin-top: 20px;
            margin-right: auto;
            max-width: 360px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 12px 14px;
            background: #ffffff;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 13px;
            color: #334155;
          }
          .summary-row.total {
            margin-top: 8px;
            padding-top: 10px;
            border-top: 1px dashed #cbd5e1;
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
          }
          .footer {
            margin-top: 18px;
            font-size: 12px;
            color: #64748b;
          }
          @media print {
            body { background: #fff; padding: 0; }
            .invoice {
              border: none;
              border-radius: 0;
              box-shadow: none;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <section class="invoice">
          <header class="header">
            <div>
              <div class="brand">${escapeHtml(
                settings?.site_name || settings?.name || "Alifi Store",
              )}</div>
              <div class="muted">فاتورة ضريبية مبسطة</div>
            </div>
            <div class="header-meta">
              <p><strong>رقم الطلب:</strong> ${escapeHtml(order?.id || "-")}</p>
              <p><strong>التاريخ:</strong> ${escapeHtml(
                order?.created_at
                  ? new Intl.DateTimeFormat("ar-SA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(order.created_at))
                  : new Intl.DateTimeFormat("ar-SA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date()),
              )}</p>
              <p><strong>طريقة الدفع:</strong> ${escapeHtml(
                order?.payment_method?.name || order?.payment_method || "-",
              )}</p>
              <span class="chip">${escapeHtml(
                order?.status || "Confirmed",
              )}</span>
            </div>
          </header>

          <div class="content">
            <div class="grid">
              <div class="card">
                <h4>بيانات العميل</h4>
                <p><strong>الاسم:</strong> ${escapeHtml(customer.fullName)}</p>
                <p><strong>الهاتف:</strong> ${escapeHtml(customer.phone)}</p>
                <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(
                  customer.email,
                )}</p>
              </div>
              <div class="card">
                <h4>عنوان الشحن</h4>
                <p><strong>العنوان:</strong> ${escapeHtml(customer.line)}</p>
                <p><strong>المدينة:</strong> ${escapeHtml(customer.city)}</p>
                <p><strong>الرمز البريدي:</strong> ${escapeHtml(
                  customer.postalCode,
                )}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>المنتج</th>
                  <th>الكمية</th>
                  <th>سعر الوحدة</th>
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${itemRows || "<tr><td colspan='5'>لا توجد منتجات</td></tr>"}
              </tbody>
            </table>

            <div class="summary">
              <div class="summary-row">
                <span>إجمالي المنتجات</span>
                <span>${formatAmount(order?.sub_total)} ${currencyLabel}</span>
              </div>
              <div class="summary-row">
                <span>الشحن</span>
                <span>${formatAmount(order?.shipping_amount)} ${currencyLabel}</span>
              </div>
              <div class="summary-row">
                <span>الخصم</span>
                <span>${formatAmount(order?.discount_amount)} ${currencyLabel}</span>
              </div>
              <div class="summary-row">
                <span>الضريبة</span>
                <span>${formatAmount(order?.tax_amount)} ${currencyLabel}</span>
              </div>
              <div class="summary-row total">
                <span>الإجمالي النهائي</span>
                <span>${formatAmount(order?.total)} ${currencyLabel}</span>
              </div>
            </div>

            <div class="footer">
              <p>للاستفسارات: ${escapeHtml(
                extractRawValue(settings?.contact_phone) || "-",
              )} | ${escapeHtml(
                extractRawValue(settings?.contact_email) || "-",
              )}</p>
              <p>شكرا لتسوقكم معنا.</p>
            </div>
          </div>
        </section>
      </body>
    </html>
  `;
};

const Index = () => {
  const { order } = useSelector((state) => state.checkout);
  const { pageData, settings } = useSelector((state) => state.settings);
  const orderContentData = getComponentByIdentifier(
    pageData?.page_components,
    "order_status",
  );

  const handleDownloadInvoice = () => {
    if (!order?.id && !order?.items?.length) {
      toast.error("لا يمكن تحميل الفاتورة قبل تحميل بيانات الطلب");
      return;
    }

    const customer = getOrderCustomerDetails(order);
    const invoiceHtml = buildInvoiceHtml({ order, customer, settings });

    const blob = new Blob([invoiceHtml], {
      type: "text/html;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const orderId = order?.id || Date.now();

    link.href = url;
    link.download = `invoice-${orderId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles["cart-section"]}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="message">
              <Image
                src={handleImageLink(orderContentData?.data?.icon)}
                alt="order confirmed"
                width={80}
                height={80}
              />
              <h3>{orderContentData?.data?.title}</h3>
              <span>{orderContentData?.data?.subtitle}</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: orderContentData?.data?.description,
                }}
              ></div>
            </div>
          </Col>
          <Col lg={12}>
            <div className="cart-table">
              <Table responsive>
                <thead>
                  <tr>
                    <th>منتج</th>
                    <th>السعر </th>
                    <th> الكمية</th>
                    <th>المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.items?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="product-data d-flex align-items-center gap-4">
                            <div className="img">
                              <Image
                                src={handleImageLink(item?.product?.image)}
                                alt={item?.product?.name}
                                width={105}
                                height={117}
                              />
                            </div>
                            <div className="info">
                              <p>{item?.category?.name}</p>
                              <Link href={`/products/${item?.id}`}>
                                {item?.product?.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="price d-flex flex-column align-items-center gap-1">
                            {item?.product?.sale_price ? (
                              <>
                                <span className="sale-price">
                                  {item?.product?.sale_price}
                                  <SaudiRiyalIcon
                                    width={20}
                                    height={20}
                                    stroke="#000"
                                  />
                                </span>
                                <span className="old-price">
                                  {item?.product?.price}
                                  <SaudiRiyalIcon
                                    width={20}
                                    height={20}
                                    stroke="#c1c1c1"
                                  />
                                </span>
                              </>
                            ) : (
                              <span className="original-price">
                                {item?.product?.price}
                                <SaudiRiyalIcon
                                  width={20}
                                  height={20}
                                  stroke="#000"
                                />
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="quantity-control d-flex align-items-center justify-content-center gap-3">
                            <span>{item.quantity}</span>
                          </div>
                        </td>
                        <td>
                          <div className="total text-center">
                            {item?.price * item.quantity}
                            <SaudiRiyalIcon
                              width={20}
                              height={20}
                              stroke="#000"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
          {order?.shipping_address && (
            <Col lg={order?.notes ? 6 : 12}>
              <div className="cart-coupon">
                <div className="head">
                  <h4>معلومات الشحن</h4>
                </div>
                <ul>
                  <li>{order?.shipping_address?.name}</li>
                  <li>{order?.shipping_address?.email}</li>
                  <li>{order?.shipping_address?.phone}</li>
                  <li>
                    {order?.shipping_address?.country},{" "}
                    {order?.shipping_address?.state},{" "}
                    {order?.shipping_address?.city},{" "}
                    {order?.shipping_address?.zip_code}
                  </li>
                  <li>{order?.shipping_address?.address}</li>
                </ul>
              </div>
            </Col>
          )}
          {order?.notes && (
            <Col lg={6}>
              <div className="cart-coupon">
                <div className="head">
                  <h4> ملاحظة الطلب</h4>
                </div>
                <p>يرجى توصيل الطلب بين الساعة 3 و 5 مساءً. شكراً!</p>
              </div>
            </Col>
          )}

          <Col lg={12}>
            <div className="cart-summary">
              <div className="cart-total">
                <h4> ملخص الدفع</h4>
                <ul>
                  <li className="d-flex align-items-center justify-content-between">
                    إجمالي المنتجات
                    <span>
                      {order?.sub_total}
                      <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                    </span>
                  </li>
                  {order?.shipping_amount > 0 && (
                    <li className="d-flex align-items-center justify-content-between">
                      تكلفة الشحن
                      <span>
                        {order?.shipping_amount}
                        <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                      </span>
                    </li>
                  )}
                  {order?.discount_amount > 0 && (
                    <li className="d-flex align-items-center justify-content-between">
                      قيمة الخصم
                      <span>
                        {order?.discount_amount}
                        <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                      </span>
                    </li>
                  )}
                  {order?.tax_amount > 0 && (
                    <li className="d-flex align-items-center justify-content-between">
                      قيمة الضريبة
                      <span>
                        {order?.tax_amount}
                        <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                      </span>
                    </li>
                  )}
                  <li className="d-flex align-items-center justify-content-between total">
                    المجموع النهائي
                    <span>
                      {order?.total}
                      <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                    </span>
                  </li>
                </ul>
              </div>
              <div className="btns d-flex align-items-center justify-content-end gap-2">
                <Link href="/shop" className="btn">
                  متابعة التسوق
                </Link>
                <button
                  className="btn btn-outline"
                  onClick={handleDownloadInvoice}
                >
                  تحميل الفاتورة
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
