import { StateSignal } from '@ngrx/signals/src/state-signal';
import {
  DevtoolsExtension,
    ReduxAction,
  ReduxDevtoolsConnection,
  ReduxDevtoolsUnsubscriber,
  ReduxState,
} from './_types';
import { getState, patchState } from '@ngrx/signals';

type Store = StateSignal<ReduxState>;
type Session = {
  readonly connection: ReduxDevtoolsConnection, 
  readonly unsubscriber: ReduxDevtoolsUnsubscriber
}

export function reduxDevtoolsInit(instanceName: string, store: Store): Session | null {
  const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__ as DevtoolsExtension;

  if (!extension) {
    console.error('Redux Devtools not found');
    return null;
  }

  const connection = extension.connect({
    name: instanceName,
  });
  const state = getState(store);
  connection.init(state);
  const unsubscriber = connection.subscribe(msg => {
    if ((msg.type === 'DISPATCH') && (msg.payload.type === 'JUMP_TO_ACTION')) {
      const state = JSON.parse(msg.state);
      patchState(store, state);
    }else {
    }
  })

  return {connection, unsubscriber} ;
}

export function reduxDevtoolsSendStore(
  session: Session | null,
  action: ReduxAction,
  store: Store
) {
  if (!session) return;
  const state = getState(store);
  session.connection.send(action, state);
}

export function reduxDevtoolsSendObject(
  session: Session | null,
  action: ReduxAction,
  object: any
) {
  if (!session) return;
  session.connection.send(action, object);
}

export function reduxDevtoolsDestroy(session: Session | null): void {
  session?.unsubscriber();
}
