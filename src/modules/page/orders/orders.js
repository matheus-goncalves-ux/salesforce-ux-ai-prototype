import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllOrders } from 'data/orders';

const COLUMNS = [
    {
        label: 'Order Number',
        fieldName: 'orderNumber',
        type: 'button',
        sortable: true,
        initialWidth: 140,
        typeAttributes: {
            label: { fieldName: 'orderNumber' },
            variant: 'base',
            name: 'view'
        }
    },
    { label: 'Account Name', fieldName: 'accountName', sortable: true },
    { label: 'Owner', fieldName: 'owner', sortable: true },
    { label: 'Status', fieldName: 'status', sortable: true, initialWidth: 110 },
    {
        label: 'Order Value',
        fieldName: 'orderValueRaw',
        type: 'currency',
        sortable: true,
        cellAttributes: { alignment: 'right' },
        typeAttributes: { currencyCode: 'USD', minimumFractionDigits: 2 }
    },
    { label: 'Order Type', fieldName: 'orderType', sortable: true, initialWidth: 130 },
    { label: 'Start Date', fieldName: 'startDate', sortable: true, initialWidth: 130 },
    { label: 'Delivery Stage', fieldName: 'deliveryStage', sortable: true },
    { label: 'Last Modified', fieldName: 'lastModified', sortable: true, initialWidth: 140 },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'View', name: 'view' },
                { label: 'Edit', name: 'edit' },
                { label: 'Activate', name: 'activate' },
                { label: 'Clone', name: 'clone' },
                { label: 'Delete', name: 'delete' }
            ]
        }
    }
];

const STATUS_FILTER_OPTIONS = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Integrated', value: 'Integrated' },
    { label: 'Activated', value: 'Activated' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Cancelled', value: 'Cancelled' }
];

const TYPE_FILTER_OPTIONS = [
    { label: 'All Types', value: 'all' },
    { label: 'Standard', value: 'Standard' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Renewal', value: 'Renewal' },
    { label: 'Subscription', value: 'Subscription' },
    { label: 'Service', value: 'Service' }
];

export default class Orders extends LightningElement {
    columns = COLUMNS;
    statusFilterOptions = STATUS_FILTER_OPTIONS;
    typeFilterOptions = TYPE_FILTER_OPTIONS;

    data = [];
    sortedBy = 'orderNumber';
    sortedDirection = 'desc';
    searchTerm = '';
    statusFilter = 'all';
    typeFilter = 'all';

    connectedCallback() {
        this.data = getAllOrders();
    }

    get filteredData() {
        let rows = this.data;
        if (this.statusFilter && this.statusFilter !== 'all') {
            rows = rows.filter((row) => row.status === this.statusFilter);
        }
        if (this.typeFilter && this.typeFilter !== 'all') {
            rows = rows.filter((row) => row.orderType === this.typeFilter);
        }
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            rows = rows.filter((row) =>
                row.orderNumber.toLowerCase().includes(term) ||
                row.accountName.toLowerCase().includes(term) ||
                row.owner.toLowerCase().includes(term) ||
                row.status.toLowerCase().includes(term) ||
                row.orderType.toLowerCase().includes(term) ||
                row.deliveryStage.toLowerCase().includes(term)
            );
        }
        return rows;
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

    handleStatusFilterChange(event) {
        this.statusFilter = event.detail.value;
    }

    handleTypeFilterChange(event) {
        this.typeFilter = event.detail.value;
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const clonedData = [...this.data];

        clonedData.sort((a, b) => {
            let aVal = a[fieldName];
            let bVal = b[fieldName];

            if (aVal == null) aVal = '';
            if (bVal == null) bVal = '';

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
            navigate(`/orders/${row.id}`);
        } else if (action.name === 'delete') {
            this.data = this.data.filter((item) => item.id !== row.id);
        }
    }
}
