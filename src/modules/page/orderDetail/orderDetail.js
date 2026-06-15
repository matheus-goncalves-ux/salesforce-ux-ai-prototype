import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getOrderById, ORDER_STAGES, ORDER_STAGE_INDEX } from 'data/orders';

/**
 * Field maps for the four collapsible sections in the Details tab.
 * Each entry references a property on the order record; `fullWidth: true`
 * spans the field across the two-column grid (used for long-form text
 * and the address blocks that include a map preview).
 */
const SECTION_DEFINITIONS = [
    {
        id: 'order-information',
        title: 'Order Information',
        defaultOpen: true,
        fields: [
            { key: 'owner', label: 'Order Owner', fieldName: 'owner', editable: true },
            { key: 'orderNumber', label: 'Order Number', fieldName: 'orderNumber' },
            { key: 'accountName', label: 'Account Name', fieldName: 'accountName', editable: true },
            { key: 'orderValue', label: 'Order Value', fieldName: 'orderValue' },
            { key: 'orderType', label: 'Order Type', fieldName: 'orderType', editable: true },
            { key: 'status', label: 'Status', fieldName: 'status', editable: true },
            { key: 'startDate', label: 'Start Date', fieldName: 'startDate', editable: true },
            { key: 'contractNumber', label: 'Contract Number', fieldName: 'contractNumber' }
        ]
    },
    {
        id: 'order-addresses',
        title: 'Addresses',
        defaultOpen: true,
        isAddressSection: true,
        fields: []
    },
    {
        id: 'additional-information',
        title: 'Additional Information',
        defaultOpen: false,
        fields: [
            { key: 'poNumber', label: 'PO Number', fieldName: 'poNumber', editable: true },
            { key: 'currencyIsoCode', label: 'Currency', fieldName: 'currencyIsoCode' },
            { key: 'deliveryStage', label: 'Delivery Stage', fieldName: 'deliveryStage', editable: true },
            { key: 'description', label: 'Description', fieldName: 'description', isTextarea: true, fullWidth: true, editable: true }
        ]
    },
    {
        id: 'system-information',
        title: 'System Information',
        defaultOpen: false,
        fields: [
            { key: 'createdDate', label: 'Created Date', fieldName: 'createdDate' },
            { key: 'createdBy', label: 'Created By', fieldName: 'createdBy' },
            { key: 'lastModified', label: 'Last Modified Date', fieldName: 'lastModified' },
            { key: 'lastModifiedBy', label: 'Last Modified By', fieldName: 'lastModifiedBy' },
            { key: 'activatedDate', label: 'Activated Date', fieldName: 'activatedDate' },
            { key: 'activatedBy', label: 'Activated By', fieldName: 'activatedBy' }
        ]
    }
];

