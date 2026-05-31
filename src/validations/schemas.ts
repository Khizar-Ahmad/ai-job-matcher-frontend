import * as yup from 'yup';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  desired_job_title: yup
    .string()
    .min(2, 'Job title too short')
    .required('Desired job title is required'),
  job_preferences: yup
    .string()
    .min(10, 'Please describe your preferences (at least 10 chars)')
    .required('Job preferences are required'),
  skills: yup
    .string()
    .min(3, 'Please list your skills')
    .required('Skills are required'),
  experience_level: yup
    .string()
    .oneOf(
      ['entry', 'junior', 'mid', 'senior', 'lead', 'executive'],
      'Select a valid experience level'
    )
    .required('Experience level is required'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;

// ─── Job Process Form ─────────────────────────────────────────────────────────

export const jobProcessSchema = yup.object({
  company_name: yup.string().min(2, 'Company name too short').required('Company name is required'),
  job_title: yup.string().min(2, 'Job title too short').required('Job title is required'),
  job_description: yup
    .string()
    .min(50, 'Job description should be at least 50 characters')
    .required('Job description is required'),
  requirements: yup
    .string()
    .min(20, 'Requirements should be at least 20 characters')
    .required('Requirements are required'),
  resume: yup
    .mixed<File>()
    .test('required', 'Resume file is required', (value) => !!value)
    .test('fileType', 'Only PDF or DOCX files are allowed', (value) => {
      if (!value) return false;
      return ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
        (value as File).type
      );
    })
    .required('Resume is required'),
});

export type JobProcessFormData = yup.InferType<typeof jobProcessSchema>;

// ─── Questions Form ───────────────────────────────────────────────────────────

export const questionsSchema = yup.object({
  questions: yup
    .array()
    .of(yup.string().min(5, 'Question too short').required('Question cannot be empty'))
    .min(1, 'Add at least one question')
    .required(),
  resume: yup
    .mixed<File>()
    .test('required', 'Resume file is required', (value) => !!value)
    .test('fileType', 'Only PDF or DOCX files are allowed', (value) => {
      if (!value) return false;
      return ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
        (value as File).type
      );
    })
    .required('Resume is required'),
});

export type QuestionsFormData = yup.InferType<typeof questionsSchema>;
