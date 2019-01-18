import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Testdata } from './domain/testdata';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    // encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    private globalfilterColumns: Array<string> = [];
    public data: Testdata[];
    public columns = [];
    public columnDefs = [];
    public subChildColumns = [];
    public cols = [{
        ColumnOrder: 0,
        GridColumnsId: 90,
        ParentColumnId: null,
        cellClass: null,
        childClass: null,
        children: null,
        columnTemplate: 'testTemplate',
        customSortColumn: null,
        field: "Resident",
        hasChildren: true,
        headerName: "Resident",
        isSearchable: true,
        suppressWordWrap: false,
        width: null
    }, {
        ColumnOrder: 0,
        GridColumnsId: 91,
        ParentColumnId: null,
        cellClass: null,
        childClass: null,
        children: null,
        columnTemplate: null,
        customSortColumn: null,
        field: "AdlRugsIVDistribution",
        hasChildren: false,
        headerName: "ADL RUGs IV<br />  Distribution",
        isSearchable: null,
        suppressWordWrap: false,
        width: null
    }, {
        ColumnOrder: 0,
        GridColumnsId: 92,
        ParentColumnId: null,
        cellClass: null,
        childClass: null,
        children: null,
        columnTemplate: null,
        customSortColumn: null,
        field: "CurrentAdlRugsIV",
        hasChildren: false,
        headerName: "Current ADL<br /> RUGs IV",
        isSearchable: null,
        suppressWordWrap: false,
        width: null
    }, {
        ColumnOrder: 0,
        GridColumnsId: 93,
        ParentColumnId: null,
        cellClass: null,
        childClass: null,
        children: null,
        columnTemplate: null,
        customSortColumn: null,
        field: "ADLdtFormatted",
        hasChildren: false,
        headerName: "ADL Date",
        isSearchable: null,
        suppressWordWrap: false,
        width: null
    }];

    public gridOptions: any;

    constructor() { }

    ngOnInit() {
        this.data = [
            {
                ADLdtFormatted: "09/30/2018",
                AdlRugsIVDistribution: "A",
                CurrentAdlRugsIV: 1,
                Resident: "Alaniz1, Alison long desc hdksjd shdjkash djhasjkdhas hdjkhsa kjdasjkhdjkashdkjashkjd kjas (3526)",
                HasChildRows: true,
                ChildRows:[{
                    ADLdtFormatted: "09/30/2018",
                    AdlRugsIVDistribution: "A",
                    CurrentAdlRugsIV: 1,
                    Resident: "Alaniz1, Alison (3526)",
                    HasChildRows: true
                },
                {
                    ADLdtFormatted: "09/03/2018",
                    AdlRugsIVDistribution: "B",
                    CurrentAdlRugsIV: 2,
                    Resident: "Alaniz2, Alison (3526)",
                    HasChildRows: true
                }]
            },
            {
                ADLdtFormatted: "09/03/2018",
                AdlRugsIVDistribution: "B",
                CurrentAdlRugsIV: 2,
                Resident: "Alaniz2, Alison (3526)",
                HasChildRows: true
            },
            {
                ADLdtFormatted: "05/30/2018",
                AdlRugsIVDistribution: "C",
                CurrentAdlRugsIV: 3,
                Resident: "Alaniz3, Alison (3526)",
                HasChildRows: true
            },
            {
                ADLdtFormatted: "09/30/2018",
                AdlRugsIVDistribution: "D",
                CurrentAdlRugsIV: 4,
                Resident: "Alaniz4, Alison (3526)",
                HasChildRows: true
            },
            {
                ADLdtFormatted: "09/30/2018",
                AdlRugsIVDistribution: "E",
                CurrentAdlRugsIV: 5,
                Resident: "Alaniz5, Alison (3526)",
                HasChildRows: true
            },
            {
                ADLdtFormatted: "09/30/2018",
                AdlRugsIVDistribution: "D",
                CurrentAdlRugsIV: 4,
                Resident: "Alaniz6, Alison (3526)",
                HasChildRows: true
            },
            {
                ADLdtFormatted: "09/30/2018",
                AdlRugsIVDistribution: "E",
                CurrentAdlRugsIV: 5,
                Resident: "Alaniz7, Alison (3526)",
                HasChildRows: true
            }
        ]

        this.gridOptions = {
            ChartName: "ADL RUGs IV Distribution Detail",
            RowTitleEnabled: true,
            allowRowGrouping: true,
            columnDefs: this.cols,
            exportDisabled: false,
            isSearchRestricted: false,
            pagination: true,
            reportKey: null,
            rowClick: this.getResidentDetail,
            rowClickEnabled: true,
            selectedRow: null,
            sorttype: "AdlRugsIVDistribution",
            tableClass: "financialdetail_table",
            tableId: "#adldistdetail",
            templateid: "adldistdetail",
            sortable:true,
            dataKey: 'Resident'
        }
        this.loadGrid();
    }

    getResidentDetail(rowData, index){
        alert(rowData.Resident + " : Row Clicked");
    }
    onRowClick($event){
        this.gridOptions.rowClick($event.data, $event.index);
    }

    public loadGrid() {
        // Compute the child of each column into a flat array.
        this.columns = [];
        this.columnDefs = [];
        this.subChildColumns = [];
        if (this.gridOptions !== null && this.gridOptions.columnDefs.length > 0) {
            this.gridOptions.columnDefs.forEach(column => {
                if (column.children) {
                    column.children.forEach(child => {
                        this.columns.push({ parent: column, child: child });
                        if (child.children) {
                            child.children.forEach(subChild => {
                                this.subChildColumns.push({ parent: column, subChild: subChild });
                                this.columnDefs.push(subChild);
                            });
                        }
                        else {
                            this.columnDefs.push(child);
                        }
                    });
                } else {
                    this.columns.push({ parent: column });
                    this.columnDefs.push(column);
                }
            });
        }
        this.globalfilterColumns = [];
        this.columnDefs.forEach(col => {
            if (col.field && col.field !== '' && col.isSearchable) {
                this.globalfilterColumns.push(col.field);
            }
        });
    }

    public getColspan(column): number {
        var colspan = 1;
        if (column.children) {
            colspan = 0;
            column.children.forEach(function (child) {
                colspan = colspan + (child.children ? child.children.length : 0);
            });
            if (colspan < column.children.length) {
                colspan = column.children.length;
            }
        }
        return colspan;
    };
}
