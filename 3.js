webpackJsonp([3], {423(e, t, n) {
    function r(e, t) { if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function'); } function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t; } function u(e, t) { if (typeof t !== 'function' && t !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof t}`); e.prototype = Object.create(t && t.prototype, {constructor: {value: e, enumerable: !1, writable: !0, configurable: !0}}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t); }Object.defineProperty(t, '__esModule', {value: !0}), t.default = void 0; let a = (function () { function e(e, t) { for (let n = 0; n < t.length; n++) { const r = t[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r); } } return function (t, n, r) { return n && e(t.prototype, n), r && e(t, r), t; }; }()),
        i = n(13),
        l = n(34),
        c = n(424),
        s = (function (e) { return e && e.__esModule ? e : {default: e}; }(c)),
        f = (function (e) {
            function t() { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)); } return u(t, e), a(t, [{key: 'componentDidMount',
                value() {
                    let e = this,
                        t = this.context.store; this.unsubscribe = t.subscribe(() => { e.forceUpdate(); });
                }}, {key: 'componentWillUnmount', value() { this.unsubscribe(); }}, {key: 'render',
                    value() {
                        let e = (0, l.getCurrentState)(),
            t = e.user,
            n = {name: 'Name', email: 'Email', location: 'Location', company: 'Company', followers: 'Followers', following: 'Following', public_repos: 'Public repos', blog: 'Blog'}; return t.login ? (0, i.h)('div', {id: 'user'}, (0, i.h)('div', {className: 'avatar-container'}, (0, i.h)(p, {src: t.avatar_url}), (0, i.h)('h3', null, t.login)), (0, i.h)(b, {user: t, userLabels: n})) : (0, i.h)(s.default, null);
                    }}]), t;
        }(i.Component)); t.default = f; var p = function (e) { const t = e.src; return (0, i.h)('img', {src: t, alt: 'avatar', style: 'border-rounded: 50%'}); },
            b = function (e) {
                let t = e.user,
                    n = e.userLabels; return (0, i.h)('ul', {className: 'collection'}, Object.keys(n).map((e, r) => (0, i.h)('li', {className: 'collection-item', key: r}, (0, i.h)('div', null, n[e], ': ', (0, i.h)('span', {className: 'grey-text'}, t[e] || 'Not available')))));
            };
},
    424(e, t, n) {
        Object.defineProperty(t, '__esModule', {value: !0}); const r = n(13); t.default = function () { return (0, r.h)('div', {className: 'no-user'}, (0, r.h)('i', null, 'Oops! Try to search for an user first...')); };
    }});
