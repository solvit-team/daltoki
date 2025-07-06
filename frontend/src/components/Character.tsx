import React from "react";
import { ClipboardCopy, Download } from "lucide-react";
import { toast } from "sonner";
import tokiImage from "../assets/toki.png";
import { Button } from "./ui/button";

interface CharacterProps {
  message?: string;
  onCopy?: () => void;
  onDownload?: () => void;
}

const Character: React.FC<CharacterProps> = ({
  message,
  onCopy,
  onDownload,
}) => {
  const defaultMessage = "sitelen pona here...";
  const displayMessage = message || defaultMessage;
  const hasCustomMessage = message && message !== defaultMessage;
  const handleCopy = () => {
    if (hasCustomMessage) {
      navigator.clipboard.writeText(displayMessage);
      toast("메시지가 클립보드에 복사되었습니다");
      onCopy?.();
    }
  };

  const handleDownload = () => {
    toast("sitelen pona 이미지를 저장합니다.");
    onDownload?.();
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* 배경 캐릭터 영역 */}
        <div className="flex justify-center">
          <img
            src={tokiImage}
            alt="Toki character"
            className="w-5/6 max-w-[500px] object-contain"
          />
        </div>
        {/* 말풍선 영역 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10/12">
          <div className="bg-white/75 rounded-lg shadow-sm">
            <div className="flex flex-col p-2 gap-2.5">
              {/* sitelen pona 텍스트 영역 */}
              <div className="flex justify-center items-center p-2">
                <p
                  className={`text-sm text-center ${
                    hasCustomMessage ? "text-black" : "text-gray-400"
                  }`}
                >
                  {displayMessage}
                </p>
              </div>
              {/* 버튼 목록 */}
              {hasCustomMessage && (
                <div className="flex justify-end items-center">
                  <Button variant={"ghost"} size="icon" onClick={handleCopy}>
                    <ClipboardCopy strokeWidth={1.5} color="black" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size="icon"
                    onClick={handleDownload}
                  >
                    <Download strokeWidth={1.5} color="black" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
