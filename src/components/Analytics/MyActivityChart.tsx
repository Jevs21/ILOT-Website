import { createResource } from "solid-js";
import ChartEl from "../../elements/Chart/ChartEl";
import { useGlobalContext } from "../../global/store";


const MyActivityChart = (props) => {
  const {apiCall} = useGlobalContext();
  const fetchMyActivity = async () => (await apiCall('/analytics/get_my_activity'));
  const [activityData, {mutate, refetch}] = createResource(fetchMyActivity);

  return (
    <>
      <canvas id={props.id}></canvas>
      {
        !activityData.loading &&
        <ChartEl 
          canvasId={props.id}
          data={activityData()}/>
      }
    </>
  );
}

export default MyActivityChart;