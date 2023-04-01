import { Grid, Modal, Typography } from "@suid/material";
import { createMemo, createSignal, For, Show } from "solid-js";
import VehicleLog from "../../models/VehicleLog";
import CardEl from "../CardEl";
import VehicleActivityHistoryDaySummary from "./VehicleActivityHistoryDaySummary";
import VehicleActivityHistoryDayToday from "./VehicleActivityHistoryDayToday";
import VehicleActivityHistoryNoneRow from "./VehicleActivityHistoryNoneRow";
import style from "../../global/style";
import VehicleActivityHistoryModal from "./VehicleActivityHistoryModal";

const VehicleActivityHistory = (props) => {
  const [open, setOpen] = createSignal(false);
  const [modalDay, setModalDay] = createSignal('');
  const [modalLogs, setModalLogs] = createSignal([] as VehicleLog[]);
  const rowClicked = (d: string, logs: VehicleLog[]) => {
    setModalDay(d);
    setModalLogs(logs);
    setOpen(true);
  }
  const [hist, setHist] = createSignal(Object.entries(props.history))
  const todayLog = createMemo(() => {
    const today = new Date();
    for (let cur of hist()) {
      if (cur[0] as string == today.toISOString().substring(0, 10)) {
        return cur[1] as VehicleLog[];
      }
    }
    return [] as VehicleLog[];
  })

  const [showAll, setShowAll] = createSignal(false);
  const histList = createMemo(() => {
    if (showAll()) {
      return hist();
    } else {
      return hist().slice(0, 5);
    }
  })
  return (
    <>
      <CardEl>
        <Grid container item xs={12}>
          <Show 
            when={hist().length > 0}
            fallback={<VehicleActivityHistoryNoneRow/>}>
              <VehicleActivityHistoryDayToday log={todayLog()} onClick={() => rowClicked("Today", todayLog())}/>
              <For each={histList()}>{(day, i) => 
                <VehicleActivityHistoryDaySummary 
                data={day} 
                sx={(i() % 2 == 0) ? style.treven : style.trodd}
                onClick={() => rowClicked(day[0] as string, day[1] as VehicleLog[])}/>
              }</For>

              <Show when={hist().length > 5}>
                <Grid item xs={12}>
                  <Typography 
                    align="center" 
                    variant="body2" 
                    paddingY={2}
                    onClick={() => setShowAll(!showAll())}>
                      {!showAll() && `SHOW (${hist().length - 5}) MORE DAYS`}
                      {showAll()  && `HIDE (${hist().length - 5}) DAYS`}
                  </Typography>
                </Grid>
              </Show>
          </Show>
        </Grid>
      </CardEl>
      <Modal open={open()} onClose={() => setOpen(false)}>
        <VehicleActivityHistoryModal dayStr={modalDay()} logs={modalLogs()}/>
      </Modal>
    </>
  );
}

export default VehicleActivityHistory;