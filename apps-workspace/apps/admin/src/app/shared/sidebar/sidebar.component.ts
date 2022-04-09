import { Component } from '@angular/core';

import { AuthService } from '@apps-workspace/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(private authService: AuthService) {}

    logoutUser() {
        this.authService.logout();
    }
}
