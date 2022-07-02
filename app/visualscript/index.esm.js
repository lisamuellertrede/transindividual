/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const t$3 = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
 e$4 = Symbol(),
 n$6 = new Map();

class s$4 {
constructor(t, n) {
if (this._$cssResult$ = !0, n !== e$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
this.cssText = t;
}

get styleSheet() {
let e = n$6.get(this.cssText);
return t$3 && void 0 === e && (n$6.set(this.cssText, e = new CSSStyleSheet()), e.replaceSync(this.cssText)), e;
}

toString() {
return this.cssText;
}

}

const o$5 = t => new s$4("string" == typeof t ? t : t + "", e$4),
 r$4 = (t, ...n) => {
const o = 1 === t.length ? t[0] : n.reduce((e, n, s) => e + (t => {
if (!0 === t._$cssResult$) return t.cssText;
if ("number" == typeof t) return t;
throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + t[s + 1], t[0]);
return new s$4(o, e$4);
},
 i$4 = (e, n) => {
t$3 ? e.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(t => {
const n = document.createElement("style"),
     s = window.litNonce;
void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
});
},
 S$1 = t$3 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
let e = "";

for (const n of t.cssRules) e += n.cssText;

return o$5(e);
})(t) : t;

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

var s$3;

const e$3 = window.trustedTypes,
 r$3 = e$3 ? e$3.emptyScript : "",
 h$3 = window.reactiveElementPolyfillSupport,
 o$4 = {
toAttribute(t, i) {
switch (i) {
 case Boolean:
   t = t ? r$3 : null;
   break;

 case Object:
 case Array:
   t = null == t ? t : JSON.stringify(t);
}

return t;
},

fromAttribute(t, i) {
let s = t;

switch (i) {
 case Boolean:
   s = null !== t;
   break;

 case Number:
   s = null === t ? null : Number(t);
   break;

 case Object:
 case Array:
   try {
     s = JSON.parse(t);
   } catch (t) {
     s = null;
   }

}

return s;
}

},
 n$5 = (t, i) => i !== t && (i == i || t == t),
 l$3 = {
attribute: !0,
type: String,
converter: o$4,
reflect: !1,
hasChanged: n$5
};

class a$1 extends HTMLElement {
constructor() {
super(), this._$Et = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
}

static addInitializer(t) {
var i;
null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
}

static get observedAttributes() {
this.finalize();
const t = [];
return this.elementProperties.forEach((i, s) => {
 const e = this._$Eh(s, i);

 void 0 !== e && (this._$Eu.set(e, s), t.push(e));
}), t;
}

static createProperty(t, i = l$3) {
if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
 const s = "symbol" == typeof t ? Symbol() : "__" + t,
       e = this.getPropertyDescriptor(t, s, i);
 void 0 !== e && Object.defineProperty(this.prototype, t, e);
}
}

static getPropertyDescriptor(t, i, s) {
return {
 get() {
   return this[i];
 },

 set(e) {
   const r = this[t];
   this[i] = e, this.requestUpdate(t, r, s);
 },

 configurable: !0,
 enumerable: !0
};
}

static getPropertyOptions(t) {
return this.elementProperties.get(t) || l$3;
}

static finalize() {
if (this.hasOwnProperty("finalized")) return !1;
this.finalized = !0;
const t = Object.getPrototypeOf(this);

if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
 const t = this.properties,
       i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

 for (const s of i) this.createProperty(s, t[s]);
}

return this.elementStyles = this.finalizeStyles(this.styles), !0;
}

static finalizeStyles(i) {
const s = [];

if (Array.isArray(i)) {
 const e = new Set(i.flat(1 / 0).reverse());

 for (const i of e) s.unshift(S$1(i));
} else void 0 !== i && s.push(S$1(i));

return s;
}

static _$Eh(t, i) {
const s = i.attribute;
return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
}

o() {
var t;
this._$Ep = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Em(), this.requestUpdate(), null === (t = this.constructor.l) || void 0 === t || t.forEach(t => t(this));
}

addController(t) {
var i, s;
(null !== (i = this._$Eg) && void 0 !== i ? i : this._$Eg = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
}

removeController(t) {
var i;
null === (i = this._$Eg) || void 0 === i || i.splice(this._$Eg.indexOf(t) >>> 0, 1);
}

_$Em() {
this.constructor.elementProperties.forEach((t, i) => {
 this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
});
}

createRenderRoot() {
var t;
const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
return i$4(s, this.constructor.elementStyles), s;
}

connectedCallback() {
var t;
void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
 var i;
 return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
});
}

enableUpdating(t) {}

disconnectedCallback() {
var t;
null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
 var i;
 return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
});
}

attributeChangedCallback(t, i, s) {
this._$AK(t, s);
}

_$ES(t, i, s = l$3) {
var e, r;

const h = this.constructor._$Eh(t, s);

if (void 0 !== h && !0 === s.reflect) {
 const n = (null !== (r = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== r ? r : o$4.toAttribute)(i, s.type);
 this._$Ei = t, null == n ? this.removeAttribute(h) : this.setAttribute(h, n), this._$Ei = null;
}
}

_$AK(t, i) {
var s, e, r;

const h = this.constructor,
     n = h._$Eu.get(t);

if (void 0 !== n && this._$Ei !== n) {
 const t = h.getPropertyOptions(n),
       l = t.converter,
       a = null !== (r = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== r ? r : o$4.fromAttribute;
 this._$Ei = n, this[n] = a(i, t.type), this._$Ei = null;
}
}

requestUpdate(t, i, s) {
let e = !0;
void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n$5)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$Ei !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$Ep = this._$E_());
}

async _$E_() {
this.isUpdatePending = !0;

try {
 await this._$Ep;
} catch (t) {
 Promise.reject(t);
}

const t = this.scheduleUpdate();
return null != t && (await t), !this.isUpdatePending;
}

scheduleUpdate() {
return this.performUpdate();
}

performUpdate() {
var t;
if (!this.isUpdatePending) return;
this.hasUpdated, this._$Et && (this._$Et.forEach((t, i) => this[i] = t), this._$Et = void 0);
let i = !1;
const s = this._$AL;

try {
 i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
   var i;
   return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
 }), this.update(s)) : this._$EU();
} catch (t) {
 throw i = !1, this._$EU(), t;
}

i && this._$AE(s);
}

willUpdate(t) {}

_$AE(t) {
var i;
null === (i = this._$Eg) || void 0 === i || i.forEach(t => {
 var i;
 return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
}), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
}

_$EU() {
this._$AL = new Map(), this.isUpdatePending = !1;
}

get updateComplete() {
return this.getUpdateComplete();
}

getUpdateComplete() {
return this._$Ep;
}

shouldUpdate(t) {
return !0;
}

update(t) {
void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$ES(i, this[i], t)), this._$EC = void 0), this._$EU();
}

updated(t) {}

firstUpdated(t) {}

}

a$1.finalized = !0, a$1.elementProperties = new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = {
mode: "open"
}, null == h$3 || h$3({
ReactiveElement: a$1
}), (null !== (s$3 = globalThis.reactiveElementVersions) && void 0 !== s$3 ? s$3 : globalThis.reactiveElementVersions = []).push("1.3.1");

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var t$2;

const i$3 = globalThis.trustedTypes,
 s$2 = i$3 ? i$3.createPolicy("lit-html", {
createHTML: t => t
}) : void 0,
 e$2 = `lit$${(Math.random() + "").slice(9)}$`,
 o$3 = "?" + e$2,
 n$4 = `<${o$3}>`,
 l$2 = document,
 h$2 = (t = "") => l$2.createComment(t),
 r$2 = t => null === t || "object" != typeof t && "function" != typeof t,
 d$1 = Array.isArray,
 u = t => {
var i;
return d$1(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
},
 c$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
 v = /-->/g,
 a = />/g,
 f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
 _ = /'/g,
 m = /"/g,
 g = /^(?:script|style|textarea|title)$/i,
 p = t => (i, ...s) => ({
_$litType$: t,
strings: i,
values: s
}),
 $ = p(1),
 b = Symbol.for("lit-noChange"),
 w = Symbol.for("lit-nothing"),
 T = new WeakMap(),
 x = (t, i, s) => {
var e, o;
const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
let l = n._$litPart$;

if (void 0 === l) {
const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
n._$litPart$ = l = new N(i.insertBefore(h$2(), t), t, void 0, null != s ? s : {});
}

return l._$AI(t), l;
},
 A = l$2.createTreeWalker(l$2, 129, null, !1),
 C = (t, i) => {
const o = t.length - 1,
   l = [];
let h,
 r = 2 === i ? "<svg>" : "",
 d = c$1;

for (let i = 0; i < o; i++) {
const s = t[i];
let o,
   u,
   p = -1,
   $ = 0;

for (; $ < s.length && (d.lastIndex = $, u = d.exec(s), null !== u);) $ = d.lastIndex, d === c$1 ? "!--" === u[1] ? d = v : void 0 !== u[1] ? d = a : void 0 !== u[2] ? (g.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = f) : void 0 !== u[3] && (d = f) : d === f ? ">" === u[0] ? (d = null != h ? h : c$1, p = -1) : void 0 === u[1] ? p = -2 : (p = d.lastIndex - u[2].length, o = u[1], d = void 0 === u[3] ? f : '"' === u[3] ? m : _) : d === m || d === _ ? d = f : d === v || d === a ? d = c$1 : (d = f, h = void 0);

const y = d === f && t[i + 1].startsWith("/>") ? " " : "";
r += d === c$1 ? s + n$4 : p >= 0 ? (l.push(o), s.slice(0, p) + "$lit$" + s.slice(p) + e$2 + y) : s + e$2 + (-2 === p ? (l.push(void 0), i) : y);
}

const u = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
return [void 0 !== s$2 ? s$2.createHTML(u) : u, l];
};

class E {
constructor({
strings: t,
_$litType$: s
}, n) {
let l;
this.parts = [];
let r = 0,
   d = 0;
const u = t.length - 1,
     c = this.parts,
     [v, a] = C(t, s);

if (this.el = E.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
 const t = this.el.content,
       i = t.firstChild;
 i.remove(), t.append(...i.childNodes);
}

for (; null !== (l = A.nextNode()) && c.length < u;) {
 if (1 === l.nodeType) {
   if (l.hasAttributes()) {
     const t = [];

     for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(e$2)) {
       const s = a[d++];

       if (t.push(i), void 0 !== s) {
         const t = l.getAttribute(s.toLowerCase() + "$lit$").split(e$2),
               i = /([.?@])?(.*)/.exec(s);
         c.push({
           type: 1,
           index: r,
           name: i[2],
           strings: t,
           ctor: "." === i[1] ? M : "?" === i[1] ? H : "@" === i[1] ? I : S
         });
       } else c.push({
         type: 6,
         index: r
       });
     }

     for (const i of t) l.removeAttribute(i);
   }

   if (g.test(l.tagName)) {
     const t = l.textContent.split(e$2),
           s = t.length - 1;

     if (s > 0) {
       l.textContent = i$3 ? i$3.emptyScript : "";

       for (let i = 0; i < s; i++) l.append(t[i], h$2()), A.nextNode(), c.push({
         type: 2,
         index: ++r
       });

       l.append(t[s], h$2());
     }
   }
 } else if (8 === l.nodeType) if (l.data === o$3) c.push({
   type: 2,
   index: r
 });else {
   let t = -1;

   for (; -1 !== (t = l.data.indexOf(e$2, t + 1));) c.push({
     type: 7,
     index: r
   }), t += e$2.length - 1;
 }

 r++;
}
}

static createElement(t, i) {
const s = l$2.createElement("template");
return s.innerHTML = t, s;
}

}

function P(t, i, s = t, e) {
var o, n, l, h;
if (i === b) return i;
let d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
const u = r$2(i) ? void 0 : i._$litDirective$;
return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = P(t, d._$AS(t, i.values), d, e)), i;
}

class V {
constructor(t, i) {
this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
}

get parentNode() {
return this._$AM.parentNode;
}

get _$AU() {
return this._$AM._$AU;
}

p(t) {
var i;
const {
 el: {
   content: s
 },
 parts: e
} = this._$AD,
     o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l$2).importNode(s, !0);
A.currentNode = o;
let n = A.nextNode(),
   h = 0,
   r = 0,
   d = e[0];

for (; void 0 !== d;) {
 if (h === d.index) {
   let i;
   2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new L(n, this, t)), this.v.push(i), d = e[++r];
 }

 h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
}

return o;
}

m(t) {
let i = 0;

for (const s of this.v) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
}

}

class N {
constructor(t, i, s, e) {
var o;
this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cg = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
}

get _$AU() {
var t, i;
return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cg;
}

get parentNode() {
let t = this._$AA.parentNode;
const i = this._$AM;
return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
}

get startNode() {
return this._$AA;
}

get endNode() {
return this._$AB;
}

_$AI(t, i = this) {
t = P(this, t, i), r$2(t) ? t === w || null == t || "" === t ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== b && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.k(t) : u(t) ? this.S(t) : this.$(t);
}

A(t, i = this._$AB) {
return this._$AA.parentNode.insertBefore(t, i);
}

k(t) {
this._$AH !== t && (this._$AR(), this._$AH = this.A(t));
}

$(t) {
this._$AH !== w && r$2(this._$AH) ? this._$AA.nextSibling.data = t : this.k(l$2.createTextNode(t)), this._$AH = t;
}

T(t) {
var i;
const {
 values: s,
 _$litType$: e
} = t,
     o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = E.createElement(e.h, this.options)), e);
if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);else {
 const t = new V(o, this),
       i = t.p(this.options);
 t.m(s), this.k(i), this._$AH = t;
}
}

_$AC(t) {
let i = T.get(t.strings);
return void 0 === i && T.set(t.strings, i = new E(t)), i;
}

S(t) {
d$1(this._$AH) || (this._$AH = [], this._$AR());
const i = this._$AH;
let s,
   e = 0;

for (const o of t) e === i.length ? i.push(s = new N(this.A(h$2()), this.A(h$2()), this, this.options)) : s = i[e], s._$AI(o), e++;

e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
}

_$AR(t = this._$AA.nextSibling, i) {
var s;

for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
 const i = t.nextSibling;
 t.remove(), t = i;
}
}

setConnected(t) {
var i;
void 0 === this._$AM && (this._$Cg = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
}

}

class S {
constructor(t, i, s, e, o) {
this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
}

get tagName() {
return this.element.tagName;
}

get _$AU() {
return this._$AM._$AU;
}

_$AI(t, i = this, s, e) {
const o = this.strings;
let n = !1;
if (void 0 === o) t = P(this, t, i, 0), n = !r$2(t) || t !== this._$AH && t !== b, n && (this._$AH = t);else {
 const e = t;
 let l, h;

 for (t = o[0], l = 0; l < o.length - 1; l++) h = P(this, e[s + l], i, l), h === b && (h = this._$AH[l]), n || (n = !r$2(h) || h !== this._$AH[l]), h === w ? t = w : t !== w && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
}
n && !e && this.C(t);
}

C(t) {
t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
}

}

class M extends S {
constructor() {
super(...arguments), this.type = 3;
}

C(t) {
this.element[this.name] = t === w ? void 0 : t;
}

}

const k = i$3 ? i$3.emptyScript : "";

class H extends S {
constructor() {
super(...arguments), this.type = 4;
}

C(t) {
t && t !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
}

}

class I extends S {
constructor(t, i, s, e, o) {
super(t, i, s, e, o), this.type = 5;
}

_$AI(t, i = this) {
var s;
if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : w) === b) return;
const e = this._$AH,
     o = t === w && e !== w || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
     n = t !== w && (e === w || o);
o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
}

handleEvent(t) {
var i, s;
"function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
}

}

class L {
constructor(t, i, s) {
this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
}

get _$AU() {
return this._$AM._$AU;
}

_$AI(t) {
P(this, t);
}

}

const z = window.litHtmlPolyfillSupport;
null == z || z(E, N), (null !== (t$2 = globalThis.litHtmlVersions) && void 0 !== t$2 ? t$2 : globalThis.litHtmlVersions = []).push("2.2.1");

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

var l$1, o$2;

class s$1 extends a$1 {
constructor() {
super(...arguments), this.renderOptions = {
 host: this
}, this._$Dt = void 0;
}

createRenderRoot() {
var t, e;
const i = super.createRenderRoot();
return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
}

update(t) {
const i = this.render();
this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = x(i, this.renderRoot, this.renderOptions);
}

connectedCallback() {
var t;
super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
}

disconnectedCallback() {
var t;
super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
}

render() {
return b;
}

}

s$1.finalized = !0, s$1._$litElement$ = !0, null === (l$1 = globalThis.litElementHydrateSupport) || void 0 === l$1 || l$1.call(globalThis, {
LitElement: s$1
});
const n$3 = globalThis.litElementPolyfillSupport;
null == n$3 || n$3({
LitElement: s$1
});
(null !== (o$2 = globalThis.litElementVersions) && void 0 !== o$2 ? o$2 : globalThis.litElementVersions = []).push("3.2.0");

class Volume extends s$1 {
constructor(props = {}) {
   super();
   this.volume = props.volume ?? 0;
   this.backgroundColor = props.backgroundColor ?? '#69ce2b';
   this.count = props.count ?? 10;
}
static get styles() {
   return r$4 `

 :host {
   width: 100%;
 }

 #wrapper{
   width: 100%;
 }

 `;
}
static get properties() {
   return {
       volume: {
           type: Number,
       },
       count: {
           type: Number,
       },
       backgroundColor: {
           type: String,
           reflect: true,
       },
   };
}
willUpdate(changedProps) {
   // console.log(changedProps)
   if (changedProps.has('volume')) {
       // const oldValue = changedProps.get('volume');
       if (!this.volume || this.volume < 0)
           this.volume = 0;
       else if (this.volume > 1)
           this.volume = 1;
   }
}
render() {
   const numToColor = Math.round(this.count * (this.volume ?? 0));
   return $ `
 <style>
   .target{
     width: calc(${100 / this.count}% - 10px);
     height: 10px;
     display: inline-block;
     margin: 5px;
     background-color: #e6e7e8;
   }

   .active {
     background-color: ${this.backgroundColor};
   }
   
 </style>

   <div id="wrapper">
     ${Array.from({ length: this.count }, (_, i) => $ `<div class=${i < numToColor ? 'target active' : 'target'}></div>`)}
   </div>
`;
}
}
customElements.define('visualscript-audio-volume', Volume);

var index$4 = /*#__PURE__*/Object.freeze({
__proto__: null,
Volume: Volume
});

class Player extends s$1 {
constructor(props = {}) {
   super();
   this.source = props.source;
   this.autoplay = props.autoplay;
   this.controls = props.controls;
}
static get styles() {
   return r$4 `

 video {
   width: 100%;
 }

 `;
}
static get properties() {
   return {
       source: {
           converter: {
               toAttribute(value) {
                   return value;
               },
               fromAttribute(value) {
                   return value;
               }
           }
       },
       autoplay: { type: Boolean },
       controls: { type: Boolean }
   };
}
willUpdate(_) {
   // console.log(changedProps)
   // if (changedProps.has('volume')) {
   //     // const oldValue = changedProps.get('volume');
   //     if (!this.volume || this.volume < 0) this.volume = 0
   //     else if (this.volume > 1) this.volume = 1
   // }
}
render() {
   let video = document.createElement('video');
   // Live Input | NOTE: Not Working in Storybook
   if (typeof this.source === 'object')
       video.srcObject = this.source;
   // Video Source
   else {
       if (this.source) {
           const source = document.createElement('source');
           source.src = this.source;
           video.insertAdjacentElement('beforeend', source);
       }
   }
   if (this.autoplay)
       video.autoplay = this.autoplay;
   if (this.controls)
       video.controls = this.controls;
   return video;
}
}
customElements.define('visualscript-video-player', Player);

var index$3 = /*#__PURE__*/Object.freeze({
__proto__: null,
Player: Player
});

function _arrayLikeToArray(arr, len) {
if (len == null || len > arr.length) len = arr.length;

for (var i = 0, arr2 = new Array(len); i < len; i++) {
arr2[i] = arr[i];
}

return arr2;
}

function _arrayWithoutHoles(arr) {
if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
if (!o) return;
if (typeof o === "string") return _arrayLikeToArray(o, minLen);
var n = Object.prototype.toString.call(o).slice(8, -1);
if (n === "Object" && o.constructor) n = o.constructor.name;
if (n === "Map" || n === "Set") return Array.from(o);
if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
if (!(instance instanceof Constructor)) {
throw new TypeError("Cannot call a class as a function");
}
}

function _defineProperties(target, props) {
for (var i = 0; i < props.length; i++) {
var descriptor = props[i];
descriptor.enumerable = descriptor.enumerable || false;
descriptor.configurable = true;
if ("value" in descriptor) descriptor.writable = true;
Object.defineProperty(target, descriptor.key, descriptor);
}
}

function _createClass(Constructor, protoProps, staticProps) {
if (protoProps) _defineProperties(Constructor.prototype, protoProps);
if (staticProps) _defineProperties(Constructor, staticProps);
Object.defineProperty(Constructor, "prototype", {
writable: false
});
return Constructor;
}

function _defineProperty(obj, key, value) {
if (key in obj) {
Object.defineProperty(obj, key, {
 value: value,
 enumerable: true,
 configurable: true,
 writable: true
});
} else {
obj[key] = value;
}

return obj;
}

class ColorRGBA {
constructor(r, g, b, a) {
this.r = r;
this.g = g;
this.b = b;
this.a = a;
}

}
/**
* Baseline class
*/


class WebglBase {
/**
* @internal
*/
constructor() {
this.scaleX = 1;
this.scaleY = 1;
this.offsetX = 0;
this.offsetY = 0;
this.loop = false;
this._vbuffer = 0;
this._coord = 0;
this.visible = true;
this.intensity = 1;
this.xy = new Float32Array([]);
this.numPoints = 0;
this.color = new ColorRGBA(0, 0, 0, 1);
this.webglNumPoints = 0;
}

}
/**
* The standard Line class
*/


class WebglLine extends WebglBase {
/**
* Create a new line
* @param c - the color of the line
* @param numPoints - number of data pints
* @example
* ```typescript
* x= [0,1]
* y= [1,2]
* line = new WebglLine( new ColorRGBA(0.1,0.1,0.1,1), 2);
* ```
*/
constructor(c, numPoints) {
super();
this.currentIndex = 0;
this.webglNumPoints = numPoints;
this.numPoints = numPoints;
this.color = c;
this.xy = new Float32Array(2 * this.webglNumPoints);
}
/**
* Set the X value at a specific index
* @param index - the index of the data point
* @param x - the horizontal value of the data point
*/


setX(index, x) {
this.xy[index * 2] = x;
}
/**
* Set the Y value at a specific index
* @param index : the index of the data point
* @param y : the vertical value of the data point
*/


setY(index, y) {
this.xy[index * 2 + 1] = y;
}
/**
* Get an X value at a specific index
* @param index - the index of X
*/


getX(index) {
return this.xy[index * 2];
}
/**
* Get an Y value at a specific index
* @param index - the index of Y
*/


getY(index) {
return this.xy[index * 2 + 1];
}
/**
* Make an equally spaced array of X points
* @param start  - the start of the series
* @param stepSize - step size between each data point
*
* @example
* ```typescript
* //x = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8]
* const numX = 10;
* line.lineSpaceX(-1, 2 / numX);
* ```
*/


lineSpaceX(start, stepSize) {
for (let i = 0; i < this.numPoints; i++) {
 // set x to -num/2:1:+num/2
 this.setX(i, start + stepSize * i);
}
}
/**
* Automatically generate X between -1 and 1
* equal to lineSpaceX(-1, 2/ number of points)
*/


arrangeX() {
this.lineSpaceX(-1, 2 / this.numPoints);
}
/**
* Set a constant value for all Y values in the line
* @param c - constant value
*/


constY(c) {
for (let i = 0; i < this.numPoints; i++) {
 // set x to -num/2:1:+num/2
 this.setY(i, c);
}
}
/**
* Add a new Y values to the end of current array and shift it, so that the total number of the pair remains the same
* @param data - the Y array
*
* @example
* ```typescript
* yArray = new Float32Array([3, 4, 5]);
* line.shiftAdd(yArray);
* ```
*/


shiftAdd(data) {
const shiftSize = data.length;

for (let i = 0; i < this.numPoints - shiftSize; i++) {
 this.setY(i, this.getY(i + shiftSize));
}

for (let i = 0; i < shiftSize; i++) {
 this.setY(i + this.numPoints - shiftSize, data[i]);
}
}
/**
* Add new Y values to the line and maintain the position of the last data point
*/


addArrayY(yArray) {
if (this.currentIndex + yArray.length <= this.numPoints) {
 for (let i = 0; i < yArray.length; i++) {
   this.setY(this.currentIndex, yArray[i]);
   this.currentIndex++;
 }
}
}
/**
* Replace the all Y values of the line
*/


replaceArrayY(yArray) {
if (yArray.length == this.numPoints) {
 for (let i = 0; i < this.numPoints; i++) {
   this.setY(i, yArray[i]);
 }
}
}

}
/**
* Author Danial Chitnis 2019-20
*
* inspired by:
* https://codepen.io/AzazelN28
* https://www.tutorialspoint.com/webgl/webgl_modes_of_drawing.htm
*/

/**
* The main class for the webgl-plot library
*/


