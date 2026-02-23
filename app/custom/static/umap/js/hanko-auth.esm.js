/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const an = globalThis, Gn = an.ShadowRoot && (an.ShadyCSS === void 0 || an.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xn = Symbol(), So = /* @__PURE__ */ new WeakMap();
let ui = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== Xn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Gn && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = So.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && So.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ki = (n) => new ui(typeof n == "string" ? n : n + "", void 0, Xn), Vi = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, i, a) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[a + 1], n[0]);
  return new ui(t, n, Xn);
}, Bi = (n, e) => {
  if (Gn) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), i = an.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = t.cssText, n.appendChild(o);
  }
}, xo = Gn ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Ki(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Zi, defineProperty: Ji, getOwnPropertyDescriptor: Yi, getOwnPropertyNames: Qi, getOwnPropertySymbols: Gi, getPrototypeOf: Xi } = Object, st = globalThis, Ao = st.trustedTypes, ea = Ao ? Ao.emptyScript : "", Dn = st.reactiveElementPolyfillSupport, Ut = (n, e) => n, fn = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? ea : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, eo = (n, e) => !Zi(n, e), Co = { attribute: !0, type: String, converter: fn, reflect: !1, useDefault: !1, hasChanged: eo };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), st.litPropertyMetadata ?? (st.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let pt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Co) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(e, o, t);
      i !== void 0 && Ji(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: i, set: a } = Yi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const c = i == null ? void 0 : i.call(this);
      a == null || a.call(this, s), this.requestUpdate(e, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Co;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ut("elementProperties"))) return;
    const e = Xi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ut("properties"))) {
      const t = this.properties, o = [...Qi(t), ...Gi(t)];
      for (const i of o) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, i] of t) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const i = this._$Eu(t, o);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const i of o) t.unshift(xo(i));
    } else e !== void 0 && t.push(xo(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Bi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostConnected) == null ? void 0 : o.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostDisconnected) == null ? void 0 : o.call(t);
    });
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    var a;
    const o = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, o);
    if (i !== void 0 && o.reflect === !0) {
      const s = (((a = o.converter) == null ? void 0 : a.toAttribute) !== void 0 ? o.converter : fn).toAttribute(t, o.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, s;
    const o = this.constructor, i = o._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const c = o.getPropertyOptions(i), d = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((a = c.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? c.converter : fn;
      this._$Em = i;
      const l = d.fromAttribute(t, c.type);
      this[i] = l ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, o, i = !1, a) {
    var s;
    if (e !== void 0) {
      const c = this.constructor;
      if (i === !1 && (a = this[e]), o ?? (o = c.getPropertyOptions(e)), !((o.hasChanged ?? eo)(a, t) || o.useDefault && o.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(c._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: i, wrapped: a }, s) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, s] of i) {
        const { wrapped: c } = s, d = this[a];
        c !== !0 || this._$AL.has(a) || d === void 0 || this.C(a, void 0, s, d);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
pt.elementStyles = [], pt.shadowRootOptions = { mode: "open" }, pt[Ut("elementProperties")] = /* @__PURE__ */ new Map(), pt[Ut("finalized")] = /* @__PURE__ */ new Map(), Dn == null || Dn({ ReactiveElement: pt }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, Oo = (n) => n, vn = Nt.trustedTypes, Po = vn ? vn.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, hi = "$lit$", rt = `lit$${Math.random().toFixed(9).slice(2)}$`, pi = "?" + rt, ta = `<${pi}>`, ht = document, Rt = () => ht.createComment(""), qt = (n) => n === null || typeof n != "object" && typeof n != "function", to = Array.isArray, na = (n) => to(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", jn = `[ 	
\f\r]`, yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Eo = /-->/g, Io = />/g, ct = RegExp(`>|${jn}(?:([^\\s"'>=/]+)(${jn}*=${jn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Do = /'/g, jo = /"/g, mi = /^(?:script|style|textarea|title)$/i, oa = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), xe = oa(1), ft = Symbol.for("lit-noChange"), $e = Symbol.for("lit-nothing"), Lo = /* @__PURE__ */ new WeakMap(), dt = ht.createTreeWalker(ht, 129);
function gi(n, e) {
  if (!to(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Po !== void 0 ? Po.createHTML(e) : e;
}
const ia = (n, e) => {
  const t = n.length - 1, o = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = yt;
  for (let c = 0; c < t; c++) {
    const d = n[c];
    let l, u, h = -1, f = 0;
    for (; f < d.length && (s.lastIndex = f, u = s.exec(d), u !== null); ) f = s.lastIndex, s === yt ? u[1] === "!--" ? s = Eo : u[1] !== void 0 ? s = Io : u[2] !== void 0 ? (mi.test(u[2]) && (i = RegExp("</" + u[2], "g")), s = ct) : u[3] !== void 0 && (s = ct) : s === ct ? u[0] === ">" ? (s = i ?? yt, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, l = u[1], s = u[3] === void 0 ? ct : u[3] === '"' ? jo : Do) : s === jo || s === Do ? s = ct : s === Eo || s === Io ? s = yt : (s = ct, i = void 0);
    const m = s === ct && n[c + 1].startsWith("/>") ? " " : "";
    a += s === yt ? d + ta : h >= 0 ? (o.push(l), d.slice(0, h) + hi + d.slice(h) + rt + m) : d + rt + (h === -2 ? c : m);
  }
  return [gi(n, a + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
let Bn = class fi {
  constructor({ strings: e, _$litType$: t }, o) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const c = e.length - 1, d = this.parts, [l, u] = ia(e, t);
    if (this.el = fi.createElement(l, o), dt.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = dt.nextNode()) !== null && d.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(hi)) {
          const f = u[s++], m = i.getAttribute(h).split(rt), x = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: a, name: x[2], strings: m, ctor: x[1] === "." ? ra : x[1] === "?" ? sa : x[1] === "@" ? la : kn }), i.removeAttribute(h);
        } else h.startsWith(rt) && (d.push({ type: 6, index: a }), i.removeAttribute(h));
        if (mi.test(i.tagName)) {
          const h = i.textContent.split(rt), f = h.length - 1;
          if (f > 0) {
            i.textContent = vn ? vn.emptyScript : "";
            for (let m = 0; m < f; m++) i.append(h[m], Rt()), dt.nextNode(), d.push({ type: 2, index: ++a });
            i.append(h[f], Rt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === pi) d.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(rt, h + 1)) !== -1; ) d.push({ type: 7, index: a }), h += rt.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const o = ht.createElement("template");
    return o.innerHTML = e, o;
  }
};
function vt(n, e, t = n, o) {
  var s, c;
  if (e === ft) return e;
  let i = o !== void 0 ? (s = t._$Co) == null ? void 0 : s[o] : t._$Cl;
  const a = qt(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), a === void 0 ? i = void 0 : (i = new a(n), i._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = i : t._$Cl = i), i !== void 0 && (e = vt(n, i._$AS(n, e.values), i, o)), e;
}
let aa = class {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: o } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? ht).importNode(t, !0);
    dt.currentNode = i;
    let a = dt.nextNode(), s = 0, c = 0, d = o[0];
    for (; d !== void 0; ) {
      if (s === d.index) {
        let l;
        d.type === 2 ? l = new no(a, a.nextSibling, this, e) : d.type === 1 ? l = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (l = new ca(a, this, e)), this._$AV.push(l), d = o[++c];
      }
      s !== (d == null ? void 0 : d.index) && (a = dt.nextNode(), s++);
    }
    return dt.currentNode = ht, i;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}, no = class vi {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, i) {
    this.type = 2, this._$AH = $e, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = vt(this, e, t), qt(e) ? e === $e || e == null || e === "" ? (this._$AH !== $e && this._$AR(), this._$AH = $e) : e !== this._$AH && e !== ft && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : na(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $e && qt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ht.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: o } = e, i = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Bn.createElement(gi(o.h, o.h[0]), this.options)), o);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(t);
    else {
      const s = new aa(i, this), c = s.u(this.options);
      s.p(t), this.T(c), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Lo.get(e.strings);
    return t === void 0 && Lo.set(e.strings, t = new Bn(e)), t;
  }
  k(e) {
    to(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, i = 0;
    for (const a of e) i === t.length ? t.push(o = new vi(this.O(Rt()), this.O(Rt()), this, this.options)) : o = t[i], o._$AI(a), i++;
    i < t.length && (this._$AR(o && o._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Oo(e).nextSibling;
      Oo(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}, kn = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, i, a) {
    this.type = 1, this._$AH = $e, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = $e;
  }
  _$AI(e, t = this, o, i) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = vt(this, e, t, 0), s = !qt(e) || e !== this._$AH && e !== ft, s && (this._$AH = e);
    else {
      const c = e;
      let d, l;
      for (e = a[0], d = 0; d < a.length - 1; d++) l = vt(this, c[o + d], t, d), l === ft && (l = this._$AH[d]), s || (s = !qt(l) || l !== this._$AH[d]), l === $e ? e = $e : e !== $e && (e += (l ?? "") + a[d + 1]), this._$AH[d] = l;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === $e ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, ra = class extends kn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $e ? void 0 : e;
  }
}, sa = class extends kn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $e);
  }
}, la = class extends kn {
  constructor(e, t, o, i, a) {
    super(e, t, o, i, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = vt(this, e, t, 0) ?? $e) === ft) return;
    const o = this._$AH, i = e === $e && o !== $e || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, a = e !== $e && (o === $e || i);
    i && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, ca = class {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    vt(this, e);
  }
};
const Ln = Nt.litHtmlPolyfillSupport;
Ln == null || Ln(Bn, no), (Nt.litHtmlVersions ?? (Nt.litHtmlVersions = [])).push("3.3.2");
const da = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = o._$litPart$;
  if (i === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = i = new no(e.insertBefore(Rt(), a), a, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis;
let Mt = class extends pt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = da(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ft;
  }
};
var di;
Mt._$litElement$ = !0, Mt.finalized = !0, (di = ut.litElementHydrateSupport) == null || di.call(ut, { LitElement: Mt });
const $n = ut.litElementPolyfillSupport;
$n == null || $n({ LitElement: Mt });
(ut.litElementVersions ?? (ut.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ua = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ha = { attribute: !0, type: String, converter: fn, reflect: !1, hasChanged: eo }, pa = (n = ha, e, t) => {
  const { kind: o, metadata: i } = t;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), o === "setter" && ((n = Object.create(n)).wrapped = !0), a.set(t.name, n), o === "accessor") {
    const { name: s } = t;
    return { set(c) {
      const d = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(s, d, n, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(s, void 0, n, c), c;
    } };
  }
  if (o === "setter") {
    const { name: s } = t;
    return function(c) {
      const d = this[s];
      e.call(this, c), this.requestUpdate(s, d, n, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function Te(n) {
  return (e, t) => typeof t == "object" ? pa(n, e, t) : ((o, i, a) => {
    const s = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, o), s ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ye(n) {
  return Te({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ma = (n) => (...e) => ({ _$litDirective$: n, values: e });
let ga = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, o) {
    this._$Ct = e, this._$AM = t, this._$Ci = o;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fa = {}, va = (n, e = fa) => n._$AH = e;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _a = ma(class extends ga {
  constructor() {
    super(...arguments), this.key = $e;
  }
  render(n, e) {
    return this.key = n, e;
  }
  update(n, [e, t]) {
    return e !== this.key && (va(n), this.key = e), t;
  }
});
/*! For license information please see elements.js.LICENSE.txt */
var ya = { 7: function(n, e, t) {
  (function(o, i, a) {
    var s = function() {
      return s = Object.assign || function(x) {
        for (var O, A = 1, S = arguments.length; A < S; A++) for (var P in O = arguments[A]) Object.prototype.hasOwnProperty.call(O, P) && (x[P] = O[P]);
        return x;
      }, s.apply(this, arguments);
    };
    function c(x, O) {
      var A = typeof Symbol == "function" && x[Symbol.iterator];
      if (!A) return x;
      var S, P, j = A.call(x), U = [];
      try {
        for (; (O === void 0 || O-- > 0) && !(S = j.next()).done; ) U.push(S.value);
      } catch (N) {
        P = { error: N };
      } finally {
        try {
          S && !S.done && (A = j.return) && A.call(j);
        } finally {
          if (P) throw P.error;
        }
      }
      return U;
    }
    function d(x, O) {
      return [x, !x || x.endsWith("/") ? "" : "/", O, ".json"].join("");
    }
    function l(x, O) {
      var A = x;
      return O && Object.keys(O).forEach(function(S) {
        var P = O[S], j = new RegExp("{".concat(S, "}"), "gm");
        A = A.replace(j, P.toString());
      }), A;
    }
    function u(x, O, A) {
      var S = x[O];
      if (!S) return A;
      var P = A.split("."), j = "";
      do {
        var U = S[j += P.shift()];
        U === void 0 || typeof U != "object" && P.length ? P.length ? j += "." : S = A : (S = U, j = "");
      } while (P.length);
      return S;
    }
    var h = {}, f = { root: "", lang: "en", fallbackLang: "en" }, m = i.createContext(null);
    o.TranslateContext = m, o.TranslateProvider = function(x) {
      var O = function(U, N) {
        U = Object.assign({}, f, U), h = N || h;
        var ae = c(a.useState(U.lang), 2), be = ae[0], se = ae[1], we = c(a.useState(h), 2), M = we[0], H = we[1], _e = c(a.useState(!1), 2), Ue = _e[0], Ie = _e[1], Ne = function(le) {
          if (!M.hasOwnProperty(le)) {
            Ie(!1);
            var ce = d(U.root, le);
            fetch(ce).then(function(me) {
              return me.json();
            }).then(function(me) {
              h[le] = me, H(s({}, h)), Ie(!0);
            }).catch(function(me) {
              console.log("Aww, snap.", me), H(s({}, h)), Ie(!0);
            });
          }
        };
        return a.useEffect(function() {
          Ne(U.fallbackLang), Ne(be);
        }, [be]), { lang: be, setLang: se, t: function(le, ce) {
          if (!M.hasOwnProperty(be)) return le;
          var me = u(M, be, le);
          return me === le && be !== U.fallbackLang && (me = u(M, U.fallbackLang, le)), l(me, ce);
        }, isReady: Ue };
      }({ root: x.root || "assets", lang: x.lang || "en", fallbackLang: x.fallbackLang || "en" }, x.translations), A = O.t, S = O.setLang, P = O.lang, j = O.isReady;
      return i.h(m.Provider, { value: { t: A, setLang: S, lang: P, isReady: j } }, x.children);
    }, o.format = l, o.getResourceUrl = d, o.getValue = u, Object.defineProperty(o, "__esModule", { value: !0 });
  })(e, t(616), t(78));
}, 633: (n, e) => {
  var t;
  (function() {
    var o = {}.hasOwnProperty;
    function i() {
      for (var a = [], s = 0; s < arguments.length; s++) {
        var c = arguments[s];
        if (c) {
          var d = typeof c;
          if (d === "string" || d === "number") a.push(c);
          else if (Array.isArray(c)) {
            if (c.length) {
              var l = i.apply(null, c);
              l && a.push(l);
            }
          } else if (d === "object") {
            if (c.toString !== Object.prototype.toString && !c.toString.toString().includes("[native code]")) {
              a.push(c.toString());
              continue;
            }
            for (var u in c) o.call(c, u) && c[u] && a.push(u);
          }
        }
      }
      return a.join(" ");
    }
    n.exports ? (i.default = i, n.exports = i) : (t = (function() {
      return i;
    }).apply(e, [])) === void 0 || (n.exports = t);
  })();
}, 21: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, '.hanko_accordion{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);width:100%;overflow:hidden}.hanko_accordion .hanko_accordionItem{color:var(--color, #333333);margin:.25rem 0;overflow:hidden}.hanko_accordion .hanko_accordionItem.hanko_dropdown{margin:0}.hanko_accordion .hanko_accordionItem .hanko_label{border-radius:var(--border-radius, 8px);border-style:none;height:var(--item-height, 42px);background:var(--background-color, white);box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;padding:0 1rem;margin:0;cursor:pointer;transition:all .35s}.hanko_accordion .hanko_accordionItem .hanko_label .hanko_labelText{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hanko_accordion .hanko_accordionItem .hanko_label .hanko_labelText .hanko_description{color:var(--color-shade-1, #8f9095)}.hanko_accordion .hanko_accordionItem .hanko_label.hanko_dropdown{margin:0;color:var(--link-color, #506cf0);justify-content:flex-start}.hanko_accordion .hanko_accordionItem .hanko_label:hover{color:var(--brand-contrast-color, white);background:var(--brand-color-shade-1, #6b84fb)}.hanko_accordion .hanko_accordionItem .hanko_label:hover .hanko_description{color:var(--brand-contrast-color, white)}.hanko_accordion .hanko_accordionItem .hanko_label:hover.hanko_dropdown{color:var(--link-color, #506cf0);background:none}.hanko_accordion .hanko_accordionItem .hanko_label:not(.hanko_dropdown)::after{content:"";width:1rem;text-align:center;transition:all .35s}.hanko_accordion .hanko_accordionItem .hanko_accordionInput{position:absolute;opacity:0;z-index:-1}.hanko_accordion .hanko_accordionItem .hanko_accordionInput:checked+.hanko_label{color:var(--brand-contrast-color, white);background:var(--brand-color, #506cf0)}.hanko_accordion .hanko_accordionItem .hanko_accordionInput:checked+.hanko_label .hanko_description{color:var(--brand-contrast-color, white)}.hanko_accordion .hanko_accordionItem .hanko_accordionInput:checked+.hanko_label.hanko_dropdown{color:var(--link-color, #506cf0);background:none}.hanko_accordion .hanko_accordionItem .hanko_accordionInput:checked+.hanko_label:not(.hanko_dropdown)::after{transform:rotate(90deg)}.hanko_accordion .hanko_accordionItem .hanko_accordionInput:checked+.hanko_label~.hanko_accordionContent{margin:.25rem 1rem;opacity:1;max-height:100vh}.hanko_accordion .hanko_accordionItem .hanko_accordionContent{max-height:0;margin:0 1rem;opacity:0;overflow:hidden;transition:all .35s}.hanko_accordion .hanko_accordionItem .hanko_accordionContent.hanko_dropdownContent{border-style:none}', ""]), s.locals = { accordion: "hanko_accordion", accordionItem: "hanko_accordionItem", dropdown: "hanko_dropdown", label: "hanko_label", labelText: "hanko_labelText", description: "hanko_description", accordionInput: "hanko_accordionInput", accordionContent: "hanko_accordionContent", dropdownContent: "hanko_dropdownContent" };
  const c = s;
}, 905: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_errorBox{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);border-radius:var(--border-radius, 8px);border-style:var(--border-style, solid);border-width:var(--border-width, 1px);color:var(--error-color, #e82020);background:var(--background-color, white);margin:var(--item-margin, 0.5rem 0);display:flex;align-items:start;box-sizing:border-box;line-height:1.5rem;padding:.25em;gap:.2em}.hanko_errorBox>span{display:inline-flex}.hanko_errorBox>span:first-child{padding:.25em 0 .25em .19em}.hanko_errorBox[hidden]{display:none}.hanko_errorMessage{color:var(--error-color, #e82020)}", ""]), s.locals = { errorBox: "hanko_errorBox", errorMessage: "hanko_errorMessage" };
  const c = s;
}, 577: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, '.hanko_form{display:flex;flex-grow:1}.hanko_form .hanko_ul{flex-grow:1;margin:var(--item-margin, 0.5rem 0);padding-inline-start:0;list-style-type:none;display:flex;flex-wrap:wrap;gap:1em}.hanko_form .hanko_li{display:flex;max-width:100%;flex-grow:1;flex-basis:min-content}.hanko_form .hanko_li.hanko_maxWidth{min-width:100%}.hanko_button{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);border-radius:var(--border-radius, 8px);border-style:var(--border-style, solid);border-width:var(--border-width, 1px);white-space:nowrap;width:100%;min-width:var(--button-min-width, 7em);min-height:var(--item-height, 42px);outline:none;cursor:pointer;transition:.1s ease-out;flex-grow:1;flex-shrink:1;display:inline-flex}.hanko_button:disabled{cursor:default}.hanko_button.hanko_primary{color:var(--brand-contrast-color, white);background:var(--brand-color, #506cf0);border-color:var(--brand-color, #506cf0);justify-content:center}.hanko_button.hanko_primary:hover{color:var(--brand-contrast-color, white);background:var(--brand-color-shade-1, #6b84fb);border-color:var(--brand-color, #506cf0)}.hanko_button.hanko_primary:focus{color:var(--brand-contrast-color, white);background:var(--brand-color, #506cf0);border-color:var(--color, #333333)}.hanko_button.hanko_primary:disabled{color:var(--color-shade-1, #8f9095);background:var(--color-shade-2, #e5e6ef);border-color:var(--color-shade-2, #e5e6ef)}.hanko_button.hanko_secondary{color:var(--color, #333333);background:var(--background-color, white);border-color:var(--color, #333333);justify-content:flex-start}.hanko_button.hanko_secondary:hover{color:var(--color, #333333);background:var(--color-shade-2, #e5e6ef);border-color:var(--color, #333333)}.hanko_button.hanko_secondary:focus{color:var(--color, #333333);background:var(--background-color, white);border-color:var(--brand-color, #506cf0)}.hanko_button.hanko_secondary:disabled{color:var(--color-shade-1, #8f9095);background:var(--color-shade-2, #e5e6ef);border-color:var(--color-shade-1, #8f9095)}.hanko_button.hanko_dangerous{color:var(--error-color, #e82020);background:var(--background-color, white);border-color:var(--error-color, #e82020);flex-grow:0;width:auto}.hanko_caption{flex-grow:1;flex-wrap:wrap;display:flex;justify-content:space-between;align-items:baseline}.hanko_lastUsed{color:var(--color-shade-1, #8f9095);font-size:smaller}.hanko_inputWrapper{flex-grow:1;position:relative;display:flex;min-width:var(--input-min-width, 14em);max-width:100%}.hanko_input{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);border-radius:var(--border-radius, 8px);border-style:var(--border-style, solid);border-width:var(--border-width, 1px);height:var(--item-height, 42px);color:var(--color, #333333);border-color:var(--color-shade-1, #8f9095);background:var(--background-color, white);padding:0 .5rem;outline:none;width:100%;box-sizing:border-box;transition:.1s ease-out}.hanko_input.hanko_error{border-color:var(--error-color, #e82020)}.hanko_input:-webkit-autofill,.hanko_input:-webkit-autofill:hover,.hanko_input:-webkit-autofill:focus{-webkit-text-fill-color:var(--color, #333333);-webkit-box-shadow:0 0 0 50px var(--background-color, white) inset}.hanko_input::-ms-reveal,.hanko_input::-ms-clear{display:none}.hanko_input::placeholder{color:var(--color-shade-1, #8f9095)}.hanko_input:focus{color:var(--color, #333333);border-color:var(--color, #333333)}.hanko_input:disabled{color:var(--color-shade-1, #8f9095);background:var(--color-shade-2, #e5e6ef);border-color:var(--color-shade-1, #8f9095)}.hanko_passcodeInputWrapper{flex-grow:1;min-width:var(--input-min-width, 14em);max-width:fit-content;position:relative;display:flex;justify-content:space-between}.hanko_passcodeInputWrapper .hanko_passcodeDigitWrapper{flex-grow:1;margin:0 .5rem 0 0}.hanko_passcodeInputWrapper .hanko_passcodeDigitWrapper:last-child{margin:0}.hanko_passcodeInputWrapper .hanko_passcodeDigitWrapper .hanko_input{text-align:center}.hanko_checkboxWrapper{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);color:var(--color, #333333);align-items:center;display:flex}.hanko_checkboxWrapper .hanko_label{color:inherit;padding-left:.5rem;cursor:pointer}.hanko_checkboxWrapper .hanko_label.hanko_disabled{cursor:default;color:var(--color-shade-1, #8f9095)}.hanko_checkboxWrapper .hanko_checkbox{border:currentColor solid 1px;border-radius:.15em;appearance:none;-webkit-appearance:none;width:1.1rem;height:1.1rem;margin:0;color:currentColor;background-color:var(--background-color, white);font:inherit;box-shadow:none;display:inline-flex;place-content:center;cursor:pointer}.hanko_checkboxWrapper .hanko_checkbox:checked{background-color:var(--color, #333333)}.hanko_checkboxWrapper .hanko_checkbox:disabled{cursor:default;background-color:var(--color-shade-2, #e5e6ef);border-color:var(--color-shade-1, #8f9095)}.hanko_checkboxWrapper .hanko_checkbox:checked:after{content:"";color:var(--background-color, white);position:absolute;line-height:1.1rem}.hanko_checkboxWrapper .hanko_checkbox:disabled:after{color:var(--color-shade-1, #8f9095)}', ""]), s.locals = { form: "hanko_form", ul: "hanko_ul", li: "hanko_li", maxWidth: "hanko_maxWidth", button: "hanko_button", primary: "hanko_primary", secondary: "hanko_secondary", dangerous: "hanko_dangerous", caption: "hanko_caption", lastUsed: "hanko_lastUsed", inputWrapper: "hanko_inputWrapper", input: "hanko_input", error: "hanko_error", passcodeInputWrapper: "hanko_passcodeInputWrapper", passcodeDigitWrapper: "hanko_passcodeDigitWrapper", checkboxWrapper: "hanko_checkboxWrapper", label: "hanko_label", disabled: "hanko_disabled", checkbox: "hanko_checkbox" };
  const c = s;
}, 619: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_headline{color:var(--color, #333333);font-family:var(--font-family, sans-serif);text-align:left;letter-spacing:0;font-style:normal;line-height:1.1}.hanko_headline.hanko_grade1{font-size:var(--headline1-font-size, 24px);font-weight:var(--headline1-font-weight, 600);margin:var(--headline1-margin, 0 0 0.5rem)}.hanko_headline.hanko_grade2{font-size:var(--headline2-font-size, 16px);font-weight:var(--headline2-font-weight, 600);margin:var(--headline2-margin, 1rem 0 0.5rem)}", ""]), s.locals = { headline: "hanko_headline", grade1: "hanko_grade1", grade2: "hanko_grade2" };
  const c = s;
}, 697: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_icon,.hanko_loadingSpinnerWrapper .hanko_loadingSpinner,.hanko_loadingSpinnerWrapperIcon .hanko_loadingSpinner,.hanko_exclamationMark,.hanko_checkmark{display:inline-block;fill:var(--brand-contrast-color, white);width:18px}.hanko_icon.hanko_secondary,.hanko_loadingSpinnerWrapper .hanko_secondary.hanko_loadingSpinner,.hanko_loadingSpinnerWrapperIcon .hanko_secondary.hanko_loadingSpinner,.hanko_secondary.hanko_exclamationMark,.hanko_secondary.hanko_checkmark{fill:var(--color, #333333)}.hanko_icon.hanko_disabled,.hanko_loadingSpinnerWrapper .hanko_disabled.hanko_loadingSpinner,.hanko_loadingSpinnerWrapperIcon .hanko_disabled.hanko_loadingSpinner,.hanko_disabled.hanko_exclamationMark,.hanko_disabled.hanko_checkmark{fill:var(--color-shade-1, #8f9095)}.hanko_checkmark{fill:var(--brand-color, #506cf0)}.hanko_checkmark.hanko_secondary{fill:var(--color-shade-1, #8f9095)}.hanko_checkmark.hanko_fadeOut{animation:hanko_fadeOut ease-out 1.5s forwards !important}@keyframes hanko_fadeOut{0%{opacity:1}100%{opacity:0}}.hanko_exclamationMark{fill:var(--error-color, #e82020)}.hanko_loadingSpinnerWrapperIcon{width:100%;column-gap:10px;margin-left:10px}.hanko_loadingSpinnerWrapper,.hanko_loadingSpinnerWrapperIcon{display:inline-flex;align-items:center;height:100%;margin:0 5px;justify-content:inherit;flex-wrap:inherit}.hanko_loadingSpinnerWrapper.hanko_centerContent,.hanko_centerContent.hanko_loadingSpinnerWrapperIcon{justify-content:center}.hanko_loadingSpinnerWrapper.hanko_maxWidth,.hanko_maxWidth.hanko_loadingSpinnerWrapperIcon{width:100%}.hanko_loadingSpinnerWrapper .hanko_loadingSpinner,.hanko_loadingSpinnerWrapperIcon .hanko_loadingSpinner{fill:var(--brand-color, #506cf0);animation:hanko_spin 500ms ease-in-out infinite}.hanko_loadingSpinnerWrapper.hanko_secondary,.hanko_secondary.hanko_loadingSpinnerWrapperIcon{fill:var(--color-shade-1, #8f9095)}@keyframes hanko_spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.hanko_googleIcon.hanko_disabled{fill:var(--color-shade-1, #8f9095)}.hanko_googleIcon.hanko_blue{fill:#4285f4}.hanko_googleIcon.hanko_green{fill:#34a853}.hanko_googleIcon.hanko_yellow{fill:#fbbc05}.hanko_googleIcon.hanko_red{fill:#ea4335}.hanko_microsoftIcon.hanko_disabled{fill:var(--color-shade-1, #8f9095)}.hanko_microsoftIcon.hanko_blue{fill:#00a4ef}.hanko_microsoftIcon.hanko_green{fill:#7fba00}.hanko_microsoftIcon.hanko_yellow{fill:#ffb900}.hanko_microsoftIcon.hanko_red{fill:#f25022}.hanko_facebookIcon.hanko_outline{fill:#0866ff}.hanko_facebookIcon.hanko_disabledOutline{fill:var(--color-shade-1, #8f9095)}.hanko_facebookIcon.hanko_letter{fill:#fff}.hanko_facebookIcon.hanko_disabledLetter{fill:var(--color-shade-2, #e5e6ef)}", ""]), s.locals = { icon: "hanko_icon", loadingSpinnerWrapper: "hanko_loadingSpinnerWrapper", loadingSpinner: "hanko_loadingSpinner", loadingSpinnerWrapperIcon: "hanko_loadingSpinnerWrapperIcon", exclamationMark: "hanko_exclamationMark", checkmark: "hanko_checkmark", secondary: "hanko_secondary", disabled: "hanko_disabled", fadeOut: "hanko_fadeOut", centerContent: "hanko_centerContent", maxWidth: "hanko_maxWidth", spin: "hanko_spin", googleIcon: "hanko_googleIcon", blue: "hanko_blue", green: "hanko_green", yellow: "hanko_yellow", red: "hanko_red", microsoftIcon: "hanko_microsoftIcon", facebookIcon: "hanko_facebookIcon", outline: "hanko_outline", disabledOutline: "hanko_disabledOutline", letter: "hanko_letter", disabledLetter: "hanko_disabledLetter" };
  const c = s;
}, 995: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_link{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);color:var(--link-color, #506cf0);text-decoration:var(--link-text-decoration, none);cursor:pointer;background:none !important;border:none;padding:0 !important;transition:all .1s}.hanko_link:hover{text-decoration:var(--link-text-decoration-hover, underline)}.hanko_link:disabled{color:var(--color, #333333) !important;pointer-events:none;cursor:default}.hanko_link.hanko_danger{color:var(--error-color, #e82020)}.hanko_linkWrapper{display:inline-flex;flex-direction:row;justify-content:space-between;align-items:center;overflow:hidden}.hanko_linkWrapper.hanko_reverse{flex-direction:row-reverse}", ""]), s.locals = { link: "hanko_link", danger: "hanko_danger", linkWrapper: "hanko_linkWrapper", reverse: "hanko_reverse" };
  const c = s;
}, 560: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_otpCreationDetails{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);color:var(--color, #333333);margin:var(--item-margin, 0.5rem 0);display:flex;justify-content:center;align-items:center;flex-direction:column;font-size:smaller}", ""]), s.locals = { otpCreationDetails: "hanko_otpCreationDetails" };
  const c = s;
}, 489: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_paragraph{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);color:var(--color, #333333);margin:var(--item-margin, 0.5rem 0);text-align:left;word-break:break-word}", ""]), s.locals = { paragraph: "hanko_paragraph" };
  const c = s;
}, 111: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_spacer{height:1em}.hanko_divider{font-weight:var(--font-weight, 400);font-size:var(--font-size, 16px);font-family:var(--font-family, sans-serif);line-height:var(--line-height, 1.4rem);display:flex;visibility:var(--divider-visibility, visible);color:var(--color-shade-1, #8f9095);margin:var(--item-margin, 0.5rem 0);padding:.5em 0}.hanko_divider .hanko_line{border-bottom-style:var(--border-style, solid);border-bottom-width:var(--border-width, 1px);color:inherit;font:inherit;width:100%}.hanko_divider .hanko_text{font:inherit;color:inherit;background:var(--background-color, white);padding:var(--divider-padding, 0 42px);line-height:.1em}", ""]), s.locals = { spacer: "hanko_spacer", divider: "hanko_divider", line: "hanko_line", text: "hanko_text" };
  const c = s;
}, 914: (n, e, t) => {
  t.d(e, { A: () => c });
  var o = t(645), i = t.n(o), a = t(278), s = t.n(a)()(i());
  s.push([n.id, ".hanko_container{background-color:var(--background-color, white);padding:var(--container-padding, 30px);max-width:var(--container-max-width, 410px);display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:center;align-items:center;align-content:flex-start;box-sizing:border-box}.hanko_content{box-sizing:border-box;flex:0 1 auto;width:100%;height:100%}.hanko_footer{padding:.5rem 0 0;box-sizing:border-box;width:100%}.hanko_footer :nth-child(1){float:left}.hanko_footer :nth-child(2){float:right}.hanko_clipboardContainer{display:flex}.hanko_clipboardIcon{display:flex;margin:auto;cursor:pointer}", ""]), s.locals = { container: "hanko_container", content: "hanko_content", footer: "hanko_footer", clipboardContainer: "hanko_clipboardContainer", clipboardIcon: "hanko_clipboardIcon" };
  const c = s;
}, 278: (n) => {
  n.exports = function(e) {
    var t = [];
    return t.toString = function() {
      return this.map(function(o) {
        var i = "", a = o[5] !== void 0;
        return o[4] && (i += "@supports (".concat(o[4], ") {")), o[2] && (i += "@media ".concat(o[2], " {")), a && (i += "@layer".concat(o[5].length > 0 ? " ".concat(o[5]) : "", " {")), i += e(o), a && (i += "}"), o[2] && (i += "}"), o[4] && (i += "}"), i;
      }).join("");
    }, t.i = function(o, i, a, s, c) {
      typeof o == "string" && (o = [[null, o, void 0]]);
      var d = {};
      if (a) for (var l = 0; l < this.length; l++) {
        var u = this[l][0];
        u != null && (d[u] = !0);
      }
      for (var h = 0; h < o.length; h++) {
        var f = [].concat(o[h]);
        a && d[f[0]] || (c !== void 0 && (f[5] === void 0 || (f[1] = "@layer".concat(f[5].length > 0 ? " ".concat(f[5]) : "", " {").concat(f[1], "}")), f[5] = c), i && (f[2] && (f[1] = "@media ".concat(f[2], " {").concat(f[1], "}")), f[2] = i), s && (f[4] ? (f[1] = "@supports (".concat(f[4], ") {").concat(f[1], "}"), f[4] = s) : f[4] = "".concat(s)), t.push(f));
      }
    }, t;
  };
}, 645: (n) => {
  n.exports = function(e) {
    return e[1];
  };
}, 616: (n, e, t) => {
  t.r(e), t.d(e, { Component: () => N, Fragment: () => U, cloneElement: () => We, createContext: () => Fe, createElement: () => S, createRef: () => j, h: () => S, hydrate: () => He, isValidElement: () => s, options: () => i, render: () => ge, toChildArray: () => _e });
  var o, i, a, s, c, d, l, u, h, f = {}, m = [], x = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function O(g, v) {
    for (var b in v) g[b] = v[b];
    return g;
  }
  function A(g) {
    var v = g.parentNode;
    v && v.removeChild(g);
  }
  function S(g, v, b) {
    var D, T, I, z = {};
    for (I in v) I == "key" ? D = v[I] : I == "ref" ? T = v[I] : z[I] = v[I];
    if (arguments.length > 2 && (z.children = arguments.length > 3 ? o.call(arguments, 2) : b), typeof g == "function" && g.defaultProps != null) for (I in g.defaultProps) z[I] === void 0 && (z[I] = g.defaultProps[I]);
    return P(g, z, D, T, null);
  }
  function P(g, v, b, D, T) {
    var I = { type: g, props: v, key: b, ref: D, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: T ?? ++a };
    return T == null && i.vnode != null && i.vnode(I), I;
  }
  function j() {
    return { current: null };
  }
  function U(g) {
    return g.children;
  }
  function N(g, v) {
    this.props = g, this.context = v;
  }
  function ae(g, v) {
    if (v == null) return g.__ ? ae(g.__, g.__.__k.indexOf(g) + 1) : null;
    for (var b; v < g.__k.length; v++) if ((b = g.__k[v]) != null && b.__e != null) return b.__e;
    return typeof g.type == "function" ? ae(g) : null;
  }
  function be(g) {
    var v, b;
    if ((g = g.__) != null && g.__c != null) {
      for (g.__e = g.__c.base = null, v = 0; v < g.__k.length; v++) if ((b = g.__k[v]) != null && b.__e != null) {
        g.__e = g.__c.base = b.__e;
        break;
      }
      return be(g);
    }
  }
  function se(g) {
    (!g.__d && (g.__d = !0) && c.push(g) && !we.__r++ || d !== i.debounceRendering) && ((d = i.debounceRendering) || l)(we);
  }
  function we() {
    var g, v, b, D, T, I, z, X;
    for (c.sort(u); g = c.shift(); ) g.__d && (v = c.length, D = void 0, T = void 0, z = (I = (b = g).__v).__e, (X = b.__P) && (D = [], (T = O({}, I)).__v = I.__v + 1, De(X, I, T, b.__n, X.ownerSVGElement !== void 0, I.__h != null ? [z] : null, D, z ?? ae(I), I.__h), k(D, I), I.__e != z && be(I)), c.length > v && c.sort(u));
    we.__r = 0;
  }
  function M(g, v, b, D, T, I, z, X, Q, ye) {
    var w, ke, J, R, E, Se, V, F = D && D.__k || m, qe = F.length;
    for (b.__k = [], w = 0; w < v.length; w++) if ((R = b.__k[w] = (R = v[w]) == null || typeof R == "boolean" || typeof R == "function" ? null : typeof R == "string" || typeof R == "number" || typeof R == "bigint" ? P(null, R, null, null, R) : Array.isArray(R) ? P(U, { children: R }, null, null, null) : R.__b > 0 ? P(R.type, R.props, R.key, R.ref ? R.ref : null, R.__v) : R) != null) {
      if (R.__ = b, R.__b = b.__b + 1, (J = F[w]) === null || J && R.key == J.key && R.type === J.type) F[w] = void 0;
      else for (ke = 0; ke < qe; ke++) {
        if ((J = F[ke]) && R.key == J.key && R.type === J.type) {
          F[ke] = void 0;
          break;
        }
        J = null;
      }
      De(g, R, J = J || f, T, I, z, X, Q, ye), E = R.__e, (ke = R.ref) && J.ref != ke && (V || (V = []), J.ref && V.push(J.ref, null, R), V.push(ke, R.__c || E, R)), E != null ? (Se == null && (Se = E), typeof R.type == "function" && R.__k === J.__k ? R.__d = Q = H(R, Q, g) : Q = Ue(g, R, J, F, E, Q), typeof b.type == "function" && (b.__d = Q)) : Q && J.__e == Q && Q.parentNode != g && (Q = ae(J));
    }
    for (b.__e = Se, w = qe; w--; ) F[w] != null && (typeof b.type == "function" && F[w].__e != null && F[w].__e == b.__d && (b.__d = Ie(D).nextSibling), $(F[w], F[w]));
    if (V) for (w = 0; w < V.length; w++) y(V[w], V[++w], V[++w]);
  }
  function H(g, v, b) {
    for (var D, T = g.__k, I = 0; T && I < T.length; I++) (D = T[I]) && (D.__ = g, v = typeof D.type == "function" ? H(D, v, b) : Ue(b, D, D, T, D.__e, v));
    return v;
  }
  function _e(g, v) {
    return v = v || [], g == null || typeof g == "boolean" || (Array.isArray(g) ? g.some(function(b) {
      _e(b, v);
    }) : v.push(g)), v;
  }
  function Ue(g, v, b, D, T, I) {
    var z, X, Q;
    if (v.__d !== void 0) z = v.__d, v.__d = void 0;
    else if (b == null || T != I || T.parentNode == null) e: if (I == null || I.parentNode !== g) g.appendChild(T), z = null;
    else {
      for (X = I, Q = 0; (X = X.nextSibling) && Q < D.length; Q += 1) if (X == T) break e;
      g.insertBefore(T, I), z = I;
    }
    return z !== void 0 ? z : T.nextSibling;
  }
  function Ie(g) {
    var v, b, D;
    if (g.type == null || typeof g.type == "string") return g.__e;
    if (g.__k) {
      for (v = g.__k.length - 1; v >= 0; v--) if ((b = g.__k[v]) && (D = Ie(b))) return D;
    }
    return null;
  }
  function Ne(g, v, b) {
    v[0] === "-" ? g.setProperty(v, b ?? "") : g[v] = b == null ? "" : typeof b != "number" || x.test(v) ? b : b + "px";
  }
  function le(g, v, b, D, T) {
    var I;
    e: if (v === "style") if (typeof b == "string") g.style.cssText = b;
    else {
      if (typeof D == "string" && (g.style.cssText = D = ""), D) for (v in D) b && v in b || Ne(g.style, v, "");
      if (b) for (v in b) D && b[v] === D[v] || Ne(g.style, v, b[v]);
    }
    else if (v[0] === "o" && v[1] === "n") I = v !== (v = v.replace(/Capture$/, "")), v = v.toLowerCase() in g ? v.toLowerCase().slice(2) : v.slice(2), g.l || (g.l = {}), g.l[v + I] = b, b ? D || g.addEventListener(v, I ? me : ce, I) : g.removeEventListener(v, I ? me : ce, I);
    else if (v !== "dangerouslySetInnerHTML") {
      if (T) v = v.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (v !== "width" && v !== "height" && v !== "href" && v !== "list" && v !== "form" && v !== "tabIndex" && v !== "download" && v in g) try {
        g[v] = b ?? "";
        break e;
      } catch {
      }
      typeof b == "function" || (b == null || b === !1 && v.indexOf("-") == -1 ? g.removeAttribute(v) : g.setAttribute(v, b));
    }
  }
  function ce(g) {
    return this.l[g.type + !1](i.event ? i.event(g) : g);
  }
  function me(g) {
    return this.l[g.type + !0](i.event ? i.event(g) : g);
  }
  function De(g, v, b, D, T, I, z, X, Q) {
    var ye, w, ke, J, R, E, Se, V, F, qe, it, fe, Vt, at, q, B = v.type;
    if (v.constructor !== void 0) return null;
    b.__h != null && (Q = b.__h, X = v.__e = b.__e, v.__h = null, I = [X]), (ye = i.__b) && ye(v);
    try {
      e: if (typeof B == "function") {
        if (V = v.props, F = (ye = B.contextType) && D[ye.__c], qe = ye ? F ? F.props.value : ye.__ : D, b.__c ? Se = (w = v.__c = b.__c).__ = w.__E : ("prototype" in B && B.prototype.render ? v.__c = w = new B(V, qe) : (v.__c = w = new N(V, qe), w.constructor = B, w.render = K), F && F.sub(w), w.props = V, w.state || (w.state = {}), w.context = qe, w.__n = D, ke = w.__d = !0, w.__h = [], w._sb = []), w.__s == null && (w.__s = w.state), B.getDerivedStateFromProps != null && (w.__s == w.state && (w.__s = O({}, w.__s)), O(w.__s, B.getDerivedStateFromProps(V, w.__s))), J = w.props, R = w.state, w.__v = v, ke) B.getDerivedStateFromProps == null && w.componentWillMount != null && w.componentWillMount(), w.componentDidMount != null && w.__h.push(w.componentDidMount);
        else {
          if (B.getDerivedStateFromProps == null && V !== J && w.componentWillReceiveProps != null && w.componentWillReceiveProps(V, qe), !w.__e && w.shouldComponentUpdate != null && w.shouldComponentUpdate(V, w.__s, qe) === !1 || v.__v === b.__v) {
            for (v.__v !== b.__v && (w.props = V, w.state = w.__s, w.__d = !1), w.__e = !1, v.__e = b.__e, v.__k = b.__k, v.__k.forEach(function(Qe) {
              Qe && (Qe.__ = v);
            }), it = 0; it < w._sb.length; it++) w.__h.push(w._sb[it]);
            w._sb = [], w.__h.length && z.push(w);
            break e;
          }
          w.componentWillUpdate != null && w.componentWillUpdate(V, w.__s, qe), w.componentDidUpdate != null && w.__h.push(function() {
            w.componentDidUpdate(J, R, E);
          });
        }
        if (w.context = qe, w.props = V, w.__P = g, fe = i.__r, Vt = 0, "prototype" in B && B.prototype.render) {
          for (w.state = w.__s, w.__d = !1, fe && fe(v), ye = w.render(w.props, w.state, w.context), at = 0; at < w._sb.length; at++) w.__h.push(w._sb[at]);
          w._sb = [];
        } else do
          w.__d = !1, fe && fe(v), ye = w.render(w.props, w.state, w.context), w.state = w.__s;
        while (w.__d && ++Vt < 25);
        w.state = w.__s, w.getChildContext != null && (D = O(O({}, D), w.getChildContext())), ke || w.getSnapshotBeforeUpdate == null || (E = w.getSnapshotBeforeUpdate(J, R)), q = ye != null && ye.type === U && ye.key == null ? ye.props.children : ye, M(g, Array.isArray(q) ? q : [q], v, b, D, T, I, z, X, Q), w.base = v.__e, v.__h = null, w.__h.length && z.push(w), Se && (w.__E = w.__ = null), w.__e = !1;
      } else I == null && v.__v === b.__v ? (v.__k = b.__k, v.__e = b.__e) : v.__e = p(b.__e, v, b, D, T, I, z, Q);
      (ye = i.diffed) && ye(v);
    } catch (Qe) {
      v.__v = null, (Q || I != null) && (v.__e = X, v.__h = !!Q, I[I.indexOf(X)] = null), i.__e(Qe, v, b);
    }
  }
  function k(g, v) {
    i.__c && i.__c(v, g), g.some(function(b) {
      try {
        g = b.__h, b.__h = [], g.some(function(D) {
          D.call(b);
        });
      } catch (D) {
        i.__e(D, b.__v);
      }
    });
  }
  function p(g, v, b, D, T, I, z, X) {
    var Q, ye, w, ke = b.props, J = v.props, R = v.type, E = 0;
    if (R === "svg" && (T = !0), I != null) {
      for (; E < I.length; E++) if ((Q = I[E]) && "setAttribute" in Q == !!R && (R ? Q.localName === R : Q.nodeType === 3)) {
        g = Q, I[E] = null;
        break;
      }
    }
    if (g == null) {
      if (R === null) return document.createTextNode(J);
      g = T ? document.createElementNS("http://www.w3.org/2000/svg", R) : document.createElement(R, J.is && J), I = null, X = !1;
    }
    if (R === null) ke === J || X && g.data === J || (g.data = J);
    else {
      if (I = I && o.call(g.childNodes), ye = (ke = b.props || f).dangerouslySetInnerHTML, w = J.dangerouslySetInnerHTML, !X) {
        if (I != null) for (ke = {}, E = 0; E < g.attributes.length; E++) ke[g.attributes[E].name] = g.attributes[E].value;
        (w || ye) && (w && (ye && w.__html == ye.__html || w.__html === g.innerHTML) || (g.innerHTML = w && w.__html || ""));
      }
      if (function(Se, V, F, qe, it) {
        var fe;
        for (fe in F) fe === "children" || fe === "key" || fe in V || le(Se, fe, null, F[fe], qe);
        for (fe in V) it && typeof V[fe] != "function" || fe === "children" || fe === "key" || fe === "value" || fe === "checked" || F[fe] === V[fe] || le(Se, fe, V[fe], F[fe], qe);
      }(g, J, ke, T, X), w) v.__k = [];
      else if (E = v.props.children, M(g, Array.isArray(E) ? E : [E], v, b, D, T && R !== "foreignObject", I, z, I ? I[0] : b.__k && ae(b, 0), X), I != null) for (E = I.length; E--; ) I[E] != null && A(I[E]);
      X || ("value" in J && (E = J.value) !== void 0 && (E !== g.value || R === "progress" && !E || R === "option" && E !== ke.value) && le(g, "value", E, ke.value, !1), "checked" in J && (E = J.checked) !== void 0 && E !== g.checked && le(g, "checked", E, ke.checked, !1));
    }
    return g;
  }
  function y(g, v, b) {
    try {
      typeof g == "function" ? g(v) : g.current = v;
    } catch (D) {
      i.__e(D, b);
    }
  }
  function $(g, v, b) {
    var D, T;
    if (i.unmount && i.unmount(g), (D = g.ref) && (D.current && D.current !== g.__e || y(D, null, v)), (D = g.__c) != null) {
      if (D.componentWillUnmount) try {
        D.componentWillUnmount();
      } catch (I) {
        i.__e(I, v);
      }
      D.base = D.__P = null, g.__c = void 0;
    }
    if (D = g.__k) for (T = 0; T < D.length; T++) D[T] && $(D[T], v, b || typeof g.type != "function");
    b || g.__e == null || A(g.__e), g.__ = g.__e = g.__d = void 0;
  }
  function K(g, v, b) {
    return this.constructor(g, b);
  }
  function ge(g, v, b) {
    var D, T, I;
    i.__ && i.__(g, v), T = (D = typeof b == "function") ? null : b && b.__k || v.__k, I = [], De(v, g = (!D && b || v).__k = S(U, null, [g]), T || f, f, v.ownerSVGElement !== void 0, !D && b ? [b] : T ? null : v.firstChild ? o.call(v.childNodes) : null, I, !D && b ? b : T ? T.__e : v.firstChild, D), k(I, g);
  }
  function He(g, v) {
    ge(g, v, He);
  }
  function We(g, v, b) {
    var D, T, I, z = O({}, g.props);
    for (I in v) I == "key" ? D = v[I] : I == "ref" ? T = v[I] : z[I] = v[I];
    return arguments.length > 2 && (z.children = arguments.length > 3 ? o.call(arguments, 2) : b), P(g.type, z, D || g.key, T || g.ref, null);
  }
  function Fe(g, v) {
    var b = { __c: v = "__cC" + h++, __: g, Consumer: function(D, T) {
      return D.children(T);
    }, Provider: function(D) {
      var T, I;
      return this.getChildContext || (T = [], (I = {})[v] = this, this.getChildContext = function() {
        return I;
      }, this.shouldComponentUpdate = function(z) {
        this.props.value !== z.value && T.some(function(X) {
          X.__e = !0, se(X);
        });
      }, this.sub = function(z) {
        T.push(z);
        var X = z.componentWillUnmount;
        z.componentWillUnmount = function() {
          T.splice(T.indexOf(z), 1), X && X.call(z);
        };
      }), D.children;
    } };
    return b.Provider.__ = b.Consumer.contextType = b;
  }
  o = m.slice, i = { __e: function(g, v, b, D) {
    for (var T, I, z; v = v.__; ) if ((T = v.__c) && !T.__) try {
      if ((I = T.constructor) && I.getDerivedStateFromError != null && (T.setState(I.getDerivedStateFromError(g)), z = T.__d), T.componentDidCatch != null && (T.componentDidCatch(g, D || {}), z = T.__d), z) return T.__E = T;
    } catch (X) {
      g = X;
    }
    throw g;
  } }, a = 0, s = function(g) {
    return g != null && g.constructor === void 0;
  }, N.prototype.setState = function(g, v) {
    var b;
    b = this.__s != null && this.__s !== this.state ? this.__s : this.__s = O({}, this.state), typeof g == "function" && (g = g(O({}, b), this.props)), g && O(b, g), g != null && this.__v && (v && this._sb.push(v), se(this));
  }, N.prototype.forceUpdate = function(g) {
    this.__v && (this.__e = !0, g && this.__h.push(g), se(this));
  }, N.prototype.render = U, c = [], l = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, u = function(g, v) {
    return g.__v.__b - v.__v.__b;
  }, we.__r = 0, h = 0;
}, 78: (n, e, t) => {
  t.r(e), t.d(e, { useCallback: () => se, useContext: () => we, useDebugValue: () => M, useEffect: () => j, useErrorBoundary: () => H, useId: () => _e, useImperativeHandle: () => ae, useLayoutEffect: () => U, useMemo: () => be, useReducer: () => P, useRef: () => N, useState: () => S });
  var o, i, a, s, c = t(616), d = 0, l = [], u = [], h = c.options.__b, f = c.options.__r, m = c.options.diffed, x = c.options.__c, O = c.options.unmount;
  function A(k, p) {
    c.options.__h && c.options.__h(i, k, d || p), d = 0;
    var y = i.__H || (i.__H = { __: [], __h: [] });
    return k >= y.__.length && y.__.push({ __V: u }), y.__[k];
  }
  function S(k) {
    return d = 1, P(De, k);
  }
  function P(k, p, y) {
    var $ = A(o++, 2);
    if ($.t = k, !$.__c && ($.__ = [y ? y(p) : De(void 0, p), function(We) {
      var Fe = $.__N ? $.__N[0] : $.__[0], g = $.t(Fe, We);
      Fe !== g && ($.__N = [g, $.__[1]], $.__c.setState({}));
    }], $.__c = i, !i.u)) {
      var K = function(We, Fe, g) {
        if (!$.__c.__H) return !0;
        var v = $.__c.__H.__.filter(function(D) {
          return D.__c;
        });
        if (v.every(function(D) {
          return !D.__N;
        })) return !ge || ge.call(this, We, Fe, g);
        var b = !1;
        return v.forEach(function(D) {
          if (D.__N) {
            var T = D.__[0];
            D.__ = D.__N, D.__N = void 0, T !== D.__[0] && (b = !0);
          }
        }), !(!b && $.__c.props === We) && (!ge || ge.call(this, We, Fe, g));
      };
      i.u = !0;
      var ge = i.shouldComponentUpdate, He = i.componentWillUpdate;
      i.componentWillUpdate = function(We, Fe, g) {
        if (this.__e) {
          var v = ge;
          ge = void 0, K(We, Fe, g), ge = v;
        }
        He && He.call(this, We, Fe, g);
      }, i.shouldComponentUpdate = K;
    }
    return $.__N || $.__;
  }
  function j(k, p) {
    var y = A(o++, 3);
    !c.options.__s && me(y.__H, p) && (y.__ = k, y.i = p, i.__H.__h.push(y));
  }
  function U(k, p) {
    var y = A(o++, 4);
    !c.options.__s && me(y.__H, p) && (y.__ = k, y.i = p, i.__h.push(y));
  }
  function N(k) {
    return d = 5, be(function() {
      return { current: k };
    }, []);
  }
  function ae(k, p, y) {
    d = 6, U(function() {
      return typeof k == "function" ? (k(p()), function() {
        return k(null);
      }) : k ? (k.current = p(), function() {
        return k.current = null;
      }) : void 0;
    }, y == null ? y : y.concat(k));
  }
  function be(k, p) {
    var y = A(o++, 7);
    return me(y.__H, p) ? (y.__V = k(), y.i = p, y.__h = k, y.__V) : y.__;
  }
  function se(k, p) {
    return d = 8, be(function() {
      return k;
    }, p);
  }
  function we(k) {
    var p = i.context[k.__c], y = A(o++, 9);
    return y.c = k, p ? (y.__ == null && (y.__ = !0, p.sub(i)), p.props.value) : k.__;
  }
  function M(k, p) {
    c.options.useDebugValue && c.options.useDebugValue(p ? p(k) : k);
  }
  function H(k) {
    var p = A(o++, 10), y = S();
    return p.__ = k, i.componentDidCatch || (i.componentDidCatch = function($, K) {
      p.__ && p.__($, K), y[1]($);
    }), [y[0], function() {
      y[1](void 0);
    }];
  }
  function _e() {
    var k = A(o++, 11);
    if (!k.__) {
      for (var p = i.__v; p !== null && !p.__m && p.__ !== null; ) p = p.__;
      var y = p.__m || (p.__m = [0, 0]);
      k.__ = "P" + y[0] + "-" + y[1]++;
    }
    return k.__;
  }
  function Ue() {
    for (var k; k = l.shift(); ) if (k.__P && k.__H) try {
      k.__H.__h.forEach(le), k.__H.__h.forEach(ce), k.__H.__h = [];
    } catch (p) {
      k.__H.__h = [], c.options.__e(p, k.__v);
    }
  }
  c.options.__b = function(k) {
    i = null, h && h(k);
  }, c.options.__r = function(k) {
    f && f(k), o = 0;
    var p = (i = k.__c).__H;
    p && (a === i ? (p.__h = [], i.__h = [], p.__.forEach(function(y) {
      y.__N && (y.__ = y.__N), y.__V = u, y.__N = y.i = void 0;
    })) : (p.__h.forEach(le), p.__h.forEach(ce), p.__h = [])), a = i;
  }, c.options.diffed = function(k) {
    m && m(k);
    var p = k.__c;
    p && p.__H && (p.__H.__h.length && (l.push(p) !== 1 && s === c.options.requestAnimationFrame || ((s = c.options.requestAnimationFrame) || Ne)(Ue)), p.__H.__.forEach(function(y) {
      y.i && (y.__H = y.i), y.__V !== u && (y.__ = y.__V), y.i = void 0, y.__V = u;
    })), a = i = null;
  }, c.options.__c = function(k, p) {
    p.some(function(y) {
      try {
        y.__h.forEach(le), y.__h = y.__h.filter(function($) {
          return !$.__ || ce($);
        });
      } catch ($) {
        p.some(function(K) {
          K.__h && (K.__h = []);
        }), p = [], c.options.__e($, y.__v);
      }
    }), x && x(k, p);
  }, c.options.unmount = function(k) {
    O && O(k);
    var p, y = k.__c;
    y && y.__H && (y.__H.__.forEach(function($) {
      try {
        le($);
      } catch (K) {
        p = K;
      }
    }), y.__H = void 0, p && c.options.__e(p, y.__v));
  };
  var Ie = typeof requestAnimationFrame == "function";
  function Ne(k) {
    var p, y = function() {
      clearTimeout($), Ie && cancelAnimationFrame(p), setTimeout(k);
    }, $ = setTimeout(y, 100);
    Ie && (p = requestAnimationFrame(y));
  }
  function le(k) {
    var p = i, y = k.__c;
    typeof y == "function" && (k.__c = void 0, y()), i = p;
  }
  function ce(k) {
    var p = i;
    k.__c = k.__(), i = p;
  }
  function me(k, p) {
    return !k || k.length !== p.length || p.some(function(y, $) {
      return y !== k[$];
    });
  }
  function De(k, p) {
    return typeof p == "function" ? p(k) : p;
  }
}, 292: (n) => {
  var e = [];
  function t(a) {
    for (var s = -1, c = 0; c < e.length; c++) if (e[c].identifier === a) {
      s = c;
      break;
    }
    return s;
  }
  function o(a, s) {
    for (var c = {}, d = [], l = 0; l < a.length; l++) {
      var u = a[l], h = s.base ? u[0] + s.base : u[0], f = c[h] || 0, m = "".concat(h, " ").concat(f);
      c[h] = f + 1;
      var x = t(m), O = { css: u[1], media: u[2], sourceMap: u[3], supports: u[4], layer: u[5] };
      if (x !== -1) e[x].references++, e[x].updater(O);
      else {
        var A = i(O, s);
        s.byIndex = l, e.splice(l, 0, { identifier: m, updater: A, references: 1 });
      }
      d.push(m);
    }
    return d;
  }
  function i(a, s) {
    var c = s.domAPI(s);
    return c.update(a), function(d) {
      if (d) {
        if (d.css === a.css && d.media === a.media && d.sourceMap === a.sourceMap && d.supports === a.supports && d.layer === a.layer) return;
        c.update(a = d);
      } else c.remove();
    };
  }
  n.exports = function(a, s) {
    var c = o(a = a || [], s = s || {});
    return function(d) {
      d = d || [];
      for (var l = 0; l < c.length; l++) {
        var u = t(c[l]);
        e[u].references--;
      }
      for (var h = o(d, s), f = 0; f < c.length; f++) {
        var m = t(c[f]);
        e[m].references === 0 && (e[m].updater(), e.splice(m, 1));
      }
      c = h;
    };
  };
}, 88: (n) => {
  n.exports = function(e) {
    var t = document.createElement("style");
    return e.setAttributes(t, e.attributes), e.insert(t, e.options), t;
  };
}, 884: (n, e, t) => {
  n.exports = function(o) {
    var i = t.nc;
    i && o.setAttribute("nonce", i);
  };
}, 360: (n) => {
  var e, t = (e = [], function(a, s) {
    return e[a] = s, e.filter(Boolean).join(`
`);
  });
  function o(a, s, c, d) {
    var l;
    if (c) l = "";
    else {
      l = "", d.supports && (l += "@supports (".concat(d.supports, ") {")), d.media && (l += "@media ".concat(d.media, " {"));
      var u = d.layer !== void 0;
      u && (l += "@layer".concat(d.layer.length > 0 ? " ".concat(d.layer) : "", " {")), l += d.css, u && (l += "}"), d.media && (l += "}"), d.supports && (l += "}");
    }
    if (a.styleSheet) a.styleSheet.cssText = t(s, l);
    else {
      var h = document.createTextNode(l), f = a.childNodes;
      f[s] && a.removeChild(f[s]), f.length ? a.insertBefore(h, f[s]) : a.appendChild(h);
    }
  }
  var i = { singleton: null, singletonCounter: 0 };
  n.exports = function(a) {
    if (typeof document > "u") return { update: function() {
    }, remove: function() {
    } };
    var s = i.singletonCounter++, c = i.singleton || (i.singleton = a.insertStyleElement(a));
    return { update: function(d) {
      o(c, s, !1, d);
    }, remove: function(d) {
      o(c, s, !0, d);
    } };
  };
}, 6: (n, e, t) => {
  t.d(e, { en: () => o });
  const o = { headlines: { error: "An error has occurred", loginEmail: "Sign in or create account", loginEmailNoSignup: "Sign in", loginFinished: "Login successful", loginPasscode: "Enter passcode", loginPassword: "Enter password", registerAuthenticator: "Create a passkey", registerConfirm: "Create account?", registerPassword: "Set new password", otpSetUp: "Set up authenticator app", profileEmails: "Emails", profilePassword: "Password", profilePasskeys: "Passkeys", isPrimaryEmail: "Primary email address", setPrimaryEmail: "Set primary email address", createEmail: "Enter a new email", createUsername: "Enter a new username", emailVerified: "Verified", emailUnverified: "Unverified", emailDelete: "Delete", renamePasskey: "Rename passkey", deletePasskey: "Delete passkey", lastUsedAt: "Last used at", createdAt: "Created at", connectedAccounts: "Connected accounts", deleteAccount: "Delete account", accountNotFound: "Account not found", signIn: "Sign in", signUp: "Create account", selectLoginMethod: "Select login method", setupLoginMethod: "Set up login method", lastUsed: "Last seen", ipAddress: "IP address", revokeSession: "Revoke session", profileSessions: "Sessions", mfaSetUp: "Set up MFA", securityKeySetUp: "Add security key", securityKeyLogin: "Security key", otpLogin: "Authentication code", renameSecurityKey: "Rename security key", deleteSecurityKey: "Delete security key", securityKeys: "Security keys", authenticatorApp: "Authenticator app", authenticatorAppAlreadySetUp: "Authenticator app is set up", authenticatorAppNotSetUp: "Set up authenticator app", trustDevice: "Trust this browser?" }, texts: { enterPasscode: 'Enter the passcode that was sent to "{emailAddress}".', enterPasscodeNoEmail: "Enter the passcode that was sent to your primary email address.", setupPasskey: "Sign in to your account easily and securely with a passkey. Note: Your biometric data is only stored on your devices and will never be shared with anyone.", createAccount: 'No account exists for "{emailAddress}". Do you want to create a new account?', otpEnterVerificationCode: "Enter the one-time password (OTP) obtained from your authenticator app below:", otpScanQRCode: "Scan the QR code using your authenticator app (such as Google Authenticator or any other TOTP app). Alternatively, you can manually enter the OTP secret key into the app.", otpSecretKey: "OTP secret key", passwordFormatHint: "Must be between {minLength} and {maxLength} characters long.", securityKeySetUp: "Use a dedicated security key via USB, Bluetooth, or NFC, or your mobile phone. Connect or activate your security key, then click the button below and follow the prompts to complete the registration.", setPrimaryEmail: "Set this email address to be used for contacting you.", isPrimaryEmail: "This email address will be used to contact you if necessary.", emailVerified: "This email address has been verified.", emailUnverified: "This email address has not been verified.", emailDelete: "If you delete this email address, it can no longer be used to sign in.", renamePasskey: "Set a name for the passkey.", deletePasskey: "Delete this passkey from your account.", deleteAccount: "Are you sure you want to delete this account? All data will be deleted immediately and cannot be recovered.", noAccountExists: 'No account exists for "{emailAddress}".', selectLoginMethodForFutureLogins: "Select one of the following login methods to use for future logins.", howDoYouWantToLogin: "How do you want to login?", mfaSetUp: "Protect your account with Multi-Factor Authentication (MFA). MFA adds an additional step to your login process, ensuring that even if your password or email account is compromised, your account stays secure.", securityKeyLogin: "Connect or activate your security key, then click the button below. Once ready, use it via USB, NFC, your mobile phone. Follow the prompts to complete the login process.", otpLogin: "Open your authenticator app to obtain the one-time password (OTP). Enter the code in the field below to complete your login.", renameSecurityKey: "Set a name for the security key.", deleteSecurityKey: "Delete this security key from your account.", authenticatorAppAlreadySetUp: "Your account is secured with an authenticator app that generates time-based one-time passwords (TOTP) for multi-factor authentication.", authenticatorAppNotSetUp: "Secure your account with an authenticator app that generates time-based one-time passwords (TOTP) for multi-factor authentication.", trustDevice: "If you trust this browser, you won’t need to enter your OTP (One-Time-Password) or use your security key for multi-factor authentication (MFA) the next time you log in." }, labels: { or: "or", no: "no", yes: "yes", email: "Email", continue: "Continue", copied: "copied", skip: "Skip", save: "Save", password: "Password", passkey: "Passkey", passcode: "Passcode", signInPassword: "Sign in with a password", signInPasscode: "Sign in with a passcode", forgotYourPassword: "Forgot your password?", back: "Back", signInPasskey: "Sign in with a passkey", registerAuthenticator: "Create a passkey", signIn: "Sign in", signUp: "Create account", sendNewPasscode: "Send new code", passwordRetryAfter: "Retry in {passwordRetryAfter}", passcodeResendAfter: "Request a new code in {passcodeResendAfter}", unverifiedEmail: "unverified", primaryEmail: "primary", setAsPrimaryEmail: "Set as primary", verify: "Verify", delete: "Delete", newEmailAddress: "New email address", newPassword: "New password", rename: "Rename", newPasskeyName: "New passkey name", addEmail: "Add email", createPasskey: "Create a passkey", webauthnUnsupported: "Passkeys are not supported by your browser", signInWith: "Sign in with {provider}", deleteAccount: "Yes, delete this account.", emailOrUsername: "Email or username", username: "Username", optional: "optional", dontHaveAnAccount: "Don't have an account?", alreadyHaveAnAccount: "Already have an account?", changeUsername: "Change username", setUsername: "Set username", changePassword: "Change password", setPassword: "Set password", revoke: "Revoke", currentSession: "Current session", authenticatorApp: "Authenticator app", securityKey: "Security key", securityKeyUse: "Use security key", newSecurityKeyName: "New security key name", createSecurityKey: "Add a security key", authenticatorAppManage: "Manage authenticator app", authenticatorAppAdd: "Set up", configured: "configured", useAnotherMethod: "Use another method", lastUsed: "Last used", trustDevice: "Trust this browser", staySignedIn: "Stay signed in" }, errors: { somethingWentWrong: "A technical error has occurred. Please try again later.", requestTimeout: "The request timed out.", invalidPassword: "Wrong email or password.", invalidPasscode: "The passcode provided was not correct.", passcodeAttemptsReached: "The passcode was entered incorrectly too many times. Please request a new code.", tooManyRequests: "Too many requests have been made. Please wait to repeat the requested operation.", unauthorized: "Your session has expired. Please log in again.", invalidWebauthnCredential: "This passkey cannot be used anymore.", passcodeExpired: "The passcode has expired. Please request a new one.", userVerification: "User verification required. Please ensure your authenticator device is protected with a PIN or biometric.", emailAddressAlreadyExistsError: "The email address already exists.", maxNumOfEmailAddressesReached: "No further email addresses can be added.", thirdPartyAccessDenied: "Access denied. The request was cancelled by the user or the provider has denied access for other reasons.", thirdPartyMultipleAccounts: "Cannot identify account. The email address is used by multiple accounts.", thirdPartyUnverifiedEmail: "Email verification required. Please verify the used email address with your provider.", signupDisabled: "Account registration is disabled.", handlerNotFoundError: "The current step in your process is not supported by this application version. Please try again later or contact support if the issue persists." }, flowErrors: { technical_error: "A technical error has occurred. Please try again later.", flow_expired_error: "The session has expired, please click the button to restart.", value_invalid_error: "The entered value is invalid.", passcode_invalid: "The passcode provided was not correct.", passkey_invalid: "This passkey cannot be used anymore", passcode_max_attempts_reached: "The passcode was entered incorrectly too many times. Please request a new code.", rate_limit_exceeded: "Too many requests have been made. Please wait to repeat the requested operation.", unknown_username_error: "The username is unknown.", unknown_email_error: "The email address is unknown.", username_already_exists: "The username is already taken.", invalid_username_error: "The username must contain only letters, numbers, and underscores.", email_already_exists: "The email is already taken.", not_found: "The requested resource was not found.", operation_not_permitted_error: "The operation is not permitted.", flow_discontinuity_error: "The process cannot be continued due to user settings or the provider's configuration.", form_data_invalid_error: "The submitted form data contains errors.", unauthorized: "Your session has expired. Please log in again.", value_missing_error: "The value is missing.", value_too_long_error: "Value is too long.", value_too_short_error: "The value is too short.", webauthn_credential_invalid_mfa_only: "This credential can be used as a second factor security key only.", webauthn_credential_already_exists: "The request either timed out, was canceled or the device is already registered. Please try again or try using another device.", platform_authenticator_required: "Your account is configured to use platform authenticators, but your current device or browser does not support this feature. Please try again with a compatible device or browser." } };
} }, $o = {};
function G(n) {
  var e = $o[n];
  if (e !== void 0) return e.exports;
  var t = $o[n] = { id: n, exports: {} };
  return ya[n].call(t.exports, t, t.exports, G), t.exports;
}
G.n = (n) => {
  var e = n && n.__esModule ? () => n.default : () => n;
  return G.d(e, { a: e }), e;
}, G.d = (n, e) => {
  for (var t in e) G.o(e, t) && !G.o(n, t) && Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
}, G.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e), G.r = (n) => {
  typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
}, G.nc = void 0;
var ie = {};
G.d(ie, { fK: () => wn, tJ: () => Ii, Z7: () => Cn, Q9: () => $i, Lv: () => ji, qQ: () => xn, I4: () => Mi, O8: () => Ce, ku: () => ao, ls: () => io, bO: () => ro, yv: () => An, AT: () => lo, m_: () => Wt, KG: () => so, DH: () => Sn, kf: () => fo, oY: () => Le, xg: () => Ti, Wg: () => Je, J: () => Ui, AC: () => co, D_: () => Xe, jx: () => Li, nX: () => uo, Nx: () => oo, Sd: () => gt, kz: () => us, fX: () => ho, qA: () => po, tz: () => go, gN: () => mo });
var Zn = {};
G.r(Zn), G.d(Zn, { apple: () => cr, checkmark: () => dr, copy: () => ur, customProvider: () => hr, discord: () => pr, exclamation: () => mr, facebook: () => gr, github: () => fr, google: () => vr, linkedin: () => _r, mail: () => yr, microsoft: () => br, passkey: () => kr, password: () => wr, qrCodeScanner: () => Sr, securityKey: () => xr, spinner: () => Ar });
var C = G(616), ba = 0;
function r(n, e, t, o, i, a) {
  var s, c, d = {};
  for (c in e) c == "ref" ? s = e[c] : d[c] = e[c];
  var l = { type: n, props: d, key: t, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --ba, __source: i, __self: a };
  if (typeof n == "function" && (s = n.defaultProps)) for (c in s) d[c] === void 0 && (d[c] = s[c]);
  return C.options.vnode && C.options.vnode(l), l;
}
function _n() {
  return _n = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, _n.apply(this, arguments);
}
var ka = ["context", "children"];
function wa(n) {
  this.getChildContext = function() {
    return n.context;
  };
  var e = n.children, t = function(o, i) {
    if (o == null) return {};
    var a, s, c = {}, d = Object.keys(o);
    for (s = 0; s < d.length; s++) i.indexOf(a = d[s]) >= 0 || (c[a] = o[a]);
    return c;
  }(n, ka);
  return (0, C.cloneElement)(e, t);
}
function Sa() {
  var n = new CustomEvent("_preact", { detail: {}, bubbles: !0, cancelable: !0 });
  this.dispatchEvent(n), this._vdom = (0, C.h)(wa, _n({}, this._props, { context: n.detail.context }), yi(this, this._vdomComponent)), (this.hasAttribute("hydrate") ? C.hydrate : C.render)(this._vdom, this._root);
}
function _i(n) {
  return n.replace(/-(\w)/g, function(e, t) {
    return t ? t.toUpperCase() : "";
  });
}
function xa(n, e, t) {
  if (this._vdom) {
    var o = {};
    o[n] = t = t ?? void 0, o[_i(n)] = t, this._vdom = (0, C.cloneElement)(this._vdom, o), (0, C.render)(this._vdom, this._root);
  }
}
function Aa() {
  (0, C.render)(this._vdom = null, this._root);
}
function To(n, e) {
  var t = this;
  return (0, C.h)("slot", _n({}, n, { ref: function(o) {
    o ? (t.ref = o, t._listener || (t._listener = function(i) {
      i.stopPropagation(), i.detail.context = e;
    }, o.addEventListener("_preact", t._listener))) : t.ref.removeEventListener("_preact", t._listener);
  } }));
}
function yi(n, e) {
  if (n.nodeType === 3) return n.data;
  if (n.nodeType !== 1) return null;
  var t = [], o = {}, i = 0, a = n.attributes, s = n.childNodes;
  for (i = a.length; i--; ) a[i].name !== "slot" && (o[a[i].name] = a[i].value, o[_i(a[i].name)] = a[i].value);
  for (i = s.length; i--; ) {
    var c = yi(s[i], null), d = s[i].slot;
    d ? o[d] = (0, C.h)(To, { name: d }, c) : t[i] = c;
  }
  var l = e ? (0, C.h)(To, null, t) : t;
  return (0, C.h)(e || n.nodeName.toLowerCase(), o, l);
}
var Z = G(7), _ = G(78);
function bi(n, e) {
  for (var t in e) n[t] = e[t];
  return n;
}
function Uo(n, e) {
  for (var t in n) if (t !== "__source" && !(t in e)) return !0;
  for (var o in e) if (o !== "__source" && n[o] !== e[o]) return !0;
  return !1;
}
function No(n) {
  this.props = n;
}
(No.prototype = new C.Component()).isPureReactComponent = !0, No.prototype.shouldComponentUpdate = function(n, e) {
  return Uo(this.props, n) || Uo(this.state, e);
};
var Mo = C.options.__b;
C.options.__b = function(n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), Mo && Mo(n);
};
var Ca = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911, Oa = (C.toChildArray, C.options.__e);
C.options.__e = function(n, e, t, o) {
  if (n.then) {
    for (var i, a = e; a = a.__; ) if ((i = a.__c) && i.__c) return e.__e == null && (e.__e = t.__e, e.__k = t.__k), i.__c(n, e);
  }
  Oa(n, e, t, o);
};
var Ro = C.options.unmount;
function ki(n, e, t) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), n.__c.__H = null), (n = bi({}, n)).__c != null && (n.__c.__P === t && (n.__c.__P = e), n.__c = null), n.__k = n.__k && n.__k.map(function(o) {
    return ki(o, e, t);
  })), n;
}
function wi(n, e, t) {
  return n && (n.__v = null, n.__k = n.__k && n.__k.map(function(o) {
    return wi(o, e, t);
  }), n.__c && n.__c.__P === e && (n.__e && t.insertBefore(n.__e, n.__d), n.__c.__e = !0, n.__c.__P = t)), n;
}
function Tn() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Si(n) {
  var e = n.__.__c;
  return e && e.__a && e.__a(n);
}
function Bt() {
  this.u = null, this.o = null;
}
C.options.unmount = function(n) {
  var e = n.__c;
  e && e.__R && e.__R(), e && n.__h === !0 && (n.type = null), Ro && Ro(n);
}, (Tn.prototype = new C.Component()).__c = function(n, e) {
  var t = e.__c, o = this;
  o.t == null && (o.t = []), o.t.push(t);
  var i = Si(o.__v), a = !1, s = function() {
    a || (a = !0, t.__R = null, i ? i(c) : c());
  };
  t.__R = s;
  var c = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var l = o.state.__a;
        o.__v.__k[0] = wi(l, l.__c.__P, l.__c.__O);
      }
      var u;
      for (o.setState({ __a: o.__b = null }); u = o.t.pop(); ) u.forceUpdate();
    }
  }, d = e.__h === !0;
  o.__u++ || d || o.setState({ __a: o.__b = o.__v.__k[0] }), n.then(s, s);
}, Tn.prototype.componentWillUnmount = function() {
  this.t = [];
}, Tn.prototype.render = function(n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = ki(this.__b, t, o.__O = o.__P);
    }
    this.__b = null;
  }
  var i = e.__a && (0, C.createElement)(C.Fragment, null, n.fallback);
  return i && (i.__h = null), [(0, C.createElement)(C.Fragment, null, e.__a ? null : n.children), i];
};
var qo = function(n, e, t) {
  if (++t[1] === t[0] && n.o.delete(e), n.props.revealOrder && (n.props.revealOrder[0] !== "t" || !n.o.size)) for (t = n.u; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    n.u = t = t[2];
  }
};
(Bt.prototype = new C.Component()).__a = function(n) {
  var e = this, t = Si(e.__v), o = e.o.get(n);
  return o[0]++, function(i) {
    var a = function() {
      e.props.revealOrder ? (o.push(i), qo(e, n, o)) : i();
    };
    t ? t(a) : a();
  };
}, Bt.prototype.render = function(n) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = (0, C.toChildArray)(n.children);
  n.revealOrder && n.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; ) this.o.set(e[t], this.u = [1, 0, this.u]);
  return n.children;
}, Bt.prototype.componentDidUpdate = Bt.prototype.componentDidMount = function() {
  var n = this;
  this.o.forEach(function(e, t) {
    qo(n, t, e);
  });
};
var Pa = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Ea = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ia = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Da = /[A-Z0-9]/g, ja = typeof document < "u", La = function(n) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
C.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n) {
  Object.defineProperty(C.Component.prototype, n, { configurable: !0, get: function() {
    return this["UNSAFE_" + n];
  }, set: function(e) {
    Object.defineProperty(this, n, { configurable: !0, writable: !0, value: e });
  } });
});
var zo = C.options.event;
function $a() {
}
function Ta() {
  return this.cancelBubble;
}
function Ua() {
  return this.defaultPrevented;
}
C.options.event = function(n) {
  return zo && (n = zo(n)), n.persist = $a, n.isPropagationStopped = Ta, n.isDefaultPrevented = Ua, n.nativeEvent = n;
};
var Ho = { configurable: !0, get: function() {
  return this.class;
} }, Wo = C.options.vnode;
C.options.vnode = function(n) {
  var e = n.type, t = n.props, o = t;
  if (typeof e == "string") {
    for (var i in o = {}, t) {
      var a = t[i];
      if (!(i === "value" && "defaultValue" in t && a == null || ja && i === "children" && e === "noscript")) {
        var s = i.toLowerCase();
        i === "defaultValue" && "value" in t && t.value == null ? i = "value" : i === "download" && a === !0 ? a = "" : s === "ondoubleclick" ? i = "ondblclick" : s !== "onchange" || e !== "input" && e !== "textarea" || La(t.type) ? s === "onfocus" ? i = "onfocusin" : s === "onblur" ? i = "onfocusout" : Ia.test(i) ? i = s : e.indexOf("-") === -1 && Ea.test(i) ? i = i.replace(Da, "-$&").toLowerCase() : a === null && (a = void 0) : s = i = "oninput", s === "oninput" && o[i = s] && (i = "oninputCapture"), o[i] = a;
      }
    }
    e == "select" && o.multiple && Array.isArray(o.value) && (o.value = (0, C.toChildArray)(t.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), e == "select" && o.defaultValue != null && (o.value = (0, C.toChildArray)(t.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), n.props = o, t.class != t.className && (Ho.enumerable = "className" in t, t.className != null && (o.class = t.className), Object.defineProperty(o, "className", Ho));
  }
  n.$$typeof = Pa, Wo && Wo(n);
};
var Fo = C.options.__r;
C.options.__r = function(n) {
  Fo && Fo(n), n.__c;
};
var Ko = C.options.diffed;
function xi(n) {
  const e = "==".slice(0, (4 - n.length % 4) % 4), t = n.replace(/-/g, "+").replace(/_/g, "/") + e, o = atob(t), i = new ArrayBuffer(o.length), a = new Uint8Array(i);
  for (let s = 0; s < o.length; s++) a[s] = o.charCodeAt(s);
  return i;
}
function Ai(n) {
  const e = new Uint8Array(n);
  let t = "";
  for (const o of e) t += String.fromCharCode(o);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
C.options.diffed = function(n) {
  Ko && Ko(n);
  var e = n.props, t = n.__e;
  t != null && n.type === "textarea" && "value" in e && e.value !== t.value && (t.value = e.value == null ? "" : e.value);
}, C.Fragment, _.useLayoutEffect, _.useState, _.useId, _.useReducer, _.useEffect, _.useLayoutEffect, _.useRef, _.useImperativeHandle, _.useMemo, _.useCallback, _.useContext, _.useDebugValue, C.createElement, C.createContext, C.createRef, C.Fragment, C.Component;
var ue = "copy", Be = "convert";
function _t(n, e, t) {
  if (e === ue) return t;
  if (e === Be) return n(t);
  if (e instanceof Array) return t.map((o) => _t(n, e[0], o));
  if (e instanceof Object) {
    const o = {};
    for (const [i, a] of Object.entries(e)) {
      if (a.derive) {
        const s = a.derive(t);
        s !== void 0 && (t[i] = s);
      }
      if (i in t) t[i] != null ? o[i] = _t(n, a.schema, t[i]) : o[i] = null;
      else if (a.required) throw new Error(`Missing key: ${i}`);
    }
    return o;
  }
}
function Jn(n, e) {
  return { required: !0, schema: n, derive: e };
}
function ve(n) {
  return { required: !0, schema: n };
}
function Ae(n) {
  return { required: !1, schema: n };
}
var Ci = { type: ve(ue), id: ve(Be), transports: Ae(ue) }, Oi = { appid: Ae(ue), appidExclude: Ae(ue), credProps: Ae(ue) }, Pi = { appid: Ae(ue), appidExclude: Ae(ue), credProps: Ae(ue) }, Na = { publicKey: ve({ rp: ve(ue), user: ve({ id: ve(Be), name: ve(ue), displayName: ve(ue) }), challenge: ve(Be), pubKeyCredParams: ve(ue), timeout: Ae(ue), excludeCredentials: Ae([Ci]), authenticatorSelection: Ae(ue), attestation: Ae(ue), extensions: Ae(Oi) }), signal: Ae(ue) }, Ma = { type: ve(ue), id: ve(ue), rawId: ve(Be), authenticatorAttachment: Ae(ue), response: ve({ clientDataJSON: ve(Be), attestationObject: ve(Be), transports: Jn(ue, (n) => {
  var e;
  return ((e = n.getTransports) == null ? void 0 : e.call(n)) || [];
}) }), clientExtensionResults: Jn(Pi, (n) => n.getClientExtensionResults()) }, Ra = { mediation: Ae(ue), publicKey: ve({ challenge: ve(Be), timeout: Ae(ue), rpId: Ae(ue), allowCredentials: Ae([Ci]), userVerification: Ae(ue), extensions: Ae(Oi) }), signal: Ae(ue) }, qa = { type: ve(ue), id: ve(ue), rawId: ve(Be), authenticatorAttachment: Ae(ue), response: ve({ clientDataJSON: ve(Be), authenticatorData: ve(Be), signature: ve(Be), userHandle: ve(Be) }), clientExtensionResults: Jn(Pi, (n) => n.getClientExtensionResults()) };
async function Vo(n) {
  const e = await navigator.credentials.create(function(t) {
    return _t(xi, Na, t);
  }(n));
  return function(t) {
    return _t(Ai, Ma, t);
  }(e);
}
async function Bo(n) {
  const e = await navigator.credentials.get(function(t) {
    return _t(xi, Ra, t);
  }(n));
  return function(t) {
    return _t(Ai, qa, t);
  }(e);
}
function yn() {
  return yn = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, yn.apply(this, arguments);
}
var za = 0;
function Ei(n) {
  return "__private_" + za++ + "_" + n;
}
function Un(n, e) {
  if (!Object.prototype.hasOwnProperty.call(n, e)) throw new TypeError("attempted to use private field on non-instance");
  return n;
}
class Ce extends Error {
  constructor(e, t, o) {
    super(e), this.code = void 0, this.cause = void 0, this.code = t, this.cause = o, Object.setPrototypeOf(this, Ce.prototype);
  }
}
class Le extends Ce {
  constructor(e) {
    super("Technical error", "somethingWentWrong", e), Object.setPrototypeOf(this, Le.prototype);
  }
}
class wn extends Ce {
  constructor(e, t) {
    super("Conflict error", "conflict", t), Object.setPrototypeOf(this, wn.prototype);
  }
}
class Sn extends Ce {
  constructor(e) {
    super("Request timed out error", "requestTimeout", e), Object.setPrototypeOf(this, Sn.prototype);
  }
}
class oo extends Ce {
  constructor(e) {
    super("Request cancelled error", "requestCancelled", e), Object.setPrototypeOf(this, oo.prototype);
  }
}
class io extends Ce {
  constructor(e) {
    super("Invalid password error", "invalidPassword", e), Object.setPrototypeOf(this, io.prototype);
  }
}
class ao extends Ce {
  constructor(e) {
    super("Invalid Passcode error", "invalidPasscode", e), Object.setPrototypeOf(this, ao.prototype);
  }
}
class ro extends Ce {
  constructor(e) {
    super("Invalid WebAuthn credential error", "invalidWebauthnCredential", e), Object.setPrototypeOf(this, ro.prototype);
  }
}
class so extends Ce {
  constructor(e) {
    super("Passcode expired error", "passcodeExpired", e), Object.setPrototypeOf(this, so.prototype);
  }
}
class lo extends Ce {
  constructor(e) {
    super("Maximum number of Passcode attempts reached error", "passcodeAttemptsReached", e), Object.setPrototypeOf(this, lo.prototype);
  }
}
class Wt extends Ce {
  constructor(e) {
    super("Not found error", "notFound", e), Object.setPrototypeOf(this, Wt.prototype);
  }
}
class co extends Ce {
  constructor(e, t) {
    super("Too many requests error", "tooManyRequests", t), this.retryAfter = void 0, this.retryAfter = e, Object.setPrototypeOf(this, co.prototype);
  }
}
class Xe extends Ce {
  constructor(e) {
    super("Unauthorized error", "unauthorized", e), Object.setPrototypeOf(this, Xe.prototype);
  }
}
class xn extends Ce {
  constructor(e) {
    super("Forbidden error", "forbidden", e), Object.setPrototypeOf(this, xn.prototype);
  }
}
class uo extends Ce {
  constructor(e) {
    super("User verification error", "userVerification", e), Object.setPrototypeOf(this, uo.prototype);
  }
}
class An extends Ce {
  constructor(e) {
    super("Maximum number of email addresses reached error", "maxNumOfEmailAddressesReached", e), Object.setPrototypeOf(this, An.prototype);
  }
}
class Cn extends Ce {
  constructor(e) {
    super("The email address already exists", "emailAddressAlreadyExistsError", e), Object.setPrototypeOf(this, Cn.prototype);
  }
}
class Je extends Ce {
  constructor(e, t) {
    super("An error occurred during third party sign up/sign in", e, t), Object.setPrototypeOf(this, Je.prototype);
  }
}
const ho = "hanko-session-created", po = "hanko-session-expired", mo = "hanko-user-logged-out", go = "hanko-user-deleted";
class Ii extends CustomEvent {
  constructor(e, t) {
    super(e, { detail: t });
  }
}
class Di {
  constructor() {
    this._dispatchEvent = document.dispatchEvent.bind(document);
  }
  dispatch(e, t) {
    this._dispatchEvent(new Ii(e, t));
  }
  dispatchSessionCreatedEvent(e) {
    this.dispatch(ho, e);
  }
  dispatchSessionExpiredEvent() {
    this.dispatch(po, null);
  }
  dispatchUserLoggedOutEvent() {
    this.dispatch(mo, null);
  }
  dispatchUserDeletedEvent() {
    this.dispatch(go, null);
  }
}
function Zt(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e];
    for (var o in t) n[o] = t[o];
  }
  return n;
}
var Nn = function n(e, t) {
  function o(i, a, s) {
    if (typeof document < "u") {
      typeof (s = Zt({}, t, s)).expires == "number" && (s.expires = new Date(Date.now() + 864e5 * s.expires)), s.expires && (s.expires = s.expires.toUTCString()), i = encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var c = "";
      for (var d in s) s[d] && (c += "; " + d, s[d] !== !0 && (c += "=" + s[d].split(";")[0]));
      return document.cookie = i + "=" + e.write(a, i) + c;
    }
  }
  return Object.create({ set: o, get: function(i) {
    if (typeof document < "u" && (!arguments.length || i)) {
      for (var a = document.cookie ? document.cookie.split("; ") : [], s = {}, c = 0; c < a.length; c++) {
        var d = a[c].split("="), l = d.slice(1).join("=");
        try {
          var u = decodeURIComponent(d[0]);
          if (s[u] = e.read(l, u), i === u) break;
        } catch {
        }
      }
      return i ? s[i] : s;
    }
  }, remove: function(i, a) {
    o(i, "", Zt({}, a, { expires: -1 }));
  }, withAttributes: function(i) {
    return n(this.converter, Zt({}, this.attributes, i));
  }, withConverter: function(i) {
    return n(Zt({}, this.converter, i), this.attributes);
  } }, { attributes: { value: Object.freeze(t) }, converter: { value: Object.freeze(e) } });
}({ read: function(n) {
  return n[0] === '"' && (n = n.slice(1, -1)), n.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
}, write: function(n) {
  return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
} }, { path: "/" });
class Ha {
  constructor(e) {
    var t;
    this.authCookieName = void 0, this.authCookieDomain = void 0, this.authCookieSameSite = void 0, this.authCookieName = e.cookieName, this.authCookieDomain = e.cookieDomain, this.authCookieSameSite = (t = e.cookieSameSite) != null ? t : "lax";
  }
  getAuthCookie() {
    return Nn.get(this.authCookieName);
  }
  setAuthCookie(e, t) {
    const o = { secure: !0, sameSite: this.authCookieSameSite };
    this.authCookieDomain !== void 0 && (o.domain = this.authCookieDomain);
    const i = yn({}, o, t);
    if ((i.sameSite === "none" || i.sameSite === "None") && i.secure === !1) throw new Le(new Error("Secure attribute must be set when SameSite=None"));
    Nn.set(this.authCookieName, e, i);
  }
  removeAuthCookie() {
    Nn.remove(this.authCookieName);
  }
}
class Wa {
  constructor(e) {
    this.keyName = void 0, this.keyName = e.keyName;
  }
  getSessionToken() {
    return sessionStorage.getItem(this.keyName);
  }
  setSessionToken(e) {
    sessionStorage.setItem(this.keyName, e);
  }
  removeSessionToken() {
    sessionStorage.removeItem(this.keyName);
  }
}
class Fa {
  constructor(e) {
    this._xhr = void 0, this._xhr = e;
  }
  getResponseHeader(e) {
    return this._xhr.getResponseHeader(e);
  }
}
class Ka {
  constructor(e) {
    this.headers = void 0, this.ok = void 0, this.status = void 0, this.statusText = void 0, this.url = void 0, this._decodedJSON = void 0, this.xhr = void 0, this.headers = new Fa(e), this.ok = e.status >= 200 && e.status <= 299, this.status = e.status, this.statusText = e.statusText, this.url = e.responseURL, this.xhr = e;
  }
  json() {
    return this._decodedJSON || (this._decodedJSON = JSON.parse(this.xhr.response)), this._decodedJSON;
  }
  parseNumericHeader(e) {
    const t = parseInt(this.headers.getResponseHeader(e), 10);
    return isNaN(t) ? 0 : t;
  }
}
class Va {
  constructor(e, t) {
    this.timeout = void 0, this.api = void 0, this.dispatcher = void 0, this.cookie = void 0, this.sessionTokenStorage = void 0, this.lang = void 0, this.sessionTokenLocation = void 0, this.api = e, this.timeout = t.timeout, this.dispatcher = new Di(), this.cookie = new Ha(yn({}, t)), this.sessionTokenStorage = new Wa({ keyName: t.cookieName }), this.lang = t.lang, this.sessionTokenLocation = t.sessionTokenLocation;
  }
  _fetch(e, t, o = new XMLHttpRequest()) {
    const i = this, a = this.api + e, s = this.timeout, c = this.getAuthToken(), d = this.lang;
    return new Promise(function(l, u) {
      o.open(t.method, a, !0), o.setRequestHeader("Accept", "application/json"), o.setRequestHeader("Content-Type", "application/json"), o.setRequestHeader("X-Language", d), c && o.setRequestHeader("Authorization", `Bearer ${c}`), o.timeout = s, o.withCredentials = !0, o.onload = () => {
        i.processHeaders(o), l(new Ka(o));
      }, o.onerror = () => {
        u(new Le());
      }, o.ontimeout = () => {
        u(new Sn());
      }, o.send(t.body ? t.body.toString() : null);
    });
  }
  _fetch_blocking(e, t, o = new XMLHttpRequest()) {
    const i = this.api + e, a = this.getAuthToken();
    return o.open(t.method, i, !1), o.setRequestHeader("Accept", "application/json"), o.setRequestHeader("Content-Type", "application/json"), a && o.setRequestHeader("Authorization", `Bearer ${a}`), o.withCredentials = !0, o.send(t.body ? t.body.toString() : null), o.responseText;
  }
  processHeaders(e) {
    let t = "", o = 0, i = "";
    if (e.getAllResponseHeaders().split(`\r
`).forEach((a) => {
      const s = a.toLowerCase();
      s.startsWith("x-auth-token") ? t = e.getResponseHeader("X-Auth-Token") : s.startsWith("x-session-lifetime") ? o = parseInt(e.getResponseHeader("X-Session-Lifetime"), 10) : s.startsWith("x-session-retention") && (i = e.getResponseHeader("X-Session-Retention"));
    }), t) {
      const a = new RegExp("^https://"), s = !!this.api.match(a) && !!window.location.href.match(a), c = i === "session" ? void 0 : new Date((/* @__PURE__ */ new Date()).getTime() + 1e3 * o);
      this.setAuthToken(t, { secure: s, expires: c });
    }
  }
  get(e) {
    return this._fetch(e, { method: "GET" });
  }
  post(e, t) {
    return this._fetch(e, { method: "POST", body: JSON.stringify(t) });
  }
  put(e, t) {
    return this._fetch(e, { method: "PUT", body: JSON.stringify(t) });
  }
  patch(e, t) {
    return this._fetch(e, { method: "PATCH", body: JSON.stringify(t) });
  }
  delete(e) {
    return this._fetch(e, { method: "DELETE" });
  }
  getAuthToken() {
    let e = "";
    switch (this.sessionTokenLocation) {
      case "cookie":
        e = this.cookie.getAuthCookie();
        break;
      case "sessionStorage":
        e = this.sessionTokenStorage.getSessionToken();
    }
    return e;
  }
  setAuthToken(e, t) {
    switch (this.sessionTokenLocation) {
      case "cookie":
        return this.cookie.setAuthCookie(e, t);
      case "sessionStorage":
        return this.sessionTokenStorage.setSessionToken(e);
    }
  }
}
class lt {
  constructor(e, t) {
    this.client = void 0, this.client = new Va(e, t);
  }
}
class ji extends lt {
  getDomain(e) {
    if (!e) throw new Je("somethingWentWrong", new Error("email missing from request"));
    const t = e.split("@");
    if (t.length !== 2) throw new Je("somethingWentWrong", new Error("email is not in a valid email format."));
    const o = t[1].trim();
    if (o === "") throw new Je("somethingWentWrong", new Error("email is not in a valid email format."));
    return o;
  }
  async hasProvider(e) {
    const t = this.getDomain(e);
    return this.client.get(`/saml/provider?domain=${t}`).then((o) => {
      if (o.status == 404) throw new Wt(new Error("provider not found"));
      if (!o.ok) throw new Le(new Error("unable to fetch provider"));
      return o.ok;
    });
  }
  auth(e, t) {
    const o = new URL("/saml/auth", this.client.api), i = this.getDomain(e);
    if (!t) throw new Je("somethingWentWrong", new Error("redirectTo missing from request"));
    o.searchParams.append("domain", i), o.searchParams.append("redirect_to", t), window.location.assign(o.href);
  }
  getError() {
    const e = new URLSearchParams(window.location.search), t = e.get("error"), o = e.get("error_description");
    if (t) {
      let i;
      switch (t) {
        case "access_denied":
          i = "enterpriseAccessDenied";
          break;
        case "user_conflict":
          i = "emailAddressAlreadyExistsError";
          break;
        case "multiple_accounts":
          i = "enterpriseMultipleAccounts";
          break;
        case "unverified_email":
          i = "enterpriseUnverifiedEmail";
          break;
        case "email_maxnum":
          i = "maxNumOfEmailAddressesReached";
          break;
        default:
          i = "somethingWentWrong";
      }
      return new Je(i, new Error(o));
    }
  }
}
class Li extends lt {
  async getInfo(e) {
    const t = await this.client.post("/user", { email: e });
    if (t.status === 404) throw new Wt();
    if (!t.ok) throw new Le();
    return t.json();
  }
  async create(e) {
    const t = await this.client.post("/users", { email: e });
    if (t.status === 409) throw new wn();
    if (t.status === 403) throw new xn();
    if (!t.ok) throw new Le();
    return t.json();
  }
  async getCurrent() {
    const e = await this.client.get("/me");
    if (e.status === 401) throw this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe();
    if (!e.ok) throw new Le();
    const t = e.json(), o = await this.client.get(`/users/${t.id}`);
    if (o.status === 401) throw this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe();
    if (!o.ok) throw new Le();
    return o.json();
  }
  async delete() {
    const e = await this.client.delete("/user");
    if (e.ok) return this.client.sessionTokenStorage.removeSessionToken(), this.client.cookie.removeAuthCookie(), void this.client.dispatcher.dispatchUserDeletedEvent();
    throw e.status === 401 ? (this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe()) : new Le();
  }
  async logout() {
    const e = await this.client.post("/logout");
    if (this.client.sessionTokenStorage.removeSessionToken(), this.client.cookie.removeAuthCookie(), this.client.dispatcher.dispatchUserLoggedOutEvent(), e.status !== 401 && !e.ok) throw new Le();
  }
}
class $i extends lt {
  async list() {
    const e = await this.client.get("/emails");
    if (e.status === 401) throw this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe();
    if (!e.ok) throw new Le();
    return e.json();
  }
  async create(e) {
    const t = await this.client.post("/emails", { address: e });
    if (t.ok) return t.json();
    throw t.status === 400 ? new Cn() : t.status === 401 ? (this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe()) : t.status === 409 ? new An() : new Le();
  }
  async setPrimaryEmail(e) {
    const t = await this.client.post(`/emails/${e}/set_primary`);
    if (t.status === 401) throw this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe();
    if (!t.ok) throw new Le();
  }
  async delete(e) {
    const t = await this.client.delete(`/emails/${e}`);
    if (t.status === 401) throw this.client.dispatcher.dispatchSessionExpiredEvent(), new Xe();
    if (!t.ok) throw new Le();
  }
}
class Ti extends lt {
  async auth(e, t) {
    const o = new URL("/thirdparty/auth", this.client.api);
    if (!e) throw new Je("somethingWentWrong", new Error("provider missing from request"));
    if (!t) throw new Je("somethingWentWrong", new Error("redirectTo missing from request"));
    o.searchParams.append("provider", e), o.searchParams.append("redirect_to", t), window.location.assign(o.href);
  }
  getError() {
    const e = new URLSearchParams(window.location.search), t = e.get("error"), o = e.get("error_description");
    if (t) {
      let i = "";
      switch (t) {
        case "access_denied":
          i = "thirdPartyAccessDenied";
          break;
        case "user_conflict":
          i = "emailAddressAlreadyExistsError";
          break;
        case "multiple_accounts":
          i = "thirdPartyMultipleAccounts";
          break;
        case "unverified_email":
          i = "thirdPartyUnverifiedEmail";
          break;
        case "email_maxnum":
          i = "maxNumOfEmailAddressesReached";
          break;
        case "signup_disabled":
          i = "signupDisabled";
          break;
        default:
          i = "somethingWentWrong";
      }
      return new Je(i, new Error(o));
    }
  }
}
class Ui extends lt {
  async validate() {
    const e = new URLSearchParams(window.location.search).get("hanko_token");
    if (!e) return;
    window.history.replaceState(null, null, window.location.pathname);
    const t = await this.client.post("/token", { value: e });
    if (!t.ok) throw new Le();
    return t.json();
  }
}
class Ba {
  static throttle(e, t, o = {}) {
    const { leading: i = !0, trailing: a = !0 } = o;
    let s, c, d, l = 0;
    const u = () => {
      l = i === !1 ? 0 : Date.now(), d = null, e.apply(s, c);
    };
    return function(...h) {
      const f = Date.now();
      l || i !== !1 || (l = f);
      const m = t - (f - l);
      s = this, c = h, m <= 0 || m > t ? (d && (window.clearTimeout(d), d = null), l = f, e.apply(s, c)) : d || a === !1 || (d = window.setTimeout(u, m));
    };
  }
}
class On {
  constructor() {
    this.throttleLimit = 1e3, this._addEventListener = document.addEventListener.bind(document), this._removeEventListener = document.removeEventListener.bind(document), this._throttle = Ba.throttle;
  }
  wrapCallback(e, t) {
    const o = (i) => {
      e(i.detail);
    };
    return t ? this._throttle(o, this.throttleLimit, { leading: !0, trailing: !1 }) : o;
  }
  addEventListenerWithType({ type: e, callback: t, once: o = !1, throttle: i = !1 }) {
    const a = this.wrapCallback(t, i);
    return this._addEventListener(e, a, { once: o }), () => this._removeEventListener(e, a);
  }
  static mapAddEventListenerParams(e, { once: t, callback: o }, i) {
    return { type: e, callback: o, once: t, throttle: i };
  }
  addEventListener(e, t, o) {
    return this.addEventListenerWithType(On.mapAddEventListenerParams(e, t, o));
  }
  onSessionCreated(e, t) {
    return this.addEventListener(ho, { callback: e, once: t }, !0);
  }
  onSessionExpired(e, t) {
    return this.addEventListener(po, { callback: e, once: t }, !0);
  }
  onUserLoggedOut(e, t) {
    return this.addEventListener(mo, { callback: e, once: t });
  }
  onUserDeleted(e, t) {
    return this.addEventListener(go, { callback: e, once: t });
  }
}
class fo extends lt {
  async validate() {
    const e = await this.client.get("/sessions/validate");
    if (!e.ok) throw new Le();
    return await e.json();
  }
}
class Za extends lt {
  isValid() {
    let e;
    try {
      const t = this.client._fetch_blocking("/sessions/validate", { method: "GET" });
      e = JSON.parse(t);
    } catch (t) {
      throw new Le(t);
    }
    return !!e && e.is_valid;
  }
}
class Ja {
  constructor(e) {
    this.storageKey = void 0, this.defaultState = { expiration: 0, lastCheck: 0 }, this.storageKey = e;
  }
  load() {
    const e = window.localStorage.getItem(this.storageKey);
    return e == null ? this.defaultState : JSON.parse(e);
  }
  save(e) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(e || this.defaultState));
  }
}
class Ya {
  constructor(e, t) {
    this.onActivityCallback = void 0, this.onInactivityCallback = void 0, this.handleFocus = () => {
      this.onActivityCallback();
    }, this.handleBlur = () => {
      this.onInactivityCallback();
    }, this.handleVisibilityChange = () => {
      document.visibilityState === "visible" ? this.onActivityCallback() : this.onInactivityCallback();
    }, this.hasFocus = () => document.hasFocus(), this.onActivityCallback = e, this.onInactivityCallback = t, window.addEventListener("focus", this.handleFocus), window.addEventListener("blur", this.handleBlur), document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }
}
class Qa {
  constructor(e, t, o) {
    this.intervalID = null, this.timeoutID = null, this.checkInterval = void 0, this.checkSession = void 0, this.onSessionExpired = void 0, this.checkInterval = e, this.checkSession = t, this.onSessionExpired = o;
  }
  scheduleSessionExpiry(e) {
    var t = this;
    this.stop(), this.timeoutID = setTimeout(async function() {
      t.stop(), t.onSessionExpired();
    }, e);
  }
  start(e = 0, t = 0) {
    var o = this;
    const i = this.calcTimeToNextCheck(e);
    this.sessionExpiresSoon(t) ? this.scheduleSessionExpiry(i) : this.timeoutID = setTimeout(async function() {
      let a = await o.checkSession();
      if (a.is_valid) {
        if (o.sessionExpiresSoon(a.expiration)) return void o.scheduleSessionExpiry(a.expiration - Date.now());
        o.intervalID = setInterval(async function() {
          a = await o.checkSession(), a.is_valid ? o.sessionExpiresSoon(a.expiration) && o.scheduleSessionExpiry(a.expiration - Date.now()) : o.stop();
        }, o.checkInterval);
      } else o.stop();
    }, i);
  }
  stop() {
    this.timeoutID && (clearTimeout(this.timeoutID), this.timeoutID = null), this.intervalID && (clearInterval(this.intervalID), this.intervalID = null);
  }
  isRunning() {
    return this.timeoutID !== null || this.intervalID !== null;
  }
  sessionExpiresSoon(e) {
    return e > 0 && e - Date.now() <= this.checkInterval;
  }
  calcTimeToNextCheck(e) {
    const t = Date.now() - e;
    return this.checkInterval >= t ? this.checkInterval - t % this.checkInterval : 0;
  }
}
class Ga {
  constructor(e = "hanko_session", t, o, i) {
    this.channel = void 0, this.onSessionExpired = void 0, this.onSessionCreated = void 0, this.onLeadershipRequested = void 0, this.handleMessage = (a) => {
      const s = a.data;
      switch (s.action) {
        case "sessionExpired":
          this.onSessionExpired(s);
          break;
        case "sessionCreated":
          this.onSessionCreated(s);
          break;
        case "requestLeadership":
          this.onLeadershipRequested(s);
      }
    }, this.onSessionExpired = t, this.onSessionCreated = o, this.onLeadershipRequested = i, this.channel = new BroadcastChannel(e), this.channel.onmessage = this.handleMessage;
  }
  post(e) {
    this.channel.postMessage(e);
  }
}
class Xa extends Di {
  constructor(e, t) {
    super(), this.listener = new On(), this.checkInterval = 3e4, this.client = void 0, this.sessionState = void 0, this.windowActivityManager = void 0, this.scheduler = void 0, this.sessionChannel = void 0, this.isLoggedIn = void 0, this.client = new fo(e, t), this.checkInterval = t.sessionCheckInterval, this.sessionState = new Ja(`${t.cookieName}_session_state`), this.sessionChannel = new Ga(this.getSessionCheckChannelName(t.sessionTokenLocation, t.sessionCheckChannelName), () => this.onChannelSessionExpired(), (a) => this.onChannelSessionCreated(a), () => this.onChannelLeadershipRequested()), this.scheduler = new Qa(this.checkInterval, () => this.checkSession(), () => this.onSessionExpired()), this.windowActivityManager = new Ya(() => this.startSessionCheck(), () => this.scheduler.stop());
    const o = Date.now(), { expiration: i } = this.sessionState.load();
    this.isLoggedIn = o < i, this.initializeEventListeners(), this.startSessionCheck();
  }
  initializeEventListeners() {
    this.listener.onSessionCreated((e) => {
      const { claims: t } = e, o = Date.parse(t.expiration), i = Date.now();
      this.isLoggedIn = !0, this.sessionState.save({ expiration: o, lastCheck: i }), this.sessionChannel.post({ action: "sessionCreated", claims: t }), this.startSessionCheck();
    }), this.listener.onUserLoggedOut(() => {
      this.isLoggedIn = !1, this.sessionChannel.post({ action: "sessionExpired" }), this.sessionState.save(null), this.scheduler.stop();
    }), window.addEventListener("beforeunload", () => this.scheduler.stop());
  }
  startSessionCheck() {
    if (!this.windowActivityManager.hasFocus() || (this.sessionChannel.post({ action: "requestLeadership" }), this.scheduler.isRunning())) return;
    const { lastCheck: e, expiration: t } = this.sessionState.load();
    this.isLoggedIn && this.scheduler.start(e, t);
  }
  async checkSession() {
    const e = Date.now(), { is_valid: t, claims: o, expiration_time: i } = await this.client.validate(), a = i ? Date.parse(i) : 0;
    return !t && this.isLoggedIn && this.dispatchSessionExpiredEvent(), t ? (this.isLoggedIn = !0, this.sessionState.save({ lastCheck: e, expiration: a })) : (this.isLoggedIn = !1, this.sessionState.save(null), this.sessionChannel.post({ action: "sessionExpired" })), { is_valid: t, claims: o, expiration: a };
  }
  onSessionExpired() {
    this.isLoggedIn && (this.isLoggedIn = !1, this.sessionState.save(null), this.sessionChannel.post({ action: "sessionExpired" }), this.dispatchSessionExpiredEvent());
  }
  onChannelSessionExpired() {
    this.isLoggedIn && (this.isLoggedIn = !1, this.dispatchSessionExpiredEvent());
  }
  onChannelSessionCreated(e) {
    const { claims: t } = e, o = Date.now(), i = Date.parse(t.expiration) - o;
    this.isLoggedIn = !0, this.dispatchSessionCreatedEvent({ claims: t, expirationSeconds: i });
  }
  onChannelLeadershipRequested() {
    this.windowActivityManager.hasFocus() || this.scheduler.stop();
  }
  getSessionCheckChannelName(e, t) {
    if (e == "cookie") return t;
    let o = sessionStorage.getItem("sessionCheckChannelName");
    return o != null && o !== "" || (o = `${t}-${Math.floor(100 * Math.random()) + 1}`, sessionStorage.setItem("sessionCheckChannelName", o)), o;
  }
}
var mt, bt = Ei("actionDefinitions"), Mn = Ei("createActionsProxy");
class Rn {
  toJSON() {
    return { name: this.name, payload: this.payload, error: this.error, status: this.status, csrf_token: this.csrf_token, actions: Un(this, bt)[bt] };
  }
  constructor({ name: e, payload: t, error: o, status: i, actions: a, csrf_token: s }, c) {
    Object.defineProperty(this, Mn, { value: er }), this.name = void 0, this.payload = void 0, this.error = void 0, this.status = void 0, this.csrf_token = void 0, Object.defineProperty(this, bt, { writable: !0, value: void 0 }), this.actions = void 0, this.fetchNextState = void 0, this.name = e, this.payload = t, this.error = o, this.status = i, this.csrf_token = s, Un(this, bt)[bt] = a, this.actions = Un(this, Mn)[Mn](a, s), this.fetchNextState = c;
  }
  runAction(e, t) {
    const o = {};
    if ("inputs" in e && typeof e.inputs == "object" && e.inputs !== null) {
      const i = e.inputs;
      for (const a in e.inputs) {
        const s = i[a];
        s && "value" in s && (o[a] = s.value);
      }
    }
    return this.fetchNextState(e.href, { input_data: o, csrf_token: t });
  }
  validateAction(e) {
    if ("inputs" in e) for (const t in e.inputs) {
      let i = function(s, c, d, l) {
        throw new Ni({ reason: s, inputName: t, wanted: d, actual: l, message: c });
      };
      const o = e.inputs[t], a = o.value;
      o.required && !a && i(mt.Required, "is required"), (o.min_length != null || o.max_length != null) && ("length" in a || i(mt.InvalidInputDefinition, 'has min/max length requirement, but is missing "length" property', "string", typeof a), o.min_length != null && a < o.min_length && i(mt.MinLength, `too short (min ${o.min_length})`, o.min_length, a.length), o.max_length != null && a > o.max_length && i(mt.MaxLength, `too long (max ${o.max_length})`, o.max_length, a.length));
    }
  }
}
function er(n, e) {
  const t = (i) => this.runAction(i, e), o = (i) => this.validateAction(i);
  return new Proxy(n, { get(i, a) {
    if (typeof a == "symbol") return i[a];
    const s = i[a];
    return s == null ? null : (c) => {
      const d = Object.assign(JSON.parse(JSON.stringify(s)), { validate: () => (o(d), d), tryValidate() {
        try {
          o(d);
        } catch (l) {
          if (l instanceof Ni) return l;
          throw l;
        }
      }, run: () => t(d) });
      if (d !== null && typeof d == "object" && "inputs" in d) for (const l in c) {
        const u = d.inputs;
        u[l] || (u[l] = { name: l, type: "" }), u[l].value = c[l];
      }
      return d;
    };
  } });
}
(function(n) {
  n[n.InvalidInputDefinition = 0] = "InvalidInputDefinition", n[n.MinLength = 1] = "MinLength", n[n.MaxLength = 2] = "MaxLength", n[n.Required = 3] = "Required";
})(mt || (mt = {}));
class Ni extends Error {
  constructor(e) {
    super(`"${e.inputName}" ${e.message}`), this.reason = void 0, this.inputName = void 0, this.wanted = void 0, this.actual = void 0, this.name = "ValidationError", this.reason = e.reason, this.inputName = e.inputName, this.wanted = e.wanted, this.actual = e.actual;
  }
}
function Zo(n) {
  return typeof n == "object" && n !== null && "status" in n && "error" in n && "name" in n && !!n.name && !!n.status;
}
class tr extends lt {
  constructor(...e) {
    var t;
    super(...e), t = this, this.run = async function(o, i) {
      try {
        if (!Zo(o)) throw new nr(o);
        const s = i[o.name];
        if (!s) throw new vo(o);
        let c = await s(o);
        if (typeof (a = c) == "object" && a !== null && "href" in a && "inputs" in a && (c = await c.run()), Zo(c)) return t.run(c, i);
      } catch (s) {
        if (typeof i.onError == "function") return i.onError(s);
      }
      var a;
    };
  }
  async init(e, t) {
    var o = this;
    const i = await async function a(s, c) {
      try {
        const d = await o.client.post(s, c);
        return new Rn(d.json(), a);
      } catch (d) {
        t.onError == null || t.onError(d);
      }
    }(e);
    await this.run(i, t);
  }
  async fromString(e, t) {
    var o = this;
    const i = new Rn(JSON.parse(e), async function a(s, c) {
      try {
        const d = await o.client.post(s, c);
        return new Rn(d.json(), a);
      } catch (d) {
        t.onError == null || t.onError(d);
      }
    });
    await this.run(i, t);
  }
}
class vo extends Ce {
  constructor(e) {
    super("No handler found for state: " + (typeof e.name == "string" ? `"${e.name}"` : `(${typeof e.name})`), "handlerNotFoundError"), this.state = void 0, this.state = e, Object.setPrototypeOf(this, vo.prototype);
  }
}
class nr extends Error {
  constructor(e) {
    super("Invalid state: " + (typeof e.name == "string" ? `"${e.name}"` : `(${typeof e.name})`)), this.state = void 0, this.state = e;
  }
}
class Mi extends On {
  constructor(e, t) {
    super(), this.api = void 0, this.user = void 0, this.email = void 0, this.thirdParty = void 0, this.enterprise = void 0, this.token = void 0, this.sessionClient = void 0, this.session = void 0, this.relay = void 0, this.flow = void 0;
    const o = { timeout: 13e3, cookieName: "hanko", localStorageKey: "hanko", sessionCheckInterval: 3e4, sessionCheckChannelName: "hanko-session-check", sessionTokenLocation: "cookie" };
    (t == null ? void 0 : t.cookieName) !== void 0 && (o.cookieName = t.cookieName), (t == null ? void 0 : t.timeout) !== void 0 && (o.timeout = t.timeout), (t == null ? void 0 : t.localStorageKey) !== void 0 && (o.localStorageKey = t.localStorageKey), (t == null ? void 0 : t.cookieDomain) !== void 0 && (o.cookieDomain = t.cookieDomain), (t == null ? void 0 : t.cookieSameSite) !== void 0 && (o.cookieSameSite = t.cookieSameSite), (t == null ? void 0 : t.lang) !== void 0 && (o.lang = t.lang), (t == null ? void 0 : t.sessionCheckInterval) !== void 0 && (o.sessionCheckInterval = t.sessionCheckInterval < 3e3 ? 3e3 : t.sessionCheckInterval), (t == null ? void 0 : t.sessionCheckChannelName) !== void 0 && (o.sessionCheckChannelName = t.sessionCheckChannelName), (t == null ? void 0 : t.sessionTokenLocation) !== void 0 && (o.sessionTokenLocation = t.sessionTokenLocation), this.api = e, this.user = new Li(e, o), this.email = new $i(e, o), this.thirdParty = new Ti(e, o), this.enterprise = new ji(e, o), this.token = new Ui(e, o), this.sessionClient = new fo(e, o), this.session = new Za(e, o), this.relay = new Xa(e, o), this.flow = new tr(e, o);
  }
  setLang(e) {
    this.flow.client.lang = e;
  }
}
class gt {
  static supported() {
    return !!(navigator.credentials && navigator.credentials.create && navigator.credentials.get && window.PublicKeyCredential);
  }
  static async isPlatformAuthenticatorAvailable() {
    return !(!this.supported() || !window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) && window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  }
  static async isSecurityKeySupported() {
    return window.PublicKeyCredential !== void 0 && window.PublicKeyCredential.isExternalCTAP2SecurityKeySupported ? window.PublicKeyCredential.isExternalCTAP2SecurityKeySupported() : this.supported();
  }
  static async isConditionalMediationAvailable() {
    return !(!window.PublicKeyCredential || !window.PublicKeyCredential.isConditionalMediationAvailable) && window.PublicKeyCredential.isConditionalMediationAvailable();
  }
}
var or = G(292), et = G.n(or), ir = G(360), tt = G.n(ir), ar = G(884), nt = G.n(ar), rr = G(88), ot = G.n(rr), rn = G(914), kt = {};
kt.setAttributes = nt(), kt.insert = (n) => {
  window._hankoStyle = n;
}, kt.domAPI = tt(), kt.insertStyleElement = ot(), et()(rn.A, kt);
const zt = rn.A && rn.A.locals ? rn.A.locals : void 0, sr = function(n) {
  function e(t) {
    var o = bi({}, t);
    return delete o.ref, n(o, t.ref || null);
  }
  return e.$$typeof = Ca, e.render = e, e.prototype.isReactComponent = e.__f = !0, e.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", e;
}((n, e) => {
  const { lang: t, hanko: o, setHanko: i } = (0, _.useContext)(pe), { setLang: a } = (0, _.useContext)(Z.TranslateContext);
  return (0, _.useEffect)(() => {
    a(t.replace(/[-]/, "")), i((s) => (s.setLang(t), s));
  }, [o, t, i, a]), r("section", Object.assign({ part: "container", className: zt.container, ref: e }, { children: n.children }));
});
var sn = G(697), wt = {};
wt.setAttributes = nt(), wt.insert = (n) => {
  window._hankoStyle = n;
}, wt.domAPI = tt(), wt.insertStyleElement = ot(), et()(sn.A, wt);
const L = sn.A && sn.A.locals ? sn.A.locals : void 0;
var lr = G(633), Y = G.n(lr);
const cr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-apple", xmlns: "http://www.w3.org/2000/svg", width: n, height: n, viewBox: "20.5 16 15 19", className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M28.2226562,20.3846154 C29.0546875,20.3846154 30.0976562,19.8048315 30.71875,19.0317864 C31.28125,18.3312142 31.6914062,17.352829 31.6914062,16.3744437 C31.6914062,16.2415766 31.6796875,16.1087095 31.65625,16 C30.7304687,16.0362365 29.6171875,16.640178 28.9492187,17.4494596 C28.421875,18.06548 27.9414062,19.0317864 27.9414062,20.0222505 C27.9414062,20.1671964 27.9648438,20.3121424 27.9765625,20.3604577 C28.0351562,20.3725366 28.1289062,20.3846154 28.2226562,20.3846154 Z M25.2929688,35 C26.4296875,35 26.9335938,34.214876 28.3515625,34.214876 C29.7929688,34.214876 30.109375,34.9758423 31.375,34.9758423 C32.6171875,34.9758423 33.4492188,33.792117 34.234375,32.6325493 C35.1132812,31.3038779 35.4765625,29.9993643 35.5,29.9389701 C35.4179688,29.9148125 33.0390625,28.9122695 33.0390625,26.0979021 C33.0390625,23.6579784 34.9140625,22.5588048 35.0195312,22.474253 C33.7773438,20.6382708 31.890625,20.5899555 31.375,20.5899555 C29.9804688,20.5899555 28.84375,21.4596313 28.1289062,21.4596313 C27.3554688,21.4596313 26.3359375,20.6382708 25.1289062,20.6382708 C22.8320312,20.6382708 20.5,22.5950413 20.5,26.2911634 C20.5,28.5861411 21.3671875,31.013986 22.4335938,32.5842339 C23.3476562,33.9129053 24.1445312,35 25.2929688,35 Z" }) })), dr = ({ secondary: n, size: e, fadeOut: t, disabled: o }) => r("svg", Object.assign({ id: "icon-checkmark", xmlns: "http://www.w3.org/2000/svg", viewBox: "4 4 40 40", width: e, height: e, className: Y()(L.checkmark, n && L.secondary, t && L.fadeOut, o && L.disabled) }, { children: r("path", { d: "M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" }) })), ur = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 -960 960 960", width: n, height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" }) })), hr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-custom-provider", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: n, height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: [r("path", { d: "M0 0h24v24H0z", fill: "none" }), r("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" })] })), pr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-discord", fill: "#fff", xmlns: "http://www.w3.org/2000/svg", width: n, height: n, viewBox: "0 0 127.14 96.36", className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" }) })), mr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-exclamation", xmlns: "http://www.w3.org/2000/svg", viewBox: "5 2 13 20", width: n, height: n, className: Y()(L.exclamationMark, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) })), gr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ width: n, height: n, viewBox: "0 0 666.66668 666.66717", xmlns: "http://www.w3.org/2000/svg" }, { children: [r("defs", Object.assign({ id: "defs13" }, { children: r("clipPath", Object.assign({ clipPathUnits: "userSpaceOnUse", id: "clipPath25" }, { children: r("path", { d: "M 0,700 H 700 V 0 H 0 Z", id: "path23" }) })) })), r("g", Object.assign({ id: "g17", transform: "matrix(1.3333333,0,0,-1.3333333,-133.33333,799.99999)" }, { children: r("g", Object.assign({ id: "g19" }, { children: r("g", Object.assign({ id: "g21", clipPath: "url(#clipPath25)" }, { children: [r("g", Object.assign({ id: "g27", transform: "translate(600,350)" }, { children: r("path", { className: Y()(L.facebookIcon, t ? L.disabledOutline : L.outline), d: "m 0,0 c 0,138.071 -111.929,250 -250,250 -138.071,0 -250,-111.929 -250,-250 0,-117.245 80.715,-215.622 189.606,-242.638 v 166.242 h -51.552 V 0 h 51.552 v 32.919 c 0,85.092 38.508,124.532 122.048,124.532 15.838,0 43.167,-3.105 54.347,-6.211 V 81.986 c -5.901,0.621 -16.149,0.932 -28.882,0.932 -40.993,0 -56.832,-15.528 -56.832,-55.9 V 0 h 81.659 l -14.028,-76.396 h -67.631 V -248.169 C -95.927,-233.218 0,-127.818 0,0", id: "path29" }) })), r("g", Object.assign({ id: "g31", transform: "translate(447.9175,273.6036)" }, { children: r("path", { className: Y()(L.facebookIcon, t ? L.disabledLetter : L.letter), d: "M 0,0 14.029,76.396 H -67.63 v 27.019 c 0,40.372 15.838,55.899 56.831,55.899 12.733,0 22.981,-0.31 28.882,-0.931 v 69.253 c -11.18,3.106 -38.509,6.212 -54.347,6.212 -83.539,0 -122.048,-39.441 -122.048,-124.533 V 76.396 h -51.552 V 0 h 51.552 v -166.242 c 19.343,-4.798 39.568,-7.362 60.394,-7.362 10.254,0 20.358,0.632 30.288,1.831 L -67.63,0 Z", id: "path33" }) }))] })) })) }))] })), fr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-github", xmlns: "http://www.w3.org/2000/svg", fill: "#fff", viewBox: "0 0 97.63 96", width: n, height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: [r("path", { d: "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" }), " "] })), vr = ({ size: n, disabled: e }) => r("svg", Object.assign({ id: "icon-google", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: n, height: n, className: L.googleIcon }, { children: [r("path", { className: Y()(L.googleIcon, e ? L.disabled : L.blue), d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), r("path", { className: Y()(L.googleIcon, e ? L.disabled : L.green), d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), r("path", { className: Y()(L.googleIcon, e ? L.disabled : L.yellow), d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }), r("path", { className: Y()(L.googleIcon, e ? L.disabled : L.red), d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" }), r("path", { d: "M1 1h22v22H1z", fill: "none" })] })), _r = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-linkedin", fill: "#fff", xmlns: "http://www.w3.org/2000/svg", width: n, viewBox: "0 0 24 24", height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" }) })), yr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-mail", xmlns: "http://www.w3.org/2000/svg", width: n, height: n, viewBox: "0 -960 960 960", className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" }) })), br = ({ size: n, disabled: e }) => r("svg", Object.assign({ id: "icon-microsoft", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: n, height: n, className: L.microsoftIcon }, { children: [r("rect", { className: Y()(L.microsoftIcon, e ? L.disabled : L.blue), x: "1", y: "1", width: "9", height: "9" }), r("rect", { className: Y()(L.microsoftIcon, e ? L.disabled : L.green), x: "1", y: "11", width: "9", height: "9" }), r("rect", { className: Y()(L.microsoftIcon, e ? L.disabled : L.yellow), x: "11", y: "1", width: "9", height: "9" }), r("rect", { className: Y()(L.microsoftIcon, e ? L.disabled : L.red), x: "11", y: "11", width: "9", height: "9" })] })), kr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-passkey", xmlns: "http://www.w3.org/2000/svg", viewBox: "3 1.5 19.5 19", width: n, height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("g", Object.assign({ id: "icon-passkey-all" }, { children: [r("circle", { id: "icon-passkey-head", cx: "10.5", cy: "6", r: "4.5" }), r("path", { id: "icon-passkey-key", d: "M22.5,10.5a3.5,3.5,0,1,0-5,3.15V19L19,20.5,21.5,18,20,16.5,21.5,15l-1.24-1.24A3.5,3.5,0,0,0,22.5,10.5Zm-3.5,0a1,1,0,1,1,1-1A1,1,0,0,1,19,10.5Z" }), r("path", { id: "icon-passkey-body", d: "M14.44,12.52A6,6,0,0,0,12,12H9a6,6,0,0,0-6,6v2H16V14.49A5.16,5.16,0,0,1,14.44,12.52Z" })] })) })), wr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ id: "icon-password", xmlns: "http://www.w3.org/2000/svg", width: n, height: n, viewBox: "0 -960 960 960", className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z" }) })), Sr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 -960 960 960", width: n, height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M80-680v-200h200v80H160v120H80Zm0 600v-200h80v120h120v80H80Zm600 0v-80h120v-120h80v200H680Zm120-600v-120H680v-80h200v200h-80ZM700-260h60v60h-60v-60Zm0-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm120-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm240-320v240H520v-240h240ZM440-440v240H200v-240h240Zm0-320v240H200v-240h240Zm-60 500v-120H260v120h120Zm0-320v-120H260v120h120Zm320 0v-120H580v120h120Z" }) })), xr = ({ size: n, secondary: e, disabled: t }) => r("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 -960 960 960", width: n, height: n, className: Y()(L.icon, e && L.secondary, t && L.disabled) }, { children: r("path", { d: "M280-240q-100 0-170-70T40-480q0-100 70-170t170-70q66 0 121 33t87 87h432v240h-80v120H600v-120H488q-32 54-87 87t-121 33Zm0-80q66 0 106-40.5t48-79.5h246v120h80v-120h80v-80H434q-8-39-48-79.5T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-80q33 0 56.5-23.5T360-480q0-33-23.5-56.5T280-560q-33 0-56.5 23.5T200-480q0 33 23.5 56.5T280-400Zm0-80Z" }) })), Ar = ({ size: n, disabled: e }) => r("svg", Object.assign({ id: "icon-spinner", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: n, height: n, className: Y()(L.loadingSpinner, e && L.disabled) }, { children: [r("path", { d: "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z", opacity: ".25" }), r("path", { d: "M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" })] })), Ht = ({ name: n, secondary: e, size: t = 18, fadeOut: o, disabled: i }) => r(Zn[n], { size: t, secondary: e, fadeOut: o, disabled: i }), _o = ({ children: n, isLoading: e, isSuccess: t, fadeOut: o, secondary: i, hasIcon: a, maxWidth: s }) => r(C.Fragment, { children: r("div", e ? Object.assign({ className: Y()(L.loadingSpinnerWrapper, L.centerContent, s && L.maxWidth) }, { children: r(Ht, { name: "spinner", secondary: i }) }) : t ? Object.assign({ className: Y()(L.loadingSpinnerWrapper, L.centerContent, s && L.maxWidth) }, { children: r(Ht, { name: "checkmark", secondary: i, fadeOut: o }) }) : Object.assign({ className: a ? L.loadingSpinnerWrapperIcon : L.loadingSpinnerWrapper }, { children: n })) }), Cr = () => {
  const { setLoadingAction: n } = (0, _.useContext)(pe);
  return (0, _.useEffect)(() => {
    n(null);
  }, []), r(_o, { isLoading: !0 });
}, Me = (n) => {
  const [e, t] = (0, _.useState)(n);
  return (0, _.useEffect)(() => {
    n && t(n);
  }, [n]), { flowState: e };
};
var ln = G(577), St = {};
St.setAttributes = nt(), St.insert = (n) => {
  window._hankoStyle = n;
}, St.domAPI = tt(), St.insertStyleElement = ot(), et()(ln.A, St);
const Oe = ln.A && ln.A.locals ? ln.A.locals : void 0, Or = () => {
  const { t: n } = (0, _.useContext)(Z.TranslateContext);
  return r("span", Object.assign({ className: Y()(Oe.lastUsed) }, { children: n("labels.lastUsed") }));
}, ne = (n) => {
  var { uiAction: e, title: t, children: o, secondary: i, dangerous: a, autofocus: s, showLastUsed: c, onClick: d, icon: l } = n, u = function(S, P) {
    var j = {};
    for (var U in S) Object.prototype.hasOwnProperty.call(S, U) && P.indexOf(U) < 0 && (j[U] = S[U]);
    if (S != null && typeof Object.getOwnPropertySymbols == "function") {
      var N = 0;
      for (U = Object.getOwnPropertySymbols(S); N < U.length; N++) P.indexOf(U[N]) < 0 && Object.prototype.propertyIsEnumerable.call(S, U[N]) && (j[U[N]] = S[U[N]]);
    }
    return j;
  }(n, ["uiAction", "title", "children", "secondary", "dangerous", "autofocus", "showLastUsed", "onClick", "icon"]);
  const h = (0, _.useRef)(null), { uiState: f, isDisabled: m } = (0, _.useContext)(pe);
  (0, _.useEffect)(() => {
    const { current: S } = h;
    S && s && S.focus();
  }, [s]);
  const x = (0, _.useMemo)(() => e && f.loadingAction === e || u.isLoading, [u, e, f]), O = (0, _.useMemo)(() => e && f.succeededAction === e || u.isSuccess, [u, e, f]), A = (0, _.useMemo)(() => m || u.disabled, [u, m]);
  return r("button", Object.assign({ part: a ? "button dangerous-button" : i ? "button secondary-button" : "button primary-button", title: t, ref: h, type: "submit", disabled: A, onClick: d, className: Y()(Oe.button, a ? Oe.dangerous : i ? Oe.secondary : Oe.primary) }, { children: r(_o, Object.assign({ isLoading: x, isSuccess: O, secondary: !0, hasIcon: !!l, maxWidth: !0 }, { children: [l ? r(Ht, { name: l, secondary: i, disabled: A }) : null, r("div", Object.assign({ className: Oe.caption }, { children: [r("span", { children: o }), c ? r(Or, {}) : null] }))] })) }));
}, Ve = (n) => {
  var e, t, o, i, a, { label: s } = n, c = function(m, x) {
    var O = {};
    for (var A in m) Object.prototype.hasOwnProperty.call(m, A) && x.indexOf(A) < 0 && (O[A] = m[A]);
    if (m != null && typeof Object.getOwnPropertySymbols == "function") {
      var S = 0;
      for (A = Object.getOwnPropertySymbols(m); S < A.length; S++) x.indexOf(A[S]) < 0 && Object.prototype.propertyIsEnumerable.call(m, A[S]) && (O[A[S]] = m[A[S]]);
    }
    return O;
  }(n, ["label"]);
  const d = (0, _.useRef)(null), { isDisabled: l } = (0, _.useContext)(pe), { t: u } = (0, _.useContext)(Z.TranslateContext), h = (0, _.useMemo)(() => l || c.disabled, [c, l]);
  (0, _.useEffect)(() => {
    const { current: m } = d;
    m && c.autofocus && (m.focus(), m.select());
  }, [c.autofocus]);
  const f = (0, _.useMemo)(() => {
    var m;
    return c.markOptional && !(!((m = c.flowInput) === null || m === void 0) && m.required) ? `${c.placeholder} (${u("labels.optional")})` : c.placeholder;
  }, [c.markOptional, c.placeholder, c.flowInput, u]);
  return r("div", Object.assign({ className: Oe.inputWrapper }, { children: r("input", Object.assign({ part: "input text-input", required: (e = c.flowInput) === null || e === void 0 ? void 0 : e.required, maxLength: (t = c.flowInput) === null || t === void 0 ? void 0 : t.max_length, minLength: (o = c.flowInput) === null || o === void 0 ? void 0 : o.min_length, hidden: (i = c.flowInput) === null || i === void 0 ? void 0 : i.hidden }, c, { ref: d, "aria-label": f, placeholder: f, className: Y()(Oe.input, !!(!((a = c.flowInput) === null || a === void 0) && a.error) && c.markError && Oe.error), disabled: h })) }));
}, Pe = ({ children: n }) => r("section", Object.assign({ className: zt.content }, { children: n })), oe = ({ onSubmit: n, children: e, hidden: t, maxWidth: o }) => t ? null : r("form", Object.assign({ onSubmit: n, className: Oe.form }, { children: r("ul", Object.assign({ className: Oe.ul }, { children: (0, C.toChildArray)(e).map((i, a) => r("li", Object.assign({ part: "form-item", className: Y()(Oe.li, o ? Oe.maxWidth : null) }, { children: i }), a)) })) }));
var cn = G(111), xt = {};
xt.setAttributes = nt(), xt.insert = (n) => {
  window._hankoStyle = n;
}, xt.domAPI = tt(), xt.insertStyleElement = ot(), et()(cn.A, xt);
const Tt = cn.A && cn.A.locals ? cn.A.locals : void 0, yo = ({ children: n, hidden: e }) => e ? null : r("section", Object.assign({ part: "divider", className: Tt.divider }, { children: [r("div", { part: "divider-line", className: Tt.line }), n ? r("div", Object.assign({ part: "divider-text", class: Tt.text }, { children: n })) : null, r("div", { part: "divider-line", className: Tt.line })] }));
var dn = G(905), At = {};
At.setAttributes = nt(), At.insert = (n) => {
  window._hankoStyle = n;
}, At.domAPI = tt(), At.insertStyleElement = ot(), et()(dn.A, At);
const Ri = dn.A && dn.A.locals ? dn.A.locals : void 0, Ee = ({ state: n, error: e, flowError: t }) => {
  var o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { uiState: s, setUIState: c } = (0, _.useContext)(pe);
  return (0, _.useEffect)(() => {
    var d, l;
    if (((d = n == null ? void 0 : n.error) === null || d === void 0 ? void 0 : d.code) == "form_data_invalid_error") for (const u of Object.values(n == null ? void 0 : n.actions)) {
      const h = u == null ? void 0 : u(null);
      let f = !1;
      for (const m of Object.values(h == null ? void 0 : h.inputs)) if (!((l = m.error) === null || l === void 0) && l.code) return c(Object.assign(Object.assign({}, s), { error: m.error })), void (f = !0);
      f || c(Object.assign(Object.assign({}, s), { error: n.error }));
    }
    else n != null && n.error && c(Object.assign(Object.assign({}, s), { error: n == null ? void 0 : n.error }));
  }, [n]), r("section", Object.assign({ part: "error", className: Ri.errorBox, hidden: !(!((o = s.error) === null || o === void 0) && o.code) && !(t != null && t.code) && !e }, { children: [r("span", { children: r(Ht, { name: "exclamation", size: 15 }) }), r("span", Object.assign({ id: "errorMessage", part: "error-text" }, { children: a(e ? `errors.${e.code}` : `flowErrors.${((i = s.error) === null || i === void 0 ? void 0 : i.code) || (t == null ? void 0 : t.code)}`) }))] }));
};
var un = G(619), Ct = {};
Ct.setAttributes = nt(), Ct.insert = (n) => {
  window._hankoStyle = n;
}, Ct.domAPI = tt(), Ct.insertStyleElement = ot(), et()(un.A, Ct);
const bn = un.A && un.A.locals ? un.A.locals : void 0, he = ({ children: n }) => r("h1", Object.assign({ part: "headline1", className: Y()(bn.headline, bn.grade1) }, { children: n }));
var hn = G(995), Ot = {};
Ot.setAttributes = nt(), Ot.insert = (n) => {
  window._hankoStyle = n;
}, Ot.domAPI = tt(), Ot.insertStyleElement = ot(), et()(hn.A, Ot);
const Jt = hn.A && hn.A.locals ? hn.A.locals : void 0, Yn = (n) => {
  var { loadingSpinnerPosition: e, dangerous: t = !1, onClick: o, uiAction: i } = n, a = function(P, j) {
    var U = {};
    for (var N in P) Object.prototype.hasOwnProperty.call(P, N) && j.indexOf(N) < 0 && (U[N] = P[N]);
    if (P != null && typeof Object.getOwnPropertySymbols == "function") {
      var ae = 0;
      for (N = Object.getOwnPropertySymbols(P); ae < N.length; ae++) j.indexOf(N[ae]) < 0 && Object.prototype.propertyIsEnumerable.call(P, N[ae]) && (U[N[ae]] = P[N[ae]]);
    }
    return U;
  }(n, ["loadingSpinnerPosition", "dangerous", "onClick", "uiAction"]);
  const { t: s } = (0, _.useContext)(Z.TranslateContext), { uiState: c, isDisabled: d } = (0, _.useContext)(pe), [l, u] = (0, _.useState)();
  let h;
  const f = (P) => {
    P.preventDefault(), u(!0);
  }, m = (P) => {
    P.preventDefault(), u(!1);
  }, x = (0, _.useMemo)(() => i && c.loadingAction === i || a.isLoading, [a, i, c]), O = (0, _.useMemo)(() => i && c.succeededAction === i || a.isSuccess, [a, i, c]), A = (0, _.useCallback)((P) => {
    P.preventDefault(), u(!1), o(P);
  }, [o]), S = (0, _.useCallback)(() => r(C.Fragment, { children: [l ? r(C.Fragment, { children: [r(Yn, Object.assign({ onClick: A }, { children: s("labels.yes") })), " / ", r(Yn, Object.assign({ onClick: m }, { children: s("labels.no") })), " "] }) : null, r("button", Object.assign({}, a, { onClick: t ? f : o, disabled: l || a.disabled || d, part: "link", className: Y()(Jt.link, t ? Jt.danger : null) }, { children: a.children }))] }), [l, t, o, A, a, s, d]);
  return r(C.Fragment, { children: r("span", Object.assign({ className: Y()(Jt.linkWrapper, e === "right" ? Jt.reverse : null), hidden: a.hidden, onMouseEnter: () => {
    h && window.clearTimeout(h);
  }, onMouseLeave: () => {
    h = window.setTimeout(() => {
      u(!1);
    }, 1e3);
  } }, { children: r(C.Fragment, e && (x || O) ? { children: [r(_o, { isLoading: x, isSuccess: O, secondary: a.secondary, fadeOut: !0 }), S()] } : { children: S() }) })) });
}, ee = Yn, Re = ({ children: n, hidden: e = !1 }) => e ? null : r("section", Object.assign({ className: zt.footer }, { children: n })), bo = (n) => {
  var { label: e } = n, t = function(o, i) {
    var a = {};
    for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && i.indexOf(s) < 0 && (a[s] = o[s]);
    if (o != null && typeof Object.getOwnPropertySymbols == "function") {
      var c = 0;
      for (s = Object.getOwnPropertySymbols(o); c < s.length; c++) i.indexOf(s[c]) < 0 && Object.prototype.propertyIsEnumerable.call(o, s[c]) && (a[s[c]] = o[s[c]]);
    }
    return a;
  }(n, ["label"]);
  return r("div", Object.assign({ className: Oe.inputWrapper }, { children: r("label", Object.assign({ className: Oe.checkboxWrapper }, { children: [r("input", Object.assign({ part: "input checkbox-input", type: "checkbox", "aria-label": e, className: Oe.checkbox }, t)), r("span", Object.assign({ className: Y()(Oe.label, t.disabled ? Oe.disabled : null) }, { children: e }))] })) }));
}, Pn = () => r("section", { className: Tt.spacer });
var Pt = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Pr = (n) => {
  var e, t, o, i, a, s, c, d, l;
  const { t: u } = (0, _.useContext)(Z.TranslateContext), { init: h, hanko: f, initialComponentName: m, setLoadingAction: x, uiState: O, setUIState: A, stateHandler: S, hidePasskeyButtonOnLogin: P, lastLogin: j } = (0, _.useContext)(pe), [U, N] = (0, _.useState)(null), [ae, be] = (0, _.useState)(O.username || O.email), { flowState: se } = Me(n.state), we = gt.supported(), [M, H] = (0, _.useState)(void 0), [_e, Ue] = (0, _.useState)(null), [Ie, Ne] = (0, _.useState)(!1), le = (k) => {
    if (k.preventDefault(), k.target instanceof HTMLInputElement) {
      const { value: p } = k.target;
      be(p), ce(p);
    }
  }, ce = (k) => {
    const p = () => A(($) => Object.assign(Object.assign({}, $), { email: k, username: null })), y = () => A(($) => Object.assign(Object.assign({}, $), { email: null, username: k }));
    switch (U) {
      case "email":
        p();
        break;
      case "username":
        y();
        break;
      case "identifier":
        k.match(/^[^@]+@[^@]+\.[^@]+$/) ? p() : y();
    }
  }, me = (0, _.useMemo)(() => {
    var k, p, y, $;
    return !!(!((p = (k = se.actions).webauthn_generate_request_options) === null || p === void 0) && p.call(k, null)) || !!(!(($ = (y = se.actions).thirdparty_oauth) === null || $ === void 0) && $.call(y, null));
  }, [se.actions]), De = (t = (e = se.actions).continue_with_login_identifier) === null || t === void 0 ? void 0 : t.call(e, null).inputs;
  return (0, _.useEffect)(() => {
    var k, p;
    const y = (p = (k = se.actions).continue_with_login_identifier) === null || p === void 0 ? void 0 : p.call(k, null).inputs;
    N(y != null && y.email ? "email" : y != null && y.username ? "username" : "identifier");
  }, [se]), (0, _.useEffect)(() => {
    const k = new URLSearchParams(window.location.search);
    if (k.get("error") == null || k.get("error").length === 0) return;
    let p = "";
    p = k.get("error") === "access_denied" ? "thirdPartyAccessDenied" : "somethingWentWrong";
    const y = { name: p, code: p, message: k.get("error_description") };
    H(y), k.delete("error"), k.delete("error_description"), history.replaceState(null, null, window.location.pathname + (k.size < 1 ? "" : `?${k.toString()}`));
  }, []), r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: u("headlines.signIn") }), r(Ee, { state: se, error: M }), De ? r(C.Fragment, { children: [r(oe, Object.assign({ onSubmit: (k) => Pt(void 0, void 0, void 0, function* () {
    k.preventDefault(), x("email-submit");
    const p = yield se.actions.continue_with_login_identifier({ [U]: ae }).run();
    ce(ae), x(null), yield f.flow.run(p, S);
  }), maxWidth: !0 }, { children: [De.email ? r(Ve, { type: "email", autoComplete: "username webauthn", autoCorrect: "off", flowInput: De.email, onInput: le, value: ae, placeholder: u("labels.email"), pattern: "^[^@]+@[^@]+\\.[^@]+$" }) : De.username ? r(Ve, { type: "text", autoComplete: "username webauthn", autoCorrect: "off", flowInput: De.username, onInput: le, value: ae, placeholder: u("labels.username") }) : r(Ve, { type: "text", autoComplete: "username webauthn", autoCorrect: "off", flowInput: De.identifier, onInput: le, value: ae, placeholder: u("labels.emailOrUsername") }), r(ne, Object.assign({ uiAction: "email-submit" }, { children: u("labels.continue") }))] })), r(yo, Object.assign({ hidden: !me }, { children: u("labels.or") }))] }) : null, !((i = (o = se.actions).webauthn_generate_request_options) === null || i === void 0) && i.call(o, null) && !P ? r(oe, Object.assign({ onSubmit: (k) => ((p) => Pt(void 0, void 0, void 0, function* () {
    p.preventDefault(), x("passkey-submit");
    const y = yield se.actions.webauthn_generate_request_options(null).run();
    yield f.flow.run(y, S);
  }))(k) }, { children: r(ne, Object.assign({ uiAction: "passkey-submit", secondary: !0, title: we ? null : u("labels.webauthnUnsupported"), disabled: !we, icon: "passkey" }, { children: u("labels.signInPasskey") })) })) : null, !((s = (a = se.actions).thirdparty_oauth) === null || s === void 0) && s.call(a, null) ? (c = se.actions.thirdparty_oauth(null).inputs.provider.allowed_values) === null || c === void 0 ? void 0 : c.map((k) => r(oe, Object.assign({ onSubmit: (p) => ((y, $) => Pt(void 0, void 0, void 0, function* () {
    y.preventDefault(), Ue($);
    const K = yield se.actions.thirdparty_oauth({ provider: $, redirect_to: window.location.toString() }).run();
    K.error && Ue(null), yield f.flow.run(K, S);
  }))(p, k.value) }, { children: r(ne, Object.assign({ isLoading: k.value == _e, secondary: !0, icon: k.value.startsWith("custom_") ? "customProvider" : k.value, showLastUsed: (j == null ? void 0 : j.login_method) == "third_party" && (j == null ? void 0 : j.third_party_provider) == k.value }, { children: u("labels.signInWith", { provider: k.name }) })) }), k.value)) : null, ((l = (d = se.actions).remember_me) === null || l === void 0 ? void 0 : l.call(d, null)) && r(C.Fragment, { children: [r(Pn, {}), r(bo, { required: !1, type: "checkbox", label: u("labels.staySignedIn"), checked: Ie, onChange: (k) => Pt(void 0, void 0, void 0, function* () {
    const p = yield se.actions.remember_me({ remember_me: !Ie }).run();
    Ne((y) => !y), yield f.flow.run(p, S);
  }) })] })] }), r(Re, Object.assign({ hidden: m !== "auth" }, { children: [r("span", { hidden: !0 }), r(ee, Object.assign({ uiAction: "switch-flow", onClick: (k) => Pt(void 0, void 0, void 0, function* () {
    k.preventDefault(), h("registration");
  }), loadingSpinnerPosition: "left" }, { children: u("labels.dontHaveAnAccount") }))] }))] });
}, Er = (n) => {
  var { index: e, focus: t, digit: o = "" } = n, i = function(l, u) {
    var h = {};
    for (var f in l) Object.prototype.hasOwnProperty.call(l, f) && u.indexOf(f) < 0 && (h[f] = l[f]);
    if (l != null && typeof Object.getOwnPropertySymbols == "function") {
      var m = 0;
      for (f = Object.getOwnPropertySymbols(l); m < f.length; m++) u.indexOf(f[m]) < 0 && Object.prototype.propertyIsEnumerable.call(l, f[m]) && (h[f[m]] = l[f[m]]);
    }
    return h;
  }(n, ["index", "focus", "digit"]);
  const a = (0, _.useRef)(null), { isDisabled: s } = (0, _.useContext)(pe), c = () => {
    const { current: l } = a;
    l && (l.focus(), l.select());
  }, d = (0, _.useMemo)(() => s || i.disabled, [i, s]);
  return (0, _.useEffect)(() => {
    e === 0 && c();
  }, [e, i.disabled]), (0, _.useMemo)(() => {
    t && c();
  }, [t]), r("div", Object.assign({ className: Oe.passcodeDigitWrapper }, { children: r("input", Object.assign({}, i, { part: "input passcode-input", "aria-label": `${i.name}-digit-${e + 1}`, name: i.name + e.toString(10), type: "text", inputMode: "numeric", maxLength: 1, ref: a, value: o.charAt(0), required: !0, className: Oe.input, disabled: d })) }));
}, ko = ({ passcodeDigits: n = [], numberOfInputs: e = 6, onInput: t, disabled: o = !1 }) => {
  const [i, a] = (0, _.useState)(0), s = () => n.slice(), c = () => {
    i < e - 1 && a(i + 1);
  }, d = () => {
    i > 0 && a(i - 1);
  }, l = (m) => {
    const x = s();
    x[i] = m.charAt(0), t(x);
  }, u = (m) => {
    if (m.preventDefault(), o) return;
    const x = m.clipboardData.getData("text/plain").slice(0, e - i).split(""), O = s();
    let A = i;
    for (let S = 0; S < e; ++S) S >= i && x.length > 0 && (O[S] = x.shift(), A++);
    a(A), t(O);
  }, h = (m) => {
    m.key === "Backspace" ? (m.preventDefault(), l(""), d()) : m.key === "Delete" ? (m.preventDefault(), l("")) : m.key === "ArrowLeft" ? (m.preventDefault(), d()) : m.key === "ArrowRight" ? (m.preventDefault(), c()) : m.key !== " " && m.key !== "Spacebar" && m.key !== "Space" || m.preventDefault();
  }, f = (m) => {
    m.target instanceof HTMLInputElement && l(m.target.value), c();
  };
  return (0, _.useEffect)(() => {
    n.length === 0 && a(0);
  }, [n]), r("div", Object.assign({ className: Oe.passcodeInputWrapper }, { children: Array.from(Array(e)).map((m, x) => r(Er, { name: "passcode", index: x, focus: i === x, digit: n[x], onKeyDown: h, onInput: f, onPaste: u, onFocus: () => ((O) => {
    a(O);
  })(x), disabled: o }, x)) }));
};
var pn = G(489), Et = {};
Et.setAttributes = nt(), Et.insert = (n) => {
  window._hankoStyle = n;
}, Et.domAPI = tt(), Et.insertStyleElement = ot(), et()(pn.A, Et);
const Ir = pn.A && pn.A.locals ? pn.A.locals : void 0, W = ({ children: n, hidden: e }) => e ? null : r("p", Object.assign({ part: "paragraph", className: Ir.paragraph }, { children: n }));
var Yt = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Dr = (n) => {
  var e, t;
  const { t: o } = (0, _.useContext)(Z.TranslateContext), { flowState: i } = Me(n.state), { hanko: a, uiState: s, setUIState: c, setLoadingAction: d, setSucceededAction: l, stateHandler: u } = (0, _.useContext)(pe), [h, f] = (0, _.useState)(), [m, x] = (0, _.useState)(i.payload.resend_after), [O, A] = (0, _.useState)([]), S = (0, _.useMemo)(() => {
    var j;
    return ((j = i.error) === null || j === void 0 ? void 0 : j.code) === "passcode_max_attempts_reached";
  }, [i]), P = (0, _.useCallback)((j) => Yt(void 0, void 0, void 0, function* () {
    d("passcode-submit");
    const U = yield i.actions.verify_passcode({ code: j }).run();
    d(null), yield a.flow.run(U, u);
  }), [a, i, d, u]);
  return (0, _.useEffect)(() => {
    i.payload.passcode_resent && (l("passcode-resend"), setTimeout(() => l(null), 1e3));
  }, [i, l]), (0, _.useEffect)(() => {
    h <= 0 && s.succeededAction;
  }, [s, h]), (0, _.useEffect)(() => {
    const j = h > 0 && setInterval(() => f(h - 1), 1e3);
    return () => clearInterval(j);
  }, [h]), (0, _.useEffect)(() => {
    const j = m > 0 && setInterval(() => {
      x(m - 1);
    }, 1e3);
    return () => clearInterval(j);
  }, [m]), (0, _.useEffect)(() => {
    var j;
    m == 0 && ((j = i.error) === null || j === void 0 ? void 0 : j.code) == "rate_limit_exceeded" && c((U) => Object.assign(Object.assign({}, U), { error: null }));
  }, [m]), (0, _.useEffect)(() => {
    var j;
    ((j = i.error) === null || j === void 0 ? void 0 : j.code) === "passcode_invalid" && A([]), i.payload.resend_after >= 0 && x(i.payload.resend_after);
  }, [i]), r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: o("headlines.loginPasscode") }), r(Ee, { state: i }), r(W, { children: s.email ? o("texts.enterPasscode", { emailAddress: s.email }) : o("texts.enterPasscodeNoEmail") }), r(oe, Object.assign({ onSubmit: (j) => Yt(void 0, void 0, void 0, function* () {
    return j.preventDefault(), P(O.join(""));
  }) }, { children: [r(ko, { onInput: (j) => {
    if (A(j), j.filter((U) => U !== "").length === 6) return P(j.join(""));
  }, passcodeDigits: O, numberOfInputs: 6, disabled: h <= 0 || S }), r(ne, Object.assign({ disabled: h <= 0 || S, uiAction: "passcode-submit" }, { children: o("labels.continue") }))] }))] }), r(Re, { children: [r(ee, Object.assign({ hidden: !(!((t = (e = i.actions).back) === null || t === void 0) && t.call(e, null)), onClick: (j) => Yt(void 0, void 0, void 0, function* () {
    j.preventDefault(), d("back");
    const U = yield i.actions.back(null).run();
    d(null), yield a.flow.run(U, u);
  }), loadingSpinnerPosition: "right", isLoading: s.loadingAction === "back" }, { children: o("labels.back") })), r(ee, Object.assign({ uiAction: "passcode-resend", disabled: m > 0, onClick: (j) => Yt(void 0, void 0, void 0, function* () {
    j.preventDefault(), d("passcode-resend");
    const U = yield i.actions.resend_passcode(null).run();
    d(null), yield a.flow.run(U, u);
  }), loadingSpinnerPosition: "left" }, { children: m > 0 ? o("labels.passcodeResendAfter", { passcodeResendAfter: m }) : o("labels.sendNewPasscode") }))] })] });
};
var qn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const jr = (n) => {
  var e, t, o, i, a, s, c, d;
  const { t: l } = (0, _.useContext)(Z.TranslateContext), { hanko: u, setLoadingAction: h, stateHandler: f } = (0, _.useContext)(pe), { flowState: m } = Me(n.state);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: l("headlines.registerAuthenticator") }), r(Ee, { state: m }), r(W, { children: l("texts.setupPasskey") }), r(oe, Object.assign({ onSubmit: (x) => qn(void 0, void 0, void 0, function* () {
    x.preventDefault(), h("passkey-submit");
    const O = yield m.actions.webauthn_generate_creation_options(null).run();
    yield u.flow.run(O, f);
  }) }, { children: r(ne, Object.assign({ uiAction: "passkey-submit", autofocus: !0, icon: "passkey" }, { children: l("labels.registerAuthenticator") })) }))] }), r(Re, Object.assign({ hidden: !(!((t = (e = m.actions).skip) === null || t === void 0) && t.call(e, null)) && !(!((i = (o = m.actions).back) === null || i === void 0) && i.call(o, null)) }, { children: [r(ee, Object.assign({ uiAction: "back", onClick: (x) => qn(void 0, void 0, void 0, function* () {
    x.preventDefault(), h("back");
    const O = yield m.actions.back(null).run();
    h(null), yield u.flow.run(O, f);
  }), loadingSpinnerPosition: "right", hidden: !(!((s = (a = m.actions).back) === null || s === void 0) && s.call(a, null)) }, { children: l("labels.back") })), r(ee, Object.assign({ uiAction: "skip", onClick: (x) => qn(void 0, void 0, void 0, function* () {
    x.preventDefault(), h("skip");
    const O = yield m.actions.skip(null).run();
    h(null), yield u.flow.run(O, f);
  }), loadingSpinnerPosition: "left", hidden: !(!((d = (c = m.actions).skip) === null || d === void 0) && d.call(c, null)) }, { children: l("labels.skip") }))] }))] });
};
var It = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Lr = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { hanko: s, stateHandler: c, setLoadingAction: d } = (0, _.useContext)(pe), { flowState: l } = Me(n.state), [u, h] = (0, _.useState)(), [f, m] = (0, _.useState)(), x = (P) => It(void 0, void 0, void 0, function* () {
    P.preventDefault(), d("password-recovery");
    const j = yield l.actions.continue_to_passcode_confirmation_recovery(null).run();
    d(null), yield s.flow.run(j, c);
  }), O = (P) => It(void 0, void 0, void 0, function* () {
    P.preventDefault(), d("choose-login-method");
    const j = yield l.actions.continue_to_login_method_chooser(null).run();
    d(null), yield s.flow.run(j, c);
  }), A = (0, _.useMemo)(() => {
    var P, j;
    return r(ee, Object.assign({ hidden: !(!((j = (P = l.actions).continue_to_passcode_confirmation_recovery) === null || j === void 0) && j.call(P, null)), uiAction: "password-recovery", onClick: x, loadingSpinnerPosition: "left" }, { children: a("labels.forgotYourPassword") }));
  }, [x, a]), S = (0, _.useMemo)(() => r(ee, Object.assign({ uiAction: "choose-login-method", onClick: O, loadingSpinnerPosition: "left" }, { children: "Choose another method" })), [O]);
  return (0, _.useEffect)(() => {
    const P = f > 0 && setInterval(() => m(f - 1), 1e3);
    return () => clearInterval(P);
  }, [f]), r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.loginPassword") }), r(Ee, { state: l }), r(oe, Object.assign({ onSubmit: (P) => It(void 0, void 0, void 0, function* () {
    P.preventDefault(), d("password-submit");
    const j = yield l.actions.password_login({ password: u }).run();
    d(null), yield s.flow.run(j, c);
  }) }, { children: [r(Ve, { type: "password", flowInput: l.actions.password_login(null).inputs.password, autocomplete: "current-password", placeholder: a("labels.password"), onInput: (P) => It(void 0, void 0, void 0, function* () {
    P.target instanceof HTMLInputElement && h(P.target.value);
  }), autofocus: !0 }), r(ne, Object.assign({ uiAction: "password-submit", disabled: f > 0 }, { children: f > 0 ? a("labels.passwordRetryAfter", { passwordRetryAfter: f }) : a("labels.signIn") }))] })), !((t = (e = l.actions).continue_to_login_method_chooser) === null || t === void 0) && t.call(e, null) ? A : null] }), r(Re, { children: [r(ee, Object.assign({ uiAction: "back", onClick: (P) => It(void 0, void 0, void 0, function* () {
    P.preventDefault(), d("back");
    const j = yield l.actions.back(null).run();
    d(null), yield s.flow.run(j, c);
  }), loadingSpinnerPosition: "right" }, { children: a("labels.back") })), !((i = (o = l.actions).continue_to_login_method_chooser) === null || i === void 0) && i.call(o, null) ? S : A] })] });
};
var Jo = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const $r = (n) => {
  const { t: e } = (0, _.useContext)(Z.TranslateContext), { hanko: t, stateHandler: o, setLoadingAction: i } = (0, _.useContext)(pe), { flowState: a } = Me(n.state), [s, c] = (0, _.useState)();
  return r(Pe, { children: [r(he, { children: e("headlines.registerPassword") }), r(Ee, { state: a }), r(W, { children: e("texts.passwordFormatHint", { minLength: a.actions.password_recovery(null).inputs.new_password.min_length, maxLength: 72 }) }), r(oe, Object.assign({ onSubmit: (d) => Jo(void 0, void 0, void 0, function* () {
    d.preventDefault(), i("password-submit");
    const l = yield a.actions.password_recovery({ new_password: s }).run();
    i(null), yield t.flow.run(l, o);
  }) }, { children: [r(Ve, { type: "password", autocomplete: "new-password", flowInput: a.actions.password_recovery(null).inputs.new_password, placeholder: e("labels.newPassword"), onInput: (d) => Jo(void 0, void 0, void 0, function* () {
    d.target instanceof HTMLInputElement && c(d.target.value);
  }), autofocus: !0 }), r(ne, Object.assign({ uiAction: "password-submit" }, { children: e("labels.continue") }))] }))] });
};
var Qt = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Tr = (n) => {
  var e, t, o, i, a, s;
  const { t: c } = (0, _.useContext)(Z.TranslateContext), { hanko: d, setLoadingAction: l, stateHandler: u, lastLogin: h } = (0, _.useContext)(pe), { flowState: f } = Me(n.state);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: c("headlines.selectLoginMethod") }), r(Ee, { flowError: f == null ? void 0 : f.error }), r(W, { children: c("texts.howDoYouWantToLogin") }), r(oe, Object.assign({ hidden: !(!((t = (e = f.actions).continue_to_passcode_confirmation) === null || t === void 0) && t.call(e, null)), onSubmit: (m) => Qt(void 0, void 0, void 0, function* () {
    m.preventDefault(), l("passcode-submit");
    const x = yield f.actions.continue_to_passcode_confirmation(null).run();
    l(null), yield d.flow.run(x, u);
  }) }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "passcode-submit", icon: "mail" }, { children: c("labels.passcode") })) })), r(oe, Object.assign({ hidden: !(!((i = (o = f.actions).continue_to_password_login) === null || i === void 0) && i.call(o, null)), onSubmit: (m) => Qt(void 0, void 0, void 0, function* () {
    m.preventDefault(), l("password-submit");
    const x = yield f.actions.continue_to_password_login(null).run();
    l(null), yield d.flow.run(x, u);
  }) }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "password-submit", icon: "password" }, { children: c("labels.password") })) })), r(oe, Object.assign({ hidden: !(!((s = (a = f.actions).webauthn_generate_request_options) === null || s === void 0) && s.call(a, null)), onSubmit: (m) => Qt(void 0, void 0, void 0, function* () {
    m.preventDefault(), l("passkey-submit");
    const x = yield f.actions.webauthn_generate_request_options(null).run();
    l(null), yield d.flow.run(x, u);
  }) }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "passkey-submit", icon: "passkey" }, { children: c("labels.passkey") })) }))] }), r(Re, { children: r(ee, Object.assign({ uiAction: "back", onClick: (m) => Qt(void 0, void 0, void 0, function* () {
    m.preventDefault(), l("back");
    const x = yield f.actions.back(null).run();
    l(null), yield d.flow.run(x, u);
  }), loadingSpinnerPosition: "right" }, { children: c("labels.back") })) })] });
};
var Gt = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Ur = (n) => {
  var e, t, o, i, a, s, c;
  const { t: d } = (0, _.useContext)(Z.TranslateContext), { init: l, hanko: u, uiState: h, setUIState: f, stateHandler: m, setLoadingAction: x, initialComponentName: O } = (0, _.useContext)(pe), { flowState: A } = Me(n.state), S = (t = (e = A.actions).register_login_identifier) === null || t === void 0 ? void 0 : t.call(e, null).inputs, P = !(!(S != null && S.email) || !(S != null && S.username)), [j, U] = (0, _.useState)(void 0), [N, ae] = (0, _.useState)(null), [be, se] = (0, _.useState)(!1), we = (0, _.useMemo)(() => {
    var M, H;
    return !!(!((H = (M = A.actions).thirdparty_oauth) === null || H === void 0) && H.call(M, null));
  }, [A.actions]);
  return (0, _.useEffect)(() => {
    const M = new URLSearchParams(window.location.search);
    if (M.get("error") == null || M.get("error").length === 0) return;
    let H = "";
    H = M.get("error") === "access_denied" ? "thirdPartyAccessDenied" : "somethingWentWrong";
    const _e = { name: H, code: H, message: M.get("error_description") };
    U(_e), M.delete("error"), M.delete("error_description"), history.replaceState(null, null, window.location.pathname + (M.size < 1 ? "" : `?${M.toString()}`));
  }, []), r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: d("headlines.signUp") }), r(Ee, { state: A, error: j }), S ? r(C.Fragment, { children: [r(oe, Object.assign({ onSubmit: (M) => Gt(void 0, void 0, void 0, function* () {
    M.preventDefault(), x("email-submit");
    const H = yield A.actions.register_login_identifier({ email: h.email, username: h.username }).run();
    x(null), yield u.flow.run(H, m);
  }), maxWidth: !0 }, { children: [S.username ? r(Ve, { markOptional: P, markError: P, type: "text", autoComplete: "username", autoCorrect: "off", flowInput: S.username, onInput: (M) => {
    if (M.preventDefault(), M.target instanceof HTMLInputElement) {
      const { value: H } = M.target;
      f((_e) => Object.assign(Object.assign({}, _e), { username: H }));
    }
  }, value: h.username, placeholder: d("labels.username") }) : null, S.email ? r(Ve, { markOptional: P, markError: P, type: "email", autoComplete: "email", autoCorrect: "off", flowInput: S.email, onInput: (M) => {
    if (M.preventDefault(), M.target instanceof HTMLInputElement) {
      const { value: H } = M.target;
      f((_e) => Object.assign(Object.assign({}, _e), { email: H }));
    }
  }, value: h.email, placeholder: d("labels.email"), pattern: "^.*[^0-9]+$" }) : null, r(ne, Object.assign({ uiAction: "email-submit", autofocus: !0 }, { children: d("labels.continue") }))] })), r(yo, Object.assign({ hidden: !we }, { children: d("labels.or") }))] }) : null, !((i = (o = A.actions).thirdparty_oauth) === null || i === void 0) && i.call(o, null) ? (a = A.actions.thirdparty_oauth(null).inputs.provider.allowed_values) === null || a === void 0 ? void 0 : a.map((M) => r(oe, Object.assign({ onSubmit: (H) => ((_e, Ue) => Gt(void 0, void 0, void 0, function* () {
    _e.preventDefault(), ae(Ue);
    const Ie = yield A.actions.thirdparty_oauth({ provider: Ue, redirect_to: window.location.toString() }).run();
    ae(null), yield u.flow.run(Ie, m);
  }))(H, M.value) }, { children: r(ne, Object.assign({ isLoading: M.value == N, secondary: !0, icon: M.value.startsWith("custom_") ? "customProvider" : M.value }, { children: d("labels.signInWith", { provider: M.name }) })) }), M.value)) : null, ((c = (s = A.actions).remember_me) === null || c === void 0 ? void 0 : c.call(s, null)) && r(C.Fragment, { children: [r(Pn, {}), r(bo, { required: !1, type: "checkbox", label: d("labels.staySignedIn"), checked: be, onChange: (M) => Gt(void 0, void 0, void 0, function* () {
    const H = yield A.actions.remember_me({ remember_me: !be }).run();
    se((_e) => !_e), yield u.flow.run(H, m);
  }) })] })] }), r(Re, Object.assign({ hidden: O !== "auth" }, { children: [r("span", { hidden: !0 }), r(ee, Object.assign({ uiAction: "switch-flow", onClick: (M) => Gt(void 0, void 0, void 0, function* () {
    M.preventDefault(), l("login");
  }), loadingSpinnerPosition: "left" }, { children: d("labels.alreadyHaveAnAccount") }))] }))] });
};
var Xt = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Nr = (n) => {
  var e, t, o, i, a, s, c, d;
  const { t: l } = (0, _.useContext)(Z.TranslateContext), { hanko: u, stateHandler: h, setLoadingAction: f } = (0, _.useContext)(pe), { flowState: m } = Me(n.state), [x, O] = (0, _.useState)();
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: l("headlines.registerPassword") }), r(Ee, { state: m }), r(W, { children: l("texts.passwordFormatHint", { minLength: m.actions.register_password(null).inputs.new_password.min_length, maxLength: 72 }) }), r(oe, Object.assign({ onSubmit: (A) => Xt(void 0, void 0, void 0, function* () {
    A.preventDefault(), f("password-submit");
    const S = yield m.actions.register_password({ new_password: x }).run();
    f(null), yield u.flow.run(S, h);
  }) }, { children: [r(Ve, { type: "password", autocomplete: "new-password", flowInput: m.actions.register_password(null).inputs.new_password, placeholder: l("labels.newPassword"), onInput: (A) => Xt(void 0, void 0, void 0, function* () {
    A.target instanceof HTMLInputElement && O(A.target.value);
  }), autofocus: !0 }), r(ne, Object.assign({ uiAction: "password-submit" }, { children: l("labels.continue") }))] }))] }), r(Re, Object.assign({ hidden: !(!((t = (e = m.actions).back) === null || t === void 0) && t.call(e, null)) && !(!((i = (o = m.actions).skip) === null || i === void 0) && i.call(o, null)) }, { children: [r(ee, Object.assign({ uiAction: "back", onClick: (A) => Xt(void 0, void 0, void 0, function* () {
    A.preventDefault(), f("back");
    const S = yield m.actions.back(null).run();
    f(null), yield u.flow.run(S, h);
  }), loadingSpinnerPosition: "right", hidden: !(!((s = (a = m.actions).back) === null || s === void 0) && s.call(a, null)) }, { children: l("labels.back") })), r(ee, Object.assign({ uiAction: "skip", onClick: (A) => Xt(void 0, void 0, void 0, function* () {
    A.preventDefault(), f("skip");
    const S = yield m.actions.skip(null).run();
    f(null), yield u.flow.run(S, h);
  }), loadingSpinnerPosition: "left", hidden: !(!((d = (c = m.actions).skip) === null || d === void 0) && d.call(c, null)) }, { children: l("labels.skip") }))] }))] });
};
var mn = G(21), Dt = {};
Dt.setAttributes = nt(), Dt.insert = (n) => {
  window._hankoStyle = n;
}, Dt.domAPI = tt(), Dt.insertStyleElement = ot(), et()(mn.A, Dt);
const Ze = mn.A && mn.A.locals ? mn.A.locals : void 0, En = function({ name: n, columnSelector: e, contentSelector: t, data: o, checkedItemID: i, setCheckedItemID: a, dropdown: s = !1 }) {
  const c = (0, _.useCallback)((u) => `${n}-${u}`, [n]), d = (0, _.useCallback)((u) => c(u) === i, [i, c]), l = (u) => {
    if (!(u.target instanceof HTMLInputElement)) return;
    const h = parseInt(u.target.value, 10), f = c(h);
    a(f === i ? null : f);
  };
  return r("div", Object.assign({ className: Ze.accordion }, { children: o.map((u, h) => r("div", Object.assign({ className: Ze.accordionItem }, { children: [r("input", { type: "radio", className: Ze.accordionInput, id: `${n}-${h}`, name: n, onClick: l, value: h, checked: d(h) }), r("label", Object.assign({ className: Y()(Ze.label, s && Ze.dropdown), for: `${n}-${h}` }, { children: r("span", Object.assign({ className: Ze.labelText }, { children: e(u, h) })) })), r("div", Object.assign({ className: Y()(Ze.accordionContent, s && Ze.dropdownContent) }, { children: t(u, h) }))] }), h)) }));
}, ze = ({ children: n }) => r("h2", Object.assign({ part: "headline2", className: Y()(bn.headline, bn.grade2) }, { children: n })), Mr = ({ onEmailDelete: n, onEmailSetPrimary: e, onEmailVerify: t, checkedItemID: o, setCheckedItemID: i, emails: a = [], deletableEmailIDs: s = [] }) => {
  const { t: c } = (0, _.useContext)(Z.TranslateContext), d = (0, _.useMemo)(() => !1, []);
  return r(En, { name: "email-edit-dropdown", columnSelector: (l) => {
    const u = r("span", Object.assign({ className: Ze.description }, { children: l.is_verified ? l.is_primary ? r(C.Fragment, { children: [" -", " ", c("labels.primaryEmail")] }) : null : r(C.Fragment, { children: [" -", " ", c("labels.unverifiedEmail")] }) }));
    return l.is_primary ? r(C.Fragment, { children: [r("b", { children: l.address }), u] }) : r(C.Fragment, { children: [l.address, u] });
  }, data: a, contentSelector: (l) => {
    var u;
    return r(C.Fragment, { children: [l.is_primary ? r(C.Fragment, { children: r(W, { children: [r(ze, { children: c("headlines.isPrimaryEmail") }), c("texts.isPrimaryEmail")] }) }) : r(C.Fragment, { children: r(W, { children: [r(ze, { children: c("headlines.setPrimaryEmail") }), c("texts.setPrimaryEmail"), r("br", {}), r(ee, Object.assign({ uiAction: "email-set-primary", onClick: (h) => e(h, l.id), loadingSpinnerPosition: "right" }, { children: c("labels.setAsPrimaryEmail") }))] }) }), l.is_verified ? r(C.Fragment, { children: r(W, { children: [r(ze, { children: c("headlines.emailVerified") }), c("texts.emailVerified")] }) }) : r(C.Fragment, { children: r(W, { children: [r(ze, { children: c("headlines.emailUnverified") }), c("texts.emailUnverified"), r("br", {}), r(ee, Object.assign({ uiAction: "email-verify", onClick: (h) => t(h, l.id), loadingSpinnerPosition: "right" }, { children: c("labels.verify") }))] }) }), s.includes(l.id) ? r(C.Fragment, { children: r(W, { children: [r(ze, { children: c("headlines.emailDelete") }), c("texts.emailDelete"), r("br", {}), r(ee, Object.assign({ uiAction: "email-delete", dangerous: !0, onClick: (h) => n(h, l.id), disabled: d, loadingSpinnerPosition: "right" }, { children: c("labels.delete") }))] }) }) : null, ((u = l.identities) === null || u === void 0 ? void 0 : u.length) > 0 ? r(C.Fragment, { children: r(W, { children: [r(ze, { children: c("headlines.connectedAccounts") }), l.identities.map((h) => h.provider).join(", ")] }) }) : null] });
  }, checkedItemID: o, setCheckedItemID: i });
}, Rr = ({ onCredentialNameSubmit: n, oldName: e, onBack: t, credential: o, credentialType: i }) => {
  const { t: a } = (0, _.useContext)(Z.TranslateContext), [s, c] = (0, _.useState)(e);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a(i === "security-key" ? "headlines.renameSecurityKey" : "headlines.renamePasskey") }), r(Ee, { flowError: null }), r(W, { children: a(i === "security-key" ? "texts.renameSecurityKey" : "texts.renamePasskey") }), r(oe, Object.assign({ onSubmit: (d) => n(d, o.id, s) }, { children: [r(Ve, { type: "text", name: i, value: s, minLength: 3, maxLength: 32, required: !0, placeholder: a(i === "security-key" ? "labels.newSecurityKeyName" : "labels.newPasskeyName"), onInput: (d) => {
    return l = void 0, u = void 0, f = function* () {
      d.target instanceof HTMLInputElement && c(d.target.value);
    }, new ((h = void 0) || (h = Promise))(function(m, x) {
      function O(P) {
        try {
          S(f.next(P));
        } catch (j) {
          x(j);
        }
      }
      function A(P) {
        try {
          S(f.throw(P));
        } catch (j) {
          x(j);
        }
      }
      function S(P) {
        var j;
        P.done ? m(P.value) : (j = P.value, j instanceof h ? j : new h(function(U) {
          U(j);
        })).then(O, A);
      }
      S((f = f.apply(l, u || [])).next());
    });
    var l, u, h, f;
  }, autofocus: !0 }), r(ne, Object.assign({ uiAction: "webauthn-credential-rename" }, { children: a("labels.save") }))] }))] }), r(Re, { children: r(ee, Object.assign({ onClick: t, loadingSpinnerPosition: "right" }, { children: a("labels.back") })) })] });
}, Yo = ({ credentials: n = [], checkedItemID: e, setCheckedItemID: t, onBack: o, onCredentialNameSubmit: i, onCredentialDelete: a, allowCredentialDeletion: s, credentialType: c }) => {
  const { t: d } = (0, _.useContext)(Z.TranslateContext), { setPage: l } = (0, _.useContext)(pe), u = (f) => {
    if (f.name) return f.name;
    const m = f.public_key.replace(/[\W_]/g, "");
    return `${c === "security-key" ? "SecurityKey" : "Passkey"}-${m.substring(m.length - 7, m.length)}`;
  }, h = (f) => new Date(f).toLocaleString();
  return r(En, { name: c === "security-key" ? "security-key-edit-dropdown" : "passkey-edit-dropdown", columnSelector: (f) => u(f), data: n, contentSelector: (f) => r(C.Fragment, { children: [r(W, { children: [r(ze, { children: d(c === "security-key" ? "headlines.renameSecurityKey" : "headlines.renamePasskey") }), d(c === "security-key" ? "texts.renameSecurityKey" : "texts.renamePasskey"), r("br", {}), r(ee, Object.assign({ onClick: (m) => ((x, O, A) => {
    x.preventDefault(), l(r(Rr, { oldName: u(O), credential: O, credentialType: A, onBack: o, onCredentialNameSubmit: i }));
  })(m, f, c), loadingSpinnerPosition: "right" }, { children: d("labels.rename") }))] }), r(W, Object.assign({ hidden: !s }, { children: [r(ze, { children: d(c === "security-key" ? "headlines.deleteSecurityKey" : "headlines.deletePasskey") }), d(c === "security-key" ? "texts.deleteSecurityKey" : "texts.deletePasskey"), r("br", {}), r(ee, Object.assign({ uiAction: "password-delete", dangerous: !0, onClick: (m) => a(m, f.id), loadingSpinnerPosition: "right" }, { children: d("labels.delete") }))] })), r(W, { children: [r(ze, { children: d("headlines.lastUsedAt") }), f.last_used_at ? h(f.last_used_at) : "-"] }), r(W, { children: [r(ze, { children: d("headlines.createdAt") }), h(f.created_at)] })] }), checkedItemID: e, setCheckedItemID: t });
}, Ft = ({ name: n, title: e, children: t, checkedItemID: o, setCheckedItemID: i }) => r(En, { dropdown: !0, name: n, columnSelector: () => e, contentSelector: () => r(C.Fragment, { children: t }), setCheckedItemID: i, checkedItemID: o, data: [{}] }), wo = ({ flowError: n }) => {
  const { t: e } = (0, _.useContext)(Z.TranslateContext);
  return r(C.Fragment, { children: n ? r("div", Object.assign({ className: Ri.errorMessage }, { children: e(`flowErrors.${n == null ? void 0 : n.code}`) })) : null });
}, qr = ({ inputs: n, onEmailSubmit: e, checkedItemID: t, setCheckedItemID: o }) => {
  var i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), [s, c] = (0, _.useState)();
  return r(Ft, Object.assign({ name: "email-create-dropdown", title: a("labels.addEmail"), checkedItemID: t, setCheckedItemID: o }, { children: [r(wo, { flowError: (i = n.email) === null || i === void 0 ? void 0 : i.error }), r(oe, Object.assign({ onSubmit: (d) => e(d, s).then(() => c("")) }, { children: [r(Ve, { markError: !0, type: "email", placeholder: a("labels.newEmailAddress"), onInput: (d) => {
    d.preventDefault(), d.target instanceof HTMLInputElement && c(d.target.value);
  }, value: s, flowInput: n.email }), r(ne, Object.assign({ uiAction: "email-submit" }, { children: a("labels.save") }))] }))] }));
}, Qo = ({ inputs: n, checkedItemID: e, setCheckedItemID: t, onPasswordSubmit: o, onPasswordDelete: i, allowPasswordDelete: a, passwordExists: s }) => {
  var c, d, l;
  const { t: u } = (0, _.useContext)(Z.TranslateContext), [h, f] = (0, _.useState)("");
  return r(Ft, Object.assign({ name: "password-edit-dropdown", title: u(s ? "labels.changePassword" : "labels.setPassword"), checkedItemID: e, setCheckedItemID: t }, { children: [r(W, { children: u("texts.passwordFormatHint", { minLength: (c = n.password.min_length) === null || c === void 0 ? void 0 : c.toString(10), maxLength: (d = n.password.max_length) === null || d === void 0 ? void 0 : d.toString(10) }) }), r(wo, { flowError: (l = n.password) === null || l === void 0 ? void 0 : l.error }), r(oe, Object.assign({ onSubmit: (m) => o(m, h).then(() => f("")) }, { children: [r(Ve, { markError: !0, autoComplete: "new-password", placeholder: u("labels.newPassword"), type: "password", onInput: (m) => {
    m.preventDefault(), m.target instanceof HTMLInputElement && f(m.target.value);
  }, value: h, flowInput: n.password }), r(ne, Object.assign({ uiAction: "password-submit" }, { children: u("labels.save") }))] })), r(ee, Object.assign({ hidden: !a, uiAction: "password-delete", dangerous: !0, onClick: (m) => i(m).then(() => f("")), loadingSpinnerPosition: "right" }, { children: u("labels.delete") }))] }));
}, Go = ({ checkedItemID: n, setCheckedItemID: e, onCredentialSubmit: t, credentialType: o }) => {
  const { t: i } = (0, _.useContext)(Z.TranslateContext), a = gt.supported();
  return r(Ft, Object.assign({ name: o === "security-key" ? "security-key-create-dropdown" : "passkey-create-dropdown", title: i(o === "security-key" ? "labels.createSecurityKey" : "labels.createPasskey"), checkedItemID: n, setCheckedItemID: e }, { children: [r(W, { children: i(o === "security-key" ? "texts.securityKeySetUp" : "texts.setupPasskey") }), r(oe, Object.assign({ onSubmit: t }, { children: r(ne, Object.assign({ uiAction: o === "security-key" ? "security-key-submit" : "passkey-submit", title: a ? null : i("labels.webauthnUnsupported") }, { children: i(o === "security-key" ? "labels.createSecurityKey" : "labels.createPasskey") })) }))] }));
}, Xo = ({ inputs: n, checkedItemID: e, setCheckedItemID: t, onUsernameSubmit: o, onUsernameDelete: i, hasUsername: a, allowUsernameDeletion: s }) => {
  var c;
  const { t: d } = (0, _.useContext)(Z.TranslateContext), [l, u] = (0, _.useState)();
  return r(Ft, Object.assign({ name: "username-edit-dropdown", title: d(a ? "labels.changeUsername" : "labels.setUsername"), checkedItemID: e, setCheckedItemID: t }, { children: [r(wo, { flowError: (c = n.username) === null || c === void 0 ? void 0 : c.error }), r(oe, Object.assign({ onSubmit: (h) => o(h, l).then(() => u("")) }, { children: [r(Ve, { markError: !0, placeholder: d("labels.username"), type: "text", onInput: (h) => {
    h.preventDefault(), h.target instanceof HTMLInputElement && u(h.target.value);
  }, value: l, flowInput: n.username }), r(ne, Object.assign({ uiAction: "username-set" }, { children: d("labels.save") }))] })), r(ee, Object.assign({ hidden: !s, uiAction: "username-delete", dangerous: !0, onClick: (h) => i(h).then(() => u("")), loadingSpinnerPosition: "right" }, { children: d("labels.delete") }))] }));
}, zr = ({ onBack: n, onAccountDelete: e }) => {
  const { t } = (0, _.useContext)(Z.TranslateContext);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: t("headlines.deleteAccount") }), r(Ee, { flowError: null }), r(W, { children: t("texts.deleteAccount") }), r(oe, Object.assign({ onSubmit: e }, { children: [r(bo, { required: !0, type: "checkbox", label: t("labels.deleteAccount") }), r(ne, Object.assign({ uiAction: "account_delete" }, { children: t("labels.delete") }))] }))] }), r(Re, { children: r(ee, Object.assign({ onClick: n }, { children: t("labels.back") })) })] });
}, Hr = ({ sessions: n = [], checkedItemID: e, setCheckedItemID: t, onSessionDelete: o, deletableSessionIDs: i }) => {
  const { t: a } = (0, _.useContext)(Z.TranslateContext), s = (c) => new Date(c).toLocaleString();
  return r(En, { name: "session-edit-dropdown", columnSelector: (c) => {
    const d = r("b", { children: c.user_agent ? c.user_agent : c.id }), l = c.current ? r("span", Object.assign({ className: Ze.description }, { children: r(C.Fragment, { children: [" -", " ", a("labels.currentSession")] }) })) : null;
    return r(C.Fragment, { children: [d, l] });
  }, data: n, contentSelector: (c) => r(C.Fragment, { children: [r(W, Object.assign({ hidden: !c.ip_address }, { children: [r(ze, { children: a("headlines.ipAddress") }), c.ip_address] })), r(W, { children: [r(ze, { children: a("headlines.lastUsed") }), s(c.last_used)] }), r(W, { children: [r(ze, { children: a("headlines.createdAt") }), s(c.created_at)] }), i != null && i.includes(c.id) ? r(W, { children: [r(ze, { children: a("headlines.revokeSession") }), r(ee, Object.assign({ uiAction: "session-delete", dangerous: !0, onClick: (d) => o(d, c.id), loadingSpinnerPosition: "right" }, { children: a("labels.revoke") }))] }) : null] }), checkedItemID: e, setCheckedItemID: t });
}, Wr = ({ checkedItemID: n, setCheckedItemID: e, onDelete: t, onConnect: o, authAppSetUp: i, allowDeletion: a }) => {
  const { t: s } = (0, _.useContext)(Z.TranslateContext), c = r("span", Object.assign({ className: Ze.description }, { children: i ? r(C.Fragment, { children: [" -", " ", s("labels.configured")] }) : null })), d = r(C.Fragment, { children: [s("labels.authenticatorAppManage"), " ", c] });
  return r(Ft, Object.assign({ name: "authenticator-app-manage-dropdown", title: d, checkedItemID: n, setCheckedItemID: e }, { children: [r(ze, { children: s(i ? "headlines.authenticatorAppAlreadySetUp" : "headlines.authenticatorAppNotSetUp") }), r(W, { children: [s(i ? "texts.authenticatorAppAlreadySetUp" : "texts.authenticatorAppNotSetUp"), r("br", {}), r(ee, i ? Object.assign({ hidden: !a, uiAction: "auth-app-remove", onClick: (l) => t(l), loadingSpinnerPosition: "right", dangerous: !0 }, { children: s("labels.delete") }) : Object.assign({ uiAction: "auth-app-add", onClick: (l) => o(l), loadingSpinnerPosition: "right" }, { children: s("labels.authenticatorAppAdd") }))] })] }));
};
var je = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const qi = (n) => {
  var e, t, o, i, a, s, c, d, l, u, h, f, m, x, O, A, S, P, j, U, N, ae, be, se, we, M, H, _e, Ue, Ie, Ne, le, ce, me, De, k, p, y, $, K, ge, He, We, Fe, g, v, b, D, T, I, z, X;
  const { t: Q } = (0, _.useContext)(Z.TranslateContext), { hanko: ye, setLoadingAction: w, stateHandler: ke, setUIState: J, setPage: R } = (0, _.useContext)(pe), { flowState: E } = Me(n.state), [Se, V] = (0, _.useState)(""), F = (q, B, Qe) => je(void 0, void 0, void 0, function* () {
    q.preventDefault(), w(B);
    const In = yield Qe();
    In != null && In.error || (V(null), yield new Promise((Fi) => setTimeout(Fi, 360))), w(null), yield ye.flow.run(In, ke);
  }), qe = (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "password-delete", E.actions.password_delete(null).run);
  }), it = (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "username-delete", E.actions.username_delete(null).run);
  }), fe = (q, B, Qe) => je(void 0, void 0, void 0, function* () {
    return F(q, "webauthn-credential-rename", E.actions.webauthn_credential_rename({ passkey_id: B, passkey_name: Qe }).run);
  }), Vt = (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "account_delete", E.actions.account_delete(null).run);
  }), at = (q) => (q.preventDefault(), R(r(qi, { state: E, enablePasskeys: n.enablePasskeys })), Promise.resolve());
  return r(Pe, { children: [r(Ee, { state: ((e = E == null ? void 0 : E.error) === null || e === void 0 ? void 0 : e.code) !== "form_data_invalid_error" ? E : null }), !((o = (t = E.actions).username_create) === null || o === void 0) && o.call(t, null) || !((a = (i = E.actions).username_update) === null || a === void 0) && a.call(i, null) || !((c = (s = E.actions).username_delete) === null || c === void 0) && c.call(s, null) ? r(C.Fragment, { children: [r(he, { children: Q("labels.username") }), E.payload.user.username ? r(W, { children: r("b", { children: E.payload.user.username.username }) }) : null, r(W, { children: [!((l = (d = E.actions).username_create) === null || l === void 0) && l.call(d, null) ? r(Xo, { inputs: E.actions.username_create(null).inputs, hasUsername: !!E.payload.user.username, allowUsernameDeletion: !!(!((h = (u = E.actions).username_delete) === null || h === void 0) && h.call(u, null)), onUsernameSubmit: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "username-set", E.actions.username_create({ username: B }).run);
  }), onUsernameDelete: it, checkedItemID: Se, setCheckedItemID: V }) : null, !((m = (f = E.actions).username_update) === null || m === void 0) && m.call(f, null) ? r(Xo, { inputs: E.actions.username_update(null).inputs, hasUsername: !!E.payload.user.username, allowUsernameDeletion: !!(!((O = (x = E.actions).username_delete) === null || O === void 0) && O.call(x, null)), onUsernameSubmit: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "username-set", E.actions.username_update({ username: B }).run);
  }), onUsernameDelete: it, checkedItemID: Se, setCheckedItemID: V }) : null] })] }) : null, !((S = (A = E.payload) === null || A === void 0 ? void 0 : A.user) === null || S === void 0) && S.emails || !((j = (P = E.actions).email_create) === null || j === void 0) && j.call(P, null) ? r(C.Fragment, { children: [r(he, { children: Q("headlines.profileEmails") }), r(W, { children: [r(Mr, { emails: E.payload.user.emails, onEmailDelete: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "email-delete", E.actions.email_delete({ email_id: B }).run);
  }), onEmailSetPrimary: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "email-set-primary", E.actions.email_set_primary({ email_id: B }).run);
  }), onEmailVerify: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "email-verify", E.actions.email_verify({ email_id: B }).run);
  }), checkedItemID: Se, setCheckedItemID: V, deletableEmailIDs: (ae = (N = (U = E.actions).email_delete) === null || N === void 0 ? void 0 : N.call(U, null).inputs.email_id.allowed_values) === null || ae === void 0 ? void 0 : ae.map((q) => q.value) }), !((se = (be = E.actions).email_create) === null || se === void 0) && se.call(be, null) ? r(qr, { inputs: E.actions.email_create(null).inputs, onEmailSubmit: (q, B) => je(void 0, void 0, void 0, function* () {
    return J((Qe) => Object.assign(Object.assign({}, Qe), { email: B })), F(q, "email-submit", E.actions.email_create({ email: B }).run);
  }), checkedItemID: Se, setCheckedItemID: V }) : null] })] }) : null, !((M = (we = E.actions).password_create) === null || M === void 0) && M.call(we, null) ? r(C.Fragment, { children: [r(he, { children: Q("headlines.profilePassword") }), r(W, { children: r(Qo, { inputs: E.actions.password_create(null).inputs, onPasswordSubmit: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "password-submit", E.actions.password_create({ password: B }).run);
  }), onPasswordDelete: qe, checkedItemID: Se, setCheckedItemID: V }) })] }) : null, !((_e = (H = E.actions).password_update) === null || _e === void 0) && _e.call(H, null) ? r(C.Fragment, { children: [r(he, { children: Q("headlines.profilePassword") }), r(W, { children: r(Qo, { allowPasswordDelete: !!(!((Ie = (Ue = E.actions).password_delete) === null || Ie === void 0) && Ie.call(Ue, null)), inputs: E.actions.password_update(null).inputs, onPasswordSubmit: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "password-submit", E.actions.password_update({ password: B }).run);
  }), onPasswordDelete: qe, checkedItemID: Se, setCheckedItemID: V, passwordExists: !0 }) })] }) : null, n.enablePasskeys && (!((le = (Ne = E.payload) === null || Ne === void 0 ? void 0 : Ne.user) === null || le === void 0) && le.passkeys || !((me = (ce = E.actions).webauthn_credential_create) === null || me === void 0) && me.call(ce, null)) ? r(C.Fragment, { children: [r(he, { children: Q("headlines.profilePasskeys") }), r(W, { children: [r(Yo, { onBack: at, onCredentialNameSubmit: fe, onCredentialDelete: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "passkey-delete", E.actions.webauthn_credential_delete({ passkey_id: B }).run);
  }), credentials: E.payload.user.passkeys, setError: null, checkedItemID: Se, setCheckedItemID: V, allowCredentialDeletion: !!(!((k = (De = E.actions).webauthn_credential_delete) === null || k === void 0) && k.call(De, null)), credentialType: "passkey" }), !((y = (p = E.actions).webauthn_credential_create) === null || y === void 0) && y.call(p, null) ? r(Go, { credentialType: "passkey", onCredentialSubmit: (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "passkey-submit", E.actions.webauthn_credential_create(null).run);
  }), setError: null, checkedItemID: Se, setCheckedItemID: V }) : null] })] }) : null, !(($ = E.payload.user.mfa_config) === null || $ === void 0) && $.security_keys_enabled ? r(C.Fragment, { children: [r(he, { children: Q("headlines.securityKeys") }), r(W, { children: [r(Yo, { onBack: at, onCredentialNameSubmit: fe, onCredentialDelete: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "security-key-delete", E.actions.security_key_delete({ security_key_id: B }).run);
  }), credentials: E.payload.user.security_keys, setError: null, checkedItemID: Se, setCheckedItemID: V, allowCredentialDeletion: !!(!((ge = (K = E.actions).security_key_delete) === null || ge === void 0) && ge.call(K, null)), credentialType: "security-key" }), !((We = (He = E.actions).security_key_create) === null || We === void 0) && We.call(He, null) ? r(Go, { credentialType: "security-key", onCredentialSubmit: (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "security-key-submit", E.actions.security_key_create(null).run);
  }), setError: null, checkedItemID: Se, setCheckedItemID: V }) : null] })] }) : null, !((Fe = E.payload.user.mfa_config) === null || Fe === void 0) && Fe.totp_enabled ? r(C.Fragment, { children: [r(he, { children: Q("headlines.authenticatorApp") }), r(W, { children: r(Wr, { onConnect: (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "auth-app-add", E.actions.continue_to_otp_secret_creation(null).run);
  }), onDelete: (q) => je(void 0, void 0, void 0, function* () {
    return F(q, "auth-app-remove", E.actions.otp_secret_delete(null).run);
  }), allowDeletion: !!(!((v = (g = E.actions).otp_secret_delete) === null || v === void 0) && v.call(g, null)), authAppSetUp: (b = E.payload.user.mfa_config) === null || b === void 0 ? void 0 : b.auth_app_set_up, checkedItemID: Se, setCheckedItemID: V }) })] }) : null, E.payload.sessions ? r(C.Fragment, { children: [r(he, { children: Q("headlines.profileSessions") }), r(W, { children: r(Hr, { sessions: E.payload.sessions, setError: null, checkedItemID: Se, setCheckedItemID: V, onSessionDelete: (q, B) => je(void 0, void 0, void 0, function* () {
    return F(q, "session-delete", E.actions.session_delete({ session_id: B }).run);
  }), deletableSessionIDs: (I = (T = (D = E.actions).session_delete) === null || T === void 0 ? void 0 : T.call(D, null).inputs.session_id.allowed_values) === null || I === void 0 ? void 0 : I.map((q) => q.value) }) })] }) : null, !((X = (z = E.actions).account_delete) === null || X === void 0) && X.call(z, null) ? r(C.Fragment, { children: [r(Pn, {}), r(W, { children: r(yo, {}) }), r(W, { children: r(oe, Object.assign({ onSubmit: (q) => (q.preventDefault(), R(r(zr, { onBack: at, onAccountDelete: Vt })), Promise.resolve()) }, { children: r(ne, Object.assign({ dangerous: !0 }, { children: Q("headlines.deleteAccount") })) })) })] }) : null] });
}, Fr = qi, ei = ({ state: n, error: e }) => {
  const { t } = (0, _.useContext)(Z.TranslateContext), { init: o, componentName: i } = (0, _.useContext)(pe), a = (0, _.useCallback)(() => o(i), [i, o]);
  return (0, _.useEffect)(() => (addEventListener("hankoAuthSuccess", a), () => {
    removeEventListener("hankoAuthSuccess", a);
  }), [a]), r(Pe, { children: [r(he, { children: t("headlines.error") }), r(Ee, { state: n, error: e }), r(oe, Object.assign({ onSubmit: (s) => {
    s.preventDefault(), a();
  } }, { children: r(ne, Object.assign({ uiAction: "retry" }, { children: t("labels.continue") })) }))] });
};
var zn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Kr = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { hanko: s, stateHandler: c, setLoadingAction: d } = (0, _.useContext)(pe), { flowState: l } = Me(n.state), [u, h] = (0, _.useState)();
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.createEmail") }), r(Ee, { state: l }), r(oe, Object.assign({ onSubmit: (f) => zn(void 0, void 0, void 0, function* () {
    f.preventDefault(), d("email-submit");
    const m = yield l.actions.email_address_set({ email: u }).run();
    d(null), yield s.flow.run(m, c);
  }) }, { children: [r(Ve, { type: "email", autoComplete: "email", autoCorrect: "off", flowInput: (t = (e = l.actions).email_address_set) === null || t === void 0 ? void 0 : t.call(e, null).inputs.email, onInput: (f) => zn(void 0, void 0, void 0, function* () {
    f.target instanceof HTMLInputElement && h(f.target.value);
  }), placeholder: a("labels.email"), pattern: "^.*[^0-9]+$", value: u }), r(ne, Object.assign({ uiAction: "email-submit" }, { children: a("labels.continue") }))] }))] }), r(Re, Object.assign({ hidden: !(!((i = (o = l.actions).skip) === null || i === void 0) && i.call(o, null)) }, { children: [r("span", { hidden: !0 }), r(ee, Object.assign({ uiAction: "skip", onClick: (f) => zn(void 0, void 0, void 0, function* () {
    f.preventDefault(), d("skip");
    const m = yield l.actions.skip(null).run();
    d(null), yield s.flow.run(m, c);
  }), loadingSpinnerPosition: "left" }, { children: a("labels.skip") }))] }))] });
};
var Hn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Vr = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { hanko: s, stateHandler: c, setLoadingAction: d } = (0, _.useContext)(pe), { flowState: l } = Me(n.state), [u, h] = (0, _.useState)();
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.createUsername") }), r(Ee, { state: l }), r(oe, Object.assign({ onSubmit: (f) => Hn(void 0, void 0, void 0, function* () {
    f.preventDefault(), d("username-set");
    const m = yield l.actions.username_create({ username: u }).run();
    d(null), yield s.flow.run(m, c);
  }) }, { children: [r(Ve, { type: "text", autoComplete: "username", autoCorrect: "off", flowInput: (t = (e = l.actions).username_create) === null || t === void 0 ? void 0 : t.call(e, null).inputs.username, onInput: (f) => Hn(void 0, void 0, void 0, function* () {
    f.target instanceof HTMLInputElement && h(f.target.value);
  }), value: u, placeholder: a("labels.username") }), r(ne, Object.assign({ uiAction: "username-set" }, { children: a("labels.continue") }))] }))] }), r(Re, Object.assign({ hidden: !(!((i = (o = l.actions).skip) === null || i === void 0) && i.call(o, null)) }, { children: [r("span", { hidden: !0 }), r(ee, Object.assign({ uiAction: "skip", onClick: (f) => Hn(void 0, void 0, void 0, function* () {
    f.preventDefault(), d("skip");
    const m = yield l.actions.skip(null).run();
    d(null), yield s.flow.run(m, c);
  }), loadingSpinnerPosition: "left" }, { children: a("labels.skip") }))] }))] });
};
var en = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Br = (n) => {
  var e, t, o, i, a, s, c, d, l, u, h, f;
  const { t: m } = (0, _.useContext)(Z.TranslateContext), { hanko: x, setLoadingAction: O, stateHandler: A } = (0, _.useContext)(pe), { flowState: S } = Me(n.state);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: m("headlines.setupLoginMethod") }), r(Ee, { flowError: S == null ? void 0 : S.error }), r(W, { children: m("texts.selectLoginMethodForFutureLogins") }), r(oe, Object.assign({ hidden: !(!((t = (e = S.actions).continue_to_passkey_registration) === null || t === void 0) && t.call(e, null)), onSubmit: (P) => en(void 0, void 0, void 0, function* () {
    P.preventDefault(), O("passkey-submit");
    const j = yield S.actions.continue_to_passkey_registration(null).run();
    O(null), yield x.flow.run(j, A);
  }) }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "passkey-submit", icon: "passkey" }, { children: m("labels.passkey") })) })), r(oe, Object.assign({ hidden: !(!((i = (o = S.actions).continue_to_password_registration) === null || i === void 0) && i.call(o, null)), onSubmit: (P) => en(void 0, void 0, void 0, function* () {
    P.preventDefault(), O("password-submit");
    const j = yield S.actions.continue_to_password_registration(null).run();
    O(null), yield x.flow.run(j, A);
  }) }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "password-submit", icon: "password" }, { children: m("labels.password") })) }))] }), r(Re, Object.assign({ hidden: !(!((s = (a = S.actions).back) === null || s === void 0) && s.call(a, null)) && !(!((d = (c = S.actions).skip) === null || d === void 0) && d.call(c, null)) }, { children: [r(ee, Object.assign({ uiAction: "back", onClick: (P) => en(void 0, void 0, void 0, function* () {
    P.preventDefault(), O("back");
    const j = yield S.actions.back(null).run();
    O(null), yield x.flow.run(j, A);
  }), loadingSpinnerPosition: "right", hidden: !(!((u = (l = S.actions).back) === null || u === void 0) && u.call(l, null)) }, { children: m("labels.back") })), r(ee, Object.assign({ uiAction: "skip", onClick: (P) => en(void 0, void 0, void 0, function* () {
    P.preventDefault(), O("skip");
    const j = yield S.actions.skip(null).run();
    O(null), yield x.flow.run(j, A);
  }), loadingSpinnerPosition: "left", hidden: !(!((f = (h = S.actions).skip) === null || f === void 0) && f.call(h, null)) }, { children: m("labels.skip") }))] }))] });
};
var Wn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Zr = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { flowState: s } = Me(n.state), { hanko: c, setLoadingAction: d, stateHandler: l } = (0, _.useContext)(pe), [u, h] = (0, _.useState)([]), f = (0, _.useCallback)((m) => Wn(void 0, void 0, void 0, function* () {
    d("passcode-submit");
    const x = yield s.actions.otp_code_validate({ otp_code: m }).run();
    d(null), yield c.flow.run(x, l);
  }), [c, s, d, l]);
  return (0, _.useEffect)(() => {
    var m;
    ((m = s.error) === null || m === void 0 ? void 0 : m.code) === "passcode_invalid" && h([]);
  }, [s]), r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.otpLogin") }), r(Ee, { state: s }), r(W, { children: a("texts.otpLogin") }), r(oe, Object.assign({ onSubmit: (m) => Wn(void 0, void 0, void 0, function* () {
    return m.preventDefault(), f(u.join(""));
  }) }, { children: [r(ko, { onInput: (m) => {
    if (h(m), m.filter((x) => x !== "").length === 6) return f(m.join(""));
  }, passcodeDigits: u, numberOfInputs: 6 }), r(ne, Object.assign({ uiAction: "passcode-submit" }, { children: a("labels.continue") }))] }))] }), r(Re, Object.assign({ hidden: !(!((t = (e = s.actions).continue_to_login_security_key) === null || t === void 0) && t.call(e, null)) }, { children: r(ee, Object.assign({ uiAction: "skip", onClick: (m) => Wn(void 0, void 0, void 0, function* () {
    m.preventDefault(), d("skip");
    const x = yield s.actions.continue_to_login_security_key(null).run();
    d(null), yield c.flow.run(x, l);
  }), loadingSpinnerPosition: "right", hidden: !(!((i = (o = s.actions).continue_to_login_security_key) === null || i === void 0) && i.call(o, null)) }, { children: a("labels.useAnotherMethod") })) }))] });
};
var ti = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Jr = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { hanko: s, setLoadingAction: c, stateHandler: d } = (0, _.useContext)(pe), { flowState: l } = Me(n.state);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.securityKeyLogin") }), r(Ee, { state: l }), r(W, { children: a("texts.securityKeyLogin") }), r(oe, Object.assign({ onSubmit: (u) => ti(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("passkey-submit");
    const h = yield l.actions.webauthn_generate_request_options(null).run();
    yield s.flow.run(h, d);
  }) }, { children: r(ne, Object.assign({ uiAction: "passkey-submit", autofocus: !0, icon: "securityKey" }, { children: a("labels.securityKeyUse") })) }))] }), r(Re, Object.assign({ hidden: !(!((t = (e = l.actions).continue_to_login_otp) === null || t === void 0) && t.call(e, null)) }, { children: r(ee, Object.assign({ uiAction: "skip", onClick: (u) => ti(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("skip");
    const h = yield l.actions.continue_to_login_otp(null).run();
    c(null), yield s.flow.run(h, d);
  }), loadingSpinnerPosition: "right", hidden: !(!((i = (o = l.actions).continue_to_login_otp) === null || i === void 0) && i.call(o, null)) }, { children: a("labels.useAnotherMethod") })) }))] });
};
var tn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Yr = (n) => {
  var e, t, o, i, a, s, c, d;
  const { t: l } = (0, _.useContext)(Z.TranslateContext), { hanko: u, setLoadingAction: h, stateHandler: f } = (0, _.useContext)(pe), { flowState: m } = Me(n.state), x = (S) => tn(void 0, void 0, void 0, function* () {
    S.preventDefault(), h("passcode-submit");
    const P = yield m.actions.continue_to_security_key_creation(null).run();
    h(null), yield u.flow.run(P, f);
  }), O = (S) => tn(void 0, void 0, void 0, function* () {
    S.preventDefault(), h("password-submit");
    const P = yield m.actions.continue_to_otp_secret_creation(null).run();
    h(null), yield u.flow.run(P, f);
  }), A = (0, _.useMemo)(() => {
    const { actions: S } = m;
    return S.continue_to_security_key_creation && !S.continue_to_otp_secret_creation ? x : !S.continue_to_security_key_creation && S.continue_to_otp_secret_creation ? O : void 0;
  }, [m, x, O]);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: l("headlines.mfaSetUp") }), r(Ee, { flowError: m == null ? void 0 : m.error }), r(W, { children: l("texts.mfaSetUp") }), A ? r(oe, Object.assign({ onSubmit: A }, { children: r(ne, Object.assign({ uiAction: "passcode-submit" }, { children: l("labels.continue") })) })) : r(C.Fragment, { children: [r(oe, Object.assign({ hidden: !(!((t = (e = m.actions).continue_to_security_key_creation) === null || t === void 0) && t.call(e, null)), onSubmit: x }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "passcode-submit", icon: "securityKey" }, { children: l("labels.securityKey") })) })), r(oe, Object.assign({ hidden: !(!((i = (o = m.actions).continue_to_otp_secret_creation) === null || i === void 0) && i.call(o, null)), onSubmit: O }, { children: r(ne, Object.assign({ secondary: !0, uiAction: "password-submit", icon: "qrCodeScanner" }, { children: l("labels.authenticatorApp") })) }))] })] }), r(Re, { children: [r(ee, Object.assign({ uiAction: "back", onClick: (S) => tn(void 0, void 0, void 0, function* () {
    S.preventDefault(), h("back");
    const P = yield m.actions.back(null).run();
    h(null), yield u.flow.run(P, f);
  }), loadingSpinnerPosition: "right", hidden: !(!((s = (a = m.actions).back) === null || s === void 0) && s.call(a, null)) }, { children: l("labels.back") })), r(ee, Object.assign({ uiAction: "skip", onClick: (S) => tn(void 0, void 0, void 0, function* () {
    S.preventDefault(), h("skip");
    const P = yield m.actions.skip(null).run();
    h(null), yield u.flow.run(P, f);
  }), loadingSpinnerPosition: "left", hidden: !(!((d = (c = m.actions).skip) === null || d === void 0) && d.call(c, null)) }, { children: l("labels.skip") }))] })] });
};
var gn = G(560), jt = {};
jt.setAttributes = nt(), jt.insert = (n) => {
  window._hankoStyle = n;
}, jt.domAPI = tt(), jt.insertStyleElement = ot(), et()(gn.A, jt);
const Qr = gn.A && gn.A.locals ? gn.A.locals : void 0, Gr = ({ children: n, text: e }) => {
  const { t } = (0, _.useContext)(Z.TranslateContext), [o, i] = (0, _.useState)(!1);
  return r("section", Object.assign({ className: zt.clipboardContainer }, { children: [r("div", { children: [n, " "] }), r("div", Object.assign({ className: zt.clipboardIcon, onClick: (a) => {
    return s = void 0, c = void 0, l = function* () {
      a.preventDefault();
      try {
        yield navigator.clipboard.writeText(e), i(!0), setTimeout(() => i(!1), 1500);
      } catch (u) {
        console.error("Failed to copy: ", u);
      }
    }, new ((d = void 0) || (d = Promise))(function(u, h) {
      function f(O) {
        try {
          x(l.next(O));
        } catch (A) {
          h(A);
        }
      }
      function m(O) {
        try {
          x(l.throw(O));
        } catch (A) {
          h(A);
        }
      }
      function x(O) {
        var A;
        O.done ? u(O.value) : (A = O.value, A instanceof d ? A : new d(function(S) {
          S(A);
        })).then(f, m);
      }
      x((l = l.apply(s, c || [])).next());
    });
    var s, c, d, l;
  } }, { children: o ? r("span", { children: ["- ", t("labels.copied")] }) : r(Ht, { name: "copy", secondary: !0, size: 13 }) }))] }));
}, Xr = ({ src: n, secret: e }) => {
  const { t } = (0, _.useContext)(Z.TranslateContext);
  return r("div", Object.assign({ className: Qr.otpCreationDetails }, { children: [r("img", { alt: "QR-Code", src: n }), r(Pn, {}), r(Gr, Object.assign({ text: e }, { children: t("texts.otpSecretKey") })), r("div", { children: e })] }));
};
var Fn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const es = (n) => {
  const { t: e } = (0, _.useContext)(Z.TranslateContext), { flowState: t } = Me(n.state), { hanko: o, uiState: i, setLoadingAction: a, stateHandler: s } = (0, _.useContext)(pe), [c, d] = (0, _.useState)([]), l = (0, _.useCallback)((u) => Fn(void 0, void 0, void 0, function* () {
    a("passcode-submit");
    const h = yield t.actions.otp_code_verify({ otp_code: u }).run();
    a(null), yield o.flow.run(h, s);
  }), [t, a, s]);
  return (0, _.useEffect)(() => {
    var u;
    ((u = t.error) === null || u === void 0 ? void 0 : u.code) === "passcode_invalid" && d([]);
  }, [t]), r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: e("headlines.otpSetUp") }), r(Ee, { state: t }), r(W, { children: e("texts.otpScanQRCode") }), r(Xr, { src: t.payload.otp_image_source, secret: t.payload.otp_secret }), r(W, { children: e("texts.otpEnterVerificationCode") }), r(oe, Object.assign({ onSubmit: (u) => Fn(void 0, void 0, void 0, function* () {
    return u.preventDefault(), l(c.join(""));
  }) }, { children: [r(ko, { onInput: (u) => {
    if (d(u), u.filter((h) => h !== "").length === 6) return l(u.join(""));
  }, passcodeDigits: c, numberOfInputs: 6 }), r(ne, Object.assign({ uiAction: "passcode-submit" }, { children: e("labels.continue") }))] }))] }), r(Re, { children: r(ee, Object.assign({ onClick: (u) => Fn(void 0, void 0, void 0, function* () {
    u.preventDefault(), a("back");
    const h = yield t.actions.back(null).run();
    a(null), yield o.flow.run(h, s);
  }), loadingSpinnerPosition: "right", isLoading: i.loadingAction === "back" }, { children: e("labels.back") })) })] });
};
var ni = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const ts = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { hanko: s, setLoadingAction: c, stateHandler: d } = (0, _.useContext)(pe), { flowState: l } = Me(n.state);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.securityKeySetUp") }), r(Ee, { state: l }), r(W, { children: a("texts.securityKeySetUp") }), r(oe, Object.assign({ onSubmit: (u) => ni(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("passkey-submit");
    const h = yield l.actions.webauthn_generate_creation_options(null).run();
    yield s.flow.run(h, d);
  }) }, { children: r(ne, Object.assign({ uiAction: "passkey-submit", autofocus: !0, icon: "securityKey" }, { children: a("labels.createSecurityKey") })) }))] }), r(Re, Object.assign({ hidden: !(!((t = (e = l.actions).back) === null || t === void 0) && t.call(e, null)) }, { children: r(ee, Object.assign({ uiAction: "back", onClick: (u) => ni(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("back");
    const h = yield l.actions.back(null).run();
    c(null), yield s.flow.run(h, d);
  }), loadingSpinnerPosition: "right", hidden: !(!((i = (o = l.actions).back) === null || i === void 0) && i.call(o, null)) }, { children: a("labels.back") })) }))] });
};
var Kn = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const ns = (n) => {
  var e, t, o, i;
  const { t: a } = (0, _.useContext)(Z.TranslateContext), { hanko: s, setLoadingAction: c, stateHandler: d } = (0, _.useContext)(pe), { flowState: l } = Me(n.state);
  return r(C.Fragment, { children: [r(Pe, { children: [r(he, { children: a("headlines.trustDevice") }), r(Ee, { flowError: l == null ? void 0 : l.error }), r(W, { children: a("texts.trustDevice") }), r(oe, Object.assign({ onSubmit: (u) => Kn(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("trust-device-submit");
    const h = yield l.actions.trust_device(null).run();
    c(null), yield s.flow.run(h, d);
  }) }, { children: r(ne, Object.assign({ uiAction: "trust-device-submit" }, { children: a("labels.trustDevice") })) }))] }), r(Re, { children: [r(ee, Object.assign({ uiAction: "back", onClick: (u) => Kn(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("back");
    const h = yield l.actions.back(null).run();
    c(null), yield s.flow.run(h, d);
  }), loadingSpinnerPosition: "right", hidden: !(!((t = (e = l.actions).back) === null || t === void 0) && t.call(e, null)) }, { children: a("labels.back") })), r(ee, Object.assign({ uiAction: "skip", onClick: (u) => Kn(void 0, void 0, void 0, function* () {
    u.preventDefault(), c("skip");
    const h = yield l.actions.skip(null).run();
    c(null), yield s.flow.run(h, d);
  }), loadingSpinnerPosition: "left", hidden: !(!((i = (o = l.actions).skip) === null || i === void 0) && i.call(o, null)) }, { children: a("labels.skip") }))] })] });
};
var Ke = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const nn = "flow-state", pe = (0, C.createContext)(null), os = (n) => {
  var { lang: e, experimental: t = "", prefilledEmail: o, prefilledUsername: i, globalOptions: a, createWebauthnAbortSignal: s } = n, c = function(p, y) {
    var $ = {};
    for (var K in p) Object.prototype.hasOwnProperty.call(p, K) && y.indexOf(K) < 0 && ($[K] = p[K]);
    if (p != null && typeof Object.getOwnPropertySymbols == "function") {
      var ge = 0;
      for (K = Object.getOwnPropertySymbols(p); ge < K.length; ge++) y.indexOf(K[ge]) < 0 && Object.prototype.propertyIsEnumerable.call(p, K[ge]) && ($[K[ge]] = p[K[ge]]);
    }
    return $;
  }(n, ["lang", "experimental", "prefilledEmail", "prefilledUsername", "globalOptions", "createWebauthnAbortSignal"]);
  const { hanko: d, injectStyles: l, hidePasskeyButtonOnLogin: u, translations: h, translationsLocation: f, fallbackLanguage: m } = a;
  d.setLang((e == null ? void 0 : e.toString()) || m);
  const x = (0, _.useRef)(null), O = (0, _.useMemo)(() => `${a.storageKey}_last_login`, [a.storageKey]), [A, S] = (0, _.useState)(c.componentName), P = (0, _.useMemo)(() => t.split(" ").filter((p) => p.length).map((p) => p), [t]), j = (0, _.useMemo)(() => r(Cr, {}), []), [U, N] = (0, _.useState)(j), [, ae] = (0, _.useState)(d), [be, se] = (0, _.useState)(), [we, M] = (0, _.useState)({ email: o, username: i }), H = (0, _.useCallback)((p) => {
    M((y) => Object.assign(Object.assign({}, y), { loadingAction: p, succeededAction: null, error: null, lastAction: p || y.lastAction }));
  }, []), _e = (0, _.useCallback)((p) => {
    M((y) => Object.assign(Object.assign({}, y), { succeededAction: p, loadingAction: null }));
  }, []), Ue = (0, _.useCallback)(() => {
    M((p) => Object.assign(Object.assign({}, p), { succeededAction: p.lastAction, loadingAction: null, error: null }));
  }, []), Ie = (0, _.useMemo)(() => !!we.loadingAction || !!we.succeededAction, [we]), Ne = function(p, y) {
    var $;
    ($ = x.current) === null || $ === void 0 || $.dispatchEvent(new CustomEvent(p, { detail: y, bubbles: !1, composed: !0 }));
  }, le = (p) => {
    H(null), N(r(ei, { error: p instanceof Ce ? p : new Le(p) }));
  }, ce = (0, _.useMemo)(() => ({ onError: (p) => {
    le(p);
  }, preflight(p) {
    return Ke(this, void 0, void 0, function* () {
      const y = yield gt.isConditionalMediationAvailable(), $ = yield gt.isPlatformAuthenticatorAvailable(), K = yield p.actions.register_client_capabilities({ webauthn_available: k, webauthn_conditional_mediation_available: y, webauthn_platform_authenticator_available: $ }).run();
      return d.flow.run(K, ce);
    });
  }, login_init(p) {
    return Ke(this, void 0, void 0, function* () {
      N(r(Pr, { state: p })), function() {
        Ke(this, void 0, void 0, function* () {
          if (p.payload.request_options) {
            let y;
            try {
              y = yield Bo({ publicKey: p.payload.request_options.publicKey, mediation: "conditional", signal: s() });
            } catch {
              return;
            }
            H("passkey-submit");
            const $ = yield p.actions.webauthn_verify_assertion_response({ assertion_response: y }).run();
            H(null), yield d.flow.run($, ce);
          }
        });
      }();
    });
  }, passcode_confirmation(p) {
    N(r(Dr, { state: p }));
  }, login_otp(p) {
    return Ke(this, void 0, void 0, function* () {
      N(r(Zr, { state: p }));
    });
  }, login_passkey(p) {
    return Ke(this, void 0, void 0, function* () {
      let y;
      H("passkey-submit");
      try {
        y = yield Bo(Object.assign(Object.assign({}, p.payload.request_options), { signal: s() }));
      } catch {
        const ge = yield p.actions.back(null).run();
        return M((He) => Object.assign(Object.assign({}, He), { error: p.error, loadingAction: null })), d.flow.run(ge, ce);
      }
      const $ = yield p.actions.webauthn_verify_assertion_response({ assertion_response: y }).run();
      H(null), yield d.flow.run($, ce);
    });
  }, onboarding_create_passkey(p) {
    N(r(jr, { state: p }));
  }, onboarding_verify_passkey_attestation(p) {
    return Ke(this, void 0, void 0, function* () {
      let y;
      try {
        y = yield Vo(Object.assign(Object.assign({}, p.payload.creation_options), { signal: s() }));
      } catch {
        const ge = yield p.actions.back(null).run();
        return H(null), yield d.flow.run(ge, ce), void M((He) => Object.assign(Object.assign({}, He), { error: { code: "webauthn_credential_already_exists", message: "Webauthn credential already exists" } }));
      }
      const $ = yield p.actions.webauthn_verify_attestation_response({ public_key: y }).run();
      H(null), yield d.flow.run($, ce);
    });
  }, webauthn_credential_verification(p) {
    return Ke(this, void 0, void 0, function* () {
      let y;
      try {
        y = yield Vo(Object.assign(Object.assign({}, p.payload.creation_options), { signal: s() }));
      } catch {
        const ge = yield p.actions.back(null).run();
        return H(null), yield d.flow.run(ge, ce), void M((He) => Object.assign(Object.assign({}, He), { error: { code: "webauthn_credential_already_exists", message: "Webauthn credential already exists" } }));
      }
      const $ = yield p.actions.webauthn_verify_attestation_response({ public_key: y }).run();
      yield d.flow.run($, ce);
    });
  }, login_password(p) {
    N(r(Lr, { state: p }));
  }, login_password_recovery(p) {
    N(r($r, { state: p }));
  }, login_security_key(p) {
    return Ke(this, void 0, void 0, function* () {
      N(r(Jr, { state: p }));
    });
  }, mfa_method_chooser(p) {
    return Ke(this, void 0, void 0, function* () {
      N(r(Yr, { state: p }));
    });
  }, mfa_otp_secret_creation(p) {
    return Ke(this, void 0, void 0, function* () {
      N(r(es, { state: p }));
    });
  }, mfa_security_key_creation(p) {
    return Ke(this, void 0, void 0, function* () {
      N(r(ts, { state: p }));
    });
  }, login_method_chooser(p) {
    N(r(Tr, { state: p }));
  }, registration_init(p) {
    N(r(Ur, { state: p }));
  }, password_creation(p) {
    N(r(Nr, { state: p }));
  }, success(p) {
    var y;
    !((y = p.payload) === null || y === void 0) && y.last_login && localStorage.setItem(O, JSON.stringify(p.payload.last_login));
    const { claims: $ } = p.payload, K = Date.parse($.expiration) - Date.now();
    d.relay.dispatchSessionCreatedEvent({ claims: $, expirationSeconds: K }), Ue();
  }, profile_init(p) {
    N(r(Fr, { state: p, enablePasskeys: a.enablePasskeys }));
  }, thirdparty(p) {
    return Ke(this, void 0, void 0, function* () {
      const y = new URLSearchParams(window.location.search).get("hanko_token");
      if (y && y.length > 0) {
        const $ = new URLSearchParams(window.location.search), K = yield p.actions.exchange_token({ token: $.get("hanko_token") }).run();
        $.delete("hanko_token"), $.delete("saml_hint"), history.replaceState(null, null, window.location.pathname + ($.size < 1 ? "" : `?${$.toString()}`)), yield d.flow.run(K, ce);
      } else M(($) => Object.assign(Object.assign({}, $), { lastAction: null })), localStorage.setItem(nn, JSON.stringify(p.toJSON())), window.location.assign(p.payload.redirect_url);
    });
  }, error(p) {
    H(null), N(r(ei, { state: p }));
  }, onboarding_email(p) {
    N(r(Kr, { state: p }));
  }, onboarding_username(p) {
    N(r(Vr, { state: p }));
  }, credential_onboarding_chooser(p) {
    N(r(Br, { state: p }));
  }, account_deleted(p) {
    return Ke(this, void 0, void 0, function* () {
      yield d.user.logout(), d.relay.dispatchUserDeletedEvent();
    });
  }, device_trust(p) {
    N(r(ns, { state: p }));
  } }), [a.enablePasskeys, d, Ue, H]), me = (0, _.useCallback)((p) => Ke(void 0, void 0, void 0, function* () {
    H("switch-flow");
    const y = localStorage.getItem(O);
    y && se(JSON.parse(y));
    const $ = new URLSearchParams(window.location.search).get("hanko_token"), K = localStorage.getItem(nn);
    new URLSearchParams(window.location.search).get("saml_hint") === "idp_initiated" ? yield d.flow.init("/token_exchange", Object.assign({}, ce)) : K && K.length > 0 && $ && $.length > 0 ? (yield d.flow.fromString(localStorage.getItem(nn), Object.assign({}, ce)), localStorage.removeItem(nn)) : yield d.flow.init(p, Object.assign({}, ce)), H(null);
  }), [ce]), De = (0, _.useCallback)((p) => {
    switch (p) {
      case "auth":
      case "login":
        me("/login").catch(le);
        break;
      case "registration":
        me("/registration").catch(le);
        break;
      case "profile":
        me("/profile").catch(le);
    }
  }, [me]);
  (0, _.useEffect)(() => De(A), []), (0, _.useEffect)(() => {
    d.onUserDeleted(() => {
      Ne("onUserDeleted");
    }), d.onSessionCreated((p) => {
      Ne("onSessionCreated", p);
    }), d.onSessionExpired(() => {
      Ne("onSessionExpired");
    }), d.onUserLoggedOut(() => {
      Ne("onUserLoggedOut");
    });
  }, [d]), (0, _.useMemo)(() => {
    const p = () => {
      De(A);
    };
    ["auth", "login", "registration"].includes(A) ? (d.onUserLoggedOut(p), d.onSessionExpired(p), d.onUserDeleted(p)) : A === "profile" && d.onSessionCreated(p);
  }, []);
  const k = gt.supported();
  return r(pe.Provider, Object.assign({ value: { init: De, initialComponentName: c.componentName, isDisabled: Ie, setUIState: M, setLoadingAction: H, setSucceededAction: _e, uiState: we, hanko: d, setHanko: ae, lang: (e == null ? void 0 : e.toString()) || m, prefilledEmail: o, prefilledUsername: i, componentName: A, setComponentName: S, experimentalFeatures: P, hidePasskeyButtonOnLogin: u, page: U, setPage: N, stateHandler: ce, lastLogin: be } }, { children: r(Z.TranslateProvider, Object.assign({ translations: h, fallbackLang: m, root: f }, { children: r(sr, Object.assign({ ref: x }, { children: A !== "events" ? r(C.Fragment, { children: [l ? r("style", { dangerouslySetInnerHTML: { __html: window._hankoStyle.innerHTML } }) : null, U] }) : null })) })) }));
}, is = { en: G(6).en };
var zi = function(n, e, t, o) {
  return new (t || (t = Promise))(function(i, a) {
    function s(l) {
      try {
        d(o.next(l));
      } catch (u) {
        a(u);
      }
    }
    function c(l) {
      try {
        d(o.throw(l));
      } catch (u) {
        a(u);
      }
    }
    function d(l) {
      var u;
      l.done ? i(l.value) : (u = l.value, u instanceof t ? u : new t(function(h) {
        h(u);
      })).then(s, c);
    }
    d((o = o.apply(n, [])).next());
  });
};
const Ge = {}, Kt = (n, e) => r(os, Object.assign({ componentName: n, globalOptions: Ge, createWebauthnAbortSignal: ds }, e)), as = (n) => Kt("auth", n), rs = (n) => Kt("login", n), ss = (n) => Kt("registration", n), ls = (n) => Kt("profile", n), cs = (n) => Kt("events", n);
let on = new AbortController();
const ds = () => (on && on.abort(), on = new AbortController(), on.signal), Lt = ({ tagName: n, entryComponent: e, shadow: t = !0, observedAttributes: o }) => zi(void 0, void 0, void 0, function* () {
  customElements.get(n) || function(i, a, s, c) {
    function d() {
      var l = Reflect.construct(HTMLElement, [], d);
      return l._vdomComponent = i, l._root = c && c.shadow ? l.attachShadow({ mode: "open" }) : l, l;
    }
    (d.prototype = Object.create(HTMLElement.prototype)).constructor = d, d.prototype.connectedCallback = Sa, d.prototype.attributeChangedCallback = xa, d.prototype.disconnectedCallback = Aa, s = s || i.observedAttributes || Object.keys(i.propTypes || {}), d.observedAttributes = s, s.forEach(function(l) {
      Object.defineProperty(d.prototype, l, { get: function() {
        var u, h, f, m;
        return (u = (h = this._vdom) == null || (f = h.props) == null ? void 0 : f[l]) != null ? u : (m = this._props) == null ? void 0 : m[l];
      }, set: function(u) {
        this._vdom ? this.attributeChangedCallback(l, null, u) : (this._props || (this._props = {}), this._props[l] = u, this.connectedCallback());
        var h = typeof u;
        u != null && h !== "string" && h !== "boolean" && h !== "number" || this.setAttribute(l, u);
      } });
    }), customElements.define(a || i.tagName || i.displayName || i.name, d);
  }(e, n, o, { shadow: t });
}), us = (n, e = {}) => zi(void 0, void 0, void 0, function* () {
  const t = ["api", "lang", "experimental", "prefilled-email", "entry"];
  return e = Object.assign({ shadow: !0, injectStyles: !0, enablePasskeys: !0, hidePasskeyButtonOnLogin: !1, translations: null, translationsLocation: "/i18n", fallbackLanguage: "en", storageKey: "hanko", sessionCheckInterval: 3e4 }, e), Ge.hanko = new Mi(n, { cookieName: e.storageKey, cookieDomain: e.cookieDomain, cookieSameSite: e.cookieSameSite, localStorageKey: e.storageKey, sessionCheckInterval: e.sessionCheckInterval, sessionTokenLocation: e.sessionTokenLocation }), Ge.injectStyles = e.injectStyles, Ge.enablePasskeys = e.enablePasskeys, Ge.hidePasskeyButtonOnLogin = e.hidePasskeyButtonOnLogin, Ge.translations = e.translations || is, Ge.translationsLocation = e.translationsLocation, Ge.fallbackLanguage = e.fallbackLanguage, Ge.storageKey = e.storageKey, yield Promise.all([Lt(Object.assign(Object.assign({}, e), { tagName: "hanko-auth", entryComponent: as, observedAttributes: t })), Lt(Object.assign(Object.assign({}, e), { tagName: "hanko-login", entryComponent: rs, observedAttributes: t })), Lt(Object.assign(Object.assign({}, e), { tagName: "hanko-registration", entryComponent: ss, observedAttributes: t })), Lt(Object.assign(Object.assign({}, e), { tagName: "hanko-profile", entryComponent: ls, observedAttributes: t.filter((o) => ["api", "lang"].includes(o)) })), Lt(Object.assign(Object.assign({}, e), { tagName: "hanko-events", entryComponent: cs, observedAttributes: [] }))]), { hanko: Ge.hanko };
});
ie.fK;
ie.tJ;
ie.Z7;
ie.Q9;
ie.Lv;
ie.qQ;
var hs = ie.I4;
ie.O8;
ie.ku;
ie.ls;
ie.bO;
ie.yv;
ie.AT;
ie.m_;
ie.KG;
ie.DH;
ie.kf;
ie.oY;
ie.xg;
ie.Wg;
ie.J;
ie.AC;
ie.D_;
ie.jx;
ie.nX;
ie.Nx;
ie.Sd;
var Hi = ie.kz;
ie.fX;
ie.qA;
ie.tz;
ie.gN;
const ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Hanko: hs,
  register: Hi
}, Symbol.toStringTag, { value: "Module" })), ms = Vi`
  :host {
    display: block;
    font-family: var(--font-family, var(--hot-font-sans));
  }

  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: var(--hot-spacing-large);
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    padding: var(--hot-spacing-3x-large);
    color: var(--hot-color-gray-600);
  }

  .osm-connecting {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--hot-spacing-small);
    padding: var(--hot-spacing-large);
  }

  .spinner {
    width: clamp(40px, 10%, 60px);
    height: clamp(40px, 10%, 60px);
    border: 4px solid var(--hot-color-gray-50);
    border-top: 4px solid var(--hot-color-red-600);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  /* Container that mimics the avatar/dropdown-trigger dimensions */
  .loading-placeholder {
    display: inline-grid;
    place-items: center;
    /* Match dropdown-trigger padding so size is stable pre/post load */
    padding: var(--hot-spacing-x-small);
    width: var(--hot-spacing-2x-large);
    height: var(--hot-spacing-2x-large);
    box-sizing: content-box;
  }

  /* Invisible text to reserve button width */
  .loading-placeholder-text {
    display: none;
  }

  .spinner-small {
    grid-area: 1 / 1;
    width: var(--hot-spacing-2x-large);
    height: var(--hot-spacing-2x-large);
    border: 2px solid var(--hot-color-gray-200);
    border-top: 2px solid var(--hot-color-gray-600);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .connecting-text {
    font-size: var(--hot-font-size-small);
    color: var(--hot-color-gray-600);
    font-weight: var(--hot-font-weight-semibold);
  }

  button {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-family: var(--font-family, var(--hot-font-sans));
    font-weight: var(--font-weight, 500);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background: var(--hot-color-red-700);
    color: white;
  }

  .btn-primary:hover {
    background: var(--hot-color-gray-600);
  }

  .btn-secondary {
    border: 1px solid var(--hot-color-gray-700);
    border-radius: var(--hot-border-radius-medium);
    background-color: white;
    color: var(--hot-color-gray-700);
    margin-top: 8px;
  }

  .btn-secondary:hover {
    background: var(--hot-color-gray-50);
  }

  .error {
    background: var(--hot-color-red-50);
    border: var(--hot-border-width, 1px) solid var(--hot-color-red-200);
    border-radius: var(--hot-border-radius-medium);
    padding: var(--hot-spacing-small);
    color: var(--hot-color-red-700);
    margin-bottom: var(--hot-spacing-medium);
  }

  .profile {
    background: var(--hot-color-gray-50);
    border-radius: var(--hot-border-radius-large);
    padding: var(--hot-spacing-large);
    margin-bottom: var(--hot-spacing-medium);
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: var(--hot-spacing-small);
    margin-bottom: var(--hot-spacing-medium);
  }

  .profile-avatar {
    width: var(--hot-spacing-3x-large);
    height: var(--hot-spacing-3x-large);
    border-radius: 50%;
    background: var(--hot-color-gray-200);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--hot-font-size-large);
    font-weight: var(--hot-font-weight-bold);
    color: var(--hot-color-gray-600);
  }

  .profile-info {
    padding: var(--hot-spacing-x-small) var(--hot-spacing-medium);
  }

  .profile-email {
    font-size: var(--hot-font-size-small);
    font-weight: var(--hot-font-weight-bold);
  }

  .osm-section {
    border-top: var(--hot-border-width, 1px) solid var(--hot-color-gray-100);
    padding-top: var(--hot-spacing-medium);
    padding-bottom: var(--hot-spacing-small);
    margin-top: var(--hot-spacing-medium);
    text-align: center;
  }

  .osm-connected {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--hot-spacing-small);
    background: linear-gradient(
      135deg,
      var(--hot-color-success-50) 0%,
      var(--hot-color-success-50) 100%
    );
    border-radius: var(--hot-border-radius-large);
    border: var(--hot-border-width, 1px) solid var(--hot-color-success-200);
  }

  .osm-badge {
    display: flex;
    align-items: center;
    gap: var(--hot-spacing-x-small);
    color: var(--hot-color-success-800);
    font-weight: var(--hot-font-weight-semibold);
    font-size: var(--hot-font-size-small);
    text-align: left;
  }

  .osm-badge-icon {
    font-size: var(--hot-font-size-medium);
  }

  .osm-username {
    font-size: var(--hot-font-size-x-small);
    color: var(--hot-color-success-700);
    margin-top: var(--hot-spacing-2x-small);
  }

  .osm-prompt-title {
    font-weight: var(--hot-font-weight-semibold);
    font-size: var(--hot-font-size-medium);
    margin-bottom: var(--hot-spacing-small);
    color: var(--hot-color-gray-900);
    text-align: center;
  }

  .osm-prompt-text {
    font-size: var(--hot-font-size-small);
    color: var(--hot-color-gray-600);
    margin-bottom: var(--hot-spacing-medium);
    line-height: var(--hot-line-height-normal);
    text-align: center;
  }

  .osm-status-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    width: var(--hot-font-size-small);
    height: var(--hot-font-size-small);
    border-radius: 50%;
    border: var(--hot-spacing-3x-small) solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--hot-font-size-2x-small);
    color: white;
    font-weight: var(--hot-font-weight-bold);
  }

  .osm-status-badge.connected {
    background-color: var(--hot-color-success-600);
  }

  .osm-status-badge.required {
    background-color: var(--hot-color-warning-600);
  }
  .header-avatar {
    width: var(--hot-spacing-2x-large);
    height: var(--hot-spacing-2x-large);
    border-radius: 50%;
    background: var(--hot-color-gray-800);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--hot-font-size-small);
    font-weight: var(--hot-font-weight-semibold);
    color: white;
  }

  .login-link {
    color: var(--login-btn-text-color, white);
    font-size: var(--login-btn-text-size, var(--hot-font-size-medium));
    border-radius: var(
      --login-btn-border-radius,
      var(--hot-border-radius-medium)
    );
    text-decoration: none;
    padding: var(
      --login-btn-padding,
      var(--hot-spacing-x-small) var(--hot-spacing-medium)
    );
    margin: var(--login-btn-margin, 0);
    display: inline-block;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: var(--login-btn-font-weight, var(--font-weight, var(--hot-font-weight-medium)));
    font-family: var(--login-btn-font-family, var(--font-family, var(--hot-font-sans)));
  }

  /* Button variants - filled */
  .login-link.filled {
    border: none;
  }
  .login-link.filled.primary {
    background: var(--login-btn-bg-color, var(--hot-color-primary-1000));
    color: var(--login-btn-text-color, white);
  }
  .login-link.filled.primary:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-primary-900));
  }
  .login-link.filled.neutral {
    background: var(--login-btn-bg-color, var(--hot-color-neutral-600));
    color: var(--login-btn-text-color, white);
  }
  .login-link.filled.neutral:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-neutral-700));
  }
  .login-link.filled.danger {
    background: var(--login-btn-bg-color, var(--hot-color-red-600));
    color: var(--login-btn-text-color, white);
  }
  .login-link.filled.danger:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-red-700));
  }

  /* Button variants - outline */
  .login-link.outline {
    background: var(--login-btn-bg-color, transparent);
    border: 1px solid;
  }
  .login-link.outline.primary {
    border-color: var(--login-btn-bg-color, var(--hot-color-primary-1000));
    color: var(--login-btn-text-color, var(--hot-color-primary-1000));
  }
  .login-link.outline.primary:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-primary-50));
  }
  .login-link.outline.neutral {
    border-color: var(--login-btn-bg-color, var(--hot-color-neutral-700));
    color: var(--login-btn-text-color, var(--hot-color-neutral-700));
  }
  .login-link.outline.neutral:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-neutral-50));
  }
  .login-link.outline.danger {
    border-color: var(--login-btn-bg-color, var(--hot-color-red-600));
    color: var(--login-btn-text-color, var(--hot-color-red-600));
  }
  .login-link.outline.danger:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-red-50));
  }

  /* Button variants - plain */
  .login-link.plain {
    background: var(--login-btn-bg-color, transparent);
    border: none;
  }
  .login-link.plain.primary {
    color: var(--login-btn-text-color, var(--hot-color-primary-1000));
  }
  .login-link.plain.primary:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-primary-50));
  }
  .login-link.plain.neutral {
    color: var(--login-btn-text-color, var(--hot-color-neutral-700));
  }
  .login-link.plain.neutral:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-neutral-50));
  }
  .login-link.plain.danger {
    color: var(--login-btn-text-color, var(--hot-color-red-600));
  }
  .login-link.plain.danger:hover {
    background: var(--login-btn-hover-bg-color, var(--hot-color-red-50));
  }
  /* Dropdown styles */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-trigger {
    background: none;
    border: none;
    padding: var(--hot-spacing-x-small);
    cursor: pointer;
    position: relative;
  }

  .dropdown-trigger:hover,
  .dropdown-trigger:active,
  .dropdown-trigger:focus {
    background: none;
    outline: none;
  }
  .dropdown-content {
    position: absolute;
    right: 0;
    background: white;
    border-radius: var(--hot-border-radius-medium);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      transform 0.2s ease;
  }
  @media (max-width: 768px) {
    .dropdown-content {
      position: fixed;
      width: 100%;
    }
  }

  .dropdown-content.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(-1px);
  }

  .dropdown-content button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--hot-spacing-small) var(--hot-spacing-medium);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease;
    gap: var(--hot-spacing-small);
    font-family: var(--font-family, var(--hot-font-sans, inherit));
    font-size: var(--hot-font-size-small);
    color: var(--hot-color-gray-900);
  }

  .dropdown-content button:hover {
    background-color: var(--hot-color-gray-50);
  }

  .dropdown-content button:focus {
    background-color: var(--hot-color-gray-50);
    outline: 2px solid var(--hot-color-gray-500);
    outline-offset: -2px;
  }

  .dropdown-content .profile-info {
    padding: var(--hot-spacing-small) var(--hot-spacing-medium);
  }

  .dropdown-content .profile-email {
    font-size: var(--hot-font-size-small);
    font-weight: var(--hot-font-weight-bold);
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  /* Bar display mode */

  :host([display="bar"]) {
    width: 100%;
  }

  :host([display="bar"]) .dropdown {
    display: block;
    width: 100%;
  }

  .bar-trigger {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--hot-spacing-small) var(--hot-spacing-medium);
    background: none;
    border: none;
    cursor: pointer;
    gap: var(--hot-spacing-small);
    font-family: var(--font-family, var(--hot-font-sans, inherit));
  }

  .bar-trigger:hover,
  .bar-trigger:active,
  .bar-trigger:focus {
    background: none;
    outline: none;
  }

  .bar-info {
    display: flex;
    align-items: center;
    gap: var(--hot-spacing-small);
    flex: 1;
    min-width: 0;
  }

  .bar-email {
    font-size: var(--hot-font-size-medium);
    color: var(--hot-color-gray-900);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bar-chevron {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--hot-color-gray-900);
  }

  /* When bar-trigger is used as a login-link, override width behavior */
  a.bar-trigger.login-link {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    text-decoration: none;
  }
`;
var Qn = { d: (n, e) => {
  for (var t in e) Qn.o(e, t) && !Qn.o(n, t) && Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
}, o: (n, e) => Object.prototype.hasOwnProperty.call(n, e) }, Wi = {};
Qn.d(Wi, { en: () => gs });
const gs = { headlines: { error: "An error has occurred", loginEmail: "Sign in or create account", loginEmailNoSignup: "Sign in", loginFinished: "Login successful", loginPasscode: "Enter passcode", loginPassword: "Enter password", registerAuthenticator: "Create a passkey", registerConfirm: "Create account?", registerPassword: "Set new password", otpSetUp: "Set up authenticator app", profileEmails: "Emails", profilePassword: "Password", profilePasskeys: "Passkeys", isPrimaryEmail: "Primary email address", setPrimaryEmail: "Set primary email address", createEmail: "Enter a new email", createUsername: "Enter a new username", emailVerified: "Verified", emailUnverified: "Unverified", emailDelete: "Delete", renamePasskey: "Rename passkey", deletePasskey: "Delete passkey", lastUsedAt: "Last used at", createdAt: "Created at", connectedAccounts: "Connected accounts", deleteAccount: "Delete account", accountNotFound: "Account not found", signIn: "Sign in", signUp: "Create account", selectLoginMethod: "Select login method", setupLoginMethod: "Set up login method", lastUsed: "Last seen", ipAddress: "IP address", revokeSession: "Revoke session", profileSessions: "Sessions", mfaSetUp: "Set up MFA", securityKeySetUp: "Add security key", securityKeyLogin: "Security key", otpLogin: "Authentication code", renameSecurityKey: "Rename security key", deleteSecurityKey: "Delete security key", securityKeys: "Security keys", authenticatorApp: "Authenticator app", authenticatorAppAlreadySetUp: "Authenticator app is set up", authenticatorAppNotSetUp: "Set up authenticator app", trustDevice: "Trust this browser?" }, texts: { enterPasscode: 'Enter the passcode that was sent to "{emailAddress}".', enterPasscodeNoEmail: "Enter the passcode that was sent to your primary email address.", setupPasskey: "Sign in to your account easily and securely with a passkey. Note: Your biometric data is only stored on your devices and will never be shared with anyone.", createAccount: 'No account exists for "{emailAddress}". Do you want to create a new account?', otpEnterVerificationCode: "Enter the one-time password (OTP) obtained from your authenticator app below:", otpScanQRCode: "Scan the QR code using your authenticator app (such as Google Authenticator or any other TOTP app). Alternatively, you can manually enter the OTP secret key into the app.", otpSecretKey: "OTP secret key", passwordFormatHint: "Must be between {minLength} and {maxLength} characters long.", securityKeySetUp: "Use a dedicated security key via USB, Bluetooth, or NFC, or your mobile phone. Connect or activate your security key, then click the button below and follow the prompts to complete the registration.", setPrimaryEmail: "Set this email address to be used for contacting you.", isPrimaryEmail: "This email address will be used to contact you if necessary.", emailVerified: "This email address has been verified.", emailUnverified: "This email address has not been verified.", emailDelete: "If you delete this email address, it can no longer be used to sign in.", renamePasskey: "Set a name for the passkey.", deletePasskey: "Delete this passkey from your account.", deleteAccount: "Are you sure you want to delete this account? All data will be deleted immediately and cannot be recovered.", noAccountExists: 'No account exists for "{emailAddress}".', selectLoginMethodForFutureLogins: "Select one of the following login methods to use for future logins.", howDoYouWantToLogin: "How do you want to login?", mfaSetUp: "Protect your account with Multi-Factor Authentication (MFA). MFA adds an additional step to your login process, ensuring that even if your password or email account is compromised, your account stays secure.", securityKeyLogin: "Connect or activate your security key, then click the button below. Once ready, use it via USB, NFC, your mobile phone. Follow the prompts to complete the login process.", otpLogin: "Open your authenticator app to obtain the one-time password (OTP). Enter the code in the field below to complete your login.", renameSecurityKey: "Set a name for the security key.", deleteSecurityKey: "Delete this security key from your account.", authenticatorAppAlreadySetUp: "Your account is secured with an authenticator app that generates time-based one-time passwords (TOTP) for multi-factor authentication.", authenticatorAppNotSetUp: "Secure your account with an authenticator app that generates time-based one-time passwords (TOTP) for multi-factor authentication.", trustDevice: "If you trust this browser, you won’t need to enter your OTP (One-Time-Password) or use your security key for multi-factor authentication (MFA) the next time you log in." }, labels: { or: "or", no: "no", yes: "yes", email: "Email", continue: "Continue", copied: "copied", skip: "Skip", save: "Save", password: "Password", passkey: "Passkey", passcode: "Passcode", signInPassword: "Sign in with a password", signInPasscode: "Sign in with a passcode", forgotYourPassword: "Forgot your password?", back: "Back", signInPasskey: "Sign in with a passkey", registerAuthenticator: "Create a passkey", signIn: "Sign in", signUp: "Create account", sendNewPasscode: "Send new code", passwordRetryAfter: "Retry in {passwordRetryAfter}", passcodeResendAfter: "Request a new code in {passcodeResendAfter}", unverifiedEmail: "unverified", primaryEmail: "primary", setAsPrimaryEmail: "Set as primary", verify: "Verify", delete: "Delete", newEmailAddress: "New email address", newPassword: "New password", rename: "Rename", newPasskeyName: "New passkey name", addEmail: "Add email", createPasskey: "Create a passkey", webauthnUnsupported: "Passkeys are not supported by your browser", signInWith: "Sign in with {provider}", deleteAccount: "Yes, delete this account.", emailOrUsername: "Email or username", username: "Username", optional: "optional", dontHaveAnAccount: "Don't have an account?", alreadyHaveAnAccount: "Already have an account?", changeUsername: "Change username", setUsername: "Set username", changePassword: "Change password", setPassword: "Set password", revoke: "Revoke", currentSession: "Current session", authenticatorApp: "Authenticator app", securityKey: "Security key", securityKeyUse: "Use security key", newSecurityKeyName: "New security key name", createSecurityKey: "Add a security key", authenticatorAppManage: "Manage authenticator app", authenticatorAppAdd: "Set up", configured: "configured", useAnotherMethod: "Use another method", lastUsed: "Last used", trustDevice: "Trust this browser", staySignedIn: "Stay signed in" }, errors: { somethingWentWrong: "A technical error has occurred. Please try again later.", requestTimeout: "The request timed out.", invalidPassword: "Wrong email or password.", invalidPasscode: "The passcode provided was not correct.", passcodeAttemptsReached: "The passcode was entered incorrectly too many times. Please request a new code.", tooManyRequests: "Too many requests have been made. Please wait to repeat the requested operation.", unauthorized: "Your session has expired. Please log in again.", invalidWebauthnCredential: "This passkey cannot be used anymore.", passcodeExpired: "The passcode has expired. Please request a new one.", userVerification: "User verification required. Please ensure your authenticator device is protected with a PIN or biometric.", emailAddressAlreadyExistsError: "The email address already exists.", maxNumOfEmailAddressesReached: "No further email addresses can be added.", thirdPartyAccessDenied: "Access denied. The request was cancelled by the user or the provider has denied access for other reasons.", thirdPartyMultipleAccounts: "Cannot identify account. The email address is used by multiple accounts.", thirdPartyUnverifiedEmail: "Email verification required. Please verify the used email address with your provider.", signupDisabled: "Account registration is disabled.", handlerNotFoundError: "The current step in your process is not supported by this application version. Please try again later or contact support if the issue persists." }, flowErrors: { technical_error: "A technical error has occurred. Please try again later.", flow_expired_error: "The session has expired, please click the button to restart.", value_invalid_error: "The entered value is invalid.", passcode_invalid: "The passcode provided was not correct.", passkey_invalid: "This passkey cannot be used anymore", passcode_max_attempts_reached: "The passcode was entered incorrectly too many times. Please request a new code.", rate_limit_exceeded: "Too many requests have been made. Please wait to repeat the requested operation.", unknown_username_error: "The username is unknown.", unknown_email_error: "The email address is unknown.", username_already_exists: "The username is already taken.", invalid_username_error: "The username must contain only letters, numbers, and underscores.", email_already_exists: "The email is already taken.", not_found: "The requested resource was not found.", operation_not_permitted_error: "The operation is not permitted.", flow_discontinuity_error: "The process cannot be continued due to user settings or the provider's configuration.", form_data_invalid_error: "The submitted form data contains errors.", unauthorized: "Your session has expired. Please log in again.", value_missing_error: "The value is missing.", value_too_long_error: "Value is too long.", value_too_short_error: "The value is too short.", webauthn_credential_invalid_mfa_only: "This credential can be used as a second factor security key only.", webauthn_credential_already_exists: "The request either timed out, was canceled or the device is already registered. Please try again or try using another device.", platform_authenticator_required: "Your account is configured to use platform authenticators, but your current device or browser does not support this feature. Please try again with a compatible device or browser." } };
var fs = Wi.en;
const vs = {
  headlines: {
    error: "Ha ocurrido un error",
    loginEmail: "Iniciar sesión o crear cuenta",
    loginEmailNoSignup: "Iniciar sesión",
    loginFinished: "Inicio de sesión exitoso",
    loginPasscode: "Ingrese el código de acceso",
    loginPassword: "Ingrese la contraseña",
    registerAuthenticator: "Crear una llave de acceso",
    registerConfirm: "¿Crear cuenta?",
    registerPassword: "Establecer nueva contraseña",
    otpSetUp: "Configurar aplicación de autenticación",
    profileEmails: "Correos electrónicos",
    profilePassword: "Contraseña",
    profilePasskeys: "Llaves de acceso",
    isPrimaryEmail: "Dirección de correo principal",
    setPrimaryEmail: "Establecer correo principal",
    createEmail: "Ingrese un nuevo correo",
    createUsername: "Ingrese un nuevo nombre de usuario",
    emailVerified: "Verificado",
    emailUnverified: "No verificado",
    emailDelete: "Eliminar",
    renamePasskey: "Renombrar llave de acceso",
    deletePasskey: "Eliminar llave de acceso",
    lastUsedAt: "Último uso",
    createdAt: "Creado",
    connectedAccounts: "Cuentas conectadas",
    deleteAccount: "Eliminar cuenta",
    accountNotFound: "Cuenta no encontrada",
    signIn: "Iniciar sesión",
    signUp: "Crear cuenta",
    selectLoginMethod: "Seleccionar método de inicio de sesión",
    setupLoginMethod: "Configurar método de inicio de sesión",
    lastUsed: "Visto por última vez",
    ipAddress: "Dirección IP",
    revokeSession: "Revocar sesión",
    profileSessions: "Sesiones",
    mfaSetUp: "Configurar MFA",
    securityKeySetUp: "Agregar clave de seguridad",
    securityKeyLogin: "Clave de seguridad",
    otpLogin: "Código de autenticación",
    renameSecurityKey: "Renombrar clave de seguridad",
    deleteSecurityKey: "Eliminar clave de seguridad",
    securityKeys: "Claves de seguridad",
    authenticatorApp: "Aplicación de autenticación",
    authenticatorAppAlreadySetUp: "La aplicación de autenticación está configurada",
    authenticatorAppNotSetUp: "Configurar aplicación de autenticación",
    trustDevice: "¿Confiar en este navegador?"
  },
  texts: {
    enterPasscode: 'Ingrese el código que se envió a "{emailAddress}".',
    enterPasscodeNoEmail: "Ingrese el código que se envió a su dirección de correo principal.",
    setupPasskey: "Inicie sesión en su cuenta fácil y seguramente con una llave de acceso. Nota: Sus datos biométricos solo se almacenan en sus dispositivos y nunca se compartirán con nadie.",
    createAccount: 'No existe una cuenta para "{emailAddress}". ¿Desea crear una nueva cuenta?',
    otpEnterVerificationCode: "Ingrese la contraseña de un solo uso (OTP) obtenida de su aplicación de autenticación a continuación:",
    otpScanQRCode: "Escanee el código QR usando su aplicación de autenticación (como Google Authenticator o cualquier otra aplicación TOTP). Alternativamente, puede ingresar manualmente la clave secreta OTP en la aplicación.",
    otpSecretKey: "Clave secreta OTP",
    passwordFormatHint: "Debe tener entre {minLength} y {maxLength} caracteres.",
    securityKeySetUp: "Use una clave de seguridad dedicada a través de USB, Bluetooth o NFC, o su teléfono móvil. Conecte o active su clave de seguridad, luego haga clic en el botón a continuación y siga las indicaciones para completar el registro.",
    setPrimaryEmail: "Establezca esta dirección de correo para ser usada para contactarlo.",
    isPrimaryEmail: "Esta dirección de correo se utilizará para contactarlo si es necesario.",
    emailVerified: "Esta dirección de correo ha sido verificada.",
    emailUnverified: "Esta dirección de correo no ha sido verificada.",
    emailDelete: "Si elimina esta dirección de correo, ya no podrá usarla para iniciar sesión.",
    renamePasskey: "Establecer un nombre para la llave de acceso.",
    deletePasskey: "Eliminar esta llave de acceso de su cuenta.",
    deleteAccount: "¿Está seguro de que desea eliminar esta cuenta? Todos los datos se eliminarán inmediatamente y no se podrán recuperar.",
    noAccountExists: 'No existe una cuenta para "{emailAddress}".',
    selectLoginMethodForFutureLogins: "Seleccione uno de los siguientes métodos de inicio de sesión para usar en futuros inicios de sesión.",
    howDoYouWantToLogin: "¿Cómo desea iniciar sesión?",
    mfaSetUp: "Proteja su cuenta con autenticación multifactor (MFA). MFA agrega un paso adicional a su proceso de inicio de sesión, asegurando que incluso si su contraseña o cuenta de correo está comprometida, su cuenta permanezca segura.",
    securityKeyLogin: "Conecte o active su clave de seguridad, luego haga clic en el botón a continuación. Una vez listo, úselo a través de USB, NFC o su teléfono móvil. Siga las indicaciones para completar el proceso de inicio de sesión.",
    otpLogin: "Abra su aplicación de autenticación para obtener la contraseña de un solo uso (OTP). Ingrese el código en el campo a continuación para completar su inicio de sesión.",
    renameSecurityKey: "Establecer un nombre para la clave de seguridad.",
    deleteSecurityKey: "Eliminar esta clave de seguridad de su cuenta.",
    authenticatorAppAlreadySetUp: "Su cuenta está protegida con una aplicación de autenticación que genera contraseñas de un solo uso basadas en tiempo (TOTP) para autenticación multifactor.",
    authenticatorAppNotSetUp: "Proteja su cuenta con una aplicación de autenticación que genera contraseñas de un solo uso basadas en tiempo (TOTP) para autenticación multifactor.",
    trustDevice: "Si confía en este navegador, no necesitará ingresar su OTP (contraseña de un solo uso) o usar su clave de seguridad para la autenticación multifactor (MFA) la próxima vez que inicie sesión."
  },
  labels: {
    or: "o",
    no: "no",
    yes: "sí",
    email: "Correo electrónico",
    continue: "Continuar",
    copied: "copiado",
    skip: "Omitir",
    save: "Guardar",
    password: "Contraseña",
    passkey: "Llave de acceso",
    passcode: "Código de acceso",
    signInPassword: "Iniciar sesión con contraseña",
    signInPasscode: "Iniciar sesión con código",
    forgotYourPassword: "¿Olvidó su contraseña?",
    back: "Atrás",
    signInPasskey: "Iniciar sesión con llave de acceso",
    registerAuthenticator: "Crear una llave de acceso",
    signIn: "Iniciar sesión",
    signUp: "Crear cuenta",
    sendNewPasscode: "Enviar nuevo código",
    passwordRetryAfter: "Reintentar en {passwordRetryAfter}",
    passcodeResendAfter: "Solicitar nuevo código en {passcodeResendAfter}",
    unverifiedEmail: "no verificado",
    primaryEmail: "principal",
    setAsPrimaryEmail: "Establecer como principal",
    verify: "Verificar",
    delete: "Eliminar",
    newEmailAddress: "Nueva dirección de correo",
    newPassword: "Nueva contraseña",
    rename: "Renombrar",
    newPasskeyName: "Nuevo nombre de llave de acceso",
    addEmail: "Agregar correo",
    createPasskey: "Crear una llave de acceso",
    webauthnUnsupported: "Las llaves de acceso no son compatibles con su navegador",
    signInWith: "Iniciar sesión con {provider}",
    deleteAccount: "Sí, eliminar esta cuenta.",
    emailOrUsername: "Correo o nombre de usuario",
    username: "Nombre de usuario",
    optional: "opcional",
    dontHaveAnAccount: "¿No tiene una cuenta?",
    alreadyHaveAnAccount: "¿Ya tiene una cuenta?",
    changeUsername: "Cambiar nombre de usuario",
    setUsername: "Establecer nombre de usuario",
    changePassword: "Cambiar contraseña",
    setPassword: "Establecer contraseña",
    revoke: "Revocar",
    currentSession: "Sesión actual",
    authenticatorApp: "Aplicación de autenticación",
    securityKey: "Clave de seguridad",
    securityKeyUse: "Usar clave de seguridad",
    newSecurityKeyName: "Nuevo nombre de clave de seguridad",
    createSecurityKey: "Agregar una clave de seguridad",
    authenticatorAppManage: "Administrar aplicación de autenticación",
    authenticatorAppAdd: "Configurar",
    configured: "configurado",
    useAnotherMethod: "Usar otro método",
    lastUsed: "Último uso",
    trustDevice: "Confiar en este navegador",
    staySignedIn: "Mantener sesión iniciada"
  },
  errors: {
    somethingWentWrong: "Ha ocurrido un error técnico. Por favor, inténtelo de nuevo más tarde.",
    requestTimeout: "La solicitud ha expirado.",
    invalidPassword: "Correo o contraseña incorrectos.",
    invalidPasscode: "El código proporcionado no es correcto.",
    passcodeAttemptsReached: "El código se ha ingresado incorrectamente demasiadas veces. Por favor, solicite un nuevo código.",
    tooManyRequests: "Se han realizado demasiadas solicitudes. Por favor, espere para repetir la operación solicitada.",
    unauthorized: "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
    invalidWebauthnCredential: "Esta llave de acceso ya no se puede usar.",
    passcodeExpired: "El código ha expirado. Por favor, solicite uno nuevo.",
    userVerification: "Se requiere verificación de usuario. Asegúrese de que su dispositivo de autenticación esté protegido con un PIN o biometría.",
    emailAddressAlreadyExistsError: "La dirección de correo ya existe.",
    maxNumOfEmailAddressesReached: "No se pueden agregar más direcciones de correo.",
    thirdPartyAccessDenied: "Acceso denegado. La solicitud fue cancelada por el usuario o el proveedor ha denegado el acceso por otras razones.",
    thirdPartyMultipleAccounts: "No se puede identificar la cuenta. La dirección de correo es usada por múltiples cuentas.",
    thirdPartyUnverifiedEmail: "Se requiere verificación de correo. Por favor, verifique la dirección de correo usada con su proveedor.",
    signupDisabled: "El registro de cuentas está deshabilitado.",
    handlerNotFoundError: "El paso actual en su proceso no es compatible con esta versión de la aplicación. Inténtelo de nuevo más tarde o contacte al soporte si el problema persiste."
  },
  flowErrors: {
    technical_error: "Ha ocurrido un error técnico. Por favor, inténtelo de nuevo más tarde.",
    flow_expired_error: "La sesión ha expirado, haga clic en el botón para reiniciar.",
    value_invalid_error: "El valor ingresado no es válido.",
    passcode_invalid: "El código proporcionado no es correcto.",
    passkey_invalid: "Esta llave de acceso ya no se puede usar.",
    passcode_max_attempts_reached: "El código se ha ingresado incorrectamente demasiadas veces. Por favor, solicite un nuevo código.",
    rate_limit_exceeded: "Se han realizado demasiadas solicitudes. Por favor, espere para repetir la operación solicitada.",
    unknown_username_error: "El nombre de usuario es desconocido.",
    unknown_email_error: "La dirección de correo es desconocida.",
    username_already_exists: "El nombre de usuario ya está en uso.",
    invalid_username_error: "El nombre de usuario solo debe contener letras, números y guiones bajos.",
    email_already_exists: "El correo ya está en uso.",
    not_found: "No se encontró el recurso solicitado.",
    operation_not_permitted_error: "La operación no está permitida.",
    flow_discontinuity_error: "El proceso no se puede continuar debido a la configuración del usuario o del proveedor.",
    form_data_invalid_error: "Los datos del formulario enviados contienen errores.",
    unauthorized: "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
    value_missing_error: "Falta el valor.",
    value_too_long_error: "El valor es demasiado largo.",
    value_too_short_error: "El valor es demasiado corto.",
    webauthn_credential_invalid_mfa_only: "Esta credencial solo se puede usar como clave de seguridad de segundo factor.",
    webauthn_credential_already_exists: "La solicitud expiró, se canceló o el dispositivo ya está registrado. Inténtelo de nuevo o intente usar otro dispositivo.",
    platform_authenticator_required: "Su cuenta está configurada para usar autenticadores de plataforma, pero su dispositivo o navegador actual no admite esta función. Inténtelo de nuevo con un dispositivo o navegador compatible.",
    third_party_access_denied: "Acceso denegado por el proveedor de terceros. Por favor, inténtelo de nuevo."
  }
}, _s = {
  headlines: {
    error: "Une erreur s'est produite",
    loginEmail: "Se connecter ou créer un compte",
    loginEmailNoSignup: "Se connecter",
    loginFinished: "Connexion réussie",
    loginPasscode: "Entrez le code d'accès",
    loginPassword: "Entrez le mot de passe",
    registerAuthenticator: "Créer une clé d'accès",
    registerConfirm: "Créer un compte ?",
    registerPassword: "Définir un nouveau mot de passe",
    otpSetUp: "Configurer l'application d'authentification",
    profileEmails: "Adresses e-mail",
    profilePassword: "Mot de passe",
    profilePasskeys: "Clés d'accès",
    isPrimaryEmail: "Adresse e-mail principale",
    setPrimaryEmail: "Définir comme e-mail principal",
    createEmail: "Entrez un nouvel e-mail",
    createUsername: "Entrez un nouveau nom d'utilisateur",
    emailVerified: "Vérifié",
    emailUnverified: "Non vérifié",
    emailDelete: "Supprimer",
    renamePasskey: "Renommer la clé d'accès",
    deletePasskey: "Supprimer la clé d'accès",
    lastUsedAt: "Dernière utilisation",
    createdAt: "Créé",
    connectedAccounts: "Comptes connectés",
    deleteAccount: "Supprimer le compte",
    accountNotFound: "Compte introuvable",
    signIn: "Se connecter",
    signUp: "Créer un compte",
    selectLoginMethod: "Sélectionner la méthode de connexion",
    setupLoginMethod: "Configurer la méthode de connexion",
    lastUsed: "Vu pour la dernière fois",
    ipAddress: "Adresse IP",
    revokeSession: "Révoquer la session",
    profileSessions: "Sessions",
    mfaSetUp: "Configurer MFA",
    securityKeySetUp: "Ajouter une clé de sécurité",
    securityKeyLogin: "Clé de sécurité",
    otpLogin: "Code d'authentification",
    renameSecurityKey: "Renommer la clé de sécurité",
    deleteSecurityKey: "Supprimer la clé de sécurité",
    securityKeys: "Clés de sécurité",
    authenticatorApp: "Application d'authentification",
    authenticatorAppAlreadySetUp: "L'application d'authentification est configurée",
    authenticatorAppNotSetUp: "Configurer l'application d'authentification",
    trustDevice: "Faire confiance à ce navigateur ?"
  },
  texts: {
    enterPasscode: 'Entrez le code envoyé à "{emailAddress}".',
    enterPasscodeNoEmail: "Entrez le code envoyé à votre adresse e-mail principale.",
    setupPasskey: "Connectez-vous à votre compte facilement et en toute sécurité avec une clé d'accès. Remarque : Vos données biométriques ne sont stockées que sur vos appareils et ne seront jamais partagées avec personne.",
    createAccount: `Aucun compte n'existe pour "{emailAddress}". Souhaitez-vous créer un nouveau compte ?`,
    otpEnterVerificationCode: "Entrez le mot de passe à usage unique (OTP) obtenu depuis votre application d'authentification ci-dessous :",
    otpScanQRCode: "Scannez le code QR avec votre application d'authentification (comme Google Authenticator ou toute autre application TOTP). Vous pouvez également saisir manuellement la clé secrète OTP dans l'application.",
    otpSecretKey: "Clé secrète OTP",
    passwordFormatHint: "Doit contenir entre {minLength} et {maxLength} caractères.",
    securityKeySetUp: "Utilisez une clé de sécurité dédiée via USB, Bluetooth ou NFC, ou votre téléphone mobile. Connectez ou activez votre clé de sécurité, puis cliquez sur le bouton ci-dessous et suivez les instructions pour terminer l'inscription.",
    setPrimaryEmail: "Définir cette adresse e-mail pour être utilisée pour vous contacter.",
    isPrimaryEmail: "Cette adresse e-mail sera utilisée pour vous contacter si nécessaire.",
    emailVerified: "Cette adresse e-mail a été vérifiée.",
    emailUnverified: "Cette adresse e-mail n'a pas été vérifiée.",
    emailDelete: "Si vous supprimez cette adresse e-mail, vous ne pourrez plus l'utiliser pour vous connecter.",
    renamePasskey: "Définir un nom pour la clé d'accès.",
    deletePasskey: "Supprimer cette clé d'accès de votre compte.",
    deleteAccount: "Êtes-vous sûr de vouloir supprimer ce compte ? Toutes les données seront supprimées immédiatement et ne pourront pas être récupérées.",
    noAccountExists: `Aucun compte n'existe pour "{emailAddress}".`,
    selectLoginMethodForFutureLogins: "Sélectionnez l'une des méthodes de connexion suivantes à utiliser pour les futures connexions.",
    howDoYouWantToLogin: "Comment souhaitez-vous vous connecter ?",
    mfaSetUp: "Protégez votre compte avec l'authentification multifacteur (MFA). MFA ajoute une étape supplémentaire à votre processus de connexion, garantissant que même si votre mot de passe ou compte e-mail est compromis, votre compte reste sécurisé.",
    securityKeyLogin: "Connectez ou activez votre clé de sécurité, puis cliquez sur le bouton ci-dessous. Une fois prêt, utilisez-la via USB, NFC ou votre téléphone mobile. Suivez les instructions pour terminer le processus de connexion.",
    otpLogin: "Ouvrez votre application d'authentification pour obtenir le mot de passe à usage unique (OTP). Entrez le code dans le champ ci-dessous pour terminer votre connexion.",
    renameSecurityKey: "Définir un nom pour la clé de sécurité.",
    deleteSecurityKey: "Supprimer cette clé de sécurité de votre compte.",
    authenticatorAppAlreadySetUp: "Votre compte est protégé par une application d'authentification qui génère des mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification multifacteur.",
    authenticatorAppNotSetUp: "Protégez votre compte avec une application d'authentification qui génère des mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification multifacteur.",
    trustDevice: "Si vous faites confiance à ce navigateur, vous n'aurez pas besoin de saisir votre OTP (mot de passe à usage unique) ou d'utiliser votre clé de sécurité pour l'authentification multifacteur (MFA) la prochaine fois que vous vous connecterez."
  },
  labels: {
    or: "ou",
    no: "non",
    yes: "oui",
    email: "E-mail",
    continue: "Continuer",
    copied: "copié",
    skip: "Ignorer",
    save: "Enregistrer",
    password: "Mot de passe",
    passkey: "Clé d'accès",
    passcode: "Code d'accès",
    signInPassword: "Se connecter avec mot de passe",
    signInPasscode: "Se connecter avec code",
    forgotYourPassword: "Mot de passe oublié ?",
    back: "Retour",
    signInPasskey: "Se connecter avec clé d'accès",
    registerAuthenticator: "Créer une clé d'accès",
    signIn: "Se connecter",
    signUp: "Créer un compte",
    sendNewPasscode: "Envoyer un nouveau code",
    passwordRetryAfter: "Réessayer dans {passwordRetryAfter}",
    passcodeResendAfter: "Demander un nouveau code dans {passcodeResendAfter}",
    unverifiedEmail: "non vérifié",
    primaryEmail: "principal",
    setAsPrimaryEmail: "Définir comme principal",
    verify: "Vérifier",
    delete: "Supprimer",
    newEmailAddress: "Nouvelle adresse e-mail",
    newPassword: "Nouveau mot de passe",
    rename: "Renommer",
    newPasskeyName: "Nouveau nom de clé d'accès",
    addEmail: "Ajouter un e-mail",
    createPasskey: "Créer une clé d'accès",
    webauthnUnsupported: "Les clés d'accès ne sont pas compatibles avec votre navigateur",
    signInWith: "Se connecter avec {provider}",
    deleteAccount: "Oui, supprimer ce compte.",
    emailOrUsername: "E-mail ou nom d'utilisateur",
    username: "Nom d'utilisateur",
    optional: "optionnel",
    dontHaveAnAccount: "Vous n'avez pas de compte ?",
    alreadyHaveAnAccount: "Vous avez déjà un compte ?",
    changeUsername: "Changer le nom d'utilisateur",
    setUsername: "Définir le nom d'utilisateur",
    changePassword: "Changer le mot de passe",
    setPassword: "Définir le mot de passe",
    revoke: "Révoquer",
    currentSession: "Session actuelle",
    authenticatorApp: "Application d'authentification",
    securityKey: "Clé de sécurité",
    securityKeyUse: "Utiliser la clé de sécurité",
    newSecurityKeyName: "Nouveau nom de clé de sécurité",
    createSecurityKey: "Ajouter une clé de sécurité",
    authenticatorAppManage: "Gérer l'application d'authentification",
    authenticatorAppAdd: "Configurer",
    configured: "configuré",
    useAnotherMethod: "Utiliser une autre méthode",
    lastUsed: "Dernière utilisation",
    trustDevice: "Faire confiance à ce navigateur",
    staySignedIn: "Rester connecté"
  },
  errors: {
    somethingWentWrong: "Une erreur technique s'est produite. Veuillez réessayer plus tard.",
    requestTimeout: "La demande a expiré.",
    invalidPassword: "E-mail ou mot de passe incorrect.",
    invalidPasscode: "Le code fourni n'est pas correct.",
    passcodeAttemptsReached: "Le code a été saisi incorrectement trop de fois. Veuillez demander un nouveau code.",
    tooManyRequests: "Trop de demandes ont été effectuées. Veuillez attendre avant de répéter l'opération demandée.",
    unauthorized: "Votre session a expiré. Veuillez vous reconnecter.",
    invalidWebauthnCredential: "Cette clé d'accès ne peut plus être utilisée.",
    passcodeExpired: "Le code a expiré. Veuillez en demander un nouveau.",
    userVerification: "Une vérification de l'utilisateur est requise. Assurez-vous que votre dispositif d'authentification est protégé par un code PIN ou une biométrie.",
    emailAddressAlreadyExistsError: "L'adresse e-mail existe déjà.",
    maxNumOfEmailAddressesReached: "Impossible d'ajouter plus d'adresses e-mail.",
    thirdPartyAccessDenied: "Accès refusé. La demande a été annulée par l'utilisateur ou le fournisseur a refusé l'accès pour d'autres raisons.",
    thirdPartyMultipleAccounts: "Impossible d'identifier le compte. L'adresse e-mail est utilisée par plusieurs comptes.",
    thirdPartyUnverifiedEmail: "Une vérification de l'e-mail est requise. Veuillez vérifier l'adresse e-mail utilisée avec votre fournisseur.",
    signupDisabled: "L'inscription de comptes est désactivée.",
    handlerNotFoundError: "L'étape actuelle de votre processus n'est pas compatible avec cette version de l'application. Réessayez plus tard ou contactez le support si le problème persiste."
  },
  flowErrors: {
    technical_error: "Une erreur technique s'est produite. Veuillez réessayer plus tard.",
    flow_expired_error: "La session a expiré, cliquez sur le bouton pour redémarrer.",
    value_invalid_error: "La valeur saisie n'est pas valide.",
    passcode_invalid: "Le code fourni n'est pas correct.",
    passkey_invalid: "Cette clé d'accès ne peut plus être utilisée.",
    passcode_max_attempts_reached: "Le code a été saisi incorrectement trop de fois. Veuillez demander un nouveau code.",
    rate_limit_exceeded: "Trop de demandes ont été effectuées. Veuillez attendre avant de répéter l'opération demandée.",
    unknown_username_error: "Le nom d'utilisateur est inconnu.",
    unknown_email_error: "L'adresse e-mail est inconnue.",
    username_already_exists: "Le nom d'utilisateur est déjà utilisé.",
    invalid_username_error: "Le nom d'utilisateur ne doit contenir que des lettres, des chiffres et des traits de soulignement.",
    email_already_exists: "L'e-mail est déjà utilisé.",
    not_found: "La ressource demandée n'a pas été trouvée.",
    operation_not_permitted_error: "L'opération n'est pas autorisée.",
    flow_discontinuity_error: "Le processus ne peut pas continuer en raison de la configuration de l'utilisateur ou du fournisseur.",
    form_data_invalid_error: "Les données du formulaire soumises contiennent des erreurs.",
    unauthorized: "Votre session a expiré. Veuillez vous reconnecter.",
    value_missing_error: "La valeur est manquante.",
    value_too_long_error: "La valeur est trop longue.",
    value_too_short_error: "La valeur est trop courte.",
    webauthn_credential_invalid_mfa_only: "Cette credential ne peut être utilisée que comme clé de sécurité de second facteur.",
    webauthn_credential_already_exists: "La demande a expiré, a été annulée ou l'appareil est déjà enregistré. Réessayez ou essayez d'utiliser un autre appareil.",
    platform_authenticator_required: "Votre compte est configuré pour utiliser des authentificateurs de plateforme, mais votre appareil ou navigateur actuel ne prend pas en charge cette fonctionnalité. Réessayez avec un appareil ou navigateur compatible.",
    third_party_access_denied: "Accès refusé par le fournisseur tiers. Veuillez réessayer."
  }
}, ys = {
  headlines: {
    error: "Ocorreu um erro",
    loginEmail: "Entrar ou criar conta",
    loginEmailNoSignup: "Entrar",
    loginFinished: "Login bem-sucedido",
    loginPasscode: "Digite o código de acesso",
    loginPassword: "Digite a senha",
    registerAuthenticator: "Criar uma chave de acesso",
    registerConfirm: "Criar conta?",
    registerPassword: "Definir nova senha",
    otpSetUp: "Configurar aplicativo de autenticação",
    profileEmails: "Endereços de e-mail",
    profilePassword: "Senha",
    profilePasskeys: "Chaves de acesso",
    isPrimaryEmail: "Endereço de e-mail principal",
    setPrimaryEmail: "Definir e-mail principal",
    createEmail: "Digite um novo e-mail",
    createUsername: "Digite um novo nome de usuário",
    emailVerified: "Verificado",
    emailUnverified: "Não verificado",
    emailDelete: "Excluir",
    renamePasskey: "Renomear chave de acesso",
    deletePasskey: "Excluir chave de acesso",
    lastUsedAt: "Último uso",
    createdAt: "Criado",
    connectedAccounts: "Contas conectadas",
    deleteAccount: "Excluir conta",
    accountNotFound: "Conta não encontrada",
    signIn: "Entrar",
    signUp: "Criar conta",
    selectLoginMethod: "Selecionar método de login",
    setupLoginMethod: "Configurar método de login",
    lastUsed: "Visto pela última vez",
    ipAddress: "Endereço IP",
    revokeSession: "Revogar sessão",
    profileSessions: "Sessões",
    mfaSetUp: "Configurar MFA",
    securityKeySetUp: "Adicionar chave de segurança",
    securityKeyLogin: "Chave de segurança",
    otpLogin: "Código de autenticação",
    renameSecurityKey: "Renomear chave de segurança",
    deleteSecurityKey: "Excluir chave de segurança",
    securityKeys: "Chaves de segurança",
    authenticatorApp: "Aplicativo de autenticação",
    authenticatorAppAlreadySetUp: "O aplicativo de autenticação está configurado",
    authenticatorAppNotSetUp: "Configurar aplicativo de autenticação",
    trustDevice: "Confiar neste navegador?"
  },
  texts: {
    enterPasscode: 'Digite o código enviado para "{emailAddress}".',
    enterPasscodeNoEmail: "Digite o código enviado para seu endereço de e-mail principal.",
    setupPasskey: "Faça login na sua conta de forma fácil e segura com uma chave de acesso. Nota: Seus dados biométricos são armazenados apenas em seus dispositivos e nunca serão compartilhados com ninguém.",
    createAccount: 'Não existe uma conta para "{emailAddress}". Deseja criar uma nova conta?',
    otpEnterVerificationCode: "Digite a senha de uso único (OTP) obtida do seu aplicativo de autenticação abaixo:",
    otpScanQRCode: "Digitalize o código QR usando seu aplicativo de autenticação (como Google Authenticator ou qualquer outro aplicativo TOTP). Alternativamente, você pode inserir manualmente a chave secreta OTP no aplicativo.",
    otpSecretKey: "Chave secreta OTP",
    passwordFormatHint: "Deve ter entre {minLength} e {maxLength} caracteres.",
    securityKeySetUp: "Use uma chave de segurança dedicada via USB, Bluetooth ou NFC, ou seu telefone celular. Conecte ou ative sua chave de segurança, depois clique no botão abaixo e siga as instruções para concluir o registro.",
    setPrimaryEmail: "Defina este endereço de e-mail para ser usado para entrar em contato com você.",
    isPrimaryEmail: "Este endereço de e-mail será usado para entrar em contato com você, se necessário.",
    emailVerified: "Este endereço de e-mail foi verificado.",
    emailUnverified: "Este endereço de e-mail não foi verificado.",
    emailDelete: "Se você excluir este endereço de e-mail, não poderá mais usá-lo para fazer login.",
    renamePasskey: "Definir um nome para a chave de acesso.",
    deletePasskey: "Excluir esta chave de acesso da sua conta.",
    deleteAccount: "Tem certeza de que deseja excluir esta conta? Todos os dados serão excluídos imediatamente e não poderão ser recuperados.",
    noAccountExists: 'Não existe uma conta para "{emailAddress}".',
    selectLoginMethodForFutureLogins: "Selecione um dos seguintes métodos de login para usar em futuros logins.",
    howDoYouWantToLogin: "Como você deseja fazer login?",
    mfaSetUp: "Proteja sua conta com autenticação multifator (MFA). MFA adiciona uma etapa extra ao seu processo de login, garantindo que, mesmo se sua senha ou conta de e-mail for comprometida, sua conta permaneça segura.",
    securityKeyLogin: "Conecte ou ative sua chave de segurança, depois clique no botão abaixo. Uma vez pronto, use-a via USB, NFC ou seu telefone celular. Siga as instruções para concluir o processo de login.",
    otpLogin: "Abra seu aplicativo de autenticação para obter a senha de uso único (OTP). Digite o código no campo abaixo para concluir seu login.",
    renameSecurityKey: "Definir um nome para a chave de segurança.",
    deleteSecurityKey: "Excluir esta chave de segurança da sua conta.",
    authenticatorAppAlreadySetUp: "Sua conta está protegida com um aplicativo de autenticação que gera senhas de uso único baseadas em tempo (TOTP) para autenticação multifator.",
    authenticatorAppNotSetUp: "Proteja sua conta com um aplicativo de autenticação que gera senhas de uso único baseadas em tempo (TOTP) para autenticação multifator.",
    trustDevice: "Se você confiar neste navegador, não precisará inserir seu OTP (senha de uso único) ou usar sua chave de segurança para autenticação multifator (MFA) na próxima vez que fizer login."
  },
  labels: {
    or: "ou",
    no: "não",
    yes: "sim",
    email: "E-mail",
    continue: "Continuar",
    copied: "copiado",
    skip: "Pular",
    save: "Salvar",
    password: "Senha",
    passkey: "Chave de acesso",
    passcode: "Código de acesso",
    signInPassword: "Entrar com senha",
    signInPasscode: "Entrar com código",
    forgotYourPassword: "Esqueceu sua senha?",
    back: "Voltar",
    signInPasskey: "Entrar com chave de acesso",
    registerAuthenticator: "Criar uma chave de acesso",
    signIn: "Entrar",
    signUp: "Criar conta",
    sendNewPasscode: "Enviar novo código",
    passwordRetryAfter: "Tentar novamente em {passwordRetryAfter}",
    passcodeResendAfter: "Solicitar novo código em {passcodeResendAfter}",
    unverifiedEmail: "não verificado",
    primaryEmail: "principal",
    setAsPrimaryEmail: "Definir como principal",
    verify: "Verificar",
    delete: "Excluir",
    newEmailAddress: "Novo endereço de e-mail",
    newPassword: "Nova senha",
    rename: "Renomear",
    newPasskeyName: "Novo nome de chave de acesso",
    addEmail: "Adicionar e-mail",
    createPasskey: "Criar uma chave de acesso",
    webauthnUnsupported: "As chaves de acesso não são compatíveis com seu navegador",
    signInWith: "Entrar com {provider}",
    deleteAccount: "Sim, excluir esta conta.",
    emailOrUsername: "E-mail ou nome de usuário",
    username: "Nome de usuário",
    optional: "opcional",
    dontHaveAnAccount: "Não tem uma conta?",
    alreadyHaveAnAccount: "Já tem uma conta?",
    changeUsername: "Alterar nome de usuário",
    setUsername: "Definir nome de usuário",
    changePassword: "Alterar senha",
    setPassword: "Definir senha",
    revoke: "Revogar",
    currentSession: "Sessão atual",
    authenticatorApp: "Aplicativo de autenticação",
    securityKey: "Chave de segurança",
    securityKeyUse: "Usar chave de segurança",
    newSecurityKeyName: "Novo nome de chave de segurança",
    createSecurityKey: "Adicionar uma chave de segurança",
    authenticatorAppManage: "Gerenciar aplicativo de autenticação",
    authenticatorAppAdd: "Configurar",
    configured: "configurado",
    useAnotherMethod: "Usar outro método",
    lastUsed: "Último uso",
    trustDevice: "Confiar neste navegador",
    staySignedIn: "Permanecer conectado"
  },
  errors: {
    somethingWentWrong: "Ocorreu um erro técnico. Por favor, tente novamente mais tarde.",
    requestTimeout: "A solicitação expirou.",
    invalidPassword: "E-mail ou senha incorretos.",
    invalidPasscode: "O código fornecido não está correto.",
    passcodeAttemptsReached: "O código foi inserido incorretamente muitas vezes. Por favor, solicite um novo código.",
    tooManyRequests: "Muitas solicitações foram feitas. Por favor, aguarde antes de repetir a operação solicitada.",
    unauthorized: "Sua sessão expirou. Por favor, faça login novamente.",
    invalidWebauthnCredential: "Esta chave de acesso não pode mais ser usada.",
    passcodeExpired: "O código expirou. Por favor, solicite um novo.",
    userVerification: "É necessária verificação do usuário. Certifique-se de que seu dispositivo de autenticação esteja protegido com um PIN ou biometria.",
    emailAddressAlreadyExistsError: "O endereço de e-mail já existe.",
    maxNumOfEmailAddressesReached: "Não é possível adicionar mais endereços de e-mail.",
    thirdPartyAccessDenied: "Acesso negado. A solicitação foi cancelada pelo usuário ou o provedor negou o acesso por outros motivos.",
    thirdPartyMultipleAccounts: "Não é possível identificar a conta. O endereço de e-mail é usado por várias contas.",
    thirdPartyUnverifiedEmail: "É necessária verificação de e-mail. Por favor, verifique o endereço de e-mail usado com seu provedor.",
    signupDisabled: "O registro de contas está desativado.",
    handlerNotFoundError: "A etapa atual em seu processo não é compatível com esta versão do aplicativo. Tente novamente mais tarde ou entre em contato com o suporte se o problema persistir."
  },
  flowErrors: {
    technical_error: "Ocorreu um erro técnico. Por favor, tente novamente mais tarde.",
    flow_expired_error: "A sessão expirou, clique no botão para reiniciar.",
    value_invalid_error: "O valor inserido não é válido.",
    passcode_invalid: "O código fornecido não está correto.",
    passkey_invalid: "Esta chave de acesso não pode mais ser usada.",
    passcode_max_attempts_reached: "O código foi inserido incorretamente muitas vezes. Por favor, solicite um novo código.",
    rate_limit_exceeded: "Muitas solicitações foram feitas. Por favor, aguarde antes de repetir a operação solicitada.",
    unknown_username_error: "O nome de usuário é desconhecido.",
    unknown_email_error: "O endereço de e-mail é desconhecido.",
    username_already_exists: "O nome de usuário já está em uso.",
    invalid_username_error: "O nome de usuário deve conter apenas letras, números e sublinhados.",
    email_already_exists: "O e-mail já está em uso.",
    not_found: "O recurso solicitado não foi encontrado.",
    operation_not_permitted_error: "A operação não é permitida.",
    flow_discontinuity_error: "O processo não pode continuar devido à configuração do usuário ou do provedor.",
    form_data_invalid_error: "Os dados do formulário enviados contêm erros.",
    unauthorized: "Sua sessão expirou. Por favor, faça login novamente.",
    value_missing_error: "O valor está faltando.",
    value_too_long_error: "O valor é muito longo.",
    value_too_short_error: "O valor é muito curto.",
    webauthn_credential_invalid_mfa_only: "Esta credencial só pode ser usada como chave de segurança de segundo fator.",
    webauthn_credential_already_exists: "A solicitação expirou, foi cancelada ou o dispositivo já está registrado. Tente novamente ou tente usar outro dispositivo.",
    platform_authenticator_required: "Sua conta está configurada para usar autenticadores de plataforma, mas seu dispositivo ou navegador atual não suporta esse recurso. Tente novamente com um dispositivo ou navegador compatível.",
    third_party_access_denied: "Acesso negado pelo provedor de terceiros. Por favor, tente novamente."
  }
}, Vn = {
  en: {
    logIn: "Log in",
    logOut: "Log Out",
    myHotAccount: "My HOT Account",
    connectToOsm: "Connect to OSM",
    connectedToOsm: "Connected to OSM",
    connectedToOpenStreetMap: "Connected to OpenStreetMap",
    connectingToOpenStreetMap: "Connecting to OpenStreetMap...",
    checkingOsmConnection: "Checking OSM connection...",
    osmRequired: "OSM Required",
    osmRequiredText: "This endpoint requires OSM connection.",
    connectOsmAccount: "Connect OSM Account",
    openAccountMenu: "Open account menu",
    connectedToOsmAs: "Connected to OSM as",
    osmConnectionRequired: "OSM connection required"
  },
  es: {
    logIn: "Iniciar sesión",
    logOut: "Cerrar sesión",
    myHotAccount: "Mi cuenta HOT",
    connectToOsm: "Conectar a OSM",
    connectedToOsm: "Conectado a OSM",
    connectedToOpenStreetMap: "Conectado a OpenStreetMap",
    connectingToOpenStreetMap: "Conectando a OpenStreetMap...",
    checkingOsmConnection: "Verificando conexión OSM...",
    osmRequired: "OSM Requerido",
    osmRequiredText: "Este endpoint requiere conexión OSM.",
    connectOsmAccount: "Conectar cuenta OSM",
    openAccountMenu: "Abrir menú de cuenta",
    connectedToOsmAs: "Conectado a OSM como",
    osmConnectionRequired: "Se requiere conexión OSM"
  },
  fr: {
    logIn: "Se connecter",
    logOut: "Se déconnecter",
    myHotAccount: "Mon compte HOT",
    connectToOsm: "Connecter à OSM",
    connectedToOsm: "Connecté à OSM",
    connectedToOpenStreetMap: "Connecté à OpenStreetMap",
    connectingToOpenStreetMap: "Connexion à OpenStreetMap...",
    checkingOsmConnection: "Vérification de la connexion OSM...",
    osmRequired: "OSM requis",
    osmRequiredText: "Ce point de terminaison nécessite une connexion OSM.",
    connectOsmAccount: "Connecter le compte OSM",
    openAccountMenu: "Ouvrir le menu du compte",
    connectedToOsmAs: "Connecté à OSM en tant que",
    osmConnectionRequired: "Connexion OSM requise"
  },
  pt: {
    logIn: "Entrar",
    logOut: "Sair",
    myHotAccount: "Minha conta HOT",
    connectToOsm: "Conectar ao OSM",
    connectedToOsm: "Conectado ao OSM",
    connectedToOpenStreetMap: "Conectado ao OpenStreetMap",
    connectingToOpenStreetMap: "Conectando ao OpenStreetMap...",
    checkingOsmConnection: "Verificando conexão OSM...",
    osmRequired: "OSM Necessário",
    osmRequiredText: "Este endpoint requer conexão OSM.",
    connectOsmAccount: "Conectar conta OSM",
    openAccountMenu: "Abrir menu da conta",
    connectedToOsmAs: "Conectado ao OSM como",
    osmConnectionRequired: "Conexão OSM necessária"
  }
}, oi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-person-vcard'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M5%208a2%202%200%201%200%200-4%202%202%200%200%200%200%204m4-2.5a.5.5%200%200%201%20.5-.5h4a.5.5%200%200%201%200%201h-4a.5.5%200%200%201-.5-.5M9%208a.5.5%200%200%201%20.5-.5h4a.5.5%200%200%201%200%201h-4A.5.5%200%200%201%209%208m1%202.5a.5.5%200%200%201%20.5-.5h3a.5.5%200%200%201%200%201h-3a.5.5%200%200%201-.5-.5'/%3e%3cpath%20d='M2%202a2%202%200%200%200-2%202v8a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V4a2%202%200%200%200-2-2zM1%204a1%201%200%200%201%201-1h12a1%201%200%200%201%201%201v8a1%201%200%200%201-1%201H8.96q.04-.245.04-.5C9%2010.567%207.21%209%205%209c-2.086%200-3.8%201.398-3.984%203.181A1%201%200%200%201%201%2012z'/%3e%3c/svg%3e", ii = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-box-arrow-right'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill-rule='evenodd'%20d='M10%2012.5a.5.5%200%200%201-.5.5h-8a.5.5%200%200%201-.5-.5v-9a.5.5%200%200%201%20.5-.5h8a.5.5%200%200%201%20.5.5v2a.5.5%200%200%200%201%200v-2A1.5%201.5%200%200%200%209.5%202h-8A1.5%201.5%200%200%200%200%203.5v9A1.5%201.5%200%200%200%201.5%2014h8a1.5%201.5%200%200%200%201.5-1.5v-2a.5.5%200%200%200-1%200z'/%3e%3cpath%20fill-rule='evenodd'%20d='M15.854%208.354a.5.5%200%200%200%200-.708l-3-3a.5.5%200%200%200-.708.708L14.293%207.5H5.5a.5.5%200%200%200%200%201h8.793l-2.147%202.146a.5.5%200%200%200%20.708.708z'/%3e%3c/svg%3e", ai = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-map'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill-rule='evenodd'%20d='M15.817.113A.5.5%200%200%201%2016%20.5v14a.5.5%200%200%201-.402.49l-5%201a.5.5%200%200%201-.196%200L5.5%2015.01l-4.902.98A.5.5%200%200%201%200%2015.5v-14a.5.5%200%200%201%20.402-.49l5-1a.5.5%200%200%201%20.196%200L10.5.99l4.902-.98a.5.5%200%200%201%20.415.103M10%201.91l-4-.8v12.98l4%20.8zm1%2012.98%204-.8V1.11l-4%20.8zm-6-.8V1.11l-4%20.8v12.98z'/%3e%3c/svg%3e", ri = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-person-check'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M12.5%2016a3.5%203.5%200%201%200%200-7%203.5%203.5%200%200%200%200%207m1.679-4.493-1.335%202.226a.75.75%200%200%201-1.174.144l-.774-.773a.5.5%200%200%201%20.708-.708l.547.548%201.17-1.951a.5.5%200%201%201%20.858.514M11%205a3%203%200%201%201-6%200%203%203%200%200%201%206%200M8%207a2%202%200%201%200%200-4%202%202%200%200%200%200%204'/%3e%3cpath%20d='M8.256%2014a4.5%204.5%200%200%201-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484%2010.68%205.711%2010%208%2010q.39%200%20.74.025c.226-.341.496-.65.804-.918Q8.844%209.002%208%209c-5%200-6%203-6%204s1%201%201%201z'/%3e%3c/svg%3e", bs = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-chevron-down'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill-rule='evenodd'%20d='M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708'/%3e%3c/svg%3e", ks = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-chevron-up'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill-rule='evenodd'%20d='M7.646%204.646a.5.5%200%200%201%20.708%200l6%206a.5.5%200%200%201-.708.708L8%205.707l-5.646%205.647a.5.5%200%200%201-.708-.708z'/%3e%3c/svg%3e";
var ws = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, de = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Ss(e, t) : e, a = n.length - 1, s; a >= 0; a--)
    (s = n[a]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && ws(e, t, i), i;
};
let si = !1, $t = null;
async function xs(n) {
  if (!si)
    return $t || ($t = (async () => {
      console.log("[hanko-auth] Pre-registering Hanko translations...");
      try {
        await Hi(n, {
          enablePasskeys: !1,
          hidePasskeyButtonOnLogin: !0,
          translations: { en: fs, es: vs, fr: _s, pt: ys },
          fallbackLanguage: "en"
        }), si = !0, console.log("[hanko-auth] Hanko registration complete");
      } catch (e) {
        throw console.error("[hanko-auth] Hanko registration failed:", e), $t = null, e;
      }
    })(), $t);
}
const te = {
  primary: null,
  // The primary instance that makes API calls
  user: null,
  osmConnected: !1,
  osmData: null,
  loading: !0,
  hanko: null,
  initialized: !1,
  instances: /* @__PURE__ */ new Set(),
  profileDisplayName: "",
  // Shared profile display name
  hankoReady: !1
  // used for translations
}, li = (n) => `hanko-verified-${n}`, ci = (n) => `hanko-onboarding-${n}`;
let re = class extends Mt {
  constructor() {
    super(...arguments), this.hankoUrlAttr = "", this.basePath = "", this.authPath = "/api/auth/osm", this.osmRequired = !1, this.osmScopes = "read_prefs", this.showProfile = !1, this.redirectAfterLogin = "", this.autoConnect = !1, this.verifySession = !1, this.redirectAfterLogout = "", this.displayNameAttr = "", this.mappingCheckUrl = "", this.appId = "", this.loginUrl = "", this.lang = "en", this.buttonVariant = "plain", this.buttonColor = "primary", this.display = "default", this.user = null, this.osmConnected = !1, this.osmData = null, this.osmLoading = !1, this.loading = !0, this.error = null, this.hankoReady = !1, this.profileDisplayName = "", this.hasAppMapping = !1, this.userProfileLanguage = null, this.isOpen = !1, this.handleOutsideClick = (n) => {
      this.contains(n.target) || this.closeDropdown();
    }, this._trailingSlashCache = {}, this._debugMode = !1, this._lastSessionId = null, this._hanko = null, this._isPrimary = !1, this._handleVisibilityChange = () => {
      this._isPrimary && !document.hidden && !this.showProfile && !this.user && (this.log(" Page visible, re-checking session..."), this.checkSession());
    }, this._handleWindowFocus = () => {
      this._isPrimary && !this.showProfile && !this.user && (this.log(" Window focused, re-checking session..."), this.checkSession());
    }, this._handleExternalLogin = (n) => {
      var t;
      if (!this._isPrimary) return;
      const e = n;
      !this.showProfile && !this.user && ((t = e.detail) != null && t.user) && (this.log(" External login detected, updating user state..."), this.user = e.detail.user, this._broadcastState(), this.osmRequired && this.checkOSMConnection());
    }, this._currentHankoAuthElement = null;
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen, this.isOpen ? setTimeout(() => {
      document.addEventListener("click", this.handleOutsideClick);
    }, 0) : document.removeEventListener("click", this.handleOutsideClick);
  }
  closeDropdown() {
    this.isOpen = !1, document.removeEventListener("click", this.handleOutsideClick);
  }
  /** Dropdown menu content for bar display mode (no email, only action links) */
  renderBarDropdownContent() {
    var n;
    return xe`
      <div class="dropdown-content ${this.isOpen ? "open" : ""}">
        <button data-action="profile" @click=${this.handleDropdownSelect}>
          <img src="${oi}" class="icon" alt="Account icon" />
          ${this.t("myHotAccount")}
        </button>
        ${this.osmRequired ? this.osmConnected ? xe`
                <button class="osm-connected" disabled>
                  <img src="${ri}" alt="Check icon" class="icon" />
                  ${this.t("connectedToOsm")} (@${(n = this.osmData) == null ? void 0 : n.osm_username})
                </button>
              ` : xe`
                <button
                  data-action="connect-osm"
                  @click=${this.handleDropdownSelect}
                >
                  <img src="${ai}" alt="Check icon" class="icon" />
                  ${this.t("connectToOsm")}
                </button>
              ` : ""}
        <button data-action="logout" @click=${this.handleDropdownSelect}>
          <img src="${ii}" alt="Log out icon" class="icon" />
          ${this.t("logOut")}
        </button>
      </div>
    `;
  }
  // Is this the primary instance?
  // Get computed hankoUrl (priority: attribute > meta tag > window.HANKO_URL > origin)
  get hankoUrl() {
    if (this.hankoUrlAttr)
      return this.hankoUrlAttr;
    const n = document.querySelector('meta[name="hanko-url"]');
    if (n) {
      const t = n.getAttribute("content");
      if (t)
        return this.log(" hanko-url auto-detected from <meta> tag:", t), t;
    }
    if (window.HANKO_URL)
      return this.log(
        " hanko-url auto-detected from window.HANKO_URL:",
        window.HANKO_URL
      ), window.HANKO_URL;
    const e = window.location.origin;
    return this.log(" hanko-url auto-detected from window.location.origin:", e), e;
  }
  connectedCallback() {
    super.connectedCallback(), this._debugMode = this._checkDebugMode(), this.log(" hanko-auth connectedCallback called"), this.injectHotStyles(), te.instances.add(this), document.addEventListener("visibilitychange", this._handleVisibilityChange), window.addEventListener("focus", this._handleWindowFocus), document.addEventListener("hanko-login", this._handleExternalLogin);
  }
  // Use firstUpdated instead of connectedCallback to ensure React props are set
  firstUpdated() {
    this.log(" hanko-auth firstUpdated called"), this.log("  hankoUrl:", this.hankoUrl), this.log("  basePath:", this.basePath), te.initialized || te.primary ? (this.log(" Using shared state from primary instance"), this._syncFromShared(), this._isPrimary = !1) : (this.log(" This is the primary instance"), this._isPrimary = !0, te.primary = this, te.initialized = !0, this.init());
  }
  disconnectedCallback() {
    if (super.disconnectedCallback(), document.removeEventListener(
      "visibilitychange",
      this._handleVisibilityChange
    ), window.removeEventListener("focus", this._handleWindowFocus), document.removeEventListener("hanko-login", this._handleExternalLogin), document.removeEventListener("click", this.handleOutsideClick), te.instances.delete(this), this._isPrimary && te.instances.size > 0) {
      const n = te.instances.values().next().value;
      n && (this.log(" Promoting new primary instance"), n._isPrimary = !0, te.primary = n);
    }
    te.instances.size === 0 && (te.initialized = !1, te.primary = null);
  }
  // Sync local state from shared state (only if values changed to prevent render loops)
  _syncFromShared() {
    this.user !== te.user && (this.user = te.user), this.osmConnected !== te.osmConnected && (this.osmConnected = te.osmConnected), this.osmData !== te.osmData && (this.osmData = te.osmData), this.loading !== te.loading && (this.loading = te.loading), this._hanko !== te.hanko && (this._hanko = te.hanko), this.profileDisplayName !== te.profileDisplayName && (this.profileDisplayName = te.profileDisplayName), this.hankoReady !== te.hankoReady && (this.hankoReady = te.hankoReady);
  }
  // Update shared state and broadcast to all instances
  _broadcastState() {
    te.user = this.user, te.osmConnected = this.osmConnected, te.osmData = this.osmData, te.loading = this.loading, te.profileDisplayName = this.profileDisplayName, te.hankoReady = this.hankoReady, te.instances.forEach((n) => {
      n !== this && n._syncFromShared();
    });
  }
  _checkDebugMode() {
    if (new URLSearchParams(window.location.search).get("debug") === "true")
      return !0;
    try {
      return localStorage.getItem("hanko-auth-debug") === "true";
    } catch {
      return !1;
    }
  }
  log(...n) {
    this._debugMode && console.log(...n);
  }
  /**
   * Get translated string for the current language
   * Falls back to English if translation not found
   * When user is logged in, uses their profile language instead of the lang prop
   */
  t(n) {
    const e = this.user && this.userProfileLanguage ? this.userProfileLanguage : this.lang;
    return (Vn[e] || Vn.en)[n] || Vn.en[n] || n;
  }
  warn(...n) {
    console.warn(...n);
  }
  logError(...n) {
    console.error(...n);
  }
  getBasePath() {
    return this.basePath ? (this.log(" getBasePath() using basePath:", this.basePath), this.basePath) : (this.log(" getBasePath() using default: empty string"), "");
  }
  addTrailingSlash(n, e) {
    const t = this._trailingSlashCache[e];
    return t !== void 0 && t && !n.endsWith("/") ? n + "/" : n;
  }
  // styles injected to ensure global availability
  injectHotStyles() {
    [
      {
        id: "hot-design-system",
        href: "https://cdn.jsdelivr.net/npm/@hotosm/ui-design@latest/dist/hot.css"
      },
      {
        id: "google-font-archivo",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap"
      }
    ].forEach(({ id: e, href: t }) => {
      if (!document.getElementById(e)) {
        const o = document.createElement("link");
        o.rel = "stylesheet", o.href = t, o.id = e, document.head.appendChild(o);
      }
    });
  }
  async init() {
    if (!this._isPrimary) {
      this.log(" Not primary, skipping init...");
      return;
    }
    try {
      this.log(
        "Ensuring Hanko is registered with translations for: en, es, fr, pt"
      ), this.log("Current lang prop:", this.lang), await xs(this.hankoUrl), this.hankoReady = !0, this._broadcastState();
      const { Hanko: n } = await Promise.resolve().then(() => ps), e = window.location.hostname, t = e === "localhost" || e === "127.0.0.1", o = e.split("."), i = o.length >= 2 ? `.${o.slice(-2).join(".")}` : e, a = t ? {} : {
        cookieDomain: i,
        cookieName: "hanko",
        cookieSameSite: "lax"
      };
      this._hanko = new n(this.hankoUrl, a), te.hanko = this._hanko, this._hanko.onSessionExpired(() => {
        this.log(" Hanko session expired event received"), this.handleSessionExpired();
      }), this._hanko.onUserLoggedOut(() => {
        this.log(" Hanko user logged out event received"), this.handleUserLoggedOut();
      }), await this.checkSession(), this.user && (this.osmRequired && await this.checkOSMConnection(), await this.fetchProfileDisplayName()), await new Promise((s) => setTimeout(s, 3e3)), this.loading = !1, this._broadcastState(), this.setupEventListeners();
    } catch (n) {
      this.logError("Failed to initialize hanko-auth:", n), this.error = n.message, this.loading = !1, this._broadcastState();
    }
  }
  async checkSession() {
    if (this.log(" Checking for existing Hanko session..."), !this._hanko) {
      this.log(" Hanko instance not initialized yet");
      return;
    }
    try {
      this.log(" Checking session validity via cookie...");
      try {
        const n = await fetch(
          `${this.hankoUrl}/sessions/validate`,
          {
            method: "GET",
            credentials: "include",
            // Include httpOnly cookies
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (n.ok) {
          const e = await n.json();
          if (e.is_valid === !1) {
            this.log(
              " Session validation returned is_valid:false - no valid session"
            );
            return;
          }
          this.log(" Valid Hanko session found via cookie"), this.log(" Session data:", e);
          try {
            const t = await fetch(`${this.hankoUrl}/me`, {
              method: "GET",
              credentials: "include",
              // Include httpOnly cookies
              headers: {
                "Content-Type": "application/json"
              }
            });
            let o = !0;
            if (t.ok) {
              const i = await t.json();
              this.log(" User data retrieved from /me:", i), i.email ? (this.user = {
                id: i.user_id || i.id,
                email: i.email,
                username: i.username || null,
                emailVerified: i.email_verified || i.verified || !1
              }, o = !1) : this.log(" /me has no email, will use SDK fallback");
            }
            if (o) {
              this.log(" Using SDK to get user with email");
              const i = await this._hanko.user.getCurrent();
              this.user = {
                id: i.id,
                email: i.email,
                username: i.username,
                emailVerified: i.email_verified || !1
              };
            }
          } catch (t) {
            this.log(" Failed to get user data:", t), e.user_id && (this.user = {
              id: e.user_id,
              email: e.email || null,
              username: null,
              emailVerified: !1
            });
          }
          if (this.user) {
            const t = li(window.location.hostname), o = sessionStorage.getItem(t);
            if (this.verifySession && this.redirectAfterLogin && !o) {
              this.log(
                " verify-session enabled, redirecting to callback for app verification..."
              ), sessionStorage.setItem(t, "true"), window.location.href = this.redirectAfterLogin;
              return;
            }
            if (!await this.checkAppMapping())
              return;
            this.dispatchEvent(
              new CustomEvent("hanko-login", {
                detail: { user: this.user },
                bubbles: !0,
                composed: !0
              })
            ), this.dispatchEvent(
              new CustomEvent("auth-complete", {
                bubbles: !0,
                composed: !0
              })
            ), this.osmRequired && await this.checkOSMConnection(), await this.fetchProfileDisplayName(), this.osmRequired && this.autoConnect && !this.osmConnected && (this.log(" Auto-connecting to OSM (from existing session)..."), this.handleOSMConnect());
          }
        } else
          this.log(" No valid session cookie found - user needs to login");
      } catch (n) {
        this.log(" Session validation failed:", n), this.log(" No valid session - user needs to login");
      }
    } catch (n) {
      this.log(" Session check error:", n), this.log(" No existing session - user needs to login");
    } finally {
      this._isPrimary && this._broadcastState();
    }
  }
  async checkOSMConnection() {
    if (!this.osmRequired) {
      this.log(" OSM not required, skipping connection check");
      return;
    }
    if (this.osmConnected) {
      this.log(" Already connected to OSM, skipping check");
      return;
    }
    const n = this.loading;
    n || (this.osmLoading = !0);
    try {
      const e = this.getBasePath(), t = this.authPath, i = `${`${e}${t}/status`}`;
      this.log(" Checking OSM connection at:", i), this.log("  basePath:", e), this.log("  authPath:", t), this.log(" Current cookies:", document.cookie);
      const a = await fetch(i, {
        credentials: "include",
        redirect: "follow"
      });
      if (this.log(" OSM status response:", a.status), this.log(" Final URL after redirects:", a.url), this.log(" Response headers:", [...a.headers.entries()]), a.ok) {
        const s = await a.text();
        this.log(" OSM raw response:", s.substring(0, 200));
        let c;
        try {
          c = JSON.parse(s);
        } catch {
          throw this.logError(
            "Failed to parse OSM response as JSON:",
            s.substring(0, 500)
          ), new Error("Invalid JSON response from OSM status endpoint");
        }
        this.log(" OSM status data:", c), c.connected ? (this.log(" OSM is connected:", c.osm_username), this.osmConnected = !0, this.osmData = c, this.dispatchEvent(
          new CustomEvent("osm-connected", {
            detail: { osmData: c },
            bubbles: !0,
            composed: !0
          })
        )) : (this.log(" OSM is NOT connected"), this.osmConnected = !1, this.osmData = null);
      }
    } catch (e) {
      this.logError("OSM connection check failed:", e);
    } finally {
      n || (this.osmLoading = !1), this._isPrimary && this._broadcastState();
    }
  }
  // Check app mapping status (for cross-app auth scenarios)
  // Only used when mapping-check-url is configured
  async checkAppMapping() {
    if (!this.mappingCheckUrl || !this.user)
      return !0;
    const n = ci(window.location.hostname);
    if (sessionStorage.getItem(n))
      return this.log(" Onboarding already completed this session, skipping check"), this.hasAppMapping = !0, !0;
    this.log(" Checking app mapping at:", this.mappingCheckUrl);
    try {
      const t = await fetch(this.mappingCheckUrl, {
        credentials: "include"
      });
      if (t.ok) {
        const o = await t.json();
        if (this.log(" Mapping check response:", o), o.needs_onboarding) {
          this.log(" User needs onboarding, redirecting...");
          const i = encodeURIComponent(window.location.origin), a = this.appId ? `onboarding=${this.appId}` : "";
          return window.location.href = `${this.hankoUrl}/app?${a}&return_to=${i}`, !1;
        }
        return sessionStorage.setItem(n, "true"), this.hasAppMapping = !0, this.log(" User has app mapping, onboarding marked complete"), !0;
      } else if (t.status === 401 || t.status === 403) {
        this.log(" 401/403 - User needs onboarding, redirecting...");
        const o = encodeURIComponent(window.location.origin), i = this.appId ? `onboarding=${this.appId}` : "";
        return window.location.href = `${this.hankoUrl}/app?${i}&return_to=${o}`, !1;
      }
      return this.log(" Unexpected status from mapping check:", t.status), !0;
    } catch (t) {
      return this.log(" App mapping check failed:", t), !0;
    }
  }
  // Fetch profile display name and language from login backend
  async fetchProfileDisplayName() {
    try {
      const n = `${this.hankoUrl}/api/profile/me`;
      this.log(" Fetching profile from:", n);
      const e = await fetch(n, {
        credentials: "include"
      });
      if (e.ok) {
        const t = await e.json();
        this.log(" Profile data:", t), (t.first_name || t.last_name) && (this.profileDisplayName = `${t.first_name || ""} ${t.last_name || ""}`.trim(), this.log(" Display name set to:", this.profileDisplayName)), t.language && (this.userProfileLanguage = t.language, this.log(" Language set from profile:", this.userProfileLanguage));
      }
    } catch (n) {
      this.log(" Could not fetch profile:", n);
    }
  }
  updated(n) {
    super.updated(n), n.has("user") && this.user === null && this.showProfile && (this.log(" User logged out, re-attaching event listeners..."), this._currentHankoAuthElement = null, this.setupEventListeners());
  }
  setupEventListeners() {
    this.updateComplete.then(() => {
      var e;
      const n = (e = this.shadowRoot) == null ? void 0 : e.querySelector("hanko-auth");
      if (n && n === this._currentHankoAuthElement) {
        this.log(" Event listeners already attached to this element");
        return;
      }
      n && (this._currentHankoAuthElement = n, this.log(" Attaching event listeners to hanko-auth element"), n.addEventListener("onSessionCreated", (t) => {
        var i, a;
        this.log(" Hanko event: onSessionCreated", t.detail);
        const o = (a = (i = t.detail) == null ? void 0 : i.claims) == null ? void 0 : a.session_id;
        if (o && this._lastSessionId === o) {
          this.log(" Skipping duplicate session event");
          return;
        }
        this._lastSessionId = o, this.handleHankoSuccess(t);
      }), n.addEventListener(
        "hankoAuthLogout",
        () => this.handleLogout()
      ));
    });
  }
  async handleHankoSuccess(n) {
    var o;
    if (this.log("Hanko auth success:", n.detail), !this._hanko) {
      this.logError("Hanko instance not initialized");
      return;
    }
    let e = !1;
    try {
      const i = new AbortController(), a = setTimeout(() => i.abort(), 5e3), s = await fetch(`${this.hankoUrl}/me`, {
        method: "GET",
        credentials: "include",
        // Include httpOnly cookies
        headers: {
          "Content-Type": "application/json"
        },
        signal: i.signal
      });
      if (clearTimeout(a), s.ok) {
        const c = await s.json();
        this.log(" User data retrieved from /me:", c), c.email ? (this.user = {
          id: c.user_id || c.id,
          email: c.email,
          username: c.username || null,
          emailVerified: c.email_verified || c.verified || !1
        }, e = !0) : this.log(" /me has no email, will try SDK fallback");
      } else
        this.log(
          " /me endpoint returned non-OK status, will try SDK fallback"
        );
    } catch (i) {
      this.log(
        " /me endpoint fetch failed (timeout or cross-origin TLS issue):",
        i
      );
    }
    if (!e)
      try {
        this.log(" Trying SDK fallback for user info...");
        const i = new Promise(
          (s, c) => setTimeout(() => c(new Error("SDK timeout")), 5e3)
        ), a = await Promise.race([
          this._hanko.user.getCurrent(),
          i
        ]);
        this.user = {
          id: a.id,
          email: a.email,
          username: a.username,
          emailVerified: a.email_verified || !1
        }, e = !0, this.log(" User info retrieved via SDK fallback");
      } catch (i) {
        this.log(" SDK fallback failed, trying JWT claims:", i);
        try {
          const a = (o = n.detail) == null ? void 0 : o.claims;
          if (a != null && a.sub)
            this.user = {
              id: a.sub,
              email: a.email || null,
              username: null,
              emailVerified: a.email_verified || !1
            }, e = !0, this.log(" User info extracted from JWT claims");
          else {
            this.logError("No user claims available in event"), this.user = null;
            return;
          }
        } catch (a) {
          this.logError(
            "Failed to extract user info from claims:",
            a
          ), this.user = null;
          return;
        }
      }
    if (this.log(" User state updated:", this.user), this._isPrimary && this._broadcastState(), this.dispatchEvent(
      new CustomEvent("hanko-login", {
        detail: { user: this.user },
        bubbles: !0,
        composed: !0
      })
    ), this.osmRequired && await this.checkOSMConnection(), await this.fetchProfileDisplayName(), this.osmRequired && this.autoConnect && !this.osmConnected) {
      this.log(" Auto-connecting to OSM..."), this.handleOSMConnect();
      return;
    }
    const t = !this.osmRequired || this.osmConnected;
    this.log(
      " Checking redirect-after-login:",
      this.redirectAfterLogin,
      "showProfile:",
      this.showProfile,
      "canRedirect:",
      t
    ), t ? (this.dispatchEvent(
      new CustomEvent("auth-complete", {
        bubbles: !0,
        composed: !0
      })
    ), this.redirectAfterLogin ? (this.log(" Redirecting to:", this.redirectAfterLogin), window.location.href = this.redirectAfterLogin) : this.log(" No redirect (redirectAfterLogin not set)")) : this.log(" Waiting for OSM connection before redirect");
  }
  async handleOSMConnect() {
    const n = this.osmScopes.split(" ").join("+"), e = this.getBasePath(), t = this.authPath, i = `${`${e}${t}/login`}?scopes=${n}`;
    this.log(" OSM Connect clicked!"), this.log("  basePath:", e), this.log("  authPath:", t), this.log("  Login path:", i), this.log("  Fetching redirect URL from backend...");
    try {
      const a = await fetch(i, {
        method: "GET",
        credentials: "include",
        redirect: "manual"
        // Don't follow redirect, we'll do it manually
      });
      if (this.log("  Response status:", a.status), this.log("  Response type:", a.type), a.status === 0 || a.type === "opaqueredirect") {
        const s = a.headers.get("Location") || a.url;
        this.log("   Got redirect URL:", s), window.location.href = s;
      } else if (a.status >= 300 && a.status < 400) {
        const s = a.headers.get("Location");
        this.log("   Got redirect URL from header:", s), s && (window.location.href = s);
      } else {
        this.logError("   Unexpected response:", a.status);
        const s = await a.text();
        this.logError("  Response body:", s.substring(0, 200));
      }
    } catch (a) {
      this.logError("   Failed to fetch redirect URL:", a);
    }
  }
  async handleLogout() {
    this.log(" Logout initiated"), this.log(" Current state before logout:", {
      user: this.user,
      osmConnected: this.osmConnected,
      osmData: this.osmData
    }), this.log(" Cookies before logout:", document.cookie);
    try {
      const n = this.getBasePath(), e = this.authPath, t = `${n}${e}/disconnect`, o = t.startsWith("http") ? t : `${window.location.origin}${t}`;
      this.log(" Calling OSM disconnect:", o);
      const i = await fetch(o, {
        method: "POST",
        credentials: "include"
      });
      this.log(" Disconnect response status:", i.status);
      const a = await i.json();
      this.log(" Disconnect response data:", a), this.log(" OSM disconnected");
    } catch (n) {
      this.logError(" OSM disconnect failed:", n);
    }
    if (this._hanko)
      try {
        await this._hanko.user.logout(), this.log(" Hanko logout successful");
      } catch (n) {
        this.logError("Hanko logout failed:", n);
      }
    if (this._clearAuthState(), this.log(
      " Logout complete - component will re-render with updated state"
    ), this.redirectAfterLogout) {
      const n = window.location.href.replace(/\/$/, ""), e = this.redirectAfterLogout.replace(/\/$/, "");
      n !== e && !n.startsWith(e + "#") ? (this.log(" Redirecting after logout to:", this.redirectAfterLogout), window.location.href = this.redirectAfterLogout) : this.log(" Already on logout target, skipping redirect");
    }
  }
  /**
   * Clear all auth state - shared between logout and session expired handlers
   */
  _clearAuthState() {
    const n = window.location.hostname;
    document.cookie = `hanko=; path=/; domain=${n}; max-age=0`, document.cookie = "hanko=; path=/; max-age=0", document.cookie = `osm_connection=; path=/; domain=${n}; max-age=0`, document.cookie = "osm_connection=; path=/; max-age=0", this.log(" Cookies cleared");
    const e = li(n), t = ci(n);
    sessionStorage.removeItem(e), sessionStorage.removeItem(t), this.log(" Session flags cleared"), this.user = null, this.osmConnected = !1, this.osmData = null, this.hasAppMapping = !1, this.userProfileLanguage = null, this._isPrimary && this._broadcastState(), this.dispatchEvent(
      new CustomEvent("logout", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  async handleSessionExpired() {
    if (this.log(" Session expired event received"), this.log(" Current state:", {
      user: this.user,
      osmConnected: this.osmConnected,
      loading: this.loading
    }), this.loading) {
      this.log(" Still loading, ignoring session expired event during init");
      return;
    }
    if (this.user) {
      this.log(" User is logged in, ignoring stale session expired event");
      return;
    }
    this.log(" No active user - cleaning up state");
    try {
      const n = this.getBasePath(), e = this.authPath, t = `${n}${e}/disconnect`, o = t.startsWith("http") ? t : `${window.location.origin}${t}`;
      this.log(" Calling OSM disconnect (session expired):", o);
      const i = await fetch(o, {
        method: "POST",
        credentials: "include"
      });
      this.log(" Disconnect response status:", i.status);
      const a = await i.json();
      this.log(" Disconnect response data:", a), this.log(" OSM disconnected");
    } catch (n) {
      this.logError(" OSM disconnect failed:", n);
    }
    if (this._clearAuthState(), this.log(" Session cleanup complete"), this.redirectAfterLogout) {
      const n = window.location.href.replace(/\/$/, ""), e = this.redirectAfterLogout.replace(/\/$/, "");
      n !== e && !n.startsWith(e + "#") ? (this.log(
        " Redirecting after session expired to:",
        this.redirectAfterLogout
      ), window.location.href = this.redirectAfterLogout) : this.log(" Already on logout target, skipping redirect");
    }
  }
  handleUserLoggedOut() {
    this.log(" User logged out in another window/tab"), this.handleSessionExpired();
  }
  handleDropdownSelect(n) {
    const t = n.currentTarget.dataset.action;
    if (this.log(" Dropdown item selected:", t), t === "profile") {
      const o = this.hankoUrl, i = this.redirectAfterLogin || window.location.origin;
      window.location.href = `${o}/app/profile?return_to=${encodeURIComponent(i)}`;
    } else if (t === "connect-osm") {
      const a = window.location.pathname.includes("/app") ? window.location.origin : window.location.href, s = this.hankoUrl;
      window.location.href = `${s}/app?return_to=${encodeURIComponent(a)}&osm_required=true`;
    } else t === "logout" && this.handleLogout();
    this.closeDropdown();
  }
  oldHandleDropdownSelect(n) {
    const e = n.detail.item.value;
    if (this.log(" Dropdown item selected:", e), e === "profile") {
      const t = this.redirectAfterLogin || window.location.origin, o = this.loginUrl ? `${this.loginUrl}/profile` : `${this.hankoUrl}/app/profile`;
      window.location.href = `${o}?return_to=${encodeURIComponent(t)}`;
    } else if (e === "connect-osm") {
      const i = window.location.pathname.includes("/app") ? window.location.origin : window.location.href, a = this.hankoUrl;
      window.location.href = `${a}/app?return_to=${encodeURIComponent(
        i
      )}&osm_required=true`;
    } else e === "logout" && this.handleLogout();
  }
  handleSkipOSM() {
    this.dispatchEvent(new CustomEvent("osm-skipped")), this.dispatchEvent(new CustomEvent("auth-complete")), this.redirectAfterLogin && (window.location.href = this.redirectAfterLogin);
  }
  render() {
    var n, e, t;
    if (this.log(
      " RENDER - showProfile:",
      this.showProfile,
      "user:",
      !!this.user,
      "loading:",
      this.loading,
      "lang:",
      this.lang
    ), this.loading)
      return xe`<span class="loading-placeholder"
        ><span class="loading-placeholder-text">${this.t("logIn")}</span
        ><span class="spinner-small"></span
      ></span>`;
    if (this.error)
      return xe`
        <div class="container">
          <div class="error">${this.error}</div>
        </div>
      `;
    if (this.user) {
      const o = this.osmRequired && !this.osmConnected && !this.osmLoading, i = this.displayNameAttr || this.profileDisplayName || this.user.username || this.user.email || this.user.id, a = i ? i[0].toUpperCase() : "U";
      return this.showProfile ? xe`
          <div class="container">
            <div class="profile">
              <div class="profile-header">
                <div class="profile-avatar">${a}</div>
                <div class="profile-info">
                  <div class="profile-email">
                    ${this.user.email || this.user.id}
                  </div>
                </div>
              </div>

              ${this.osmRequired && this.osmLoading ? xe`
                    <div class="osm-section">
                      <div class="loading">
                        ${this.t("checkingOsmConnection")}
                      </div>
                    </div>
                  ` : this.osmRequired && this.osmConnected ? xe`
                      <div class="osm-section">
                        <div class="osm-connected">
                          <div class="osm-badge">
                            <span class="osm-badge-icon"></span>
                            <div>
                              <div>${this.t("connectedToOpenStreetMap")}</div>
                              ${(n = this.osmData) != null && n.osm_username ? xe`
                                    <div class="osm-username">
                                      @${this.osmData.osm_username}
                                    </div>
                                  ` : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    ` : ""}
              ${o ? xe`
                    <div class="osm-section">
                      ${this.autoConnect ? xe`
                            <div class="osm-connecting">
                              <div class="spinner"></div>
                              <div class="connecting-text">
                                 ${this.t("connectingToOpenStreetMap")}
                              </div>
                            </div>
                          ` : xe`
                            <div class="osm-prompt-title">
                               ${this.t("osmRequired")}
                            </div>
                            <div class="osm-prompt-text">
                              ${this.t("osmRequiredText")}
                            </div>
                            <button
                              @click=${this.handleOSMConnect}
                              class="btn-primary"
                            >
                              ${this.t("connectOsmAccount")}
                            </button>
                          `}
                    </div>
                  ` : ""}

              <button @click=${this.handleLogout} class="btn-secondary">
                ${this.t("logOut")}
              </button>
            </div>
          </div>
        ` : this.display === "bar" ? xe`
          <div class="dropdown">
            <button
              @click=${this.toggleDropdown}
              aria-label="${this.t("openAccountMenu")}"
              aria-expanded=${this.isOpen}
              aria-haspopup="true"
              class="bar-trigger"
            >
              <div class="bar-info">
                <span class="header-avatar">${a}</span>
                <span class="bar-email"
                  >${this.user.email || this.user.id}</span
                >
              </div>
              <img
                src="${this.isOpen ? ks : bs}"
                class="bar-chevron"
                alt=""
              />
            </button>
            ${this.renderBarDropdownContent()}
          </div>
        ` : xe`
          <div class="dropdown">
            <button
              @click=${this.toggleDropdown}
              aria-label="${this.t("openAccountMenu")}"
              aria-expanded=${this.isOpen}
              aria-haspopup="true"
              class="dropdown-trigger"
            >
              <span class="header-avatar">${a}</span>

              ${this.osmConnected ? xe`
                    <span
                      class="osm-status-badge connected"
                      title="${this.t("connectedToOsmAs")} @${(e = this.osmData) == null ? void 0 : e.osm_username}"
                      ></span
                    >
                  ` : this.osmRequired ? xe`
                      <span
                        class="osm-status-badge required"
                        title="${this.t("osmConnectionRequired")}"
                        >!</span
                      >
                    ` : ""}
            </button>
            <div class="dropdown-content ${this.isOpen ? "open" : ""}">
              <div class="profile-info">
                <div class="profile-email">
                  ${this.user.email || this.user.id}
                </div>
              </div>
              <button data-action="profile" @click=${this.handleDropdownSelect}>
                <img src="${oi}" class="icon" alt="Account icon" />
                ${this.t("myHotAccount")}
              </button>
              ${this.osmRequired ? this.osmConnected ? xe`
                      <button class="osm-connected" disabled>
                        <img src="${ri}" alt="Check icon" class="icon" />
                        ${this.t("connectedToOsm")}
                        (@${(t = this.osmData) == null ? void 0 : t.osm_username})
                      </button>
                    ` : xe`
                      <button
                        data-action="connect-osm"
                        @click=${this.handleDropdownSelect}
                      >
                        <img src="${ai}" alt="Check icon" class="icon" />
                        ${this.t("connectToOsm")}
                      </button>
                    ` : ""}
              <button data-action="logout" @click=${this.handleDropdownSelect}>
                <img src="${ii}" alt="Log out icon" class="icon" />
                ${this.t("logOut")}
              </button>
            </div>
          </div>
        `;
    } else {
      if (this.showProfile)
        return this.hankoReady ? xe`
          <div
            class="container"
            style="
            --color: var(--hot-color-gray-900);
            --color-shade-1: var(--hot-color-gray-700);
            --color-shade-2: var(--hot-color-gray-100);
            --brand-color: var(--hot-color-gray-800);
            --brand-color-shade-1: var(--hot-color-gray-900);
            --brand-contrast-color: white;
            --background-color: white;
            --error-color: var(--hot-color-red-600);
            --link-color: var(--hot-color-gray-900);
            --font-family: var(--hot-font-sans);
            --font-weight: var(--hot-font-weight-normal);
            --border-radius: var(--hot-border-radius-medium);
            --item-height: 2.75rem;
            --item-margin: var(--hot-spacing-small) 0;
            --container-padding: 0;
            --headline1-font-size: var(--hot-font-size-large);
            --headline1-font-weight: var(--hot-font-weight-semibold);
            --headline2-font-size: var(--hot-font-size-medium);
            --headline2-font-weight: var(--hot-font-weight-semibold);
          "
          >
            ${_a(
          this.lang,
          xe`<hanko-auth lang="${this.lang}"></hanko-auth>`
        )}
          </div>
        ` : (this.log(
          " Waiting for Hanko registration before rendering form..."
        ), xe`<span class="loading-placeholder"
            ><span class="loading-placeholder-text">${this.t("logIn")}</span
            ><span class="spinner-small"></span
          ></span>`);
      {
        const i = window.location.pathname.includes("/app"), a = this.redirectAfterLogin || (i ? window.location.origin : window.location.href), c = new URLSearchParams(window.location.search).get("auto_connect") === "true" ? "&auto_connect=true" : "", d = this.hankoUrl;
        this.log(" Login URL base:", d);
        const u = `${this.loginUrl || `${d}/app`}?return_to=${encodeURIComponent(
          a
        )}${this.osmRequired ? "&osm_required=true" : ""}${c}&lang=${this.lang}`;
        return xe`<a
          class="login-link ${this.buttonVariant} ${this.buttonColor}"
          href="${u}"
          @click=${(h) => {
          h.preventDefault(), window.location.href = u;
        }}
          >${this.t("logIn")}</a
        > `;
      }
    }
  }
};
re.styles = ms;
de([
  Te({ type: String, attribute: "hanko-url" })
], re.prototype, "hankoUrlAttr", 2);
de([
  Te({ type: String, attribute: "base-path" })
], re.prototype, "basePath", 2);
de([
  Te({ type: String, attribute: "auth-path" })
], re.prototype, "authPath", 2);
de([
  Te({ type: Boolean, attribute: "osm-required" })
], re.prototype, "osmRequired", 2);
de([
  Te({ type: String, attribute: "osm-scopes" })
], re.prototype, "osmScopes", 2);
de([
  Te({ type: Boolean, attribute: "show-profile" })
], re.prototype, "showProfile", 2);
de([
  Te({ type: String, attribute: "redirect-after-login" })
], re.prototype, "redirectAfterLogin", 2);
de([
  Te({ type: Boolean, attribute: "auto-connect" })
], re.prototype, "autoConnect", 2);
de([
  Te({ type: Boolean, attribute: "verify-session" })
], re.prototype, "verifySession", 2);
de([
  Te({ type: String, attribute: "redirect-after-logout" })
], re.prototype, "redirectAfterLogout", 2);
de([
  Te({ type: String, attribute: "display-name" })
], re.prototype, "displayNameAttr", 2);
de([
  Te({ type: String, attribute: "mapping-check-url" })
], re.prototype, "mappingCheckUrl", 2);
de([
  Te({ type: String, attribute: "app-id" })
], re.prototype, "appId", 2);
de([
  Te({ type: String, attribute: "login-url" })
], re.prototype, "loginUrl", 2);
de([
  Te({ type: String, reflect: !0 })
], re.prototype, "lang", 2);
de([
  Te({ type: String, attribute: "button-variant" })
], re.prototype, "buttonVariant", 2);
de([
  Te({ type: String, attribute: "button-color" })
], re.prototype, "buttonColor", 2);
de([
  Te({ type: String, reflect: !0 })
], re.prototype, "display", 2);
de([
  Ye()
], re.prototype, "user", 2);
de([
  Ye()
], re.prototype, "osmConnected", 2);
de([
  Ye()
], re.prototype, "osmData", 2);
de([
  Ye()
], re.prototype, "osmLoading", 2);
de([
  Ye()
], re.prototype, "loading", 2);
de([
  Ye()
], re.prototype, "error", 2);
de([
  Ye()
], re.prototype, "hankoReady", 2);
de([
  Ye()
], re.prototype, "profileDisplayName", 2);
de([
  Ye()
], re.prototype, "hasAppMapping", 2);
de([
  Ye()
], re.prototype, "userProfileLanguage", 2);
de([
  Ye()
], re.prototype, "isOpen", 2);
re = de([
  ua("hotosm-auth")
], re);
export {
  re as HankoAuth,
  fs as en,
  vs as es,
  _s as fr,
  ys as pt
};
