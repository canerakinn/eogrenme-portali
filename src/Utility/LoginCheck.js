import react from "react";
import { Users } from "../Data/Users";

//userno ile pw'sinin doğru girilip girilmediğini kontrol ediyor, LogUser=giriş Bilgilerine eşitse TRUE.
let LogUser= null;
const LoginCheck = (props) => {
  for (var index = 0; index < Users.length; index++) {
    if (
      props[0] === Users[index].userno &&
      props[1] === Users[index].password
    ) {
      LogUser = Users[index];
      return true;
    }
  }
  LogUser = null;
  alert("Hatalı Giriş!");
  return false;
};

export {LogUser};
export default LoginCheck;