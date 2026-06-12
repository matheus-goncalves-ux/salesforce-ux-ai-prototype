import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllLeads } from 'data/leads';

const COLUMNS = [
    {
        label: 'Name',
        fieldName: 'name',
        type: 'button',
        sortable: true,
        typeAttributes: {
            label: { fieldName: 'name' },
            variant: 'base',
            name: 'view'
        }
    },
    { label: 'Company', fieldName: 'company', sortable: true },
    { label: 'Title', fieldName: 'title', sortable: true },
    { label: 'Status', fieldName: 'status', sortable: true },
    { label: 'Rating', fieldName: 'rating', sortable: true },
    { label: 'Owner', fieldName: 'ownerName', sortable: true },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Email', fieldName: 'email', type: 'email' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'View', name: 'view' },
                { label: 'Edit', name: 'edit' },
                { label: 'Convert', name: 'convert' },
                { label: 'Delete', name: 'delete' }
            ]
        }
    }
];

export default class Leads extends LightningElement {
    columns = COLUMNS;
    data = [];
    sortedBy = 'name';
    sortedDirection = 'asc';
    searchTerm = '';

    connectedCallback() {
        this.data = getAllLeads();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.data;
        }
        const term = this.searchTerm.toLowerCase();
        return this.data.filter((lead) =>
            lead.name.toLowerCase().includes(term) ||
            lead.company.toLowerCase().includes(term) ||
            lead.title.toLowerCase().includes(term) ||
            lead.status.toLowerCase().includes(term) ||
            (lead.email || '').toLowerCase().includes(term)
        );
    }

    get metaText() {
        const count = this.filteredData.length;
        const sortField = this.columns.find((c) => c.fieldName === this.sortedBy)?.label;
        let text = `${count} item${count !== 1 ? 's' : ''}`;
        if (sortField) {
            text += ` \u2022 Sorted by ${sortField}`;
        }
        text += ' \u2022 Updated a few seconds ago';
        return text;
    }

    handleSearch(event) {
        this.searchTerm = event.detail.value;
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const clonedData = [...this.data];

        clonedData.sort((a, b) => {
            let aVal = a[fieldName] ?? '';
            let bVal = b[fieldName] ?? '';

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        this.data = clonedData;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;

        if (action.name === 'view') {
            navigate(`/leads/${row.id}`);
        } else if (action.name === 'delete') {
            this.data = this.data.filter((item) => item.id !== row.id);
        }
    }
}