class WebglPlot {
/**
* Create a webgl-plot instance
* @param canvas - the canvas in which the plot appears
* @param debug - (Optional) log debug messages to console
*
* @example
*
* For HTMLCanvas
* ```typescript
* const canvas = document.getElementbyId("canvas");
*
* const devicePixelRatio = window.devicePixelRatio || 1;
* canvas.width = canvas.clientWidth * devicePixelRatio;
* canvas.height = canvas.clientHeight * devicePixelRatio;
*
* const webglp = new WebGLplot(canvas);
* ...
* ```
* @example
*
* For OffScreenCanvas
* ```typescript
* const offscreen = htmlCanvas.transferControlToOffscreen();
*
* offscreen.width = htmlCanvas.clientWidth * window.devicePixelRatio;
* offscreen.height = htmlCanvas.clientHeight * window.devicePixelRatio;
*
* const worker = new Worker("offScreenCanvas.js", { type: "module" });
* worker.postMessage({ canvas: offscreen }, [offscreen]);
* ```
* Then in offScreenCanvas.js
* ```typescript
* onmessage = function (evt) {
* const wglp = new WebGLplot(evt.data.canvas);
* ...
* }
* ```
*/
constructor(canvas, options) {
/**
* log debug output
*/
this.debug = false;
this.addLine = this.addDataLine;

if (options == undefined) {
 this.webgl = canvas.getContext("webgl", {
   antialias: true,
   transparent: false
 });
} else {
 this.webgl = canvas.getContext("webgl", {
   antialias: options.antialias,
   transparent: options.transparent,
   desynchronized: options.deSync,
   powerPerformance: options.powerPerformance,
   preserveDrawing: options.preserveDrawing
 });
 this.debug = options.debug == undefined ? false : options.debug;
}

this.log("canvas type is: " + canvas.constructor.name);
this.log(`[webgl-plot]:width=${canvas.width}, height=${canvas.height}`);
this._linesData = [];
this._linesAux = [];
this._thickLines = [];
this._surfaces = []; //this.webgl = webgl;

this.gScaleX = 1;
this.gScaleY = 1;
this.gXYratio = 1;
this.gOffsetX = 0;
this.gOffsetY = 0;
this.gLog10X = false;
this.gLog10Y = false; // Clear the color

this.webgl.clear(this.webgl.COLOR_BUFFER_BIT); // Set the view port

this.webgl.viewport(0, 0, canvas.width, canvas.height);
this._progLine = this.webgl.createProgram();
this.initThinLineProgram(); //https://learnopengl.com/Advanced-OpenGL/Blending

this.webgl.enable(this.webgl.BLEND);
this.webgl.blendFunc(this.webgl.SRC_ALPHA, this.webgl.ONE_MINUS_SRC_ALPHA);
}

get linesData() {
return this._linesData;
}

get linesAux() {
return this._linesAux;
}

get thickLines() {
return this._thickLines;
}

get surfaces() {
return this._surfaces;
}
/**
* updates and redraws the content of the plot
*/


_drawLines(lines) {
const webgl = this.webgl;
lines.forEach(line => {
 if (line.visible) {
   webgl.useProgram(this._progLine);
   const uscale = webgl.getUniformLocation(this._progLine, "uscale");
   webgl.uniformMatrix2fv(uscale, false, new Float32Array([line.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, line.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
   const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
   webgl.uniform2fv(uoffset, new Float32Array([line.offsetX + this.gOffsetX, line.offsetY + this.gOffsetY]));
   const isLog = webgl.getUniformLocation(this._progLine, "is_log");
   webgl.uniform2iv(isLog, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
   const uColor = webgl.getUniformLocation(this._progLine, "uColor");
   webgl.uniform4fv(uColor, [line.color.r, line.color.g, line.color.b, line.color.a]);
   webgl.bufferData(webgl.ARRAY_BUFFER, line.xy, webgl.STREAM_DRAW);
   webgl.drawArrays(line.loop ? webgl.LINE_LOOP : webgl.LINE_STRIP, 0, line.webglNumPoints);
 }
});
}

_drawSurfaces(squares) {
const webgl = this.webgl;
squares.forEach(square => {
 if (square.visible) {
   webgl.useProgram(this._progLine);
   const uscale = webgl.getUniformLocation(this._progLine, "uscale");
   webgl.uniformMatrix2fv(uscale, false, new Float32Array([square.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, square.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
   const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
   webgl.uniform2fv(uoffset, new Float32Array([square.offsetX + this.gOffsetX, square.offsetY + this.gOffsetY]));
   const isLog = webgl.getUniformLocation(this._progLine, "is_log");
   webgl.uniform2iv(isLog, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
   const uColor = webgl.getUniformLocation(this._progLine, "uColor");
   webgl.uniform4fv(uColor, [square.color.r, square.color.g, square.color.b, square.color.a]);
   webgl.bufferData(webgl.ARRAY_BUFFER, square.xy, webgl.STREAM_DRAW);
   webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, square.webglNumPoints);
 }
});
}

_drawTriangles(thickLine) {
const webgl = this.webgl;
webgl.bufferData(webgl.ARRAY_BUFFER, thickLine.xy, webgl.STREAM_DRAW);
webgl.useProgram(this._progLine);
const uscale = webgl.getUniformLocation(this._progLine, "uscale");
webgl.uniformMatrix2fv(uscale, false, new Float32Array([thickLine.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, thickLine.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
webgl.uniform2fv(uoffset, new Float32Array([thickLine.offsetX + this.gOffsetX, thickLine.offsetY + this.gOffsetY]));
const isLog = webgl.getUniformLocation(this._progLine, "is_log");
webgl.uniform2iv(isLog, new Int32Array([0, 0]));
const uColor = webgl.getUniformLocation(this._progLine, "uColor");
webgl.uniform4fv(uColor, [thickLine.color.r, thickLine.color.g, thickLine.color.b, thickLine.color.a]);
webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, thickLine.xy.length / 2);
}

_drawThickLines() {
this._thickLines.forEach(thickLine => {
 if (thickLine.visible) {
   const calibFactor = Math.min(this.gScaleX, this.gScaleY); //const calibFactor = 10;
   //console.log(thickLine.getThickness());

   thickLine.setActualThickness(thickLine.getThickness() / calibFactor);
   thickLine.convertToTriPoints();

   this._drawTriangles(thickLine);
 }
});
}
/**
* Draw and clear the canvas
*/


update() {
this.clear();
this.draw();
}
/**
* Draw without clearing the canvas
*/


draw() {
this._drawLines(this.linesData);

this._drawLines(this.linesAux);

this._drawThickLines();

this._drawSurfaces(this.surfaces);
}
/**
* Clear the canvas
*/


clear() {
//this.webgl.clearColor(0.1, 0.1, 0.1, 1.0);
this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
}
/**
* adds a line to the plot
* @param line - this could be any of line, linestep, histogram, or polar
*
* @example
* ```typescript
* const line = new line(color, numPoints);
* wglp.addLine(line);
* ```
*/


_addLine(line) {
//line.initProgram(this.webgl);
line._vbuffer = this.webgl.createBuffer();
this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, line._vbuffer);
this.webgl.bufferData(this.webgl.ARRAY_BUFFER, line.xy, this.webgl.STREAM_DRAW); //this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, line._vbuffer);

line._coord = this.webgl.getAttribLocation(this._progLine, "coordinates");
this.webgl.vertexAttribPointer(line._coord, 2, this.webgl.FLOAT, false, 0, 0);
this.webgl.enableVertexAttribArray(line._coord);
}

addDataLine(line) {
this._addLine(line);

this.linesData.push(line);
}

addAuxLine(line) {
this._addLine(line);

this.linesAux.push(line);
}

addThickLine(thickLine) {
this._addLine(thickLine);

this._thickLines.push(thickLine);
}

addSurface(surface) {
this._addLine(surface);

this.surfaces.push(surface);
}

initThinLineProgram() {
const vertCode = `
 attribute vec2 coordinates;
 uniform mat2 uscale;
 uniform vec2 uoffset;
 uniform ivec2 is_log;

 void main(void) {
    float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;
    float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;
    vec2 line = vec2(x, y);
    gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);
 }`; // Create a vertex shader object

const vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER); // Attach vertex shader source code

this.webgl.shaderSource(vertShader, vertCode); // Compile the vertex shader

this.webgl.compileShader(vertShader); // Fragment shader source code

const fragCode = `
    precision mediump float;
    uniform highp vec4 uColor;
    void main(void) {
       gl_FragColor =  uColor;
    }`;
const fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
this.webgl.shaderSource(fragShader, fragCode);
this.webgl.compileShader(fragShader);
this._progLine = this.webgl.createProgram();
this.webgl.attachShader(this._progLine, vertShader);
this.webgl.attachShader(this._progLine, fragShader);
this.webgl.linkProgram(this._progLine);
}
/**
* remove the last data line
*/


popDataLine() {
this.linesData.pop();
}
/**
* remove all the lines
*/


removeAllLines() {
this._linesData = [];
this._linesAux = [];
this._thickLines = [];
this._surfaces = [];
}
/**
* remove all data lines
*/


removeDataLines() {
this._linesData = [];
}
/**
* remove all auxiliary lines
*/


removeAuxLines() {
this._linesAux = [];
}
/**
* Change the WbGL viewport
* @param a
* @param b
* @param c
* @param d
*/


viewport(a, b, c, d) {
this.webgl.viewport(a, b, c, d);
}

log(str) {
if (this.debug) {
 console.log("[webgl-plot]:" + str);
}
}

}

/**
* importnat WebglPlot functions
* addLine(line)
* addDataLine(line)
* addAuxLine(line)
* popDataLine()
* removeAllLines()
* linesData() //returns data line obj array
* linesAux() //returns aux line obj array
* removeDataLines()
* removeAuxLines()
* update()
* 
* 
* important WebglLine functions
* setX(i,x)
* setY(j,y)
* constY(c) 
* replaceArrayX(xarr)
* replaceArrayY(yarr)
* arrangeX()
* linSpaceX(start, stepsize);
*/

var WebglLinePlotUtils = /*#__PURE__*/function () {
function WebglLinePlotUtils(canvas) {
var _this = this;

var overlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

_classCallCheck(this, WebglLinePlotUtils);

_defineProperty(this, "updateAllLines", function () {
 var newAmplitudes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
 var linesSPS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
 var autoscale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
 var centerZero = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
 var passed = true;

 var sps = _toConsumableArray(linesSPS);

 newAmplitudes.forEach(function (arr, i) {
   var _this$linesY$i;

   if (arr.length !== ((_this$linesY$i = _this.linesY[i]) === null || _this$linesY$i === void 0 ? void 0 : _this$linesY$i.length)) {
     var _this$linesY$i2;

     //let absmax = WebglLinePlotUtils.absmax(arr);
     if (arr.length > ((_this$linesY$i2 = _this.linesY[i]) === null || _this$linesY$i2 === void 0 ? void 0 : _this$linesY$i2.length)) {
       _this.linesY[i] = WebglLinePlotUtils.downsample(arr, _this.linesY[i].length);
     } else _this.linesY[i] = WebglLinePlotUtils.upsample(arr, _this.linesY[i]);

     sps[i] = Math.ceil(arr.length / _this.nSecGraph);

     if (autoscale) {
       _this.linesY[i] = _this.autoscale(arr, i, _this.nLines, centerZero); //autoscale the array to -1,+1
     }

     passed = false;
   } else {
     if (autoscale) {
       _this.linesY[i] = _this.autoscale(arr, i, _this.nLines, centerZero); //autoscale the array to -1,+1
     } else _this.linesY[i] = arr; //
     //console.log('line set')

   }
 });

 if (!passed) {
   _this.deinitPlot();

   _this.initPlot(newAmplitudes.length, sps); //console.log('reinit');

 }

 if (_this.useOverlay) {
   _this.overlayctx.clearRect(0, 0, _this.overlay.width, _this.overlay.height);

   _this.overlayctx.font = '1em Courier';
   _this.overlayctx.fillStyle = 'white';
 }

 _this.linesY.forEach(function (arr, i) {
   for (var j = 0; j < arr.length; j++) {
     _this.lines[i].setY(j, arr[j]);
   } //now update x-axes and y-axes on the canvas


   if (_this.useOverlay) {
     _this.overlayctx.fillText(_this.lineSettings[i].ymax.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (i + 0.1) / _this.lines.length);

     _this.overlayctx.fillText(_this.lineSettings[i].ymin.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (i + 0.9) / _this.lines.length);
   }
 }); //console.log('lines updated')

});

_defineProperty(this, "updateLine", function () {
 var newAmplitudes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
 var lineSPS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
 var lineIdx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
 var autoscale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
 var centerZero = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

 if (newAmplitudes.length !== lineSPS * _this.nSecGraph) {
   lineSPS = newAmplitudes.length / _this.nSecGraph;
   _this.linesSPS[lineIdx] = lineSPS;

   _this.deinitPlot();

   _this.initPlot(_this.lines.length, _this.linesSPS); //console.log('reinit');

 } //console.log(this.linesY[lineIdx])


 if (newAmplitudes.length !== _this.linesY[lineIdx].length) {
   if (newAmplitudes.length > _this.linesY[lineIdx].length) {
     _this.linesY[lineIdx] = WebglLinePlotUtils.downsample(newAmplitudes, _this.linesY[lineIdx].length); //downsample and autoscale the array to -1,+1
   } else _this.linesY[lineIdx] = WebglLinePlotUtils.upsample(newAmplitudes, _this.linesY[lineIdx]); //upsample and autoscale the array to -1,+1


   if (autoscale) _this.linesY[lineIdx] = _this.autoscale(newAmplitudes, lineIdx, _this.nLines, centerZero); //autoscale the array to -1,+1
   //console.log('resampled', this.linesY[lineIdx]);
 } else {
   if (autoscale) _this.linesY[lineIdx] = _this.autoscale(newAmplitudes, lineIdx, _this.nLines, centerZero); //autoscale the array to -1,+1
   else _this.linesY[lineIdx] = newAmplitudes; //console.log('set lineY[i]', this.linesY[lineIdx]);
 }

 for (var i = 0; i < _this.linesY[lineIdx].length; i++) {
   _this.lines[lineIdx].setY(i, _this.linesY[lineIdx][i]);
 } //now update x-axes and y-axes on the canvas


 if (_this.useOverlay) {
   _this.overlayctx.clearRect(0, _this.overlay.height * lineIdx / _this.lines.length, _this.overlay.width, _this.overlay.height * (lineIdx + 1) / _this.lines.length);

   _this.overlayctx.fillText(_this.lineSettings[lineIdx].ymax.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (lineIdx + 0.1) / _this.lines.length);

   _this.overlayctx.fillText(_this.lineSettings[lineIdx].ymin.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (lineIdx + 0.9) / _this.lines.length);
 } //console.log('line updated', lineIdx);

});

if (!canvas) throw new Error('Supply a canvas to the webgl plot!');
this.canvas = canvas;
this.useOverlay = overlay;
this.overlay;
this.overlayctx;
this.plot = new WebglPlot(canvas);

if (this.useOverlay) {
 this.overlay = document.createElement('canvas');
 this.overlay.style = this.canvas.style; // this.overlay.style.width = this.canvas.style.width;
 // this.overlay.style.height = this.canvas.style.height;

 this.overlay.width = this.canvas.width;
 this.overlay.height = this.canvas.height;
 this.overlay.style.position = 'absolute';
 this.overlay.style.zIndex = this.canvas.style.zIndex + 1; // this.overlay.style.offsetX = this.canvas.style.offsetX;
 // this.overlay.style.offsetY = this.canvas.style.offsetY;

 this.overlayctx = this.overlay.getContext('2d');
 this.canvas.parentNode.insertAdjacentElement('afterbegin', this.overlay);
}

this.lines = []; //array of WebglLine objects

this.linesY = []; //raw data arrays

this.linesSPS = []; // [];

this.axes = [];
this.dividers = [];
this.colors = [];
this.lineSettings = [];
this.axisscalar = 1; // chart axis scalar

this.nLines = 0;
this.nSecGraph = 10; //default

this.nMaxPointsPerSec = 512;
this.animationSpeed = 6.9; //ms
} //autoscale array to -1 and 1


_createClass(WebglLinePlotUtils, [{
key: "autoscale",
value: function autoscale(array) {
 var lineIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
 var nLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
 var centerZero = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
 var max = Math.max.apply(Math, _toConsumableArray(array));
 var min = Math.min.apply(Math, _toConsumableArray(array));
 this.lineSettings[lineIdx].ymax = max;
 this.lineSettings[lineIdx].ymin = min;

 var _lines = 1 / nLines;

 var scalar;

 if (centerZero) {
   var absmax = Math.max(Math.abs(min), Math.abs(max));
   scalar = _lines / absmax;
   return array.map(function (y) {
     return y * scalar + (_lines * (lineIdx + 1) * 2 - 1 - _lines);
   }); //scaled array
 } else {
   scalar = _lines / (max - min);
   return array.map(function (y) {
     return 2 * ((y - min) * scalar - 1 / (2 * nLines)) + (_lines * (lineIdx + 1) * 2 - 1 - _lines);
   }); //scaled array
 }
} //absolute value maximum of array (for a +/- valued array)

}, {
key: "deinitPlot",
value: function deinitPlot() {
 var _this$plot, _this$plot2;

 (_this$plot = this.plot) === null || _this$plot === void 0 ? void 0 : _this$plot.clear();
 (_this$plot2 = this.plot) === null || _this$plot2 === void 0 ? void 0 : _this$plot2.removeAllLines();
}
}, {
key: "HSLToRGB",
value: function HSLToRGB(h, s, l) {
 // Must be fractions of 1
 s /= 100;
 l /= 100;
 var c = (1 - Math.abs(2 * l - 1)) * s,
     x = c * (1 - Math.abs(h / 60 % 2 - 1)),
     m = l - c / 2,
     r = 0,
     g = 0,
     b = 0;

 if (0 <= h && h < 60) {
   r = c;
   g = x;
   b = 0;
 } else if (60 <= h && h < 120) {
   r = x;
   g = c;
   b = 0;
 } else if (120 <= h && h < 180) {
   r = 0;
   g = c;
   b = x;
 } else if (180 <= h && h < 240) {
   r = 0;
   g = x;
   b = c;
 } else if (240 <= h && h < 300) {
   r = x;
   g = 0;
   b = c;
 } else if (300 <= h && h < 360) {
   r = c;
   g = 0;
   b = x;
 }

 r = Math.round((r + m) * 255);
 g = Math.round((g + m) * 255);
 b = Math.round((b + m) * 255);
 return [r, g, b];
} //charts. need to set sample rate and number of seconds, this creates lines with set numbers of coordinates you can update data into

}, {
key: "initPlot",
value: function initPlot() {
 var nLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
 var linesSPS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
 var nSecGraph = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.nSecGraph;
 var nMaxPointsPerSec = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.nMaxPointsPerSec;
 this.nSecGraph = nSecGraph;
 this.nMaxPointsPerSec = nMaxPointsPerSec;
 var xaxisColor = new ColorRGBA(1, 1, 1, 0.3);
 var dividerColor = new ColorRGBA(1, 1, 1, 1); //scale line heights with number of lines

 var axisscalar = 1 / nLines;
 this.nLines = nLines;
 this.lines = [];
 this.linesSPS = linesSPS;

 for (var i = 0; i < nLines; i++) {
   var rgb = this.HSLToRGB(360 * (i / nLines) % 360, 100, 50);
   var color = new ColorRGBA(rgb[0], rgb[1], rgb[2], 1);
   this.colors.push(color);
   var numX = 10;
   if (linesSPS[i] > nMaxPointsPerSec) numX = nSecGraph * nMaxPointsPerSec;else numX = linesSPS[i] * nSecGraph;
   numX = Math.floor(numX);
   var line = new WebglLine(color, numX);
   line.arrangeX();
   this.lines.push(line);

   if (this.linesY.length < this.lines.length) {
     this.linesY.push(new Array(numX));
   }

   this.plot.addDataLine(line);
   var xaxisY = axisscalar * (i + 1) * 2 - 1 - axisscalar; //console.log('lineidx',i);

   var xaxis = new WebglLine(xaxisColor, 2);
   xaxis.constY(xaxisY);
   xaxis.arrangeX();
   xaxis.xy[2] = 1; //console.log('xaxisY',xaxisY,xaxis)

   this.plot.addAuxLine(xaxis);
   this.axes.push(xaxis);

   if (i !== nLines - 1) {
     var dividerY = axisscalar * (i + 1) * 2 - 1;
     var divider = new WebglLine(dividerColor, 2);
     divider.constY(dividerY);
     divider.arrangeX();
     divider.xy[2] = 1; //console.log('dividerY',dividerY,divider)

     this.plot.addAuxLine(divider);
     this.dividers.push(divider);
   }

   this.lineSettings[i] = {
     color: color,
     sps: linesSPS[i],
     ymin: -1,
     ymax: 1
   }; //console.log(i,xaxisY,xaxis)
 }

 if (this.linesY.length > this.lines.length) this.linesY.splice(this.lines.length); //console.log('plot setup', this.lines,this.linesY, this.axes,this.dividers);

 return true;
}
}, {
key: "update",
value: function update() {
 //draw
 this.plot.update();
}
}, {
key: "animate",
value: function animate() {
 var _this2 = this;

 this.update();
 setTimeout(function () {
   requestAnimationFrame(_this2.animate);
 }, this.animationSpeed);
}
}], [{
key: "absmax",
value: function absmax(array) {
 return Math.max(Math.abs(Math.min.apply(Math, _toConsumableArray(array))), Math.max.apply(Math, _toConsumableArray(array)));
} //averages values when downsampling.

}, {
key: "downsample",
value: function downsample(array, fitCount) {
 var scalar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

 if (array.length > fitCount) {
   var output = new Array(fitCount);
   var incr = array.length / fitCount;
   var lastIdx = array.length - 1;
   var last = 0;
   var counter = 0;

   for (var i = incr; i < array.length; i += incr) {
     var rounded = Math.round(i);
     if (rounded > lastIdx) rounded = lastIdx;

     for (var j = last; j < rounded; j++) {
       output[counter] += array[j];
     }

     output[counter] /= (rounded - last) * scalar;
     counter++;
     last = rounded;
   }

   return output;
 } else return array; //can't downsample a smaller array

} //Linear upscaling interpolation from https://stackoverflow.com/questions/26941168/javascript-interpolate-an-array-of-numbers. Input array and number of samples to fit the data to

}, {
key: "upsample",
value: function upsample(array, fitCount) {
 var scalar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

 var linearInterpolate = function linearInterpolate(before, after, atPoint) {
   return (before + (after - before) * atPoint) * scalar;
 };

 var newData = new Array(fitCount);
 var springFactor = new Number((array.length - 1) / (fitCount - 1));
 newData[0] = array[0]; // for new allocation

 for (var i = 1; i < fitCount - 1; i++) {
   var tmp = i * springFactor;
   var before = new Number(Math.floor(tmp)).toFixed();
   var after = new Number(Math.ceil(tmp)).toFixed();
   var atPoint = tmp - before;
   newData[i] = linearInterpolate(array[before], array[after], atPoint);
 }

 newData[fitCount - 1] = array[array.length - 1]; // for new allocation

 return newData;
}
}, {
key: "test",
value: function test(canvasId) {
 var canvas = document.getElementById(canvasId);
 var devicePixelRatio = globalThis.devicePixelRatio || 1;
 canvas.width = canvas.clientWidth * devicePixelRatio;
 canvas.height = canvas.clientHeight * devicePixelRatio;
 var sps = 512;
 var sps2 = 256;
 var nSec = 3;
 var nPointsRenderedPerSec = 512;
 var freq = 1;
 var amp = 0.5;
 var noise = 0.5;
 var line = new Array(sps * nSec);
 var line2 = new Array(sps2 * nSec);
 var plotutil = new WebglLinePlotUtils(canvas);
 plotutil.initPlot(2, [sps, sps2], nSec, nPointsRenderedPerSec);

 function update() {
   var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
   var sps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 512;
   var sec = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
   var len = sps * sec;
   var tincr = sec / len;
   var time = 0;

   for (var i = 0; i < sps * sec; i++) {
     var ySin = Math.sin(Math.PI * time * freq * Math.PI * 2 + performance.now() * 0.001);
     var yNoise = Math.random() - 0.5;
     line[i] = ySin * amp + yNoise * noise;
     time += tincr;
   }
 }

 var newFrame = function newFrame() {
   update(line, sps, nSec);
   update(line2, sps2, nSec); //console.log(line);

   plotutil.updateAllLines([line, line2], [sps, sps2], true);
   plotutil.update();
   requestAnimationFrame(newFrame);
 };

 requestAnimationFrame(newFrame);
}
}]);

return WebglLinePlotUtils;
}();

class TimeSeries$1 extends s$1 {
constructor(props = { seconds: 5, sps: 512 }) {
   super();
   this.data = [];
   this.spss = [];
   this.buffers = [];
   this.updateData = (data) => {
       this.data = data;
   };
   // Only run when changed
   this.init = () => {
       const length = this.data.length;
       let nPointsRenderedPerSec = 60;
       this.sps = this.seconds * nPointsRenderedPerSec;
       // let nPointsRenderedPerSec = Math.ceil(this.seconds / this.sps)
       this.spss = Array.from({ length }, _ => this.sps);
       this.buffers = Array.from({ length }, _ => []);
       this.util.initPlot(length, this.spss, this.seconds, nPointsRenderedPerSec);
   };
   this.clear = () => {
       this.util.plot.clear();
       this.buffers = [];
       this.data = [];
   };
   this.draw = () => {
       // Plot the Lines
       if (this.data.length != this.buffers.length)
           this.init();
       this.data.forEach((data, i) => {
           if (this.buffers[i].length === 0)
               this.buffers[i] = Array.from({ length: this.spss[i] }, _ => data);
           else {
               if (!Array.isArray(data))
                   data = [data];
               data.forEach(() => this.buffers[i].pop());
               this.buffers[i].unshift(...data);
           }
       });
   };
   this.canvas = document.createElement('canvas');
   this.util = new WebglLinePlotUtils(this.canvas, false);
   this.sps = props.sps ?? 512;
   this.seconds = props.seconds ?? 5;
   this.backgroundColor = props.backgroundColor ?? '#69ce2b';
   let newFrame = () => {
       if (this.buffers.length > 0) {
           this.util.updateAllLines(this.buffers, this.spss, true);
           this.util.update();
       }
       requestAnimationFrame(newFrame);
   };
   requestAnimationFrame(newFrame);
}
static get styles() {
   return r$4 `

 canvas{
   background: black;
   width: 100%;
   height: 100%;
 }

 `;
}
static get properties() {
   return {
       data: {
           type: Array,
           reflect: true,
       },
       sps: {
           type: Number,
           reflect: true,
       },
       seconds: {
           type: Number,
           reflect: true,
       },
       backgroundColor: {
           type: String,
           reflect: true,
       },
   };
}
willUpdate(updatedProps) {
   if (updatedProps.has('data'))
       this.draw();
   // if (updatedProps.has('sps')) this.init()
   if (updatedProps.has('seconds')) {
       if (!this.seconds)
           this.seconds = 0.001;
       this.init();
   }
}
render() {
   return this.canvas;
}
}
customElements.define('visualscript-timeseries-stream', TimeSeries$1);

class Spectrogram$1 extends s$1 {
constructor(props = {}) {
   super();
   this.canvas = document.createElement('canvas');
   this.ctx = this.canvas.getContext("2d");
   this.reset = false;
   this.offset = true; //automatic DC offset based on mininum 
   //256 key Chromajs generated color scale from: https://vis4.net/labs/multihue/
   this.colorScale = ['#000000', '#030106', '#06010c', '#090211', '#0c0215', '#0e0318', '#10031b', '#12041f', '#130522', '#140525', '#150628', '#15072c', '#16082f', '#160832', '#160936', '#160939', '#17093d', '#170a40', '#170a44', '#170a48', '#17094b', '#17094f', '#170953', '#170956', '#16085a', '#16085e', '#150762', '#140766', '#140669', '#13066d', '#110571', '#100475', '#0e0479', '#0b037d', '#080281', '#050185', '#020089', '#00008d', '#000090', '#000093', '#000096', '#000099', '#00009c', '#00009f', '#0000a2', '#0000a5', '#0000a8', '#0000ab', '#0000ae', '#0000b2', '#0000b5', '#0000b8', '#0000bb', '#0000be', '#0000c1', '#0000c5', '#0000c8', '#0000cb', '#0000ce', '#0000d1', '#0000d5', '#0000d8', '#0000db', '#0000de', '#0000e2', '#0000e5', '#0000e8', '#0000ec', '#0000ef', '#0000f2', '#0000f5', '#0000f9', '#0000fc', '#0803fe', '#2615f9', '#3520f4', '#3f29ef', '#4830eb', '#4e37e6', '#543ee1', '#5944dc', '#5e49d7', '#614fd2', '#6554cd', '#6759c8', '#6a5ec3', '#6c63be', '#6e68b9', '#6f6db4', '#7072af', '#7177aa', '#717ba5', '#7180a0', '#71859b', '#718996', '#708e91', '#6f928b', '#6e9786', '#6c9b80', '#6aa07b', '#68a475', '#65a96f', '#62ad69', '#5eb163', '#5ab65d', '#55ba56', '#4fbf4f', '#48c347', '#40c73f', '#36cc35', '#34ce32', '#37cf31', '#3ad130', '#3cd230', '#3fd32f', '#41d52f', '#44d62e', '#46d72d', '#48d92c', '#4bda2c', '#4ddc2b', '#4fdd2a', '#51de29', '#53e029', '#55e128', '#58e227', '#5ae426', '#5ce525', '#5ee624', '#60e823', '#62e922', '#64eb20', '#66ec1f', '#67ed1e', '#69ef1d', '#6bf01b', '#6df11a', '#6ff318', '#71f416', '#73f614', '#75f712', '#76f810', '#78fa0d', '#7afb0a', '#7cfd06', '#7efe03', '#80ff00', '#85ff00', '#89ff00', '#8eff00', '#92ff00', '#96ff00', '#9aff00', '#9eff00', '#a2ff00', '#a6ff00', '#aaff00', '#adff00', '#b1ff00', '#b5ff00', '#b8ff00', '#bcff00', '#bfff00', '#c3ff00', '#c6ff00', '#c9ff00', '#cdff00', '#d0ff00', '#d3ff00', '#d6ff00', '#daff00', '#ddff00', '#e0ff00', '#e3ff00', '#e6ff00', '#e9ff00', '#ecff00', '#efff00', '#f3ff00', '#f6ff00', '#f9ff00', '#fcff00', '#ffff00', '#fffb00', '#fff600', '#fff100', '#ffec00', '#ffe700', '#ffe200', '#ffdd00', '#ffd800', '#ffd300', '#ffcd00', '#ffc800', '#ffc300', '#ffbe00', '#ffb900', '#ffb300', '#ffae00', '#ffa900', '#ffa300', '#ff9e00', '#ff9800', '#ff9300', '#ff8d00', '#ff8700', '#ff8100', '#ff7b00', '#ff7500', '#ff6f00', '#ff6800', '#ff6100', '#ff5a00', '#ff5200', '#ff4900', '#ff4000', '#ff3600', '#ff2800', '#ff1500', '#ff0004', '#ff000c', '#ff0013', '#ff0019', '#ff001e', '#ff0023', '#ff0027', '#ff002b', '#ff012f', '#ff0133', '#ff0137', '#ff013b', '#ff023e', '#ff0242', '#ff0246', '#ff0349', '#ff034d', '#ff0450', '#ff0454', '#ff0557', '#ff065b', '#ff065e', '#ff0762', '#ff0865', '#ff0969', '#ff0a6c', '#ff0a70', '#ff0b73', '#ff0c77', '#ff0d7a', '#ff0e7e', '#ff0f81', '#ff1085', '#ff1188', '#ff128c', '#ff138f', '#ff1493'];
   this.data = [];
   this.dynNormalize = true;
   this.init = () => {
       this.ctx.fillStyle = "black";
       this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
       this.offscreenctx.fillStyle = "black";
       this.offscreenctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
   };
   // test = () => {
   //   const length = 100
   //   this.data = Array.from({length}, (_,i) => (i === Math.floor(length*(0.5 + 0.5*Math.sin(Date.now()/1000)))) ? 1 : 0)
   //   setTimeout(this.test, 100)
   // }
   // Helper to Update Data
   this.updateData = (data) => {
       this.data = data;
   };
   this.onresize = () => {
       const width = this.canvas.parentNode?.clientWidth;
       const height = this.canvas.parentNode?.clientHeight;
       if (width) {
           this.canvas.width = this.canvas.parentNode?.clientWidth;
           this.canvas.style.width = width.toString();
       }
       if (height) {
           this.canvas.height = this.canvas.parentNode?.clientHeight;
           this.canvas.style.height = height.toString();
       }
   };
   //Adapted from Spectrogram.js by Miguel Mota https://github.com/miguelmota/spectrogram
   this.draw = () => {
       var width = this.canvas.width;
       var height = Math.floor(this.canvas.height);
       var tempCanvasContext = this.offscreenctx;
       var tempCanvas = tempCanvasContext.canvas;
       tempCanvasContext.drawImage(this.canvas, 0, 0, width, height);
       var data = [...Array.from(this.data)]; //set spectrogram.data = [...newdata]
       if (data.length !== height) { //Fit data to height
           var interp = data;
           data = this.interpolateArray(interp, height);
       }
       var offset = 0;
       if (this.offset === true) {
           offset = Math.pow(10, Math.floor(Math.log10(Math.min(...data))));
       }
       if (this.dynNormalize === true) {
           this.normalizeFactor = 1 / Math.pow(10, Math.floor(Math.log10(Math.max(...data)) + .5));
       }
       for (var i = 0; i < data.length; i++) {
           var value = Math.floor((data[i] - offset) * this.normalizeFactor * 255);
           if (value > 255) {
               value = 255;
           }
           else if (value < 0) {
               value = 0;
           }
           this.ctx.fillStyle = this.colorScale[value];
           this.ctx.fillRect(width - 1, height - i, 1, 1);
       }
       if (this.reset === false) {
           this.ctx.translate(-1, 0);
           // draw prev canvas before translation
           this.ctx.drawImage(tempCanvas, 0, 0, width, height);
           // reset transformation matrix
           this.ctx.setTransform(1, 0, 0, 1, 0, 0);
       }
       else {
           this.reset = false;
       }
   };
   this.max = props.max ?? 1;
   this.normalizeFactor = (props.max) ? 1 / props.max : 1;
   this.backgroundColor = props.backgroundColor ?? '#69ce2b';
   window.addEventListener('resize', () => {
       this.onresize();
   });
   this.offscreen = new OffscreenCanvas(this.canvas.width, this.canvas.height);
   this.offscreenctx = this.offscreen.getContext("2d");
   this.init();
   this.data = props.data ?? new Array(this.canvas.height).fill(0);
   // this.test()
   this.onresize();
}
static get styles() {
   return r$4 `

 canvas{
   background: black;
   width: 100%;
   height: 100%;
 }

 `;
}
static get properties() {
   return {
       max: {
           type: Number,
           reflect: true
       },
       data: {
           type: Array,
           reflect: true
       },
       backgroundColor: {
           type: String,
           reflect: true,
       },
   };
}
willUpdate(changedProps) {
   if (changedProps.has('data'))
       this.draw(); // Only draw on new data
}
//Linear interpolation from https://stackoverflow.com/questions/26941168/javascript-interpolate-an-array-of-numbers
interpolateArray(data, fitCount) {
   var norm = this.canvas.height / data.length;
   var linearInterpolate = function (before, after, atPoint) {
       return (before + (after - before) * atPoint) * norm;
   };
   var newData = new Array();
   var springFactor = new Number((data.length - 1) / (fitCount - 1));
   newData[0] = data[0]; // for new allocation
   for (var i = 1; i < fitCount - 1; i++) {
       var tmp = i * springFactor;
       var beforeNum = new Number(Math.floor(tmp));
       var before = beforeNum.toFixed();
       var after = new Number(Math.ceil(tmp)).toFixed();
       var atPoint = tmp - beforeNum;
       newData[i] = linearInterpolate(data[before], data[after], atPoint);
   }
   newData[fitCount - 1] = data[data.length - 1]; // for new allocation
   return newData;
}
;
render() {
   return this.canvas;
}
}
customElements.define('visualscript-spectrogram-stream', Spectrogram$1);

var index$2 = /*#__PURE__*/Object.freeze({
__proto__: null,
TimeSeries: TimeSeries$1,
Spectrogram: Spectrogram$1
});

var index$1 = /*#__PURE__*/Object.freeze({
__proto__: null,
audio: index$4,
video: index$3,
data: index$2
});

// Note: Inspired by the Red Hat website https://www.redhat.com/en
class Nav extends s$1 {
constructor(props = { brand: {}, primary: { menu: [], options: [] }, secondary: [] }) {
   super();
   this.stringToFunction = (value) => {
       let regex = new RegExp('(|[a-zA-Z]\w*|\([a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\))\s*=>');
       let func = (typeof value === 'string') ? value.substring(0, 8) == 'function' : false;
       let arrow = (typeof value === 'string') ? regex.test(value) : false;
       return (func || arrow) ? (0, eval)('(' + value + ')') : value;
   };
   this.getElement = (o) => {
       if (o.onClick)
           o.onClick = this.stringToFunction(o.onClick); // Convert to function
       switch (o.type) {
           case 'button':
               const button = document.createElement('visualscript-button');
               button.id = o.id;
               button.size = 'small';
               button.onClick = o.onClick ?? (() => { });
               button.innerHTML = o.content;
               return button;
           default:
               return $ `<a href="${o.link}" id=${o.id}  target=${(o.external) ? "_blank" : "_self"} class="decorate">${o.content}</a>`;
       }
   };
   this.primary = props.primary ?? { menu: [], options: [] };
   this.secondary = props.secondary ?? [];
   this.color = props.color ?? 'blue';
   this.brand = props.brand ?? { content: 'My Brand' };
}
static get styles() {
   return r$4 `


:host {
 z-index: 2;
 border-bottom: 1px solid rgb(180,180,180);
 background: white;
 color: black;
 display:flex;
 align-items: center;
 width: 100%;
 grid-area: nav;
 z-index: 100;
 overflow: hidden;
}

header {
 width: 100%;
}

:host * {
 box-sizing: border-box;
}

h1 {
 margin: 0;
}

nav {
 width: 100%;
 padding:  25px;
 display: flex;
 align-items: center;
}

#primary {
 position: sticky; 
 top: 0;
 left: 0;
 max-height: 100px;
 justify-content: space-between;
 font-size: 80%;
}

#primary > * > * {
 flex-grow: 1;
 display: flex;
}

#primary > * {
 height: 100%;
}

#primary > div:lastchild {
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: space-between;
 flex-direction: row-reverse;
}

#menu, #options {
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: flex-end;
}

#secondary {
 height: 50px;
 justify-content: flex-end;
 border-bottom: 1px solid #3d3d3d;
 font-size: 75%;
}

a{
 color: black;
 text-decoration: none;
}

.brand {
 height: 100%;
 padding-right: 15px;
 display: flex;
 align-items: center;
}

a:not(.brand) {
 height: 100%;
 display: flex;
 align-items: center; 
 justify-content: center;
 text-align: center;
}

.decorate {
 padding: 10px 15px;
}

#primary .decorate:hover {
 box-shadow: 0 4px 0 #0fb3ff inset;
}

#secondary .decorate:hover {
 box-shadow: 0 3px 0 #c4c4c4 inset;
}

nav button:last-child {
 margin-right: 0px;
}

@media only screen and (max-width: 800px) {
 #primary #menu {
   display: none;
 }
}

@media (prefers-color-scheme: dark) {
 :host {
   background: #060606;
   color: white;
 }

 a {
   color: white;
 }
}

`;
}
static get properties() {
   return {
       primary: {
           type: Object,
           // reflect: true,
       },
       secondary: {
           type: Array,
           reflect: true,
       },
       brand: {
           type: Object,
       },
       color: {
           type: String,
           reflect: true,
       },
   };
}
willUpdate(changedProps) {
}
render() {
   return $ `
 <header>
 ${(this.secondary.length > 0) ? $ `<nav id="secondary">${this.secondary?.map(o => this.getElement(o))}</nav>` : ``}
 <nav id="primary">
 ${$ `<div><a class="brand" target=${(this.brand.external) ? "_blank" : "_self"} href=${this.brand.link}>${(this.brand.content) ? ((/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.brand.content)) ? $ `<img src="${this.brand.content}"></img>` : $ `<h1>${this.brand.content}</h1><slot></slot>`) : $ `<h1><slot></slot></h1>`}</a></div>`}
   <div>
     <div id="options">
     ${this.primary.options?.map(o => this.getElement(o))}
     </div>
     <div id="menu">
       ${this.primary.menu?.map(o => this.getElement(o))}
     </div>
   </div>

 </nav>
 </header>
`;
}
}
customElements.define('visualscript-nav', Nav);

// Note: Inspired by the Red Hat website https://www.redhat.com/en
class Loader extends s$1 {
constructor(props = {}) {
   super();
   this.progress = props.progress;
   this.color = props.color;
   this.background = props.background ?? '#f3f3f3';
   this.type = props.type ?? 'default';
   this.showPercent = props.showPercent ?? true;
   this.text = props.text;
   this.textBackground = props.textBackground;
   this.textColor = props.textColor;
   this.size = props.size ?? '13px';
   // Conditionally change default color
   if (!this.color) {
       if (this.type === 'default')
           this.color = 'blue';
       else
           this.color = '#7aff80';
   }
}
static get styles() {
   return r$4 `

:host {
 
}

#container {  
 width: 100%;
}

#indicator { 
 width: 100%;
 overflow: hidden;
 animate: 0.5s;
 opacity: 0.7;
}

#indicator > div {
 width: 100%;
 height: 100%;
}

#linear-text {  
 padding: 10px 15px;
 border-top-left-radius: 5px;
 border-top-right-radius: 5px;
 font-size: 75%;
 background: white;
}

.loader-container {
 width: 80px;
 height: 80px;
 position: relative;
 color: #5b5b5b;
}

.loader {
 width: 100%;
 height: 100%;
 border: 4px solid;
 background: white;
 border-right: none;
 border-top: none;
 border-left: none;
 z-index: 2000;
 background-color: transparent;
 border-radius: 100%;
 transform: rotateZ(0);
}

.loader-container > span{
 position: absolute;
 top: 50%;
 left: 50%;
 font-size: 80%;
 transform: translate(-50%, -50%);
 user-select: none;
}

.loader.active {
 opacity: 0.45;
 -webkit-animation: spin 2s linear infinite;
 animation: spin 2s linear infinite;
}

/* @-moz-keyframes spin {  . . . } */


/* @-ms-keyframes spin {  . . . } */


/* @-o-keyframes spin { . . . } */

@-webkit-keyframes spin {
 from {
   transform: rotateZ(0deg) scale(1);
 }
 50% {
   transform: rotateZ(540deg) scale(0.9);
   filter: brightness(50%);        
 }
 to {
   transform: rotateZ(1080deg) scale(1);
 }
}

@keyframes spin {
 from {
   transform: rotateZ(0deg) scale(1);
 }
 50% {
   transform: rotateZ(540deg) scale(0.9);
   filter: brightness(50%);
 }
 to {
   transform: rotateZ(1080deg) scale(1);
 }
}
`;
}
static get properties() {
   return {
       progress: {
           type: Number,
           reflect: true,
       },
       text: {
           type: String,
           reflect: true,
       },
       type: {
           type: String,
           reflect: true,
       },
       color: {
           type: String,
           reflect: true,
       },
       background: {
           type: String,
           reflect: true,
       },
       textBackground: {
           type: String,
           reflect: true,
       },
       textColor: {
           type: String,
           reflect: true,
       },
       size: {
           type: String,
           reflect: true,
       },
   };
}
willUpdate(_) {
   // console.log(changedProps)
   // if (changedProps.has('type')) {
   // }
}
render() {
   const progress = this.progress ?? 0;
   const text = (this.text != undefined) ? this.text : (this.showPercent) ? `${(progress * 100).toFixed(1)}%` : '';
   switch (this.type) {
       case 'linear':
           return $ `
       ${(text) ? $ `<div id="linear-text" style="background: ${this.textBackground}; color: ${this.textColor};">${text}</div>` : ''}
       <div id="indicator" style="height:${this.size}; background:${this.background}; opacity:${(progress === 1) ? 1 : ''};">
           <div style="width:${progress * 100}%; background: ${this.color}"></div>
         </div>
       `;
       default:
           // if (progress < 1) 
           return $ `
       <div class="loader-container" style="height:${this.size}; width:${this.size}; background: ${this.textBackground};">
         ${(text) ? $ `<span style="color: ${this.textColor};">${text}</span>` : ''}
         <div class="loader active" style="border-color: ${this.color};"></div>
       </div>
       `;
   }
}
}
customElements.define('visualscript-loader', Loader);

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$1 = {
ATTRIBUTE: 1,
CHILD: 2,
PROPERTY: 3,
BOOLEAN_ATTRIBUTE: 4,
EVENT: 5,
ELEMENT: 6
},
 e$1 = t => (...e) => ({
_$litDirective$: t,
values: e
});

class i$2 {
constructor(t) {}

get _$AU() {
return this._$AM._$AU;
}

_$AT(t, e, i) {
this._$Ct = t, this._$AM = e, this._$Ci = i;
}

_$AS(t, e) {
return this.update(t, e);
}

update(t, e) {
return this.render(...e);
}

}

/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

const i$1 = e$1(class extends i$2 {
constructor(t) {
var e;
if (super(t), t.type !== t$1.ATTRIBUTE || "style" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
}

render(t) {
return Object.keys(t).reduce((e, r) => {
 const s = t[r];
 return null == s ? e : e + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
}, "");
}

update(e, [r]) {
const {
 style: s
} = e.element;

if (void 0 === this.ct) {
 this.ct = new Set();

 for (const t in r) this.ct.add(t);

 return this.render(r);
}

this.ct.forEach(t => {
 null == r[t] && (this.ct.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = "");
});

for (const t in r) {
 const e = r[t];
 null != e && (this.ct.add(t), t.includes("-") ? s.setProperty(t, e) : s[t] = e);
}

return b;
}

});

class Button extends s$1 {
constructor(props = {}) {
   super();
   this.primary = props.primary;
   this.backgroundColor = props.backgroundColor;
   this.size = props.size;
   this.onClick = props.onClick;
}
static get styles() {
   return r$4 `

.storybook-button {
 font-weight: 700;
 border: 0;
 border-radius: 1em;
 cursor: pointer;
 display: inline-block;
 line-height: 1;
 overflow: hidden;
}

.storybook-button--primary {
 color: white;
 background-color: #1ea7fd;
}
.storybook-button--secondary {
 color: #333;
 background-color: transparent;
 box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
.storybook-button--extra-small {
 font-size: 10px;
 padding: 7px 12px;
}

.storybook-button--small {
 font-size: 12px;
 padding: 10px 16px;
}
.storybook-button--medium {
 font-size: 14px;
 padding: 11px 20px;
}
.storybook-button--large {
 font-size: 16px;
 padding: 12px 24px;
}


@media (prefers-color-scheme: dark) {
 .storybook-button--secondary {
   color: #cccccc;
   background-color: transparent;
   box-shadow: rgba(255, 255, 255, 0.50) 0px 0px 0px 1px inset;
 }
}

`;
}
static get properties() {
   return {
       primary: {
           type: Boolean,
           reflect: true
       },
       backgroundColor: {
           type: String,
           reflect: true
       },
       size: {
           type: String,
           reflect: true
       },
       onClick: {
           type: Function,
           reflect: true
       }
   };
}
willUpdate(_) {
   // console.log(changedProps)
   // if (changedProps.has('type')) {
   // }
}
render() {
   const mode = (this.primary) ? 'storybook-button--primary' : 'storybook-button--secondary';
   return $ `
 <button
      type="button"
       class=${['storybook-button', `storybook-button--${this.size || 'medium'}`, mode].join(' ')}
       style=${i$1({ backgroundColor: this.backgroundColor })}
       @click=${this.onClick}
 >
   <slot>Button</slot>
 </button>
`;
}
}
customElements.define('visualscript-button', Button);

class Modal extends s$1 {
constructor(props = {}) {
   super();
   this.toggle = () => this.open = !this.open;
   this.open = props.open;
   this.header = props.header;
   this.footer = props.footer;
}
static get styles() {
   return r$4 `
/* Modal Header */

:host {

z-index: 101;
}

:host * {
box-sizing: border-box;

}

.modal-header {
padding: 12px 16px;
position: relative;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
border-bottom: 1px solid #e3e3e3;
}

.modal-header span {
font-weight: 800;
font-size: 120%;
}


/* Modal Body */
.modal-body {
padding: 16px;
overflow: scroll;
width: 100%;
flex-grow: 1;
}

/* Modal Footer */
.modal-footer {
border-top: 1px solid #e3e3e3;
padding: 12px 16px;
width: 100%;
}

.modal-footer span {
font-size: 80%;
}

/* Modal Content */
.modal-content {

position: absolute;
bottom: 50%;
left: 50%;
transform: translate(-50%, 50%);

background-color: #fefefe;
margin: auto;
border-radius: 4px;
padding: 0;
width: 80vw;
height: 80vh;
box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
transition: opacity 0.5s;
display: flex; 
align-items: center;
justify-content: space-between;
flex-direction: column;
pointer-events: none;
z-index: 102;
opacity: 0;
}

.modal-content.open {
opacity: 1;
pointer-events: all;
}

`;
}
static get properties() {
   return {
       open: {
           type: Boolean,
           reflect: true
       },
       header: {
           type: Object,
           reflect: true
       },
       footer: {
           type: String,
           reflect: true
       },
   };
}
willUpdate(_) {
   // console.log(changedProps)
   // if (changedProps.has('type')) {
   // }
}
render() {
   return $ `
 <div class="modal-content ${this.open ? 'open' : ''}">
 <div class="modal-header">
     <span>${this.header}</span>
     <visualscript-button secondary size="extra-small" @click="${this.toggle}">Close</visualscript-button>
   </div>
   <div class="modal-body">
     <slot>No content</slot>
   </div>
   ${(this.footer) ? $ `<div class="modal-footer">
     <span>${this.footer}</span>
   </div>` : ''}
 </div>
 <visualscript-overlay .open=${this.open}></visualscript-overlay>
`;
}
}
customElements.define('visualscript-modal', Modal);

class Footer extends s$1 {
static get styles() {
   return r$4 `

:host {
 padding: 25px;
 border-top: 1px solid rgb(180,180,180);
 background: white;
 color: black;
 display:flex;
 align-items: center;
 width: 100%;
 font-size: 70%;
 box-sizing: border-box;
 z-index: 100;
 grid-area: foot;
}

:host * {
 box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
 :host {
   background: #060606;
   color: white;
 }

 a {
   color: white;
 }
}
`;
}
static get properties() {
   return {};
}
constructor(props = {}) {
   super();
}
render() {
   return $ `

 <slot></slot>
`;
}
}
customElements.define('visualscript-footer', Footer);

class Overlay extends s$1 {
constructor(props = {}) {
   super();
   this.open = false;
   this.open = props.open ?? false;
}
static get styles() {
   return r$4 `

div {
 opacity: 0;
 width: 100vw;
 height: 100vh;
 transition: 0.5s;
 position: fixed;
 top: 0;
 left: 0;
 pointer-events: none;
 z-index: 50;
 color: black;
 background: rgb(255,255, 255, 0.7);
}


div[open] {
 opacity: 1;
 pointer-events: all;
 backdrop-filter: blur(3px);
}

@media (prefers-color-scheme: dark) {
 div {
   color: white;
   background: rgb(0,0,0, 0.5);
 }
}

`;
}
static get properties() {
   return {
       open: {
           type: Boolean,
           reflect: true,
       }
   };
}
render() {
   return $ `
 <div ?open=${this.open ? true : false}>
   <slot></slot>
 </div>
`;
}
}
customElements.define('visualscript-overlay', Overlay);

/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

var n$2;
null != (null === (n$2 = window.HTMLSlotElement) || void 0 === n$2 ? void 0 : n$2.prototype.assignedElements) ? (o, n) => o.assignedElements(n) : (o, n) => o.assignedNodes(n).filter(o => o.nodeType === Node.ELEMENT_NODE);

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");

/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

const o$1 = e$1(class extends i$2 {
constructor(t) {
var i;
if (super(t), t.type !== t$1.ATTRIBUTE || "class" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
}

render(t) {
return " " + Object.keys(t).filter(i => t[i]).join(" ") + " ";
}

update(i, [s]) {
var r, o;

if (void 0 === this.et) {
 this.et = new Set(), void 0 !== i.strings && (this.st = new Set(i.strings.join(" ").split(/\s/).filter(t => "" !== t)));

 for (const t in s) s[t] && !(null === (r = this.st) || void 0 === r ? void 0 : r.has(t)) && this.et.add(t);

 return this.render(s);
}

const e = i.element.classList;
this.et.forEach(t => {
 t in s || (e.remove(t), this.et.delete(t));
});

for (const t in s) {
 const i = !!s[t];
 i === this.et.has(t) || (null === (o = this.st) || void 0 === o ? void 0 : o.has(t)) || (i ? (e.add(t), this.et.add(t)) : (e.remove(t), this.et.delete(t)));
}

return b;
}

});

const PersistableProps = {
label: {
   type: String,
   reflect: true
},
persist: {
   type: Boolean,
   reflect: true
},
value: {
   type: String,
   reflect: true
},
onChange: {
   type: Function,
   reflect: true
}
};
const setPersistent = (o) => {
if (o.persist && o.label)
   localStorage.setItem(o.label, String(o.value));
};
const getPersistent = (props) => {
if (props.value)
   return props.value;
else if (props.persist && props.label) {
   const val = localStorage.getItem(props.label);
   if (val === 'null')
       return null;
   else if (val === 'undefined')
       return undefined;
   else
       return val;
}
};

class Input extends s$1 {
constructor(props = {}) {
   super();
   this.value = props.value ?? "";
   this.outline = props.outline ?? false;
   this.disabled = props.disabled ?? false;
   this.label = props.label;
   this.persist = props.persist;
   this.onChange = props.onChange;
   this.onInput = props.onInput;
   const val = getPersistent(props);
   if (val)
       this.value = val;
}
// properties getter
static get properties() {
   return Object.assign(PersistableProps, {
       disabled: { type: Boolean, reflect: true },
       outline: { type: Boolean, reflect: true },
   });
}
willUpdate(changedProps) {
   if (changedProps.has('value'))
       setPersistent(this);
}
static get styles() {
   return r$4 `

   :host {
       width: 100%;
       font-size: 15px;

   }
*{
box-sizing: border-box;
}
.form-group {
position: relative;
margin: 15px 0;
}
input.outline {
border: 1px solid  #333333;
border-radius: 5px;
}
label {
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
color: gray;
padding: 0 0.3rem;
margin: 0 0.5rem;
transition: 0.1s ease-out;
transform-origin: left top;
pointer-events: none;
}
input {
outline: none;
border: none;
border-radius: 0px;
padding: 15px 0.6rem 10px 0.6rem;
transition: 0.1s ease-out;
border-bottom: 1px solid  #333333;
background: transparent;
cursor: text;
margin-left: auto;
width: 95%;
margin-right: auto;
}
input::placeholder {
color: transparent;
}
input:focus{
border-color:  #b949d5;
}
input:focus + label{
color:  #b949d5;
top: 0;
transform: translateY(-50%) scale(0.9);
}
input:not(:placeholder-shown) + label{
top: 0;
transform: translateY(-50%) scale(0.9);
}
input:focus:not(.outline) ~ label,
input:not(:placeholder-shown):not(.outline) ~ label
{
padding-left: 0px;
}
input:disabled,  input:disabled ~ .label {
opacity: 0.5;
}

@media (prefers-color-scheme: dark) {
label {
 color: rgb(120,120,120);
}
}
`;
}
render() {
   return $ `
       <div class="form-group">
           <input
           class=${o$1({
       outline: this.outline
   })}
           type="${this.type}"
           placeholder="${this.label}"
           .value=${(this.value != 'null' && this.value != 'undefined') ? this.value : ''}
           ?disabled="${this.disabled}"

           @change=${(ev) => {
       this.value = ev.target.value;
       if (this.onChange instanceof Function)
           this.onChange(ev);
   }}

           @input=${(ev) => {
       if (this.onInput instanceof Function)
           this.onInput(ev);
   }}
           />
           <label>${this.label}</label>
       </div>
   `;
}
}
customElements.define("visualscript-input", Input);

class Search extends s$1 {
constructor(props = {}) {
   super();
   this.getModal = () => {
       return this.shadowRoot.querySelector('visualscript-modal');
   };
   if (props.items)
       this.items = props.items;
   window.onkeydown = (ev) => {
       switch (ev.code) {
           case 'Enter':
               this.modal.open = false;
               break;
           case 'ArrowUp':
               console.log('Up!');
               break;
           case 'ArrowDown':
               console.log('Down!');
               break;
           case 'Escape':
               this.modal.open = false;
               break;
       }
   };
}
static get styles() {
   return r$4 `

:host {
 display: flex;
 align-items: center;
 padding: 10px;
}

:host * {
 
 box-sizing: border-box;
 
}

button {
 padding: 5px;
 border-radius: 5px;
}

`;
}
static get properties() {
   return {
       placeholder: {
           type: String
       },
       items: {
           type: Object,
           // reflect: true
       },
       value: {
           type: String,
           reflect: true
       }
   };
}
render() {
   const regex = new RegExp(this.value, 'i');
   return $ `
   <visualscript-button @click=${() => {
       this.modal = this.getModal();
       this.modal.toggle();
   }}>Search</visualscript-button>
   <visualscript-modal 
     .header=${$ `<visualscript-input label="Search" @input=${(ev) => {
       this.value = ev.composedPath()[0].value;
   }}></visualscript-input>`}
     .footer=${$ `<div id=commands>Enter to select. Up and Down Arrows to navigate. Esc to close.</div>`}
   >
   <div>${this.items.map(i => {
       let matched = false;
       if (this.value) {
           if (i.tags)
               i.tags.forEach((v) => { if (v.match(regex))
                   matched = true; });
           if (i.name.match(regex))
               matched = true;
       }
       else
           matched = true;
       if (matched)
           return $ `<div><h3>${i.name}</h3><small>${i.tags ?? 'No Tags'}</small></div>`;
   })}</div>
   </visualscript-modal>
 `;
}
}
customElements.define('visualscript-search', Search);

/*
Largely from https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/

Features to make the selectCustom work for mouse users.

- Toggle custom select visibility when clicking the "box"
- Update custom select value when clicking in a option
- Navigate through options when using keyboard up/down
- Pressing Enter or Space selects the current hovered option
- Close the select when clicking outside of it
- Sync both selects values when selecting a option. (native or custom)

*/
class Select extends s$1 {
constructor(props = {}) {
   super();
   this.persist = false;
   this.optionChecked = "";
   this.optionHoveredIndex = -1;
   this.options = [];
   this.onChange = () => { };
   this.add = (option) => {
       this.options = [...this.options, option];
   };
   this.openSelectCustom = () => {
       this.elements.elSelectCustom.classList.add("isActive");
       // Remove aria-hidden in case this was opened by a user
       // who uses AT (e.g. Screen Reader) and a mouse at the same time.
       this.elements.elSelectCustom.setAttribute("aria-hidden", 'false');
       if (this.optionChecked) {
           const optionCheckedIndex = this.elements.customOptsList.findIndex((el) => el.getAttribute("data-value") === this.optionChecked);
           this.updateCustomSelectHovered(optionCheckedIndex);
       }
       // Add related event listeners
       // document.addEventListener("click", this.watchClickOutside);
       document.addEventListener("keydown", this.supportKeyboardNavigation);
   };
   this.closeSelectCustom = () => {
       this.elements.elSelectCustom.classList.remove("isActive");
       this.elements.elSelectCustom.setAttribute("aria-hidden", 'true');
       this.updateCustomSelectHovered(-1);
       // Remove related event listeners
       // document.removeEventListener("click", this.watchClickOutside);
       document.removeEventListener("keydown", this.supportKeyboardNavigation);
   };
   this.updateCustomSelectHovered = (newIndex) => {
       const prevOption = this.elements.elSelectCustomOpts.children[this.optionHoveredIndex];
       const option = this.elements.elSelectCustomOpts.children[newIndex];
       if (prevOption) {
           prevOption.classList.remove("isHover");
       }
       if (option) {
           option.classList.add("isHover");
       }
       this.optionHoveredIndex = newIndex;
   };
   this.updateCustomSelectChecked = (value, text) => {
       if (this.elements) {
           if (!text)
               text = this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0]?.textContent;
           const prevValue = this.optionChecked;
           const elPrevOption = this.elements.elSelectCustomOpts.querySelector(`[data-value="${prevValue}"`);
           const elOption = this.elements.elSelectCustomOpts.querySelector(`[data-value="${value}"`);
           if (elPrevOption) {
               elPrevOption.classList.remove("isActive");
           }
           if (elOption) {
               elOption.classList.add("isActive");
           }
           const elSelectCustomBox = this.elements.elSelectCustom.children[0].children[0];
           elSelectCustomBox.textContent = text;
           this.optionChecked = value;
       }
   };
   this.watchClickOutside = (e) => {
       const didClickedOutside = !this.contains(e.target);
       if (didClickedOutside) {
           this.closeSelectCustom();
       }
   };
   this.supportKeyboardNavigation = (e) => {
       // TODO: Move these to globals and check existence
       // press down -> go next
       if (e.keyCode === 40 && this.optionHoveredIndex < this.optionsCount - 1) {
           this.optionHoveredIndex;
           e.preventDefault(); // prevent page scrolling
           this.updateCustomSelectHovered(this.optionHoveredIndex + 1);
       }
       // press up -> go previous
       if (e.keyCode === 38 && this.optionHoveredIndex > 0) {
           e.preventDefault(); // prevent page scrolling
           this.updateCustomSelectHovered(this.optionHoveredIndex - 1);
       }
       // press Enter or space -> select the option
       if (e.keyCode === 13 || e.keyCode === 32) {
           e.preventDefault();
           const option = this.elements.elSelectCustomOpts.children[this.optionHoveredIndex];
           const value = option && option.getAttribute("data-value");
           if (value) {
               this.elements.elSelectNative.value = value;
               this.updateCustomSelectChecked(value, option.textContent);
           }
           this.closeSelectCustom();
       }
       // press ESC -> close selectCustom
       if (e.keyCode === 27) {
           this.closeSelectCustom();
       }
   };
   this.options = props.options ?? [];
   if (props.onChange)
       this.onChange = props.onChange;
   if (props.label)
       this.label = props.label;
   if (props.persist)
       this.persist = props.persist;
   const val = getPersistent(props);
   // Only Use Cached Value if Included In Options
   if (val && this.options.includes(val))
       this.value = val;
}
static get styles() {
   return r$4 `

#container { 
 position: relative;
}

:host * {
 box-sizing: border-box;
}

.selectNative, .selectCustom {
 position: relative;
 width: 100%;
 font-size: 15px;
}


.selectCustom {
 position: absolute;
 top: 0;
 left: 0;
 display: none;
 background: white;
}

.selectNative:focus,
.selectCustom.isActive .selectCustom-trigger {
 outline: none;
 box-shadow: white 0 0 5px 2px;
}


.select {
 position: relative;
}

.selectLabel {
 display: block;
 font-weight: bold;
 margin-bottom: 0.4rem;
}

.selectNative, .selectCustom-trigger {
 border: 1px solid #6f6f6f;
 border-radius: 0.4rem;
}

.selectNative {
 -webkit-appearance: none;
 -moz-appearance: none;
 background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
 background-repeat: no-repeat;
 background-position-x: 100%;
 background-position-y: 0.45rem;
 padding: 10px 10px;
}

.selectCustom-trigger  > div {
 overflow: scroll;
 white-space: nowrap;
}

.selectCustom-trigger {
 display: flex;
 align-items: center;
 position: relative;
 padding: 0px 10px;
 width: 100%;
 height: 100%;
 cursor: pointer;
}

.selectCustom-trigger::after {
 content: "▾";
 position: absolute;
 top: 0;
 line-height: 3.2rem;
 right: 0.5rem;
}

.selectCustom-trigger:hover {
 border-color: #028ee6;
}

.selectCustom-options {
 position: absolute;
 top: calc(2.8rem + 0.8rem);
 left: 0;
 width: 100%;
 border: 1px solid #6f6f6f;
 border-radius: 0.4rem;
 background-color: whitesmoke;
 box-shadow: 0 0 4px #e9e1f8;
 z-index: 1;
 padding: 0.8rem 0;
 display: none;
}

.selectCustom.isActive .selectCustom-options {
 display: block;
}

.selectCustom-option {
 position: relative;
 padding: 0.8rem;
 padding-left: 2.5rem;
 font-size: 80%;
}

.selectCustom-option.isHover,
.selectCustom-option:hover {
 background-color: #1ea7fd; // contrast AA
 color: white;
 cursor: default;
}

.selectCustom-option:not(:last-of-type)::after {
 content: "";
 position: absolute;
 bottom: 0;
 left: 0;
 width: 100%;
 border-bottom: 1px solid #d3d3d3;
}

.selectCustom-option.isActive::before {
 content: "✓";
 position: absolute;
 left: 0.8rem;
}


/* This makes the Custom Select work... 
 Issues: Doesn't work inside of another component (e.g. Control), it clicks on that instead
@media (hover: hover) {
 
 .selectCustom {
   display: block;
 }

 .selectNative:focus + .selectCustom {
   display: none;
 }
}
*/

@media (prefers-color-scheme: dark) {
 .selectCustom {
   background: rgb(59, 59, 59);
 }

 .selectNative {
   background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
 }

 .selectCustom-options {
   background: rgb(45, 45, 45);
 }
}
`;
}
static get properties() {
   return Object.assign({
       options: {
           type: Array,
           reflect: true
       }
   }, PersistableProps);
}
willUpdate(changedProps) {
   if (changedProps.has('value'))
       setPersistent(this);
   if (changedProps.has('options')) {
       const firstOption = (this.options[0]?.value ?? this.options[0]);
       this.value = this.value ?? firstOption;
   }
}
updated(changedProperties) {
   const elSelectNative = this.shadowRoot.querySelectorAll(".js-selectNative")[0];
   const elSelectCustom = this.shadowRoot.querySelectorAll(".js-selectCustom")[0];
   const elSelectCustomOpts = elSelectCustom.children[1];
   const customOptsList = Array.from(elSelectCustomOpts.children);
   this.optionsCount = customOptsList.length;
   this.elements = {
       elSelectNative,
       elSelectCustom,
       elSelectCustomOpts,
       customOptsList,
   };
   if (this.value)
       this.updateCustomSelectChecked(this.value);
}
render() {
   return $ `
 <div id=container>
 <select class="selectNative js-selectNative" aria-labelledby="${this.label}Label" 
 @change=${(e) => {
       // Update selectCustom value when selectNative is changed.
       const value = e.target.value;
       const elRespectiveCustomOption = this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0];
       this.updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
       // Original
       this.value = e.target.value;
       this.onChange(e); // forward change
   }}>
 ${(this.options.length === 0) ? $ `<slot></slot>` : this.options.map((o, i) => {
       if (typeof o != 'object')
           o = { value: o, text: o };
       return $ `<option 
     value=${o.value} 
     ?selected=${(o.value === this.value)} 
     >
       ${o.text}
     </option>`;
   })}
</select>

<div class="selectCustom js-selectCustom" aria-hidden="true"}>
 <div class="selectCustom-trigger" @click=${(e) => {
       const isClosed = !e.target.parentNode.classList.contains("isActive");
       if (isClosed) {
           this.openSelectCustom();
       }
       else {
           this.closeSelectCustom();
       }
   }}>
   <div></div>
 </div>
   <div class="selectCustom-options">
   ${this.options.map((o, i) => {
       if (typeof o != 'object')
           o = { value: o, text: o };
       return $ ` <div 
     class="selectCustom-option" 
     data-value=${o.value}
     @mouseenter=${(e) => {
           this.updateCustomSelectHovered(i);
       }}
     @click=${(e) => {
           const value = e.target.getAttribute("data-value");
           // Sync native select to have the same value
           this.elements.elSelectNative.value = value;
           this.updateCustomSelectChecked(value, e.target.textContent);
           this.closeSelectCustom();
       }}
     >
       ${o.text}
     </div>`;
   })}
     </div>
   </div>
 </div>
</div>
`;
}
}
customElements.define('visualscript-select', Select);

class File extends s$1 {
constructor(props = {}) {
   super();
   this.onChange = () => { };
   if (props.accept)
       this.accept = props.accept;
   if (props.onChange)
       this.onChange = props.onChange;
   if (props.webkitdirectory)
       this.webkitdirectory = props.webkitdirectory;
   if (props.directory)
       this.directory = props.directory;
   if (props.multiple)
       this.multiple = props.multiple;
}
static get styles() {
   return r$4 `

:host {
 display: flex;
 justify-content: center;
 overflow: hidden;
}

input[type=file] {
 display: none;
}

:host * {
 box-sizing: border-box;
}

button {
 flex: auto;
 padding: 8px 12px;
 border-top-left-radius: 5px;
 border-bottom-left-radius: 5px;
 border: none;  
 color: #ffffff;
 background-color: #1ea7fd;
 width: 100%;
 cursor: pointer;    
 /* white-space: nowrap; */
 font-weight: bold;
}

.hide {
 position: absolute;
 width: 1px;
 height: 1px;
 padding: 0;
 margin: -1px;
 overflow: hidden;
 clip: rect(0,0,0,0);
 border: 0;
}

input[type=text] {
 flex-grow: 1;
 padding: 10px;
 border-top-right-radius: 5px;
 border-bottom-right-radius: 5px;
 border: none;
 overflow: hidden;
}

input[type=text] {
 flex-grow: 1;
 padding: 8px 8px;
 border-top-right-radius: 5px;
 border-bottom-right-radius: 5px;
 border: none;
 color: black;
 background-color: white;
}

@media (prefers-color-scheme: dark) {
 input[type=text] {
   color: white;
   background-color: rgb(59, 59, 59);
 }
}

`;
}
static get properties() {
   return {
       accept: {
           type: String,
           reflect: true
       },
       onChange: {
           type: Function,
           reflect: true
       },
       webkitdirectory: {
           type: Boolean,
           reflect: true
       },
       directory: {
           type: Boolean,
           reflect: true
       },
       multiple: {
           type: Boolean,
           reflect: true
       },
   };
}
render() {
   const input = document.createElement('input');
   input.type = 'file';
   input.id = 'fileupload';
   input.accept = this.accept;
   input.webkitdirectory = this.webkitdirectory;
   input.directory = this.directory;
   input.multiple = this.multiple;
   input.onchange = (ev) => {
       const lenFiles = ev.target.files.length;
       const fileUploaded = ev.target.files[0];
       const input = this.shadowRoot.querySelector('input[type=text]');
       var filename = (lenFiles === 1) ? fileUploaded.name : `${lenFiles} files`;
       input.value = filename;
       input.placeholder = filename;
       input.focus();
       this.onChange(ev);
   };
   return $ `
 <label for="fileupload" id="buttonlabel">
   <button aria-controls="filename" tabindex="0" @click=${() => {
       if (input)
           input.click();
   }}>Choose File</button>
 </label>
 ${input}
 <label for="filename" class="hide">
   uploaded file
 </label>
 <input type="text" id="filename" autocomplete="off" readonly placeholder="no file chosen">  
`;
}
}
customElements.define('visualscript-file', File);

class Switch extends s$1 {
constructor(props = {}) {
   super();
   this.persist = false;
   this.onChange = () => { };
   if (props.onChange)
       this.onChange = props.onChange;
   if (props.label)
       this.label = props.label;
   if (props.persist)
       this.persist = props.persist;
   // Inside Control
   const val = getPersistent(props);
   if (val)
       this.value = val;
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

[role="switch"] {  
 position: relative;
 border-radius: 0.5rem;
 padding: 1em 2em;
 cursor: pointer;
 background-color: white;
 border: none;
 border-radius: 14px;
 -webkit-transition: .4s;
 transition: .4s;
}

[role="switch"] * {
 pointer-events: none;
}


[role="switch"][aria-pressed="true"] {
 background-color: #1ea7fd;
}

[role="switch"][aria-pressed="true"] > .slider{
 -webkit-transform: translateY(-50%) translateX(100%);
 -ms-transform: translateY(-50%) translateX(100%);
 transform: translateY(-50%) translateX(100%);
}

/* Remove the default outline and 
add the outset shadow */  
[aria-pressed]:focus {
 outline: none;
 box-shadow: white 0 0 5px 2px;
}

/* The slider */
.slider {
 padding: 3px;
 position: absolute;
 cursor: pointer;
 top: 50%;
 left: 0;
 -webkit-transform: translateY(-50%);
 -ms-transform: translateY(-50%);
 transform: translateY(-50%);
 -webkit-transition: .4s;
 transition: .4s;
 height: 100%;
 aspect-ratio: 1/1;
}
.slider > * {
 background-color: #ccc;
 width: 100%;
 height: 100%;
}

/* Rounded sliders */
.slider.round > * {
 border-radius: 34px;
}

`;
}
static get properties() {
   return PersistableProps;
}
willUpdate(changedProps) {
   if (changedProps.has('value'))
       setPersistent(this);
}
render() {
   return $ `
 <button class="switch" role="switch" aria-pressed="${String(this.value)}" aria-labelledby=${this.label} @click=${(e) => {
       let pressed = e.target.getAttribute('aria-pressed') === 'true';
       this.value = !pressed;
       e.target.setAttribute('aria-pressed', String(this.value));
       this.onChange(e);
   }}>
   <div class="slider round"><div></div></div>
</button>
`;
}
}
customElements.define('visualscript-switch', Switch);

class Range extends s$1 {
constructor(props = {}) {
   super();
   this.persist = false;
   this.value = 0;
   this.min = 0;
   this.max = 100;
   this.onChange = () => { };
   this.onInput = () => { };
   if (props.onChange)
       this.onChange = props.onChange;
   if (props.label)
       this.label = props.label;
   if (props.persist)
       this.persist = props.persist;
   if (props.min)
       this.min = props.min;
   if (props.max)
       this.max = props.max;
   const val = getPersistent(props);
   if (val)
       this.value = val;
}
static get styles() {
   return r$4 `

:host {
 width: 100%;
 height: 100%;
}

:host * {
 box-sizing: border-box;
}

.wrapper {
 position: relative;
 width: 100%;
 height: 100%;
}

input[type="range"] {
 -webkit-appearance: none;
 position: relative;
 overflow: hidden;
 height: 30%;
 width: 100%;
 cursor: pointer;
 border: none;
 margin: 0;
}

output {
 position: absolute; 
 user-select: none; 
 pointer-events: none; 
 z-index: 1;
 top: 50%;
 left: 10px;
 transform: translate(0%, calc(-50% - 0.12rem));
 font-size: 80%;
}

input[type="range"]::-webkit-slider-runnable-track {
}

input[type="range"]::-webkit-slider-thumb {
 -webkit-appearance: none;
 width: 0; /* 1 */
 height: 20px;
 box-shadow: -100vw 0 0 100vw #1ea7fd;
 opacity: 0.9;
 transition: opacity 0.5s;
}

input[type="range"]:hover::-webkit-slider-thumb{
 opacity: 1;
}

input[type="range"]::-moz-range-track {

}

.visually-hidden { 
   position: absolute !important;
   height: 1px; 
   width: 1px;
   overflow: hidden;
   clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
   clip: rect(1px, 1px, 1px, 1px);
   white-space: nowrap; /* added line */
}

`;
}
static get properties() {
   return Object.assign(PersistableProps, {
       min: {
           type: Number,
           reflect: true
       },
       max: {
           type: Number,
           reflect: true
       }
   });
}
willUpdate(changedProps) {
   if (changedProps.has('value'))
       setPersistent(this);
}
render() {
   return $ `
 <div class="wrapper">
   <input type="range" min="${this.min}" max="${this.max}" id="${this.label}" @change=${(ev) => {
       this.value = ev.target.value;
       this.onChange(ev);
   }} @input=${(ev) => {
       this.onInput(ev);
   }}/>
   <output for="${this.label}">${this.value}</output>
   <label class="visually-hidden" for="${this.label}">${this.label}</label>
 </div>
`;
}
}
customElements.define('visualscript-range', Range);

/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

const t = o => null === o || "object" != typeof o && "function" != typeof o,
 r$1 = o => void 0 === o.strings;

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

const e = (i, t) => {
var s, o;
const n = i._$AN;
if (void 0 === n) return !1;

for (const i of n) null === (o = (s = i)._$AO) || void 0 === o || o.call(s, t, !1), e(i, t);

return !0;
},
 o = i => {
let t, s;

do {
if (void 0 === (t = i._$AM)) break;
s = t._$AN, s.delete(i), i = t;
} while (0 === (null == s ? void 0 : s.size));
},
 n$1 = i => {
for (let t; t = i._$AM; i = t) {
let s = t._$AN;
if (void 0 === s) t._$AN = s = new Set();else if (s.has(i)) break;
s.add(i), l(t);
}
};

function r(i) {
void 0 !== this._$AN ? (o(this), this._$AM = i, n$1(this)) : this._$AM = i;
}

function h$1(i, t = !1, s = 0) {
const n = this._$AH,
   r = this._$AN;
if (void 0 !== r && 0 !== r.size) if (t) {
if (Array.isArray(n)) for (let i = s; i < n.length; i++) e(n[i], !1), o(n[i]);else null != n && (e(n, !1), o(n));
} else e(this, i);
}

const l = i => {
var t, e, o, n;
i.type == t$1.CHILD && (null !== (t = (o = i)._$AP) && void 0 !== t || (o._$AP = h$1), null !== (e = (n = i)._$AQ) && void 0 !== e || (n._$AQ = r));
};

class d extends i$2 {
constructor() {
super(...arguments), this._$AN = void 0;
}

_$AT(i, t, s) {
super._$AT(i, t, s), n$1(this), this.isConnected = i._$AU;
}

_$AO(i, t = !0) {
var s, n;
i !== this.isConnected && (this.isConnected = i, i ? null === (s = this.reconnected) || void 0 === s || s.call(this) : null === (n = this.disconnected) || void 0 === n || n.call(this)), t && (e(this, i), o(this));
}

setValue(t) {
if (r$1(this._$Ct)) this._$Ct._$AI(t, this);else {
 const i = [...this._$Ct._$AH];
 i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
}
}

disconnected() {}

reconnected() {}

}

/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

class s {
constructor(t) {
this.U = t;
}

disconnect() {
this.U = void 0;
}

reconnect(t) {
this.U = t;
}

deref() {
return this.U;
}

}

class i {
constructor() {
this.Y = void 0, this.q = void 0;
}

get() {
return this.Y;
}

pause() {
var t;
null !== (t = this.Y) && void 0 !== t || (this.Y = new Promise(t => this.q = t));
}

resume() {
var t;
null === (t = this.q) || void 0 === t || t.call(this), this.Y = this.q = void 0;
}

}

/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/

const n = t$1 => !t(t$1) && "function" == typeof t$1.then;

class h extends d {
constructor() {
super(...arguments), this._$Cwt = 1073741823, this._$Cyt = [], this._$CG = new s(this), this._$CK = new i();
}

render(...s) {
var i;
return null !== (i = s.find(t => !n(t))) && void 0 !== i ? i : b;
}

update(s, i) {
const r = this._$Cyt;
let e = r.length;
this._$Cyt = i;
const o = this._$CG,
     h = this._$CK;
this.isConnected || this.disconnected();

for (let t = 0; t < i.length && !(t > this._$Cwt); t++) {
 const s = i[t];
 if (!n(s)) return this._$Cwt = t, s;
 t < e && s === r[t] || (this._$Cwt = 1073741823, e = 0, Promise.resolve(s).then(async t => {
   for (; h.get();) await h.get();

   const i = o.deref();

   if (void 0 !== i) {
     const r = i._$Cyt.indexOf(s);

     r > -1 && r < i._$Cwt && (i._$Cwt = r, i.setValue(t));
   }
 }));
}

return b;
}

disconnected() {
this._$CG.disconnect(), this._$CK.pause();
}

reconnected() {
this._$CG.reconnect(this), this._$CK.resume();
}

}

const c = e$1(h);

const colorscales$1 = ['Hot', 'Cold', 'YlGnBu', 'YlOrRd', 'RdBu', 'Portland', 'Picnic', 'Jet', 'Greys', 'Greens', 'Electric', 'Earth', 'Bluered', 'Blackbody'];
class TimeSeries extends s$1 {
constructor(props = {}) {
   super();
   this.colorscale = 'Electric';
   this.div = document.createElement('div');
   this.data = [];
   this.plotData = [];
   this.layout = {};
   this.windowSize = 300;
   this.binWidth = 256;
   this.colorscales = colorscales$1;
   this.config = {};
   this.getTraces = () => {
       return this.data.map(o => Object.assign({
           type: "scatter",
           mode: "lines",
           // line: {color: '#000000'}
           // name: 'Voltage',
       }, o));
   };
   this.getConfig = () => {
       return Object.assign({
           displaylogo: false,
           responsive: true
       }, this.config);
   };
   this.getLayout = () => {
       return Object.assign({
       // title: 'Basic Time Series',
       // responsive: true,
       // autosize: true
       }, this.layout);
   };
   this.data = props.data ?? [];
   if (props.layout)
       this.layout = props.layout;
   if (window.Plotly)
       props.Plotly = window.Plotly;
   if (props.colorscale)
       this.colorscale = props.colorscale;
   if (props.onClick)
       this.onClick = props.onClick;
   if (props.onLegendClick)
       this.onLegendClick = props.onLegendClick;
   if (props.config)
       this.config = props.config;
   if (props.Plotly) {
       this.Plotly = props.Plotly;
       this.Plotly.newPlot(this.div, this.getTraces(), this.getLayout(), this.getConfig());
   }
   else
       console.warn('<visualscript-timeseries->: Plotly instance not provided...');
   // window.addEventListener('resize', this.resize)
   // let observer = new ResizeObserver(() => this.resize());
   // observer.observe(this.div);
}
static get styles() {
   return r$4 `

 :host {
   overflow: hidden;
 }
 
 `;
}
createRenderRoot() {
   return this;
}
static get properties() {
   return {
       max: {
           type: Number,
           reflect: true
       },
       data: {
           type: Array,
           reflect: true
       },
       layout: {
           type: Object,
           reflect: true,
       },
       config: {
           type: Object,
           reflect: true,
       },
       colorscale: {
           type: Object,
           reflect: true
       },
       backgroundColor: {
           type: String,
           reflect: true,
       },
       onLegendClick: {
           type: Function,
           reflect: true,
       },
       onClick: {
           type: Function,
           reflect: true,
       },
   };
}
// resize = () => {
//   this.Plotly.relayout(this.div, {
//     'xaxis.autorange': true,
//     'yaxis.autorange': true
//   })
// }
transpose(a) {
   return Object.keys(a[0]).map(function (c) {
       return a.map(function (r) { return r[c]; });
   });
}
willUpdate(changedProps) {
   if (changedProps.has('data')) {
       this.Plotly.newPlot(this.div, this.getTraces(), this.getLayout(), this.getConfig());
   }
   if (changedProps.has('onClick')) {
       this.div.on('plotly_click', this.onClick);
   }
   if (changedProps.has('onLegendClick')) {
       this.div.on('plotly_legendclick', this.onLegendClick);
   }
}
//   updateData = (newData) => {
//     // For a fixed window size,
//     // Push the latest data and remove the first element
//     if (!Array.isArray(newData[0])) newData = [newData]
//     newData.forEach(d => {
//       if(this.data.length > this.windowSize) {
//         this.data.push(d)
//         this.data.splice(0, 1)
//       } else {
//         this.data.push(d);
//       }
//     })
//   this.plotData[0].z[0] = transpose(this.data)
//     const ticRes = performance.now()
//     Plotly.restyle(this.div, 'z', this.plotData[0].z);
//     const tocRes = performance.now()
//     console.log('Restyle', tocRes - ticRes)
//     // const ticUp = performance.now()
//     // Plotly.update(this.div, this.plotData[0])
//     // const tocUp = performance.now()
//     // console.log('Update', tocUp - ticUp)
// //     const ticAn = performance.now()
// //     Plotly.animate(this.div, {
// //       data: [{z: this.plotData[0].z, type: 'heatmap'}],
// //   }, {
// //       transition: {duration: 0},
// //       frame: {duration: 0, redraw: true}
// //   });
// //   const tocAn = performance.now()
//   // console.log('Animate', tocAn - ticAn)
//   }
render() {
   return this.div;
}
}
TimeSeries.colorscales = colorscales$1;
customElements.define('visualscript-timeseries', TimeSeries);

/**
* A collection of shims that provide minimal functionality of the ES6 collections.
*
* These implementations are not meant to be used outside of the ResizeObserver
* modules as they cover only a limited range of use cases.
*/

/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
if (typeof Map !== 'undefined') {
return Map;
}
/**
* Returns index in provided array that matches the specified key.
*
* @param {Array<Array>} arr
* @param {*} key
* @returns {number}
*/


function getIndex(arr, key) {
var result = -1;
arr.some(function (entry, index) {
 if (entry[0] === key) {
   result = index;
   return true;
 }

 return false;
});
return result;
}

return (
/** @class */
function () {
 function class_1() {
   this.__entries__ = [];
 }

 Object.defineProperty(class_1.prototype, "size", {
   /**
    * @returns {boolean}
    */
   get: function () {
     return this.__entries__.length;
   },
   enumerable: true,
   configurable: true
 });
 /**
  * @param {*} key
  * @returns {*}
  */

 class_1.prototype.get = function (key) {
   var index = getIndex(this.__entries__, key);
   var entry = this.__entries__[index];
   return entry && entry[1];
 };
 /**
  * @param {*} key
  * @param {*} value
  * @returns {void}
  */


 class_1.prototype.set = function (key, value) {
   var index = getIndex(this.__entries__, key);

   if (~index) {
     this.__entries__[index][1] = value;
   } else {
     this.__entries__.push([key, value]);
   }
 };
 /**
  * @param {*} key
  * @returns {void}
  */


 class_1.prototype.delete = function (key) {
   var entries = this.__entries__;
   var index = getIndex(entries, key);

   if (~index) {
     entries.splice(index, 1);
   }
 };
 /**
  * @param {*} key
  * @returns {void}
  */


 class_1.prototype.has = function (key) {
   return !!~getIndex(this.__entries__, key);
 };
 /**
  * @returns {void}
  */


 class_1.prototype.clear = function () {
   this.__entries__.splice(0);
 };
 /**
  * @param {Function} callback
  * @param {*} [ctx=null]
  * @returns {void}
  */


 class_1.prototype.forEach = function (callback, ctx) {
   if (ctx === void 0) {
     ctx = null;
   }

   for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
     var entry = _a[_i];
     callback.call(ctx, entry[1], entry[0]);
   }
 };

 return class_1;
}()
);
}();
/**
* Detects whether window and document objects are available in current environment.
*/


var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

var global$1 = function () {
if (typeof global !== 'undefined' && global.Math === Math) {
return global;
}

if (typeof self !== 'undefined' && self.Math === Math) {
return self;
}

if (typeof window !== 'undefined' && window.Math === Math) {
return window;
} // eslint-disable-next-line no-new-func


return Function('return this')();
}();
/**
* A shim for the requestAnimationFrame which falls back to the setTimeout if
* first one is not supported.
*
* @returns {number} Requests' identifier.
*/


var requestAnimationFrame$1 = function () {
if (typeof requestAnimationFrame === 'function') {
// It's required to use a bounded function because IE sometimes throws
// an "Invalid calling object" error if rAF is invoked without the global
// object on the left hand side.
return requestAnimationFrame.bind(global$1);
}

return function (callback) {
return setTimeout(function () {
 return callback(Date.now());
}, 1000 / 60);
};
}(); // Defines minimum timeout before adding a trailing call.


var trailingTimeout = 2;
/**
* Creates a wrapper function which ensures that provided callback will be
* invoked only once during the specified delay period.
*
* @param {Function} callback - Function to be invoked after the delay period.
* @param {number} delay - Delay after which to invoke callback.
* @returns {Function}
*/

function throttle(callback, delay) {
var leadingCall = false,
 trailingCall = false,
 lastCallTime = 0;
/**
* Invokes the original callback function and schedules new invocation if
* the "proxy" was called during current request.
*
* @returns {void}
*/

function resolvePending() {
if (leadingCall) {
 leadingCall = false;
 callback();
}

if (trailingCall) {
 proxy();
}
}
/**
* Callback invoked after the specified delay. It will further postpone
* invocation of the original function delegating it to the
* requestAnimationFrame.
*
* @returns {void}
*/


function timeoutCallback() {
requestAnimationFrame$1(resolvePending);
}
/**
* Schedules invocation of the original function.
*
* @returns {void}
*/


function proxy() {
var timeStamp = Date.now();

if (leadingCall) {
 // Reject immediately following calls.
 if (timeStamp - lastCallTime < trailingTimeout) {
   return;
 } // Schedule new call to be in invoked when the pending one is resolved.
 // This is important for "transitions" which never actually start
 // immediately so there is a chance that we might miss one if change
 // happens amids the pending invocation.


 trailingCall = true;
} else {
 leadingCall = true;
 trailingCall = false;
 setTimeout(timeoutCallback, delay);
}

lastCallTime = timeStamp;
}

return proxy;
} // Minimum delay before invoking the update of observers.


var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.

var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
* Singleton controller class which handles updates of ResizeObserver instances.
*/

var ResizeObserverController =
/** @class */
function () {
/**
* Creates a new instance of ResizeObserverController.
*
* @private
*/
function ResizeObserverController() {
/**
* Indicates whether DOM listeners have been added.
*
* @private {boolean}
*/
this.connected_ = false;
/**
* Tells that controller has subscribed for Mutation Events.
*
* @private {boolean}
*/

this.mutationEventsAdded_ = false;
/**
* Keeps reference to the instance of MutationObserver.
*
* @private {MutationObserver}
*/

this.mutationsObserver_ = null;
/**
* A list of connected observers.
*
* @private {Array<ResizeObserverSPI>}
*/

this.observers_ = [];
this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
}
/**
* Adds observer to observers list.
*
* @param {ResizeObserverSPI} observer - Observer to be added.
* @returns {void}
*/


ResizeObserverController.prototype.addObserver = function (observer) {
if (!~this.observers_.indexOf(observer)) {
 this.observers_.push(observer);
} // Add listeners if they haven't been added yet.


if (!this.connected_) {
 this.connect_();
}
};
/**
* Removes observer from observers list.
*
* @param {ResizeObserverSPI} observer - Observer to be removed.
* @returns {void}
*/


ResizeObserverController.prototype.removeObserver = function (observer) {
var observers = this.observers_;
var index = observers.indexOf(observer); // Remove observer if it's present in registry.

if (~index) {
 observers.splice(index, 1);
} // Remove listeners if controller has no connected observers.


if (!observers.length && this.connected_) {
 this.disconnect_();
}
};
/**
* Invokes the update of observers. It will continue running updates insofar
* it detects changes.
*
* @returns {void}
*/


ResizeObserverController.prototype.refresh = function () {
var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
// be future ones caused by CSS transitions.

if (changesDetected) {
 this.refresh();
}
};
/**
* Updates every observer from observers list and notifies them of queued
* entries.
*
* @private
* @returns {boolean} Returns "true" if any observer has detected changes in
*      dimensions of it's elements.
*/


ResizeObserverController.prototype.updateObservers_ = function () {
// Collect observers that have active observations.
var activeObservers = this.observers_.filter(function (observer) {
 return observer.gatherActive(), observer.hasActive();
}); // Deliver notifications in a separate cycle in order to avoid any
// collisions between observers, e.g. when multiple instances of
// ResizeObserver are tracking the same element and the callback of one
// of them changes content dimensions of the observed target. Sometimes
// this may result in notifications being blocked for the rest of observers.

activeObservers.forEach(function (observer) {
 return observer.broadcastActive();
});
return activeObservers.length > 0;
};
/**
* Initializes DOM listeners.
*
* @private
* @returns {void}
*/


ResizeObserverController.prototype.connect_ = function () {
// Do nothing if running in a non-browser environment or if listeners
// have been already added.
if (!isBrowser || this.connected_) {
 return;
} // Subscription to the "Transitionend" event is used as a workaround for
// delayed transitions. This way it's possible to capture at least the
// final state of an element.


document.addEventListener('transitionend', this.onTransitionEnd_);
window.addEventListener('resize', this.refresh);

if (mutationObserverSupported) {
 this.mutationsObserver_ = new MutationObserver(this.refresh);
 this.mutationsObserver_.observe(document, {
   attributes: true,
   childList: true,
   characterData: true,
   subtree: true
 });
} else {
 document.addEventListener('DOMSubtreeModified', this.refresh);
 this.mutationEventsAdded_ = true;
}

this.connected_ = true;
};
/**
* Removes DOM listeners.
*
* @private
* @returns {void}
*/


ResizeObserverController.prototype.disconnect_ = function () {
// Do nothing if running in a non-browser environment or if listeners
// have been already removed.
if (!isBrowser || !this.connected_) {
 return;
}

document.removeEventListener('transitionend', this.onTransitionEnd_);
window.removeEventListener('resize', this.refresh);

if (this.mutationsObserver_) {
 this.mutationsObserver_.disconnect();
}

if (this.mutationEventsAdded_) {
 document.removeEventListener('DOMSubtreeModified', this.refresh);
}

this.mutationsObserver_ = null;
this.mutationEventsAdded_ = false;
this.connected_ = false;
};
/**
* "Transitionend" event handler.
*
* @private
* @param {TransitionEvent} event
* @returns {void}
*/


ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
var _b = _a.propertyName,
   propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

var isReflowProperty = transitionKeys.some(function (key) {
 return !!~propertyName.indexOf(key);
});

if (isReflowProperty) {
 this.refresh();
}
};
/**
* Returns instance of the ResizeObserverController.
*
* @returns {ResizeObserverController}
*/


ResizeObserverController.getInstance = function () {
if (!this.instance_) {
 this.instance_ = new ResizeObserverController();
}

return this.instance_;
};
/**
* Holds reference to the controller's instance.
*
* @private {ResizeObserverController}
*/


ResizeObserverController.instance_ = null;
return ResizeObserverController;
}();
/**
* Defines non-writable/enumerable properties of the provided target object.
*
* @param {Object} target - Object for which to define properties.
* @param {Object} props - Properties to be defined.
* @returns {Object} Target object.
*/


var defineConfigurable = function (target, props) {
for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
var key = _a[_i];
Object.defineProperty(target, key, {
 value: props[key],
 enumerable: false,
 writable: false,
 configurable: true
});
}

return target;
};
/**
* Returns the global object associated with provided element.
*
* @param {Object} target
* @returns {Object}
*/


var getWindowOf = function (target) {
// Assume that the element is an instance of Node, which means that it
// has the "ownerDocument" property from which we can retrieve a
// corresponding global object.
var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
// provided element.

return ownerGlobal || global$1;
}; // Placeholder of an empty content rectangle.


var emptyRect = createRectInit(0, 0, 0, 0);
/**
* Converts provided string to a number.
*
* @param {number|string} value
* @returns {number}
*/

function toFloat(value) {
return parseFloat(value) || 0;
}
/**
* Extracts borders size from provided styles.
*
* @param {CSSStyleDeclaration} styles
* @param {...string} positions - Borders positions (top, right, ...)
* @returns {number}
*/


function getBordersSize(styles) {
var positions = [];

for (var _i = 1; _i < arguments.length; _i++) {
positions[_i - 1] = arguments[_i];
}

return positions.reduce(function (size, position) {
var value = styles['border-' + position + '-width'];
return size + toFloat(value);
}, 0);
}
/**
* Extracts paddings sizes from provided styles.
*
* @param {CSSStyleDeclaration} styles
* @returns {Object} Paddings box.
*/


function getPaddings(styles) {
var positions = ['top', 'right', 'bottom', 'left'];
var paddings = {};

for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
var position = positions_1[_i];
var value = styles['padding-' + position];
paddings[position] = toFloat(value);
}

return paddings;
}
/**
* Calculates content rectangle of provided SVG element.
*
* @param {SVGGraphicsElement} target - Element content rectangle of which needs
*      to be calculated.
* @returns {DOMRectInit}
*/


function getSVGContentRect(target) {
var bbox = target.getBBox();
return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
* Calculates content rectangle of provided HTMLElement.
*
* @param {HTMLElement} target - Element for which to calculate the content rectangle.
* @returns {DOMRectInit}
*/


function getHTMLElementContentRect(target) {
// Client width & height properties can't be
// used exclusively as they provide rounded values.
var clientWidth = target.clientWidth,
 clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
// detached elements. Though elements with width & height properties less
// than 0.5 will be discarded as well.
//
// Without it we would need to implement separate methods for each of
// those cases and it's not possible to perform a precise and performance
// effective test for hidden elements. E.g. even jQuery's ':visible' filter
// gives wrong results for elements with width & height less than 0.5.

if (!clientWidth && !clientHeight) {
return emptyRect;
}

var styles = getWindowOf(target).getComputedStyle(target);
var paddings = getPaddings(styles);
var horizPad = paddings.left + paddings.right;
var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
// only dimensions available to JS that contain non-rounded values. It could
// be possible to utilize the getBoundingClientRect if only it's data wasn't
// affected by CSS transformations let alone paddings, borders and scroll bars.

var width = toFloat(styles.width),
 height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
// model is applied (except for IE).

if (styles.boxSizing === 'border-box') {
// Following conditions are required to handle Internet Explorer which
// doesn't include paddings and borders to computed CSS dimensions.
//
// We can say that if CSS dimensions + paddings are equal to the "client"
// properties then it's either IE, and thus we don't need to subtract
// anything, or an element merely doesn't have paddings/borders styles.
if (Math.round(width + horizPad) !== clientWidth) {
 width -= getBordersSize(styles, 'left', 'right') + horizPad;
}

if (Math.round(height + vertPad) !== clientHeight) {
 height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
}
} // Following steps can't be applied to the document's root element as its
// client[Width/Height] properties represent viewport area of the window.
// Besides, it's as well not necessary as the <html> itself neither has
// rendered scroll bars nor it can be clipped.


if (!isDocumentElement(target)) {
// In some browsers (only in Firefox, actually) CSS width & height
// include scroll bars size which can be removed at this step as scroll
// bars are the only difference between rounded dimensions + paddings
// and "client" properties, though that is not always true in Chrome.
var vertScrollbar = Math.round(width + horizPad) - clientWidth;
var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
// E.g. for an element with content width of 314.2px it sometimes gives
// the client width of 315px and for the width of 314.7px it may give
// 314px. And it doesn't happen all the time. So just ignore this delta
// as a non-relevant.

if (Math.abs(vertScrollbar) !== 1) {
 width -= vertScrollbar;
}

if (Math.abs(horizScrollbar) !== 1) {
 height -= horizScrollbar;
}
}

return createRectInit(paddings.left, paddings.top, width, height);
}
/**
* Checks whether provided element is an instance of the SVGGraphicsElement.
*
* @param {Element} target - Element to be checked.
* @returns {boolean}
*/


var isSVGGraphicsElement = function () {
// Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
// interface.
if (typeof SVGGraphicsElement !== 'undefined') {
return function (target) {
 return target instanceof getWindowOf(target).SVGGraphicsElement;
};
} // If it's so, then check that element is at least an instance of the
// SVGElement and that it has the "getBBox" method.
// eslint-disable-next-line no-extra-parens


return function (target) {
return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
};
}();
/**
* Checks whether provided element is a document element (<html>).
*
* @param {Element} target - Element to be checked.
* @returns {boolean}
*/


function isDocumentElement(target) {
return target === getWindowOf(target).document.documentElement;
}
/**
* Calculates an appropriate content rectangle for provided html or svg element.
*
* @param {Element} target - Element content rectangle of which needs to be calculated.
* @returns {DOMRectInit}
*/


function getContentRect(target) {
if (!isBrowser) {
return emptyRect;
}

if (isSVGGraphicsElement(target)) {
return getSVGContentRect(target);
}

return getHTMLElementContentRect(target);
}
/**
* Creates rectangle with an interface of the DOMRectReadOnly.
* Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
*
* @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
* @returns {DOMRectReadOnly}
*/


function createReadOnlyRect(_a) {
var x = _a.x,
 y = _a.y,
 width = _a.width,
 height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

defineConfigurable(rect, {
x: x,
y: y,
width: width,
height: height,
top: y,
right: x + width,
bottom: height + y,
left: x
});
return rect;
}
/**
* Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
* Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
*
* @param {number} x - X coordinate.
* @param {number} y - Y coordinate.
* @param {number} width - Rectangle's width.
* @param {number} height - Rectangle's height.
* @returns {DOMRectInit}
*/


function createRectInit(x, y, width, height) {
return {
x: x,
y: y,
width: width,
height: height
};
}
/**
* Class that is responsible for computations of the content rectangle of
* provided DOM element and for keeping track of it's changes.
*/


var ResizeObservation =
/** @class */
function () {
/**
* Creates an instance of ResizeObservation.
*
* @param {Element} target - Element to be observed.
*/
function ResizeObservation(target) {
/**
* Broadcasted width of content rectangle.
*
* @type {number}
*/
this.broadcastWidth = 0;
/**
* Broadcasted height of content rectangle.
*
* @type {number}
*/

this.broadcastHeight = 0;
/**
* Reference to the last observed content rectangle.
*
* @private {DOMRectInit}
*/

this.contentRect_ = createRectInit(0, 0, 0, 0);
this.target = target;
}
/**
* Updates content rectangle and tells whether it's width or height properties
* have changed since the last broadcast.
*
* @returns {boolean}
*/


ResizeObservation.prototype.isActive = function () {
var rect = getContentRect(this.target);
this.contentRect_ = rect;
return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};
/**
* Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
* from the corresponding properties of the last observed content rectangle.
*
* @returns {DOMRectInit} Last observed content rectangle.
*/


ResizeObservation.prototype.broadcastRect = function () {
var rect = this.contentRect_;
this.broadcastWidth = rect.width;
this.broadcastHeight = rect.height;
return rect;
};

return ResizeObservation;
}();

var ResizeObserverEntry =
/** @class */
function () {
/**
* Creates an instance of ResizeObserverEntry.
*
* @param {Element} target - Element that is being observed.
* @param {DOMRectInit} rectInit - Data of the element's content rectangle.
*/
function ResizeObserverEntry(target, rectInit) {
var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
// and are also not enumerable in the native implementation.
//
// Property accessors are not being used as they'd require to define a
// private WeakMap storage which may cause memory leaks in browsers that
// don't support this type of collections.

defineConfigurable(this, {
 target: target,
 contentRect: contentRect
});
}

return ResizeObserverEntry;
}();

var ResizeObserverSPI =
/** @class */
function () {
/**
* Creates a new instance of ResizeObserver.
*
* @param {ResizeObserverCallback} callback - Callback function that is invoked
*      when one of the observed elements changes it's content dimensions.
* @param {ResizeObserverController} controller - Controller instance which
*      is responsible for the updates of observer.
* @param {ResizeObserver} callbackCtx - Reference to the public
*      ResizeObserver instance which will be passed to callback function.
*/
function ResizeObserverSPI(callback, controller, callbackCtx) {
/**
* Collection of resize observations that have detected changes in dimensions
* of elements.
*
* @private {Array<ResizeObservation>}
*/
this.activeObservations_ = [];
/**
* Registry of the ResizeObservation instances.
*
* @private {Map<Element, ResizeObservation>}
*/

this.observations_ = new MapShim();

if (typeof callback !== 'function') {
 throw new TypeError('The callback provided as parameter 1 is not a function.');
}

this.callback_ = callback;
this.controller_ = controller;
this.callbackCtx_ = callbackCtx;
}
/**
* Starts observing provided element.
*
* @param {Element} target - Element to be observed.
* @returns {void}
*/


ResizeObserverSPI.prototype.observe = function (target) {
if (!arguments.length) {
 throw new TypeError('1 argument required, but only 0 present.');
} // Do nothing if current environment doesn't have the Element interface.


if (typeof Element === 'undefined' || !(Element instanceof Object)) {
 return;
}

if (!(target instanceof getWindowOf(target).Element)) {
 throw new TypeError('parameter 1 is not of type "Element".');
}

var observations = this.observations_; // Do nothing if element is already being observed.

if (observations.has(target)) {
 return;
}

observations.set(target, new ResizeObservation(target));
this.controller_.addObserver(this); // Force the update of observations.

this.controller_.refresh();
};
/**
* Stops observing provided element.
*
* @param {Element} target - Element to stop observing.
* @returns {void}
*/


ResizeObserverSPI.prototype.unobserve = function (target) {
if (!arguments.length) {
 throw new TypeError('1 argument required, but only 0 present.');
} // Do nothing if current environment doesn't have the Element interface.


if (typeof Element === 'undefined' || !(Element instanceof Object)) {
 return;
}

if (!(target instanceof getWindowOf(target).Element)) {
 throw new TypeError('parameter 1 is not of type "Element".');
}

var observations = this.observations_; // Do nothing if element is not being observed.

if (!observations.has(target)) {
 return;
}

observations.delete(target);

if (!observations.size) {
 this.controller_.removeObserver(this);
}
};
/**
* Stops observing all elements.
*
* @returns {void}
*/


ResizeObserverSPI.prototype.disconnect = function () {
this.clearActive();
this.observations_.clear();
this.controller_.removeObserver(this);
};
/**
* Collects observation instances the associated element of which has changed
* it's content rectangle.
*
* @returns {void}
*/


ResizeObserverSPI.prototype.gatherActive = function () {
var _this = this;

this.clearActive();
this.observations_.forEach(function (observation) {
 if (observation.isActive()) {
   _this.activeObservations_.push(observation);
 }
});
};
/**
* Invokes initial callback function with a list of ResizeObserverEntry
* instances collected from active resize observations.
*
* @returns {void}
*/


ResizeObserverSPI.prototype.broadcastActive = function () {
// Do nothing if observer doesn't have active observations.
if (!this.hasActive()) {
 return;
}

var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

var entries = this.activeObservations_.map(function (observation) {
 return new ResizeObserverEntry(observation.target, observation.broadcastRect());
});
this.callback_.call(ctx, entries, ctx);
this.clearActive();
};
/**
* Clears the collection of active observations.
*
* @returns {void}
*/


ResizeObserverSPI.prototype.clearActive = function () {
this.activeObservations_.splice(0);
};
/**
* Tells whether observer has active observations.
*
* @returns {boolean}
*/


ResizeObserverSPI.prototype.hasActive = function () {
return this.activeObservations_.length > 0;
};

return ResizeObserverSPI;
}(); // Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.


var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
* ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
* exposing only those methods and properties that are defined in the spec.
*/

var ResizeObserver =
/** @class */
function () {
/**
* Creates a new instance of ResizeObserver.
*
* @param {ResizeObserverCallback} callback - Callback that is invoked when
*      dimensions of the observed elements change.
*/
function ResizeObserver(callback) {
if (!(this instanceof ResizeObserver)) {
 throw new TypeError('Cannot call a class as a function.');
}

if (!arguments.length) {
 throw new TypeError('1 argument required, but only 0 present.');
}

var controller = ResizeObserverController.getInstance();
var observer = new ResizeObserverSPI(callback, controller, this);
observers.set(this, observer);
}

return ResizeObserver;
}(); // Expose public methods of ResizeObserver.


['observe', 'unobserve', 'disconnect'].forEach(function (method) {
ResizeObserver.prototype[method] = function () {
var _a;

return (_a = observers.get(this))[method].apply(_a, arguments);
};
});

var index = function () {
// Export existing implementation if available.
if (typeof global$1.ResizeObserver !== 'undefined') {
return global$1.ResizeObserver;
}

return ResizeObserver;
}();

const colorscales = ['Hot', 'Cold', 'YlGnBu', 'YlOrRd', 'RdBu', 'Portland', 'Picnic', 'Jet', 'Greys', 'Greens', 'Electric', 'Earth', 'Bluered', 'Blackbody'];
class Spectrogram extends s$1 {
constructor(props = {}) {
   super();
   this.colorscale = 'Electric';
   this.div = document.createElement('div');
   this.data = [];
   this.plotData = [];
   this.layout = {};
   this.windowSize = 300;
   this.binWidth = 256;
   this.config = {};
   this.colorscales = colorscales;
   this.resize = () => {
       this.Plotly.relayout(this.div, {
           'xaxis.autorange': true,
           'yaxis.autorange': true
       });
   };
   this.getConfig = () => {
       return Object.assign({
           displaylogo: false,
           responsive: true
       }, this.config);
   };
   this.data = props.data ?? [[]];
   if (props.colorscale)
       this.colorscale = props.colorscale;
   if (props.config)
       this.config = props.config;
   if (window.Plotly)
       props.Plotly = window.Plotly;
   this.plotData = [
       {
           x: [1, 2],
           z: this.transpose(this.data),
           showscale: true,
           colorscale: this.colorscale,
           type: 'heatmap'
       }
   ];
   this.layout = {
   // responsive: true,
   // autosize: true // set autosize to rescale
   };
   if (props.Plotly) {
       this.Plotly = props.Plotly;
       this.Plotly.newPlot(this.div, this.plotData, this.layout, this.getConfig());
   }
   else
       console.warn('<-spectrogram>: Plotly instance not provided...');
   this.resize();
   // window.addEventListener('resize', this.resize)
   let observer = new index(() => this.resize());
   observer.observe(this.div);
}
static get styles() {
   return r$4 `

 `;
}
createRenderRoot() {
   return this;
}
static get properties() {
   return {
       max: {
           type: Number,
           reflect: true
       },
       data: {
           type: Array,
           reflect: true
       },
       config: {
           type: Object,
           reflect: true
       },
       colorscale: {
           type: Object,
           reflect: true
       },
       backgroundColor: {
           type: String,
           reflect: true,
       },
   };
}
transpose(a) {
   return Object.keys(a[0]).map(function (c) {
       return a.map(function (r) { return r[c]; });
   });
}
willUpdate(changedProps) {
   if (changedProps.has('colorscale')) {
       if (!Array.isArray(this.colorscale) && !this.colorscales.includes(this.colorscale))
           this.colorscale = 'Electric';
       this.Plotly.restyle(this.div, 'colorscale', this.colorscale);
   }
   if (changedProps.has('data')) {
       this.plotData[0].z = this.transpose(this.data);
       this.Plotly.newPlot(this.div, this.plotData, this.layout, this.getConfig());
   }
}
//   updateData = (newData) => {
//     // For a fixed window size,
//     // Push the latest data and remove the first element
//     if (!Array.isArray(newData[0])) newData = [newData]
//     newData.forEach(d => {
//       if(this.data.length > this.windowSize) {
//         this.data.push(d)
//         this.data.splice(0, 1)
//       } else {
//         this.data.push(d);
//       }
//     })
//   this.plotData[0].z[0] = transpose(this.data)
//     const ticRes = performance.now()
//     Plotly.restyle(this.div, 'z', this.plotData[0].z);
//     const tocRes = performance.now()
//     console.log('Restyle', tocRes - ticRes)
//     // const ticUp = performance.now()
//     // Plotly.update(this.div, this.plotData[0])
//     // const tocUp = performance.now()
//     // console.log('Update', tocUp - ticUp)
// //     const ticAn = performance.now()
// //     Plotly.animate(this.div, {
// //       data: [{z: this.plotData[0].z, type: 'heatmap'}],
// //   }, {
// //       transition: {duration: 0},
// //       frame: {duration: 0, redraw: true}
// //   });
// //   const tocAn = performance.now()
//   // console.log('Animate', tocAn - ticAn)
//   }
render() {
   return this.div;
}
}
Spectrogram.colorscales = colorscales;
customElements.define('visualscript-spectrogram', Spectrogram);

class ObjectEditor extends s$1 {
constructor(props = { target: {}, header: 'Object' }) {
   super();
   this.history = [];
   this.getMode = (target, plot) => {
       return (plot) ? 'plot' : 'view';
   };
   this.set = async (target = {}, plot = false) => {
       if (this.preprocess instanceof Function)
           this.target = await this.preprocess(target);
       else
           this.target = target;
       this.keys = Object.keys(this.target);
       this.mode = this.getMode(this.target, plot);
   };
   this.checkToPlot = (key, o) => this.plot.length !== 0 && this.plot.reduce((a, f) => a + f(key, o), 0) === this.plot.length;
   this.getActions = async (key, o) => {
       let actions;
       const val = await Promise.resolve(o[key]);
       if (typeof val === 'object') {
           const mode = this.getMode(val, this.checkToPlot(key, o));
           actions = $ `<visualscript-button primary=true size="small" @click="${async () => {
               this.history.push({ parent: o, key: this.header });
               await this.set(val, this.checkToPlot(key, o));
               this.header = key;
           }}">${mode[0].toUpperCase() + mode.slice(1)}</visualscript-button>`;
       }
       return $ `
 <div class="actions">
       ${actions}
 </div>
 `;
   };
   this.getElement = async (key, o) => {
       let display;
       const val = await Promise.resolve(o[key]);
       if (typeof val === 'string' && val.includes('data:image')) {
           display = document.createElement('img');
           display.src = val;
           display.style.height = '100%';
       }
       else {
           display = new Input();
           display.value = val;
           display.oninput = () => {
               o[key] = display.value; // Modify original data
           };
       }
       const isObject = typeof val === 'object';
       return $ `
   <div class="attribute separate">
   <div class="info">
     <span class="name">${key}</span><br>
     <span class="value">${(isObject
           ? (Object.keys(val).length ? val.constructor?.name : $ `Empty ${val.constructor?.name}`)
           : '')}</span>
   </div>
     ${isObject ? await this.getActions(key, o) : display}
   </div>`;
   };
   this.set(props.target);
   this.header = props.header ?? 'Object';
   this.mode = props.mode ?? 'view';
   this.plot = props.plot ?? [];
   this.onPlot = props.onPlot;
   if (props.preprocess)
       this.preprocess = props.preprocess;
   this.timeseries = new TimeSeries({
       data: []
   });
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

:host > * {
 background: white;
 border-radius: 4px;
 overflow: hidden;
 box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
 height: 100%;
 width: 100%;
 position: relative;
}

img {
 max-height: 100px;
}

.header {
 padding: 5px 10px;
 font-size: 70%;
 text-align: right;
}

.header span {
 font-weight: 800;
 font-size: 120%;
}

.container {
 width: 100%;
 padding: 10px;
 align-items: center;
 justify-content: center;
 position: relative;
 overflow: scroll;
 height: 100%;
}

.separate {
 display: flex;
 align-items: center;
 justify-content: space-between;
}

.attribute {
 width: 100%;
 font-size: 90%;
 padding: 15px;
 flex-grow: 1;
 flex-wrap: wrap;
}

.info {
 display: flex;
 align-items: center;
}

.name {
 font-weight: 800;
 padding-right: 10px;
}

.value {
 font-size: 80%;
}

@media (prefers-color-scheme: dark) {
 :host > * {
   background-color: rgb(40, 40, 40);
   box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
 }

 .header {
   border-bottom: 1px solid gray;
 }
}

`;
}
static get properties() {
   return {
       // target: {
       //   type: Object,
       //   reflect: false,
       // },
       keys: {
           type: Object,
           reflect: true,
       },
       plot: {
           type: Object,
           reflect: true,
       },
       header: {
           type: String,
           reflect: true,
       },
       mode: {
           type: String,
           reflect: true,
       },
       onPlot: {
           type: Function,
           reflect: true,
       },
       preprocess: {
           type: Function,
           reflect: true,
       },
   };
}
render() {
   if (this.mode === 'plot') {
       if (this.onPlot instanceof Function)
           this.onPlot(this);
       this.insertAdjacentElement('afterend', this.timeseries);
   }
   else
       this.timeseries.remove();
   const content = (this.mode === 'view'
       ? this.keys?.map(key => this.getElement(key, this.target))
       : []);
   return c(Promise.all(content).then((data) => {
       return $ `
   <div>
     <div class="header">
       ${(this.history.length > 0) ? $ `<visualscript-button size="extra-small" @click="${() => {
           const historyItem = this.history.pop();
           this.set(historyItem.parent);
           this.header = historyItem.key;
       }}">Go Back</visualscript-button>` : ``}
     </div>
     <div class="container">
           ${data}
     </div>
   </div>
 `;
   }), $ `<span>Loading...</span>`);
}
}
customElements.define('visualscript-object-editor', ObjectEditor);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var prism = {exports: {}};

(function (module) {
/* **********************************************
  Begin prism-core.js
********************************************** */
/// <reference lib="WebWorker"/>
var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;
/**
* Prism: Lightweight, robust, elegant syntax highlighting
*
* @license MIT <https://opensource.org/licenses/MIT>
* @author Lea Verou <https://lea.verou.me>
* @namespace
* @public
*/


var Prism = function (_self) {
// Private helper vars
var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
var uniqueId = 0; // The grammar object for plaintext

var plainTextGrammar = {};
var _ = {
 /**
  * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
  * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
  * additional languages or plugins yourself.
  *
  * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
  *
  * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
  * empty Prism object into the global scope before loading the Prism script like this:
  *
  * ```js
  * window.Prism = window.Prism || {};
  * Prism.manual = true;
  * // add a new <script> to load Prism's script
  * ```
  *
  * @default false
  * @type {boolean}
  * @memberof Prism
  * @public
  */
 manual: _self.Prism && _self.Prism.manual,

 /**
  * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
  * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
  * own worker, you don't want it to do this.
  *
  * By setting this value to `true`, Prism will not add its own listeners to the worker.
  *
  * You obviously have to change this value before Prism executes. To do this, you can add an
  * empty Prism object into the global scope before loading the Prism script like this:
  *
  * ```js
  * window.Prism = window.Prism || {};
  * Prism.disableWorkerMessageHandler = true;
  * // Load Prism's script
  * ```
  *
  * @default false
  * @type {boolean}
  * @memberof Prism
  * @public
  */
 disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

 /**
  * A namespace for utility methods.
  *
  * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
  * change or disappear at any time.
  *
  * @namespace
  * @memberof Prism
  */
 util: {
   encode: function encode(tokens) {
     if (tokens instanceof Token) {
       return new Token(tokens.type, encode(tokens.content), tokens.alias);
     } else if (Array.isArray(tokens)) {
       return tokens.map(encode);
     } else {
       return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
     }
   },

   /**
    * Returns the name of the type of the given value.
    *
    * @param {any} o
    * @returns {string}
    * @example
    * type(null)      === 'Null'
    * type(undefined) === 'Undefined'
    * type(123)       === 'Number'
    * type('foo')     === 'String'
    * type(true)      === 'Boolean'
    * type([1, 2])    === 'Array'
    * type({})        === 'Object'
    * type(String)    === 'Function'
    * type(/abc+/)    === 'RegExp'
    */
   type: function (o) {
     return Object.prototype.toString.call(o).slice(8, -1);
   },

   /**
    * Returns a unique number for the given object. Later calls will still return the same number.
    *
    * @param {Object} obj
    * @returns {number}
    */
   objId: function (obj) {
     if (!obj['__id']) {
       Object.defineProperty(obj, '__id', {
         value: ++uniqueId
       });
     }

     return obj['__id'];
   },

   /**
    * Creates a deep clone of the given object.
    *
    * The main intended use of this function is to clone language definitions.
    *
    * @param {T} o
    * @param {Record<number, any>} [visited]
    * @returns {T}
    * @template T
    */
   clone: function deepClone(o, visited) {
     visited = visited || {};
     var clone;
     var id;

     switch (_.util.type(o)) {
       case 'Object':
         id = _.util.objId(o);

         if (visited[id]) {
           return visited[id];
         }

         clone =
         /** @type {Record<string, any>} */
         {};
         visited[id] = clone;

         for (var key in o) {
           if (o.hasOwnProperty(key)) {
             clone[key] = deepClone(o[key], visited);
           }
         }

         return (
           /** @type {any} */
           clone
         );

       case 'Array':
         id = _.util.objId(o);

         if (visited[id]) {
           return visited[id];
         }

         clone = [];
         visited[id] = clone;

         /** @type {Array} */

         /** @type {any} */
         o.forEach(function (v, i) {
           clone[i] = deepClone(v, visited);
         });
         return (
           /** @type {any} */
           clone
         );

       default:
         return o;
     }
   },

   /**
    * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
    *
    * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
    *
    * @param {Element} element
    * @returns {string}
    */
   getLanguage: function (element) {
     while (element) {
       var m = lang.exec(element.className);

       if (m) {
         return m[1].toLowerCase();
       }

       element = element.parentElement;
     }

     return 'none';
   },

   /**
    * Sets the Prism `language-xxxx` class of the given element.
    *
    * @param {Element} element
    * @param {string} language
    * @returns {void}
    */
   setLanguage: function (element, language) {
     // remove all `language-xxxx` classes
     // (this might leave behind a leading space)
     element.className = element.className.replace(RegExp(lang, 'gi'), ''); // add the new `language-xxxx` class
     // (using `classList` will automatically clean up spaces for us)

     element.classList.add('language-' + language);
   },

   /**
    * Returns the script element that is currently executing.
    *
    * This does __not__ work for line script element.
    *
    * @returns {HTMLScriptElement | null}
    */
   currentScript: function () {
     if (typeof document === 'undefined') {
       return null;
     }

     if ('currentScript' in document && 1 < 2
     /* hack to trip TS' flow analysis */
     ) {
       return (
         /** @type {any} */
         document.currentScript
       );
     } // IE11 workaround
     // we'll get the src of the current script by parsing IE11's error stack trace
     // this will not work for inline scripts


     try {
       throw new Error();
     } catch (err) {
       // Get file src url from stack. Specifically works with the format of stack traces in IE.
       // A stack will look like this:
       //
       // Error
       //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
       //    at Global code (http://localhost/components/prism-core.js:606:1)
       var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];

       if (src) {
         var scripts = document.getElementsByTagName('script');

         for (var i in scripts) {
           if (scripts[i].src == src) {
             return scripts[i];
           }
         }
       }

       return null;
     }
   },

   /**
    * Returns whether a given class is active for `element`.
    *
    * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
    * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
    * given class is just the given class with a `no-` prefix.
    *
    * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
    * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
    * ancestors have the given class or the negated version of it, then the default activation will be returned.
    *
    * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
    * version of it, the class is considered active.
    *
    * @param {Element} element
    * @param {string} className
    * @param {boolean} [defaultActivation=false]
    * @returns {boolean}
    */
   isActive: function (element, className, defaultActivation) {
     var no = 'no-' + className;

     while (element) {
       var classList = element.classList;

       if (classList.contains(className)) {
         return true;
       }

       if (classList.contains(no)) {
         return false;
       }

       element = element.parentElement;
     }

     return !!defaultActivation;
   }
 },

 /**
  * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
  *
  * @namespace
  * @memberof Prism
  * @public
  */
 languages: {
   /**
    * The grammar for plain, unformatted text.
    */
   plain: plainTextGrammar,
   plaintext: plainTextGrammar,
   text: plainTextGrammar,
   txt: plainTextGrammar,

   /**
    * Creates a deep copy of the language with the given id and appends the given tokens.
    *
    * If a token in `redef` also appears in the copied language, then the existing token in the copied language
    * will be overwritten at its original position.
    *
    * ## Best practices
    *
    * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
    * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
    * understand the language definition because, normally, the order of tokens matters in Prism grammars.
    *
    * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
    * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
    *
    * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
    * @param {Grammar} redef The new tokens to append.
    * @returns {Grammar} The new language created.
    * @public
    * @example
    * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
    *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
    *     // at its original position
    *     'comment': { ... },
    *     // CSS doesn't have a 'color' token, so this token will be appended
    *     'color': /\b(?:red|green|blue)\b/
    * });
    */
   extend: function (id, redef) {
     var lang = _.util.clone(_.languages[id]);

     for (var key in redef) {
       lang[key] = redef[key];
     }

     return lang;
   },

   /**
    * Inserts tokens _before_ another token in a language definition or any other grammar.
    *
    * ## Usage
    *
    * This helper method makes it easy to modify existing languages. For example, the CSS language definition
    * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
    * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
    * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
    * this:
    *
    * ```js
    * Prism.languages.markup.style = {
    *     // token
    * };
    * ```
    *
    * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
    * before existing tokens. For the CSS example above, you would use it like this:
    *
    * ```js
    * Prism.languages.insertBefore('markup', 'cdata', {
    *     'style': {
    *         // token
    *     }
    * });
    * ```
    *
    * ## Special cases
    *
    * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
    * will be ignored.
    *
    * This behavior can be used to insert tokens after `before`:
    *
    * ```js
    * Prism.languages.insertBefore('markup', 'comment', {
    *     'comment': Prism.languages.markup.comment,
    *     // tokens after 'comment'
    * });
    * ```
    *
    * ## Limitations
    *
    * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
    * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
    * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
    * deleting properties which is necessary to insert at arbitrary positions.
    *
    * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
    * Instead, it will create a new object and replace all references to the target object with the new one. This
    * can be done without temporarily deleting properties, so the iteration order is well-defined.
    *
    * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
    * you hold the target object in a variable, then the value of the variable will not change.
    *
    * ```js
    * var oldMarkup = Prism.languages.markup;
    * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
    *
    * assert(oldMarkup !== Prism.languages.markup);
    * assert(newMarkup === Prism.languages.markup);
    * ```
    *
    * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
    * object to be modified.
    * @param {string} before The key to insert before.
    * @param {Grammar} insert An object containing the key-value pairs to be inserted.
    * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
    * object to be modified.
    *
    * Defaults to `Prism.languages`.
    * @returns {Grammar} The new grammar object.
    * @public
    */
   insertBefore: function (inside, before, insert, root) {
     root = root ||
     /** @type {any} */
     _.languages;
     var grammar = root[inside];
     /** @type {Grammar} */

     var ret = {};

     for (var token in grammar) {
       if (grammar.hasOwnProperty(token)) {
         if (token == before) {
           for (var newToken in insert) {
             if (insert.hasOwnProperty(newToken)) {
               ret[newToken] = insert[newToken];
             }
           }
         } // Do not insert token which also occur in insert. See #1525


         if (!insert.hasOwnProperty(token)) {
           ret[token] = grammar[token];
         }
       }
     }

     var old = root[inside];
     root[inside] = ret; // Update references in other language definitions

     _.languages.DFS(_.languages, function (key, value) {
       if (value === old && key != inside) {
         this[key] = ret;
       }
     });

     return ret;
   },
   // Traverse a language definition with Depth First Search
   DFS: function DFS(o, callback, type, visited) {
     visited = visited || {};
     var objId = _.util.objId;

     for (var i in o) {
       if (o.hasOwnProperty(i)) {
         callback.call(o, i, o[i], type || i);
         var property = o[i];

         var propertyType = _.util.type(property);

         if (propertyType === 'Object' && !visited[objId(property)]) {
           visited[objId(property)] = true;
           DFS(property, callback, null, visited);
         } else if (propertyType === 'Array' && !visited[objId(property)]) {
           visited[objId(property)] = true;
           DFS(property, callback, i, visited);
         }
       }
     }
   }
 },
 plugins: {},

 /**
  * This is the most high-level function in Prism’s API.
  * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
  * each one of them.
  *
  * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
  *
  * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
  * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
  * @memberof Prism
  * @public
  */
 highlightAll: function (async, callback) {
   _.highlightAllUnder(document, async, callback);
 },

 /**
  * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
  * {@link Prism.highlightElement} on each one of them.
  *
  * The following hooks will be run:
  * 1. `before-highlightall`
  * 2. `before-all-elements-highlight`
  * 3. All hooks of {@link Prism.highlightElement} for each element.
  *
  * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
  * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
  * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
  * @memberof Prism
  * @public
  */
 highlightAllUnder: function (container, async, callback) {
   var env = {
     callback: callback,
     container: container,
     selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
   };

   _.hooks.run('before-highlightall', env);

   env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

   _.hooks.run('before-all-elements-highlight', env);

   for (var i = 0, element; element = env.elements[i++];) {
     _.highlightElement(element, async === true, env.callback);
   }
 },

 /**
  * Highlights the code inside a single element.
  *
  * The following hooks will be run:
  * 1. `before-sanity-check`
  * 2. `before-highlight`
  * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
  * 4. `before-insert`
  * 5. `after-highlight`
  * 6. `complete`
  *
  * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
  * the element's language.
  *
  * @param {Element} element The element containing the code.
  * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
  * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
  * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
  * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
  *
  * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
  * asynchronous highlighting to work. You can build your own bundle on the
  * [Download page](https://prismjs.com/download.html).
  * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
  * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
  * @memberof Prism
  * @public
  */
 highlightElement: function (element, async, callback) {
   // Find language
   var language = _.util.getLanguage(element);

   var grammar = _.languages[language]; // Set language on the element, if not present

   _.util.setLanguage(element, language); // Set language on the parent, for styling


   var parent = element.parentElement;

   if (parent && parent.nodeName.toLowerCase() === 'pre') {
     _.util.setLanguage(parent, language);
   }

   var code = element.textContent;
   var env = {
     element: element,
     language: language,
     grammar: grammar,
     code: code
   };

   function insertHighlightedCode(highlightedCode) {
     env.highlightedCode = highlightedCode;

     _.hooks.run('before-insert', env);

     env.element.innerHTML = env.highlightedCode;

     _.hooks.run('after-highlight', env);

     _.hooks.run('complete', env);

     callback && callback.call(env.element);
   }

   _.hooks.run('before-sanity-check', env); // plugins may change/add the parent/element


   parent = env.element.parentElement;

   if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
     parent.setAttribute('tabindex', '0');
   }

   if (!env.code) {
     _.hooks.run('complete', env);

     callback && callback.call(env.element);
     return;
   }

   _.hooks.run('before-highlight', env);

   if (!env.grammar) {
     insertHighlightedCode(_.util.encode(env.code));
     return;
   }

   if (async && _self.Worker) {
     var worker = new Worker(_.filename);

     worker.onmessage = function (evt) {
       insertHighlightedCode(evt.data);
     };

     worker.postMessage(JSON.stringify({
       language: env.language,
       code: env.code,
       immediateClose: true
     }));
   } else {
     insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
   }
 },

 /**
  * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
  * and the language definitions to use, and returns a string with the HTML produced.
  *
  * The following hooks will be run:
  * 1. `before-tokenize`
  * 2. `after-tokenize`
  * 3. `wrap`: On each {@link Token}.
  *
  * @param {string} text A string with the code to be highlighted.
  * @param {Grammar} grammar An object containing the tokens to use.
  *
  * Usually a language definition like `Prism.languages.markup`.
  * @param {string} language The name of the language definition passed to `grammar`.
  * @returns {string} The highlighted HTML.
  * @memberof Prism
  * @public
  * @example
  * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
  */
 highlight: function (text, grammar, language) {
   var env = {
     code: text,
     grammar: grammar,
     language: language
   };

   _.hooks.run('before-tokenize', env);

   if (!env.grammar) {
     throw new Error('The language "' + env.language + '" has no grammar.');
   }

   env.tokens = _.tokenize(env.code, env.grammar);

   _.hooks.run('after-tokenize', env);

   return Token.stringify(_.util.encode(env.tokens), env.language);
 },

 /**
  * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
  * and the language definitions to use, and returns an array with the tokenized code.
  *
  * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
  *
  * This method could be useful in other contexts as well, as a very crude parser.
  *
  * @param {string} text A string with the code to be highlighted.
  * @param {Grammar} grammar An object containing the tokens to use.
  *
  * Usually a language definition like `Prism.languages.markup`.
  * @returns {TokenStream} An array of strings and tokens, a token stream.
  * @memberof Prism
  * @public
  * @example
  * let code = `var foo = 0;`;
  * let tokens = Prism.tokenize(code, Prism.languages.javascript);
  * tokens.forEach(token => {
  *     if (token instanceof Prism.Token && token.type === 'number') {
  *         console.log(`Found numeric literal: ${token.content}`);
  *     }
  * });
  */
 tokenize: function (text, grammar) {
   var rest = grammar.rest;

   if (rest) {
     for (var token in rest) {
       grammar[token] = rest[token];
     }

     delete grammar.rest;
   }

   var tokenList = new LinkedList();
   addAfter(tokenList, tokenList.head, text);
   matchGrammar(text, tokenList, grammar, tokenList.head, 0);
   return toArray(tokenList);
 },

 /**
  * @namespace
  * @memberof Prism
  * @public
  */
 hooks: {
   all: {},

   /**
    * Adds the given callback to the list of callbacks for the given hook.
    *
    * The callback will be invoked when the hook it is registered for is run.
    * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
    *
    * One callback function can be registered to multiple hooks and the same hook multiple times.
    *
    * @param {string} name The name of the hook.
    * @param {HookCallback} callback The callback function which is given environment variables.
    * @public
    */
   add: function (name, callback) {
     var hooks = _.hooks.all;
     hooks[name] = hooks[name] || [];
     hooks[name].push(callback);
   },

   /**
    * Runs a hook invoking all registered callbacks with the given environment variables.
    *
    * Callbacks will be invoked synchronously and in the order in which they were registered.
    *
    * @param {string} name The name of the hook.
    * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
    * @public
    */
   run: function (name, env) {
     var callbacks = _.hooks.all[name];

     if (!callbacks || !callbacks.length) {
       return;
     }

     for (var i = 0, callback; callback = callbacks[i++];) {
       callback(env);
     }
   }
 },
 Token: Token
};
_self.Prism = _; // Typescript note:
// The following can be used to import the Token type in JSDoc:
//
//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

/**
* Creates a new token.
*
* @param {string} type See {@link Token#type type}
* @param {string | TokenStream} content See {@link Token#content content}
* @param {string|string[]} [alias] The alias(es) of the token.
* @param {string} [matchedStr=""] A copy of the full string this token was created from.
* @class
* @global
* @public
*/

function Token(type, content, alias, matchedStr) {
 /**
  * The type of the token.
  *
  * This is usually the key of a pattern in a {@link Grammar}.
  *
  * @type {string}
  * @see GrammarToken
  * @public
  */
 this.type = type;
 /**
  * The strings or tokens contained by this token.
  *
  * This will be a token stream if the pattern matched also defined an `inside` grammar.
  *
  * @type {string | TokenStream}
  * @public
  */

 this.content = content;
 /**
  * The alias(es) of the token.
  *
  * @type {string|string[]}
  * @see GrammarToken
  * @public
  */

 this.alias = alias; // Copy of the full string this token was created from

 this.length = (matchedStr || '').length | 0;
}
/**
* A token stream is an array of strings and {@link Token Token} objects.
*
* Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
* them.
*
* 1. No adjacent strings.
* 2. No empty strings.
*
*    The only exception here is the token stream that only contains the empty string and nothing else.
*
* @typedef {Array<string | Token>} TokenStream
* @global
* @public
*/

/**
* Converts the given token or token stream to an HTML representation.
*
* The following hooks will be run:
* 1. `wrap`: On each {@link Token}.
*
* @param {string | Token | TokenStream} o The token or token stream to be converted.
* @param {string} language The name of current language.
* @returns {string} The HTML representation of the token or token stream.
* @memberof Token
* @static
*/


Token.stringify = function stringify(o, language) {
 if (typeof o == 'string') {
   return o;
 }

 if (Array.isArray(o)) {
   var s = '';
   o.forEach(function (e) {
     s += stringify(e, language);
   });
   return s;
 }

 var env = {
   type: o.type,
   content: stringify(o.content, language),
   tag: 'span',
   classes: ['token', o.type],
   attributes: {},
   language: language
 };
 var aliases = o.alias;

 if (aliases) {
   if (Array.isArray(aliases)) {
     Array.prototype.push.apply(env.classes, aliases);
   } else {
     env.classes.push(aliases);
   }
 }

 _.hooks.run('wrap', env);

 var attributes = '';

 for (var name in env.attributes) {
   attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
 }

 return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
};
/**
* @param {RegExp} pattern
* @param {number} pos
* @param {string} text
* @param {boolean} lookbehind
* @returns {RegExpExecArray | null}
*/


function matchPattern(pattern, pos, text, lookbehind) {
 pattern.lastIndex = pos;
 var match = pattern.exec(text);

 if (match && lookbehind && match[1]) {
   // change the match to remove the text matched by the Prism lookbehind group
   var lookbehindLength = match[1].length;
   match.index += lookbehindLength;
   match[0] = match[0].slice(lookbehindLength);
 }

 return match;
}
/**
* @param {string} text
* @param {LinkedList<string | Token>} tokenList
* @param {any} grammar
* @param {LinkedListNode<string | Token>} startNode
* @param {number} startPos
* @param {RematchOptions} [rematch]
* @returns {void}
* @private
*
* @typedef RematchOptions
* @property {string} cause
* @property {number} reach
*/


function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
 for (var token in grammar) {
   if (!grammar.hasOwnProperty(token) || !grammar[token]) {
     continue;
   }

   var patterns = grammar[token];
   patterns = Array.isArray(patterns) ? patterns : [patterns];

   for (var j = 0; j < patterns.length; ++j) {
     if (rematch && rematch.cause == token + ',' + j) {
       return;
     }

     var patternObj = patterns[j];
     var inside = patternObj.inside;
     var lookbehind = !!patternObj.lookbehind;
     var greedy = !!patternObj.greedy;
     var alias = patternObj.alias;

     if (greedy && !patternObj.pattern.global) {
       // Without the global flag, lastIndex won't work
       var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
       patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
     }
     /** @type {RegExp} */


     var pattern = patternObj.pattern || patternObj;

     for ( // iterate the token list and keep track of the current token/string position
     var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
       if (rematch && pos >= rematch.reach) {
         break;
       }

       var str = currentNode.value;

       if (tokenList.length > text.length) {
         // Something went terribly wrong, ABORT, ABORT!
         return;
       }

       if (str instanceof Token) {
         continue;
       }

       var removeCount = 1; // this is the to parameter of removeBetween

       var match;

       if (greedy) {
         match = matchPattern(pattern, pos, text, lookbehind);

         if (!match || match.index >= text.length) {
           break;
         }

         var from = match.index;
         var to = match.index + match[0].length;
         var p = pos; // find the node that contains the match

         p += currentNode.value.length;

         while (from >= p) {
           currentNode = currentNode.next;
           p += currentNode.value.length;
         } // adjust pos (and p)


         p -= currentNode.value.length;
         pos = p; // the current node is a Token, then the match starts inside another Token, which is invalid

         if (currentNode.value instanceof Token) {
           continue;
         } // find the last node which is affected by this match


         for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next) {
           removeCount++;
           p += k.value.length;
         }

         removeCount--; // replace with the new match

         str = text.slice(pos, p);
         match.index -= pos;
       } else {
         match = matchPattern(pattern, 0, str, lookbehind);

         if (!match) {
           continue;
         }
       } // eslint-disable-next-line no-redeclare


       var from = match.index;
       var matchStr = match[0];
       var before = str.slice(0, from);
       var after = str.slice(from + matchStr.length);
       var reach = pos + str.length;

       if (rematch && reach > rematch.reach) {
         rematch.reach = reach;
       }

       var removeFrom = currentNode.prev;

       if (before) {
         removeFrom = addAfter(tokenList, removeFrom, before);
         pos += before.length;
       }

       removeRange(tokenList, removeFrom, removeCount);
       var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
       currentNode = addAfter(tokenList, removeFrom, wrapped);

       if (after) {
         addAfter(tokenList, currentNode, after);
       }

       if (removeCount > 1) {
         // at least one Token object was removed, so we have to do some rematching
         // this can only happen if the current pattern is greedy

         /** @type {RematchOptions} */
         var nestedRematch = {
           cause: token + ',' + j,
           reach: reach
         };
         matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch); // the reach might have been extended because of the rematching

         if (rematch && nestedRematch.reach > rematch.reach) {
           rematch.reach = nestedRematch.reach;
         }
       }
     }
   }
 }
}
/**
* @typedef LinkedListNode
* @property {T} value
* @property {LinkedListNode<T> | null} prev The previous node.
* @property {LinkedListNode<T> | null} next The next node.
* @template T
* @private
*/

/**
* @template T
* @private
*/


function LinkedList() {
 /** @type {LinkedListNode<T>} */
 var head = {
   value: null,
   prev: null,
   next: null
 };
 /** @type {LinkedListNode<T>} */

 var tail = {
   value: null,
   prev: head,
   next: null
 };
 head.next = tail;
 /** @type {LinkedListNode<T>} */

 this.head = head;
 /** @type {LinkedListNode<T>} */

 this.tail = tail;
 this.length = 0;
}
/**
* Adds a new node with the given value to the list.
*
* @param {LinkedList<T>} list
* @param {LinkedListNode<T>} node
* @param {T} value
* @returns {LinkedListNode<T>} The added node.
* @template T
*/


function addAfter(list, node, value) {
 // assumes that node != list.tail && values.length >= 0
 var next = node.next;
 var newNode = {
   value: value,
   prev: node,
   next: next
 };
 node.next = newNode;
 next.prev = newNode;
 list.length++;
 return newNode;
}
/**
* Removes `count` nodes after the given node. The given node will not be removed.
*
* @param {LinkedList<T>} list
* @param {LinkedListNode<T>} node
* @param {number} count
* @template T
*/


function removeRange(list, node, count) {
 var next = node.next;

 for (var i = 0; i < count && next !== list.tail; i++) {
   next = next.next;
 }

 node.next = next;
 next.prev = node;
 list.length -= i;
}
/**
* @param {LinkedList<T>} list
* @returns {T[]}
* @template T
*/


function toArray(list) {
 var array = [];
 var node = list.head.next;

 while (node !== list.tail) {
   array.push(node.value);
   node = node.next;
 }

 return array;
}

if (!_self.document) {
 if (!_self.addEventListener) {
   // in Node.js
   return _;
 }

 if (!_.disableWorkerMessageHandler) {
   // In worker
   _self.addEventListener('message', function (evt) {
     var message = JSON.parse(evt.data);
     var lang = message.language;
     var code = message.code;
     var immediateClose = message.immediateClose;

     _self.postMessage(_.highlight(code, _.languages[lang], lang));

     if (immediateClose) {
       _self.close();
     }
   }, false);
 }

 return _;
} // Get current script and highlight


var script = _.util.currentScript();

if (script) {
 _.filename = script.src;

 if (script.hasAttribute('data-manual')) {
   _.manual = true;
 }
}

function highlightAutomaticallyCallback() {
 if (!_.manual) {
   _.highlightAll();
 }
}

if (!_.manual) {
 // If the document state is "loading", then we'll use DOMContentLoaded.
 // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
 // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
 // might take longer one animation frame to execute which can create a race condition where only some plugins have
 // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
 // See https://github.com/PrismJS/prism/issues/2102
 var readyState = document.readyState;

 if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
   document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
 } else {
   if (window.requestAnimationFrame) {
     window.requestAnimationFrame(highlightAutomaticallyCallback);
   } else {
     window.setTimeout(highlightAutomaticallyCallback, 16);
   }
 }
}

return _;
}(_self);

if (module.exports) {
module.exports = Prism;
} // hack for components to work correctly in node.js


if (typeof commonjsGlobal !== 'undefined') {
commonjsGlobal.Prism = Prism;
} // some additional documentation/types

/**
* The expansion of a simple `RegExp` literal to support additional properties.
*
* @typedef GrammarToken
* @property {RegExp} pattern The regular expression of the token.
* @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
* behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
* @property {boolean} [greedy=false] Whether the token is greedy.
* @property {string|string[]} [alias] An optional alias or list of aliases.
* @property {Grammar} [inside] The nested grammar of this token.
*
* The `inside` grammar will be used to tokenize the text value of each token of this kind.
*
* This can be used to make nested and even recursive language definitions.
*
* Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
* each another.
* @global
* @public
*/

/**
* @typedef Grammar
* @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
* @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
* @global
* @public
*/

/**
* A function which will invoked after an element was successfully highlighted.
*
* @callback HighlightCallback
* @param {Element} element The element successfully highlighted.
* @returns {void}
* @global
* @public
*/

/**
* @callback HookCallback
* @param {Object<string, any>} env The environment variables of the hook.
* @returns {void}
* @global
* @public
*/

/* **********************************************
  Begin prism-markup.js
********************************************** */


Prism.languages.markup = {
'comment': {
 pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
 greedy: true
},
'prolog': {
 pattern: /<\?[\s\S]+?\?>/,
 greedy: true
},
'doctype': {
 // https://www.w3.org/TR/xml/#NT-doctypedecl
 pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
 greedy: true,
 inside: {
   'internal-subset': {
     pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
     lookbehind: true,
     greedy: true,
     inside: null // see below

   },
   'string': {
     pattern: /"[^"]*"|'[^']*'/,
     greedy: true
   },
   'punctuation': /^<!|>$|[[\]]/,
   'doctype-tag': /^DOCTYPE/i,
   'name': /[^\s<>'"]+/
 }
},
'cdata': {
 pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
 greedy: true
},
'tag': {
 pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
 greedy: true,
 inside: {
   'tag': {
     pattern: /^<\/?[^\s>\/]+/,
     inside: {
       'punctuation': /^<\/?/,
       'namespace': /^[^\s>\/:]+:/
     }
   },
   'special-attr': [],
   'attr-value': {
     pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
     inside: {
       'punctuation': [{
         pattern: /^=/,
         alias: 'attr-equals'
       }, /"|'/]
     }
   },
   'punctuation': /\/?>/,
   'attr-name': {
     pattern: /[^\s>\/]+/,
     inside: {
       'namespace': /^[^\s>\/:]+:/
     }
   }
 }
},
'entity': [{
 pattern: /&[\da-z]{1,8};/i,
 alias: 'named-entity'
}, /&#x?[\da-f]{1,8};/i]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup; // Plugin to make entity title show the real entity, idea by Roman Komarov

Prism.hooks.add('wrap', function (env) {
if (env.type === 'entity') {
 env.attributes['title'] = env.content.replace(/&amp;/, '&');
}
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
/**
* Adds an inlined language to markup.
*
* An example of an inlined language is CSS with `<style>` tags.
*
* @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
* case insensitive.
* @param {string} lang The language key.
* @example
* addInlined('style', 'css');
*/
value: function addInlined(tagName, lang) {
 var includedCdataInside = {};
 includedCdataInside['language-' + lang] = {
   pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
   lookbehind: true,
   inside: Prism.languages[lang]
 };
 includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
 var inside = {
   'included-cdata': {
     pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
     inside: includedCdataInside
   }
 };
 inside['language-' + lang] = {
   pattern: /[\s\S]+/,
   inside: Prism.languages[lang]
 };
 var def = {};
 def[tagName] = {
   pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
     return tagName;
   }), 'i'),
   lookbehind: true,
   greedy: true,
   inside: inside
 };
 Prism.languages.insertBefore('markup', 'cdata', def);
}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
/**
* Adds an pattern to highlight languages embedded in HTML attributes.
*
* An example of an inlined language is CSS with `style` attributes.
*
* @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
* case insensitive.
* @param {string} lang The language key.
* @example
* addAttribute('style', 'css');
*/
value: function (attrName, lang) {
 Prism.languages.markup.tag.inside['special-attr'].push({
   pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
   lookbehind: true,
   inside: {
     'attr-name': /^[^\s=]+/,
     'attr-value': {
       pattern: /=[\s\S]+/,
       inside: {
         'value': {
           pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
           lookbehind: true,
           alias: [lang, 'language-' + lang],
           inside: Prism.languages[lang]
         },
         'punctuation': [{
           pattern: /^=/,
           alias: 'attr-equals'
         }, /"|'/]
       }
     }
   }
 });
}
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
/* **********************************************
  Begin prism-css.js
********************************************** */

(function (Prism) {
var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
Prism.languages.css = {
 'comment': /\/\*[\s\S]*?\*\//,
 'atrule': {
   pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
   inside: {
     'rule': /^@[\w-]+/,
     'selector-function-argument': {
       pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
       lookbehind: true,
       alias: 'selector'
     },
     'keyword': {
       pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
       lookbehind: true
     } // See rest below

   }
 },
 'url': {
   // https://drafts.csswg.org/css-values-3/#urls
   pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
   greedy: true,
   inside: {
     'function': /^url/i,
     'punctuation': /^\(|\)$/,
     'string': {
       pattern: RegExp('^' + string.source + '$'),
       alias: 'url'
     }
   }
 },
 'selector': {
   pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
   lookbehind: true
 },
 'string': {
   pattern: string,
   greedy: true
 },
 'property': {
   pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
   lookbehind: true
 },
 'important': /!important\b/i,
 'function': {
   pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
   lookbehind: true
 },
 'punctuation': /[(){};:,]/
};
Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
var markup = Prism.languages.markup;

if (markup) {
 markup.tag.addInlined('style', 'css');
 markup.tag.addAttribute('style', 'css');
}
})(Prism);
/* **********************************************
  Begin prism-clike.js
********************************************** */


Prism.languages.clike = {
'comment': [{
 pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
 lookbehind: true,
 greedy: true
}, {
 pattern: /(^|[^\\:])\/\/.*/,
 lookbehind: true,
 greedy: true
}],
'string': {
 pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
 greedy: true
},
'class-name': {
 pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
 lookbehind: true,
 inside: {
   'punctuation': /[.\\]/
 }
},
'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
'boolean': /\b(?:false|true)\b/,
'function': /\b\w+(?=\()/,
'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
'punctuation': /[{}[\];(),.:]/
};
/* **********************************************
  Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
'class-name': [Prism.languages.clike['class-name'], {
 pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
 lookbehind: true
}],
'keyword': [{
 pattern: /((?:^|\})\s*)catch\b/,
 lookbehind: true
}, {
 pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
 lookbehind: true
}],
// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
'number': {
 pattern: RegExp(/(^|[^\w$])/.source + '(?:' + ( // constant
 /NaN|Infinity/.source + '|' + // binary integer
 /0[bB][01]+(?:_[01]+)*n?/.source + '|' + // octal integer
 /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' + // hexadecimal integer
 /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' + // decimal bigint
 /\d+(?:_\d+)*n/.source + '|' + // decimal number (integer or float) but no bigint
 /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
 lookbehind: true
},
'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
'regex': {
 // eslint-disable-next-line regexp/no-dupe-characters-character-class
 pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
 lookbehind: true,
 greedy: true,
 inside: {
   'regex-source': {
     pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
     lookbehind: true,
     alias: 'language-regex',
     inside: Prism.languages.regex
   },
   'regex-delimiter': /^\/|\/$/,
   'regex-flags': /^[a-z]+$/
 }
},
// This must be declared before keyword because we use "function" inside the look-forward
'function-variable': {
 pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
 alias: 'function'
},
'parameter': [{
 pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
 lookbehind: true,
 inside: Prism.languages.javascript
}, {
 pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
 lookbehind: true,
 inside: Prism.languages.javascript
}, {
 pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
 lookbehind: true,
 inside: Prism.languages.javascript
}, {
 pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
 lookbehind: true,
 inside: Prism.languages.javascript
}],
'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
'hashbang': {
 pattern: /^#!.*/,
 greedy: true,
 alias: 'comment'
},
'template-string': {
 pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
 greedy: true,
 inside: {
   'template-punctuation': {
     pattern: /^`|`$/,
     alias: 'string'
   },
   'interpolation': {
     pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
     lookbehind: true,
     inside: {
       'interpolation-punctuation': {
         pattern: /^\$\{|\}$/,
         alias: 'punctuation'
       },
       rest: Prism.languages.javascript
     }
   },
   'string': /[\s\S]+/
 }
},
'string-property': {
 pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
 lookbehind: true,
 greedy: true,
 alias: 'property'
}
});
Prism.languages.insertBefore('javascript', 'operator', {
'literal-property': {
 pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
 lookbehind: true,
 alias: 'property'
}
});

if (Prism.languages.markup) {
Prism.languages.markup.tag.addInlined('script', 'javascript'); // add attribute support for all DOM events.
// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events

Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}

Prism.languages.js = Prism.languages.javascript;
/* **********************************************
  Begin prism-file-highlight.js
********************************************** */

(function () {
if (typeof Prism === 'undefined' || typeof document === 'undefined') {
 return;
} // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill


if (!Element.prototype.matches) {
 Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

var LOADING_MESSAGE = 'Loading…';

var FAILURE_MESSAGE = function (status, message) {
 return '✖ Error ' + status + ' while fetching file: ' + message;
};

var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';
var EXTENSIONS = {
 'js': 'javascript',
 'py': 'python',
 'rb': 'ruby',
 'ps1': 'powershell',
 'psm1': 'powershell',
 'sh': 'bash',
 'bat': 'batch',
 'h': 'c',
 'tex': 'latex'
};
var STATUS_ATTR = 'data-src-status';
var STATUS_LOADING = 'loading';
var STATUS_LOADED = 'loaded';
var STATUS_FAILED = 'failed';
var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
/**
* Loads the given file.
*
* @param {string} src The URL or path of the source file to load.
* @param {(result: string) => void} success
* @param {(reason: string) => void} error
*/

function loadFile(src, success, error) {
 var xhr = new XMLHttpRequest();
 xhr.open('GET', src, true);

 xhr.onreadystatechange = function () {
   if (xhr.readyState == 4) {
     if (xhr.status < 400 && xhr.responseText) {
       success(xhr.responseText);
     } else {
       if (xhr.status >= 400) {
         error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
       } else {
         error(FAILURE_EMPTY_MESSAGE);
       }
     }
   }
 };

 xhr.send(null);
}
/**
* Parses the given range.
*
* This returns a range with inclusive ends.
*
* @param {string | null | undefined} range
* @returns {[number, number | undefined] | undefined}
*/


function parseRange(range) {
 var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');

 if (m) {
   var start = Number(m[1]);
   var comma = m[2];
   var end = m[3];

   if (!comma) {
     return [start, start];
   }

   if (!end) {
     return [start, undefined];
   }

   return [start, Number(end)];
 }

 return undefined;
}

Prism.hooks.add('before-highlightall', function (env) {
 env.selector += ', ' + SELECTOR;
});
Prism.hooks.add('before-sanity-check', function (env) {
 var pre =
 /** @type {HTMLPreElement} */
 env.element;

 if (pre.matches(SELECTOR)) {
   env.code = ''; // fast-path the whole thing and go to complete

   pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading
   // add code element with loading message

   var code = pre.appendChild(document.createElement('CODE'));
   code.textContent = LOADING_MESSAGE;
   var src = pre.getAttribute('data-src');
   var language = env.language;

   if (language === 'none') {
     // the language might be 'none' because there is no language set;
     // in this case, we want to use the extension as the language
     var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
     language = EXTENSIONS[extension] || extension;
   } // set language classes


   Prism.util.setLanguage(code, language);
   Prism.util.setLanguage(pre, language); // preload the language

   var autoloader = Prism.plugins.autoloader;

   if (autoloader) {
     autoloader.loadLanguages(language);
   } // load file


   loadFile(src, function (text) {
     // mark as loaded
     pre.setAttribute(STATUS_ATTR, STATUS_LOADED); // handle data-range

     var range = parseRange(pre.getAttribute('data-range'));

     if (range) {
       var lines = text.split(/\r\n?|\n/g); // the range is one-based and inclusive on both ends

       var start = range[0];
       var end = range[1] == null ? lines.length : range[1];

       if (start < 0) {
         start += lines.length;
       }

       start = Math.max(0, Math.min(start - 1, lines.length));

       if (end < 0) {
         end += lines.length;
       }

       end = Math.max(0, Math.min(end, lines.length));
       text = lines.slice(start, end).join('\n'); // add data-start for line numbers

       if (!pre.hasAttribute('data-start')) {
         pre.setAttribute('data-start', String(start + 1));
       }
     } // highlight code


     code.textContent = text;
     Prism.highlightElement(code);
   }, function (error) {
     // mark as failed
     pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
     code.textContent = error;
   });
 }
});
Prism.plugins.fileHighlight = {
 /**
  * Executes the File Highlight plugin for all matching `pre` elements under the given container.
  *
  * Note: Elements which are already loaded or currently loading will not be touched by this method.
  *
  * @param {ParentNode} [container=document]
  */
 highlight: function highlight(container) {
   var elements = (container || document).querySelectorAll(SELECTOR);

   for (var i = 0, element; element = elements[i++];) {
     Prism.highlightElement(element);
   }
 }
};
var logged = false;
/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */

Prism.fileHighlight = function () {
 if (!logged) {
   console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
   logged = true;
 }

 Prism.plugins.fileHighlight.highlight.apply(this, arguments);
};
})();
})(prism);

var Prism = prism.exports;

class CodeEditor extends s$1 {
constructor(props = {}) {
   super();
   this.textArea = document.createElement('textarea');
   this.text = (text) => {
       const highlight = this.shadowRoot.getElementById('highlight');
       if (highlight) {
           const el = highlight.querySelector('code');
           let replacedText = text.replace(new RegExp("\&", "g"), "&amp").replace(new RegExp("\<", "g"), "&lt;"); // Don't Actually Create New HTML
           el.innerHTML = replacedText;
           Prism.highlightElement(el);
       }
   };
   this.scroll = (element) => {
       const highlight = this.shadowRoot.getElementById('highlight');
       if (highlight) {
           highlight.scrollTop = element.scrollTop;
           if (highlight.scrollTop < element.scrollTop)
               element.scrollTop = highlight.scrollTop;
           highlight.scrollLeft = element.scrollLeft;
       }
   };
   this.value = props.value ?? '';
   if (props.onInput)
       this.onInput = props.onInput;
   if (props.onSave)
       this.onSave = props.onSave;
   if (props.onReset)
       this.onReset = props.onReset;
   if (props.onClose)
       this.onClose = props.onClose;
   this.textArea.id = 'editor';
   this.textArea.spellcheck = false;
   this.textArea.oninput = (ev) => {
       this.text(this.textArea.value);
       this.scroll(ev.target);
       if (this.onInput instanceof Function)
           this.onInput(ev);
   };
}
static get styles() {
   return r$4 `


:host {
 
 width: 100%; 
 height: 100%; 
 overflow: scroll;
 background: rgb(205,205,205);

}

:host * {
 box-sizing: border-box;
 
}

:host > * {
 overflow: hidden;
}

#editorContainer {
 position: relative;
  width: 100%; 
  height: 100%;
}

h3 {
 margin: 0;
}

#actions {
 display: flex; 
 align-items: center; 
 justify-content: space-between; 
 padding: 10px 25px;
 z-index: 2;
}

button {
 margin: 0px;
 border-radius: 0px;
 border: 1px solid rgb(35,35,35);
 padding: 0px 15px;
 font-size: 60%;
}

textarea {
 border: none;
}

#editor {
 background: transparent;
 z-index: 1;
}


#highlight {
 // background-color: rgba(0,0,0,0.8) !important; 
 z-index: -1 !important;
 white-space: pre !important;
 position:absolute !important;
 top: 0 !important;
 left: 0 !important;
}

#editor, #highlight {
margin: 0px !important;
width: 100% !important;
height: 100% !important;
overflow: auto !important;
white-space: nowrap !important;
padding: 25px !important;
resize: none !important;
-moz-tab-size : 4 !important;
 -o-tab-size : 4 !important;
    tab-size : 4 !important;
}

