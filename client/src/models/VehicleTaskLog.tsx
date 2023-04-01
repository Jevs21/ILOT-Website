
export default interface VehicleTaskLog {
  id: number,
  t_id: number,
  v_id: number,
  uuid: string,
  operation: string,
  to_uuid: string,
  to_task: string,
  to_completed: boolean,
  dt: string,
  text: string
}