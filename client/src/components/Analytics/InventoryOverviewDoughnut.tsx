import ChartDoughnut from "../../elements/Chart/ChartDoughnut";
import style from "../../global/style";
import { useGlobalContext } from '../../global/store';
import { createMemo } from "solid-js";
import { Stack } from "@suid/material";

const InventoryOverviewDoughnut = (props) => {
  const { statusKeys } = useGlobalContext();
  const formattedData = createMemo(() => statusKeys().map((item, i) => (props.data[i] === undefined) ? 0 : props.data[i] ) )
  return (
    <Stack maxHeight='250px'>
      <ChartDoughnut 
        labels={statusKeys()} 
        dataLabels={'Vehicles'}
        data={formattedData()} 
        colors={style.palette.status.map(col => col.backgroundColor)}/>
    </Stack>
  )
}

export default InventoryOverviewDoughnut;