import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { postData, getData, updateData, deleteData } from '@/api/actions';
import type {
  POSTDataParamsIF,
  GETDataActionParams,
  UPDATEDataParamsIF,
  DELETEDataParamsIF,
} from '@/types';

// ─── POST ─────────────────────────────────────────────────────────────────────

export const usePostData = <TResponse = unknown>(
  successHandler?: (data: TResponse) => void,
  errorHandler?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async ({ endPoint, data, isJSONPayload, params }: POSTDataParamsIF) => {
      const response = await postData({ endPoint, data, isJSONPayload, params });
      return response.data as TResponse;
    },
    onSuccess: (data) => {
      successHandler?.(data);
    },
    onError: (error: Error) => {
      if (errorHandler) {
        errorHandler(error);
      } else {
        toast.error(error.message || 'Something went wrong!');
      }
    },
  });
};

// ─── GET ──────────────────────────────────────────────────────────────────────

export const useGetData = <TData = unknown>({
  endPoint,
  key,
  params,
  successHandler,
  enabled = true,
}: GETDataActionParams) => {
  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const response = await getData({ endPoint, params });
      const data = response.data as TData;
      successHandler?.(data);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export const useUpdateData = <TResponse = unknown>(
  successHandler?: (data: TResponse) => void,
  errorHandler?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async ({ endPoint, data, isJSONPayload, method }: UPDATEDataParamsIF) => {
      const response = await updateData({ endPoint, data, isJSONPayload, method });
      return response.data as TResponse;
    },
    onSuccess: (data) => {
      successHandler?.(data);
    },
    onError: (error: Error) => {
      if (errorHandler) {
        errorHandler(error);
      } else {
        toast.error(error.message || 'Something went wrong!');
      }
    },
  });
};

// ─── DELETE ───────────────────────────────────────────────────────────────────

export const useDeleteData = <TResponse = unknown>(
  successHandler?: (data: TResponse) => void,
  errorHandler?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async ({ endPoint, data }: DELETEDataParamsIF) => {
      const response = await deleteData({ endPoint, data });
      return response.data as TResponse;
    },
    onSuccess: (data) => {
      successHandler?.(data);
    },
    onError: (error: Error) => {
      if (errorHandler) {
        errorHandler(error);
      } else {
        toast.error(error.message || 'Something went wrong!');
      }
    },
  });
};
