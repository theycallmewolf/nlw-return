import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
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

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
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
