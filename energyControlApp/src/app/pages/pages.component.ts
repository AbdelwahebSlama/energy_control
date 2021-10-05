import {Component} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbMenuService} from '@nebular/theme';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;

  constructor(menu: NbMenuService, private authService: AuthService, private router: Router) {
    menu.onItemClick().subscribe((nbMenu) => {
        // .... do what you want
        //   if (nbMenu['item']['title'] === 'Log-out') {
        //     this.authService.logOut().subscribe(
        //       () => {
        //         this.router.navigate(['/login']);
        //       },
        //     );
        //   }
        // });
        if (nbMenu['item']['title'] === 'Log-out') {
          this.authService.logOut();
        }
      },
    );
  }
}
