webpackJsonp([0], {421(e, t, n) {
    function r(e) { return e && e.__esModule ? e : {default: e}; } function o(e, t) { if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function'); } function i(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t; } function u(e, t) { if (typeof t !== 'function' && t !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof t}`); e.prototype = Object.create(t && t.prototype, {constructor: {value: e, enumerable: !1, writable: !0, configurable: !0}}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t); } function l(e, t, n, r, o) { let i = {}; return Object.keys(r).forEach((e) => { i[e] = r[e]; }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ('value' in i || i.initializer) && (i.writable = !0), i = n.slice().reverse().reduce((n, r) => r(e, t, n) || n, i), o && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(o) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i; }Object.defineProperty(t, '__esModule', {value: !0}), t.default = void 0; let a,
        s,
        d,
        p = (function () { function e(e, t) { for (let n = 0; n < t.length; n++) { const r = t[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r); } } return function (t, n, r) { return n && e(t.prototype, n), r && e(t, r), t; }; }()),
        c = n(13),
        f = n(98),
        v = n(94),
        h = n(95),
        b = n(428),
        y = n(96),
        m = r(y),
        g = n(425),
        N = r(g),
        O = n(34),
        _ = n(424),
        w = r(_),
        j = n(426),
        k = r(j),
        U = (a = (0, f.connect)(m.default, (0, N.default)({addNote: h.addNote, removeNote: h.removeNote, editNote: h.editNote, listNotes: h.listNotes})))((d = (function (e) {
            function t(e) { o(this, t); const n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = {userInput: ''}, n; } return u(t, e), p(t, [{key: 'componentWillMount',
                value() {
                    let e = (0, O.getCurrentState)(),
                        t = e.user; this.props.listNotes(t.login);
                }}, {key: 'componentDidMount', value() { const e = this; this.unsubscribe = O.store.subscribe(() => { e.forceUpdate(); }); }}, {key: 'componentWillUnmount', value() { this.unsubscribe(); }}, {key: 'handleUpdateInput', value(e) { this.setState({userInput: e.target.value}); }}, {key: 'addNoteHandler',
                    value(e) {
                     e.preventDefault(); let t = (0, O.getCurrentState)(),
                         n = t.user; (0, b.isUserDefined)() && this.state.userInput.trim().length > 0 && (this.props.addNote(this.state.userInput, n.login.toLowerCase()), this.setState({userInput: ''}));
                 }}, {key: 'removeNoteHandler',
                     value(e) {
                 let t = (0, O.getCurrentState)(),
            n = t.user; (0, b.isUserDefined)() && this.props.removeNote(e, n.login.toLowerCase());
             }}, {key: 'editNoteHandler', value(e, t) { (0, b.isUserDefined)() && this.props.editNote(e, t, user.login); }}, {key: 'render',
        value(e, t) {
            let n = this,
                r = e.notes,
                o = t.userInput,
                i = (0, O.getCurrentState)(),
                u = i.user; return u.login ? (0, c.h)('div', {id: 'notes'}, (0, c.h)('div', {className: 'notes-list'}, (0, c.h)('ul', {className: 'mdl-list repos-list'}, r.map(e => (0, c.h)('li', {className: 'mdl-list__item'}, (0, c.h)('div', {className: 'note-item'}, (0, c.h)('h5', null, e.text), (0, c.h)('a', {onClick(t) { return n.removeNoteHandler(e); }}, (0, c.h)(k.default, null))))))), (0, c.h)('div', {className: 'center-align'}, (0, c.h)(I, {addNoteHandler: this.addNoteHandler, handleUpdateInput: this.handleUpdateInput, userInput: o, user: u}))) : (0, c.h)(w.default, null);
        }}]), t;
        }(c.Component)), l(d.prototype, 'handleUpdateInput', [v.bind], Object.getOwnPropertyDescriptor(d.prototype, 'handleUpdateInput'), d.prototype), l(d.prototype, 'addNoteHandler', [v.bind], Object.getOwnPropertyDescriptor(d.prototype, 'addNoteHandler'), d.prototype), l(d.prototype, 'removeNoteHandler', [v.bind], Object.getOwnPropertyDescriptor(d.prototype, 'removeNoteHandler'), d.prototype), l(d.prototype, 'editNoteHandler', [v.bind], Object.getOwnPropertyDescriptor(d.prototype, 'editNoteHandler'), d.prototype), s = d)) || s; t.default = U; var I = function (e) {
            let t = e.handleUpdateInput,
                n = e.addNoteHandler,
                r = e.userInput; e.user; return (0, c.h)('form', {onSubmit: n}, (0, c.h)('input', {className: 'notes-input', type: 'text', onInput: t, value: r, disabled: !(0, b.isUserDefined)(), placeholder: 'Type your note', 'aria-label': 'add-note'}), (0, c.h)('button', {label: 'Add', type: 'submit', disabled: !(0, b.isUserDefined)() || r.trim().length <= 0, class: `mdl-button mdl-js-ripple-effect mdl-js-button ${!(0, b.isUserDefined)() || r.trim().length <= 0 ? 'mdl-button--disabled' : null}`}, 'Add'));
        };
},
    424(e, t, n) {
        Object.defineProperty(t, '__esModule', {value: !0}); const r = n(13); t.default = function () { return (0, r.h)('div', {className: 'no-user'}, (0, r.h)('i', null, 'Oops! Try to search for an user first...')); };
    },
    425(e, t, n) {
        Object.defineProperty(t, '__esModule', {value: !0}); let r = Object.assign || function (e) { for (let t = 1; t < arguments.length; t++) { const n = arguments[t]; for (const r in n)Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]); } return e; },
            o = n(35),
            i = function (e) { return function (t) { return r({}, (0, o.bindActionCreators)(e, t)); }; }; t.default = i;
    },
    426(e, t, n) {
        Object.defineProperty(t, '__esModule', {value: !0}); let r = n(13),
            o = {close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'},
            i = function (e) { const t = {svg: {display: 'inline-block', verticalAlign: 'middle'}, path: {fill: 'black'}}; return (0, r.h)('svg', {style: t.svg, width: '25px', height: '25px', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', 'stroke-linejoin': 'round', 'stroke-miterlimit': '1.414'}, (0, r.h)('path', {style: t.path, d: o.close}), (0, r.h)('path', {d: 'M0 0h24v24H0z', fill: 'none'})); }; t.default = i;
    },
    428(e, t, n) {
        Object.defineProperty(t, '__esModule', {value: !0}), t.isUserDefined = void 0; let r = n(97),
            o = (function (e) { return e && e.__esModule ? e : {default: e}; }(r)),
            i = n(34); t.isUserDefined = function () {
                let e = (0, i.getCurrentState)(),
                    t = e.user; return o.default.not.undefined(t.login) && o.default.not.empty(t.login);
            };
    }});
