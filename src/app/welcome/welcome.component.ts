import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        params: of({ id: 1 }),
      }
    }
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
