import { useContext } from "react";
import UserContext from "./UserContext";

const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export default useUser;
