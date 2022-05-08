import { FormEvent, useCallback, useMemo, useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  handleFeedbackReset: () => void;
  setFeedbackSent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FeedbackContentStep({
  feedbackType,
  handleFeedbackReset,
  setFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  const feedbackTypeInfo = useMemo(() => feedbackTypes[feedbackType], []);

  const submitFeedback = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      setIsSending(true);

      // TO-DO
      console.log({
        screenshot,
        comment,
      });

      setFeedbackSent(true);
      setIsSending(false);
    },
    [screenshot, comment]
  );

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
        <form onSubmit={submitFeedback} className="my-4 w-full">
          <textarea
            onChange={(evt) => setComment(evt.target.value)}
            className="min-w-[304px] w-full min-h-[112px] placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            placeholder="Descreva a sua dúvida"
          />
          <footer className="flex gap-2 mt-2">
            <ScreenshotButton
              setScreenshot={setScreenshot}
              screenshot={screenshot}
              disabled={comment.length === 0}
            />
            <button
              type="submit"
              disabled={comment.length === 0 || isSending}
              className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              {isSending ? <Loading /> : "Enviar Feedback"}
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
