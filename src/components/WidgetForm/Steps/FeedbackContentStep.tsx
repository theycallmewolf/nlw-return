import { ArrowLeft, Camera } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  handleFeedbackReset: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  handleFeedbackReset,
}: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  return (
    <>
      <header className="flex items-center">
        <button type="button" onClick={handleFeedbackReset}>
          <ArrowLeft
            weight="bold"
            className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <div className="flex py-2 gap-2 w-full">
        <form className="my-4 w-full">
          <textarea
            className="min-w-[304px] w-full min-h-[112px] placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            placeholder="Descreva a sua dúvida"
          />
          <footer className="flex gap-2 mt-2">
            <button
              type="button"
              className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
            >
              <Camera className="w-6 h-6 text-zinc-100" />
            </button>
            <button
              type="submit"
              className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
            >
              Enviar Feedback
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
