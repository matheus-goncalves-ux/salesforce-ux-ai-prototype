import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getLeadById, LEAD_STAGES, LEAD_STAGE_INDEX } from 'data/leads';

/**
 * Field maps for the four collapsible sections in the Details tab.
 * Each entry references a property on the lead record; `fullWidth: true`
 * spans the field across the two-column grid (used for long-form text).
 */
const SECTION_DEFINITIONS = [
    {
        id: 'lead-information',
        title: 'Lead Information',
        fields: [
            { key: 'name', label: 'Name', fieldName: 'name' },
            { key: 'title', label: 'Title', fieldName: 'title' },
            { key: 'company', label: 'Company', fieldName: 'company' },
            { key: 'leadSource', label: 'Lead Source', fieldName: 'leadSource' },
            { key: 'industry', label: 'Industry', fieldName: 'industry' },
            { key: 'rating', label: 'Rating', fieldName: 'rating' },
            { key: 'status', label: 'Lead Status', fieldName: 'status' },
            { key: 'ownerName', label: 'Lead Owner', fieldName: 'ownerName' }
        ]
    },
    {
        id: 'address-information',
        title: 'Address Information',
        fields: [
            { key: 'street', label: 'Street', fieldName: 'street', fullWidth: true },
            { key: 'city', label: 'City', fieldName: 'city' },
            { key: 'state', label: 'State/Province', fieldName: 'state' },
            { key: 'postalCode', label: 'Postal Code', fieldName: 'postalCode' },
            { key: 'country', label: 'Country', fieldName: 'country' }
        ]
    },
    {
        id: 'additional-information',
        title: 'Additional Information',
        fields: [
            { key: 'numberOfEmployees', label: 'Number of Employees', fieldName: 'numberOfEmployees' },
            { key: 'annualRevenue', label: 'Annual Revenue', fieldName: 'annualRevenue' },
            { key: 'estimatedValue', label: 'Estimated Value', fieldName: 'estimatedValue' },
            { key: 'description', label: 'Description', fieldName: 'description', isTextarea: true, fullWidth: true }
        ]
    },
    {
        id: 'system-information',
        title: 'System Information',
        fields: [
            { key: 'createdDate', label: 'Created Date', fieldName: 'createdDate' },
            { key: 'lastModifiedDate', label: 'Last Modified', fieldName: 'lastModifiedDate' },
            { key: 'lastActivityDate', label: 'Last Activity', fieldName: 'lastActivityDate' },
            { key: 'isConverted', label: 'Converted', fieldName: 'isConverted' }
        ]
    }
];

const CLOSED_STAGES = new Set(['Converted', 'Unqualified']);

/**
 * Ordered list of sections the activity feed renders. The first section
 * ("Upcoming & Overdue") is always present even if empty; the per-month
 * sections only show when at least one activity falls into them. The
 * `defaultOpen` flag seeds the initial collapsed/expanded state inside
 * `ui-activity-feed` (the component manages local toggle state from there).
 */
const ACTIVITY_SECTIONS = [
    { id: 'future', label: 'Upcoming & Overdue', defaultOpen: false, alwaysShow: true },
    { id: 'jun-2026', label: 'June • 2026', defaultOpen: true },
    { id: 'may-2026', label: 'May • 2026', defaultOpen: false },
    { id: 'apr-2026', label: 'April • 2026', defaultOpen: false },
    { id: 'mar-2026', label: 'March • 2026', defaultOpen: false },
    { id: 'feb-2026', label: 'February • 2026', defaultOpen: false },
    { id: 'jan-2026', label: 'January • 2026', defaultOpen: false }
];

