function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function () { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function (O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function (F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function (receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function (elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function (element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function (element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function (elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function (element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function (elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function (elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function (elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function (elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function (obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function (constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function (obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { queryAssignedNodes } from '../../decorators/query-assigned-nodes.js';
import { canTestReactiveElement, generateElementName, RenderingElement, html } from '../test-helpers.js';
import { assert } from '@esm-bundle/chai';
const flush = window.ShadyDOM && window.ShadyDOM.flush ? window.ShadyDOM.flush : () => {};
(canTestReactiveElement ? suite : suite.skip)('@queryAssignedNodes', () => {
  let container;
  let el;

  let D = _decorate(null, function (_initialize, _RenderingElement) {
    class D extends _RenderingElement {
      constructor(...args) {
        super(...args);

        _initialize(this);
      }

    }

    return {
      F: D,
      d: [{
        kind: "field",
        decorators: [queryAssignedNodes()],
        key: "defaultAssigned",
        value: void 0
      }, {
        kind: "field",
        decorators: [queryAssignedNodes('footer', true)],
        key: "footerAssigned",
        value: void 0
      }, {
        kind: "field",
        decorators: [queryAssignedNodes('footer', true, '.item')],
        key: "footerAssignedItems",
        value: void 0
      }, {
        kind: "method",
        key: "render",
        value: // The `true` on the decorator indicates that results should be flattened.
        function render() {
          return html`
        <slot></slot>
        <slot name="footer"></slot>
      `;
        }
      }]
    };
  }, RenderingElement);

  customElements.define('assigned-nodes-el', D);

  let E = _decorate(null, function (_initialize2, _RenderingElement2) {
    class E extends _RenderingElement2 {
      constructor(...args) {
        super(...args);

        _initialize2(this);
      }

    }

    return {
      F: E,
      d: [{
        kind: "field",
        decorators: [queryAssignedNodes()],
        key: "defaultAssigned",
        value: void 0
      }, {
        kind: "field",
        decorators: [queryAssignedNodes('header')],
        key: "headerAssigned",
        value: void 0
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          return html`
        <slot name="header"></slot>
        <slot></slot>
      `;
        }
      }]
    };
  }, RenderingElement);

  customElements.define('assigned-nodes-el-2', E); // Note, there are 2 elements here so that the `flatten` option of
  // the decorator can be tested.

  class C extends RenderingElement {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "div", void 0);

      _defineProperty(this, "div2", void 0);

      _defineProperty(this, "assignedNodesEl", void 0);

      _defineProperty(this, "assignedNodesEl2", void 0);
    }

    render() {
      return html`
        <assigned-nodes-el
          ><div id="div1">A</div>
          <slot slot="footer"></slot
        ></assigned-nodes-el>
        <assigned-nodes-el-2><div id="div2">B</div></assigned-nodes-el-2>
      `;
    }

    firstUpdated() {
      this.div = this.renderRoot.querySelector('#div1');
      this.div2 = this.renderRoot.querySelector('#div2');
      this.assignedNodesEl = this.renderRoot.querySelector('assigned-nodes-el');
      this.assignedNodesEl2 = this.renderRoot.querySelector('assigned-nodes-el-2');
    }

  }

  customElements.define(generateElementName(), C);
  setup(async () => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
    el = new C();
    container.appendChild(el);
    await el.updateComplete;
    await el.assignedNodesEl.updateComplete;
  });
  teardown(() => {
    if (container !== undefined) {
      container.parentElement.removeChild(container);
      container = undefined;
    }
  });
  test('returns assignedNodes for slot', () => {
    // Note, `defaultAssigned` does not `flatten` so we test that the property
    // reflects current state and state when nodes are added or removed.
    assert.deepEqual(el.assignedNodesEl.defaultAssigned, [el.div, el.div.nextSibling]);
    const child = document.createElement('div');
    const text1 = document.createTextNode('');
    el.assignedNodesEl.appendChild(text1);
    el.assignedNodesEl.appendChild(child);
    const text2 = document.createTextNode('');
    el.assignedNodesEl.appendChild(text2);
    flush();
    assert.deepEqual(el.assignedNodesEl.defaultAssigned, [el.div, el.div.nextSibling, text1, child, text2]);
    el.assignedNodesEl.removeChild(child);
    flush();
    assert.deepEqual(el.assignedNodesEl.defaultAssigned, [el.div, el.div.nextSibling, text1, text2]);
  });
  test('returns assignedNodes for unnamed slot that is not first slot', () => {
    assert.deepEqual(el.assignedNodesEl2.defaultAssigned, [el.div2]);
  });
  test('returns flattened assignedNodes for slot', () => {
    // Note, `defaultAssigned` does `flatten` so we test that the property
    // reflects current state and state when nodes are added or removed to
    // the light DOM of the element containing the element under test.
    assert.deepEqual(el.assignedNodesEl.footerAssigned, []);
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    el.appendChild(child1);
    el.appendChild(child2);
    flush();
    assert.deepEqual(el.assignedNodesEl.footerAssigned, [child1, child2]);
    el.removeChild(child2);
    flush();
    assert.deepEqual(el.assignedNodesEl.footerAssigned, [child1]);
  });
  test('returns assignedNodes for slot filtered by selector', () => {
    // Note, `defaultAssigned` does `flatten` so we test that the property
    // reflects current state and state when nodes are added or removed to
    // the light DOM of the element containing the element under test.
    assert.deepEqual(el.assignedNodesEl.footerAssignedItems, []);
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    child2.classList.add('item');
    el.appendChild(child1);
    el.appendChild(child2);
    flush();
    assert.deepEqual(el.assignedNodesEl.footerAssignedItems, [child2]);
    el.removeChild(child2);
    flush();
    assert.deepEqual(el.assignedNodesEl.footerAssignedItems, []);
  });
  test('returns assignedNodes for slot that contains text nodes filtered by selector when Element.matches does not exist', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'matches');
    Object.defineProperty(Element.prototype, 'matches', {
      value: undefined,
      configurable: true
    });
    assert.deepEqual(el.assignedNodesEl.footerAssignedItems, []);
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    const text1 = document.createTextNode('');
    const text2 = document.createTextNode('');
    child2.classList.add('item');
    el.appendChild(child1);
    el.appendChild(text1);
    el.appendChild(child2);
    el.appendChild(text2);
    flush();
    assert.deepEqual(el.assignedNodesEl.footerAssignedItems, [child2]);
    el.removeChild(child2);
    flush();
    assert.deepEqual(el.assignedNodesEl.footerAssignedItems, []);

    if (descriptor !== undefined) {
      Object.defineProperty(Element.prototype, 'matches', descriptor);
    }
  });
});