/**
 * Empty-state activity card. The order starts with no activity history
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

const CLOSED_STAGES = new Set(['Delivered']);

export default class OrderDetail extends LightningElement {
    order = null;
    isFollowing = false;
    currentStageIndex = 0;
    openSectionIds = new Set(
        SECTION_DEFINITIONS.filter((s) => s.defaultOpen !== false).map((s) => s.id)
    );

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.order = getOrderById(id);
            if (this.order) {
                // Map the order's delivery stage to a path index. Stages outside
                // the canonical 6-step path clamp to "Integrated" so the path
                // still renders coherently.
                const mappedIndex = ORDER_STAGE_INDEX[this.order.deliveryStage];
                this.currentStageIndex = typeof mappedIndex === 'number' ? mappedIndex : 0;
            }
        }
    }

    /* ---------- Page metadata ---------- */

    get hasOrder() {
        return this.order !== null;
    }

    get orderTitle() {
        return this.order?.orderNumber || 'Unknown Order';
    }

    get summaryFields() {
        if (!this.order) return [];
        return [
            { label: 'Account Name', value: this.order.accountName },
            { label: 'Order Type', value: this.order.orderType },
            { label: 'Status', value: this.order.status },
            { label: 'Order Value', value: this.order.orderValue },
            { label: 'Owner', value: this.order.owner }
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
        return ORDER_STAGES.map((stage, index) => {
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

    get currentStageName() {
        return ORDER_STAGES[this.currentStageIndex]?.name ?? '';
    }

    get isPathClosed() {
        return CLOSED_STAGES.has(this.currentStageName);
    }

    get markCompleteLabel() {
        if (this.isPathClosed) {
            return `Stage: ${this.currentStageName}`;
        }
        return 'Mark Stage as Complete';
    }

    handleStepClick(event) {
        event.preventDefault();
        const name = event.currentTarget?.dataset?.name;
        const index = ORDER_STAGE_INDEX[name];
        if (typeof index === 'number') {
            this.currentStageIndex = index;
        }
    }

    handleMarkComplete() {
        if (this.isPathClosed) return;
        if (this.currentStageIndex < ORDER_STAGES.length - 1) {
            this.currentStageIndex += 1;
        }
    }

    /* ---------- Details tab (collapsible sections) ---------- */

    get detailSections() {
        if (!this.order) return [];
        return SECTION_DEFINITIONS.map((section) => {
            const isOpen = this.openSectionIds.has(section.id);
            const contentId = `order-section-${section.id}`;
            return {
                id: section.id,
                title: section.title,
                contentId,
                sectionClass: `slds-section ${isOpen ? 'slds-is-open' : 'slds-is-close'}`,
                ariaExpanded: isOpen ? 'true' : 'false',
                ariaHidden: isOpen ? 'false' : 'true',
                isAddressSection: !!section.isAddressSection,
                fields: (section.fields || []).map((field) => ({
                    key: field.key,
                    label: field.label,
                    value: this.order[field.fieldName] ?? '',
                    type: field.type || 'text',
                    isTextarea: !!field.isTextarea,
                    isEditable: !!field.editable,
                    cssClass: field.fullWidth ? 'c-order-detail__field c-order-detail__field_full' : 'c-order-detail__field'
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

    /* ---------- Address blocks (with map preview) ---------- */

    get billingAddress() {
        if (!this.order) return null;
        const o = this.order;
        const line1 = o.billingStreet;
        const line2 = `${o.billingCity}, ${o.billingState} ${o.billingZip}`;
        const country = o.billingCountry;
        const query = encodeURIComponent(`${line1}, ${line2}, ${country}`);
        return {
            line1,
            line2,
            country,
            mapHref: `https://www.google.com/maps?q=${query}`,
            mapAlt: `Map preview of billing address: ${line1}, ${line2}`
        };
    }

    get shippingAddress() {
        if (!this.order) return null;
        const o = this.order;
        const line1 = o.shippingStreet;
        const line2 = `${o.shippingCity}, ${o.shippingState} ${o.shippingZip}`;
        const country = o.shippingCountry;
        const query = encodeURIComponent(`${line1}, ${line2}, ${country}`);
        return {
            line1,
            line2,
            country,
            mapHref: `https://www.google.com/maps?q=${query}`,
            mapAlt: `Map preview of shipping address: ${line1}, ${line2}`
        };
    }

    /* ---------- Related list: Order Products ---------- */

    get products() {
        return (this.order?.products || []).map((row) => ({ ...row, rowKey: row.id }));
    }

    get hasProducts() {
        return this.products.length > 0;
    }

    get productsCardTitle() {
        const count = this.products.length;
        return count >= 6 ? `Order Products (${count}+)` : `Order Products (${count})`;
    }

    /* ---------- Related list: Order History ---------- */

    get history() {
        return (this.order?.history || []).map((row) => ({ ...row, rowKey: row.id }));
    }

    get hasHistory() {
        return this.history.length > 0;
    }

    get historyCardTitle() {
        const count = this.history.length;
        return count >= 6 ? `Order History (${count}+)` : `Order History (${count})`;
    }

    /* ---------- Notes & Attachments (empty upload state) ---------- */

    get notesCardTitle() {
        return 'Notes & Attachments (0)';
    }

    /* ---------- Right rail: Activity feed ---------- */

    get activityFooterText() {
        return ACTIVITY_FOOTER_TEXT;
    }

    get activityFeedSections() {
        return ACTIVITY_SECTIONS;
    }

    /* ---------- Right rail: Alerts ---------- */

    get alerts() {
        return (this.order?.alerts || []).map((alert) => ({
            id: alert.id,
            iconName: alert.iconName || 'utility:warning',
            title: alert.title,
            message: alert.message
        }));
    }

    get hasAlerts() {
        return this.alerts.length > 0;
    }

    get alertsCardTitle() {
        const count = this.alerts.length;
        return count >= 6 ? `Alerts (${count}+)` : `Alerts (${count})`;
    }

    handleViewAllAlerts(event) {
        // Prototype-only: prevent the placeholder `href="#"` from scrolling
        // the page. A future iteration could navigate to an alerts list view.
        event.preventDefault();
    }

    /* ---------- Navigation ---------- */

    handleBackToList() {
        navigate('/orders');
    }
}
