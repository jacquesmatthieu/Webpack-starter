/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
let css = require('../style/main.scss');
// import Nav from './modules/nav';
// import Cookies from './modules/cookie';
console.log(css);

const WebpackStarter = {
  // All pages
  common: {
    init() {
      // JavaScript to be fired on all pages
      // Nav.init();
      Cookies.init();
    },
    finalize() {
      console.log('prout');
    }
  },
  // Home page
  home: {
    init() {
      // JavaScript to be fired on the home page
    },
    finalize() {
      // JavaScript to be fired on the home page, after the init JS
    }
  },
  // Home page
  toto: {
    init() {
      // JavaScript to be fired on the home page
    },
    finalize() {
      // JavaScript to be fired on the home page, after the init JS
    }
  }
};

const UTIL = {
  fire(func, funcname, args) {
    let fire;
    const namespace = WebpackStarter;
    funcname = (funcname === undefined)
      ? 'init'
      : funcname;
    fire = func !== '';
    fire = fire && namespace[func];
    fire = fire && typeof namespace[func][funcname] === 'function';

    if (fire) {
      namespace[func][funcname](args);
    }
  },
  loadEvents() {
    // Fire common init JS
    UTIL.fire('common');

    // Fire common finalize JS
    UTIL.fire('common', 'finalize');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UTIL.loadEvents();
});
