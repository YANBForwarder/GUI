define(["exports", "./my-app.js"], function (_exports, _myApp) {
  "use strict"; 
  Object.defineProperty(_exports, "__esModule", { value: !0 }); 
  _exports.PaperSpinnerBehavior = _exports.$paperSpinnerBehavior = void 0; 
  (0, _myApp.Polymer)({
    _template: _myApp.html`
      <style>
        :host {
          display: block;
          transition-duration: var(--iron-collapse-transition-duration, 300ms);
          /* Safari 10 needs this property prefixed to correctly apply the custom property */
          -webkit-transition-duration: var(--iron-collapse-transition-duration, 300ms);
          overflow: visible;
        }

        :host(.iron-collapse-closed) {
          display: none;
        }

        :host(:not(.iron-collapse-opened)) {
          overflow: hidden;
        }
      </style>
      <slot></slot>
    `, 
    is: "iron-collapse", 
    behaviors: [_myApp.IronResizableBehavior], 
    properties: {
      /**
       * If true, the orientation is horizontal; otherwise is vertical.
       *
       * @attribute horizontal
       */
      horizontal: { 
        type: Boolean, 
        value: !1, 
        observer: "_horizontalChanged" 
      },
      /**
       * Set opened to true to show the collapse element and to false to hide it.
       *
       * @attribute opened
       */
      opened: { 
        type: Boolean, 
        value: !1, 
        notify: !0, 
        observer: "_openedChanged" 
      },
      /**
       * When true, the element is transitioning its opened state. When false,
       * the element has finished opening/closing.
       *
       * @attribute transitioning
       */
      transitioning: { 
        type: Boolean, 
        notify: !0, 
        readOnly: !0 
      },
        /**
         * Set noAnimation to true to disable animations.
         *
         * @attribute noAnimation
         */
      noAnimation: { type: Boolean },
      /**
       * Stores the desired size of the collapse body.
       * @private
       */
      _desiredSize: { 
        type: String, 
        value: "" 
      }
    }, 
    get dimension() { return this.horizontal ? "width" : "height" },
    /**
     * `maxWidth` or `maxHeight`.
     * @private
     */
    get _dimensionMax() { return this.horizontal ? "maxWidth" : "maxHeight" },
    /**
     * `max-width` or `max-height`.
     * @private
     */
    get _dimensionMaxCss() { return this.horizontal ? "max-width" : "max-height" }, 
    hostAttributes: { 
      role: "group", 
      "aria-hidden": "true" 
    }, 
    listeners: { transitionend: "_onTransitionEnd" },
    /**
     * Toggle the opened state.
     *
     * @method toggle
     */
    toggle: function () { this.opened = !this.opened }, 
    show: function () { this.opened = !0 }, 
    hide: function () { this.opened = !1 },
    /**
     * Updates the size of the element.
     * @param {string} size The new value for `maxWidth`/`maxHeight` as css property value, usually `auto` or `0px`.
     * @param {boolean=} animated if `true` updates the size with an animation, otherwise without.
     */
    updateSize: function (size, animated) {
      // Consider 'auto' as '', to take full size.
      size = "auto" === size ? "" : size; 
      var willAnimate = animated && !this.noAnimation && this.isAttached && this._desiredSize !== size; 
      this._desiredSize = size; 
      this._updateTransition(!1);
      // If we can animate, must do some prep work.
      if (willAnimate) {
        // Animation will start at the current size.
        var startSize = this._calcSize();
        // For `auto` we must calculate what is the final size for the animation.
        // After the transition is done, _transitionEnd will set the size back to
        // `auto`.
        if ("" === size) { 
          this.style[this._dimensionMax] = ""; 
          size = this._calcSize() 
        }
        // Go to startSize without animation.
        this.style[this._dimensionMax] = startSize;
        // Force layout to ensure transition will go. Set scrollTop to itself
        // so that compilers won't remove it.
        this.scrollTop = this.scrollTop;
        // Enable animation.
        this._updateTransition(!0);
        // If final size is the same as startSize it will not animate.
        willAnimate = size !== startSize
      }
      // Set the final size.
      this.style[this._dimensionMax] = size;
      // If it won't animate, call transitionEnd to set correct classes.
      if (!willAnimate) { 
        this._transitionEnd() 
      }
    },
    /**
     * enableTransition() is deprecated, but left over so it doesn't break
     * existing code. Please use `noAnimation` property instead.
     *
     * @method enableTransition
     * @deprecated since version 1.0.4
     */
    enableTransition: function (enabled) { 
      _myApp.Base._warn("`enableTransition()` is deprecated, use `noAnimation` instead."); 
      this.noAnimation = !enabled 
    }, 
    _updateTransition: function (enabled) { this.style.transitionDuration = enabled && !this.noAnimation ? "" : "0s" }, 
    _horizontalChanged: function () { 
      this.style.transitionProperty = this._dimensionMaxCss; 
      var otherDimension = "maxWidth" === this._dimensionMax ? "maxHeight" : "maxWidth"; 
      this.style[otherDimension] = ""; 
      this.updateSize(this.opened ? "auto" : "0px", !1) 
    }, 
    _openedChanged: function () {
      this.setAttribute("aria-hidden", !this.opened); 
      this._setTransitioning(!0); 
      this.toggleClass("iron-collapse-closed", !1); 
      this.toggleClass("iron-collapse-opened", !1); 
      this.updateSize(this.opened ? "auto" : "0px", !0);
      // Focus the current collapse.
      if (this.opened) { this.focus() }
    }, 
    _transitionEnd: function () { 
      this.style[this._dimensionMax] = this._desiredSize; 
      this.toggleClass("iron-collapse-closed", !this.opened); 
      this.toggleClass("iron-collapse-opened", this.opened); 
      this._updateTransition(!1); this.notifyResize(); 
      this._setTransitioning(!1) 
    }, 
    _onTransitionEnd: function (event) { 
      if ((0, _myApp.dom)(event).rootTarget === this) { 
        this._transitionEnd() 
      } 
    }, 
    _calcSize: function () { return this.getBoundingClientRect()[this.dimension] + "px" }
  }); 
  const template = _myApp.html`
    <iron-iconset-svg name="image" size="24">
      <svg>
        <defs>
          <g id="audiotrack"><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" /></g>
          <g id="broken-image"><path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z" /></g>
          <g id="details"><path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z" /></g>
          <g id="edit"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></g>
          <g id="flip"><path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z" /></g>
          <g id="grain"><path d="M10 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></g>
          <g id="image"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></g>
        </defs>
      </svg>
    </iron-iconset-svg>`; 
  document.head.appendChild(template.content); 
  const template$1 = _myApp.html`
  <style include="paper-material-styles">
    :host {
      @apply --layout-vertical;
      @apply --layout-center-center;

      background: var(--paper-fab-background, var(--accent-color));
      border-radius: 50%;
      box-sizing: border-box;
      color: var(--text-primary-color);
      cursor: pointer;
      height: 56px;
      min-width: 0;
      outline: none;
      padding: 16px;
      position: relative;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      width: 56px;
      z-index: 0;

      /* NOTE: Both values are needed, since some phones require the value \`transparent\`. */
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;

      @apply --paper-fab;
    }

    [hidden] {
      display: none !important;
    }

    :host([mini]) {
      width: 40px;
      height: 40px;
      padding: 8px;

      @apply --paper-fab-mini;
    }

    :host([disabled]) {
      color: var(--paper-fab-disabled-text, var(--paper-grey-500));
      background: var(--paper-fab-disabled-background, var(--paper-grey-300));

      @apply --paper-fab-disabled;
    }

    iron-icon {
      @apply --paper-fab-iron-icon;
    }

    span {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;

      @apply --paper-fab-label;
    }

    :host(.keyboard-focus) {
      background: var(--paper-fab-keyboard-focus-background, var(--paper-pink-900));
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }
  </style>

  <iron-icon id="icon" hidden\$="{{!_computeIsIconFab(icon, src)}}" src="[[src]]" icon="[[icon]]"></iron-icon>
  <span hidden\$="{{_computeIsIconFab(icon, src)}}">{{label}}</span>`; 
  template$1.setAttribute("strip-whitespace", "");
  /**
   Material design: [Floating Action Button](https://www.google.com/design/spec/components/buttons-floating-action-button.html)
  `paper-fab` is a floating action button. It contains an image placed in the
    center and comes in two sizes: regular size and a smaller size by applying the
    attribute `mini`. When the user touches the button, a ripple effect emanates
    from the center of the button.

    You may import `iron-icons` to use with this element, or provide a URL to a
    custom icon. See `iron-iconset` for more information about how to use a custom
    icon set.
    Example:
      <script type="module">
        import '@polymer/iron-icons/iron-icons.js';
      </script>
      <paper-fab icon="add"></paper-fab>
      <paper-fab mini icon="favorite"></paper-fab>
      <paper-fab src="star.png"></paper-fab>
                                                  
    ### Styling
    The following custom properties and mixins are available for styling:
    Custom property | Description | Default
    ----------------|-------------|----------
    `--paper-fab-background` | The background color of the button | `--accent-color`
    `--paper-fab-keyboard-focus-background` | The background color of the button when focused | `--paper-pink-900`
    `--paper-fab-disabled-background` | The background color of the button when it's disabled | `--paper-grey-300`
    `--paper-fab-disabled-text` | The text color of the button when it's disabled | `--paper-grey-500`
    `--paper-fab` | Mixin applied to the button | `{}`
    `--paper-fab-mini` | Mixin applied to a mini button | `{}`
    `--paper-fab-disabled` | Mixin applied to a disabled button | `{}`
    `--paper-fab-iron-icon` | Mixin applied to the iron-icon within the button | `{}`
    `--paper-fab-label` | Mixin applied to the label within the button | `{}`
    @group Paper Elements
    @demo demo/index.html
    */
  (0, _myApp.Polymer)({
    _template: template$1, 
    is: "paper-fab", 
    behaviors: [_myApp.PaperButtonBehavior], 
    properties: {
      /**
       * The URL of an image for the icon. If the src property is specified,
       * the icon property should not be.
       */
      src: { 
        type: String, 
        value: "" 
      },
      /**
       * Specifies the icon name or index in the set of icons available in
       * the icon's icon set. If the icon property is specified,
       * the src property should not be.
       */
      icon: { 
        type: String, 
        value: "" 
      },
      /**
       * Set this to true to style this is a "mini" FAB.
       */
      mini: { 
        type: Boolean, 
        value: !1, 
        reflectToAttribute: !0 
      },
      /**
       * The label displayed in the badge. The label is centered, and ideally
       * should have very few characters.
       */
      label: { 
        type: String, 
        observer: "_labelChanged" 
      }
    }, 
    _labelChanged: function () { this.setAttribute("aria-label", this.label) }, 
    _computeIsIconFab: function (icon, src) { return 0 < icon.length || 0 < src.length }
  }); 
  const PaperSpinnerBehavior = {
    properties: {
      /**
       * Displays the spinner.
       */
      active: { 
        type: Boolean, 
        value: !1, 
        reflectToAttribute: !0, 
        observer: "__activeChanged" 
      },
      /**
       * Alternative text content for accessibility support.
       * If alt is present, it will add an aria-label whose content matches alt
       * when active. If alt is not present, it will default to 'loading' as the
       * alt value.
       */
      alt: { 
        type: String, 
        value: "loading", 
        observer: "__altChanged" 
      }, 
      __coolingDown: { 
        type: Boolean, 
        value: !1 
      }
    }, 
    __computeContainerClasses: function (active, coolingDown) {
       return [active || coolingDown ? "active" : "", coolingDown ? "cooldown" : ""].join(" ") 
      },
    __activeChanged: function (active, old) { 
      this.__setAriaHidden(!active); this.__coolingDown = !active && old 
    }, 
    __altChanged: function (alt) {// user-provided `aria-label` takes precedence over prototype default
      if ("loading" === alt) { 
        this.alt = this.getAttribute("aria-label") || alt 
      } else { 
        this.__setAriaHidden("" === alt); this.setAttribute("aria-label", alt) 
      }
    },
    __setAriaHidden: function (hidden) { 
      var attr = "aria-hidden"; 
      if (hidden) { 
        this.setAttribute(attr, "true") 
      } else { 
        this.removeAttribute(attr) 
      } 
    }, 
    __reset: function () { 
      this.active = !1; 
      this.__coolingDown = !1 
    }
  }; 
  _exports.PaperSpinnerBehavior = PaperSpinnerBehavior; 
  var paperSpinnerBehavior = { PaperSpinnerBehavior: PaperSpinnerBehavior };
  /**
   @license
   Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at
   http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
   http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
   found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
   part of the polymer project is also subject to an additional IP rights grant
   found at http://polymer.github.io/PATENTS.txt
   */
  _exports.$paperSpinnerBehavior = paperSpinnerBehavior; 
  const $_documentContainer = document.createElement("template"); 
  $_documentContainer.setAttribute("style", "display: none;"); 
  $_documentContainer.innerHTML = `
    <dom-module id="paper-spinner-styles">
    <template>
      <style>
        /*
        /**************************/
        /* STYLES FOR THE SPINNER */
        /**************************/

        /*
        * Constants:
        *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)
        *      ARCTIME     = 1333ms (time it takes to expand and contract arc)
        *      ARCSTARTROT = 216 degrees (how much the start location of the arc
        *                                should rotate each time, 216 gives us a
        *                                5 pointed star shape (it's 360/5 * 3).
        *                                For a 7 pointed star, we might do
        *                                360/7 * 3 = 154.286)
        *      SHRINK_TIME = 400ms
        */

        :host {
          display: inline-block;
          position: relative;
          width: 28px;
          height: 28px;

          /* 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */
          --paper-spinner-container-rotation-duration: 1568ms;

          /* ARCTIME */
          --paper-spinner-expand-contract-duration: 1333ms;

          /* 4 * ARCTIME */
          --paper-spinner-full-cycle-duration: 5332ms;

          /* SHRINK_TIME */
          --paper-spinner-cooldown-duration: 400ms;
        }

        #spinnerContainer {
          width: 100%;
          height: 100%;

          /* The spinner does not have any contents that would have to be
          * flipped if the direction changes. Always use ltr so that the
          * style works out correctly in both cases. */
          direction: ltr;
        }

        #spinnerContainer.active {
          -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
          animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
        }

        @-webkit-keyframes container-rotate {
          to { -webkit-transform: rotate(360deg) }
        }

        @keyframes container-rotate {
          to { transform: rotate(360deg) }
        }

        .spinner-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          white-space: nowrap;
          color: var(--paper-spinner-color, var(--google-blue-500));
        }

        .layer-1 {
          color: var(--paper-spinner-layer-1-color, var(--google-blue-500));
        }

        .layer-2 {
          color: var(--paper-spinner-layer-2-color, var(--google-red-500));
        }

        .layer-3 {
          color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));
        }

        .layer-4 {
          color: var(--paper-spinner-layer-4-color, var(--google-green-500));
        }

        /**
         * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):
         *
         * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't
         * guarantee that the animation will start _exactly_ after that value. So we avoid using
         * animation-delay and instead set custom keyframes for each color (as layer-2undant as it
         * seems).
         */
        .active .spinner-layer {
          -webkit-animation-name: fill-unfill-rotate;
          -webkit-animation-duration: var(--paper-spinner-full-cycle-duration);
          -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
          -webkit-animation-iteration-count: infinite;
          animation-name: fill-unfill-rotate;
          animation-duration: var(--paper-spinner-full-cycle-duration);
          animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
          animation-iteration-count: infinite;
          opacity: 1;
        }

        .active .spinner-layer.layer-1 {
          -webkit-animation-name: fill-unfill-rotate, layer-1-fade-in-out;
          animation-name: fill-unfill-rotate, layer-1-fade-in-out;
        }

        .active .spinner-layer.layer-2 {
          -webkit-animation-name: fill-unfill-rotate, layer-2-fade-in-out;
          animation-name: fill-unfill-rotate, layer-2-fade-in-out;
        }

        .active .spinner-layer.layer-3 {
          -webkit-animation-name: fill-unfill-rotate, layer-3-fade-in-out;
          animation-name: fill-unfill-rotate, layer-3-fade-in-out;
        }

        .active .spinner-layer.layer-4 {
          -webkit-animation-name: fill-unfill-rotate, layer-4-fade-in-out;
          animation-name: fill-unfill-rotate, layer-4-fade-in-out;
        }

        @-webkit-keyframes fill-unfill-rotate {
          12.5% { -webkit-transform: rotate(135deg) } /* 0.5 * ARCSIZE */
          25%   { -webkit-transform: rotate(270deg) } /* 1   * ARCSIZE */
          37.5% { -webkit-transform: rotate(405deg) } /* 1.5 * ARCSIZE */
          50%   { -webkit-transform: rotate(540deg) } /* 2   * ARCSIZE */
          62.5% { -webkit-transform: rotate(675deg) } /* 2.5 * ARCSIZE */
          75%   { -webkit-transform: rotate(810deg) } /* 3   * ARCSIZE */
          87.5% { -webkit-transform: rotate(945deg) } /* 3.5 * ARCSIZE */
          to    { -webkit-transform: rotate(1080deg) } /* 4   * ARCSIZE */
        }

        @keyframes fill-unfill-rotate {
          12.5% { transform: rotate(135deg) } /* 0.5 * ARCSIZE */
          25%   { transform: rotate(270deg) } /* 1   * ARCSIZE */
          37.5% { transform: rotate(405deg) } /* 1.5 * ARCSIZE */
          50%   { transform: rotate(540deg) } /* 2   * ARCSIZE */
          62.5% { transform: rotate(675deg) } /* 2.5 * ARCSIZE */
          75%   { transform: rotate(810deg) } /* 3   * ARCSIZE */
          87.5% { transform: rotate(945deg) } /* 3.5 * ARCSIZE */
          to    { transform: rotate(1080deg) } /* 4   * ARCSIZE */
        }

        @-webkit-keyframes layer-1-fade-in-out {
          0% { opacity: 1 }
          25% { opacity: 1 }
          26% { opacity: 0 }
          89% { opacity: 0 }
          90% { opacity: 1 }
          to { opacity: 1 }
        }

        @keyframes layer-1-fade-in-out {
          0% { opacity: 1 }
          25% { opacity: 1 }
          26% { opacity: 0 }
          89% { opacity: 0 }
          90% { opacity: 1 }
          to { opacity: 1 }
        }

        @-webkit-keyframes layer-2-fade-in-out {
          0% { opacity: 0 }
          15% { opacity: 0 }
          25% { opacity: 1 }
          50% { opacity: 1 }
          51% { opacity: 0 }
          to { opacity: 0 }
        }

        @keyframes layer-2-fade-in-out {
          0% { opacity: 0 }
          15% { opacity: 0 }
          25% { opacity: 1 }
          50% { opacity: 1 }
          51% { opacity: 0 }
          to { opacity: 0 }
        }

        @-webkit-keyframes layer-3-fade-in-out {
          0% { opacity: 0 }
          40% { opacity: 0 }
          50% { opacity: 1 }
          75% { opacity: 1 }
          76% { opacity: 0 }
          to { opacity: 0 }
        }

        @keyframes layer-3-fade-in-out {
          0% { opacity: 0 }
          40% { opacity: 0 }
          50% { opacity: 1 }
          75% { opacity: 1 }
          76% { opacity: 0 }
          to { opacity: 0 }
        }

        @-webkit-keyframes layer-4-fade-in-out {
          0% { opacity: 0 }
          65% { opacity: 0 }
          75% { opacity: 1 }
          90% { opacity: 1 }
          to { opacity: 0 }
        }

        @keyframes layer-4-fade-in-out {
          0% { opacity: 0 }
          65% { opacity: 0 }
          75% { opacity: 1 }
          90% { opacity: 1 }
          to { opacity: 0 }
        }

        .circle-clipper {
          display: inline-block;
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
        }

        /**
         * Patch the gap that appear between the two adjacent div.circle-clipper while the
         * spinner is rotating (appears on Chrome 50, Safari 9.1.1, and Edge).
         */
        .spinner-layer::after {
          content: '';
          left: 45%;
          width: 10%;
          border-top-style: solid;
        }

        .spinner-layer::after,
        .circle-clipper .circle {
          box-sizing: border-box;
          position: absolute;
          top: 0;
          border-width: var(--paper-spinner-stroke-width, 3px);
          border-radius: 50%;
        }

        .circle-clipper .circle {
          bottom: 0;
          width: 200%;
          border-style: solid;
          border-bottom-color: transparent !important;
        }

        .circle-clipper.left .circle {
          left: 0;
          border-right-color: transparent !important;
          -webkit-transform: rotate(129deg);
          transform: rotate(129deg);
        }

        .circle-clipper.right .circle {
          left: -100%;
          border-left-color: transparent !important;
          -webkit-transform: rotate(-129deg);
          transform: rotate(-129deg);
        }

        .active .gap-patch::after,
        .active .circle-clipper .circle {
          -webkit-animation-duration: var(--paper-spinner-expand-contract-duration);
          -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
          -webkit-animation-iteration-count: infinite;
          animation-duration: var(--paper-spinner-expand-contract-duration);
          animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
          animation-iteration-count: infinite;
        }

        .active .circle-clipper.left .circle {
          -webkit-animation-name: left-spin;
          animation-name: left-spin;
        }

        .active .circle-clipper.right .circle {
          -webkit-animation-name: right-spin;
          animation-name: right-spin;
        }

        @-webkit-keyframes left-spin {
          0% { -webkit-transform: rotate(130deg) }
          50% { -webkit-transform: rotate(-5deg) }
          to { -webkit-transform: rotate(130deg) }
        }

        @keyframes left-spin {
          0% { transform: rotate(130deg) }
          50% { transform: rotate(-5deg) }
          to { transform: rotate(130deg) }
        }

        @-webkit-keyframes right-spin {
          0% { -webkit-transform: rotate(-130deg) }
          50% { -webkit-transform: rotate(5deg) }
          to { -webkit-transform: rotate(-130deg) }
        }

        @keyframes right-spin {
          0% { transform: rotate(-130deg) }
          50% { transform: rotate(5deg) }
          to { transform: rotate(-130deg) }
        }

        #spinnerContainer.cooldown {
          -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);
          animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        @-webkit-keyframes fade-out {
          0% { opacity: 1 }
          to { opacity: 0 }
        }

        @keyframes fade-out {
          0% { opacity: 1 }
          to { opacity: 0 }
        }
      </style>
    </template>
    </dom-module>`; 

  document.head.appendChild($_documentContainer.content); 
  const template$2 = _myApp.html`
    <style include="paper-spinner-styles"></style>

    <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
      <div class="spinner-layer layer-1">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer layer-2">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer layer-3">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer layer-4">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>`; 
  template$2.setAttribute("strip-whitespace", "");
  /**
   Material design: [Progress & activity](https://www.google.com/design/spec/components/progress-activity.html)
    Element providing a multiple color material design circular spinner.
      <paper-spinner active></paper-spinner>

    The default spinner cycles between four layers of colors; by default they are
    blue, red, yellow and green. It can be customized to cycle between four
    different colors. Use <paper-spinner-lite> for single color spinners.
                                                  
    ### Accessibility
    Alt attribute should be set to provide adequate context for accessibility. If
    not provided, it defaults to 'loading'. Empty alt can be provided to mark the
    element as decorative if alternative content is provided in another form (e.g. a
    text block following the spinner).
      <paper-spinner alt="Loading contacts list" active></paper-spinner>

    ### Styling
    The following custom properties and mixins are available for styling:
    Custom property | Description | Default
    ----------------|-------------|----------
    `--paper-spinner-layer-1-color` | Color of the first spinner rotation | `--google-blue-500`
    `--paper-spinner-layer-2-color` | Color of the second spinner rotation | `--google-red-500`
    `--paper-spinner-layer-3-color` | Color of the third spinner rotation | `--google-yellow-500`
    `--paper-spinner-layer-4-color` | Color of the fourth spinner rotation | `--google-green-500`
    `--paper-spinner-stroke-width` | The width of the spinner stroke | 3px
    @group Paper Elements
    @element paper-spinner
    @hero hero.svg
    @demo demo/index.html
    */
  (0, _myApp.Polymer)({ 
    _template: template$2, 
    is: "paper-spinner", 
    behaviors: [PaperSpinnerBehavior] 
  }); 
  class GameItem extends _myApp.PolymerElement {
    static get template() {
      return _myApp.html$1`
        <style>
          :host {
            display: block;
          }
          .card {
            margin: 24px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          }
          .subtitle{
            font-size: 13px;
            color: #757575;
          }
          .title{
            font-size: 17px;
          }
          .collapse-content{
            background-color: var(--paper-amber-50);
          }
        </style>

        <div class="card" style="cursor: pointer;">
          <div style="display: flex; align-items: center; position: relative;"  on-click="toggleExpand">
            <div class="canvas-container" style="border-right: 1px solid var(--paper-grey-500); width: 66px; height: 66px; background-size: cover; background-image: url('[[data.image]]'); background-position: center; background-repeat: no-repeat;">
            </div>
            <div style="line-height: 17px; flex-grow: 100;">
              <div style="padding: 8px 12px">
                <div class="title">[[name]]
                </div>
                <div class="subtitle">[[publisher]]
                </div>
                <div class="subtitle">[[tid]]
                </div>
              </div>
            </div>

            <template is="dom-if" if="[[lastNdsFile.running]]">
              <paper-spinner style="min-width: 28px;" active="[[lastNdsFile.running]]">
              </paper-spinner>
            </template>

            <template is="dom-if" if="[[lastNdsFile.finished]]">
              <template is="dom-if" if="[[lastNdsFile.lastErrorLog]]">
                <paper-icon-button style="min-width: 40px;" icon="description" alt="Python Log" on-click="openErrorLog">
                </paper-icon-button>
              </template>

              <template is="dom-if" if="[[lastNdsFile.hadSuccess]]">
                <template is="dom-if" if="[[lastNdsFile.lastSuccessCia]]">
                  <paper-icon-button style="min-width: 40px;" icon="folder-open" alt="Show file" on-click="openFileInExplorer">
                  </paper-icon-button>
                </template>

                <div>
                  <iron-icon icon="check-circle" style="color: var(--paper-green-500);">
                  </iron-icon>
                </div>
              </template>

              <template is="dom-if" if="[[!lastNdsFile.hadSuccess]]">
                <div>
                  <iron-icon icon="cancel" style="color: var(--paper-red-500);">
                  </iron-icon>
                </div>
              </template>
            </template>

            <div style="min-width: 40px;">
              <template is="dom-if" if="[[!expanded]]">
                <paper-icon-button icon="icons:expand-more">
                </paper-icon-button>
              </template>
              <template is="dom-if" if="[[expanded]]">
                <paper-icon-button icon="icons:expand-less">
                </paper-icon-button>
              </template>
            </div>
            <paper-ripple>
            </paper-ripple>
          </div>
          
          <iron-collapse opened="[[expanded]]">
            <div class="collapse-content">
              <div style="padding: 24px;">
                <div>
                  Game File:
                  <div class="subtitle" style="color: var(--paper-blue-500);">[[gamePath]]</div>
                </div>

                <!-- Custom Boxart -->
                <div>
                  <upload-button photo accept=".png" image-file="{{lastNdsFile.boxArtFile}}" image-url="{{lastNdsFile.boxArtUrl}}" manual-upload>
                    <paper-button on-click="setBoxArt">
                      <iron-icon icon="image:image" style="margin-right: 8px;">
                      </iron-icon>
                      Set Box Art
                    </paper-button>
                  </upload-button>
                </div>

                <template is="dom-if" if="[[lastNdsFile.boxArtUrl]]">
                  <div style$="background-image: url('[[lastNdsFile.boxArtUrl]]'); width: 128px; height: 128px; background-position: center; background-size: contain; background-repeat: no-repeat; border: 1px solid var(--paper-grey-400);">
                  </div>
                  <div style="display: flex; align-items: center;">
                    <div>[[lastNdsFile.boxArtFile.path]]
                    </div>
                    <paper-icon-button icon="delete" on-click="removeFiles">
                    </paper-icon-button>
                  </div>
                </template>

                <!-- Custom Sound -->
                <div>
                  <!-- Seems like bannertool accepts .ogg files, so add option for that -->
                  <upload-button sound accept=".wav, .ogg" sound-file="{{lastNdsFile.bannerSoundFile}}" sound-url="{{lastNdsFile.bannerSoundUrl}}" manual-upload>
                    <paper-button on-click="setBannerSound">
                      <iron-icon icon="image:audiotrack" style="margin-right: 8px;">
                      </iron-icon>Set Sound
                    </paper-button>
                  </upload-button>
                </div>

                <template is="dom-if" if="[[lastNdsFile.bannerSoundUrl]]">
                  <div style="display: flex; align-items: center;">
                    <div>[[lastNdsFile.bannerSoundFile.path]]
                    </div>
                    <paper-icon-button icon="delete" on-click="removeSoundFiles">
                    </paper-icon-button>
                  </div>
                </template>


                <!-- Custom ROM Path Toggle -->
                <div>
                  <paper-button  on-click="toggleCustomRomExpanded">
                    <template is="dom-if" if="[[!customRomExpanded]]">
                      <iron-icon icon="icons:expand-more">
                      </iron-icon >
                    </template>
                    <template is="dom-if" if="[[customRomExpanded]]">
                      <iron-icon  icon="icons:expand-less">
                      </iron-icon>
                    </template>
                    ROM Path
                  </paper-button>
                </div>
                <iron-collapse opened="[[customRomExpanded]]">
                  <div class="collapse-content">
                    <paper-input on-input="setCustomRomPath" style="flex-grow: 1;" always-float-label value="{{lastNdsFile.customRomPath}}"></paper-input>
                  </div>
                </iron-collapse>

                <div>
                  <paper-button on-click="dispatchRemove">
                    <iron-icon icon="delete" style="margin-right: 8px;">
                    </iron-icon>Remove NDS File
                  </paper-button>
                </div>
              </div>
            </div>
          </iron-collapse>
        </div>
    `} 
    dispatchRemove() { 
      this.set("expanded", !1); 
      var context = this; 
      setTimeout(function () { 
        context.dispatchEvent(new CustomEvent("delete-clicked", { detail: { ndsFile: context.data } })) 
      }, 250) 
    } 
    setCanvas(canvas) { 
      var element = this.shadowRoot.querySelector(".canvas-container"); 
      while (element.firstChild) { 
        element.removeChild(element.lastChild) 
      } 
      if (null != canvas) { 
        element.appendChild(canvas) 
      } 
    } 
    toggleExpand() { 
      this.set("expanded", !this.expanded); 
      if (!0 == this.expanded) { 
        this.dispatchEvent(new CustomEvent("expand-done", { detail: { ndsFile: this.data } })) 
      } 
    }
    toggleCustomRomExpanded() {
      this.set("customRomExpanded", !this.customRomExpanded)
    }
    _myDataChanged(data) {//console.log("Data",data);
      var context = this; 
      if (this.lastNdsFile) { 
        this.lastNdsFile.kill() 
      } 
      if (null != data) { 
        if (data.name) { 
          this.set("name", data.name) 
        } 
        if (data.publisher) { 
          this.set("publisher", data.publisher) 
        } 
      } 
      if (null != data && null != data.file) {
        this.set("lastNdsFile", new NDSFile(data.file, function (internalData) {//  console.log("DATA 3D!",internalData);
          context.set("name", internalData.name); 
          context.set("publisher", internalData.publisher); 
          context.set("tid", internalData.tid); 
          context.set("overrideTid", internalData.overrideTid); 
          context.set("gameTitle", internalData.gameTitle); 
          context.set("gamePath", internalData.gamePath); 
          if (internalData.canvasObject) 
            context.setCanvas(internalData.canvasObject)
        }))
      }
    } 
    reloadTid() { this.lastNdsFile.reloadTid() } 
    overTidChanged(overrideTid) { 
      if (null != this.lastNdsFile && null != overrideTid) 
        this.lastNdsFile.overrideTid = overrideTid 
    } 
    titleChanged(gameTitle) { 
      if (null != this.lastNdsFile && null != gameTitle) { 
        this.lastNdsFile.gameTitle = gameTitle 
      } 
    } 
    pathChanged(gamePath) { 
      if (null != this.lastNdsFile && null != gamePath) { 
        this.lastNdsFile.gamePath = gamePath 
      } 
    }

    setCustomRomPath(e){
      var context=this;
      console.log("Calling directory input");
      if(this.customRomDirectoryDebounce){
        clearTimeout(this.customRomDirectoryDebounce);
        this.set("customRomDirectoryDebounce",null);
      }
      this.set("customRomDirectoryDebounce",setTimeout(function(){
        if(context.customRomPath == "") {
          context.customRomPath = null;
        }
        LocalStoreQuery.set("context.lastNdsFile.customRomPath", context.lastNdsFile.customRomPath);
        MiscUtils.Toast.show("Custom ROM path updated");
      },750))
    }

    openFileInExplorer(e) { 
      e.preventDefault(); 
      e.stopPropagation(); 
      var url = this.lastNdsFile.lastSuccessCia, path = require("path"), output = this.lastNdsFile.outputPath; 
      console.log("URL", url); 
      if (null != url) { 
        const { shell } = require("electron"); 
        shell.showItemInFolder(path.resolve(url)) 
      } 
    } 
    openErrorLog(e) { 
      e.preventDefault(); 
      e.stopPropagation(); 
      var url = this.lastNdsFile.lastErrorLog, path = require("path"); 
      console.log("URL", url); 
      if (null != url) { 
        const { shell } = require("electron"); 
        shell.openPath(path.resolve(url)) 
      } 
    } 
    removeImageFiles() { 
      this.set("lastNdsFile.boxArtUrl", null); 
      this.set("lastNdsFile.boxArtFile", null); 
      this.shadowRoot.querySelector("upload-button").clearFile() 
    }

    removeSoundFiles() {
      this.set("lastNdsFile.bannerSoundUrl", null);
      this.set("lastNdsFile.bannerSoundFile", null);
      this.shadowRoot.querySelector("upload-button").clearFile()
    }

    static get properties() {
      return {
        boxArtUrl: { 
          type: String, 
          notify: !0, 
          value: null 
        }, 
        boxArtFile: { 
          type: Object, 
          notify: !0, 
          value: null 
        },
        bannerSoundUrl: {
          type: String,
          notify: !0,
          value: null
        },
        bannerSoundFile: {
          type: Object,
          notify: !0,
          value: null
        },
        running: { 
          type: Boolean, 
          notify: !0, 
          value: !1 
        }, 
        finished: { 
          type: Boolean, 
          notify: !0, 
          value: !1 
        }, 
        hadSuccess: { 
          type: Boolean, 
          notify: !0, 
          value: !1 
        }, 
        gameTitle: { 
          type: String, 
          notify: !0, 
          observer: "titleChanged" 
        }, 
        gamePath: { 
          type: String, 
          notify: !0, 
          observer: "pathChanged" 
        }, 
        overrideTid: { 
          type: String, 
          notify: !0, 
          observer: "overTidChanged" 
        }, 
        expanded: { 
          type: Boolean, 
          notify: !0, 
          value: !1 
        }, 
        data: { 
          type: Object, 
          notify: !0, 
          observer: "_myDataChanged" 
        },
        customRomExpanded: {
          type: Boolean,
          notify: !0,
          value: !1,
        },
        customRomPath: {
          type: String,
          notify: !0,
          value: null
        }
      }
    }
  }

  window.customElements.define("game-item", GameItem);
  
  
  class GameList extends (0, _myApp.ElectronMixin)(_myApp.PolymerElement) {
    static get template() {
      return _myApp.html$1`
        <style include="shared-styles">
          :host {
            display: block;
            padding: 10px;
          }
          [bordered]{
            border: 6px dashed var(--paper-grey-400);
          }
        </style>

        <div style="min-height: calc(100vh - 200px);" bordered$="[[!ndsFiles.length]]" id="dropZone">
          <template is="dom-if" if="[[!ndsFiles.length]]">
            <div style="display: flex; align-items: center; justify-content: center; padding: 24px; min-height: calc(100vh - 200px - 48px);">
              <div style="text-align: center;">
                <div style="font-size: 24px; color: var(--paper-grey-500); font-weight: 600;">You haven't added any file yet. 
                </div>
                <div style="font-size: 15px; color: var(--paper-grey-500);"> Drag and drop them here or click on the folder icon button in the top right corner.
                </div>
              </div>
            </div>
          </template>

          <template is="dom-repeat" items="[[ndsFiles]]" as="nds" restamp>
            <game-item data="[[nds]]" on-delete-clicked="removeGame">
            </game-item>
          </template>

          <template is="dom-if" if="[[ndsFiles.length]]">
            <div style="position: sticky; bottom: 24px; right: 24px; display: flex; align-items: center; justify-content: flex-end;">
              <paper-fab on-click="downloadAllTemplates" disabled$="[[saving]]" icon="file-download" >
              </paper-fab>
            </div>
          </template>
        </div>
    `} 
    removeGame(e) { 
      var ndsFile = e.detail.ndsFile; 
      this.splice("ndsFiles", this.ndsFiles.indexOf(ndsFile), 1); 
      MiscUtils.Toast.show("File removed successfully") 
    } 
    pushFiles(files) {
      if (!this.ndsFiles) { 
        this.set("ndsFiles", []) 
      } 
      for (var i = 0; i < files.length; i++) {//      var ndsFile=new NDSFile(files[i],function());
        this.push("ndsFiles", { file: files[i] })
      }
    } 
    _getCurrentPath() { 
      const { remote } = require("electron"); 
      if (null != this.directoryPath && "" != this.directoryPath.trim()) { 
        return this.directoryPath.trim() 
      } 
      var camino = remote.process.env.PORTABLE_EXECUTABLE_DIR; 
      if (!camino) { 
        camino = "." 
      } 
      return camino 
    } 
    callPythonGenerator(template) {
      var context = this, ndsFile = template.lastNdsFile; 
      console.log("NDS FILE", ndsFile); 
      const spawn = require("child_process").spawn; 
      var camino = ndsFile.file.path, outputName = "YANBF-" + ndsFile.file.name.substring(0, ndsFile.file.name.length - 4).replace(/ /g, "_") + ".cia", outputLog = "YANBF-" + ndsFile.file.name.substring(0, ndsFile.file.name.length - 4).replace(/ /g, "_") + ".log"; 
      console.log("Output name", outputName); 
      var arrayArgs = []; 
      arrayArgs.push(camino); 
      if (null != ndsFile.boxArtFile) { 
        arrayArgs.push("-b"); 
        arrayArgs.push(ndsFile.boxArtFile.path); 
        console.log("Path File", ndsFile.boxArtFile.path) 
      }
      if (null != ndsFile.bannerSoundFile) {
        arrayArgs.push("-s");
        arrayArgs.push(ndsFile.bannerSoundFile.path);
        console.log("Path File", ndsFile.bannerSoundFile.path)
      }

      if (null != ndsFile.customRomPath) {
        arrayArgs.push("-p");
        arrayArgs.push(ndsFile.customRomPath);
        console.log("Custom Rom Path", ndsFile.customRomPath);
      }

      console.log("Array args", arrayArgs); 
      const pythonProcess = spawn(context._getCurrentPath() + "/generator", arrayArgs, { cwd: this._getCurrentPath() }); 
      template.set("lastNdsFile.running", !0); 
      template.set("lastNdsFile.finished", !1); 
      template.set("lastNdsFile.hadSuccess", !1); 
      return new Promise(function (resolve, reject) {
        /*    
        pythonProcess.on("error",function(err){
            console.log("Python error",err);
          });
          pythonProcess.on("close",function(err){
            console.log("Python close",err);
          });*/
        pythonProcess.stderr.on("data", data => {
          var result = data.toString(); 
          console.log("Python error", result); 
          const fs = require("fs"); 
          var now = new Date; 
          fs.writeFile(context._getCurrentPath() + "/output/logs/" + outputLog, now.toString() + ": " + result + "\r\n", { flag: "a+" }, function (err) {
            if (err) 
              return console.log(err);//console.log('Hello World > helloworld.txt');
            template.set("lastNdsFile.lastErrorLog", context._getCurrentPath() + "/output/logs/" + outputLog)
              }
          )
        }); 
        pythonProcess.stdout.on("data", data => {
          var result = data.toString(); 
          const fs = require("fs"); 
          var now = new Date; 
          fs.writeFile(context._getCurrentPath() + "/output/logs/" + outputLog, now.toString() + ": " + result + "\r\n", { flag: "a+" }, function (err) {
            if (err) 
              return console.log(err); //console.log('Hello World > helloworld.txt');
            template.set("lastNdsFile.lastErrorLog", context._getCurrentPath() + "/output/logs/" + outputLog)
          }); 
          console.log("Python print", result); 
          template.set("lastNdsFile.running", !1); 
          template.set("lastNdsFile.finished", !0); 
          if (null != result && -1 < result.indexOf("CIA generated.")) { 
            console.log("Success!"); 
            template.set("lastNdsFile.hadSuccess", !0); 
            var path = require("path"), ciaPath = path.resolve(context._getCurrentPath() + "/output/" + outputName), outputPath = path.resolve(context._getCurrentPath() + "/output"); 
            template.set("lastNdsFile.lastSuccessCia", ciaPath); 
            template.set("lastNdsFile.outputPath", outputPath); 
            resolve({ ndsFile: ndsFile, success: !0 }) 
          } else { 
            console.log("Failure!"); 
            template.set("lastNdsFile.hadSuccess", !1); 
            resolve({ ndsFile: ndsFile, success: !1 }) 
          }
        })
      })
    } 
    downloadAllTemplates() {
      var fs = require("fs"), dir = this._getCurrentPath() + "/output"; 
      if (!fs.existsSync(dir)) { 
        fs.mkdirSync(dir) 
      } 
      if (!fs.existsSync(dir + "/logs")) { 
        fs.mkdirSync(dir + "/logs") 
      } 
      for (var context = this, templates = this.shadowRoot.querySelectorAll("game-item"), templateArray = [], i = 0; i < templates.length; i++) {
        templateArray.push(templates[i]);//      arr.push(this.downloadTemplate(templates[i]));
      } 
      if (!templateArray.length) { 
        MiscUtils.Toast.show("You didn't add any files"); 
        return 
      } 
      context.set("saving", !0);/*var arr=[];
                                 for(var i=0;i<templates.length;i++){
                                       arr.push(this.callPythonGenerator(templates[i]));
                                 //      arr.push(this.downloadTemplate(templates[i]));
                                 }*/
      const { shell } = require("electron"); 
      var path = require("path"), outputPath = path.resolve(this._getCurrentPath() + "/output"); 
      return templateArray.reduce((p, template) => {
        return p.then(() => {
          return context.callPythonGenerator(template);//function returns a promise
        })
      }, Promise.resolve()).then(result => { 
        console.log("Result", result); 
        context.set("saving", !1); 
        MiscUtils.Toast.show("The generation process has ended"); 
      }).catch(function (err) { 
        context.set("saving", !1); 
        console.error("Errors!", err); 
        MiscUtils.Toast.show("The generation process has ended with errors"); 
        shell.openPath(outputPath) 
      })
    } 
    ready() { 
      super.ready(); 
      var context = this; 
      setTimeout(function () { 
        context.setupDropZone() 
      }, 500) 
    } 
    setupDropZone() {
      var dropZone = this.shadowRoot.querySelector("#dropZone"), context = this;// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
      dropZone.addEventListener("dragover", function (e) { 
        e.stopPropagation(); 
        e.preventDefault(); 
        e.dataTransfer.dropEffect = "copy" 
      });// Get file data on drop
      dropZone.addEventListener("drop", function (e) {
        e.stopPropagation(); 
        e.preventDefault();// Array of all files
        for (var files = e.dataTransfer.files, i = 0, file; file = files[i]; i++) {
          console.log("FILEddd", file); 
          if (file.name.endsWith(".nds") || file.name.endsWith(".dsi") || file.name.endsWith(".ids")) {
            console.log("IS NDS file!"); 
            context.pushFiles([file]);/*            var reader = new FileReader();
                                     
                                                 reader.onload = function(e2) {
                                                     // finished reading file data.
                                                     var img = document.createElement('img');
                                                     img.src= e2.target.result;
                                                     document.body.appendChild(img);
                                                 }
                                     
                                                 reader.readAsDataURL(file); // start reading the file data.
                                                 */}
        }
      })
    } 
    constructor() {
      super(); 
      var context = this; 
      LocalStoreQuery.addFieldCallback("directoryPath", function (path) {
        if (null == path || "" == path || "null" == path) { 
          LocalStoreQuery.set("directoryPath", ".") 
        } else {
          context.set("directoryPath", path);//        LocalStoreQuery.set("directoryPath",context._getCurrentPath());
        }
      });
    } 
    static get properties() { 
      return { 
        saving: { 
          type: Boolean, 
          notify: !0, 
          value: !1 
        }, 
        cardList: { 
          type: Array, 
          notify: !0 
        }, 
        ndsFiles: { 
          type: Array, 
          notify: !0, 
          value: null 
        } 
      } 
    }
  } 
  window.customElements.define("game-list", GameList)
});