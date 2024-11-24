import { useState } from "preact/hooks";
import Cropper, { Area, Point } from "react-easy-crop";
import { FlexCol, FlexRow } from "./Flex";
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
    console.log("imageSrc", imageSrc);
    console.log("croppedAreaPixels", croppedAreaPixels);
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
    <>
      {imageSrc && (
        <Rnd
          id={"EasyCut"}
          disableDragging={true}
          enableResizing={false}
          default={{
            x: window.innerWidth / 2 - 256,
            y: window.innerHeight * 0.1,
            width: 512,
            height: window.innerHeight * 0.8,
          }}
        >
          <FlexCol className={`overflow-scroll h-full`}>
            <div className="h-auto">
              <div className="relative h-[512px]">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  classes={{
                    containerClassName: "h-[512px] w-[512px]",
                  }}
                  objectFit="cover"
                />
              </div>
              <FlexRow>
                <label htmlFor="">Zoom</label>

                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    setZoom(target.valueAsNumber);
                  }}
                />
              </FlexRow>
              <button onClick={showCroppedImage}>Show Result</button>
              {croppedImage && (
                <img
                  src={croppedImage ? croppedImage : ""}
                  onClose={onClose}
                  className="h-[512px]"
                />
              )}
            </div>
          </FlexCol>
        </Rnd>
      )}

      <input type="file" onChange={onFileChange} accept="image/*" />
    </>
  );
};

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    if (!url.startsWith("data:")) {
      image.setAttribute("crossOrigin", "anonymous");
    }
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

  console.log("getCroppedImg", { image, pixelCrop, canvas, ctx });
  console.log(ctx);
  if (!ctx) {
    return null;
  }

  // set canvas size to match the bounding box
  canvas.width = image.width;
  canvas.height = image.height;

  // translate canvas context to a central location to allow rotating and flipping around the center
  //ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  //ctx.translate(-image.width / 2, -image.height / 2);

  //console.log("drawImage", image);
  //// draw rotated image
  ctx.drawImage(image, 0, 0);

  console.log("drawImage", image);
  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;
  console.log("croppedCanvas", croppedCanvas);
  console.log("croppedCtx", croppedCtx);
  console.log(canvas);
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
  console.log("croppedCtx", croppedCtx);
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