#editor, #highlight, #highlight code {
 font-size: 12px !important;
 font-family: monospace !important;
 line-height: 20pt !important;
 box-sizing: border-box !important;
}

@media (prefers-color-scheme: dark) {

#editorContainer {
 background-color: rgb(20, 20, 20);
}

#editor {
 caret-color: white;
}
}

`;
}
static get properties() {
   return {
       value: {
           type: String,
           reflect: true,
       },
   };
}
willUpdate(changedProps) {
}
render() {
   const language = 'javascript';
   this.textArea.placeholder = `Write your ${language} code...`;
   this.textArea.value = this.value;
   return $ `
 <div id='editorContainer'>
   ${this.textArea}"
     <pre id="highlight" aria-hidden="true">
       <code class="language-${language}"></code>
   </pre>
</div>
`;
}
}
customElements.define('visualscript-code-editor', CodeEditor);

class GraphEdge extends s$1 {
constructor(props = {}) {
   super();
   this.svgInfo = {
       size: 500,
       radius: 5
   };
   this.link = (info) => {
       if (this.toResolve) {
           const port = info[this.toResolve.type];
           if (port) {
               const res = this.resolveIO(port, this.toResolve.type, this.toResolve.callback);
               if (res) {
                   this.toResolve.callback(true);
                   this.toResolve = null;
               }
               else
                   return false;
           }
       }
       else
           return false;
   };
   this.getOtherType = (type) => {
       return (type === 'input') ? 'output' : 'input';
   };
   this.updated = async () => {
       this.element = this.shadowRoot.querySelector('svg');
       if (!this.workspace)
           this.workspace = this.parentNode.parentNode.host;
       // Set Information
       const vb = this.element.getAttribute('viewBox').split(' ').map(v => +v);
       this.box = {
           xMin: vb[0], xMax: vb[0] + vb[2] - 1,
           yMin: vb[1], yMax: vb[1] + vb[3] - 1
       };
       const node = {
           p1: null,
           p2: null,
           c1: null,
           c2: null,
           c3: null,
           l1: null,
           l2: null,
           curve: null
       };
       'p1,p2,c1,c2,c3,l1,l2,curve'.split(',').map(s => {
           node[s] = this.element.getElementsByClassName(s)[0];
       });
       this.node = node;
       const res = await this.init().catch(e => this.resolveReady.reject(e));
       if (res)
           this.resolveReady.resolve(true);
   };
   this.getEdgeName = ({ input, output } = {
       input: this.input,
       output: this.output
   }) => {
       return `${output.node.id}-${output.tag}_${input.node.id}-${input.tag}`;
   };
   this.resolveIO = (el, typeNeeded, callback, origin) => {
       let hasType = this.getOtherType(typeNeeded);
       if (el instanceof GraphPort) {
           const expectedID = this[hasType].edges.has(this.getEdgeName({ [hasType]: this[hasType], [typeNeeded]: el }));
           if (expectedID) {
               callback('Edge already exists...');
               return false;
           }
           else if (this[hasType].shadowRoot.contains(el)) {
               callback('Cannot connect to self...');
               return false;
           }
           else {
               // const parentClassList = el.parentNode.parentNode.classList as DOMTokenList
               // if (Array.from(parentClassList).find(str => str.includes(typeNeeded))){
               this[typeNeeded] = el;
               callback(true);
               return true;
               // } else {
               //   callback('Cannot connect two ports of the same type.')
               //   return false
               // }
           }
       }
       else {
           if (!this.firstUp && origin === 'up') {
               this.firstUp = false;
               callback('Edge not completed...');
               return false;
           }
       }
   };
   // Behavior
   this.mouseAsTarget = (type, upCallback) => {
       let label = (type === 'output') ? 'p1' : 'p2';
       let otherType = this.getOtherType(type);
       let onMouseMove = (e) => {
           this.resize();
           let dims = this[otherType].shadowRoot.querySelector(`.${type}`).getBoundingClientRect();
           let svgO = this.svgPoint(this.element, dims.left + dims.width / 2, dims.top + dims.height / 2);
           let svgP = this.svgPoint(this.element, e.clientX, e.clientY);
           if (isNaN(svgP.x))
               svgP.x = svgO.x;
           if (isNaN(svgP.y))
               svgP.y = svgO.y;
           this.updateElement(this.node[label], {
               cx: svgP.x,
               cy: svgP.y
           });
           let points = ((type === 'output') ? [svgP, svgO] : [svgO, svgP]);
           this.updateControlPoints(...points);
           this.drawCurve();
       };
       this.workspace.element.addEventListener('mousemove', onMouseMove);
       this.workspace.element.dispatchEvent(new Event('mousemove'));
       this.toResolve = {
           type,
           callback: (res) => {
               upCallback(res);
               this.workspace.element.removeEventListener('mouseup', onMouseUp);
               this.workspace.element.removeEventListener('mousemove', onMouseMove);
           }
       };
       let onMouseUp = (e) => {
           if (this.firstUp == undefined)
               this.firstUp = true;
           else
               this.firstUp = false;
           this.resolveIO(e.target, type, this.toResolve.callback, 'up');
       };
       this.workspace.element.addEventListener('mouseup', onMouseUp);
   };
   this.init = async () => {
       return new Promise(async (resolve, reject) => {
           let res = await this.insert(); // insert into UI     
           let match, compatible, outputType, targetType;
           if (res === true) {
               // Check Edge Compatibility
               let coerceType = (t) => {
                   if (t === 'float')
                       return 'number';
                   else if (t === 'int')
                       return 'number';
                   else
                       return t;
               };
               outputType = coerceType(this.output.output.getAttribute('data-visualscript-type'));
               targetType = coerceType(this.input.input.getAttribute('data-visualscript-type'));
               let checkCompatibility = (output, input) => {
                   return output == input || (output === undefined || input === undefined) || (input instanceof Object && output instanceof Object);
               };
               compatible = checkCompatibility(outputType, targetType);
           }
           if (res === true && match == null && compatible)
               resolve(true);
           else {
               // this.deinit()
               // if (match == null) reject(`edge from ${this.output?.node?.name} (${this.output?.name}) to ${this.input?.node?.name} (${this.input?.name}) already exists`) // not currently checking
               // else 
               reject(res);
           }
       });
   };
   this.insert = () => {
       return new Promise(async (resolve) => {
           const workspace = this.workspace ?? this.output?.node?.workspace ?? this.input?.node?.workspace;
           const types = ['input', 'output'];
           types.forEach(t => {
               if (this[t] == null) {
                   workspace.editing = this;
                   this.mouseAsTarget(t, (res) => {
                       workspace.editing = null;
                       resolve(res);
                   });
               }
           });
           this.drawCurve();
           if (this.output && this.input)
               resolve(true);
       });
   };
   this._activate = async () => {
       console.log('_activate function not added again...');
       // let sP = this.output
       // let tP = this.input
       // Activate Functionality
       // this.parent.app.state.data[this.uuid] = this.value
       // this.subscription = this.parent.app.state.subscribeTrigger(this.uuid, this.onchange)
       // Register Edge in Ports
       // this.output.node.edges.set(this.uuid, this)
       // this.input.node.edges.set(this.uuid, this)
       // sP.addEdge('output', this)
       // tP.addEdge('input', this)
       // Activate Dynamic Analyses
       // if (tP.analysis && (tP.edges.input.size > 0 || tP.type === null) && (tP.edges.output.size > 0 || tP.type === null)) this.parent.app.analysis.dynamic.push(...tP.analysis)
       // if (sP.analysis && (sP.edges.input.size > 0 || sP.type === null) && (sP.edges.output.size > 0 || sP.type === null)) this.parent.app.analysis.dynamic.push(...sP.analysis)
       // Update Brainstorm ASAP
       // let brainstormTarget = this.target.node.className === 'Brainstorm'
       // if (brainstormTarget) {
       //     this.parent.app.streams.push(this.output.port.label) // Keep track of streams
       //     await this.update() // Pass to Brainstorm
       // }
       // Setup Onstart Callbacks (send to Brainstorm OR Elements, Functions, or Objects)
       // let isElement = sP.value instanceof Element || sP.value instanceof HTMLDocument
       // let isFunction = sP.value instanceof Function
       // let isObject = sP.value instanceof Object
       // let isGLSL = sP.output?.type === 'GLSL'
       // let isHTML = sP.output?.type === 'HTML'
       // let isCSS = sP.output?.type === 'CSS'
       // if (brainstormTarget || isElement || isFunction  || isObject || isGLSL || isHTML || isCSS) {
       //   this.onstart.push(this.update) // Pass on applicadtion start
       // }
       // if (this.parent.app.props.ready) await this.update() // Indiscriminately activate edge with initial value (when drawing edge)
       this.addReactivity();
   };
   // drag handler
   this.dragHandler = (event) => {
       event.preventDefault();
       const target = event.target;
       const type = event.type;
       const svgP = this.svgPoint(this.element, event.clientX, event.clientY);
       // start drag
       if (!this.drag && type === 'pointerdown' && target.classList.contains('control')) {
           this.drag = {
               node: target,
               start: this.getControlPoint(target),
               cursor: svgP
           };
           this.drag.node.classList.add('drag');
       }
       // move element
       if (this.drag && type === 'pointermove') {
           this.updateElement(this.drag.node, {
               cx: Math.max(this.box.xMin, Math.min(this.drag.start.x + svgP.x - this.drag.cursor.x, this.box.xMax)),
               cy: Math.max(this.box.yMin, Math.min(this.drag.start.y + svgP.y - this.drag.cursor.y, this.box.yMax))
           });
           this.drawCurve();
       }
       // stop drag
       if (this.drag && type === 'pointerup') {
           this.drag.node.classList.remove('drag');
           this.drag = null;
       }
   };
   // translate page to SVG co-ordinate
   this.svgPoint = (svg, x, y) => {
       var pt = new DOMPoint(x, y);
       pt.x = x;
       pt.y = y;
       return pt.matrixTransform(svg.getScreenCTM().inverse());
   };
   // update element
   this.updateElement = (element, attr) => {
       for (let a in attr) {
           let v = attr[a];
           element.setAttribute(a, isNaN(v) ? v : Math.round(v));
       }
   };
   // get control point location
   this.getControlPoint = (circle) => {
       return {
           x: Math.round(+circle.getAttribute('cx')),
           y: Math.round(+circle.getAttribute('cy'))
       };
   };
   this.updateControlPoints = (p1, p2) => {
       let curveMag = 0.5 * Math.abs((p2.y - p1.y));
       this.updateElement(this.node['c1'], {
           cx: p1.x + curveMag,
           cy: p1.y
       });
       this.updateElement(this.node['c2'], {
           cx: p2.x - curveMag,
           cy: p2.y
       });
       this.updateElement(this.node['c3'], {
           cx: (p1.x + p2.x) / 2,
           cy: (p1.y + p2.y) / 2,
       });
   };
   // update curve
   this.drawCurve = () => {
       const p1 = this.getControlPoint(this.node.p1), p2 = this.getControlPoint(this.node.p2), c1 = this.getControlPoint(this.node.c1); this.getControlPoint(this.node.c2); const c3 = this.getControlPoint(this.node.c3);
       // curve
       const d = `M${p1.x},${p1.y} Q${c1.x},${c1.y} ${c3.x},${c3.y} T${p2.x},${p2.y}` +
           (this.node.curve.classList.contains('fill') ? ' Z' : '');
       this.updateElement(this.node.curve, { d });
   };
   this.addReactivity = () => {
       this.node['curve'].addEventListener('mouseover', () => { this._onMouseOverEdge(); });
       this.node['curve'].addEventListener('mouseout', () => { this._onMouseOutEdge(); });
       this.node['curve'].addEventListener('click', () => { this._onClickEdge(); });
   };
   this._onMouseOverEdge = () => {
       this.node['curve'].style.opacity = `0.3`;
   };
   this._onMouseOutEdge = () => {
       this.node['curve'].style.opacity = `1`;
   };
   this._onClickEdge = () => {
       this.deinit();
   };
   this.deinit = () => {
       if (this.output)
           this.output.deleteEdge(this.id);
       if (this.input)
           this.input.deleteEdge(this.id);
       // this.output.node.info.unsubscribe(this.input.node.info.id)
       this.remove();
   };
   this.resize = () => {
       // Grab Elements
       let arr = [
           { type: 'output', node: 'p1' },
           { type: 'input', node: 'p2' },
       ];
       let svgPorts = arr.map(o => {
           let port = this[o.type];
           if (port) {
               let portDim = port.shadowRoot.querySelector(`.${o.type}`).getBoundingClientRect();
               let svgPort = this.svgPoint(this.element, portDim.left + portDim.width / 2, portDim.top + portDim.height / 2);
               // Update Edge Anchor
               this.updateElement(this.node[o.node], {
                   cx: svgPort.x,
                   cy: svgPort.y
               });
               return svgPort;
           }
       });
       svgPorts = svgPorts.filter(s => s != undefined);
       if (svgPorts.length > 1)
           this.updateControlPoints(...svgPorts);
       this.drawCurve();
   };
   this.output = props.output;
   this.input = props.input;
   this.workspace = props.workspace;
   this.ready = new Promise((resolve, reject) => {
       this.resolveReady = {
           resolve: (arg) => {
               this.id = this.getEdgeName();
               this.output.setEdge(this);
               this.input.setEdge(this);
               resolve(arg);
           }, reject
       };
   });
}
static get styles() {
   return r$4 `

