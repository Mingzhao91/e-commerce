import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { timer } from 'rxjs';

import { MessageService } from 'primeng/api';

import { UsersService, User } from '@apps-workspace/users';

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId: string;
    countries = [];

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initUserForm();
        this._checkeditMode();
    }

    private _initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: ['']
        });
    }

    private _addUser(user: User) {
        this.usersService.createUser(user).subscribe(
            (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name} is created!`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not created!'
                });
            }
        );
    }

    private _updateUser(user: User) {
        this.usersService.updateUser(user).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User is updated!'
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not updated!'
                });
            }
        );
    }

    private _checkeditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentUserId = params['id'];
                this.usersService.getUser(params['id']).subscribe((user) => {
                    this.form.get('name')?.setValue(user.name);
                    this.form.get('email')?.setValue(user.email);
                    this.form.get('phone')?.setValue(user.phone);
                    this.form.get('isAdmin')?.setValue(user.isAdmin);
                    this.form.get('street')?.setValue(user.street);
                    this.form.get('apartment')?.setValue(user.apartment);
                    this.form.get('zip')?.setValue(user.zip);
                    this.form.get('city')?.setValue(user.city);
                    this.form.get('country')?.setValue(user.country);

                    this.form.get('password')?.setValidators([]);
                    this.form.get('password')?.updateValueAndValidity();
                });
            }
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const user: User = {
            id: this.currentUserId,
            name: this.form.value.name,
            email: this.form.value.email,
            phone: this.form.value.phone,
            isAdmin: this.form.value.isAdmin,
            street: this.form.value.street,
            apartment: this.form.value.apartment,
            zip: this.form.value.zip,
            city: this.form.value.city,
            country: this.form.value.country
        };
        if (this.editMode) {
            this._updateUser(user);
        } else {
            this._addUser(user);
        }
    }

    onCancle() {
        this.location.back();
    }

    get userForm() {
        return this.form.controls;
    }
}
