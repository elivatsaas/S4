import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import useSWR from "swr";

import {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  schedulesUrlEndpoint as cacheKey,
} from "../../api/schedulesApi";

import {
  addScheduleOptions,
  updateScheduleOptions,
  deleteScheduleOptions,
} from "../../api/schedulesSWROptions";

const ScheduleList = () => {
  const [newSchedule, setNewSchedule] = useState("");

  const { isLoading, error, data, mutate } = useSWR(cacheKey, getSchedules);
  const schedules = JSON.stringify(data);
  return (
    <div>
      <h1>your data </h1>
      {schedules}
    </div>
  );
};

export default ScheduleList;
