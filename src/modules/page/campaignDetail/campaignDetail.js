import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getCampaignById } from 'data/campaigns';

/**
 * Field maps for the four collapsible sections in the Details tab.
 * Each entry references a property on the campaign record; `fullWidth: true`
 * spans the field across the two-column grid (used for long-form text).
 */
const SECTION_DEFINITIONS = [
    {
        id: 'campaign-information',
        title: 'Campaign Information',
        fields: [
            { key: 'name', label: 'Campaign Name', fieldName: 'name' },
            { key: 'type', label: 'Type', fieldName: 'type' },
            { key: 'status', label: 'Status', fieldName: 'status' },
            { key: 'ownerName', label: 'Campaign Owner', fieldName: 'ownerName' },
            { key: 'parentCampaign', label: 'Parent Campaign', fieldName: 'parentCampaign' },
            { key: 'description', label: 'Description', fieldName: 'description', isTextarea: true, fullWidth: true }
        ]
    },
    {
        id: 'campaign-schedule',
        title: 'Schedule',
        fields: [
            { key: 'startDate', label: 'Start Date', fieldName: 'startDate' },
            { key: 'endDate', label: 'End Date', fieldName: 'endDate' }
        ]
    },
    {
        id: 'campaign-financials',
        title: 'Financials',
        fields: [
            { key: 'budgetedCost', label: 'Budgeted Cost', fieldName: 'budgetedCost' },
            { key: 'actualCost', label: 'Actual Cost', fieldName: 'actualCost' },
            { key: 'expectedRevenue', label: 'Expected Revenue', fieldName: 'expectedRevenue' },
            { key: 'expectedResponse', label: 'Expected Response %', fieldName: 'expectedResponse' },
            { key: 'numSent', label: 'Num Sent', fieldName: 'numSent' }
        ]
    },
    {
        id: 'campaign-system',
        title: 'System Information',
        fields: [
            { key: 'createdDate', label: 'Created Date', fieldName: 'createdDate' },
            { key: 'lastModifiedDate', label: 'Last Modified', fieldName: 'lastModifiedDate' }
        ]
    }
];

/**
 * Empty-state activity card. The campaign starts with no activity history
 * so the feed renders just one section header with empty-state copy plus
 * a feed-level footer note. The shape matches the props supported by
 * the reusable `ui-activity-feed` component.
 */
const ACTIVITY_SECTIONS = [
    {
        id: 'future',
        label: 'Upcoming & Overdue',
        defaultOpen: true,
        activities: [],
        emptyTitle: 'No activities to show.',
        emptyDescription: 'Get started by sending an email, scheduling a task, and more.'
    }
];

const ACTIVITY_FOOTER_TEXT = 'No past activity. Completed meetings and tasks appear here.';

export default class CampaignDetail extends LightningElement {
    campaign = null;
    isFollowing = false;
    openSectionIds = new Set(SECTION_DEFINITIONS.map((s) => s.id));

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.campaign = getCampaignById(id);
        }
    }

    /* ---------- Page metadata ---------- */

    get hasCampaign() {
        return this.campaign !== null;
    }

    get campaignName() {
        return this.campaign?.name || 'Unknown Campaign';
    }

    get summaryFields() {
        if (!this.campaign) return [];
        return [
            { label: 'Type', value: this.campaign.type },
            { label: 'Status', value: this.campaign.status },
            { label: 'Start Date', value: this.campaign.startDate },
            { label: 'End Date', value: this.campaign.endDate },
            { label: 'Owner', value: this.campaign.ownerName }
        ];
    }

    /* ---------- Follow button ---------- */

    get followLabel() { return this.isFollowing ? 'Following' : 'Follow'; }
    get followVariant() { return this.isFollowing ? 'success' : 'neutral'; }
    get followIconName() { return this.isFollowing ? 'utility:check' : 'utility:add'; }

    handleFollow() {
        this.isFollowing = !this.isFollowing;
    }

    /* ---------- Details tab (collapsible sections) ---------- */

    get detailSections() {
        if (!this.campaign) return [];
        return SECTION_DEFINITIONS.map((section) => {
            const isOpen = this.openSectionIds.has(section.id);
            const contentId = `campaign-section-${section.id}`;
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
                    value: this.campaign[field.fieldName] ?? '',
                    type: field.type || 'text',
                    isTextarea: !!field.isTextarea,
                    cssClass: field.fullWidth ? 'c-campaign-detail__section-grid-full' : ''
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

    /* ---------- Related list: Campaign Members ---------- */

    get members() {
        return (this.campaign?.members || []).map((row) => ({
            ...row,
            rowKey: row.id
        }));
    }

    get hasMembers() {
        return this.members.length > 0;
    }

    get membersCardTitle() {
        // Match the Salesforce convention where overflow lists show "(6+)".
        const count = this.members.length;
        return count >= 6 ? `Campaign Members (${count}+)` : `Campaign Members (${count})`;
    }

    /* ---------- Related list: Commercial Policies ---------- */

    get commercialPolicies() {
        return (this.campaign?.commercialPolicies || []).map((row) => ({
            ...row,
            rowKey: row.id
        }));
    }

    get hasCommercialPolicies() {
        return this.commercialPolicies.length > 0;
    }

    get commercialPoliciesCardTitle() {
        const count = this.commercialPolicies.length;
        return count >= 6 ? `Commercial Policies (${count}+)` : `Commercial Policies (${count})`;
    }

    /* ---------- Related list: Mechanics ---------- */

    get mechanics() {
        return (this.campaign?.mechanics || []).map((row) => ({
            ...row,
            rowKey: row.id
        }));
    }

    get hasMechanics() {
        return this.mechanics.length > 0;
    }

    get mechanicsCardTitle() {
        // Per spec the Mechanics card title omits the count badge.
        return 'Mechanics';
    }

    /* ---------- Related list: Files ---------- */

    get files() {
        return this.campaign?.files || [];
    }

    get hasFiles() {
        return this.files.length > 0;
    }

    get filesCardTitle() {
        return `Files (${this.files.length})`;
    }

    /* ---------- Activity sidebar ---------- */

    get activityFooterText() {
        return ACTIVITY_FOOTER_TEXT;
    }

    get activityFeedSections() {
        return ACTIVITY_SECTIONS;
    }

    /* ---------- Navigation ---------- */

    handleBackToList() {
        navigate('/campaigns');
    }
}
