/// <reference lib="dom" />
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
export declare type Constructor<T> = {
    new (): T;
};
import { RenderInfo } from './render-lit-html.js';
export declare type ElementRendererConstructor = (new (tagName: string) => ElementRenderer) & typeof ElementRenderer;
declare type AttributesMap = Map<string, string>;
export declare const getElementRenderer: ({ elementRenderers }: RenderInfo, tagName: string, ceClass?: typeof HTMLElement, attributes?: AttributesMap) => ElementRenderer | undefined;
/**
 * An object that renders elements of a certain type.
 */
export declare abstract class ElementRenderer {
    element?: HTMLElement;
    tagName: string;
    /**
     * Should be implemented to return true when the given custom element class
     * and/or tagName should be handled by this renderer.
     *
     * @param ceClass - Custom Element class
     * @param tagName - Tag name of custom element instance
     * @param attributes - Map of attribute key/value pairs
     * @returns
     */
    static matchesClass(_ceClass: typeof HTMLElement, _tagName: string, _attributes: AttributesMap): boolean;
    constructor(tagName: string);
    /**
     * Should implement server-appropriate implementation of connectedCallback
     */
    abstract connectedCallback(): void;
    /**
     * Should implement server-appropriate implementation of attributeChangedCallback
     */
    abstract attributeChangedCallback(name: string, old: string | null, value: string | null): void;
    /**
     * Handles setting a property.
     *
     * Default implementation sets the property on the renderer's element instance.
     *
     * @param name Name of the property
     * @param value Value of the property
     */
    setProperty(name: string, value: unknown): void;
    /**
     * Handles setting an attribute on an element.
     *
     * Default implementation calls `setAttribute` on the renderer's element
     * instance, and calls the abstract `attributeChangedCallback` on the
     * renderer.
     *
     * @param name Name of the attribute
     * @param value Value of the attribute
     */
    setAttribute(name: string, value: string): void;
    /**
     * Render a single element's ShadowRoot children.
     */
    abstract renderShadow(_renderInfo: RenderInfo): IterableIterator<string> | undefined;
    /**
     * Render an element's light DOM children.
     */
    abstract renderLight(renderInfo: RenderInfo): IterableIterator<string>;
    /**
     * Render an element's attributes.
     *
     * Default implementation serializes all attributes on the element instance.
     */
    renderAttributes(): IterableIterator<string>;
}
export {};
//# sourceMappingURL=element-renderer.d.ts.map