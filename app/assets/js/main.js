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

//IMPORT Nav from './modules/nav';
const $ = require('jquery');

const Qlikbeton = {
  // All pages
  common: {
    init() {
      console.log('prout');
    },
    finalize() {
      // JavaScript to be fired on the home page, after the init JS
    }
  },
  // Home page
  home: {
    init() {
      console.log('prout');
    },
    finalize() {
      // JavaScript to be fired on the home page, after the init JS
    }
  }
};

const UTIL = {
  fire(func, funcname, args) {
    let fire;
    const namespace = Qlikbeton;
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

    // Fire page-specific init JS, and then finalize JS
    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),
    /*eslint-disable */
      function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });
    /*eslint-enable */
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UTIL.loadEvents();
});