:host {
   --grid-color: rgb(210, 210, 210);
}

:host{
   display: block;
   height: 100%;
   width: 100%;
   position: absolute;
   background: transparent;
   pointer-events: none;
   box-sizing: border-box;
   /* z-index: 1; */
}

:host(.editing) svg {
 pointer-events: none;
}
 
:host svg {
   pointer-events: none;
   display: block;
   height: 100%;
   width: 100%;
   position: relative;
   background: transparent;
   touch-action: none;
   /* z-index: 1; */
}

 :host path {
   pointer-events: all;
   stroke-width: 2;
   stroke: rgb(60, 60, 60);
   stroke-linecap: round;
   fill: none;
   transition: stroke 0.5s;
   transition: stroke-width 0.5s;
   cursor: pointer;
 }

 :host path.updated {
   /* stroke: rgb(255, 105, 97); */
   stroke-width: 3;
   stroke: rgb(129, 218, 250);
}
 
 :host .control {
   stroke-width: 3;
   stroke: transparent;
   fill: transparent;
   /* fill: #c00;
   cursor: move; */
 }
 
 /* :host .control:hover, #mysvg .control.drag
 {
   fill: #c00;
   cursor: move;
 }
  */
 :host line
 {
   /* stroke-width: 2;
   stroke: #999;
   stroke-linecap: round;
   stroke-dasharray: 5,5; */
   stroke: transparent;
   fill: transparent;
 }  

 @media (prefers-color-scheme: dark) { 

   :host {
       --grid-color: rgb(45, 45, 45);
   }

   :host path {
     stroke: white;
   }
   
 }

