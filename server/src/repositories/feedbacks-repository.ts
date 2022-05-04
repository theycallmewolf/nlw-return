export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackCreateResult {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<FeedbackCreateResult>;
}
