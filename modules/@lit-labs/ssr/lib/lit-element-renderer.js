/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ElementRenderer } from './element-renderer.js';
import { ReactiveElement } from '../../../lit';
import { _Φ } from '../../../lit-element/private-ssr-support.js';
import { render } from './render-lit-html.js';
const { attributeToProperty, changedProperties } = _Φ;
/**
 * ElementRenderer implementation for LitElements
 */
export class LitElementRenderer extends ElementRenderer {
    constructor(tagName) {
        super(tagName);
        this.element = new (customElements.get(this.tagName))();
    }
    static matchesClass(ctor) {
        return ctor._$litElement$;
    }
    connectedCallback() {
        // Call LitElement's `willUpdate` method.
        // Note, this method is required not to use DOM APIs.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element?.willUpdate(changedProperties(this.element));
        // Reflect properties to attributes by calling into ReactiveElement's
        // update, which _only_ reflects attributes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ReactiveElement.prototype.update.call(this.element);
    }
    attributeChangedCallback(name, _old, value) {
        attributeToProperty(this.element, name, value);
    }
    *renderShadow(renderInfo) {
        // Render styles.
        const styles = this.element.constructor
            .elementStyles;
        if (styles !== undefined && styles.length > 0) {
            yield '<style>';
            for (const style of styles) {
                yield style.cssText;
            }
            yield '</style>';
        }
        // Render template
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        yield* render(this.element.render(), renderInfo);
    }
    *renderLight(renderInfo) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = this.element?.renderLight();
        if (value) {
            yield* render(value, renderInfo);
        }
        else {
            yield '';
        }
    }
}
//# sourceMappingURL=lit-element-renderer.js.map