`;
}
static get properties() {
   return {
       // tree: {
       //   type: Object,
       //   reflect: false,
       // },
       keys: {
           type: Object,
           reflect: true,
       },
   };
}
render() {
   // const content = this.keys?.map(key => this.getElement(key, this.tree)) 
   // return until(Promise.all(content).then((data) => {
   return $ `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.svgInfo.size} ${this.svgInfo.size}">
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="p1 control" />
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="p2 control" />

     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="c1 control" />
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="c2 control" />
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="c3 control" />

     <line x1="0" y1="0" x2="0" y2="0" class="l1"/>
     <line x1="0" y1="0" x2="0" y2="0" class="l2"/>

     <path d="M0,0 Q0,0 0,0" class="curve" @click=${this.deinit}/>
</svg>`;
   // }), html`<span>Loading...</span>`)
}
}
customElements.define('visualscript-graph-edge', GraphEdge);

class GraphPort extends s$1 {
constructor(props = {}) {
   super();
   this.output = document.createElement('div');
   this.input = document.createElement('div');
   this.resolving = false;
   this.edges = new Map();
   this.setEdge = (edge) => {
       this.edges.set(edge.id, edge);
       this.node.setEdge(edge); // Nodify node
   };
   this.deleteEdge = (id) => {
       this.edges.delete(id);
       this.node.deleteEdge(id); // Nodify node
   };
   this.resolveEdge = async (ev) => {
       if (!this.resolving) {
           this.resolving = true;
           const type = (ev.path[0].classList.contains('input')) ? 'input' : 'output';
           if (this.node.workspace)
               await this.node.workspace.resolveEdge({ [type]: this });
           this.resolving = false;
       }
   };
   this.onmousedown = this.resolveEdge;
   this.onmouseup = (ev) => {
       if (this.node.workspace.editing instanceof GraphEdge)
           this.resolveEdge(ev);
   };
   this.node = props.node;
   this.tag = props.tag;
   this.output.classList.add('port');
   this.output.classList.add('output');
   this.input.classList.add('port');
   this.input.classList.add('input');
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

:host {
   display: block;
   pointer-events: none;
   --grid-color: rgb(210, 210, 210);
}

:host > div {
   width: 100%;
   display: flex; 
   align-items: center;
   justify-content: space-between;
   color: white;
   font-size:7px;
}

.input {
 transform: translateX(-50%);
 left: 0;
}

.output {
 transform: translateX(50%);
 right: 0;
}

.port {
 pointer-events: all;
 width: 10px;
 height: 10px;
 background: gray;
 cursor: pointer;
 border-radius: 10px;
 z-index: -1;
}

 @media (prefers-color-scheme: dark) { 

   :host {
       --grid-color: rgb(45, 45, 45);
   }
   
 }

`;
}
static get properties() {
   return {
       tag: {
           type: String,
           reflect: true,
       },
       keys: {
           type: Object,
           reflect: true,
       },
   };
}
// set = async (tree={}) => {
//   this.tree = tree
//   this.keys = Object.keys(this.tree)
// }
updated(changedProperties) {
   this.element = this.shadowRoot.querySelector("div");
   if (!this.node)
       this.node = this.parentNode.parentNode.parentNode.host;
}
render() {
   return $ `
   <div>
     ${this.input}
     ${this.tag}
     ${this.output}
   </div>
 `;
}
}
customElements.define('visualscript-graph-port', GraphPort);

