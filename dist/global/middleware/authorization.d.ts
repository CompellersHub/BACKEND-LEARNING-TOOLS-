import { Action } from "routing-controllers";
export declare const authorizationChecker: (action: Action, roles: string[]) => Promise<boolean>;
export declare const currentUserChecker: (action: Action) => Promise<import("../../app/user/interface").AuthUser>;
