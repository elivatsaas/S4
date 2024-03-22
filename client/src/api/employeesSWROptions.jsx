export const addEmployeeOptions = (newemployee) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (employees) =>
      [...employees, newemployee].sort((a, b) => b.id - a.id),
    rollbackOnError: true,
    populateCache: (added, employees) =>
      [...employees, added].sort((a, b) => b.id - a.id),
    revalidate: false,
  };
};

export const updateEmployeeOptions = (updatedemployee) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (employees) => {
      const prevemployees = employees.filter((employee) => {
        return employee.id !== updatedemployee.id;
      });
      return [...prevemployees, updatedemployee].sort((a, b) => b.id - a.id);
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (updated, employees) => {
      const prevemployees = employees.filter((employee) => {
        return employee.id !== updatedemployee.id;
      });
      return [...prevemployees, updated].sort((a, b) => b.id - a.id);
    },
    revalidate: false,
  };
};

export const deleteEmployeeOptions = ({ id }) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (employees) => {
      return employees.filter((employee) => {
        return employee.id !== id;
      });
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (emptyResponseObj, employees) => {
      return employees.filter((employee) => {
        return employee.id !== id;
      });
    },
    revalidate: false,
  };
};