class GraphNode extends s$1 {
constructor(props = {}) {
   super();
   this.edges = new Map();
   this.ports = new Map();
   this.willUpdate = (updatedProps) => {
       if (updatedProps.has('x') || updatedProps.has('y')) {
           this.info.x = this.x; // brainsatplay extension
           this.info.y = this.y; // brainsatplay extension
       }
   };
   this.setEdge = (edge) => this.edges.set(edge.id, edge);
   this.deleteEdge = (id) => this.edges.delete(id);
   this.addPort = (info) => {
       const port = new GraphPort(Object.assign({ node: this }, info));
       this.ports.set(port.tag, port);
   };
   this.workspace = props.workspace;
   this.info = props.info ?? {};
   this.id = `${this.info.tag}${Math.round(10000 * Math.random())}`; // TODO: Make these informative
   this.info.x = this.x = props.x ?? this.info.x ?? 0;
   this.info.y = this.y = props.y ?? this.info.y ?? 0;
   if (this.info) {
       // console.log(this.info)
       this.info.arguments.forEach((value, tag) => {
           // console.log('arg', tag, value)
           this.addPort({
               tag,
               value
           });
       });
   }
}
static get styles() {
   return r$4 `

:host {
 position: absolute;
 box-sizing: border-box;
 top: 10px;
 left: 10px;
 user-select: none;
 z-index: 1;
}

:host {
   --grid-color: rgb(210, 210, 210);
}

:host > div {
   width: 50px;
   background: rgb(60,60,60);
   cursor: move;
}

#header {
 color: white;
 font-size: 8px;
 background: black;
 padding: 5px;
 font-weight: 800;
}

#ports visualscript-graph-port{
 padding: 2px 0px;
}

@media (prefers-color-scheme: dark) { 

 :host {
     --grid-color: rgb(45, 45, 45);
 }
 
}

`;
}
static get properties() {
   return {
       x: {
           type: Number,
           reflect: true,
       },
       y: {
           type: Number,
           reflect: true,
       },
       keys: {
           type: Object,
           reflect: true,
       },
   };
}
// set = async (tree={}) => {
//   this.tree = tree
//   this.keys = Object.keys(this.tree)
// }
updated(changedProperties) {
   this.element = this.shadowRoot.querySelector("div");
   if (!this.workspace)
       this.workspace = this.parentNode.parentNode.host;
}
render() {
   return $ `

   <style>

   :host {
     transform: scale(${1}) translate(${this.x}px, ${this.y}px);
   }


   </style>
   <div>
     <div id="header">
       ${this.info.tag}
     </div>
     <div id="ports">
         ${Array.from(this.ports.values())}
     </div>
   </div>
 `;
}
}
customElements.define('visualscript-graph-node', GraphNode);

