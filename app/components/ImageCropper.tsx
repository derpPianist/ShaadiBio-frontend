import React, { useRef, useState } from "react";
import ReactCrop, {
  type Crop,
  makeAspectCrop,
  centerCrop,
  PixelCrop,
  PercentCrop,
  convertToPixelCrop,
} from "react-image-crop";
import { Button } from "@mui/material";
import setCanvasPreview from "../utils/setCanvasPreview";

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;

interface ImageCropperProps {
  updateAvatar: (imgSrc: string, imgBlob: Blob) => void;
}

const ImageCropper = ({ updateAvatar }: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState("");
  const [isCropped, setIsCropped] = useState(false);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader(); //JS native function Used to asynchronously read the contents of a file
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", () => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = imageElement;

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels");
          return setImgSrc("");
        }
      });
      console.log("uploaded IMG: ", imageUrl);
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    ); //specify crop area dimensions when appearing first

    const centredCrop = centerCrop(crop, width, height);
    setCrop(centredCrop);
  };

  const handleCropImage = () => {
    if (!imgRef.current || !previewCanvasRef.current || !crop) return;

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );

    setIsCropped(true);
  };

  const handleSaveEdits = () => {
    if (!previewCanvasRef.current || !isCropped) return;

    previewCanvasRef.current.toBlob(
      //asynchronous function
      (blob) => {
        if (!blob) return;
        const previewUrl = URL.createObjectURL(blob);
        updateAvatar(previewUrl, blob);
      },
      "image/jpeg",
      0.9,
    );
  }; //toBlob is an asynchronous function. It converts the DOM element provided by the ref and accepts a callback as argument. 

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <ReactCrop
              crop={crop} //Defines the actual crop box
              onChange={(PixelCrop, PercentCrop) => {
                setCrop(PercentCrop);
                setIsCropped(false);
              }} //move and resize the crop circle around with PixelCrop
              circularCrop //circular cropping area
              keepSelection //A boolean value which prevents selection to be cleared if a use clicks outside the croppable area
              aspect={ASPECT_RATIO} //sets dimansions of croppable area
              minWidth={MIN_DIMENSION} //sets min size of croppable area
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />{" "}
              {/* Creates the crop action when onLoad is triggered */}
            </ReactCrop>
            {crop && (
              <canvas
                ref={previewCanvasRef}
                className="mx-6"
                style={{
                  display: isCropped ? "block" : "none",
                  border: "1px solid black",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                }}
              ></canvas>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button
              sx={{ mt: 2, bgcolor: "#3e4af7", color: "#ffffff" }}
              onClick={handleCropImage}
            >
              Crop Image
            </Button>

            <Button
              sx={{ mt: 2, bgcolor: "#4caf50", color: "#ffffff" }}
              onClick={handleSaveEdits}
              disabled={!isCropped} // can't save before cropping
            >
              Save Edits
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;
