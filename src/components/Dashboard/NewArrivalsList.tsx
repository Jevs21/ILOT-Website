import { createResource, Show } from "solid-js";
import BasicVehicleList from "../../elements/BasicVehicleList/BasicVehicleList";
import { useGlobalContext } from "../../global/store";

const NewArrivalsList = (props) => {
  const {apiCall} = useGlobalContext();
  const fetchNewArrivalsList = async () => await apiCall('/vehicle/get_new_arrivals_list')
  const [vList, {mutate, refetch}] = createResource(fetchNewArrivalsList)

  return (
    <Show when={!vList.loading}>
      <BasicVehicleList
        title="New Arrivals:"
        dt_key="inventory_date"
        day_str="Arrived"
        rows={vList().list}/>
    </Show>
  );
}

export default NewArrivalsList;