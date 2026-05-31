// ─── Auth & User ─────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  desired_job_title: string;
  job_preferences: string;
  skills: string;
  experience_level: string;
}

export interface AuthData {
  access_token: string;
  user: User;
}

export interface AuthResponse {
  message: string;
  data: AuthData;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  desired_job_title: string;
  job_preferences: string;
  skills: string;
  experience_level: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ─── Job Processing ───────────────────────────────────────────────────────────

export interface JobProcessResult {
  match_percentage: number;
  resume_skills: string[];
  job_skills: string[];
  cover_letter: string;
}

export interface QuestionsResult {
  success: boolean;
  questions_and_answers: { question: string; answer: string }[];
}

// ─── API Hooks Params ─────────────────────────────────────────────────────────

export interface Param {
  name: string;
  value: string | number | boolean;
}

export interface POSTDataParamsIF {
  endPoint: string;
  data: FormData | Record<string, unknown>;
  isJSONPayload?: boolean;
  params?: Param[];
}

export interface GETDataActionParams {
  endPoint: string;
  key: string[];
  params?: Param[];
  successHandler?: (data: unknown, pagy?: unknown) => void;
  enabled?: boolean;
}

export interface DELETEDataParamsIF {
  endPoint: string;
  data?: unknown;
}

export interface UPDATEDataParamsIF {
  endPoint: string;
  data: FormData | Record<string, unknown>;
  isJSONPayload?: boolean;
  method?: 'put' | 'patch';
}

export interface ApiError {
  detail: string;
  message?: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: AuthData) => void;
  logout: () => void;
}
