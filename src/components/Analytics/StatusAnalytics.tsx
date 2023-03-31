import { Stack, Typography } from "@suid/material";
import { Show, For, createMemo, createResource } from "solid-js";
import CardEl from "../../elements/CardEl";
import SectionHeaderEl from "../../elements/SectionHeaderEl";
import StackRowCentered from "../../elements/StackRowCentered";
import StatusChip from "../../elements/StatusChip";
import { getStringFromTimeDiff } from "../../global/helpers";
import { useGlobalContext } from "../../global/store";

const StatusAnalytics = (props) => {
  const {apiCall, statusKeys} = useGlobalContext();
  const fetchStatusTimeline = async () => await apiCall('/analytics/get_status_timeline')
  const [statusTimeline, {mutate, refetch}] = createResource(fetchStatusTimeline);

  const getAvgTransitionTime = (trans): number => {
    if (!trans) {
      return 0
    }
    return trans.reduce((partial, a) => partial + a, 0) / trans.length;
  }

  const getFullTransitionTime = createMemo(() => {
    if (!statusTimeline.loading) {
      let sum = 0
      for(let i=1; i < statusKeys().length; i++) {
        sum += getAvgTransitionTime(statusTimeline().transitions[`${i-1}_${i}`])
      }
      console.log(sum)
      return sum / (1000 * 60 * 60);
    }
    return '';
  })
  
  return (
    <Show when={!statusTimeline.loading}>
      <SectionHeaderEl>STATUS ANALYTICS</SectionHeaderEl>
      {/* <Grid item xs={12}> */}
        <Stack width="100%" spacing={1}>
          <For each={statusKeys()}>{(skey, i) =>
            <CardEl>
              <StackRowCentered paddingX={2} paddingY={1} justifyContent='space-between'>
                
                <StatusChip status_id={i()}/>
                                
                <Stack padding={1} minWidth="200px">
                  {/* <Typography variant="body2">Forward: {statusTimeline()[skey].forward}</Typography>
                  <Typography variant="body2">Backward: {statusTimeline()[skey].backward}</Typography> */}
                  <Show 
                    when={i() < statusKeys().length - 1}
                    fallback={<Typography>-</Typography>}>
                      <Typography align="right" paddingRight={3}>Average Time: {getStringFromTimeDiff(getAvgTransitionTime(statusTimeline().transitions[`${i()}_${i()+1}`]))}</Typography>
                  </Show>
                </Stack>
              
              </StackRowCentered>
            </CardEl>
          }</For>
        </Stack>
      {/* </Grid> */}
    </Show>
  )
}

export default StatusAnalytics;