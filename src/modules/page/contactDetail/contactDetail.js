import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getContactById } from 'data/contacts';
import { getAccountsForContact } from 'data/accounts';

const DETAIL_FIELDS = [
    { key: 'name', label: 'Full Name', fieldName: 'name' },
    { key: 'company', label: 'Account Name', fieldName: 'company' },
    { key: 'title', label: 'Title', fieldName: 'title' },
    { key: 'department', label: 'Department', fieldName: 'department' },
    { key: 'email', label: 'Email', fieldName: 'email', type: 'email' },
    { key: 'phone', label: 'Phone', fieldName: 'phone', type: 'tel' },
    { key: 'mobile', label: 'Mobile', fieldName: 'mobile', type: 'tel' },
    { key: 'mailingAddress', label: 'Mailing Address', fieldName: 'mailingAddress' },
    { key: 'description', label: 'Description', fieldName: 'description', component: 'textarea', fullWidth: true }
];

const CHATTER_POSTS = [
    { id: 'c1', author: 'Sarah Johnson', date: '2 hours ago', body: 'Just had a great call with this contact — very interested in our Q3 offering. Following up next week.', likes: ['👍 3'] },
    { id: 'c2', author: 'Mark Torres', date: 'Yesterday', body: 'Sent over the updated deck. Let me know if you need any changes before the meeting.', likes: [] },
    { id: 'c3', author: 'Lisa Chen', date: '3 days ago', body: 'Added to the enterprise nurture track. Will loop in Solutions next week.', likes: ['👍 1', '🎉 2'] }
];

const ACTIVITY_ITEMS = [
    { id: 'a1', type: 'call', iconName: 'standard:log_a_call', subject: 'Follow-up call', date: '3 days ago', description: 'Discussed renewal timeline and next steps.' },
    { id: 'a2', type: 'email', iconName: 'standard:email', subject: 'Proposal sent', date: '1 week ago', description: 'Sent updated pricing proposal via email.' },
    { id: 'a3', type: 'event', iconName: 'standard:event', subject: 'Quarterly review meeting', date: '2 weeks ago', description: 'Reviewed Q4 results and Q1 goals.' },
    { id: 'a4', type: 'call', iconName: 'standard:log_a_call', subject: 'Introductory call', date: '1 month ago', description: 'Initial discovery call to understand requirements.' }
];

export default class ContactDetail extends LightningElement {
    contact = null;
    isFollowing = false;
    activityItems = ACTIVITY_ITEMS;
    chatterPosts = CHATTER_POSTS;
    relatedAccounts = [];

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.contact = getContactById(id);
            this.relatedAccounts = getAccountsForContact(id);
        }
    }

    get hasContact() {
        return this.contact !== null;
    }

    get hasRelatedAccounts() {
        return this.relatedAccounts.length > 0;
    }

    get accountsCardTitle() {
        return `Accounts (${this.relatedAccounts.length})`;
    }

    /**
     * Cover image rendered at the top of the Account Flexicard. Left empty
     * so the component falls back to its neutral placeholder; populate
     * `src` with a real URL once imagery is available for this account.
     */
    get accountImage() {
        return { src: '', alt: '' };
    }

    /**
     * Demo data for the Account Flexicard in the left column. Mirrors the
     * three-section structure from the Figma reference: a "client details"
     * header block, a "Financeiro" block with sub-grouped overdue ageing
     * and an emphasised available-credit total, and a final "BIN" block.
     * Hard-coded for now; wire to live data once the source system fields
     * are mapped.
     */
    get accountFlexicardSections() {
        return [
            {
                id: 'client-details',
                rows: [
                    { label: 'CPF/CNPJ', value: '12.345.678/0001-95' },
                    { label: 'Telefone', value: '(81) 99999-8888', tone: 'link' },
                    { label: 'Endereço principal', value: 'Obter direções', tone: 'link' }
                ]
            },
            {
                id: 'financial',
                title: 'Financeiro',
                rows: [
                    { label: 'Limite de Crédito', value: 'R$ 3.000,00' },
                    { label: 'Saldo CREDMOURA', value: 'R$ 1.200,00', tone: 'success' },
                    { label: 'Adiantamento', value: 'R$ 300,00', tone: 'success' },
                    { label: 'Títulos em Aberto', value: 'R$ 850,00', tone: 'danger' },
                    { label: 'A Vencer', value: 'R$ 400,00', isSubItem: true },
                    { label: 'Vencidos (0 a 30 dias)', value: 'R$ 350,00', isSubItem: true },
                    { label: 'Vencidos (30 a 60 dias)', value: 'R$ 350,00', isSubItem: true },
                    { label: 'Vencidos (60 a 90 dias)', value: 'R$ 350,00', isSubItem: true },
                    { label: 'Vencidos (Mais de 90 dias)', value: 'R$ 350,00', isSubItem: true },
                    { label: 'Média de dias em atraso', value: '31', isSubItem: true },
                    {
                        label: 'Limite de Crédito Disponível',
                        value: 'R$ 3.050,00',
                        tone: 'success',
                        isEmphasis: true,
                        hasDividerAbove: true
                    }
                ]
            },
            {
                id: 'bin',
                title: 'BIN',
                rows: [
                    { label: 'A retornar', value: '809,21 kg' },
                    { label: 'Não retornado', value: '93 kg', tone: 'danger' }
                ]
            }
        ];
    }

    get cardFields() {
        if (!this.contact) return [];
        return DETAIL_FIELDS.map(field => ({
            ...field,
            value: field.fieldName === 'mailingAddress'
                ? this.mailingAddress
                : this.contact[field.fieldName],
            isTextarea: field.component === 'textarea',
            cssClass: field.fullWidth ? 'c-contact-details-grid__full-width' : ''
        }));
    }

    get contactName() {
        return this.contact?.name || 'Unknown Contact';
    }

    get detailFields() {
        if (!this.contact) return [];
        return [
            { label: 'Company', value: this.contact.company },
            { label: 'Title', value: this.contact.title },
            { label: 'Email', value: this.contact.email, type: 'email' },
            { label: 'Phone', value: this.contact.phone, type: 'tel' }
        ];
    }

    get mailingAddress() {
        if (!this.contact) return '';
        const c = this.contact;
        return `${c.mailingStreet}, ${c.mailingCity}, ${c.mailingState} ${c.mailingZip}`;
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

    handleBackToList() {
        navigate('/contacts');
    }
}
