webpackJsonp([1], {420(e, t, r) {
    function n(e) { return e && e.__esModule ? e : {default: e}; } function i(e, t) { if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function'); } function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t; } function u(e, t) { if (typeof t !== 'function' && t !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof t}`); e.prototype = Object.create(t && t.prototype, {constructor: {value: e, enumerable: !1, writable: !0, configurable: !0}}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t); } function s(e, t, r, n, i) { let o = {}; return Object.keys(n).forEach((e) => { o[e] = n[e]; }), o.enumerable = !!o.enumerable, o.configurable = !!o.configurable, ('value' in o || o.initializer) && (o.writable = !0), o = r.slice().reverse().reduce((r, n) => n(e, t, r) || r, o), i && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(i) : void 0, o.initializer = void 0), void 0 === o.initializer && (Object.defineProperty(e, t, o), o = null), o; }Object.defineProperty(t, '__esModule', {value: !0}), t.default = void 0; let a,
        c,
        l,
        p = (function () { function e(e, t) { for (let r = 0; r < t.length; r++) { const n = t[r]; n.enumerable = n.enumerable || !1, n.configurable = !0, 'value' in n && (n.writable = !0), Object.defineProperty(e, n.key, n); } } return function (t, r, n) { return r && e(t.prototype, r), n && e(t, n), t; }; }()),
        f = r(13),
        h = r(94),
        b = r(97),
        d = n(b),
        y = r(98),
        v = r(96),
        m = n(v),
        O = r(425),
        j = n(O),
        g = r(99),
        w = r(95),
        _ = (a = (0, y.connect)(m.default, (0, j.default)({searchUser: g.searchUser, listNotesAction: w.listNotesAction})))((l = (function (e) { function t(e) { i(this, t); const r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return r.state = {userInput: ''}, r; } return u(t, e), p(t, [{key: 'componentDidMount', value() { const e = this; this.setState({userInput: ''}); const t = this.context.store; this.unsubscribe = t.subscribe(() => { e.forceUpdate(); }); }}, {key: 'componentWillUnmount', value() { this.unsubscribe(); }}, {key: 'updateSearchText', value(e) { this.setState({userInput: e.target.value.toLowerCase()}); }}, {key: 'searchUser', value(e) { e.preventDefault(), d.default.not.empty(this.state.userInput) && d.default.not.undefined(this.state.userInput) && this.state.userInput.trim().length > 0 && (this.props.searchUser(this.state.userInput), this.state.userInput = ''); }}, {key: 'render', value() { return (0, f.h)('div', {id: 'home'}, (0, f.h)('form', {id: 'search-user', onSubmit: this.searchUser}, (0, f.h)('input', {id: 'user-input', type: 'text', onInput: this.updateSearchText, placeholder: 'Username', value: this.state.userInput, 'aria-label': 'username'}), (0, f.h)('button', {class: `mdl-button mdl-js-ripple-effect mdl-js-button ${this.state.userInput.trim().length <= 0 ? 'mdl-button--disabled' : null}`, type: 'submit', disabled: this.state.userInput.trim().length <= 0}, 'Search'))); }}]), t; }(f.Component)), s(l.prototype, 'updateSearchText', [h.bind], Object.getOwnPropertyDescriptor(l.prototype, 'updateSearchText'), l.prototype), s(l.prototype, 'searchUser', [h.bind], Object.getOwnPropertyDescriptor(l.prototype, 'searchUser'), l.prototype), c = l)) || c; t.default = _;
},
    425(e, t, r) {
        Object.defineProperty(t, '__esModule', {value: !0}); let n = Object.assign || function (e) { for (let t = 1; t < arguments.length; t++) { const r = arguments[t]; for (const n in r)Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]); } return e; },
            i = r(35),
            o = function (e) { return function (t) { return n({}, (0, i.bindActionCreators)(e, t)); }; }; t.default = o;
    }});
