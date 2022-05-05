import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
  {
    create: async () => ({
      id: "1",
      type: "BUG",
      comment: "mock",
      screenshot: "mock.jpeg",
    }),
  },
  { sendMail: async () => {} }
);

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "mock",
        screenshot: "data:image/png;base64,MOCK",
      })
    ).resolves.not.toThrow();
  });
});
