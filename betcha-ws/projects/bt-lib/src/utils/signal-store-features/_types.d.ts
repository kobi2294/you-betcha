export type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;
export type RxMethod<Input> = ((input: RxMethodInput<Input>) => Unsubscribable) & Unsubscribable;

export type InputStore<Input extends SignalStoreFeatureResult> = Prettify<
  SignalStoreSlices<Input['state']> &
    Input['signals'] &
    Input['methods']>;


export interface ReduxDevtoolsStartMessage {
    readonly type: 'START';
    readonly state: undefined;
    readonly id: undefined;
    readonly source: typeof source;
  }
  
  export interface ReduxDevtoolsStopMessage {
    readonly type: 'STOP';
    readonly state: undefined;
    readonly id: undefined;
    readonly source: typeof source;
    readonly failed?: boolean;
  }
  
  export interface ReduxDevtoolsJumpToActionPayload {
    type: 'JUMP_TO_ACTION';
    actionId: number;
  }
  
  export interface ReduxDevtoolsJumpToStatePayload {
    type: 'JUMP_TO_STATE';
    index: number;
  }
  
  export interface ReduxDevtoolsDispatchMessage {
    readonly type: 'DISPATCH';
    readonly payload: ReduxDevtoolsJumpToStatePayload | ReduxDevtoolsJumpToActionPayload;
    readonly state: string;
    readonly id: string;
    readonly source: string;
  }
  
  interface ReduxDevtoolsActionMessage {
    readonly type: 'ACTION';
    readonly payload: string | CustomAction;
    readonly state: string | undefined;
    readonly id: string;
    readonly source: string;
  }
  
  export type ReduxDevtoolsMessage =
    ReduxDevtoolsDispatchMessage
    | ReduxDevtoolsStartMessage
    | ReduxDevtoolsStopMessage
    ;
  
  export type ReduxState = Object;
  
  export type ReduxActionType = string;
  
  export type ReduxAction = string | { type: ReduxActionType };
  
  export type ReduxDevtoolsListener = (msg: ReduxDevtoolsMessage) => void;
  export type ReduxDevtoolsUnsubscriber = () => void;
  
  export interface ReduxDevtoolsConnection {
    send: (action: ReduxAction, state: ReduxState) => void;
    init: (state: ReduxState) => void;
    subscribe: (listener: ReduxDevtoolsListener) => ReduxDevtoolsUnsubscriber;
  }
  
  export type DevtoolsExtension = 
  | {
  connect: (options: { name: string }) => ReduxDevtoolsConnection, 
  }
| undefined;



declare global {

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: DevtoolsExtension;
  }
}

  