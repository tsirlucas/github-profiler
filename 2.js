webpackJsonp([2],{419:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(13),l=n(427),s=function(e){return e&&e.__esModule?e:{default:e}}(l),c=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),i(t,[{key:"render",value:function(){return(0,u.h)("div",{className:"template"},(0,u.h)(s.default,null),this.props.children)}}]),t}(u.Component);t.default=c},427:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(13),s=n(94),c=n(34),p=n(46),f=(i=function(e){function t(e){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return r(t,e),u(t,[{key:"syncState",value:function(e){var t=e.getState,n=t(),a=n.route,o=n.user;this.setState({path:a.path,user:o.login})}},{key:"componentWillMount",value:function(){var e=this;this.syncState(c.store),this.unsubscribe=c.store.subscribe(function(){return e.syncState(c.store)})}},{key:"componentDidUnmount",value:function(){this.unsubscribe()}},{key:"render",value:function(){return(0,l.h)("div",{className:"mdl-layout__container"},(0,l.h)("div",{"fixed-header":"true",className:"mdl-layout mdl-js-layout mdl-layout--fixed-header is-small-screen is-upgraded","data-upgraded":",MaterialLayout"},(0,l.h)("header",{className:"mdl-layout__header is-casting-shadow"},(0,l.h)("div",{className:"mdl-layout__header-row"},(0,l.h)("span",{className:"mdl-layout-title"},(0,l.h)("span",{style:"cursor: pointer;"},"Github Profiler")),(0,l.h)("section",{className:"mdl-layout__tab-panel"},(0,l.h)("div",{className:"page-content"},(0,l.h)("a",{onClick:function(){return(0,p.dispatchChangeRoute)("/")},active:"/"===this.state.path,className:"mdl-layout__tab "+("/"===this.state.path?"mdl-layout__tab--active is-active":null)},"HOME"),(0,l.h)("a",{onClick:function(){return(0,p.dispatchChangeRoute)("/user")},active:"/user"===this.state.path,className:"mdl-layout__tab "+("/user"===this.state.path?"mdl-layout__tab--active is-active":null)},"USER"),(0,l.h)("a",{onClick:function(){return(0,p.dispatchChangeRoute)("/repos")},active:"/repos"===this.state.path,className:"mdl-layout__tab "+("/repos"===this.state.path?"mdl-layout__tab--active is-active":null)},"REPOS"),(0,l.h)("a",{onClick:function(){return(0,p.dispatchChangeRoute)("/notes")},active:"/notes"===this.state.path,className:"mdl-layout__tab "+("/notes"===this.state.path?"mdl-layout__tab--active is-active":null)},"NOTES")))))))}}]),t}(l.Component),function(e,t,n,a,o){var r={};return Object.keys(a).forEach(function(e){r[e]=a[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce(function(n,a){return a(e,t,n)||n},r),o&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(o):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}(i.prototype,"syncState",[s.bind],Object.getOwnPropertyDescriptor(i.prototype,"syncState"),i.prototype),i);t.default=f}});