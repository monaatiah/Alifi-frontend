import React, { useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FormattedMessage, useIntl } from "react-intl";
const FileUploadField = ({
  control,
  name,
  label,
  accept = "image/*,application/pdf",
  maxSizeMB = 5,
  uploadUrl,
  extraHeaders = {},
  required = false,
}) => {
  const { formatMessage } = useIntl();
  const [isUploading, setIsUploading] = useState(false);
  const maxBytes = maxSizeMB * 1024 * 1024;

  // Safe image check
  const isImageUrl = (val) => {
    if (!val || typeof val !== "string") return false;
    const clean = val.split("?")[0].toLowerCase();
    return /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(clean);
  };

  const uploadOne = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: fd,
      headers: extraHeaders,
    });
    if (!res.ok) throw new Error(formatMessage({ id: "uploadError" }));
    const json = await res.json();
    return json?.data?.file?.fullpath || "";
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      // eslint-disable-next-line no-unused-vars
      render={({ field, fieldState }) => {
        const url =
          field.value && typeof field.value === "string" ? field.value : "";

        const handleChange = async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (
            !(file.type.startsWith("image/") || file.type === "application/pdf")
          ) {
            toast.error(formatMessage({ id: "allowedFileTypes" }));
            return;
          }
          if (file.size > maxBytes) {
            toast.error(
              `${formatMessage({ id: "maxFileSize" })} ${maxSizeMB}MB`
            );
            return;
          }

          setIsUploading(true);
          try {
            const uploadedUrl = await uploadOne(file);
            field.onChange(uploadedUrl);
          } catch (err) {
            console.error(err);
            toast.error(formatMessage({ id: "uploadError" }));
          } finally {
            setIsUploading(false);
            e.target.value = "";
          }
        };

        const removeFile = () => field.onChange("");

        return (
          <div className="file-field">
            <label className="form-title required">{label}</label>

            <label className={`dropzone-like ${isUploading ? "disabled" : ""}`}>
              <input
                type="file"
                accept={accept}
                onChange={handleChange}
                style={{ display: "none" }}
                disabled={isUploading}
              />
              <div className="dropzone-ui">
                <div className="dz-icon">
                  <FaUpload size={25} color="#34343299" />
                </div>
                <div className="dz-text">
                  {isUploading
                    ? formatMessage({ id: "uploading" })
                    : formatMessage({ id: "upload" })}
                  <span>PDF,jpg,jpeg,png (MAX 5 MB)</span>
                </div>
              </div>
            </label>

            {url && (
              <div className="uploaded-item">
                {isImageUrl(url) ? (
                  <img src={url} alt="uploaded" className="thumb" />
                ) : (
                  <div className="file-icon">📄</div>
                )}
                <div className="info">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="file-link"
                  >
                    {url.split("/").pop()}
                  </a>

                  <button type="button" onClick={removeFile}>
                    <IoMdClose />
                    <FormattedMessage id="remove" />
                  </button>
                </div>
              </div>
            )}

            {/* {fieldState.error && <p className="error">هذا الحقل مطلوب</p>} */}
          </div>
        );
      }}
    />
  );
};

export default FileUploadField;
