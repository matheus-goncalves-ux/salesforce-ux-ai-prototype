import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getAccountById, getContactIdsForAccount } from 'data/accounts';
import { getContactsByIds } from 'data/contacts';

const DETAIL_FIELDS = [
    { key: 'name', label: 'Account Name', fieldName: 'name' },
    { key: 'industry', label: 'Industry', fieldName: 'industry' },
    { key: 'type', label: 'Type', fieldName: 'type' },
    { key: 'rating', label: 'Rating', fieldName: 'rating' },
    { key: 'ownership', label: 'Ownership', fieldName: 'ownership' },
    { key: 'employees', label: 'Employees', fieldName: 'employees' },
    { key: 'annualRevenue', label: 'Annual Revenue', fieldName: 'annualRevenue' },
    { key: 'phone', label: 'Phone', fieldName: 'phone', type: 'tel' },
    { key: 'website', label: 'Website', fieldName: 'website', type: 'url' },
    { key: 'accountOwner', label: 'Account Owner', fieldName: 'accountOwner' },
    { key: 'billingAddress', label: 'Billing Address', fieldName: 'billingAddress' },
    { key: 'description', label: 'Description', fieldName: 'description', component: 'textarea', fullWidth: true }
];

const ACTIVITY_ITEMS = [
    { id: 'a1', type: 'event', iconName: 'standard:event', subject: 'Executive briefing', date: '2 days ago', description: 'Hosted C-level briefing covering platform roadmap and AI capabilities.' },
    { id: 'a2', type: 'email', iconName: 'standard:email', subject: 'Renewal proposal', date: '5 days ago', description: 'Sent renewal proposal with revised volume tiers.' },
    { id: 'a3', type: 'call', iconName: 'standard:log_a_call', subject: 'Quarterly check-in', date: '2 weeks ago', description: 'Reviewed adoption metrics and outstanding support cases.' },
    { id: 'a4', type: 'task', iconName: 'standard:task', subject: 'Prep success plan', date: '3 weeks ago', description: 'Drafted FY success plan deliverables for executive sponsor.' }
];

const ORDERS = [
    { id: 'o1', number: 'ORD-10245', status: 'Activated', amount: '$245,000', date: 'Mar 12, 2026', iconName: 'standard:orders' },
    { id: 'o2', number: 'ORD-10198', status: 'Draft', amount: '$58,400', date: 'Feb 28, 2026', iconName: 'standard:orders' },
    { id: 'o3', number: 'ORD-10112', status: 'Activated', amount: '$132,750', date: 'Jan 15, 2026', iconName: 'standard:orders' },
    { id: 'o4', number: 'ORD-09984', status: 'Cancelled', amount: '$12,000', date: 'Dec 02, 2025', iconName: 'standard:orders' }
];

const FILES = [
    { id: 'f1', name: 'Master Services Agreement.pdf', type: 'PDF', size: '1.2 MB', updated: '3 days ago', iconName: 'doctype:pdf' },
    { id: 'f2', name: 'FY26 Success Plan.pptx', type: 'PowerPoint', size: '4.7 MB', updated: '1 week ago', iconName: 'doctype:ppt' },
    { id: 'f3', name: 'Renewal Quote v3.xlsx', type: 'Spreadsheet', size: '320 KB', updated: '2 weeks ago', iconName: 'doctype:excel' },
    { id: 'f4', name: 'Executive Briefing Notes.docx', type: 'Word', size: '88 KB', updated: '3 weeks ago', iconName: 'doctype:word' }
];

const ALERTS = [
    { id: 'al1', message: 'Lembrete: Por favor, verifique com o concessionário dentro de 30 dias após o seu serviço.' },
    { id: 'al2', message: 'Aviso: Não se esqueça de visitar o concessionário para um acompanhamento dentro de 30 dias após o seu serviço.' },
    { id: 'al3', message: 'Alerta: Lembre-se de retornar ao concessionário dentro de 30 dias após o seu serviço.' },
    { id: 'al4', message: 'Atenção: Certifique-se de visitar o concessionário dentro de 30 dias após o seu serviço.' },
    { id: 'al5', message: 'Lembrete: Você deve retornar ao concessionário dentro de 30 dias após o seu serviço.' }
];

export default class AccountDetail extends LightningElement {
    account = null;
    isFollowing = false;
    activityItems = ACTIVITY_ITEMS;
    orders = ORDERS;
    files = FILES;
    alerts = ALERTS;
    relatedContacts = [];

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.account = getAccountById(id);
            const contactIds = getContactIdsForAccount(id);
            this.relatedContacts = getContactsByIds(contactIds);
        }
    }

    get hasAccount() {
        return this.account !== null;
    }

    get hasRelatedContacts() {
        return this.relatedContacts.length > 0;
    }

    get contactsCardTitle() {
        return `Contacts (${this.relatedContacts.length})`;
    }

    get alertsCardTitle() {
        return `Alertas (${this.alerts.length})`;
    }

    get ordersCardTitle() {
        return `Orders (${this.orders.length})`;
    }

    get filesCardTitle() {
        return `Files (${this.files.length})`;
    }

    get hasOrders() {
        return this.orders.length > 0;
    }

    get hasFiles() {
        return this.files.length > 0;
    }

    get hasAlerts() {
        return this.alerts.length > 0;
    }

    get cardFields() {
        if (!this.account) return [];
        return DETAIL_FIELDS.map(field => ({
            ...field,
            value: field.fieldName === 'billingAddress'
                ? this.billingAddress
                : this.account[field.fieldName],
            isTextarea: field.component === 'textarea',
            cssClass: field.fullWidth ? 'c-account-details-grid__full-width' : ''
        }));
    }

    get accountName() {
        return this.account?.name || 'Unknown Account';
    }

    get detailFields() {
        if (!this.account) return [];
        return [
            { label: 'Type', value: this.account.type },
            { label: 'Industry', value: this.account.industry },
            { label: 'Phone', value: this.account.phone, type: 'tel' },
            { label: 'Website', value: this.account.website, type: 'url' }
        ];
    }

    get billingAddress() {
        if (!this.account) return '';
        const a = this.account;
        return `${a.billingStreet}, ${a.billingCity}, ${a.billingState} ${a.billingZip}`;
    }

    get followVariant() {
        return this.isFollowing ? 'success' : 'neutral';
    }

    get followLabel() {
        return this.isFollowing ? 'Following' : 'Follow';
    }

    get followIconName() {
        return this.isFollowing ? 'utility:check' : 'utility:add';
    }

    handleFollow() {
        this.isFollowing = !this.isFollowing;
    }

    handleContactClick(event) {
        event.preventDefault();
        const id = event.currentTarget?.dataset?.id;
        if (id) {
            navigate(`/contacts/${id}`);
        }
    }

    handleBackToList() {
        navigate('/accounts');
    }
}
