import React, { useRef } from "react";
import Image from "next/future/image";
import UploadIcon from "@/assets/images/upload.svg";
import RemoveIcon from "@/assets/images/close.svg";
// import NoImage from "@/assets/images/noImage.png";
import server from "@/api/server";
import { handleImageLink } from "@/helpers/functions";
import { parseCookies } from "nookies";

const ImageUpload = ({ selectedImage, setSelectedImage }) => {
  const cookies = parseCookies();
  const inputRef = useRef(null);

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const { data } = await server({ cookies }).post("/upload", formData);

      setSelectedImage({
        preview: e.target.files[0],
        path: data.data.files[0].path,
        fullpath: data.data.files[0].fullpath,
      });
    }
  };

  const removeSelectedImage = () => {
    if (inputRef.current != null) inputRef.current.value = "";
    setSelectedImage("");
  };

  return (
    <div className="image-uploader">
      <div className="upload-icon">
        <UploadIcon />
      </div>
      <label>
        {(selectedImage?.preview || selectedImage?.path) && (
          <div>
            <Image
              src={
                selectedImage && selectedImage.preview
                  ? URL.createObjectURL(selectedImage.preview)
                  : handleImageLink(selectedImage?.path)
              }
              width={500}
              height={500}
              alt=""
            />
            <button className="remove-img" onClick={removeSelectedImage}>
              <RemoveIcon fill="#fff" />
            </button>
          </div>
        )}
        <input
          accept="image/*"
          type="file"
          onChange={imageChange}
          ref={inputRef}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
