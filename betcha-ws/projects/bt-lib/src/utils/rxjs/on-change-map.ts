import { Observable, Subscriber, Subscription } from 'rxjs';

export function onChangeMap<T, R>(project: (value: T) => Observable<R>) {
  return (source: Observable<T>): Observable<R> => {
    return new Observable<R>((subscriber: Subscriber<R>) => {
      let innerSubscription: Subscription | null = null;
      let latestValue: T | undefined = undefined;
      let hasLatestValue = false;

      const sourceSubscription = source.subscribe({
        next(value) {
          const shouldSubscribe =
            (innerSubscription === null) || (!hasLatestValue) || (value !== latestValue); // switch if new value
          latestValue = value;
          hasLatestValue = true;

          if (shouldSubscribe) {
            if (innerSubscription) {
              innerSubscription.unsubscribe(); // Unsubscribe from the previous inner Observable
            }
            let innerObservable;
            try {
              innerObservable = project(value);
            } catch (err) {
              subscriber.error(err);
              return;
            }
            innerSubscription = innerObservable.subscribe({
              next(innerValue) {
                subscriber.next(innerValue);
              },
              error(err) {
                subscriber.error(err);
              },
              complete() {
                innerSubscription = null;
                if (sourceSubscription.closed) {
                  subscriber.complete();
                }
              },
            });
          }
        },
        error(err) {
          subscriber.error(err);
        },
        complete() {
          if (!innerSubscription) {
            subscriber.complete();
          }
        },
      });

      return () => {
        if (innerSubscription) {
          innerSubscription.unsubscribe();
        }
        sourceSubscription.unsubscribe();
      };
    });
  };
}
