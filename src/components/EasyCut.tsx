import { useState } from "preact/hooks";
import Cropper, { Area, Point } from "react-easy-crop";
import { FlexRow } from "./Flex";
import { Rnd } from "react-rnd";

const EasyCut = ({}: {}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImage) return;
      console.log("donee", { croppedImage });
      if (croppedImage) setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file =
      target.files && target.files.length > 0 ? target.files[0] : null;
    if (file) {
      let imageDataUrl = await readFile(file);
      if (typeof imageDataUrl === "string") {
        setImageSrc(imageDataUrl);
      }
    }
  };

  return (
    <Rnd>
      <>
        {imageSrc && (
          <>
            <div className={``}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{
                  containerClassName: "h-[512px] w-[512px]",
                }}
              />
            </div>
            <div className={``}>
              <div className={``}>
                Zoom
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(zoom)}
                />
              </div>
              <button onClick={showCroppedImage}>Show Result</button>
            </div>
            <img
              src={croppedImage ? croppedImage : ""}
              onClose={onClose}
              className="h-[512px]"
            />
          </>
        )}
        <input type="file" onChange={onFileChange} accept="image/*" />
      </>
    </Rnd>
  );
};

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function readFile(file: File) {
  return new Promise<string | ArrayBuffer | null>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  // calculate bounding box of the rotated image
  const bBoxWidth = image.width;
  const bBoxHeight = image.height;

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise<string>((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      }
    }, "image/png");
  });
}

export default EasyCut;
