// --------------------------------------------------
// Main js
// --------------------------------------------------


'use strict';

// Lib
// --------------------------
!function (a, b) {
    "function" == typeof define && define.amd ? define([], function () {
            return a.svg4everybody = b()
        }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b()
}(this, function () {/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
    function a(a, b) {
        if (b) {
            var c = !a.getAttribute("viewBox") && b.getAttribute("viewBox"), d = document.createDocumentFragment(), e = b.cloneNode(!0);
            for (c && a.setAttribute("viewBox", c); e.childNodes.length;)d.appendChild(e.firstChild);
            a.appendChild(d)
        }
    }

    function b(b) {
        b.onreadystatechange = function () {
            if (4 === b.readyState) {
                var c = document.createElement("x");
                c.innerHTML = b.responseText, b.s.splice(0).map(function (b) {
                    a(b[0], c.querySelector("#" + b[1].replace(/(\W)/g, "\\$1")))
                })
            }
        }, b.onreadystatechange()
    }

    function c(c) {
        function d() {
            for (var c; c = e[0];) {
                var j = c.parentNode;
                if (j && /svg/i.test(j.nodeName)) {
                    var k = c.getAttribute("xlink:href");
                    if (f && (!g || g(k, j, c))) {
                        var l = k.split("#"), m = l[0], n = l[1];
                        if (j.removeChild(c), m.length) {
                            var o = i[m] = i[m] || new XMLHttpRequest;
                            o.s || (o.s = [], o.open("GET", m), o.send()), o.s.push([j, n]), b(o)
                        } else a(j, document.getElementById(n))
                    }
                }
            }
            h(d, 17)
        }

        c = c || {};
        var e = document.getElementsByTagName("use"), f = "shim" in c ? c.shim : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537, g = c.validate, h = window.requestAnimationFrame || setTimeout, i = {};
        f && d()
    }

    return c
});


// Plugins
// --------------------------


// Polyfill
// --------------------------

!function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector || function (selector) {
            for (var element = this, elements = (element.document || element.ownerDocument).querySelectorAll(selector), index = 0; elements[index] && elements[index] !== element;)++index;
            return elements[index] ? !0 : !1
        }, ELEMENT.closest = ELEMENT.closest || function (selector) {
            for (var element = this; element && !element.matches(selector);)element = element.parentElement;
            return element
        }
}(Element.prototype), function () {
    if ("function" != typeof window.getMatchedCSSRules) {
        var ELEMENT_RE = /[\w-]+/g, ID_RE = /#[\w-]+/g, CLASS_RE = /\.[\w-]+/g, ATTR_RE = /\[[^\]]+\]/g, PSEUDO_CLASSES_RE = /\:(?!not)[\w-]+(\(.*\))?/g, PSEUDO_ELEMENTS_RE = /\:\:?(after|before|first-letter|first-line|selection)/g, toArray = function (list) {
            for (var items = [], i = 0, listLength = list.length; listLength > i; i++)items.push(list[i]);
            return items
        }, getCSSHost = function (href) {
            var fakeLinkOfSheet = document.createElement("a");
            return fakeLinkOfSheet.href = href, fakeLinkOfSheet.host
        }, getSheetRules = function (stylesheet) {
            var sheetHost, sheetMedia = stylesheet.media && stylesheet.media.mediaText;
            if ("true" == objectFit.disableCrossDomain && (sheetHost = getCSSHost(stylesheet.href), sheetHost !== window.location.host))return [];
            if (stylesheet.disabled)return [];
            if (window.matchMedia) {
                if (sheetMedia && sheetMedia.length && !window.matchMedia(sheetMedia).matches)return []
            } else if (sheetMedia && sheetMedia.length)return [];
            return toArray(stylesheet.cssRules)
        }, _find = function (string, re) {
            string.match(re);
            return re ? re.length : 0
        }, calculateScore = function (selector) {
            for (var part, match, score = [0, 0, 0], parts = selector.split(" "); part = parts.shift(), "string" == typeof part;)match = _find(part, PSEUDO_ELEMENTS_RE), score[2] = match, match && (part = part.replace(PSEUDO_ELEMENTS_RE, "")), match = _find(part, PSEUDO_CLASSES_RE), score[1] = match, match && (part = part.replace(PSEUDO_CLASSES_RE, "")), match = _find(part, ATTR_RE), score[1] += match, match && (part = part.replace(ATTR_RE, "")), match = _find(part, ID_RE), score[0] = match, match && (part = part.replace(ID_RE, "")), match = _find(part, CLASS_RE), score[1] += match, match && (part = part.replace(CLASS_RE, "")), score[2] += _find(part, ELEMENT_RE);
            return parseInt(score.join(""), 10)
        }, getSpecificityScore = function (element, selectorText) {
            for (var selector, score, selectors = selectorText.split(","), result = 0; selector = selectors.shift();)element.closest(selector) && (score = calculateScore(selector), result = score > result ? score : result);
            return result
        }, sortBySpecificity = function (element, rules) {
            var compareSpecificity = function (a, b) {
                return getSpecificityScore(element, b.selectorText) - getSpecificityScore(element, a.selectorText)
            };
            return rules.sort(compareSpecificity)
        };
        window.getMatchedCSSRules = function (element) {
            var styleSheets, sheet, rules, rule, result = [];
            for (styleSheets = toArray(window.document.styleSheets); sheet = styleSheets.shift();)for (rules = getSheetRules(sheet); rule = rules.shift();)rule.styleSheet ? rules = getSheetRules(rule.styleSheet).concat(rules) : rule.media ? rules = getSheetRules(rule).concat(rules) : element.closest(rule.selectorText) && result.push(rule);
            return sortBySpecificity(element, result)
        }
    }
}(), function (window) {
    for (var lastTime = 0, vendors = ["webkit", "moz"], requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, i = vendors.length; --i >= 0 && !requestAnimationFrame;)requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"], cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"];
    requestAnimationFrame && cancelAnimationFrame || (requestAnimationFrame = function (callback) {
        var now = +new Date, nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function () {
            callback(lastTime = nextTime)
        }, nextTime - now)
    }, cancelAnimationFrame = clearTimeout), window.requestAnimationFrame = requestAnimationFrame, window.cancelAnimationFrame = cancelAnimationFrame
}(window), function (global) {
    "use strict";
    var objectFit = {};
    objectFit._debug = !1, objectFit.observer = null, objectFit.disableCrossDomain = "false", objectFit.getComputedStyle = function (element, context) {
        return context = context || window, context.getComputedStyle ? context.getComputedStyle(element, null) : element.currentStyle
    }, objectFit.getDefaultComputedStyle = function (element) {
        var newelement = element.cloneNode(!0), styles = {}, iframe = document.createElement("iframe");
        document.body.appendChild(iframe), iframe.contentWindow.document.open(), iframe.contentWindow.document.write("<body></body>"), iframe.contentWindow.document.body.appendChild(newelement), iframe.contentWindow.document.close();
        var value, property, defaultElement = iframe.contentWindow.document.querySelectorAll(element.nodeName.toLowerCase())[0], defaultComputedStyle = this.getComputedStyle(defaultElement, iframe.contentWindow);
        for (property in defaultComputedStyle)if (value = defaultComputedStyle.getPropertyValue === !0 ? defaultComputedStyle.getPropertyValue(property) : defaultComputedStyle[property], null !== value)switch (property) {
            default:
                styles[property] = value;
                break;
            case"width":
            case"height":
            case"minWidth":
            case"minHeight":
            case"maxWidth":
            case"maxHeight":
        }
        return document.body.removeChild(iframe), styles
    }, objectFit.getMatchedStyle = function (element, property) {
        var val = null, inlineval = null;
        element.style.getPropertyValue ? inlineval = element.style.getPropertyValue(property) : element.currentStyle && (inlineval = element.currentStyle[property]);
        var r, important, rules = window.getMatchedCSSRules(element), i = rules.length;
        if (i)for (; i-- > 0 && (r = rules[i], important = r.style.getPropertyPriority(property), null !== val && !important || (val = r.style.getPropertyValue(property), !important)););
        return val || null === inlineval || (val = inlineval), val
    }, objectFit.orientation = function (replacedElement) {
        if (replacedElement.parentNode && "x-object-fit" === replacedElement.parentNode.nodeName.toLowerCase()) {
            var width = replacedElement.naturalWidth || replacedElement.clientWidth, height = replacedElement.naturalHeight || replacedElement.clientHeight, parentWidth = replacedElement.parentNode.clientWidth, parentHeight = replacedElement.parentNode.clientHeight;
            !height || width / height > parentWidth / parentHeight ? "wider" !== replacedElement.getAttribute("data-x-object-relation") && (replacedElement.setAttribute("data-x-object-relation", "wider"), replacedElement.className += " x-object-fit-wider", this._debug && window.console && console.log("x-object-fit-wider")) : "taller" !== replacedElement.getAttribute("data-x-object-relation") && (replacedElement.setAttribute("data-x-object-relation", "taller"), replacedElement.className += " x-object-fit-taller", this._debug && window.console && console.log("x-object-fit-taller"))
        }
    }, objectFit.process = function (args) {
        if (args.selector && args.replacedElements) {
            switch (objectFit.disableCrossDomain = args.disableCrossDomain || "false", args.fittype = args.fittype || "none", args.fittype) {
                default:
                    return;
                case"none":
                case"fill":
                case"contain":
                case"cover":
            }
            var replacedElements = args.replacedElements;
            if (replacedElements.length)for (var i = 0, replacedElementsLength = replacedElements.length; replacedElementsLength > i; i++)this.processElement(replacedElements[i], args)
        }
    }, objectFit.processElement = function (replacedElement, args) {
        var property, value, replacedElementStyles = objectFit.getComputedStyle(replacedElement), replacedElementDefaultStyles = objectFit.getDefaultComputedStyle(replacedElement), wrapperElement = document.createElement("x-object-fit");
        objectFit._debug && window.console && console.log("Applying to WRAPPER-------------------------------------------------------");
        for (property in replacedElementStyles)switch (property) {
            default:
                value = objectFit.getMatchedStyle(replacedElement, property), null !== value && "" !== value && (objectFit._debug && window.console && console.log(property + ": " + value), wrapperElement.style[property] = value);
                break;
            case"length":
            case"parentRule":
        }
        objectFit._debug && window.console && console.log("Applying to REPLACED ELEMENT-------------------------------------------------------");
        for (property in replacedElementDefaultStyles)switch (property) {
            default:
                value = replacedElementDefaultStyles[property], objectFit._debug && window.console && "" !== value && (console.log(property + ": " + value), void 0 === replacedElement.style[property] && console.log("Indexed style properties (`" + property + "`) not supported in: " + window.navigator.userAgent)), replacedElement.style[property] ? replacedElement.style[property] = value : replacedElement.style.property = value;
                break;
            case"length":
            case"parentRule":
        }
        wrapperElement.setAttribute("class", "x-object-fit-" + args.fittype), replacedElement.parentNode.insertBefore(wrapperElement, replacedElement), wrapperElement.appendChild(replacedElement), objectFit.orientation(replacedElement);
        var resizeTimer = null, resizeAction = function () {
            null !== resizeTimer && window.cancelAnimationFrame(resizeTimer), resizeTimer = window.requestAnimationFrame(function () {
                objectFit.orientation(replacedElement)
            })
        };
        switch (args.fittype) {
            default:
                break;
            case"contain":
            case"cover":
                window.addEventListener ? (replacedElement.addEventListener("load", resizeAction, !1), window.addEventListener("resize", resizeAction, !1), window.addEventListener("orientationchange", resizeAction, !1)) : (replacedElement.attachEvent("onload", resizeAction), window.attachEvent("onresize", resizeAction))
        }
    }, objectFit.listen = function (args) {
        var domInsertedAction = function (element) {
            for (var i = 0, argsLength = args.length; argsLength > i; i++)(element.mozMatchesSelector && element.mozMatchesSelector(args[i].selector) || element.msMatchesSelector && element.msMatchesSelector(args[i].selector) || element.oMatchesSelector && element.oMatchesSelector(args[i].selector) || element.webkitMatchesSelector && element.webkitMatchesSelector(args[i].selector)) && (args[i].replacedElements = [element], objectFit.process(args[i]), objectFit._debug && window.console && console.log("Matching node inserted: " + element.nodeName))
        }, domInsertedObserverFunction = function (element) {
            objectFit.observer.disconnect(), domInsertedAction(element), objectFit.observer.observe(document.documentElement, {
                childList: !0,
                subtree: !0
            })
        }, domInsertedEventFunction = function (event) {
            window.removeEventListener("DOMNodeInserted", domInsertedEventFunction, !1), domInsertedAction(event.target), window.addEventListener("DOMNodeInserted", domInsertedEventFunction, !1)
        }, domRemovedAction = function (element) {
            "x-object-fit" === element.nodeName.toLowerCase() && (element.parentNode.removeChild(element), objectFit._debug && window.console && console.log("Matching node removed: " + element.nodeName))
        }, domRemovedObserverFunction = function (element) {
            objectFit.observer.disconnect(), domRemovedAction(element), objectFit.observer.observe(document.documentElement, {
                childList: !0,
                subtree: !0
            })
        }, domRemovedEventFunction = function (event) {
            window.removeEventListener("DOMNodeRemoved", domRemovedEventFunction, !1), domRemovedAction(event.target.parentNode), window.addEventListener("DOMNodeRemoved", domRemovedEventFunction, !1)
        };
        window.MutationObserver ? (objectFit._debug && window.console && console.log("DOM MutationObserver"), this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length)for (var nodes = mutation.addedNodes, i = 0, nodesLength = nodes.length; nodesLength > i; i++)domInsertedObserverFunction(nodes[i]);
                mutation.removedNodes && mutation.removedNodes.length && domRemovedObserverFunction(mutation.target)
            })
        }), this.observer.observe(document.documentElement, {
            childList: !0,
            subtree: !0
        })) : window.addEventListener && (objectFit._debug && window.console && console.log("DOM Mutation Events"), window.addEventListener("DOMNodeInserted", domInsertedEventFunction, !1), window.addEventListener("DOMNodeRemoved", domRemovedEventFunction, !1))
    }, objectFit.init = function (args) {
        if (args) {
            args instanceof Array || (args = [args]);
            for (var i = 0, argsLength = args.length; argsLength > i; i++)args[i].replacedElements = document.querySelectorAll(args[i].selector), this.process(args[i]);
            this.listen(args)
        }
    }, objectFit.polyfill = function (args) {
        "objectFit" in document.documentElement.style == !1 ? (objectFit._debug && window.console && console.log("object-fit not natively supported"), "complete" === document.readyState ? objectFit.init(args) : window.addEventListener ? window.addEventListener("load", function () {
            objectFit.init(args)
        }, !1) : window.attachEvent("onload", function () {
            objectFit.init(args)
        })) : objectFit._debug && window.console && console.log("object-fit natively supported")
    }, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = objectFit : "function" == typeof define && define.amd ? define([], function () {
        return objectFit
    }) : "object" == typeof global && "object" == typeof global.document && (global.objectFit = objectFit)
}(window);
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function (a) {
    var b = navigator.userAgent;
    a.HTMLPictureElement && /ecko/.test(b) && b.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", function () {
        var b, c = document.createElement("source"), d = function (a) {
            var b, d, e = a.parentNode;
            "PICTURE" === e.nodeName.toUpperCase() ? (b = c.cloneNode(), e.insertBefore(b, e.firstElementChild), setTimeout(function () {
                    e.removeChild(b)
                })) : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) && (a._pfLastSize = a.offsetWidth, d = a.sizes, a.sizes += ",100vw", setTimeout(function () {
                    a.sizes = d
                }))
        }, e = function () {
            var a, b = document.querySelectorAll("picture > img, img[srcset][sizes]");
            for (a = 0; a < b.length; a++)d(b[a])
        }, f = function () {
            clearTimeout(b), b = setTimeout(e, 99)
        }, g = a.matchMedia && matchMedia("(orientation: landscape)"), h = function () {
            f(), g && g.addListener && g.addListener(f)
        };
        return c.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? h() : document.addEventListener("DOMContentLoaded", h), f
    }())
}(window), function (a, b, c) {
    "use strict";
    function d(a) {
        return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a
    }

    function e(b, c) {
        var d = new a.Image;
        return d.onerror = function () {
            A[b] = !1, ba()
        }, d.onload = function () {
            A[b] = 1 === d.width, ba()
        }, d.src = c, "pending"
    }

    function f() {
        M = !1, P = a.devicePixelRatio, N = {}, O = {}, s.DPR = P || 1, Q.width = Math.max(a.innerWidth || 0, z.clientWidth), Q.height = Math.max(a.innerHeight || 0, z.clientHeight), Q.vw = Q.width / 100, Q.vh = Q.height / 100, r = [Q.height, Q.width, P].join("-"), Q.em = s.getEmValue(), Q.rem = Q.em
    }

    function g(a, b, c, d) {
        var e, f, g, h;
        return "saveData" === B.algorithm ? a > 2.7 ? h = c + 1 : (f = b - c, e = Math.pow(a - .6, 1.5), g = f * e, d && (g += .1 * e), h = a + g) : h = c > 1 ? Math.sqrt(a * b) : a, h > c
    }

    function h(a) {
        var b, c = s.getSet(a), d = !1;
        "pending" !== c && (d = r, c && (b = s.setRes(c), s.applySetCandidate(b, a))), a[s.ns].evaled = d
    }

    function i(a, b) {
        return a.res - b.res
    }

    function j(a, b, c) {
        var d;
        return !c && b && (c = a[s.ns].sets, c = c && c[c.length - 1]), d = k(b, c), d && (b = s.makeUrl(b), a[s.ns].curSrc = b, a[s.ns].curCan = d, d.res || aa(d, d.set.sizes)), d
    }

    function k(a, b) {
        var c, d, e;
        if (a && b)for (e = s.parseSet(b), a = s.makeUrl(a), c = 0; c < e.length; c++)if (a === s.makeUrl(e[c].url)) {
            d = e[c];
            break
        }
        return d
    }

    function l(a, b) {
        var c, d, e, f, g = a.getElementsByTagName("source");
        for (c = 0, d = g.length; d > c; c++)e = g[c], e[s.ns] = !0, f = e.getAttribute("srcset"), f && b.push({
            srcset: f,
            media: e.getAttribute("media"),
            type: e.getAttribute("type"),
            sizes: e.getAttribute("sizes")
        })
    }

    function m(a, b) {
        function c(b) {
            var c, d = b.exec(a.substring(m));
            return d ? (c = d[0], m += c.length, c) : void 0
        }

        function e() {
            var a, c, d, e, f, i, j, k, l, m = !1, o = {};
            for (e = 0; e < h.length; e++)f = h[e], i = f[f.length - 1], j = f.substring(0, f.length - 1), k = parseInt(j, 10), l = parseFloat(j), X.test(j) && "w" === i ? ((a || c) && (m = !0), 0 === k ? m = !0 : a = k) : Y.test(j) && "x" === i ? ((a || c || d) && (m = !0), 0 > l ? m = !0 : c = l) : X.test(j) && "h" === i ? ((d || c) && (m = !0), 0 === k ? m = !0 : d = k) : m = !0;
            m || (o.url = g, a && (o.w = a), c && (o.d = c), d && (o.h = d), d || c || a || (o.d = 1), 1 === o.d && (b.has1x = !0), o.set = b, n.push(o))
        }

        function f() {
            for (c(T), i = "", j = "in descriptor"; ;) {
                if (k = a.charAt(m), "in descriptor" === j)if (d(k)) i && (h.push(i), i = "", j = "after descriptor"); else {
                    if ("," === k)return m += 1, i && h.push(i), void e();
                    if ("(" === k) i += k, j = "in parens"; else {
                        if ("" === k)return i && h.push(i), void e();
                        i += k
                    }
                } else if ("in parens" === j)if (")" === k) i += k, j = "in descriptor"; else {
                    if ("" === k)return h.push(i), void e();
                    i += k
                } else if ("after descriptor" === j)if (d(k)); else {
                    if ("" === k)return void e();
                    j = "in descriptor", m -= 1
                }
                m += 1
            }
        }

        for (var g, h, i, j, k, l = a.length, m = 0, n = []; ;) {
            if (c(U), m >= l)return n;
            g = c(V), h = [], "," === g.slice(-1) ? (g = g.replace(W, ""), e()) : f()
        }
    }

    function n(a) {
        function b(a) {
            function b() {
                f && (g.push(f), f = "")
            }

            function c() {
                g[0] && (h.push(g), g = [])
            }

            for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1; ;) {
                if (e = a.charAt(j), "" === e)return b(), c(), h;
                if (k) {
                    if ("*" === e && "/" === a[j + 1]) {
                        k = !1, j += 2, b();
                        continue
                    }
                    j += 1
                } else {
                    if (d(e)) {
                        if (a.charAt(j - 1) && d(a.charAt(j - 1)) || !f) {
                            j += 1;
                            continue
                        }
                        if (0 === i) {
                            b(), j += 1;
                            continue
                        }
                        e = " "
                    } else if ("(" === e) i += 1; else if (")" === e) i -= 1; else {
                        if ("," === e) {
                            b(), c(), j += 1;
                            continue
                        }
                        if ("/" === e && "*" === a.charAt(j + 1)) {
                            k = !0, j += 2;
                            continue
                        }
                    }
                    f += e, j += 1
                }
            }
        }

        function c(a) {
            return k.test(a) && parseFloat(a) >= 0 ? !0 : l.test(a) ? !0 : "0" === a || "-0" === a || "+0" === a ? !0 : !1
        }

        var e, f, g, h, i, j, k = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
        for (f = b(a), g = f.length, e = 0; g > e; e++)if (h = f[e], i = h[h.length - 1], c(i)) {
            if (j = i, h.pop(), 0 === h.length)return j;
            if (h = h.join(" "), s.matchesMedia(h))return j
        }
        return "100vw"
    }

    b.createElement("picture");
    var o, p, q, r, s = {}, t = !1, u = function () {
    }, v = b.createElement("img"), w = v.getAttribute, x = v.setAttribute, y = v.removeAttribute, z = b.documentElement, A = {}, B = {algorithm: ""}, C = "data-pfsrc", D = C + "set", E = navigator.userAgent, F = /rident/.test(E) || /ecko/.test(E) && E.match(/rv\:(\d+)/) && RegExp.$1 > 35, G = "currentSrc", H = /\s+\+?\d+(e\d+)?w/, I = /(\([^)]+\))?\s*(.+)/, J = a.picturefillCFG, K = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", L = "font-size:100%!important;", M = !0, N = {}, O = {}, P = a.devicePixelRatio, Q = {
        px: 1,
        "in": 96
    }, R = b.createElement("a"), S = !1, T = /^[ \t\n\r\u000c]+/, U = /^[, \t\n\r\u000c]+/, V = /^[^ \t\n\r\u000c]+/, W = /[,]+$/, X = /^\d+$/, Y = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, Z = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, $ = function (a) {
        var b = {};
        return function (c) {
            return c in b || (b[c] = a(c)), b[c]
        }
    }, _ = function () {
        var a = /^([\d\.]+)(em|vw|px)$/, b = function () {
            for (var a = arguments, b = 0, c = a[0]; ++b in a;)c = c.replace(a[b], a[++b]);
            return c
        }, c = $(function (a) {
            return "return " + b((a || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
        });
        return function (b, d) {
            var e;
            if (!(b in N))if (N[b] = !1, d && (e = b.match(a))) N[b] = e[1] * Q[e[2]]; else try {
                N[b] = new Function("e", c(b))(Q)
            } catch (f) {
            }
            return N[b]
        }
    }(), aa = function (a, b) {
        return a.w ? (a.cWidth = s.calcListLength(b || "100vw"), a.res = a.w / a.cWidth) : a.res = a.d, a
    }, ba = function (a) {
        if (t) {
            var c, d, e, f = a || {};
            if (f.elements && 1 === f.elements.nodeType && ("IMG" === f.elements.nodeName.toUpperCase() ? f.elements = [f.elements] : (f.context = f.elements, f.elements = null)), c = f.elements || s.qsa(f.context || b, f.reevaluate || f.reselect ? s.sel : s.selShort), e = c.length) {
                for (s.setupRun(f), S = !0, d = 0; e > d; d++)s.fillImg(c[d], f);
                s.teardownRun(f)
            }
        }
    };
    o = a.console && console.warn ? function (a) {
            console.warn(a)
        } : u, G in v || (G = "src"), A["image/jpeg"] = !0, A["image/gif"] = !0, A["image/png"] = !0, A["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), s.ns = ("pf" + (new Date).getTime()).substr(0, 9), s.supSrcset = "srcset" in v, s.supSizes = "sizes" in v, s.supPicture = !!a.HTMLPictureElement, s.supSrcset && s.supPicture && !s.supSizes && !function (a) {
        v.srcset = "data:,a", a.src = "data:,a", s.supSrcset = v.complete === a.complete, s.supPicture = s.supSrcset && s.supPicture
    }(b.createElement("img")), s.supSrcset && !s.supSizes ? !function () {
            var a = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==", c = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", d = b.createElement("img"), e = function () {
                var a = d.width;
                2 === a && (s.supSizes = !0), q = s.supSrcset && !s.supSizes, t = !0, setTimeout(ba)
            };
            d.onload = e, d.onerror = e, d.setAttribute("sizes", "9px"), d.srcset = c + " 1w," + a + " 9w", d.src = c
        }() : t = !0, s.selShort = "picture>img,img[srcset]", s.sel = s.selShort, s.cfg = B, s.DPR = P || 1, s.u = Q, s.types = A, s.setSize = u, s.makeUrl = $(function (a) {
        return R.href = a, R.href
    }), s.qsa = function (a, b) {
        return "querySelector" in a ? a.querySelectorAll(b) : []
    }, s.matchesMedia = function () {
        return a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? s.matchesMedia = function (a) {
                return !a || matchMedia(a).matches
            } : s.matchesMedia = s.mMQ, s.matchesMedia.apply(this, arguments)
    }, s.mMQ = function (a) {
        return a ? _(a) : !0
    }, s.calcLength = function (a) {
        var b = _(a, !0) || !1;
        return 0 > b && (b = !1), b
    }, s.supportsType = function (a) {
        return a ? A[a] : !0
    }, s.parseSize = $(function (a) {
        var b = (a || "").match(I);
        return {media: b && b[1], length: b && b[2]}
    }), s.parseSet = function (a) {
        return a.cands || (a.cands = m(a.srcset, a)), a.cands
    }, s.getEmValue = function () {
        var a;
        if (!p && (a = b.body)) {
            var c = b.createElement("div"), d = z.style.cssText, e = a.style.cssText;
            c.style.cssText = K, z.style.cssText = L, a.style.cssText = L, a.appendChild(c), p = c.offsetWidth, a.removeChild(c), p = parseFloat(p, 10), z.style.cssText = d, a.style.cssText = e
        }
        return p || 16
    }, s.calcListLength = function (a) {
        if (!(a in O) || B.uT) {
            var b = s.calcLength(n(a));
            O[a] = b ? b : Q.width
        }
        return O[a]
    }, s.setRes = function (a) {
        var b;
        if (a) {
            b = s.parseSet(a);
            for (var c = 0, d = b.length; d > c; c++)aa(b[c], a.sizes)
        }
        return b
    }, s.setRes.res = aa, s.applySetCandidate = function (a, b) {
        if (a.length) {
            var c, d, e, f, h, k, l, m, n, o = b[s.ns], p = s.DPR;
            if (k = o.curSrc || b[G], l = o.curCan || j(b, k, a[0].set), l && l.set === a[0].set && (n = F && !b.complete && l.res - .1 > p, n || (l.cached = !0, l.res >= p && (h = l))), !h)for (a.sort(i), f = a.length, h = a[f - 1], d = 0; f > d; d++)if (c = a[d], c.res >= p) {
                e = d - 1, h = a[e] && (n || k !== s.makeUrl(c.url)) && g(a[e].res, c.res, p, a[e].cached) ? a[e] : c;
                break
            }
            h && (m = s.makeUrl(h.url), o.curSrc = m, o.curCan = h, m !== k && s.setSrc(b, h), s.setSize(b))
        }
    }, s.setSrc = function (a, b) {
        var c;
        a.src = b.url, "image/svg+xml" === b.set.type && (c = a.style.width, a.style.width = a.offsetWidth + 1 + "px", a.offsetWidth + 1 && (a.style.width = c))
    }, s.getSet = function (a) {
        var b, c, d, e = !1, f = a[s.ns].sets;
        for (b = 0; b < f.length && !e; b++)if (c = f[b], c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type))) {
            "pending" === d && (c = d), e = c;
            break
        }
        return e
    }, s.parseSets = function (a, b, d) {
        var e, f, g, h, i = b && "PICTURE" === b.nodeName.toUpperCase(), j = a[s.ns];
        (j.src === c || d.src) && (j.src = w.call(a, "src"), j.src ? x.call(a, C, j.src) : y.call(a, C)), (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) && (e = w.call(a, "srcset"), j.srcset = e, h = !0), j.sets = [], i && (j.pic = !0, l(b, j.sets)), j.srcset ? (f = {
                srcset: j.srcset,
                sizes: w.call(a, "sizes")
            }, j.sets.push(f), g = (q || j.src) && H.test(j.srcset || ""), g || !j.src || k(j.src, f) || f.has1x || (f.srcset += ", " + j.src, f.cands.push({
                url: j.src,
                d: 1,
                set: f
            }))) : j.src && j.sets.push({
                srcset: j.src,
                sizes: null
            }), j.curCan = null, j.curSrc = c, j.supported = !(i || f && !s.supSrcset || g && !s.supSizes), h && s.supSrcset && !j.supported && (e ? (x.call(a, D, e), a.srcset = "") : y.call(a, D)), j.supported && !j.srcset && (!j.src && a.src || a.src !== s.makeUrl(j.src)) && (null === j.src ? a.removeAttribute("src") : a.src = j.src), j.parsed = !0
    }, s.fillImg = function (a, b) {
        var c, d = b.reselect || b.reevaluate;
        a[s.ns] || (a[s.ns] = {}), c = a[s.ns], (d || c.evaled !== r) && ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b), c.supported ? c.evaled = r : h(a))
    }, s.setupRun = function () {
        (!S || M || P !== a.devicePixelRatio) && f()
    }, s.supPicture ? (ba = u, s.fillImg = u) : !function () {
            var c, d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/, e = function () {
                var a = b.readyState || "";
                f = setTimeout(e, "loading" === a ? 200 : 999), b.body && (s.fillImgs(), c = c || d.test(a), c && clearTimeout(f))
            }, f = setTimeout(e, b.body ? 9 : 99), g = function (a, b) {
                var c, d, e = function () {
                    var f = new Date - d;
                    b > f ? c = setTimeout(e, b - f) : (c = null, a())
                };
                return function () {
                    d = new Date, c || (c = setTimeout(e, b))
                }
            }, h = z.clientHeight, i = function () {
                M = Math.max(a.innerWidth || 0, z.clientWidth) !== Q.width || z.clientHeight !== h, h = z.clientHeight, M && s.fillImgs()
            };
            Z(a, "resize", g(i, 99)), Z(b, "readystatechange", e)
        }(), s.picturefill = ba, s.fillImgs = ba, s.teardownRun = u, ba._ = s, a.picturefillCFG = {
        pf: s,
        push: function (a) {
            var b = a.shift();
            "function" == typeof s[b] ? s[b].apply(s, a) : (B[b] = a[0], S && s.fillImgs({reselect: !0}))
        }
    };
    for (; J && J.length;)a.picturefillCFG.push(J.shift());
    a.picturefill = ba, "object" == typeof module && "object" == typeof module.exports ? module.exports = ba : "function" == typeof define && define.amd && define("picturefill", function () {
            return ba
        }), s.supPicture || (A["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
}(window, document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBNYWluIGpzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gTGliXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIWZ1bmN0aW9uIChhLCBiKSB7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGEuc3ZnNGV2ZXJ5Ym9keSA9IGIoKVxuICAgICAgICB9KSA6IFwib2JqZWN0XCIgPT0gdHlwZW9mIGV4cG9ydHMgPyBtb2R1bGUuZXhwb3J0cyA9IGIoKSA6IGEuc3ZnNGV2ZXJ5Ym9keSA9IGIoKVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7LyohIHN2ZzRldmVyeWJvZHkgdjIuMC4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgKi9cbiAgICBmdW5jdGlvbiBhKGEsIGIpIHtcbiAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgIHZhciBjID0gIWEuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKSAmJiBiLmdldEF0dHJpYnV0ZShcInZpZXdCb3hcIiksIGQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIGUgPSBiLmNsb25lTm9kZSghMCk7XG4gICAgICAgICAgICBmb3IgKGMgJiYgYS5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIGMpOyBlLmNoaWxkTm9kZXMubGVuZ3RoOylkLmFwcGVuZENoaWxkKGUuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICBhLmFwcGVuZENoaWxkKGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiKGIpIHtcbiAgICAgICAgYi5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoNCA9PT0gYi5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwieFwiKTtcbiAgICAgICAgICAgICAgICBjLmlubmVySFRNTCA9IGIucmVzcG9uc2VUZXh0LCBiLnMuc3BsaWNlKDApLm1hcChmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgICAgICAgICBhKGJbMF0sIGMucXVlcnlTZWxlY3RvcihcIiNcIiArIGJbMV0ucmVwbGFjZSgvKFxcVykvZywgXCJcXFxcJDFcIikpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGIub25yZWFkeXN0YXRlY2hhbmdlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjKGMpIHtcbiAgICAgICAgZnVuY3Rpb24gZCgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGM7IGMgPSBlWzBdOykge1xuICAgICAgICAgICAgICAgIHZhciBqID0gYy5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIGlmIChqICYmIC9zdmcvaS50ZXN0KGoubm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrID0gYy5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZiAmJiAoIWcgfHwgZyhrLCBqLCBjKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gay5zcGxpdChcIiNcIiksIG0gPSBsWzBdLCBuID0gbFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqLnJlbW92ZUNoaWxkKGMpLCBtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gaVttXSA9IGlbbV0gfHwgbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucyB8fCAoby5zID0gW10sIG8ub3BlbihcIkdFVFwiLCBtKSwgby5zZW5kKCkpLCBvLnMucHVzaChbaiwgbl0pLCBiKG8pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgYShqLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGgoZCwgMTcpXG4gICAgICAgIH1cblxuICAgICAgICBjID0gYyB8fCB7fTtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKSwgZiA9IFwic2hpbVwiIGluIGMgPyBjLnNoaW0gOiAvXFxiRWRnZVxcLzEyXFxifFxcYlRyaWRlbnRcXC9bNTY3XVxcYnxcXGJWZXJzaW9uXFwvNy4wIFNhZmFyaVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKykvKSB8fCBbXSlbMV0gPCA1MzcsIGcgPSBjLnZhbGlkYXRlLCBoID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0LCBpID0ge307XG4gICAgICAgIGYgJiYgZCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIGNcbn0pO1xuXG5cbi8vIFBsdWdpbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gUG9seWZpbGxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiFmdW5jdGlvbiAoRUxFTUVOVCkge1xuICAgIEVMRU1FTlQubWF0Y2hlcyA9IEVMRU1FTlQubWF0Y2hlcyB8fCBFTEVNRU5ULm1vek1hdGNoZXNTZWxlY3RvciB8fCBFTEVNRU5ULm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVMRU1FTlQub01hdGNoZXNTZWxlY3RvciB8fCBFTEVNRU5ULndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGVsZW1lbnQgPSB0aGlzLCBlbGVtZW50cyA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIGluZGV4ID0gMDsgZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudDspKytpbmRleDtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50c1tpbmRleF0gPyAhMCA6ICExXG4gICAgICAgIH0sIEVMRU1FTlQuY2xvc2VzdCA9IEVMRU1FTlQuY2xvc2VzdCB8fCBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGVsZW1lbnQgPSB0aGlzOyBlbGVtZW50ICYmICFlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpOyllbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICAgICAgfVxufShFbGVtZW50LnByb3RvdHlwZSksIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiB3aW5kb3cuZ2V0TWF0Y2hlZENTU1J1bGVzKSB7XG4gICAgICAgIHZhciBFTEVNRU5UX1JFID0gL1tcXHctXSsvZywgSURfUkUgPSAvI1tcXHctXSsvZywgQ0xBU1NfUkUgPSAvXFwuW1xcdy1dKy9nLCBBVFRSX1JFID0gL1xcW1teXFxdXStcXF0vZywgUFNFVURPX0NMQVNTRVNfUkUgPSAvXFw6KD8hbm90KVtcXHctXSsoXFwoLipcXCkpPy9nLCBQU0VVRE9fRUxFTUVOVFNfUkUgPSAvXFw6XFw6PyhhZnRlcnxiZWZvcmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWxpbmV8c2VsZWN0aW9uKS9nLCB0b0FycmF5ID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW1zID0gW10sIGkgPSAwLCBsaXN0TGVuZ3RoID0gbGlzdC5sZW5ndGg7IGxpc3RMZW5ndGggPiBpOyBpKyspaXRlbXMucHVzaChsaXN0W2ldKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtc1xuICAgICAgICB9LCBnZXRDU1NIb3N0ID0gZnVuY3Rpb24gKGhyZWYpIHtcbiAgICAgICAgICAgIHZhciBmYWtlTGlua09mU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWtlTGlua09mU2hlZXQuaHJlZiA9IGhyZWYsIGZha2VMaW5rT2ZTaGVldC5ob3N0XG4gICAgICAgIH0sIGdldFNoZWV0UnVsZXMgPSBmdW5jdGlvbiAoc3R5bGVzaGVldCkge1xuICAgICAgICAgICAgdmFyIHNoZWV0SG9zdCwgc2hlZXRNZWRpYSA9IHN0eWxlc2hlZXQubWVkaWEgJiYgc3R5bGVzaGVldC5tZWRpYS5tZWRpYVRleHQ7XG4gICAgICAgICAgICBpZiAoXCJ0cnVlXCIgPT0gb2JqZWN0Rml0LmRpc2FibGVDcm9zc0RvbWFpbiAmJiAoc2hlZXRIb3N0ID0gZ2V0Q1NTSG9zdChzdHlsZXNoZWV0LmhyZWYpLCBzaGVldEhvc3QgIT09IHdpbmRvdy5sb2NhdGlvbi5ob3N0KSlyZXR1cm4gW107XG4gICAgICAgICAgICBpZiAoc3R5bGVzaGVldC5kaXNhYmxlZClyZXR1cm4gW107XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hlZXRNZWRpYSAmJiBzaGVldE1lZGlhLmxlbmd0aCAmJiAhd2luZG93Lm1hdGNoTWVkaWEoc2hlZXRNZWRpYSkubWF0Y2hlcylyZXR1cm4gW11cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXRNZWRpYSAmJiBzaGVldE1lZGlhLmxlbmd0aClyZXR1cm4gW107XG4gICAgICAgICAgICByZXR1cm4gdG9BcnJheShzdHlsZXNoZWV0LmNzc1J1bGVzKVxuICAgICAgICB9LCBfZmluZCA9IGZ1bmN0aW9uIChzdHJpbmcsIHJlKSB7XG4gICAgICAgICAgICBzdHJpbmcubWF0Y2gocmUpO1xuICAgICAgICAgICAgcmV0dXJuIHJlID8gcmUubGVuZ3RoIDogMFxuICAgICAgICB9LCBjYWxjdWxhdGVTY29yZSA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgZm9yICh2YXIgcGFydCwgbWF0Y2gsIHNjb3JlID0gWzAsIDAsIDBdLCBwYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KFwiIFwiKTsgcGFydCA9IHBhcnRzLnNoaWZ0KCksIFwic3RyaW5nXCIgPT0gdHlwZW9mIHBhcnQ7KW1hdGNoID0gX2ZpbmQocGFydCwgUFNFVURPX0VMRU1FTlRTX1JFKSwgc2NvcmVbMl0gPSBtYXRjaCwgbWF0Y2ggJiYgKHBhcnQgPSBwYXJ0LnJlcGxhY2UoUFNFVURPX0VMRU1FTlRTX1JFLCBcIlwiKSksIG1hdGNoID0gX2ZpbmQocGFydCwgUFNFVURPX0NMQVNTRVNfUkUpLCBzY29yZVsxXSA9IG1hdGNoLCBtYXRjaCAmJiAocGFydCA9IHBhcnQucmVwbGFjZShQU0VVRE9fQ0xBU1NFU19SRSwgXCJcIikpLCBtYXRjaCA9IF9maW5kKHBhcnQsIEFUVFJfUkUpLCBzY29yZVsxXSArPSBtYXRjaCwgbWF0Y2ggJiYgKHBhcnQgPSBwYXJ0LnJlcGxhY2UoQVRUUl9SRSwgXCJcIikpLCBtYXRjaCA9IF9maW5kKHBhcnQsIElEX1JFKSwgc2NvcmVbMF0gPSBtYXRjaCwgbWF0Y2ggJiYgKHBhcnQgPSBwYXJ0LnJlcGxhY2UoSURfUkUsIFwiXCIpKSwgbWF0Y2ggPSBfZmluZChwYXJ0LCBDTEFTU19SRSksIHNjb3JlWzFdICs9IG1hdGNoLCBtYXRjaCAmJiAocGFydCA9IHBhcnQucmVwbGFjZShDTEFTU19SRSwgXCJcIikpLCBzY29yZVsyXSArPSBfZmluZChwYXJ0LCBFTEVNRU5UX1JFKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChzY29yZS5qb2luKFwiXCIpLCAxMClcbiAgICAgICAgfSwgZ2V0U3BlY2lmaWNpdHlTY29yZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3RvclRleHQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHNlbGVjdG9yLCBzY29yZSwgc2VsZWN0b3JzID0gc2VsZWN0b3JUZXh0LnNwbGl0KFwiLFwiKSwgcmVzdWx0ID0gMDsgc2VsZWN0b3IgPSBzZWxlY3RvcnMuc2hpZnQoKTspZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yKSAmJiAoc2NvcmUgPSBjYWxjdWxhdGVTY29yZShzZWxlY3RvciksIHJlc3VsdCA9IHNjb3JlID4gcmVzdWx0ID8gc2NvcmUgOiByZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9LCBzb3J0QnlTcGVjaWZpY2l0eSA9IGZ1bmN0aW9uIChlbGVtZW50LCBydWxlcykge1xuICAgICAgICAgICAgdmFyIGNvbXBhcmVTcGVjaWZpY2l0eSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFNwZWNpZmljaXR5U2NvcmUoZWxlbWVudCwgYi5zZWxlY3RvclRleHQpIC0gZ2V0U3BlY2lmaWNpdHlTY29yZShlbGVtZW50LCBhLnNlbGVjdG9yVGV4dClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcnVsZXMuc29ydChjb21wYXJlU3BlY2lmaWNpdHkpXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5nZXRNYXRjaGVkQ1NTUnVsZXMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlU2hlZXRzLCBzaGVldCwgcnVsZXMsIHJ1bGUsIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChzdHlsZVNoZWV0cyA9IHRvQXJyYXkod2luZG93LmRvY3VtZW50LnN0eWxlU2hlZXRzKTsgc2hlZXQgPSBzdHlsZVNoZWV0cy5zaGlmdCgpOylmb3IgKHJ1bGVzID0gZ2V0U2hlZXRSdWxlcyhzaGVldCk7IHJ1bGUgPSBydWxlcy5zaGlmdCgpOylydWxlLnN0eWxlU2hlZXQgPyBydWxlcyA9IGdldFNoZWV0UnVsZXMocnVsZS5zdHlsZVNoZWV0KS5jb25jYXQocnVsZXMpIDogcnVsZS5tZWRpYSA/IHJ1bGVzID0gZ2V0U2hlZXRSdWxlcyhydWxlKS5jb25jYXQocnVsZXMpIDogZWxlbWVudC5jbG9zZXN0KHJ1bGUuc2VsZWN0b3JUZXh0KSAmJiByZXN1bHQucHVzaChydWxlKTtcbiAgICAgICAgICAgIHJldHVybiBzb3J0QnlTcGVjaWZpY2l0eShlbGVtZW50LCByZXN1bHQpXG4gICAgICAgIH1cbiAgICB9XG59KCksIGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICBmb3IgKHZhciBsYXN0VGltZSA9IDAsIHZlbmRvcnMgPSBbXCJ3ZWJraXRcIiwgXCJtb3pcIl0sIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLCBpID0gdmVuZG9ycy5sZW5ndGg7IC0taSA+PSAwICYmICFyZXF1ZXN0QW5pbWF0aW9uRnJhbWU7KXJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW2ldICsgXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl0sIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbaV0gKyBcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiBjYW5jZWxBbmltYXRpb25GcmFtZSB8fCAocmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBub3cgPSArbmV3IERhdGUsIG5leHRUaW1lID0gTWF0aC5tYXgobGFzdFRpbWUgKyAxNiwgbm93KTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2sobGFzdFRpbWUgPSBuZXh0VGltZSlcbiAgICAgICAgfSwgbmV4dFRpbWUgLSBub3cpXG4gICAgfSwgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjbGVhclRpbWVvdXQpLCB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZVxufSh3aW5kb3cpLCBmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG9iamVjdEZpdCA9IHt9O1xuICAgIG9iamVjdEZpdC5fZGVidWcgPSAhMSwgb2JqZWN0Rml0Lm9ic2VydmVyID0gbnVsbCwgb2JqZWN0Rml0LmRpc2FibGVDcm9zc0RvbWFpbiA9IFwiZmFsc2VcIiwgb2JqZWN0Rml0LmdldENvbXB1dGVkU3R5bGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gY29udGV4dCA9IGNvbnRleHQgfHwgd2luZG93LCBjb250ZXh0LmdldENvbXB1dGVkU3R5bGUgPyBjb250ZXh0LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkgOiBlbGVtZW50LmN1cnJlbnRTdHlsZVxuICAgIH0sIG9iamVjdEZpdC5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBuZXdlbGVtZW50ID0gZWxlbWVudC5jbG9uZU5vZGUoITApLCBzdHlsZXMgPSB7fSwgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpLCBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5vcGVuKCksIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LndyaXRlKFwiPGJvZHk+PC9ib2R5PlwiKSwgaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuZXdlbGVtZW50KSwgaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuY2xvc2UoKTtcbiAgICAgICAgdmFyIHZhbHVlLCBwcm9wZXJ0eSwgZGVmYXVsdEVsZW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlbMF0sIGRlZmF1bHRDb21wdXRlZFN0eWxlID0gdGhpcy5nZXRDb21wdXRlZFN0eWxlKGRlZmF1bHRFbGVtZW50LCBpZnJhbWUuY29udGVudFdpbmRvdyk7XG4gICAgICAgIGZvciAocHJvcGVydHkgaW4gZGVmYXVsdENvbXB1dGVkU3R5bGUpaWYgKHZhbHVlID0gZGVmYXVsdENvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSA9PT0gITAgPyBkZWZhdWx0Q29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSA6IGRlZmF1bHRDb21wdXRlZFN0eWxlW3Byb3BlcnR5XSwgbnVsbCAhPT0gdmFsdWUpc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzdHlsZXNbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlXCJ3aWR0aFwiOlxuICAgICAgICAgICAgY2FzZVwiaGVpZ2h0XCI6XG4gICAgICAgICAgICBjYXNlXCJtaW5XaWR0aFwiOlxuICAgICAgICAgICAgY2FzZVwibWluSGVpZ2h0XCI6XG4gICAgICAgICAgICBjYXNlXCJtYXhXaWR0aFwiOlxuICAgICAgICAgICAgY2FzZVwibWF4SGVpZ2h0XCI6XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKSwgc3R5bGVzXG4gICAgfSwgb2JqZWN0Rml0LmdldE1hdGNoZWRTdHlsZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgdmFsID0gbnVsbCwgaW5saW5ldmFsID0gbnVsbDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlID8gaW5saW5ldmFsID0gZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSA6IGVsZW1lbnQuY3VycmVudFN0eWxlICYmIChpbmxpbmV2YWwgPSBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wZXJ0eV0pO1xuICAgICAgICB2YXIgciwgaW1wb3J0YW50LCBydWxlcyA9IHdpbmRvdy5nZXRNYXRjaGVkQ1NTUnVsZXMoZWxlbWVudCksIGkgPSBydWxlcy5sZW5ndGg7XG4gICAgICAgIGlmIChpKWZvciAoOyBpLS0gPiAwICYmIChyID0gcnVsZXNbaV0sIGltcG9ydGFudCA9IHIuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eShwcm9wZXJ0eSksIG51bGwgIT09IHZhbCAmJiAhaW1wb3J0YW50IHx8ICh2YWwgPSByLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpLCAhaW1wb3J0YW50KSk7KTtcbiAgICAgICAgcmV0dXJuIHZhbCB8fCBudWxsID09PSBpbmxpbmV2YWwgfHwgKHZhbCA9IGlubGluZXZhbCksIHZhbFxuICAgIH0sIG9iamVjdEZpdC5vcmllbnRhdGlvbiA9IGZ1bmN0aW9uIChyZXBsYWNlZEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHJlcGxhY2VkRWxlbWVudC5wYXJlbnROb2RlICYmIFwieC1vYmplY3QtZml0XCIgPT09IHJlcGxhY2VkRWxlbWVudC5wYXJlbnROb2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlcGxhY2VkRWxlbWVudC5uYXR1cmFsV2lkdGggfHwgcmVwbGFjZWRFbGVtZW50LmNsaWVudFdpZHRoLCBoZWlnaHQgPSByZXBsYWNlZEVsZW1lbnQubmF0dXJhbEhlaWdodCB8fCByZXBsYWNlZEVsZW1lbnQuY2xpZW50SGVpZ2h0LCBwYXJlbnRXaWR0aCA9IHJlcGxhY2VkRWxlbWVudC5wYXJlbnROb2RlLmNsaWVudFdpZHRoLCBwYXJlbnRIZWlnaHQgPSByZXBsYWNlZEVsZW1lbnQucGFyZW50Tm9kZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICAhaGVpZ2h0IHx8IHdpZHRoIC8gaGVpZ2h0ID4gcGFyZW50V2lkdGggLyBwYXJlbnRIZWlnaHQgPyBcIndpZGVyXCIgIT09IHJlcGxhY2VkRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXgtb2JqZWN0LXJlbGF0aW9uXCIpICYmIChyZXBsYWNlZEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS14LW9iamVjdC1yZWxhdGlvblwiLCBcIndpZGVyXCIpLCByZXBsYWNlZEVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIHgtb2JqZWN0LWZpdC13aWRlclwiLCB0aGlzLl9kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmxvZyhcIngtb2JqZWN0LWZpdC13aWRlclwiKSkgOiBcInRhbGxlclwiICE9PSByZXBsYWNlZEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS14LW9iamVjdC1yZWxhdGlvblwiKSAmJiAocmVwbGFjZWRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEteC1vYmplY3QtcmVsYXRpb25cIiwgXCJ0YWxsZXJcIiksIHJlcGxhY2VkRWxlbWVudC5jbGFzc05hbWUgKz0gXCIgeC1vYmplY3QtZml0LXRhbGxlclwiLCB0aGlzLl9kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmxvZyhcIngtb2JqZWN0LWZpdC10YWxsZXJcIikpXG4gICAgICAgIH1cbiAgICB9LCBvYmplY3RGaXQucHJvY2VzcyA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLnNlbGVjdG9yICYmIGFyZ3MucmVwbGFjZWRFbGVtZW50cykge1xuICAgICAgICAgICAgc3dpdGNoIChvYmplY3RGaXQuZGlzYWJsZUNyb3NzRG9tYWluID0gYXJncy5kaXNhYmxlQ3Jvc3NEb21haW4gfHwgXCJmYWxzZVwiLCBhcmdzLmZpdHR5cGUgPSBhcmdzLmZpdHR5cGUgfHwgXCJub25lXCIsIGFyZ3MuZml0dHlwZSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlXCJub25lXCI6XG4gICAgICAgICAgICAgICAgY2FzZVwiZmlsbFwiOlxuICAgICAgICAgICAgICAgIGNhc2VcImNvbnRhaW5cIjpcbiAgICAgICAgICAgICAgICBjYXNlXCJjb3ZlclwiOlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcGxhY2VkRWxlbWVudHMgPSBhcmdzLnJlcGxhY2VkRWxlbWVudHM7XG4gICAgICAgICAgICBpZiAocmVwbGFjZWRFbGVtZW50cy5sZW5ndGgpZm9yICh2YXIgaSA9IDAsIHJlcGxhY2VkRWxlbWVudHNMZW5ndGggPSByZXBsYWNlZEVsZW1lbnRzLmxlbmd0aDsgcmVwbGFjZWRFbGVtZW50c0xlbmd0aCA+IGk7IGkrKyl0aGlzLnByb2Nlc3NFbGVtZW50KHJlcGxhY2VkRWxlbWVudHNbaV0sIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9LCBvYmplY3RGaXQucHJvY2Vzc0VsZW1lbnQgPSBmdW5jdGlvbiAocmVwbGFjZWRFbGVtZW50LCBhcmdzKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eSwgdmFsdWUsIHJlcGxhY2VkRWxlbWVudFN0eWxlcyA9IG9iamVjdEZpdC5nZXRDb21wdXRlZFN0eWxlKHJlcGxhY2VkRWxlbWVudCksIHJlcGxhY2VkRWxlbWVudERlZmF1bHRTdHlsZXMgPSBvYmplY3RGaXQuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUocmVwbGFjZWRFbGVtZW50KSwgd3JhcHBlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwieC1vYmplY3QtZml0XCIpO1xuICAgICAgICBvYmplY3RGaXQuX2RlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUubG9nKFwiQXBwbHlpbmcgdG8gV1JBUFBFUi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgIGZvciAocHJvcGVydHkgaW4gcmVwbGFjZWRFbGVtZW50U3R5bGVzKXN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvYmplY3RGaXQuZ2V0TWF0Y2hlZFN0eWxlKHJlcGxhY2VkRWxlbWVudCwgcHJvcGVydHkpLCBudWxsICE9PSB2YWx1ZSAmJiBcIlwiICE9PSB2YWx1ZSAmJiAob2JqZWN0Rml0Ll9kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmxvZyhwcm9wZXJ0eSArIFwiOiBcIiArIHZhbHVlKSwgd3JhcHBlckVsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZVwibGVuZ3RoXCI6XG4gICAgICAgICAgICBjYXNlXCJwYXJlbnRSdWxlXCI6XG4gICAgICAgIH1cbiAgICAgICAgb2JqZWN0Rml0Ll9kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmxvZyhcIkFwcGx5aW5nIHRvIFJFUExBQ0VEIEVMRU1FTlQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICBmb3IgKHByb3BlcnR5IGluIHJlcGxhY2VkRWxlbWVudERlZmF1bHRTdHlsZXMpc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlcGxhY2VkRWxlbWVudERlZmF1bHRTdHlsZXNbcHJvcGVydHldLCBvYmplY3RGaXQuX2RlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIFwiXCIgIT09IHZhbHVlICYmIChjb25zb2xlLmxvZyhwcm9wZXJ0eSArIFwiOiBcIiArIHZhbHVlKSwgdm9pZCAwID09PSByZXBsYWNlZEVsZW1lbnQuc3R5bGVbcHJvcGVydHldICYmIGNvbnNvbGUubG9nKFwiSW5kZXhlZCBzdHlsZSBwcm9wZXJ0aWVzIChgXCIgKyBwcm9wZXJ0eSArIFwiYCkgbm90IHN1cHBvcnRlZCBpbjogXCIgKyB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkpLCByZXBsYWNlZEVsZW1lbnQuc3R5bGVbcHJvcGVydHldID8gcmVwbGFjZWRFbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlIDogcmVwbGFjZWRFbGVtZW50LnN0eWxlLnByb3BlcnR5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlXCJsZW5ndGhcIjpcbiAgICAgICAgICAgIGNhc2VcInBhcmVudFJ1bGVcIjpcbiAgICAgICAgfVxuICAgICAgICB3cmFwcGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIngtb2JqZWN0LWZpdC1cIiArIGFyZ3MuZml0dHlwZSksIHJlcGxhY2VkRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyRWxlbWVudCwgcmVwbGFjZWRFbGVtZW50KSwgd3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQocmVwbGFjZWRFbGVtZW50KSwgb2JqZWN0Rml0Lm9yaWVudGF0aW9uKHJlcGxhY2VkRWxlbWVudCk7XG4gICAgICAgIHZhciByZXNpemVUaW1lciA9IG51bGwsIHJlc2l6ZUFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG51bGwgIT09IHJlc2l6ZVRpbWVyICYmIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXNpemVUaW1lciksIHJlc2l6ZVRpbWVyID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0Rml0Lm9yaWVudGF0aW9uKHJlcGxhY2VkRWxlbWVudClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAoYXJncy5maXR0eXBlKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZVwiY29udGFpblwiOlxuICAgICAgICAgICAgY2FzZVwiY292ZXJcIjpcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/IChyZXBsYWNlZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVzaXplQWN0aW9uLCAhMSksIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZUFjdGlvbiwgITEpLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIHJlc2l6ZUFjdGlvbiwgITEpKSA6IChyZXBsYWNlZEVsZW1lbnQuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgcmVzaXplQWN0aW9uKSwgd2luZG93LmF0dGFjaEV2ZW50KFwib25yZXNpemVcIiwgcmVzaXplQWN0aW9uKSlcbiAgICAgICAgfVxuICAgIH0sIG9iamVjdEZpdC5saXN0ZW4gPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICB2YXIgZG9tSW5zZXJ0ZWRBY3Rpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDsgYXJnc0xlbmd0aCA+IGk7IGkrKykoZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgJiYgZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IoYXJnc1tpXS5zZWxlY3RvcikgfHwgZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvciAmJiBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKGFyZ3NbaV0uc2VsZWN0b3IpIHx8IGVsZW1lbnQub01hdGNoZXNTZWxlY3RvciAmJiBlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IoYXJnc1tpXS5zZWxlY3RvcikgfHwgZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgJiYgZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IoYXJnc1tpXS5zZWxlY3RvcikpICYmIChhcmdzW2ldLnJlcGxhY2VkRWxlbWVudHMgPSBbZWxlbWVudF0sIG9iamVjdEZpdC5wcm9jZXNzKGFyZ3NbaV0pLCBvYmplY3RGaXQuX2RlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUubG9nKFwiTWF0Y2hpbmcgbm9kZSBpbnNlcnRlZDogXCIgKyBlbGVtZW50Lm5vZGVOYW1lKSlcbiAgICAgICAgfSwgZG9tSW5zZXJ0ZWRPYnNlcnZlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIG9iamVjdEZpdC5vYnNlcnZlci5kaXNjb25uZWN0KCksIGRvbUluc2VydGVkQWN0aW9uKGVsZW1lbnQpLCBvYmplY3RGaXQub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6ICEwLFxuICAgICAgICAgICAgICAgIHN1YnRyZWU6ICEwXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCBkb21JbnNlcnRlZEV2ZW50RnVuY3Rpb24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NTm9kZUluc2VydGVkXCIsIGRvbUluc2VydGVkRXZlbnRGdW5jdGlvbiwgITEpLCBkb21JbnNlcnRlZEFjdGlvbihldmVudC50YXJnZXQpLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU5vZGVJbnNlcnRlZFwiLCBkb21JbnNlcnRlZEV2ZW50RnVuY3Rpb24sICExKVxuICAgICAgICB9LCBkb21SZW1vdmVkQWN0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIFwieC1vYmplY3QtZml0XCIgPT09IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAmJiAoZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpLCBvYmplY3RGaXQuX2RlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUubG9nKFwiTWF0Y2hpbmcgbm9kZSByZW1vdmVkOiBcIiArIGVsZW1lbnQubm9kZU5hbWUpKVxuICAgICAgICB9LCBkb21SZW1vdmVkT2JzZXJ2ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBvYmplY3RGaXQub2JzZXJ2ZXIuZGlzY29ubmVjdCgpLCBkb21SZW1vdmVkQWN0aW9uKGVsZW1lbnQpLCBvYmplY3RGaXQub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6ICEwLFxuICAgICAgICAgICAgICAgIHN1YnRyZWU6ICEwXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCBkb21SZW1vdmVkRXZlbnRGdW5jdGlvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Ob2RlUmVtb3ZlZFwiLCBkb21SZW1vdmVkRXZlbnRGdW5jdGlvbiwgITEpLCBkb21SZW1vdmVkQWN0aW9uKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Ob2RlUmVtb3ZlZFwiLCBkb21SZW1vdmVkRXZlbnRGdW5jdGlvbiwgITEpXG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyID8gKG9iamVjdEZpdC5fZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJET00gTXV0YXRpb25PYnNlcnZlclwiKSwgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi5hZGRlZE5vZGVzICYmIG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoKWZvciAodmFyIG5vZGVzID0gbXV0YXRpb24uYWRkZWROb2RlcywgaSA9IDAsIG5vZGVzTGVuZ3RoID0gbm9kZXMubGVuZ3RoOyBub2Rlc0xlbmd0aCA+IGk7IGkrKylkb21JbnNlcnRlZE9ic2VydmVyRnVuY3Rpb24obm9kZXNbaV0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uLnJlbW92ZWROb2RlcyAmJiBtdXRhdGlvbi5yZW1vdmVkTm9kZXMubGVuZ3RoICYmIGRvbVJlbW92ZWRPYnNlcnZlckZ1bmN0aW9uKG11dGF0aW9uLnRhcmdldClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLCB0aGlzLm9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6ICEwLFxuICAgICAgICAgICAgc3VidHJlZTogITBcbiAgICAgICAgfSkpIDogd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJiYgKG9iamVjdEZpdC5fZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJET00gTXV0YXRpb24gRXZlbnRzXCIpLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU5vZGVJbnNlcnRlZFwiLCBkb21JbnNlcnRlZEV2ZW50RnVuY3Rpb24sICExKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Ob2RlUmVtb3ZlZFwiLCBkb21SZW1vdmVkRXZlbnRGdW5jdGlvbiwgITEpKVxuICAgIH0sIG9iamVjdEZpdC5pbml0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIGFyZ3MgaW5zdGFuY2VvZiBBcnJheSB8fCAoYXJncyA9IFthcmdzXSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoOyBhcmdzTGVuZ3RoID4gaTsgaSsrKWFyZ3NbaV0ucmVwbGFjZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYXJnc1tpXS5zZWxlY3RvciksIHRoaXMucHJvY2VzcyhhcmdzW2ldKTtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuKGFyZ3MpXG4gICAgICAgIH1cbiAgICB9LCBvYmplY3RGaXQucG9seWZpbGwgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICBcIm9iamVjdEZpdFwiIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9PSAhMSA/IChvYmplY3RGaXQuX2RlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUubG9nKFwib2JqZWN0LWZpdCBub3QgbmF0aXZlbHkgc3VwcG9ydGVkXCIpLCBcImNvbXBsZXRlXCIgPT09IGRvY3VtZW50LnJlYWR5U3RhdGUgPyBvYmplY3RGaXQuaW5pdChhcmdzKSA6IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9iamVjdEZpdC5pbml0KGFyZ3MpXG4gICAgICAgIH0sICExKSA6IHdpbmRvdy5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvYmplY3RGaXQuaW5pdChhcmdzKVxuICAgICAgICB9KSkgOiBvYmplY3RGaXQuX2RlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUubG9nKFwib2JqZWN0LWZpdCBuYXRpdmVseSBzdXBwb3J0ZWRcIilcbiAgICB9LCBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUgJiYgbW9kdWxlICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZS5leHBvcnRzID8gbW9kdWxlLmV4cG9ydHMgPSBvYmplY3RGaXQgOiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RGaXRcbiAgICB9KSA6IFwib2JqZWN0XCIgPT0gdHlwZW9mIGdsb2JhbCAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBnbG9iYWwuZG9jdW1lbnQgJiYgKGdsb2JhbC5vYmplY3RGaXQgPSBvYmplY3RGaXQpXG59KHdpbmRvdyk7XG4vKiEgcGljdHVyZWZpbGwgLSB2My4wLjIgLSAyMDE2LTAyLTEyXG4gKiBodHRwczovL3Njb3R0amVobC5naXRodWIuaW8vcGljdHVyZWZpbGwvXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0amVobC9waWN0dXJlZmlsbC9ibG9iL21hc3Rlci9BdXRob3JzLnR4dDsgTGljZW5zZWQgTUlUXG4gKi9cbiFmdW5jdGlvbiAoYSkge1xuICAgIHZhciBiID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBhLkhUTUxQaWN0dXJlRWxlbWVudCAmJiAvZWNrby8udGVzdChiKSAmJiBiLm1hdGNoKC9ydlxcOihcXGQrKS8pICYmIFJlZ0V4cC4kMSA8IDQ1ICYmIGFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYiwgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiksIGQgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgdmFyIGIsIGQsIGUgPSBhLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBcIlBJQ1RVUkVcIiA9PT0gZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID8gKGIgPSBjLmNsb25lTm9kZSgpLCBlLmluc2VydEJlZm9yZShiLCBlLmZpcnN0RWxlbWVudENoaWxkKSwgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmVtb3ZlQ2hpbGQoYilcbiAgICAgICAgICAgICAgICB9KSkgOiAoIWEuX3BmTGFzdFNpemUgfHwgYS5vZmZzZXRXaWR0aCA+IGEuX3BmTGFzdFNpemUpICYmIChhLl9wZkxhc3RTaXplID0gYS5vZmZzZXRXaWR0aCwgZCA9IGEuc2l6ZXMsIGEuc2l6ZXMgKz0gXCIsMTAwdndcIiwgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGEuc2l6ZXMgPSBkXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgIH0sIGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYSwgYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJwaWN0dXJlID4gaW1nLCBpbWdbc3Jjc2V0XVtzaXplc11cIik7XG4gICAgICAgICAgICBmb3IgKGEgPSAwOyBhIDwgYi5sZW5ndGg7IGErKylkKGJbYV0pXG4gICAgICAgIH0sIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoYiksIGIgPSBzZXRUaW1lb3V0KGUsIDk5KVxuICAgICAgICB9LCBnID0gYS5tYXRjaE1lZGlhICYmIG1hdGNoTWVkaWEoXCIob3JpZW50YXRpb246IGxhbmRzY2FwZSlcIiksIGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmKCksIGcgJiYgZy5hZGRMaXN0ZW5lciAmJiBnLmFkZExpc3RlbmVyKGYpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjLnNyY3NldCA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFBQUFBQ0g1QkFFS0FBRUFMQUFBQUFBQkFBRUFBQUlDVEFFQU93PT1cIiwgL15bY3xpXXxkJC8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlIHx8IFwiXCIpID8gaCgpIDogZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaCksIGZcbiAgICB9KCkpXG59KHdpbmRvdyksIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gZChhKSB7XG4gICAgICAgIHJldHVybiBcIiBcIiA9PT0gYSB8fCBcIlx0XCIgPT09IGEgfHwgXCJcXG5cIiA9PT0gYSB8fCBcIlxcZlwiID09PSBhIHx8IFwiXFxyXCIgPT09IGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlKGIsIGMpIHtcbiAgICAgICAgdmFyIGQgPSBuZXcgYS5JbWFnZTtcbiAgICAgICAgcmV0dXJuIGQub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEFbYl0gPSAhMSwgYmEoKVxuICAgICAgICB9LCBkLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEFbYl0gPSAxID09PSBkLndpZHRoLCBiYSgpXG4gICAgICAgIH0sIGQuc3JjID0gYywgXCJwZW5kaW5nXCJcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmKCkge1xuICAgICAgICBNID0gITEsIFAgPSBhLmRldmljZVBpeGVsUmF0aW8sIE4gPSB7fSwgTyA9IHt9LCBzLkRQUiA9IFAgfHwgMSwgUS53aWR0aCA9IE1hdGgubWF4KGEuaW5uZXJXaWR0aCB8fCAwLCB6LmNsaWVudFdpZHRoKSwgUS5oZWlnaHQgPSBNYXRoLm1heChhLmlubmVySGVpZ2h0IHx8IDAsIHouY2xpZW50SGVpZ2h0KSwgUS52dyA9IFEud2lkdGggLyAxMDAsIFEudmggPSBRLmhlaWdodCAvIDEwMCwgciA9IFtRLmhlaWdodCwgUS53aWR0aCwgUF0uam9pbihcIi1cIiksIFEuZW0gPSBzLmdldEVtVmFsdWUoKSwgUS5yZW0gPSBRLmVtXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZyhhLCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciBlLCBmLCBnLCBoO1xuICAgICAgICByZXR1cm4gXCJzYXZlRGF0YVwiID09PSBCLmFsZ29yaXRobSA/IGEgPiAyLjcgPyBoID0gYyArIDEgOiAoZiA9IGIgLSBjLCBlID0gTWF0aC5wb3coYSAtIC42LCAxLjUpLCBnID0gZiAqIGUsIGQgJiYgKGcgKz0gLjEgKiBlKSwgaCA9IGEgKyBnKSA6IGggPSBjID4gMSA/IE1hdGguc3FydChhICogYikgOiBhLCBoID4gY1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGgoYSkge1xuICAgICAgICB2YXIgYiwgYyA9IHMuZ2V0U2V0KGEpLCBkID0gITE7XG4gICAgICAgIFwicGVuZGluZ1wiICE9PSBjICYmIChkID0gciwgYyAmJiAoYiA9IHMuc2V0UmVzKGMpLCBzLmFwcGx5U2V0Q2FuZGlkYXRlKGIsIGEpKSksIGFbcy5uc10uZXZhbGVkID0gZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGkoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5yZXMgLSBiLnJlc1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGooYSwgYiwgYykge1xuICAgICAgICB2YXIgZDtcbiAgICAgICAgcmV0dXJuICFjICYmIGIgJiYgKGMgPSBhW3MubnNdLnNldHMsIGMgPSBjICYmIGNbYy5sZW5ndGggLSAxXSksIGQgPSBrKGIsIGMpLCBkICYmIChiID0gcy5tYWtlVXJsKGIpLCBhW3MubnNdLmN1clNyYyA9IGIsIGFbcy5uc10uY3VyQ2FuID0gZCwgZC5yZXMgfHwgYWEoZCwgZC5zZXQuc2l6ZXMpKSwgZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGsoYSwgYikge1xuICAgICAgICB2YXIgYywgZCwgZTtcbiAgICAgICAgaWYgKGEgJiYgYilmb3IgKGUgPSBzLnBhcnNlU2V0KGIpLCBhID0gcy5tYWtlVXJsKGEpLCBjID0gMDsgYyA8IGUubGVuZ3RoOyBjKyspaWYgKGEgPT09IHMubWFrZVVybChlW2NdLnVybCkpIHtcbiAgICAgICAgICAgIGQgPSBlW2NdO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGwoYSwgYikge1xuICAgICAgICB2YXIgYywgZCwgZSwgZiwgZyA9IGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzb3VyY2VcIik7XG4gICAgICAgIGZvciAoYyA9IDAsIGQgPSBnLmxlbmd0aDsgZCA+IGM7IGMrKyllID0gZ1tjXSwgZVtzLm5zXSA9ICEwLCBmID0gZS5nZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiksIGYgJiYgYi5wdXNoKHtcbiAgICAgICAgICAgIHNyY3NldDogZixcbiAgICAgICAgICAgIG1lZGlhOiBlLmdldEF0dHJpYnV0ZShcIm1lZGlhXCIpLFxuICAgICAgICAgICAgdHlwZTogZS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpLFxuICAgICAgICAgICAgc2l6ZXM6IGUuZ2V0QXR0cmlidXRlKFwic2l6ZXNcIilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtKGEsIGIpIHtcbiAgICAgICAgZnVuY3Rpb24gYyhiKSB7XG4gICAgICAgICAgICB2YXIgYywgZCA9IGIuZXhlYyhhLnN1YnN0cmluZyhtKSk7XG4gICAgICAgICAgICByZXR1cm4gZCA/IChjID0gZFswXSwgbSArPSBjLmxlbmd0aCwgYykgOiB2b2lkIDBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGUoKSB7XG4gICAgICAgICAgICB2YXIgYSwgYywgZCwgZSwgZiwgaSwgaiwgaywgbCwgbSA9ICExLCBvID0ge307XG4gICAgICAgICAgICBmb3IgKGUgPSAwOyBlIDwgaC5sZW5ndGg7IGUrKylmID0gaFtlXSwgaSA9IGZbZi5sZW5ndGggLSAxXSwgaiA9IGYuc3Vic3RyaW5nKDAsIGYubGVuZ3RoIC0gMSksIGsgPSBwYXJzZUludChqLCAxMCksIGwgPSBwYXJzZUZsb2F0KGopLCBYLnRlc3QoaikgJiYgXCJ3XCIgPT09IGkgPyAoKGEgfHwgYykgJiYgKG0gPSAhMCksIDAgPT09IGsgPyBtID0gITAgOiBhID0gaykgOiBZLnRlc3QoaikgJiYgXCJ4XCIgPT09IGkgPyAoKGEgfHwgYyB8fCBkKSAmJiAobSA9ICEwKSwgMCA+IGwgPyBtID0gITAgOiBjID0gbCkgOiBYLnRlc3QoaikgJiYgXCJoXCIgPT09IGkgPyAoKGQgfHwgYykgJiYgKG0gPSAhMCksIDAgPT09IGsgPyBtID0gITAgOiBkID0gaykgOiBtID0gITA7XG4gICAgICAgICAgICBtIHx8IChvLnVybCA9IGcsIGEgJiYgKG8udyA9IGEpLCBjICYmIChvLmQgPSBjKSwgZCAmJiAoby5oID0gZCksIGQgfHwgYyB8fCBhIHx8IChvLmQgPSAxKSwgMSA9PT0gby5kICYmIChiLmhhczF4ID0gITApLCBvLnNldCA9IGIsIG4ucHVzaChvKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGYoKSB7XG4gICAgICAgICAgICBmb3IgKGMoVCksIGkgPSBcIlwiLCBqID0gXCJpbiBkZXNjcmlwdG9yXCI7IDspIHtcbiAgICAgICAgICAgICAgICBpZiAoayA9IGEuY2hhckF0KG0pLCBcImluIGRlc2NyaXB0b3JcIiA9PT0gailpZiAoZChrKSkgaSAmJiAoaC5wdXNoKGkpLCBpID0gXCJcIiwgaiA9IFwiYWZ0ZXIgZGVzY3JpcHRvclwiKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIixcIiA9PT0gaylyZXR1cm4gbSArPSAxLCBpICYmIGgucHVzaChpKSwgdm9pZCBlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIihcIiA9PT0gaykgaSArPSBrLCBqID0gXCJpbiBwYXJlbnNcIjsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiA9PT0gaylyZXR1cm4gaSAmJiBoLnB1c2goaSksIHZvaWQgZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSBrXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFwiaW4gcGFyZW5zXCIgPT09IGopaWYgKFwiKVwiID09PSBrKSBpICs9IGssIGogPSBcImluIGRlc2NyaXB0b3JcIjsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIlwiID09PSBrKXJldHVybiBoLnB1c2goaSksIHZvaWQgZSgpO1xuICAgICAgICAgICAgICAgICAgICBpICs9IGtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFwiYWZ0ZXIgZGVzY3JpcHRvclwiID09PSBqKWlmIChkKGspKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIlwiID09PSBrKXJldHVybiB2b2lkIGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaiA9IFwiaW4gZGVzY3JpcHRvclwiLCBtIC09IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbSArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBnLCBoLCBpLCBqLCBrLCBsID0gYS5sZW5ndGgsIG0gPSAwLCBuID0gW107IDspIHtcbiAgICAgICAgICAgIGlmIChjKFUpLCBtID49IGwpcmV0dXJuIG47XG4gICAgICAgICAgICBnID0gYyhWKSwgaCA9IFtdLCBcIixcIiA9PT0gZy5zbGljZSgtMSkgPyAoZyA9IGcucmVwbGFjZShXLCBcIlwiKSwgZSgpKSA6IGYoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbihhKSB7XG4gICAgICAgIGZ1bmN0aW9uIGIoYSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gYigpIHtcbiAgICAgICAgICAgICAgICBmICYmIChnLnB1c2goZiksIGYgPSBcIlwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjKCkge1xuICAgICAgICAgICAgICAgIGdbMF0gJiYgKGgucHVzaChnKSwgZyA9IFtdKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBlLCBmID0gXCJcIiwgZyA9IFtdLCBoID0gW10sIGkgPSAwLCBqID0gMCwgayA9ICExOyA7KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUgPSBhLmNoYXJBdChqKSwgXCJcIiA9PT0gZSlyZXR1cm4gYigpLCBjKCksIGg7XG4gICAgICAgICAgICAgICAgaWYgKGspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiKlwiID09PSBlICYmIFwiL1wiID09PSBhW2ogKyAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgayA9ICExLCBqICs9IDIsIGIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaiArPSAxXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQoZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLmNoYXJBdChqIC0gMSkgJiYgZChhLmNoYXJBdChqIC0gMSkpIHx8ICFmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIoKSwgaiArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gXCIgXCJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcIihcIiA9PT0gZSkgaSArPSAxOyBlbHNlIGlmIChcIilcIiA9PT0gZSkgaSAtPSAxOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIixcIiA9PT0gZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIoKSwgYygpLCBqICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIi9cIiA9PT0gZSAmJiBcIipcIiA9PT0gYS5jaGFyQXQoaiArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9ICEwLCBqICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmICs9IGUsIGogKz0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGMoYSkge1xuICAgICAgICAgICAgcmV0dXJuIGsudGVzdChhKSAmJiBwYXJzZUZsb2F0KGEpID49IDAgPyAhMCA6IGwudGVzdChhKSA/ICEwIDogXCIwXCIgPT09IGEgfHwgXCItMFwiID09PSBhIHx8IFwiKzBcIiA9PT0gYSA/ICEwIDogITFcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlLCBmLCBnLCBoLCBpLCBqLCBrID0gL14oPzpbKy1dP1swLTldK3xbMC05XSpcXC5bMC05XSspKD86W2VFXVsrLV0/WzAtOV0rKT8oPzpjaHxjbXxlbXxleHxpbnxtbXxwY3xwdHxweHxyZW18dmh8dm1pbnx2bWF4fHZ3KSQvaSwgbCA9IC9eY2FsY1xcKCg/OlswLTlhLXogXFwuXFwrXFwtXFwqXFwvXFwoXFwpXSspXFwpJC9pO1xuICAgICAgICBmb3IgKGYgPSBiKGEpLCBnID0gZi5sZW5ndGgsIGUgPSAwOyBnID4gZTsgZSsrKWlmIChoID0gZltlXSwgaSA9IGhbaC5sZW5ndGggLSAxXSwgYyhpKSkge1xuICAgICAgICAgICAgaWYgKGogPSBpLCBoLnBvcCgpLCAwID09PSBoLmxlbmd0aClyZXR1cm4gajtcbiAgICAgICAgICAgIGlmIChoID0gaC5qb2luKFwiIFwiKSwgcy5tYXRjaGVzTWVkaWEoaCkpcmV0dXJuIGpcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCIxMDB2d1wiXG4gICAgfVxuXG4gICAgYi5jcmVhdGVFbGVtZW50KFwicGljdHVyZVwiKTtcbiAgICB2YXIgbywgcCwgcSwgciwgcyA9IHt9LCB0ID0gITEsIHUgPSBmdW5jdGlvbiAoKSB7XG4gICAgfSwgdiA9IGIuY3JlYXRlRWxlbWVudChcImltZ1wiKSwgdyA9IHYuZ2V0QXR0cmlidXRlLCB4ID0gdi5zZXRBdHRyaWJ1dGUsIHkgPSB2LnJlbW92ZUF0dHJpYnV0ZSwgeiA9IGIuZG9jdW1lbnRFbGVtZW50LCBBID0ge30sIEIgPSB7YWxnb3JpdGhtOiBcIlwifSwgQyA9IFwiZGF0YS1wZnNyY1wiLCBEID0gQyArIFwic2V0XCIsIEUgPSBuYXZpZ2F0b3IudXNlckFnZW50LCBGID0gL3JpZGVudC8udGVzdChFKSB8fCAvZWNrby8udGVzdChFKSAmJiBFLm1hdGNoKC9ydlxcOihcXGQrKS8pICYmIFJlZ0V4cC4kMSA+IDM1LCBHID0gXCJjdXJyZW50U3JjXCIsIEggPSAvXFxzK1xcKz9cXGQrKGVcXGQrKT93LywgSSA9IC8oXFwoW14pXStcXCkpP1xccyooLispLywgSiA9IGEucGljdHVyZWZpbGxDRkcsIEsgPSBcInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt2aXNpYmlsaXR5OmhpZGRlbjtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MDtib3JkZXI6bm9uZTtmb250LXNpemU6MWVtO3dpZHRoOjFlbTtvdmVyZmxvdzpoaWRkZW47Y2xpcDpyZWN0KDBweCwgMHB4LCAwcHgsIDBweClcIiwgTCA9IFwiZm9udC1zaXplOjEwMCUhaW1wb3J0YW50O1wiLCBNID0gITAsIE4gPSB7fSwgTyA9IHt9LCBQID0gYS5kZXZpY2VQaXhlbFJhdGlvLCBRID0ge1xuICAgICAgICBweDogMSxcbiAgICAgICAgXCJpblwiOiA5NlxuICAgIH0sIFIgPSBiLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLCBTID0gITEsIFQgPSAvXlsgXFx0XFxuXFxyXFx1MDAwY10rLywgVSA9IC9eWywgXFx0XFxuXFxyXFx1MDAwY10rLywgViA9IC9eW14gXFx0XFxuXFxyXFx1MDAwY10rLywgVyA9IC9bLF0rJC8sIFggPSAvXlxcZCskLywgWSA9IC9eLT8oPzpbMC05XSt8WzAtOV0qXFwuWzAtOV0rKSg/OltlRV1bKy1dP1swLTldKyk/JC8sIFogPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xuICAgICAgICBhLmFkZEV2ZW50TGlzdGVuZXIgPyBhLmFkZEV2ZW50TGlzdGVuZXIoYiwgYywgZCB8fCAhMSkgOiBhLmF0dGFjaEV2ZW50ICYmIGEuYXR0YWNoRXZlbnQoXCJvblwiICsgYiwgYylcbiAgICB9LCAkID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGIgPSB7fTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYyBpbiBiIHx8IChiW2NdID0gYShjKSksIGJbY11cbiAgICAgICAgfVxuICAgIH0sIF8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhID0gL14oW1xcZFxcLl0rKShlbXx2d3xweCkkLywgYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHMsIGIgPSAwLCBjID0gYVswXTsgKytiIGluIGE7KWMgPSBjLnJlcGxhY2UoYVtiXSwgYVsrK2JdKTtcbiAgICAgICAgICAgIHJldHVybiBjXG4gICAgICAgIH0sIGMgPSAkKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyZXR1cm4gXCIgKyBiKChhIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCksIC9cXGJhbmRcXGIvZywgXCImJlwiLCAvLC9nLCBcInx8XCIsIC9taW4tKFthLXotXFxzXSspOi9nLCBcImUuJDE+PVwiLCAvbWF4LShbYS16LVxcc10rKTovZywgXCJlLiQxPD1cIiwgL2NhbGMoW14pXSspL2csIFwiKCQxKVwiLCAvKFxcZCtbXFwuXSpbXFxkXSopKFthLXpdKykvZywgXCIoJDEgKiBlLiQyKVwiLCAvXig/IShlLlthLXpdfFswLTlcXC4mPXw+PFxcK1xcLVxcKlxcKFxcKVxcL10pKS4qL2dpLCBcIlwiKSArIFwiO1wiXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGIsIGQpIHtcbiAgICAgICAgICAgIHZhciBlO1xuICAgICAgICAgICAgaWYgKCEoYiBpbiBOKSlpZiAoTltiXSA9ICExLCBkICYmIChlID0gYi5tYXRjaChhKSkpIE5bYl0gPSBlWzFdICogUVtlWzJdXTsgZWxzZSB0cnkge1xuICAgICAgICAgICAgICAgIE5bYl0gPSBuZXcgRnVuY3Rpb24oXCJlXCIsIGMoYikpKFEpXG4gICAgICAgICAgICB9IGNhdGNoIChmKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTltiXVxuICAgICAgICB9XG4gICAgfSgpLCBhYSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLncgPyAoYS5jV2lkdGggPSBzLmNhbGNMaXN0TGVuZ3RoKGIgfHwgXCIxMDB2d1wiKSwgYS5yZXMgPSBhLncgLyBhLmNXaWR0aCkgOiBhLnJlcyA9IGEuZCwgYVxuICAgIH0sIGJhID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgIHZhciBjLCBkLCBlLCBmID0gYSB8fCB7fTtcbiAgICAgICAgICAgIGlmIChmLmVsZW1lbnRzICYmIDEgPT09IGYuZWxlbWVudHMubm9kZVR5cGUgJiYgKFwiSU1HXCIgPT09IGYuZWxlbWVudHMubm9kZU5hbWUudG9VcHBlckNhc2UoKSA/IGYuZWxlbWVudHMgPSBbZi5lbGVtZW50c10gOiAoZi5jb250ZXh0ID0gZi5lbGVtZW50cywgZi5lbGVtZW50cyA9IG51bGwpKSwgYyA9IGYuZWxlbWVudHMgfHwgcy5xc2EoZi5jb250ZXh0IHx8IGIsIGYucmVldmFsdWF0ZSB8fCBmLnJlc2VsZWN0ID8gcy5zZWwgOiBzLnNlbFNob3J0KSwgZSA9IGMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChzLnNldHVwUnVuKGYpLCBTID0gITAsIGQgPSAwOyBlID4gZDsgZCsrKXMuZmlsbEltZyhjW2RdLCBmKTtcbiAgICAgICAgICAgICAgICBzLnRlYXJkb3duUnVuKGYpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIG8gPSBhLmNvbnNvbGUgJiYgY29uc29sZS53YXJuID8gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihhKVxuICAgICAgICB9IDogdSwgRyBpbiB2IHx8IChHID0gXCJzcmNcIiksIEFbXCJpbWFnZS9qcGVnXCJdID0gITAsIEFbXCJpbWFnZS9naWZcIl0gPSAhMCwgQVtcImltYWdlL3BuZ1wiXSA9ICEwLCBBW1wiaW1hZ2Uvc3ZnK3htbFwiXSA9IGIuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZShcImh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjSW1hZ2VcIiwgXCIxLjFcIiksIHMubnMgPSAoXCJwZlwiICsgKG5ldyBEYXRlKS5nZXRUaW1lKCkpLnN1YnN0cigwLCA5KSwgcy5zdXBTcmNzZXQgPSBcInNyY3NldFwiIGluIHYsIHMuc3VwU2l6ZXMgPSBcInNpemVzXCIgaW4gdiwgcy5zdXBQaWN0dXJlID0gISFhLkhUTUxQaWN0dXJlRWxlbWVudCwgcy5zdXBTcmNzZXQgJiYgcy5zdXBQaWN0dXJlICYmICFzLnN1cFNpemVzICYmICFmdW5jdGlvbiAoYSkge1xuICAgICAgICB2LnNyY3NldCA9IFwiZGF0YTosYVwiLCBhLnNyYyA9IFwiZGF0YTosYVwiLCBzLnN1cFNyY3NldCA9IHYuY29tcGxldGUgPT09IGEuY29tcGxldGUsIHMuc3VwUGljdHVyZSA9IHMuc3VwU3Jjc2V0ICYmIHMuc3VwUGljdHVyZVxuICAgIH0oYi5jcmVhdGVFbGVtZW50KFwiaW1nXCIpKSwgcy5zdXBTcmNzZXQgJiYgIXMuc3VwU2l6ZXMgPyAhZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGEgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFnQUJBUEFBQVAvLy93QUFBQ0g1QkFBQUFBQUFMQUFBQUFBQ0FBRUFBQUlDQkFvQU93PT1cIiwgYyA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFBQUFBQ0g1QkFFS0FBRUFMQUFBQUFBQkFBRUFBQUlDVEFFQU93PT1cIiwgZCA9IGIuY3JlYXRlRWxlbWVudChcImltZ1wiKSwgZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGQud2lkdGg7XG4gICAgICAgICAgICAgICAgMiA9PT0gYSAmJiAocy5zdXBTaXplcyA9ICEwKSwgcSA9IHMuc3VwU3Jjc2V0ICYmICFzLnN1cFNpemVzLCB0ID0gITAsIHNldFRpbWVvdXQoYmEpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZC5vbmxvYWQgPSBlLCBkLm9uZXJyb3IgPSBlLCBkLnNldEF0dHJpYnV0ZShcInNpemVzXCIsIFwiOXB4XCIpLCBkLnNyY3NldCA9IGMgKyBcIiAxdyxcIiArIGEgKyBcIiA5d1wiLCBkLnNyYyA9IGNcbiAgICAgICAgfSgpIDogdCA9ICEwLCBzLnNlbFNob3J0ID0gXCJwaWN0dXJlPmltZyxpbWdbc3Jjc2V0XVwiLCBzLnNlbCA9IHMuc2VsU2hvcnQsIHMuY2ZnID0gQiwgcy5EUFIgPSBQIHx8IDEsIHMudSA9IFEsIHMudHlwZXMgPSBBLCBzLnNldFNpemUgPSB1LCBzLm1ha2VVcmwgPSAkKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBSLmhyZWYgPSBhLCBSLmhyZWZcbiAgICB9KSwgcy5xc2EgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gXCJxdWVyeVNlbGVjdG9yXCIgaW4gYSA/IGEucXVlcnlTZWxlY3RvckFsbChiKSA6IFtdXG4gICAgfSwgcy5tYXRjaGVzTWVkaWEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhLm1hdGNoTWVkaWEgJiYgKG1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAwLjFlbSlcIikgfHwge30pLm1hdGNoZXMgPyBzLm1hdGNoZXNNZWRpYSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFhIHx8IG1hdGNoTWVkaWEoYSkubWF0Y2hlc1xuICAgICAgICAgICAgfSA6IHMubWF0Y2hlc01lZGlhID0gcy5tTVEsIHMubWF0Y2hlc01lZGlhLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9LCBzLm1NUSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBhID8gXyhhKSA6ICEwXG4gICAgfSwgcy5jYWxjTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGIgPSBfKGEsICEwKSB8fCAhMTtcbiAgICAgICAgcmV0dXJuIDAgPiBiICYmIChiID0gITEpLCBiXG4gICAgfSwgcy5zdXBwb3J0c1R5cGUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gYSA/IEFbYV0gOiAhMFxuICAgIH0sIHMucGFyc2VTaXplID0gJChmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYiA9IChhIHx8IFwiXCIpLm1hdGNoKEkpO1xuICAgICAgICByZXR1cm4ge21lZGlhOiBiICYmIGJbMV0sIGxlbmd0aDogYiAmJiBiWzJdfVxuICAgIH0pLCBzLnBhcnNlU2V0ID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIGEuY2FuZHMgfHwgKGEuY2FuZHMgPSBtKGEuc3Jjc2V0LCBhKSksIGEuY2FuZHNcbiAgICB9LCBzLmdldEVtVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhO1xuICAgICAgICBpZiAoIXAgJiYgKGEgPSBiLmJvZHkpKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGIuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgZCA9IHouc3R5bGUuY3NzVGV4dCwgZSA9IGEuc3R5bGUuY3NzVGV4dDtcbiAgICAgICAgICAgIGMuc3R5bGUuY3NzVGV4dCA9IEssIHouc3R5bGUuY3NzVGV4dCA9IEwsIGEuc3R5bGUuY3NzVGV4dCA9IEwsIGEuYXBwZW5kQ2hpbGQoYyksIHAgPSBjLm9mZnNldFdpZHRoLCBhLnJlbW92ZUNoaWxkKGMpLCBwID0gcGFyc2VGbG9hdChwLCAxMCksIHouc3R5bGUuY3NzVGV4dCA9IGQsIGEuc3R5bGUuY3NzVGV4dCA9IGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcCB8fCAxNlxuICAgIH0sIHMuY2FsY0xpc3RMZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICBpZiAoIShhIGluIE8pIHx8IEIudVQpIHtcbiAgICAgICAgICAgIHZhciBiID0gcy5jYWxjTGVuZ3RoKG4oYSkpO1xuICAgICAgICAgICAgT1thXSA9IGIgPyBiIDogUS53aWR0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPW2FdXG4gICAgfSwgcy5zZXRSZXMgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYjtcbiAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgIGIgPSBzLnBhcnNlU2V0KGEpO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDAsIGQgPSBiLmxlbmd0aDsgZCA+IGM7IGMrKylhYShiW2NdLCBhLnNpemVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiXG4gICAgfSwgcy5zZXRSZXMucmVzID0gYWEsIHMuYXBwbHlTZXRDYW5kaWRhdGUgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBjLCBkLCBlLCBmLCBoLCBrLCBsLCBtLCBuLCBvID0gYltzLm5zXSwgcCA9IHMuRFBSO1xuICAgICAgICAgICAgaWYgKGsgPSBvLmN1clNyYyB8fCBiW0ddLCBsID0gby5jdXJDYW4gfHwgaihiLCBrLCBhWzBdLnNldCksIGwgJiYgbC5zZXQgPT09IGFbMF0uc2V0ICYmIChuID0gRiAmJiAhYi5jb21wbGV0ZSAmJiBsLnJlcyAtIC4xID4gcCwgbiB8fCAobC5jYWNoZWQgPSAhMCwgbC5yZXMgPj0gcCAmJiAoaCA9IGwpKSksICFoKWZvciAoYS5zb3J0KGkpLCBmID0gYS5sZW5ndGgsIGggPSBhW2YgLSAxXSwgZCA9IDA7IGYgPiBkOyBkKyspaWYgKGMgPSBhW2RdLCBjLnJlcyA+PSBwKSB7XG4gICAgICAgICAgICAgICAgZSA9IGQgLSAxLCBoID0gYVtlXSAmJiAobiB8fCBrICE9PSBzLm1ha2VVcmwoYy51cmwpKSAmJiBnKGFbZV0ucmVzLCBjLnJlcywgcCwgYVtlXS5jYWNoZWQpID8gYVtlXSA6IGM7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggJiYgKG0gPSBzLm1ha2VVcmwoaC51cmwpLCBvLmN1clNyYyA9IG0sIG8uY3VyQ2FuID0gaCwgbSAhPT0gayAmJiBzLnNldFNyYyhiLCBoKSwgcy5zZXRTaXplKGIpKVxuICAgICAgICB9XG4gICAgfSwgcy5zZXRTcmMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgYztcbiAgICAgICAgYS5zcmMgPSBiLnVybCwgXCJpbWFnZS9zdmcreG1sXCIgPT09IGIuc2V0LnR5cGUgJiYgKGMgPSBhLnN0eWxlLndpZHRoLCBhLnN0eWxlLndpZHRoID0gYS5vZmZzZXRXaWR0aCArIDEgKyBcInB4XCIsIGEub2Zmc2V0V2lkdGggKyAxICYmIChhLnN0eWxlLndpZHRoID0gYykpXG4gICAgfSwgcy5nZXRTZXQgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYiwgYywgZCwgZSA9ICExLCBmID0gYVtzLm5zXS5zZXRzO1xuICAgICAgICBmb3IgKGIgPSAwOyBiIDwgZi5sZW5ndGggJiYgIWU7IGIrKylpZiAoYyA9IGZbYl0sIGMuc3Jjc2V0ICYmIHMubWF0Y2hlc01lZGlhKGMubWVkaWEpICYmIChkID0gcy5zdXBwb3J0c1R5cGUoYy50eXBlKSkpIHtcbiAgICAgICAgICAgIFwicGVuZGluZ1wiID09PSBkICYmIChjID0gZCksIGUgPSBjO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZVxuICAgIH0sIHMucGFyc2VTZXRzID0gZnVuY3Rpb24gKGEsIGIsIGQpIHtcbiAgICAgICAgdmFyIGUsIGYsIGcsIGgsIGkgPSBiICYmIFwiUElDVFVSRVwiID09PSBiLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCksIGogPSBhW3MubnNdO1xuICAgICAgICAoai5zcmMgPT09IGMgfHwgZC5zcmMpICYmIChqLnNyYyA9IHcuY2FsbChhLCBcInNyY1wiKSwgai5zcmMgPyB4LmNhbGwoYSwgQywgai5zcmMpIDogeS5jYWxsKGEsIEMpKSwgKGouc3Jjc2V0ID09PSBjIHx8IGQuc3Jjc2V0IHx8ICFzLnN1cFNyY3NldCB8fCBhLnNyY3NldCkgJiYgKGUgPSB3LmNhbGwoYSwgXCJzcmNzZXRcIiksIGouc3Jjc2V0ID0gZSwgaCA9ICEwKSwgai5zZXRzID0gW10sIGkgJiYgKGoucGljID0gITAsIGwoYiwgai5zZXRzKSksIGouc3Jjc2V0ID8gKGYgPSB7XG4gICAgICAgICAgICAgICAgc3Jjc2V0OiBqLnNyY3NldCxcbiAgICAgICAgICAgICAgICBzaXplczogdy5jYWxsKGEsIFwic2l6ZXNcIilcbiAgICAgICAgICAgIH0sIGouc2V0cy5wdXNoKGYpLCBnID0gKHEgfHwgai5zcmMpICYmIEgudGVzdChqLnNyY3NldCB8fCBcIlwiKSwgZyB8fCAhai5zcmMgfHwgayhqLnNyYywgZikgfHwgZi5oYXMxeCB8fCAoZi5zcmNzZXQgKz0gXCIsIFwiICsgai5zcmMsIGYuY2FuZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdXJsOiBqLnNyYyxcbiAgICAgICAgICAgICAgICBkOiAxLFxuICAgICAgICAgICAgICAgIHNldDogZlxuICAgICAgICAgICAgfSkpKSA6IGouc3JjICYmIGouc2V0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzcmNzZXQ6IGouc3JjLFxuICAgICAgICAgICAgICAgIHNpemVzOiBudWxsXG4gICAgICAgICAgICB9KSwgai5jdXJDYW4gPSBudWxsLCBqLmN1clNyYyA9IGMsIGouc3VwcG9ydGVkID0gIShpIHx8IGYgJiYgIXMuc3VwU3Jjc2V0IHx8IGcgJiYgIXMuc3VwU2l6ZXMpLCBoICYmIHMuc3VwU3Jjc2V0ICYmICFqLnN1cHBvcnRlZCAmJiAoZSA/ICh4LmNhbGwoYSwgRCwgZSksIGEuc3Jjc2V0ID0gXCJcIikgOiB5LmNhbGwoYSwgRCkpLCBqLnN1cHBvcnRlZCAmJiAhai5zcmNzZXQgJiYgKCFqLnNyYyAmJiBhLnNyYyB8fCBhLnNyYyAhPT0gcy5tYWtlVXJsKGouc3JjKSkgJiYgKG51bGwgPT09IGouc3JjID8gYS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIikgOiBhLnNyYyA9IGouc3JjKSwgai5wYXJzZWQgPSAhMFxuICAgIH0sIHMuZmlsbEltZyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBjLCBkID0gYi5yZXNlbGVjdCB8fCBiLnJlZXZhbHVhdGU7XG4gICAgICAgIGFbcy5uc10gfHwgKGFbcy5uc10gPSB7fSksIGMgPSBhW3MubnNdLCAoZCB8fCBjLmV2YWxlZCAhPT0gcikgJiYgKCghYy5wYXJzZWQgfHwgYi5yZWV2YWx1YXRlKSAmJiBzLnBhcnNlU2V0cyhhLCBhLnBhcmVudE5vZGUsIGIpLCBjLnN1cHBvcnRlZCA/IGMuZXZhbGVkID0gciA6IGgoYSkpXG4gICAgfSwgcy5zZXR1cFJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCFTIHx8IE0gfHwgUCAhPT0gYS5kZXZpY2VQaXhlbFJhdGlvKSAmJiBmKClcbiAgICB9LCBzLnN1cFBpY3R1cmUgPyAoYmEgPSB1LCBzLmZpbGxJbWcgPSB1KSA6ICFmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYywgZCA9IGEuYXR0YWNoRXZlbnQgPyAvZCR8XmMvIDogL2QkfF5jfF5pLywgZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGIucmVhZHlTdGF0ZSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIGYgPSBzZXRUaW1lb3V0KGUsIFwibG9hZGluZ1wiID09PSBhID8gMjAwIDogOTk5KSwgYi5ib2R5ICYmIChzLmZpbGxJbWdzKCksIGMgPSBjIHx8IGQudGVzdChhKSwgYyAmJiBjbGVhclRpbWVvdXQoZikpXG4gICAgICAgICAgICB9LCBmID0gc2V0VGltZW91dChlLCBiLmJvZHkgPyA5IDogOTkpLCBnID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYywgZCwgZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBuZXcgRGF0ZSAtIGQ7XG4gICAgICAgICAgICAgICAgICAgIGIgPiBmID8gYyA9IHNldFRpbWVvdXQoZSwgYiAtIGYpIDogKGMgPSBudWxsLCBhKCkpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkID0gbmV3IERhdGUsIGMgfHwgKGMgPSBzZXRUaW1lb3V0KGUsIGIpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGggPSB6LmNsaWVudEhlaWdodCwgaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBNID0gTWF0aC5tYXgoYS5pbm5lcldpZHRoIHx8IDAsIHouY2xpZW50V2lkdGgpICE9PSBRLndpZHRoIHx8IHouY2xpZW50SGVpZ2h0ICE9PSBoLCBoID0gei5jbGllbnRIZWlnaHQsIE0gJiYgcy5maWxsSW1ncygpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgWihhLCBcInJlc2l6ZVwiLCBnKGksIDk5KSksIFooYiwgXCJyZWFkeXN0YXRlY2hhbmdlXCIsIGUpXG4gICAgICAgIH0oKSwgcy5waWN0dXJlZmlsbCA9IGJhLCBzLmZpbGxJbWdzID0gYmEsIHMudGVhcmRvd25SdW4gPSB1LCBiYS5fID0gcywgYS5waWN0dXJlZmlsbENGRyA9IHtcbiAgICAgICAgcGY6IHMsXG4gICAgICAgIHB1c2g6IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICB2YXIgYiA9IGEuc2hpZnQoKTtcbiAgICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygc1tiXSA/IHNbYl0uYXBwbHkocywgYSkgOiAoQltiXSA9IGFbMF0sIFMgJiYgcy5maWxsSW1ncyh7cmVzZWxlY3Q6ICEwfSkpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoOyBKICYmIEoubGVuZ3RoOylhLnBpY3R1cmVmaWxsQ0ZHLnB1c2goSi5zaGlmdCgpKTtcbiAgICBhLnBpY3R1cmVmaWxsID0gYmEsIFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZSAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA/IG1vZHVsZS5leHBvcnRzID0gYmEgOiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kICYmIGRlZmluZShcInBpY3R1cmVmaWxsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBiYVxuICAgICAgICB9KSwgcy5zdXBQaWN0dXJlIHx8IChBW1wiaW1hZ2Uvd2VicFwiXSA9IGUoXCJpbWFnZS93ZWJwXCIsIFwiZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxVa2xHUmtvQUFBQlhSVUpRVmxBNFdBb0FBQUFRQUFBQUFBQUFBQUFBUVV4UVNBd0FBQUFCQnhBUi9ROUVSUDhEQUFCV1VEZ2dHQUFBQURBQkFKMEJLZ0VBQVFBREFEUWxwQUFEY0FEKysvMVFBQT09XCIpKVxufSh3aW5kb3csIGRvY3VtZW50KTsiXSwiZmlsZSI6Im1haW4uanMifQ==
