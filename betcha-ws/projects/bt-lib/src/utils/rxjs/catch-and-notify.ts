import { inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { Observable, catchError, of, tap } from "rxjs";



export function rxNotifier(postAction: () => void = () => {}) {
    const notify = inject(NotificationsService);

    function catchAndNotify<T>(onSuccess: string, localPostAction: (() => void) | null = null) {    
        const action = localPostAction || postAction;
        return (source: Observable<T>) => source.pipe(
            tap({
                next: () => {if (onSuccess) {notify.success(onSuccess)}}, 
                error: err => notify.error(err), 
                finalize: () => action()
            }),
            catchError(() => of(null))
        );
    }

    return (onSuccess: string, localPostAction: (() => void) | null = null) => catchAndNotify(onSuccess, localPostAction);
}