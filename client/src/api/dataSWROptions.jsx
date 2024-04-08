export const addDataOptions = (newData) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (data) => [...data, newData].sort((a, b) => b.id - a.id),
    rollbackOnError: true,
    populateCache: (added, data) =>
      [...data, added].sort((a, b) => b.id - a.id),
    revalidate: false,
  };
};

export const updateDataOptions = (updatedData) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (data) => {
      const prevData = data.filter((data) => {
        return data.id !== updatedData.id;
      });
      return [...prevData, updatedData].sort((a, b) => b.id - a.id);
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (updated, data) => {
      const prevData = data.filter((data) => {
        return data.id !== updatedData.id;
      });
      return [...prevData, updated].sort((a, b) => b.id - a.id);
    },
    revalidate: false,
  };
};

export const deleteDataOptions = ({ id }) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (data) => {
      return data.filter((data) => {
        return data.id !== id;
      });
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (emptyResponseObj, data) => {
      return data.filter((data) => {
        return data.id !== id;
      });
    },
    revalidate: false,
  };
};