const dragElement = (workspace, dragItem, onMove, onDown, onUp) => {
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var defaultScale = 1.0;
// container.addEventListener("touchstart", dragStart, false);
// container.addEventListener("touchend", dragEnd, false);
// container.addEventListener("touchmove", drag, false);
dragItem.shadowRoot.addEventListener("mousedown", dragStart, false);
window.addEventListener("mouseup", dragEnd, false);
window.addEventListener("mousemove", drag, false);
// let transform = dragItem.style.cssText.match(/transform: ([^;].+);\s?/) // TODO: Check persistence
// let transformString: string
// if (transform) transformString = transform[1]
// if (transformString) {
//   // let scale = transformString.match(/scale\(([^\)].+)\)\s?/)
//   // if (scale) scale = scale[1]
//   // else scale = 1
//   let translateString = transformString.match(/translate\(([^\)].+)\)\s?/)
//   if (translateString){
//     let arr = translateString[1].split(',')
//     xOffset = parseFloat(arr[0].split('px')[0])
//     yOffset = parseFloat(arr[1].split('px')[0])
//   }
// } else {
//   dragItem.style.transform = `scale(${defaultScale})`;
// }
function dragStart(e) {
   if (e.type === "touchstart") {
       initialX = (e.touches[0].clientX - (workspace.context.scale * defaultScale) * dragItem.x);
       initialY = (e.touches[0].clientY - (workspace.context.scale * defaultScale) * dragItem.y);
   }
   else {
       initialX = (e.clientX - (workspace.context.scale * defaultScale) * dragItem.x);
       initialY = (e.clientY - (workspace.context.scale * defaultScale) * dragItem.y);
   }
   // Account For Nested Control Objects
   if (dragItem.shadowRoot.contains(e.target)) {
       if (!(e.target instanceof GraphPort))
           active = true;
       onDown();
   }
}
function dragEnd() {
   initialX = currentX;
   initialY = currentY;
   active = false;
   onUp();
}
function drag(e) {
   if (active) {
       e.preventDefault();
       if (e.type === "touchmove") {
           currentX = (e.touches[0].clientX - initialX) / (workspace.context.scale * defaultScale);
           currentY = (e.touches[0].clientY - initialY) / (workspace.context.scale * defaultScale);
       }
       else {
           currentX = (e.clientX - initialX) / (workspace.context.scale * defaultScale);
           currentY = (e.clientY - initialY) / (workspace.context.scale * defaultScale);
       }
       dragItem.x = currentX;
       dragItem.y = currentY;
       onMove();
   }
}
};

class GraphWorkspace extends s$1 {
constructor(props = {}) {
   super();
   this.updateCount = 0;
   this.context = {
       scale: 1
   };
   this.editing = null;
   this.mouseDown = false;
   this.translation = { x: 0, y: 0 };
   this.nodes = new Map();
   this.edges = new Map();
   this.set = async (graph) => {
       this.graph = graph;
       this.triggerUpdate();
   };
   this.resize = (nodes = Array.from(this.nodes.values())) => {
       nodes.forEach(node => node.edges.forEach(e => e.resize()));
   };
   this.triggerUpdate = () => {
       this.updateCount = this.updateCount + 1;
   };
   this.resolveEdge = async (info, rerender = true) => {
       if (!(this.editing instanceof GraphEdge)) {
           const tempId = `${Math.round(10000 * Math.random())}`;
           const edge = new GraphEdge(Object.assign({ workspace: this }, info));
           this.editing = edge;
           this.edges.set(tempId, edge);
           if (rerender)
               this.triggerUpdate();
           const res = await edge.ready.catch(e => console.error(e));
           if (res) {
               this.edges.delete(tempId);
               this.edges.set(edge.id, edge);
               edge.resize();
           }
           this.editing = null;
           return edge;
       }
       else
           this.editing.link(info);
   };
   this.autolayout = () => {
       let count = 0;
       let rowLen = 5;
       let offset = 20;
       this.nodes.forEach((n) => {
           n.x = offset + 100 * (count % rowLen);
           n.y = offset + 150 * (Math.floor(count / rowLen));
           count++;
       });
   };
   this.createUIFromGraph = () => {
       let nodes = '';
       let hasMoved = false;
       if (this.graph) {
           this.graph.nodes.forEach((n) => {
               let gN = this.nodes.get(n.tag);
               if (!gN) {
                   gN = new GraphNode({
                       info: n,
                       workspace: this
                   });
                   this.nodes.set(gN.info.tag, gN);
               }
               hasMoved = gN.x !== 0 && gN.y !== 0;
               return gN;
           });
           // Create Edges to Children
           const nodeArr = Array.from(this.nodes.values());
           const createEdges = async () => {
               for (let i = 0; i < nodeArr.length; i++) {
                   let n = nodeArr[i];
                   if (n.info.children) {
                       for (let j = 0; j < n.info.children.length; j++) {
                           const node = n.info.children[j];
                           const gNParent = this.nodes.get(n.info.tag);
                           const output = gNParent.ports.get(gNParent.info.arguments.keys().next().value); // First key
                           const gNChild = this.nodes.get(node.tag);
                           const input = gNChild.ports.get(gNChild.info.arguments.keys().next().value); // First key
                           await this.resolveEdge({
                               input,
                               output
                           });
                       }
                   }
               }
           };
           createEdges();
           if (!hasMoved)
               this.autolayout();
       }
       return nodes;
   };
   // Behavior
   this._scale = (e) => {
       this.context.scale += 0.01 * -e.deltaY;
       if (this.context.scale < 0.1)
           this.context.scale = 0.1; // clamp
       if (this.context.scale > 3.0)
           this.context.scale = 3.0; // clamp
       this._transform();
   };
   this._transform = () => {
       this.element.style['transform'] = `translate(${this.translation.x}px, ${this.translation.y}px) scale(${this.context.scale * 100}%)`;
   };
   this._pan = (e) => {
       if (!this.editing) {
           if (e.target.parentNode) {
               // Transform relative to Parent
               let rectParent = e.target.parentNode.getBoundingClientRect();
               let curXParent = (e.clientX - rectParent.left) / rectParent.width; //x position within the element.
               let curYParent = (e.clientY - rectParent.top) / rectParent.height; //y position within the element.
               if (this.mouseDown) {
                   let tX = (curXParent - this.relXParent) * rectParent.width;
                   let tY = (curYParent - this.relYParent) * rectParent.height;
                   if (!isNaN(tX) && isFinite(tX))
                       this.translation.x += tX;
                   if (!isNaN(tY) && isFinite(tY))
                       this.translation.y += tY;
                   this._transform();
               }
               this.relXParent = curXParent;
               this.relYParent = curYParent;
           }
       }
   };
   if (props?.graph)
       this.set(props.graph);
   // Resize with Window Resize
   window.addEventListener('resize', () => {
       this.resize();
   });
   // let i = 0
   // window.addEventListener('keydown', (ev) => {
   //   switch(ev.code) {
   //     case 'Enter': 
   //       const tag = `Node${i}`
   //       let gN = new GraphNode({
   //         info: {
   //           tag
   //         },
   //         workspace: this
   //       })
   //       this.nodes.set(tag, gN)
   //       this.triggerUpdate()
   //       i++
   //       break;
   //   }
   // })
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

:host {
   overflow: hidden;
   --grid-color: rgb(210, 210, 210);
}

:host #grid {
   position: relative;
   background-image:
   repeating-linear-gradient(var(--grid-color) 0 1px, transparent 1px 100%),
   repeating-linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px 100%);
   background-size: 20px 20px;
   width: 100%;
   height: 100%;
}

:host #grid:active:hover {
 cursor: move;
}


 @media (prefers-color-scheme: dark) { 
   :host {
       --grid-color: rgb(45, 45, 45);
   }
 }

`;
}
static get properties() {
   return {
       // tree: {
       //   type: Object,
       //   reflect: false,
       // },
       updateCount: {
           type: Number,
           reflect: true,
       },
   };
}
updated() {
   this.element = this.shadowRoot.querySelector("div");
   this.addEventListener('mousedown', e => { this.mouseDown = true; });
   window.addEventListener('mouseup', e => { this.mouseDown = false; });
   this.addEventListener('wheel', this._scale);
   this.addEventListener('mousemove', this._pan);
   this.nodes.forEach((node) => {
       dragElement(this, node, () => {
           this.resize([node]);
       }, () => {
           if (!this.editing)
               this.editing = node;
       }, () => {
           if (this.editing instanceof GraphNode)
               this.editing = null;
       });
   });
}
render() {
   // Get Nodes from Graph
   this.createUIFromGraph();
   // Auto Layout
   return $ `
   <div id=grid>
       ${Array.from(this.nodes.values())}
       ${Array.from(this.edges.values())}
   </div>
 `;
}
}
customElements.define('visualscript-graph-workspace', GraphWorkspace);

class GraphEditor extends s$1 {
constructor(props = {}) {
   super();
   this.history = [];
   this.set = async (graph) => {
       this.graph = graph;
       this.workspace.set(this.graph);
       this.keys = Object.keys(this.graph);
   };
   this.getElement = async (key, o) => {
       let display;
       const val = await Promise.resolve(o[key]);
       if (typeof val === 'string' && val.includes('data:image')) {
           display = document.createElement('img');
           display.src = val;
           display.style.height = '100%';
       }
       else {
           display = new Input();
           display.value = val;
           display.oninput = () => {
               o[key] = display.value; // Modify original data
           };
       }
       const isObject = typeof val === 'object';
       return $ `
   <div class="attribute separate">
   <div class="info">
     <span class="name">${key}</span><br>
     <span class="value">${(isObject
           ? (Object.keys(val).length ? val.constructor?.name : $ `Empty ${val.constructor?.name}`)
           : '')}</span>
   </div>
     ${key}${o}
   </div>`;
   };
   this.workspace = new GraphWorkspace(props);
   if (props?.graph)
       this.set(props.graph);
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

img {
 max-height: 100px;
}

.container {
 width: 100%;
 align-items: center;
 justify-content: center;
 position: relative;
 overflow: scroll;
 height: 100%;
}

.separate {
 display: flex;
 align-items: center;
 justify-content: space-between;
}

.attribute {
 width: 100%;
 font-size: 90%;
 padding: 15px;
 flex-grow: 1;
 flex-wrap: wrap;
}

.info {
 display: flex;
 align-items: center;
}

.name {
 font-weight: 800;
 padding-right: 10px;
}

.value {
 font-size: 80%;
}

@media (prefers-color-scheme: dark) {
 :host > * {
   background-color: rgb(40, 40, 40);
 }
}

`;
}
static get properties() {
   return {
       // graph: {
       //   type: Object,
       //   reflect: false,
       // },
       keys: {
           type: Object,
           reflect: true,
       },
   };
}
render() {
   // const content = this.keys?.map(key => this.getElement(key, this.graph)) 
   // return until(Promise.all(content).then((data) => {
   return $ `
   <div class="container">
     ${this.workspace}
   </div>
 `;
   // }), html`<span>Loading...</span>`)
}
}
customElements.define('visualscript-graph-editor', GraphEditor);

class DeviceEditor extends s$1 {
static get styles() {
   return r$4 `
:host {
 width: 100%;
 height: 100%;
 box-sizing: border-box;
}

:host * {
 
 box-sizing: border-box;
 
}
`;
}
static get properties() {
   return {};
}
constructor(props = { target: {}, header: 'Object' }) {
   super();
}
render() {
   return $ `

 <slot></slot>
`;
}
}
customElements.define('visualscript-device-editor', DeviceEditor);

class SessionEditor extends s$1 {
static get styles() {
   return r$4 `
:host {
 width: 100%;
 height: 100%;
 box-sizing: border-box;
}

:host * {
 
 box-sizing: border-box;
 
}
`;
}
static get properties() {
   return {};
}
constructor(props = { target: {}, header: 'Object' }) {
   super();
}
render() {
   return $ `

 <slot></slot>
`;
}
}
customElements.define('visualscript-session-editor', SessionEditor);

