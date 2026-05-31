import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import type {
  POSTDataParamsIF,
  DELETEDataParamsIF,
  UPDATEDataParamsIF,
  Param,
  ApiError,
} from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildQueryString = (params?: Param[]): string => {
  if (!params || params.length === 0) return '';
  return params
    .filter(Boolean)
    .map((p, i) => `${i === 0 ? '?' : '&'}${p.name}=${p.value}`)
    .join('');
};

const extractErrorMessage = (error: unknown): string =>
  (error as AxiosError<ApiError>)?.response?.data?.detail ??
  (error as AxiosError<ApiError>)?.response?.data?.message ??
  'Something went wrong!';

// ─── Actions ──────────────────────────────────────────────────────────────────

export const postData = async ({ endPoint, data, isJSONPayload = false, params }: POSTDataParamsIF) => {
  try {
    const qs = buildQueryString(params);
    const response = await axiosInstance.post(`${endPoint}${qs}`, data, {
      ...(isJSONPayload && { headers: { 'Content-Type': 'application/json' } }),
    });
    return response;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const getData = async ({ endPoint, params }: { endPoint: string; params?: Param[] }) => {
  try {
    const qs = buildQueryString(params);
    return await axiosInstance.get(`${endPoint}${qs}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteData = async ({ endPoint, data }: DELETEDataParamsIF) => {
  try {
    return await axiosInstance.delete(endPoint, { data });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateData = async ({
  endPoint,
  data,
  isJSONPayload = false,
  method = 'put',
}: UPDATEDataParamsIF) => {
  try {
    return await axiosInstance[method](endPoint, data, {
      ...(isJSONPayload && { headers: { 'Content-Type': 'application/json' } }),
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
