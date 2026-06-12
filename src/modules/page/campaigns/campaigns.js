import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllCampaigns } from 'data/campaigns';

/**
 * Campaigns object-home list view. Mirrors the conventions used by the
 * leads list page: searchable + sortable datatable seeded from the
 * `data/campaigns` fixture, row actions navigate into the detail page.
 */
const COLUMNS = [
    {
        label: 'Campaign Name',
        fieldName: 'name',
        type: 'button',
        sortable: true,
        typeAttributes: {
            label: { fieldName: 'name' },
            variant: 'base',
            name: 'view'
        }
    },
    { label: 'Type', fieldName: 'type', sortable: true },
    { label: 'Status', fieldName: 'status', sortable: true },
    { label: 'Start Date', fieldName: 'startDate', sortable: true },
    { label: 'End Date', fieldName: 'endDate', sortable: true },
    { label: 'Budgeted Cost', fieldName: 'budgetedCost', sortable: true },
    { label: 'Expected Revenue', fieldName: 'expectedRevenue', sortable: true },
    { label: 'Owner', fieldName: 'ownerName', sortable: true },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'View', name: 'view' },
                { label: 'Edit', name: 'edit' },
                { label: 'Clone', name: 'clone' },
                { label: 'Delete', name: 'delete' }
            ]
        }
    }
];

export default class Campaigns extends LightningElement {
    columns = COLUMNS;
    data = [];
    sortedBy = 'name';
    sortedDirection = 'asc';
    searchTerm = '';

    connectedCallback() {
        this.data = getAllCampaigns();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.data;
        }
        const term = this.searchTerm.toLowerCase();
        return this.data.filter((campaign) =>
            campaign.name.toLowerCase().includes(term) ||
            (campaign.type || '').toLowerCase().includes(term) ||
            (campaign.status || '').toLowerCase().includes(term) ||
            (campaign.ownerName || '').toLowerCase().includes(term)
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
            navigate(`/campaigns/${row.id}`);
        } else if (action.name === 'delete') {
            this.data = this.data.filter((item) => item.id !== row.id);
        }
    }
}
