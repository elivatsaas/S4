export const addScheduleOptions = (newSchedule) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (schedules) =>
      [...schedules, newSchedule].sort((a, b) => b.id - a.id),
    rollbackOnError: true,
    populateCache: (added, schedules) =>
      [...schedules, added].sort((a, b) => b.id - a.id),
    revalidate: false,
  };
};

export const updateScheduleOptions = (updatedSchedule) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (schedules) => {
      const prevSchedules = schedules.filter((schedule) => {
        return schedule.id !== updatedSchedule.id;
      });
      return [...prevSchedules, updatedSchedule].sort((a, b) => b.id - a.id);
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (updated, schedules) => {
      const prevSchedules = schedules.filter((schedule) => {
        return schedule.id !== updatedSchedule.id;
      });
      return [...prevSchedules, updated].sort((a, b) => b.id - a.id);
    },
    revalidate: false,
  };
};

export const deleteScheduleOptions = ({ id }) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (schedules) => {
      return schedules.filter((schedule) => {
        return schedule.id !== id;
      });
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (emptyResponseObj, schedules) => {
      return schedules.filter((schedule) => {
        return schedule.id !== id;
      });
    },
    revalidate: false,
  };
};
