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

      it("should't be able to submit a feedback without a `type`", async () => {
        await expect(
          submitFeedback.execute({
            type: "",
            comment: "mock",
            screenshot: "data:image/png;base64,MOCK",
          })
        ).rejects.toThrow();
      });

      it("should't be able to submit a feedback without a `comment`", async () => {
        await expect(
          submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,MOCK",
          })
        ).rejects.toThrow();
      });

      it("should't be able to submit a feedback with an invalid `screenshot`", async () => {
        await expect(
          submitFeedback.execute({
            type: "BUG",
            comment: "mock",
            screenshot: "INVALID",
          })
        ).rejects.toThrow();
      });
    });
