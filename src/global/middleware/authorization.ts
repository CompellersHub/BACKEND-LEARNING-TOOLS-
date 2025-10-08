import { Action } from "routing-controllers";
import { getUserFromRequest } from "../utils";

export const authorizationChecker = async (action: Action, roles: string[]) => {
  const user = await getUserFromRequest(action.request);

  if (user && !roles.length) return true;
  // return roles.some((role) => user.role.includes(role));
  if (user && roles.find((role) => user.role.indexOf(role) !== -1)) {
    return true;
  }

  return false;
};

export const currentUserChecker = async (action: Action) => {
  return getUserFromRequest(action.request);
};
