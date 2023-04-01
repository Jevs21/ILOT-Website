import { Circle, Policy } from "@suid/icons-material";
import { Grid, Typography } from "@suid/material";
import { For, Show } from "solid-js";
import StackRowCentered from "../../elements/StackRowCentered";
import RouteContainer from "../RouteContainer";

const PolicyPage = (props) => {
  return (
    <RouteContainer title={props.policy.title} icon={<Policy fontSize="large"/>}>
      <Grid item container padding={2} xs={12}>

        <For each={props.policy.content}>{(section) =>
          <Grid item container xs={12} paddingBottom={2}>
            <Grid item xs={12}>
              <Typography variant="body2" fontSize="0.9em" paddingBottom={1}>{section.title.toLocaleUpperCase()}</Typography>
            </Grid>
            <For each={section.body}>{(sub) =>
              <Grid item xs={12}>
                <Show 
                  when={sub.t == "list_item"} 
                  fallback={<Typography paddingBottom={1}>{sub.content}</Typography>}>
                    <StackRowCentered>
                      <Circle sx={{fontSize: "0.5em"}}/>
                      <Typography>{sub.content}</Typography>
                    </StackRowCentered>
                </Show>
              </Grid>
            }</For>
          </Grid>
        }</For>
        
      </Grid>
    </RouteContainer>
  )
}

export default PolicyPage;