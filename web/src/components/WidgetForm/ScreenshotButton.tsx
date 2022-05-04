import { Camera, Trash } from "phosphor-react";
import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import { Loading } from "../Loading";
import { backgroundSize } from "html2canvas/dist/types/css/property-descriptors/background-size";

interface ScreenshotButtonProps {
  screenshot: string | null;
  setScreenshot: React.Dispatch<React.SetStateAction<string | null>>;
  disabled?: boolean | undefined;
}

export function ScreenshotButton({
  setScreenshot,
  screenshot,
  disabled,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  const takeScreenshot = useCallback(async () => {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    setScreenshot(base64image);
    setIsTakingScreenshot(false);
  }, []);

  const removeScreenshot = useCallback(() => setScreenshot(null), []);

  if (screenshot)
    return (
      <button
        type="button"
        onClick={removeScreenshot}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          // DEV
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );

  return (
    <button
      type="button"
      onClick={takeScreenshot}
      disabled={disabled}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-zinc-800"
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  );
}
