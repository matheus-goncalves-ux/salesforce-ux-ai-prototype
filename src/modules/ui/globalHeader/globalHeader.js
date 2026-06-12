import { LightningElement } from 'lwc';

/**
 * Resolve a `public/`-relative asset path against the URL the app is
 * currently served from. Locally the app lives at `/`, on GitHub Pages
 * it lives at `/<repo>/`. Hash routing keeps `window.location.pathname`
 * stable across navigations, so this is the most portable way to point
 * at `public/images/...` without hardcoding the repo name or having to
 * thread Vite `base` config through every template.
 */
function publicAsset(filename) {
    if (typeof window === 'undefined') return `/${filename}`;
    const base = window.location.pathname.replace(/[^/]*$/, '');
    return `${base}${filename}`;
}

export default class GlobalHeader extends LightningElement {
    get hondaLogo() {
        return publicAsset('images/honda.svg');
    }

    get userAvatar() {
        return publicAsset('images/avatar1.jpg');
    }

    handleAgentforceClick() {
        this.dispatchEvent(new CustomEvent('panelselect', {
            detail: { name: 'agentforce_panel' },
            bubbles: true,
            composed: true
        }));
    }

    handleTrailheadClick() {
        this.dispatchEvent(new CustomEvent('panelselect', {
            detail: { name: 'trailhead_panel' },
            bubbles: true,
            composed: true
        }));
    }

    handleSettingsClick() {
        this.dispatchEvent(new CustomEvent('panelselect', {
            detail: { name: 'settings_panel' },
            bubbles: true,
            composed: true
        }));
    }

    handleNotificationClick() {
        this.dispatchEvent(new CustomEvent('panelselect', {
            detail: { name: 'notification_panel' },
            bubbles: true,
            composed: true
        }));
    }
}