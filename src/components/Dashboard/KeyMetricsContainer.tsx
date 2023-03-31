import { Card, Grid } from "@suid/material";
import { createSignal, For } from "solid-js";
import KeyMetrics from "../../elements/KeyMetrics";

export default function KeyMetricsContainer() {
  const [metrics, setMetrics] = createSignal([
    { key: 'Key Metric', val: '332', size: 'large' },
    { key: 'Metric 1', val: '12', size: 'small' },
    { key: 'Metric 2', val: '18.9', size: 'small' },
    { key: 'Metric 3', val: '44', size: 'small' },
  ]);

  return (
    <Card>
      <Grid 
        container 
        spacing={0}
        margin={0}
        padding={2}
        alignItems="baseline">
        <For each={metrics()}>{(met, i) =>
          <Grid item margin={0} padding={0} xs={3}>
            <KeyMetrics size={met.size} val={met.val} key={met.key}/>
          </Grid>  
        }</For>
      </Grid>
    </Card>
  );
}