export default class LeadDetail extends LightningElement {
    lead = null;
    isFollowing = false;
    currentStageIndex = 0;
    openSectionIds = new Set(SECTION_DEFINITIONS.map((s) => s.id));

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.lead = getLeadById(id);
            if (this.lead) {
                // Map the lead's status to a stage index. Statuses outside the
                // path (e.g. "Unqualified") clamp to the final stage so the
                // path still renders coherently.
                const mappedIndex = LEAD_STAGE_INDEX[this.lead.status];
                this.currentStageIndex = mappedIndex ?? LEAD_STAGES.length - 1;
            }
        }
    }

    /* ---------- Page metadata ---------- */

    get hasLead() {
        return this.lead !== null;
    }

    get leadName() {
        return this.lead?.name || 'Unknown Lead';
    }

    get summaryFields() {
        if (!this.lead) return [];
        return [
            { label: 'Title', value: this.lead.title },
            { label: 'Company', value: this.lead.company },
            { label: 'Phone', value: this.lead.phone, type: 'tel' },
            { label: 'Email', value: this.lead.email, type: 'email' }
        ];
    }

    /* ---------- Follow button ---------- */

    get followLabel() { return this.isFollowing ? 'Following' : 'Follow'; }
    get followVariant() { return this.isFollowing ? 'success' : 'neutral'; }
    get followIconName() { return this.isFollowing ? 'utility:check' : 'utility:add'; }

    handleFollow() {
        this.isFollowing = !this.isFollowing;
    }

    /* ---------- Path ---------- */

    get pathSteps() {
        return LEAD_STAGES.map((stage, index) => {
            const isComplete = index < this.currentStageIndex;
            const isCurrent = index === this.currentStageIndex;
            const stateClass = isComplete
                ? 'slds-is-complete'
                : isCurrent
                    ? 'slds-is-current slds-is-active'
                    : 'slds-is-incomplete';
            return {
                name: stage.name,
                label: stage.label,
                itemClass: `slds-path__item ${stateClass}`,
                ariaSelected: isCurrent ? 'true' : 'false',
                tabindex: isCurrent ? '0' : '-1',
                isComplete,
                isCurrent
            };
        });
    }

    get isPathClosed() {
        return CLOSED_STAGES.has(this.currentStageName);
    }

    get currentStageName() {
        return LEAD_STAGES[this.currentStageIndex]?.name ?? '';
    }

    get markCompleteLabel() {
        if (this.isPathClosed) {
            return `Stage: ${this.currentStageName}`;
        }
        return `Mark Status as Complete`;
    }

    handleStepClick(event) {
        event.preventDefault();
        const name = event.currentTarget?.dataset?.name;
        const index = LEAD_STAGE_INDEX[name];
        if (typeof index === 'number') {
            this.currentStageIndex = index;
        }
    }

    handleMarkComplete() {
        if (this.isPathClosed) return;
        if (this.currentStageIndex < LEAD_STAGES.length - 1) {
            this.currentStageIndex += 1;
        }
    }

    /* ---------- Details tab (4 collapsible sections) ---------- */

    get detailSections() {
        if (!this.lead) return [];
        return SECTION_DEFINITIONS.map((section) => {
            const isOpen = this.openSectionIds.has(section.id);
            const contentId = `lead-section-${section.id}`;
            return {
                id: section.id,
                title: section.title,
                contentId,
                sectionClass: `slds-section ${isOpen ? 'slds-is-open' : 'slds-is-close'}`,
                ariaExpanded: isOpen ? 'true' : 'false',
                ariaHidden: isOpen ? 'false' : 'true',
                fields: section.fields.map((field) => ({
                    key: field.key,
                    label: field.label,
                    value: this.lead[field.fieldName] ?? '',
                    type: field.type || 'text',
                    isTextarea: !!field.isTextarea,
                    cssClass: field.fullWidth ? 'c-lead-detail__section-grid-full' : ''
                }))
            };
        });
    }

    handleSectionToggle(event) {
        const id = event.currentTarget?.dataset?.id;
        if (!id) return;
        const next = new Set(this.openSectionIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        this.openSectionIds = next;
    }

    /* ---------- Related tab ---------- */

    get purchaseIntents() {
        return this.lead?.purchaseIntents ?? [];
    }

    get hasPurchaseIntents() {
        return this.purchaseIntents.length > 0;
    }

    get purchaseIntentTitle() {
        return `Purchase Intent (${this.purchaseIntents.length})`;
    }

    get quotes() {
        return this.lead?.quotes ?? [];
    }

    get hasQuotes() {
        return this.quotes.length > 0;
    }

    get quotesTitle() {
        return `Quotes (${this.quotes.length})`;
    }

    /* ---------- Activity card ---------- */

    get activities() {
        return this.lead?.activities ?? [];
    }

    get hasActivities() {
        return this.activities.length > 0;
    }

    get activityCardTitle() {
        return `Activity History (${this.activities.length})`;
    }

    /**
     * Shape the lead's activities into the section/items structure the
     * reusable `ui-activity-feed` component expects. Sections without
     * activities are dropped unless flagged `alwaysShow` (e.g. the
     * "Upcoming & Overdue" header is kept even when empty so users always
     * see the affordance).
     */
    get activityFeedSections() {
        const groups = new Map();
        this.activities.forEach((activity) => {
            const sectionId = activity.sectionId || 'jun-2026';
            if (!groups.has(sectionId)) groups.set(sectionId, []);
            groups.get(sectionId).push(activity);
        });
        return ACTIVITY_SECTIONS
            .filter((section) => section.alwaysShow || groups.has(section.id))
            .map((section) => ({
                id: section.id,
                label: section.label,
                defaultOpen: section.defaultOpen,
                activities: groups.get(section.id) || []
            }));
    }

    /* ---------- Related contacts card ---------- */

    /**
     * Decorate each related contact with display-ready helpers:
     * - mobileHref / workHref → tel: links so the row anchors are tappable.
     * - emailHref → mailto: link.
     * - dateOfBirthLabel → human-readable date (en-US) parsed from the
     *   stored ISO YYYY-MM-DD value in the dataset.
     */
    get relatedContacts() {
        const contacts = this.lead?.relatedContacts ?? [];
        return contacts.map((contact) => ({
            ...contact,
            mobileHref: contact.mobilePhone ? `tel:${contact.mobilePhone.replace(/[^0-9+]/g, '')}` : '#',
            workHref: contact.workPhone ? `tel:${contact.workPhone.replace(/[^0-9+]/g, '')}` : '#',
            emailHref: contact.email ? `mailto:${contact.email}` : '#',
            dateOfBirthLabel: this._formatDate(contact.dateOfBirth)
        }));
    }

    get hasRelatedContacts() {
        return this.relatedContacts.length > 0;
    }

    get contactsCardTitle() {
        return `Contacts (${this.relatedContacts.length})`;
    }

    _formatDate(isoDate) {
        if (!isoDate) return '';
        const [y, m, d] = String(isoDate).split('-').map((n) => parseInt(n, 10));
        if (!y || !m || !d) return isoDate;
        const date = new Date(Date.UTC(y, m - 1, d));
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC'
        });
    }

    /* ---------- Navigation ---------- */

    handleBackToList() {
        navigate('/leads');
    }
}
