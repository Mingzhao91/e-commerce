import { Component, OnInit } from '@angular/core';

import { UsersService } from '@apps-workspace/users';

@Component({
    selector: 'ngshop-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ngshop';

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.usersService.initAppSession();
    }
}