const slotGrid = r$4 `

slot {
display: grid;
grid-template-columns: 1fr fit-content(100%);
grid-template-rows: fit-content(75px) 1fr fit-content(75px);
grid-template-areas: 
     "nav nav"
     "main side"
     "foot foot";

width: 100%;
height: 100%;
}

`;
class Dashboard extends s$1 {
constructor(props = {}) {
   super();
   this.apps = new Map();
   this.open = props.open ?? true;
   this.closeHandler = props.closeHandler ?? (() => { });
   if (props.toggletext)
       this.toggletext = props.toggletext;
   this.toggle = (typeof props.toggle === 'string') ? document.getElementById(props.toggle) : props.toggle;
}
static get styles() {
   return r$4 `

:host {
 color-scheme: light dark;
 position: relative;
 width: 100%;
 height: 100%;
 box-sizing: border-box;
 grid-area: main;
 overflow: hidden;
}

:host([global]) {
 position: absolute;
 top: 0;
 left: 0;
 z-index: 1000;
 pointer-events: none;
}

:host([open]) {
 pointer-events: all;
}


:host([global]) slot {
 opacity: 0;
 pointer-events: none;
}

:host([open]) #close {
 display: block;
}

:host * {
 box-sizing: border-box;
}

slot {
 background: white;
 color: black;
}

${slotGrid}

:host([open]) slot {
 opacity: 1;
 pointer-events: all;
}

#close {
 position: absolute; 
 top: 22px;
 right: 22px;
 z-index: 101;
 display: none;
}

#dashboard-toggle {
 background: white;
 position: absolute; 
 pointer-events: all;
 top: 0px;
 right: 22px;
 z-index: 1000;
 color: black;
 border: 1px solid black;
 border-top: none;
 padding: 10px 15px;
 cursor: pointer;
 font-size: 70%;
 font-weight: bold;
 border-bottom-left-radius: 7px;
 border-bottom-right-radius: 7px;
 box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
}

:host([open]) #dashboard-toggle {
 display: none;
}

@media (prefers-color-scheme: dark) {
 slot {
   color: white;
   background: black;
 }

 #dashboard-toggle { 
   border: 1px solid white;
   border-top: none;
   color: white;
   box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
   background: black;
 }
}
`;
}
static get properties() {
   return {
       toggletext: {
           type: String,
           reflect: true
       },
       toggle: {
           type: Object,
           reflect: true
       },
       open: {
           type: Boolean,
           reflect: true,
       },
       closeHandler: {
           type: Function,
           reflect: true,
       },
       global: {
           type: Boolean,
           reflect: true,
       },
   };
}
render() {
   // Add Global Class
   if (this.global)
       this.classList.add('global');
   else
       this.classList.remove('global');
   if (this.global) {
       const apps = document.querySelectorAll('visualscript-app');
       for (var i = 0; i < apps.length; i++) {
           const app = apps[i];
           if (!this.apps.has(app.name))
               this.apps.set(app.name, app);
       }
   }
   // Add Open Class
   if (this.open)
       this.classList.add('open');
   else {
       this.classList.remove('open');
       this.dispatchEvent(new CustomEvent('close'));
   }
   this.main = this.querySelector('visualscript-main');
   this.footer = this.querySelector('visualscript-footer');
   this.nav = this.querySelector('visualscript-nav');
   this.sidebar = this.querySelector('visualscript-sidebar');
   const onClick = () => {
       this.open = true;
       const selectedApp = this.apps.values().next().value;
       // Always open the app first!
       selectedApp.toggle.shadowRoot.querySelector('button').click();
   };
   if (this.toggle)
       this.toggle.onclick = onClick;
   return $ `
 ${(this.global && !this.toggle) ? $ `<div id="dashboard-toggle" @click=${onClick}>${this.toggletext ?? 'Edit'}</div>` : ''}
 ${this.global ? $ `<visualscript-button id='close' secondary size="small" @click=${() => this.open = false}>Close</visualscript-button>` : ``}
 <slot>
 </slot>
`;
}
}
customElements.define('visualscript-dashboard', Dashboard);

const TabTogglePropsList = {
// name : {
//   type: String,
//   reflect: true
// },
selected: {
   type: Boolean,
   reflect: true
},
grow: {
   type: Boolean,
   reflect: true
}
};
class TabToggle extends s$1 {
constructor(props) {
   super();
   this.grow = false;
   this.select = (toggles) => {
       if (this.to.on instanceof Function)
           this.to.on(this);
       // Show Correct Tab
       if (!toggles) {
           let parent = this.parentNode;
           let bar = ((!(parent instanceof HTMLElement)) ? parent.host : parent);
           toggles = bar.querySelectorAll('visualscript-tab-toggle'); // Get toggles
           if (toggles.length === 0)
               toggles = bar.shadowRoot.querySelectorAll('visualscript-tab-toggle');
       }
       if (toggles) {
           this.selected = true;
           // if (this.to.style.display === 'none') {
           toggles.forEach(t => {
               if (t != this) {
                   t.selected = false;
                   t.to.style.display = 'none';
                   t.to.off(this);
               }
               else {
                   t.to.style.display = '';
               } // hide other tabs
           });
           // }
       }
       else
           console.warn('No TabBar instance in the global Main');
       // Swap Sidebar Content
       const dashboard = this.to.dashboard;
       if (dashboard) {
           const sidebar = dashboard.querySelector('visualscript-sidebar');
           if (sidebar) {
               sidebar.content = (this.to.controlPanel.children.length) ? this.to.controlPanel : '';
           }
       }
   };
   this.to = props.tab;
   if (props.grow)
       this.grow = props.grow;
   if (props.selected)
       this.selected = props.selected;
}
static get styles() {
   return r$4 `

:host {
 user-select: none;
}

:host([grow]) {
 flex-grow: 1;
}

:host * {
 box-sizing: border-box;
}

button {
   color: black;
   background: rgb(205,205,205);
   border-right: 1px solid rgb(230,230,230);
   border: 0px;
   padding: 6px 20px;
   text-align: center;
   font-size: 80%;
   cursor: pointer;
   width: 100%;
   height: 100%;
}

button > span {
 font-size: 60%;
}

button:hover {
   background: rgb(230,230,230);
 }

 button:active {
   background: rgb(210,210,210);
 }

 :host([selected]) button {
   background: rgb(230,230,230);
 }


 @media (prefers-color-scheme: dark) {
   button {
       color: white;
       background: rgb(50,50,50);
       border-right: 1px solid rgb(25,25,25);
   }

   button:hover {
       background: rgb(60,60,60);
   }
 
   button:active {
   background: rgb(75,75,75);
   }
 
   :host([selected]) button {
     background: rgb(60,60,60);
   }

 }
`;
}
static get properties() {
   return TabTogglePropsList;
}
render() {
   return $ `
 <button @click=${() => this.select()}>${this.to.name ?? `Tab`}</button>
`;
}
}
customElements.define('visualscript-tab-toggle', TabToggle);

class Control extends s$1 {
constructor(props = {}) {
   super();
   this.label = 'Control';
   this.type = 'button';
   this.persist = false;
   this.options = [];
   // File / Select
   this.onChange = () => { };
   // NOTE: Must do this so that custom Select trigger can be recognized as the target of a window.onclick event.
   // createRenderRoot() {
   //   return this;
   // }
   this.getElement = () => {
       if (this.type === 'select')
           this.element = new Select(this);
       else if (this.type === 'file')
           this.element = new File(this);
       else if (this.type === 'switch')
           this.element = new Switch(this);
       else if (this.type === 'range')
           this.element = new Range(this);
       else if (['input', 'text', 'number'].includes(this.type))
           this.element = new Input(this);
       else
           this.element = new Button(this);
   };
   this.willUpdate = (changedProps) => {
       changedProps.forEach((v, k) => {
           if (this.element)
               this.element[k] = this[k];
       }); // TODO: Make sure this actually passes relevant changes
   };
   if (props.label)
       this.label = props.label;
   if (props.type)
       this.type = props.type;
   if (props.park)
       this.park = props.park;
   if (props.persist)
       this.persist = props.persist;
   // Select
   if (props.options)
       this.options = props.options;
   if (props.value)
       this.value = props.value;
   // File / Select
   if (props.onChange)
       this.onChange = props.onChange;
   if (props.accept)
       this.accept = props.accept;
   if (props.webkitdirectory)
       this.webkitdirectory = props.webkitdirectory;
   if (props.directory)
       this.directory = props.directory;
   if (props.multiple)
       this.multiple = props.multiple;
   // Button
   if (props.onClick)
       this.onClick = props.onClick;
   if (props.primary)
       this.primary = props.primary;
   if (props.backgroundColor)
       this.backgroundColor = props.backgroundColor;
   if (props.size)
       this.size = props.size;
   // this.getElement()
}
static get styles() {
   return r$4 `

:host {
 width: 100%;
 height: 100%;
}

slot {
 font-size: 0.75em
}

#control {
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 0px 5px;
 margin: 10px;
 border: 1px solid rgb(180,180,180);
 /* white-space: nowrap; */
}

h5 {
 margin: 0;
}


#control > * {
 padding: 10px;
}

span { 
 flex-grow: 1;
}

@media (prefers-color-scheme: dark) {
 #control {
   border: 1px solid rgb(120,120,120);
 }
}

`;
}
static get properties() {
   return {
       label: {
           type: String,
           reflect: true
       },
       type: {
           type: String,
           reflect: true
       },
       persist: {
           type: Boolean,
           reflect: true
       },
       park: {
           type: Boolean,
           reflect: true
       },
       // Select
       value: {
           type: Object,
           reflect: true
       },
       options: {
           type: Object,
           reflect: true
       },
       // File / Select
       onChange: {
           type: Object,
           reflect: true
       },
       accept: {
           type: String,
           reflect: true
       },
       webkitdirectory: {
           type: Boolean,
           reflect: true
       },
       directory: {
           type: Boolean,
           reflect: true
       },
       multiple: {
           type: Boolean,
           reflect: true
       },
       // Button
       primary: {
           type: Boolean,
           reflect: true
       },
       backgroundColor: {
           type: String,
           reflect: true
       },
       size: {
           type: String,
           reflect: true
       },
       onClick: {
           type: Object,
           reflect: true
       },
   };
}
render() {
   this.getElement();
   return $ `
 <div id=control>
   <div>
     <h5>${this.label}</h5>
     <slot></slot>
   </div>
   ${this.element}
 </div>`;
}
updated(changedProperties) {
   const slot = this.shadowRoot.querySelector("slot");
   const nodes = slot.assignedNodes();
   // Manually Place Slot Text in Button
   if (this.type === 'button' && nodes.length) {
       nodes.forEach(el => this.element.appendChild(el.cloneNode()));
       slot.style.display = 'none';
   }
}
}
customElements.define('visualscript-control', Control);

const tabStyle = r$4 `

:host {
width: 100%;
height: 100%;
box-sizing: border-box;
background: inherit;
display: block;
overflow: hidden;
}

slot {
overflow: scroll;
}

:host * {
box-sizing: border-box;
}

:host([type="dropdown"]) {
position: absolute;
top: 0;
left: 0: 
background: red;
}

`;
const TabPropsLit = {
name: {
   type: String,
   reflect: true
},
controls: {
   type: Array,
   reflect: true
},
on: {
   type: Function,
   reflect: true
},
type: {
   type: String,
   reflect: true
},
off: {
   type: Function,
   reflect: true
}
};
class Tab extends s$1 {
constructor(props = {}) {
   super();
   this.controls = [];
   this.on = () => { };
   this.off = () => { };
   this.type = 'tab';
   this.addControl = (instance) => {
       this.controlPanel.appendChild(instance);
   };
   this.updated = () => {
       const controls = this.querySelectorAll('visualscript-control');
       controls.forEach((control) => {
           if (this.type === 'app')
               control.park = true; // Park all controls within an app
           else if (!control.park)
               this.addControl(control);
       });
   };
   if (props.name)
       this.name = props.name;
   if (props.controls)
       this.controls = props.controls; // Will also check for controls in the <slot> later
   if (props.on)
       this.on = props.on;
   if (props.off)
       this.off = props.off;
   // Allow dashboards inside apps!
   let dashboards = document.body.querySelectorAll('visualscript-dashboard');
   this.dashboard = Array.from(dashboards).find(o => o.parentNode === document.body) ?? new Dashboard(); // Find global dashboard
   this.dashboard.global = true;
   this.dashboard.open = false;
   // Create a toggle
   this.toggle = new TabToggle({
       tab: this
   });
   this.dashboard.addEventListener('close', (ev) => {
       this.off(this.toggle);
   });
}
static get styles() {
   return tabStyle;
}
static get properties() {
   return TabPropsLit;
}
willUpdate(changedProps) {
   if (changedProps.has('controls')) {
       this.controlPanel = document.createElement('div');
       this.controls.forEach(o => {
           this.addControl(new Control(o));
       });
   }
}
render() {
   return $ `
 <slot></slot>
`;
}
}
customElements.define('visualscript-tab', Tab);

class App extends Tab {
constructor(props = {}) {
   const tabProps = Object.assign({
       on: (target) => {
           this.dashboard.main.appendChild(this);
           if (props.on instanceof Function)
               props.on(target);
       },
       off: (target) => {
           this.style.display = '';
           this.parent.appendChild(this); // Replace App element
           if (props.off instanceof Function)
               props.off(target);
       }
   }, props);
   tabProps.name = props.name;
   super(tabProps);
   this.name = props.name;
   this.type = 'app';
   this.parent = this.parentNode; // Grab original parent
}
static get styles() {
   return r$4 `
:host {
 color-scheme: light dark;
 max-width: 100vw;
 max-height: 100vh;
}


slot {
 overflow: hidden !important;
}

${tabStyle}
${slotGrid}
`;
}
static get properties() {
   return Object.assign({}, TabPropsLit);
}
render() {
   if (!parent)
       this.parent = this.parentNode; // Grab original parent
   return $ `
   <slot></slot>
 `;
}
}
customElements.define('visualscript-app', App);

const TabBarPropsList = {
tabs: {
   type: Object
}
};
class TabBar extends s$1 {
constructor(props = {}) {
   super();
   this.tabs = [];
}
static get styles() {
   return r$4 `

:host {
 background: whitesmoke;
 overflow-y: hidden;
 overflow-x: scroll;
 display: flex;
 position: sticky;
 width: 100%;
 top: 0;
 left: 0;
 z-index: 2;
}

/* Tab Scrollbar */
:host::-webkit-scrollbar {
 height: 2px;
 position: absolute;
 bottom: 0;
 left: 0;
}

:host::-webkit-scrollbar-track {
 background: transparent;
}

:host::-webkit-scrollbar-thumb {
 border-radius: 10px;
}

/* Handle on hover */
:host(:hover)::-webkit-scrollbar-thumb {
 background: rgb(118, 222, 255);
}

 @media (prefers-color-scheme: dark) {

   :host {
     background: rgb(25,25,25);
   }

   :host(:hover)::-webkit-scrollbar-thumb {
     background: rgb(240, 240, 240);
   }

 }
`;
}
static get properties() {
   return TabBarPropsList;
}
render() {
   return $ `
 ${this.tabs.map(t => t.toggle)}
 <slot></slot>
`;
}
}
customElements.define('visualscript-tab-bar', TabBar);

class Main extends s$1 {
constructor(props = { target: {}, header: 'Object' }) {
   super();
   this.tabs = new Map();
   this.getTabs = () => {
       const tabs = [];
       // Apps (only for global Main)
       if (this.parentNode?.global) {
           const apps = document.querySelectorAll('visualscript-app');
           for (var i = 0; i < apps.length; i++) {
               if (!tabs.includes(apps[i]))
                   tabs.push(apps[i]);
           }
       }
       // Tabs
       for (var i = 0; i < this.children.length; i++) {
           const child = this.children[i];
           if (child instanceof Tab)
               tabs.push(child);
       }
       tabs.forEach(tab => this.tabs.set(tab.name, tab));
       return tabs;
   };
}
static get styles() {
   return r$4 `

:host {
 width: 100%;
 height: 100%;
 box-sizing: border-box;
 grid-area: main;
 overflow: hidden;
 background: inherit;
 color: inherit;
 position: relative;
}

:host * {
 box-sizing: border-box;
}
`;
}
static get properties() {
   return {
       tabs: {
           type: Object,
           // reflect: true
       }
   };
}
render() {
   const tabs = this.getTabs();
   const toggles = tabs.map((t, i) => {
       if (i !== 0)
           t.style.display = 'none'; // Hide tabs other than the first
       return t.toggle;
   });
   return $ `
 <visualscript-tab-bar style="${toggles.length < 1 ? 'display: none;' : ''}">${toggles}</visualscript-tab-bar>
 <slot></slot>
`;
}
}
customElements.define('visualscript-main', Main);

class Gallery extends s$1 {
constructor(props = {}) {
   super();
   this.things = [];
   this.search = false;
   this.load = (thing, i) => {
       // if (i !== 0) thing.style.display = 'none' // Hide tabs other than the first
       // return html`<button class="tab" @click=${() => {
       //   // Toggle between Tabs
       //   if (thing.style.display === 'none') {
       //     this.things.forEach(t => (t != thing) ? t.style.display = 'none' : t.style.display = '') // hide other tabs
       //   }
       // }}>${thing.name ?? `Tab ${i}`}</button>`
       thing.style.display = 'none'; // Hide thing content
       return $ `<div id=tile @click=${() => { console.log('clicked!'); }}>
   <div>
     <h3>${thing.name}</h3>
     <p>Item #${i}.</p>
   <div>
 </div>`;
   };
   this.getThings = () => {
       this.things = [];
       for (var i = 0; i < this.children.length; i++) {
           const child = this.children[i];
           if (child.name)
               this.things.push(child); // Must have name to be a Thing
       }
       return this.things;
   };
   if (props.search)
       this.search = props.search;
}
static get styles() {
   return r$4 `

:host {
 width: 100%;
 height: 100%;
} 

#things {
 width: 100%;
 height: 100%;
 display: flex;
 flex-wrap: wrap;
}

#tile {
 box-sizing: border-box;
 flex: 1 0 auto;
 aspect-ratio: 1 / 1 ;
 max-width: 200px;
 border-radius: 10px;
 margin: 10px;
 display: flex;
 align-items: center;
 justify-content: center;
 background: rgba(0,0,0,0.2);
 cursor: pointer;
 transition: 0.5s;
}

#tile:hover{
 background: rgba(0,0,0,0.1);
}

#tile > div {
 padding: 25px;
}
`;
}
static get properties() {
   return {};
}
render() {
   this.getThings();
   return $ `
 <visualscript-search .items=${this.things}></visualscript-search>
 <div id=things>
 ${this.things.map(this.load)}
 </div>
 <section>
   <slot></slot>
 </section>
`;
}
}
customElements.define('visualscript-gallery', Gallery);

class TabContainer extends s$1 {
constructor(props = {}) {
   super();
   this.minTabs = 0;
   this.tabs = new Map();
   this.bar = new TabBar();
   this.reset = () => {
       this.tabs.forEach(t => this.removeTab(t)); // remove existing
       this.activeTab = 0;
       this.updateTabs();
   };
   this.addTab = (tab, switchTo = false) => {
       this.insertAdjacentElement('beforeend', tab);
       if (switchTo)
           this.activeTab = this.tabs.size;
       this.tabs.set(tab.name, tab);
       this.updateTabs();
   };
   this.removeTab = (tab) => {
       if (tab instanceof Tab)
           tab = tab.name;
       const tabObj = this.tabs.get(tab);
       tabObj.remove();
       this.updateTabs();
       this.tabs.delete(tab);
   };
   this.updateTabs = () => {
       this.tabLabels = Array.from(this.tabs.values()).map(t => t.name);
   };
   this.getTabs = () => {
       this.tabs = new Map();
       // Tabs
       for (var i = 0; i < this.children.length; i++) {
           const child = this.children[i];
           if (child instanceof Tab)
               this.tabs.set(child.name, child);
       }
       this.updateTabs();
       return Array.from(this.tabs.values());
   };
   if (props.minTabs)
       this.minTabs = props.minTabs;
   this.reset();
}
static get styles() {
   return r$4 `

:host {
 box-sizing: border-box;
 grid-area: main;
 overflow: hidden;
 background: inherit;
 color: inherit;
 position: relative;
 width: 100%;
 height: 100%;
 display: grid;
 grid-template-areas:
     "tabs"
     "content";
 grid-template-rows: min-content 1fr;
}

:host * {
 box-sizing: border-box;
}

#notabs {
 width: 100%;
 height: 100%;
 display: flex; 
 align-items: center;
 justify-content: center;
 font-size: 80%;
}
`;
}
static get properties() {
   return {
       tabLabels: {
           type: Object,
           reflect: true
       },
       tabs: {
           type: Object,
           // reflect: true
       }
   };
}
render() {
   const tabs = this.getTabs();
   const toggles = tabs.map((t, i) => {
       if (i !== this.activeTab)
           t.style.display = 'none'; // Hide tabs other than the first
       return t.toggle;
   });
   const selectedToggle = toggles[this.activeTab];
   if (selectedToggle)
       selectedToggle.select(toggles);
   this.bar.tabs = tabs; // Set tabs
   toggles.forEach(t => t.grow = true);
   this.bar.style.height = (toggles.length < this.minTabs) ? '0px' : '';
   return $ `
 ${this.bar}
 <slot><div id="notabs">No Tabs Open</div></slot>
`;
}
}
customElements.define('visualscript-tab-container', TabContainer);

const collapseThreshold = 600;
class Sidebar extends s$1 {
constructor(props = {}) {
   super();
   this.content = '';
   this.interacted = false;
   this.closed = props.closed;
   this.classList.add('default');
}
static get styles() {
   return r$4 `


:host {

 --collapse-width: ${collapseThreshold}px;
 --dark-color: rgb(25, 25, 25);
 --light-color: rgb(240, 240, 240);

 --blue-spiral: repeating-linear-gradient(
   45deg,
   rgb(30, 167, 253),
   rgb(30, 167, 253) 10px,
   rgb(118, 222, 255) 10px,
   rgb(118, 222, 255) 20px
 );

 /* Light Hue: 118, 222, 255 */
 /* Dark Hue: 0, 116, 196 */

 --light-spiral: repeating-linear-gradient(
   45deg,
   rgb(190, 190, 190),
   rgb(190, 190, 190) 10px,
   rgb(240, 240, 240) 10px,
   rgb(240, 240, 240) 20px
 );

 --dark-spiral: repeating-linear-gradient(
   45deg,
   rgb(25, 25, 25),
   rgb(25, 25, 25) 10px,
   rgb(75, 75, 75) 10px,
   rgb(75, 75, 75) 20px
 );

 --final-toggle-width: 15px;

 color: black;
 grid-area: side;
 background: var(--light-color);
 position: relative;
 display: flex;
 overflow: hidden;
 max-width: 50vw;
}


:host > * {
 box-sizing: border-box;
}

:host([closed]) > #main {
   width: 0px;
   overflow: hidden;
}

:host([closed]) > #toggle {
 width: var(--final-toggle-width);
}

#main {
 overflow: hidden;
}

#toggle:hover { 
 background: var(--blue-spiral)
}

.hidden {
 display: none;
}

#toggle {
 height: 100%;
 width: 10px;
 background: rgb(25, 25, 25);
 cursor: pointer;
 background: var(--light-spiral);
 border:none;
}

#toggle:active {
 background: var(--blue-spiral)
}

#controls {
 overflow-x: hidden;
 overflow-y: scroll;
 height: 100%;
}

@media only screen and (max-width: ${collapseThreshold}px) {
 :host {
   max-width: 100%;
 }

 :host(.default) > #main {
     width: 0px;
     overflow: hidden;
 }

 :host(.default) > #toggle {
   width: var(--final-toggle-width);
 }
}


#toggle {
 position: sticky;
 left:0;
 top: 0;
}

@media (prefers-color-scheme: dark) {
 :host {
   color: white;
   background: var(--dark-color);
 }

 #toggle {
   background: var(--dark-spiral)
 }
}

`;
}
static get properties() {
   return {
       closed: {
           type: Boolean,
           reflect: true
       },
       content: {
           type: Object,
           reflect: true
       },
   };
}
render() {
   const renderToggle = this.content || this.children?.length; // Note: May also need to check the slot generally...
   return $ `
   <button id=toggle class="${!!renderToggle ? '' : 'hidden'}" @click=${() => {
       const wasDefault = this.classList.contains('default');
       this.classList.remove('default'); // Closed only added after user interaction
       if (window.innerWidth < collapseThreshold) {
           if (!wasDefault)
               this.closed = !this.closed; // Closed only added after user interaction
       }
       else
           this.closed = !this.closed; // Closed only added after user interaction
   }}></button>
   <div id=main>
     <div id=controls>
     ${this.content}
     <slot></slot>
     </div>
   </div>
 `;
}
}
customElements.define('visualscript-sidebar', Sidebar);

class SidebarHeader extends s$1 {
static get styles() {
   return r$4 `

:host {
 width: 100%;
}

h4 {
 background: rgb(25, 25, 25);
 color: white;
 margin: 0px;
 padding: 10px 25px;
}

@media (prefers-color-scheme: dark) {
 h4 {
   color: black;
   background: rgb(60, 60, 60);
 }
}

`;
}
static get properties() {
   return {};
}
constructor(props = {}) {
   super();
}
render() {
   return $ `
     <h4><slot></slot></h4>
 `;
}
}
customElements.define('visualscript-sidebar-header', SidebarHeader);

function _taggedTemplateLiteral(strings, raw) {
if (!raw) {
raw = strings.slice(0);
}

return Object.freeze(Object.defineProperties(strings, {
raw: {
 value: Object.freeze(raw)
}
}));
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var addBox = $(_templateObject || (_templateObject = _taggedTemplateLiteral(["<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"/></svg>"])));
var folder = $(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\"/></svg>"])));
var openfolder = $(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z\"/></svg>"])));
var file = $(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z\"/></g></svg>"])));

var icons = /*#__PURE__*/Object.freeze({
__proto__: null,
addBox: addBox,
folder: folder,
openfolder: openfolder,
file: file
});

class Icon extends s$1 {
constructor(props = {}) {
   super();
   this.type = props.type ?? 'folder';
}
static get styles() {
   return r$4 `

:host {
 display: block;
 width: 30px;
 height: 30px;
 box-sizing: border-box;
}

svg {
 width: 100%;
 height: 100%;
 fill: black;
}

@media (prefers-color-scheme: dark) {

 svg {
   fill: rgb(210, 210, 210);
 }
}

`;
}
static get properties() {
   return {
       type: {
           type: String,
           reflect: true
       },
   };
}
render() {
   return $ `
  ${icons[this.type]}
`;
}
}
customElements.define('visualscript-icon', Icon);

class TreeItem extends s$1 {
constructor(props) {
   super();
   this.type = 'folder';
   this.removeLast = () => {
       if (this.li)
           this.li.classList.remove('last');
       window.removeEventListener('click', this.removeLast);
   };
   this.key = props.key;
   this.value = props.value;
   this.parent = props.parent;
   this.onClick = props.onClick;
   //   this.set(props.target)
   if (props.type)
       this.type = props.type;
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

li {
   width: 100%;
}

li > div > div {
   display: flex;
   font-size: 12px;
   padding: 6px;
   flex-grow: 1;
   align-items: center;
   flex-wrap: wrap;
   user-select: none;
}

li.last > div { background: #b6e3ff;}

li.last > div:hover { background: #b6e3ff; }

li > div:hover {
   background: rgb(240,240,240);
   cursor: pointer;
}

visualscript-icon {
 padding: 0px 7px;
}

@media (prefers-color-scheme: dark) {

 li > div:hover{ background-color: rgb(70, 70, 70) }

 li.last > div { background: #0091ea;}

   li.last > div:hover { background: #0091ea; }


}

`;
}
static get properties() {
   return {
       type: {
           type: String,
           reflect: true,
       },
       key: {
           type: String,
           reflect: true,
       },
       open: {
           type: Boolean,
           reflect: true,
       }
   };
}
render() {
   const icon = new Icon({ type: this.type });
   const leftPad = 8 * (this.parent.depth ?? 0);
   return $ `
   <li>
   <div @click=${() => {
       this.li = this.shadowRoot.querySelector('li');
       this.li.classList.add('last');
       window.addEventListener('mousedown', this.removeLast);
       // Switch Icons
       if (this.type === 'file') {
           if (this.onClick instanceof Function)
               this.onClick(this.key, this.value);
       }
       else {
           if (this.type === 'folder') {
               this.type = 'openfolder';
               this.open = true;
           }
           else {
               this.type = 'folder';
               this.open = false;
           }
       }
   }}>
       <div style="padding-left: ${leftPad}px">
        ${icon}
       <span class="name">${this.key}</span>
       </div>
     </div>
     ${(this.open) ? new Tree({ target: this.value, depth: this.parent.depth + 1, onClick: this.onClick }) : ''}
   </li>
 `;
}
}
customElements.define('visualscript-tree-item', TreeItem);

class Tree extends s$1 {
constructor(props = { target: {} }) {
   super();
   this.depth = 0;
   this.set = async (target = {}) => {
       this.target = target;
       this.keys = Object.keys(this.target);
   };
   this.getElement = async (key, o) => {
       const value = o[key];
       let type = (value.constructor.name === 'Object') ? 'folder' : 'file';
       const treeItem = new TreeItem({
           key,
           type,
           value,
           parent: this,
           onClick: this.onClick
       });
       return treeItem;
   };
   if (props.depth)
       this.depth = props.depth;
   if (props.onClick)
       this.onClick = props.onClick;
   this.set(props.target);
}
static get styles() {
   return r$4 `

:host * {
 box-sizing: border-box;
}

:host > * {
 background: white;
 height: 100%;
 width: 100%;
}

ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
   font-size: 90%;
}

.container {
 width: 100%;
 align-items: center;
 justify-content: center;
 position: relative;
 overflow: scroll;
 height: 100%;
}

.info {
 display: flex;
 align-items: center;
}

.name {
 padding-right: 10px;
}

.value {
 font-size: 80%;
}

@media (prefers-color-scheme: dark) {
 :host > * {
   background-color: rgb(40, 40, 40);
 }
}

`;
}
static get properties() {
   return {
       // target: {
       //   type: Object,
       //   reflect: false,
       // },
       keys: {
           type: Object,
           reflect: true,
       },
       depth: {
           type: Number,
           reflect: true,
       },
       onClick: {
           type: Function,
           reflect: true,
       }
   };
}
render() {
   const content = (this.keys?.map(key => this.getElement(key, this.target)));
   return c(Promise.all(content).then((data) => {
       return $ `
     <ul class="container">
           ${data}
     </ul>
 `;
   }), $ `<span>Loading...</span>`);
}
}
customElements.define('visualscript-tree', Tree);

export { App, Button, CodeEditor, Control, Dashboard, DeviceEditor, File, Footer, Gallery, GraphEditor, Input, Loader, Main, Modal, Nav, ObjectEditor, Overlay, Range, Search, Select, SessionEditor, Sidebar, SidebarHeader, Spectrogram, Switch, Tab, TabBar, TabBarPropsList, TabContainer, TabPropsLit, TabToggle, TabTogglePropsList, TimeSeries, Tree, slotGrid, index$1 as streams, tabStyle };