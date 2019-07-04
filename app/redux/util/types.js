export type GlobalState = {
  authStore: Object,
  requestStore: Object,
  dummyStore: Object,
};

export type Action = { type: string, payload?: Object };
// export type Action = {
//   type: string,
//   payload?: {
//     id: string | number,
//     key: string,
//     response?: any,
//     error?: any,
//     options?: {
//       successAction?: Action | Action[],
//       failureAction?: Action | Action[],
//       responseActionName?: string,
//     },
//     progress?: number,
//     request?: {
//       method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
//       route?: string,
//       params?: any,
//       directory?: string,
//       file?: Object,
//       fileName?: string,
//     },
//   },
// };

export type ActionCreator = (params?: any) => Action;

export type ActionDispatcher = Action => Function;

export type RequestObject = {
  sending: boolean,
  error: boolean,
  success: boolean,
  message: string,
  response: any,
};

export type RequestProgessObject = {
  sending: boolean,
  error: boolean,
  success: boolean,
  message: string,
  progress: number,
  response?:
    | any
    | {
        downloadURL?: string,
      },
};
