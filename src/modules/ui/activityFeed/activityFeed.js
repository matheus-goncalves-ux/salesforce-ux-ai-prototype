import { LightningElement, api } from 'lwc';

/**
 * Reusable activity feed inspired by the Figma "Activity feed" card
 * (file SF-Prototypes-Test, node 35:13211). Renders:
 *  - An internal "Activity" tab strip with a single active tab.
 *  - Two split buttons for "New Task" and "New Event".
 *  - A filter summary line with a settings affordance.
 *  - Action links to refresh / expand all / view all.
 *  - A list of collapsible sections (e.g. "Upcoming & Overdue", per-month
 *    groups). Each section is an SLDS expandable section header that toggles
 *    open/closed independently.
 *  - Inside each open section, a vertical timeline of activity rows. Each
 *    row has a chevron, a colored standard icon, a connecting bar, a title
 *    + timestamp, an attribution line, and an optional expanded details
 *    panel listing key/value fields plus a description.
 *
 * The component manages its own open/closed state for sections and rows.
 * Consumers provide the `sections` array with `defaultOpen` and per-item
 * `defaultExpanded` flags to seed the initial state.
 */
export default class ActivityFeed extends LightningElement {
    @api title = 'Activity';
    @api filterSummary = 'Filters: All time • All activities • All types';
    @api newTaskLabel = 'New Task';
    @api newEventLabel = 'New Event';
    @api refreshLabel = 'Refresh';
    @api expandAllLabel = 'Expand All';
    @api viewAllLabel = 'View All';
    /**
     * Optional copy rendered below the last section when every activity
     * source has been exhausted (e.g. "No past activity. Completed
     * meetings and tasks appear here."). Hidden when empty.
     */
    @api footerText = '';

    _sections = [];
    _initialized = false;
    closedSectionIds = new Set();
    expandedItemIds = new Set();

    @api
    get sections() {
        return this._sections;
    }
    set sections(value) {
        this._sections = Array.isArray(value) ? value : [];
        // Seed open/closed and expanded state from the incoming data the
        // first time it lands so consumers can declaratively control which
        // sections/items start open without us re-stomping local toggles on
        // every re-render.
        if (!this._initialized && this._sections.length > 0) {
            this.closedSectionIds = new Set(
                this._sections
                    .filter((section) => section?.defaultOpen === false)
                    .map((section) => section.id)
            );
            const expanded = new Set();
            this._sections.forEach((section) => {
                (section.activities || []).forEach((activity) => {
                    if (activity?.defaultExpanded) {
                        expanded.add(activity.id);
                    }
                });
            });
            this.expandedItemIds = expanded;
            this._initialized = true;
        }
    }

    /* ---------- Sections (collapsible groups) ---------- */

    get computedSections() {
        return this._sections.map((section) => {
            const activities = Array.isArray(section.activities) ? section.activities : [];
            const isOpen = !this.closedSectionIds.has(section.id);
            const contentId = `c-activity-feed__section-content-${section.id}`;
            const hasItems = activities.length > 0;
            const emptyTitle = section.emptyTitle || '';
            const emptyDescription = section.emptyDescription || '';
            return {
                id: section.id,
                label: section.label,
                contentId,
                sectionClass: `slds-section ${isOpen ? 'slds-is-open' : 'slds-is-close'}`,
                ariaExpanded: isOpen ? 'true' : 'false',
                ariaHidden: isOpen ? 'false' : 'true',
                hasItems,
                hasEmptyState: !hasItems && !!(emptyTitle || emptyDescription),
                emptyTitle,
                emptyDescription,
                items: activities.map((activity, index) =>
                    this._decorateActivity(activity, index === activities.length - 1)
                )
            };
        });
    }

