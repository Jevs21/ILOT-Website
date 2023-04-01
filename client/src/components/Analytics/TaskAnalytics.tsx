import { Stack, Typography } from "@suid/material";
import { Show, createResource, createMemo } from "solid-js";
import SectionHeaderEl from "../../elements/SectionHeaderEl";
import { useGlobalContext } from "../../global/store";

const TaskAnalytics = (props) => {
  const {apiCall} = useGlobalContext();
  const fetchTaskStats = async () => await apiCall('/analytics/get_task_stats')
  const [taskStats, {mutate, refetch}] = createResource(fetchTaskStats);
  const test = createMemo(() => {
    if (!taskStats.loading) {
      return taskStats().test
    }
    return '';
  })
  return (
    <Show when={!taskStats.loading}>
      <SectionHeaderEl>TASK ANALYTICS</SectionHeaderEl>
      <Stack width="100%" spacing={1}>
        <Typography>{test()}</Typography>
      </Stack>
    </Show>
  );
}

export default TaskAnalytics;