import { Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AuthStore, QueryService, SharedModule } from '@lib';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { GroupsStore } from '../../stores/groups.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  readonly groupsStore = inject(GroupsStore);
  
 
}
