import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
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

    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "mock",
        screenshot: "mock.jpeg",
      })
    ).resolves.not.toThrow();
  });
});
