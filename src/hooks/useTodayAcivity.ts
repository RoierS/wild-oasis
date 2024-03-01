import { useQuery } from '@tanstack/react-query';

import { getStaysTodayActivity } from '@/services/apiBookings';

export const useTodayActivity = () => {
  const {
    isLoading,
    data: todayActivities,
    error,
  } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  return {
    isLoading,
    todayActivities,
    error,
  };
};
