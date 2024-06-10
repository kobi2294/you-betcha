import { Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AuthStore, QueryService, SharedModule } from '@lib';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  readonly queryService = inject(QueryService);
  readonly auth = inject(AuthStore);

  readonly groups$ = toObservable(this.auth.user).pipe(
    map((user) => user?.groups || []),
    filter((groups) => groups.length > 0),
    tap((val) => console.log('Fetching data for groups:', val)),
    switchMap((groups) =>
      this.queryService
        .getGroups(groups)
        .pipe(catchError((err) => of(`Error: ${err}`)))
    ),
    takeUntilDestroyed()
  );
}
