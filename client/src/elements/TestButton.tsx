import Button from "@suid/material/Button";
import { createSignal } from "solid-js";

export default function TestButton() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount((c) => c+1)
  return (
    <Button onClick={increment} variant="contained">Hello world {count()}</Button>
  );
}
