import { createResource, Show } from "solid-js";
import BasicVehicleList from "../../elements/BasicVehicleList/BasicVehicleList";
import { useGlobalContext } from "../../global/store";

const NeedsAttentionList = (props) => {
  const {apiCall} = useGlobalContext();
  const fetchNeedsAttentionList = async () => await apiCall('/vehicle/get_needs_attention_list')
  const [vList, {mutate, refetch}] = createResource(fetchNeedsAttentionList)

  return (
    <Show when={!vList.loading}>
      <BasicVehicleList
        title="Needs Attention:"
        dt_key="last_change"
        day_str="Last activity"
        rows={vList().list}/>
    </Show>
  );
}

export default NeedsAttentionList;