import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { UsersService, User } from '@apps-workspace/users';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
    public users: User[] = [];
    public unsubscribe$: Subject<void> = new Subject();

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this User?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService
                    .deleteUser(userId)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe({
                        next: () => {
                            this._getUsers();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'User is deleted!'
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'User is not deleted!'
                            });
                        }
                    });
            }
        });
    }

    updateUser(userid: string) {
        this.router.navigateByUrl(`users/form/${userid}`);
    }

    private _getUsers() {
        this.usersService
            .getUsers()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((users) => {
                this.users = users;
            });
    }

    getCountryName(countryKey: string) {
        return countryKey ? this.usersService.getCountry(countryKey) : '';
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
