import flatpickr from "flatpickr";
import { batch, createEffect, createSignal, onCleanup } from "solid-js";
import 'flatpickr/dist/flatpickr.css';
import '../style/flatpickr_custom.css';
import { Stack, TextField, Typography } from "@suid/material";
import StackRowCentered from "./StackRowCentered";
import { useGlobalContext } from "../global/store";

const DateRangePickerEl = (props) => {
  const { addInvFilter, removeInvFilter } = useGlobalContext();

  let startInputEl!: HTMLInputElement;
  let fpInstance_start!: flatpickr.Instance;
  let endInputEl!: HTMLInputElement;
  let fpInstance_end!: flatpickr.Instance;
  const [startDate, setStartDate] = createSignal<Date>();
  const [endDate, setEndDate] = createSignal<Date>();

  const removeFlatpickr = () => {
    if (fpInstance_start) {
      fpInstance_start.destroy();
    }
    if (fpInstance_end) {
      fpInstance_end.destroy();
    }
  };

  // initialize the Flatpickr instance on mount
  createEffect(() => {
    if(props.isVisible) {
      const sID = `${props.id}-date-range-start`;
      const eID = `${props.id}-date-range-end`;
      startInputEl = document.getElementById(sID) as HTMLInputElement;
      endInputEl = document.getElementById(eID) as HTMLInputElement;

      fpInstance_start = flatpickr(`#${sID}`, {
        // mode: 'range',
        defaultDate: [startDate()],
        dateFormat: 'Y-m-d',
        onOpen: () => {
          console.log(`opening datepicker start #${props.id}`);
        },
        onClose: () => {
          console.log(`closting datepicker start #${props.id}`);
        },
        onChange: (selectedDates: Date[]) => {
          const [selDate] = selectedDates;
          // props.onChange(startDate, endDate);
          if (selDate) {
            batch(() => {
              removeInvFilter(props.key, startDate());
              addInvFilter(props.key, selDate, 'date_min');
            })
            startInputEl.value = selDate.toISOString().split('T')[0];
            setStartDate(selDate);
          } else {
            removeInvFilter(props.key, startDate());
          }
          console.log(`start date changed: ${selDate}`)
        },
      }) as flatpickr.Instance;

      fpInstance_end = flatpickr(`#${eID}`, {
        // mode: 'range',
        dateFormat: 'Y-m-d',
        onOpen: () => {
          console.log(`opening datepicker end #${props.id}`);
        },
        onClose: () => {
          console.log(`closing datepicker end #${props.id}`);
        },
        onChange: (selectedDates: Date[]) => {
          const [selDate] = selectedDates;
          // props.onChange(startDate, endDate);
          if (selDate) {
            batch(() => {
              removeInvFilter(props.key, endDate());
              addInvFilter(props.key, selDate, 'date_max');
            })
            endInputEl.value = selDate.toISOString().split('T')[0];
            setEndDate(selDate);
          } else {
            removeInvFilter(props.key, endDate());
          }
          console.log(`end date changed: ${selDate}`)
        },
      }) as flatpickr.Instance;
    } else {
      removeFlatpickr();
    }
  });

  // remove the Flatpickr instance on unmount
  onCleanup(() => {
    removeFlatpickr();
  });

  return (
    <StackRowCentered  justifyContent='space-between'>
      <Stack >
        <Typography variant="body1" paddingLeft={1} paddingBottom={1}>Start Date</Typography>
        <TextField 
          size="small" type="text" 
          id={`${props.id}-date-range-start`}
          placeholder="Start Date" 
          sx={{maxWidth: 140}}/>
      </Stack>

      <Typography variant="body1" paddingTop={2}>to</Typography>

      <Stack >
        <Typography variant="body1" paddingLeft={1} paddingBottom={1}>End Date</Typography>
        <TextField 
          size="small" type="text" 
          id={`${props.id}-date-range-end`}
          placeholder="End Date"
          sx={{maxWidth: 140}}/>
        
      </Stack>
      {/* <Button onClick={() => clearDates()}>Clear</Button> */}
    </StackRowCentered>
  )
}

export default DateRangePickerEl;
