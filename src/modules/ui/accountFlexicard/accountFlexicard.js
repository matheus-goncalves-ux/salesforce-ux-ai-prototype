import { LightningElement, api } from 'lwc';

const TONE_CLASSES = {
    default: 'c-account-flexicard__value',
    link: 'c-account-flexicard__value c-account-flexicard__value_link',
    success: 'c-account-flexicard__value c-account-flexicard__value_success',
    danger: 'c-account-flexicard__value c-account-flexicard__value_danger'
};

/**
 * Reusable "Account Flexicard" inspired by the Figma "Account Flexicard"
 * (file Moura - VendasRM, node 148:22218). Renders a vertical card with:
 *
 *  - An optional cover image at the top. When `image-src` is omitted, a
 *    neutral placeholder with a `standard:account` icon is shown so
 *    consumers can lazily wire real imagery without breaking layout.
 *  - A stack of sections. Each section has an optional `title` and a
 *    list of `rows`. Each row renders as a label / value pair separated
 *    by `space-between`, with value tone controlled by `tone`:
 *      * `default` — plain dark text
 *      * `link`    — colored as a brand link (uses `--slds-g-color-accent-2`)
 *      * `success` — green-40 (financial positive)
 *      * `danger`  — red-40 (financial negative)
 *    Rows can also be flagged as:
 *      * `isSubItem`        — rendered inside an indented block with a
 *                             left rule, used for grouped breakdowns.
 *      * `isEmphasis`       — semibold, used for totals.
 *      * `hasDividerAbove`  — draws a 1px divider above the row.
 *
 * The component is purely presentational: no internal state, no click
 * handlers. Consumers shape the data and the component lays it out.
 */
export default class AccountFlexicard extends LightningElement {
    @api imageSrc = '';
    @api imageAlt = '';
    @api placeholderIcon = 'standard:account';

    _sections = [];

    @api
    get sections() {
        return this._sections;
    }
    set sections(value) {
        this._sections = Array.isArray(value) ? value : [];
    }

    /* ---------- View helpers ---------- */

    get hasImage() {
        return !!this.imageSrc;
    }

    /**
     * Decorate sections so the template can stay declarative. Groups
     * consecutive `isSubItem` rows into a single subgroup so the template
     * can render the indented left-bordered container once per group
     * instead of repeating the border per row.
     */
    get computedSections() {
        return this._sections.map((section) => {
            const rawRows = Array.isArray(section.rows) ? section.rows : [];
            const blocks = [];
            let currentSubBlock = null;
            rawRows.forEach((row, index) => {
                const decoratedRow = this._decorateRow(row, `${section.id}-${index}`);
                if (row.isSubItem) {
                    if (!currentSubBlock) {
                        currentSubBlock = {
                            id: `${section.id}-sub-${index}`,
                            isSubGroup: true,
                            rows: []
                        };
                        blocks.push(currentSubBlock);
                    }
                    currentSubBlock.rows.push(decoratedRow);
                } else {
                    currentSubBlock = null;
                    blocks.push({
                        id: decoratedRow.id,
                        isSubGroup: false,
                        row: decoratedRow
                    });
                }
            });
            return {
                id: section.id,
                title: section.title || '',
                hasTitle: !!section.title,
                blocks
            };
        });
    }

    _decorateRow(row, key) {
        const tone = TONE_CLASSES[row.tone] || TONE_CLASSES.default;
        const emphasisClass = row.isEmphasis ? ' c-account-flexicard__value_emphasis' : '';
        const labelClass = row.isEmphasis
            ? 'c-account-flexicard__label c-account-flexicard__label_emphasis'
            : 'c-account-flexicard__label';
        return {
            id: key,
            // Distinct id for the optional divider sibling so LWC doesn't
            // see two children sharing the same key inside the for:each.
            dividerId: `${key}-divider`,
            label: row.label || '',
            value: row.value || '',
            valueClass: `${tone}${emphasisClass}`,
            labelClass,
            hasDividerAbove: !!row.hasDividerAbove
        };
    }
}
