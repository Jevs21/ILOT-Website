import UserData from "./UserData";

export default interface LoggedUserData extends UserData {
  token: string;
  email: string;
  auth: boolean;
  username: string;
  u_role: string;
  is_first_login: boolean;
}