import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usePostData } from './useApiData';
import { useAuth } from '@/context/AuthContext';
import { ENDPOINTS } from '@/api/endpoints';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types';

// ─── Register Hook ────────────────────────────────────────────────────────────

export const useRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return usePostData<AuthResponse>(
    (data) => {
      login(data.data);
      toast.success(data.message || 'Account created!');
      navigate('/dashboard');
    },
    (error) => toast.error(error.message)
  );
};

// ─── Login Hook ───────────────────────────────────────────────────────────────

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return usePostData<AuthResponse>(
    (data) => {
      login(data.data);
      toast.success(data.message || 'Welcome back!');
      navigate('/dashboard');
    },
    (error) => toast.error(error.message)
  );
};

// ─── Submit Helpers ───────────────────────────────────────────────────────────

export const useSubmitLogin = () => {
  const mutation = useLogin();

  const submit = (payload: LoginPayload) => {
    const form = new FormData();
    // FastAPI JSON body – send as JSON
    mutation.mutate({
      endPoint: ENDPOINTS.AUTH.LOGIN,
      data: payload,
      isJSONPayload: true,
    });
  };

  return { ...mutation, submit };
};

export const useSubmitRegister = () => {
  const mutation = useRegister();

  const submit = (payload: RegisterPayload) => {
    mutation.mutate({
      endPoint: ENDPOINTS.AUTH.REGISTER,
      data: payload,
      isJSONPayload: true,
    });
  };

  return { ...mutation, submit };
};
