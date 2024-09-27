// user.component.ts

import { Component, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User, UserInit } from '../users.interface';

@Component({
  selector: 'app-user',
  template: `
    <h3>Informations sur le profil</h3>
    <nz-card [nzBordered]="true">
        <p> Prénom : {{ userInfos.name }} </p>
        <p> Nom : {{ userInfos.lastName }} </p>
        <p> Email : {{ userInfos.email }} </p>
        <p> Profil : {{ userInfos.role }} </p>
    </nz-card>
  `,
  styles: [``]
})
export class UserInformationComponent {

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    userInfos: User = new UserInit 

    ngOnInit() {
      const token = this.authService.getToken()
      if(token) {
        const userId: number = this.authService.decodeToken(token).id
        this.usersService.getUserInfos(userId)
        .subscribe(userInfos => this.userInfos = userInfos)
      }
    }

}
