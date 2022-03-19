import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'apps-workspace-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    public categories = [];

    constructor() {}

    ngOnInit(): void {}
}
