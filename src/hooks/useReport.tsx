import {
  getAllReports,
  getReportById,
  createReport,
  patchReport,
  deleteReport,
} from '@/apis/reports';
import type { TReport } from '@/Types/allTypes';
import type { UseMutationResult } from '@tanstack/react-query';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

// Get all reports hook
export const useReportState = () => {
  return useQuery({
    queryKey: ['reports'],  // plural and changed to reports
    queryFn: getAllReports,
  });
};

// Get report by id hook
export const useReportIdState = (id: number) => {
  return useQuery({
    queryKey: ['reports', id],  // added id to queryKey for caching specific report
    queryFn: () => getReportById(id),
    enabled: !!id,
  });
};

// Create report hook
export const useCreateReportState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addReport'],
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'], exact: true });
    },
  });
};

// Patch report hook
type PatchReports = { id: number; report: TReport };
export const usePatchReportState = (): UseMutationResult<
  TReport,
  Error,
  PatchReports
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['patchReport'],
    mutationFn: ({ id, report }: PatchReports) => patchReport(report, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'], exact: true });
    },
  });
};

// Delete report hook
export const useDeleteReportState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteReport'],
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'], exact: true });
    },
  });
};
