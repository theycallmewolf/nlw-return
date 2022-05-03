import { ChatTeardropDots } from "phosphor-react";
import { useCallback, useState } from "react";

export function Widget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = useCallback(() => setIsOpen((state) => !state), []);

  return (
    <div className="absolute bottom-5 right-5">
      {isOpen && <p>Hello Wolf</p>}

      <button
        className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group"
        onClick={toggleVisibility}
      >
        <ChatTeardropDots className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2" />
          Feedback
        </span>
      </button>
    </div>
  );
}
