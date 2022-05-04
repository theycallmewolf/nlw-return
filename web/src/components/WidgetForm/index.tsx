import { useState } from "react";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import {
  FeedbackTypeStep,
  FeedbackContentStep,
  FeedbackSuccessStep,
} from "./Steps";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

/**
 * Object.entries(feedbackTypes)
 * @returns
 * [
 *    ['BUT', {...}],
 *    ['IDEA', {...}],
 *    ['OTHER', {...}]
 * ]
 */

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleFeedbackReset() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep handleFeedbackReset={handleFeedbackReset} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep setFeedbackType={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              handleFeedbackReset={handleFeedbackReset}
              setFeedbackSent={setFeedbackSent}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        {"Feito com ♥ por "}
        <a
          href="https://www.theycallmewolf.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          TheyCallMeWolf
        </a>
      </footer>
    </div>
  );
}