    /**
     * Decorate a raw activity record with view helpers. `isLast` removes the
     * connecting bar on the final item so the timeline doesn't dangle below
     * the last row in a section.
     */
    _decorateActivity(activity, isLast) {
        const isTask = activity.type === 'task';
        const isEvent = activity.type === 'event';
        const isExpanded = this.expandedItemIds.has(activity.id);
        const hasDetails = !!(
            activity.details &&
            ((activity.details.fields && activity.details.fields.length > 0) ||
                activity.details.description)
        );
        const detailFields = hasDetails
            ? (activity.details.fields || []).map((field, index) => ({
                  key: `${activity.id}-field-${index}`,
                  label: field.label,
                  value: field.value,
                  isLink: !!field.isLink,
                  cellClass: field.fullWidth
                      ? 'c-activity-feed__details-cell c-activity-feed__details-cell_full'
                      : 'c-activity-feed__details-cell'
              }))
            : [];
        const iconColorClass = isTask
            ? 'c-activity-feed__icon c-activity-feed__icon_task'
            : 'c-activity-feed__icon c-activity-feed__icon_event';
        const barColorClass = isTask
            ? 'c-activity-feed__bar c-activity-feed__bar_task'
            : 'c-activity-feed__bar c-activity-feed__bar_event';
        const itemClass = `c-activity-feed__item ${
            isExpanded ? 'c-activity-feed__item_open' : 'c-activity-feed__item_closed'
        }${isTask && activity.isComplete ? ' c-activity-feed__item_complete' : ''}${
            isLast ? ' c-activity-feed__item_last' : ''
        }`;
        return {
            id: activity.id,
            subject: activity.subject,
            iconName: activity.iconName || (isTask ? 'standard:task' : 'standard:event'),
            iconAlt: isTask ? 'Task' : isEvent ? 'Event' : 'Activity',
            iconWrapperClass: iconColorClass,
            barClass: barColorClass,
            timestamp: activity.timestamp || activity.date || '',
            actor: activity.actor || '',
            actionVerb: activity.actionVerb || '',
            target: activity.target || '',
            extraText: activity.extraText || '',
            hasActor: !!activity.actor,
            hasTarget: !!activity.target,
            hasExtraText: !!activity.extraText,
            isTask,
            isEvent,
            isExternal: !!activity.isExternal,
            isComplete: !!activity.isComplete,
            isExpanded,
            hasDetails,
            ariaExpanded: isExpanded ? 'true' : 'false',
            chevronIcon: isExpanded ? 'utility:chevrondown' : 'utility:chevronright',
            toggleLabel: isExpanded ? 'Collapse activity' : 'Expand activity',
            detailsId: `c-activity-feed__details-${activity.id}`,
            detailFields,
            detailDescription: activity.details?.description || '',
            itemClass
        };
    }

    /* ---------- Event handlers ---------- */

    handleSectionToggle(event) {
        const id = event.currentTarget?.dataset?.sectionId;
        if (!id) return;
        const next = new Set(this.closedSectionIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        this.closedSectionIds = next;
    }

    handleItemToggle(event) {
        // Prevent the timeline row from also intercepting the click.
        event.stopPropagation();
        const id = event.currentTarget?.dataset?.itemId;
        if (!id) return;
        const next = new Set(this.expandedItemIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        this.expandedItemIds = next;
    }

    handleRefresh(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('refresh'));
    }

    handleExpandAll(event) {
        event.preventDefault();
        // Open every section and expand every item with at least one detail.
        this.closedSectionIds = new Set();
        const next = new Set();
        this._sections.forEach((section) => {
            (section.activities || []).forEach((activity) => {
                if (
                    activity?.details &&
                    ((activity.details.fields && activity.details.fields.length > 0) ||
                        activity.details.description)
                ) {
                    next.add(activity.id);
                }
            });
        });
        this.expandedItemIds = next;
        this.dispatchEvent(new CustomEvent('expandall'));
    }

    handleViewAll(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('viewall'));
    }

    /* ---------- Action button-group handlers ---------- */

    handleNewTask() {
        this.dispatchEvent(new CustomEvent('newtask'));
    }

    handleNewEvent() {
        this.dispatchEvent(new CustomEvent('newevent'));
    }

    handleTaskMenuSelect(event) {
        this.dispatchEvent(
            new CustomEvent('taskmenuselect', { detail: { value: event.detail.value } })
        );
    }

    handleEventMenuSelect(event) {
        this.dispatchEvent(
            new CustomEvent('eventmenuselect', { detail: { value: event.detail.value } })
        );
    }
}
