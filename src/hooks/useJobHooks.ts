import toast from 'react-hot-toast';
import { usePostData } from './useApiData';
import { useGetData } from './useApiData';
import { ENDPOINTS } from '@/api/endpoints';
import type { JobProcessResult, QuestionsResult, User } from '@/types';

// ─── Process Job Application ──────────────────────────────────────────────────

export const useProcessJob = (
  onSuccess?: (result: JobProcessResult) => void
) => {
  const mutation = usePostData<JobProcessResult>(
    (data) => {
      onSuccess?.(data);
      toast.success('Analysis complete!');
    },
    (error) => toast.error(error.message)
  );

  const submit = (payload: {
    company_name: string;
    job_title: string;
    job_description: string;
    requirements: string;
    resume: File;
  }) => {
    const form = new FormData();
    form.append('company_name', payload.company_name);
    form.append('job_title', payload.job_title);
    form.append('job_description', payload.job_description);
    form.append('requirements', payload.requirements);
    form.append('resume', payload.resume);

    mutation.mutate({
      endPoint: ENDPOINTS.AI.PROCESS,
      data: form,
      isJSONPayload: false,
    });
  };

  return { ...mutation, submit };
};

// ─── Answer Application Questions ────────────────────────────────────────────

export const useAnswerQuestions = (
  onSuccess?: (result: QuestionsResult) => void
) => {
  const mutation = usePostData<QuestionsResult>(
    (data) => {
      onSuccess?.(data);
      toast.success('Questions answered!');
    },
    (error) => toast.error(error.message)
  );

  const submit = (payload: { questions: string[]; resume: File }) => {
    const form = new FormData();
    payload.questions.forEach((q) => form.append('questions', q));
    form.append('resume', payload.resume);

    mutation.mutate({
      endPoint: ENDPOINTS.AI.QUESTIONS,
      data: form,
      isJSONPayload: false,
    });
  };

  return { ...mutation, submit };
};

// ─── Get Current User Profile ─────────────────────────────────────────────────

export const useGetProfile = () => {
  return useGetData<User>({
    endPoint: ENDPOINTS.USERS.ME,
    key: ['user', 'me'],
  });
};
