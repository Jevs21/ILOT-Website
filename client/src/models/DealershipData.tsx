
interface DealershipUserData {
  uuid: string;
  full_name: string;
}

export default interface DealershipData {
  dealership_name: string;
  latitude: number;
  longitude: number;
  status_keys: string[];
  user_list: DealershipUserData[];
}