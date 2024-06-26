var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/crypt/crypt.js
var require_crypt = __commonJS({
  "node_modules/crypt/crypt.js"(exports, module) {
    (function() {
      var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt = {
        // Bit-wise rotation left
        rotl: function(n, b) {
          return n << b | n >>> 32 - b;
        },
        // Bit-wise rotation right
        rotr: function(n, b) {
          return n << 32 - b | n >>> b;
        },
        // Swap big-endian to little-endian and vice versa
        endian: function(n) {
          if (n.constructor == Number) {
            return crypt.rotl(n, 8) & 16711935 | crypt.rotl(n, 24) & 4278255360;
          }
          for (var i = 0; i < n.length; i++)
            n[i] = crypt.endian(n[i]);
          return n;
        },
        // Generate an array of any length of random bytes
        randomBytes: function(n) {
          for (var bytes = []; n > 0; n--)
            bytes.push(Math.floor(Math.random() * 256));
          return bytes;
        },
        // Convert a byte array to big-endian 32-bit words
        bytesToWords: function(bytes) {
          for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
            words[b >>> 5] |= bytes[i] << 24 - b % 32;
          return words;
        },
        // Convert big-endian 32-bit words to a byte array
        wordsToBytes: function(words) {
          for (var bytes = [], b = 0; b < words.length * 32; b += 8)
            bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
          return bytes;
        },
        // Convert a byte array to a hex string
        bytesToHex: function(bytes) {
          for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 15).toString(16));
          }
          return hex.join("");
        },
        // Convert a hex string to a byte array
        hexToBytes: function(hex) {
          for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
          return bytes;
        },
        // Convert a byte array to a base-64 string
        bytesToBase64: function(bytes) {
          for (var base64 = [], i = 0; i < bytes.length; i += 3) {
            var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
            for (var j = 0; j < 4; j++)
              if (i * 8 + j * 6 <= bytes.length * 8)
                base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
              else
                base64.push("=");
          }
          return base64.join("");
        },
        // Convert a base-64 string to a byte array
        base64ToBytes: function(base64) {
          base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
          for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
            if (imod4 == 0)
              continue;
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
          }
          return bytes;
        }
      };
      module.exports = crypt;
    })();
  }
});

// node_modules/charenc/charenc.js
var require_charenc = __commonJS({
  "node_modules/charenc/charenc.js"(exports, module) {
    var charenc = {
      // UTF-8 encoding
      utf8: {
        // Convert a string to a byte array
        stringToBytes: function(str) {
          return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
        },
        // Convert a byte array to a string
        bytesToString: function(bytes) {
          return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
        }
      },
      // Binary encoding
      bin: {
        // Convert a string to a byte array
        stringToBytes: function(str) {
          for (var bytes = [], i = 0; i < str.length; i++)
            bytes.push(str.charCodeAt(i) & 255);
          return bytes;
        },
        // Convert a byte array to a string
        bytesToString: function(bytes) {
          for (var str = [], i = 0; i < bytes.length; i++)
            str.push(String.fromCharCode(bytes[i]));
          return str.join("");
        }
      }
    };
    module.exports = charenc;
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module) {
    module.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// node_modules/md5/md5.js
var require_md5 = __commonJS({
  "node_modules/md5/md5.js"(exports, module) {
    (function() {
      var crypt = require_crypt(), utf8 = require_charenc().utf8, isBuffer = require_is_buffer(), bin = require_charenc().bin, md52 = function(message, options) {
        if (message.constructor == String)
          if (options && options.encoding === "binary")
            message = bin.stringToBytes(message);
          else
            message = utf8.stringToBytes(message);
        else if (isBuffer(message))
          message = Array.prototype.slice.call(message, 0);
        else if (!Array.isArray(message) && message.constructor !== Uint8Array)
          message = message.toString();
        var m = crypt.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (var i = 0; i < m.length; i++) {
          m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
        }
        m[l >>> 5] |= 128 << l % 32;
        m[(l + 64 >>> 9 << 4) + 14] = l;
        var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
        for (var i = 0; i < m.length; i += 16) {
          var aa = a, bb = b, cc = c, dd = d;
          a = FF(a, b, c, d, m[i + 0], 7, -680876936);
          d = FF(d, a, b, c, m[i + 1], 12, -389564586);
          c = FF(c, d, a, b, m[i + 2], 17, 606105819);
          b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
          a = FF(a, b, c, d, m[i + 4], 7, -176418897);
          d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
          c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
          b = FF(b, c, d, a, m[i + 7], 22, -45705983);
          a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
          d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
          c = FF(c, d, a, b, m[i + 10], 17, -42063);
          b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
          a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
          d = FF(d, a, b, c, m[i + 13], 12, -40341101);
          c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
          b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
          a = GG(a, b, c, d, m[i + 1], 5, -165796510);
          d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
          c = GG(c, d, a, b, m[i + 11], 14, 643717713);
          b = GG(b, c, d, a, m[i + 0], 20, -373897302);
          a = GG(a, b, c, d, m[i + 5], 5, -701558691);
          d = GG(d, a, b, c, m[i + 10], 9, 38016083);
          c = GG(c, d, a, b, m[i + 15], 14, -660478335);
          b = GG(b, c, d, a, m[i + 4], 20, -405537848);
          a = GG(a, b, c, d, m[i + 9], 5, 568446438);
          d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
          c = GG(c, d, a, b, m[i + 3], 14, -187363961);
          b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
          a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
          d = GG(d, a, b, c, m[i + 2], 9, -51403784);
          c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
          b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
          a = HH(a, b, c, d, m[i + 5], 4, -378558);
          d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
          c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
          b = HH(b, c, d, a, m[i + 14], 23, -35309556);
          a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
          d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
          c = HH(c, d, a, b, m[i + 7], 16, -155497632);
          b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
          a = HH(a, b, c, d, m[i + 13], 4, 681279174);
          d = HH(d, a, b, c, m[i + 0], 11, -358537222);
          c = HH(c, d, a, b, m[i + 3], 16, -722521979);
          b = HH(b, c, d, a, m[i + 6], 23, 76029189);
          a = HH(a, b, c, d, m[i + 9], 4, -640364487);
          d = HH(d, a, b, c, m[i + 12], 11, -421815835);
          c = HH(c, d, a, b, m[i + 15], 16, 530742520);
          b = HH(b, c, d, a, m[i + 2], 23, -995338651);
          a = II(a, b, c, d, m[i + 0], 6, -198630844);
          d = II(d, a, b, c, m[i + 7], 10, 1126891415);
          c = II(c, d, a, b, m[i + 14], 15, -1416354905);
          b = II(b, c, d, a, m[i + 5], 21, -57434055);
          a = II(a, b, c, d, m[i + 12], 6, 1700485571);
          d = II(d, a, b, c, m[i + 3], 10, -1894986606);
          c = II(c, d, a, b, m[i + 10], 15, -1051523);
          b = II(b, c, d, a, m[i + 1], 21, -2054922799);
          a = II(a, b, c, d, m[i + 8], 6, 1873313359);
          d = II(d, a, b, c, m[i + 15], 10, -30611744);
          c = II(c, d, a, b, m[i + 6], 15, -1560198380);
          b = II(b, c, d, a, m[i + 13], 21, 1309151649);
          a = II(a, b, c, d, m[i + 4], 6, -145523070);
          d = II(d, a, b, c, m[i + 11], 10, -1120210379);
          c = II(c, d, a, b, m[i + 2], 15, 718787259);
          b = II(b, c, d, a, m[i + 9], 21, -343485551);
          a = a + aa >>> 0;
          b = b + bb >>> 0;
          c = c + cc >>> 0;
          d = d + dd >>> 0;
        }
        return crypt.endian([a, b, c, d]);
      };
      md52._ff = function(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._gg = function(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._hh = function(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._ii = function(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._blocksize = 16;
      md52._digestsize = 16;
      module.exports = function(message, options) {
        if (message === void 0 || message === null)
          throw new Error("Illegal argument " + message);
        var digestbytes = crypt.wordsToBytes(md52(message, options));
        return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
      };
    })();
  }
});

// resources/js/index.js
var import_md5 = __toESM(require_md5(), 1);
function initializeDocument(args) {
  return {
    selectedLabel: {
      name: null,
      color: null
    },
    labelList: /* @__PURE__ */ new Map(),
    targetText: args.text,
    id: args.id,
    state: args.state,
    annotations: args.annotations,
    labels: args.labels,
    init: function() {
      var styleText = "";
      const style = document.createElement("style");
      for (const key in this.labels) {
        const label = this.labels[key];
        const color = this.genColorCodeFromText(label.name);
        styleText += `.radio-label .${label.name} { background-color: ${color}; } `;
      }
      style.innerHTML = styleText;
      document.head.appendChild(style);
      for (const key in this.state) {
        if (this.state.hasOwnProperty(key)) {
          const annotation = this.state[key];
          if (annotation.start < annotation.end) {
            this.labelList.set(this.generateUUID(), {
              pattern: annotation.pattern,
              start: annotation.start,
              end: annotation.end,
              label: annotation.label.toUpperCase(),
              color: this.genColorCodeFromText(annotation.label)
            });
          }
        }
      }
      document.addEventListener("contextmenu", this.removeLabel.bind(this));
    },
    setSelectedLabel: function(label) {
      this.selectedLabel = label;
    },
    genColorCodeFromText: function(text) {
      const stringToColour = (str) => {
        str = str.toLowerCase();
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const saturation = 0.6;
        const lightness = 0.5;
        const hueOffset = hash % 360;
        const hue = (hueOffset + 360) % 360;
        const h = hue / 360;
        const s = saturation;
        const l = lightness;
        let r, g, b;
        if (s === 0) {
          r = g = b = l;
        } else {
          const hueToRgb = (p2, q2, t) => {
            if (t < 0)
              t += 1;
            if (t > 1)
              t -= 1;
            if (t < 1 / 6)
              return p2 + (q2 - p2) * 6 * t;
            if (t < 1 / 2)
              return q2;
            if (t < 2 / 3)
              return p2 + (q2 - p2) * (2 / 3 - t) * 6;
            return p2;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hueToRgb(p, q, h + 1 / 3);
          g = hueToRgb(p, q, h);
          b = hueToRgb(p, q, h - 1 / 3);
        }
        const toHex = (x) => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };
        const colour = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        return colour;
      };
      return stringToColour(text);
    },
    updateState: function() {
      const newState = {};
      this.labelList.forEach((value, key) => {
        newState[key] = {
          pattern: value.pattern,
          start: value.start,
          end: value.end,
          label: value.label.toUpperCase(),
          color: this.genColorCodeFromText(value.label)
        };
      });
      this.state = newState;
    },
    markText: function(event) {
      var element = document.getElementById(this.id);
      var selection = element.ownerDocument.getSelection();
      if (!this.selectedLabel || !this.selectedLabel.name || selection.toString().length <= 1) {
        return;
      }
      var selectedText = selection.toString();
      if (selectedText !== "") {
        var range = selection.getRangeAt(0);
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        while (startOffset > 0 && !/\s/.test(range.startContainer.textContent[startOffset - 1])) {
          startOffset--;
        }
        while (endOffset < range.startContainer.textContent.length && !/\s/.test(range.startContainer.textContent[endOffset])) {
          endOffset++;
        }
        range.setStart(range.startContainer, startOffset);
        range.setEnd(range.startContainer, endOffset);
        var commonAncestor = range.commonAncestorContainer;
        var offset = this.calculateOffset(selection.anchorNode.parentNode, selection.anchorNode);
        var start = offset + range.startOffset;
        var end = offset + range.endOffset;
        var isWithinLabeledSpan = commonAncestor.nodeType === Node.ELEMENT_NODE && commonAncestor.classList.contains("dynamic-span");
        if (!isWithinLabeledSpan) {
          var overlappingLabel = false;
          this.labelList.forEach((value) => {
            if (!(end <= value.start || start >= value.end)) {
              overlappingLabel = true;
            }
          });
          if (!overlappingLabel) {
            var key = this.generateUUID();
            this.labelList.set(key, {
              pattern: range.toString(),
              start,
              end,
              label: this.selectedLabel.name.toUpperCase(),
              color: this.genColorCodeFromText(this.selectedLabel.name)
            });
            this.refreshTextField();
            var newNode = document.createElement("span");
            newNode.style.backgroundColor = this.genColorCodeFromText(this.selectedLabel.name);
            range.surroundContents(newNode);
          } else {
            return;
          }
        }
      }
    },
    calculateOffset: function(parentNode, selectionNode) {
      var totalLength = 0;
      for (const child of parentNode.childNodes) {
        if (child === selectionNode) {
          break;
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
          for (const subChild of child.childNodes) {
            if (subChild.nodeType === Node.TEXT_NODE) {
              totalLength += subChild.textContent.length;
            }
          }
        } else if (child.nodeType === Node.TEXT_NODE) {
          totalLength += child.textContent.length;
        }
      }
      return totalLength;
    },
    refreshTextField: function() {
      let resultHTML = "";
      let currentIndex = 0;
      const sortedLabelList = [...this.labelList.entries()].sort((a, b) => a[1].start - b[1].start);
      sortedLabelList.forEach(([key, label]) => {
        if (currentIndex < label.start) {
          resultHTML += this.targetText.substring(currentIndex, label.start);
        }
        resultHTML += this.createSpan(label, key);
        currentIndex = label.end;
      });
      if (currentIndex < this.targetText.length) {
        resultHTML += this.targetText.substring(currentIndex);
      }
      var element = document.getElementById(this.id);
      element.innerHTML = resultHTML;
      this.updateState(this.state);
    },
    createSpan: function(label, key) {
      var newNode = document.createElement("span");
      newNode.classList.add(key);
      newNode.classList.add("dynamic-span");
      var selectedText = this.targetText.substring(label.start, label.end);
      newNode.textContent = selectedText;
      newNode.style.borderBottom = `3px solid ${label.color}`;
      var labelElement = document.createElement("span");
      labelElement.textContent = label.label;
      labelElement.style.marginLeft = "0.3em";
      labelElement.style.backgroundColor = label.color;
      labelElement.style.padding = "0.2em";
      labelElement.style.borderRadius = "0.2em";
      labelElement.style.fontSize = "0.6em";
      labelElement.style.verticalAlign = "super";
      newNode.appendChild(labelElement);
      newNode.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.labelList.delete(key);
        this.refreshTextField();
      });
      return newNode.outerHTML;
    },
    removeLabel: function(event) {
      if (event.target.classList.contains("dynamic-span")) {
        event.preventDefault();
        const key = Array.from(event.target.classList).find((cls) => this.labelList.has(cls));
        if (key) {
          this.labelList.delete(key);
          this.refreshTextField();
        }
      }
    },
    generateUUID: function() {
      return "xxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
  };
}
export {
  initializeDocument as default
};
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2NyeXB0L2NyeXB0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9jaGFyZW5jL2NoYXJlbmMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvbWQ1L21kNS5qcyIsICIuLi9qcy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiKGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTY0bWFwXG4gICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcblxuICBjcnlwdCA9IHtcbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiBsZWZ0XG4gICAgcm90bDogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcbiAgICB9LFxuXG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gcmlnaHRcbiAgICByb3RyOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgKDMyIC0gYikpIHwgKG4gPj4+IGIpO1xuICAgIH0sXG5cbiAgICAvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxuICAgIGVuZGlhbjogZnVuY3Rpb24obikge1xuICAgICAgLy8gSWYgbnVtYmVyIGdpdmVuLCBzd2FwIGVuZGlhblxuICAgICAgaWYgKG4uY29uc3RydWN0b3IgPT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdC5yb3RsKG4sIDgpICYgMHgwMEZGMDBGRiB8IGNyeXB0LnJvdGwobiwgMjQpICYgMHhGRjAwRkYwMDtcbiAgICAgIH1cblxuICAgICAgLy8gRWxzZSwgYXNzdW1lIGFycmF5IGFuZCBzd2FwIGFsbCBpdGVtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKVxuICAgICAgICBuW2ldID0gY3J5cHQuZW5kaWFuKG5baV0pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcblxuICAgIC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXG4gICAgcmFuZG9tQnl0ZXM6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW107IG4gPiAwOyBuLS0pXG4gICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXG4gICAgYnl0ZXNUb1dvcmRzOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgd29yZHMgPSBbXSwgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOClcbiAgICAgICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcbiAgICB3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uKHdvcmRzKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBiID0gMDsgYiA8IHdvcmRzLmxlbmd0aCAqIDMyOyBiICs9IDgpXG4gICAgICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAgICBieXRlc1RvSGV4OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgaGV4IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgYmFzZS02NCBzdHJpbmdcbiAgICBieXRlc1RvQmFzZTY0OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgYmFzZTY0ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZXNbaV0gPDwgMTYpIHwgKGJ5dGVzW2kgKyAxXSA8PCA4KSB8IGJ5dGVzW2kgKyAyXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAgICAgICAgaWYgKGkgKiA4ICsgaiAqIDYgPD0gYnl0ZXMubGVuZ3RoICogOClcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKGJhc2U2NG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBiYXNlNjQucHVzaCgnPScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJhc2UtNjQgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGJhc2U2NFRvQnl0ZXM6IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgICAgLy8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCAnJyk7XG5cbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwLCBpbW9kNCA9IDA7IGkgPCBiYXNlNjQubGVuZ3RoO1xuICAgICAgICAgIGltb2Q0ID0gKytpICUgNCkge1xuICAgICAgICBpZiAoaW1vZDQgPT0gMCkgY29udGludWU7XG4gICAgICAgIGJ5dGVzLnB1c2goKChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkgLSAxKSlcbiAgICAgICAgICAgICYgKE1hdGgucG93KDIsIC0yICogaW1vZDQgKyA4KSAtIDEpKSA8PCAoaW1vZDQgKiAyKSlcbiAgICAgICAgICAgIHwgKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSkpID4+PiAoNiAtIGltb2Q0ICogMikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBjcnlwdDtcbn0pKCk7XG4iLCAidmFyIGNoYXJlbmMgPSB7XG4gIC8vIFVURi04IGVuY29kaW5nXG4gIHV0Zjg6IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIGNoYXJlbmMuYmluLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoY2hhcmVuYy5iaW4uYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQmluYXJ5IGVuY29kaW5nXG4gIGJpbjoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcbiAgICAgICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmVuYztcbiIsICIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsICIoZnVuY3Rpb24oKXtcclxuICB2YXIgY3J5cHQgPSByZXF1aXJlKCdjcnlwdCcpLFxyXG4gICAgICB1dGY4ID0gcmVxdWlyZSgnY2hhcmVuYycpLnV0ZjgsXHJcbiAgICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyksXHJcbiAgICAgIGJpbiA9IHJlcXVpcmUoJ2NoYXJlbmMnKS5iaW4sXHJcblxyXG4gIC8vIFRoZSBjb3JlXHJcbiAgbWQ1ID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIC8vIENvbnZlcnQgdG8gYnl0ZSBhcnJheVxyXG4gICAgaWYgKG1lc3NhZ2UuY29uc3RydWN0b3IgPT0gU3RyaW5nKVxyXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kaW5nID09PSAnYmluYXJ5JylcclxuICAgICAgICBtZXNzYWdlID0gYmluLnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBtZXNzYWdlID0gdXRmOC5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgZWxzZSBpZiAoaXNCdWZmZXIobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLCAwKTtcclxuICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UpICYmIG1lc3NhZ2UuY29uc3RydWN0b3IgIT09IFVpbnQ4QXJyYXkpXHJcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAvLyBlbHNlLCBhc3N1bWUgYnl0ZSBhcnJheSBhbHJlYWR5XHJcblxyXG4gICAgdmFyIG0gPSBjcnlwdC5ieXRlc1RvV29yZHMobWVzc2FnZSksXHJcbiAgICAgICAgbCA9IG1lc3NhZ2UubGVuZ3RoICogOCxcclxuICAgICAgICBhID0gIDE3MzI1ODQxOTMsXHJcbiAgICAgICAgYiA9IC0yNzE3MzM4NzksXHJcbiAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxyXG4gICAgICAgIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICAgIC8vIFN3YXAgZW5kaWFuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbVtpXSA9ICgobVtpXSA8PCAgOCkgfCAobVtpXSA+Pj4gMjQpKSAmIDB4MDBGRjAwRkYgfFxyXG4gICAgICAgICAgICAgKChtW2ldIDw8IDI0KSB8IChtW2ldID4+PiAgOCkpICYgMHhGRjAwRkYwMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYWRkaW5nXHJcbiAgICBtW2wgPj4+IDVdIHw9IDB4ODAgPDwgKGwgJSAzMik7XHJcbiAgICBtWygoKGwgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbDtcclxuXHJcbiAgICAvLyBNZXRob2Qgc2hvcnRjdXRzXHJcbiAgICB2YXIgRkYgPSBtZDUuX2ZmLFxyXG4gICAgICAgIEdHID0gbWQ1Ll9nZyxcclxuICAgICAgICBISCA9IG1kNS5faGgsXHJcbiAgICAgICAgSUkgPSBtZDUuX2lpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcclxuXHJcbiAgICAgIHZhciBhYSA9IGEsXHJcbiAgICAgICAgICBiYiA9IGIsXHJcbiAgICAgICAgICBjYyA9IGMsXHJcbiAgICAgICAgICBkZCA9IGQ7XHJcblxyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDcsIC02ODA4NzY5MzYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgNF0sICA3LCAtMTc2NDE4ODk3KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE3LCAtNDIwNjMpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsxMl0sICA3LCAgMTgwNDYwMzY4Mik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgMV0sICA1LCAtMTY1Nzk2NTEwKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgNl0sICA5LCAtMTA2OTUwMTYzMik7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDBdLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDVdLCAgNSwgLTcwMTU1ODY5MSk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTBdLCAgOSwgIDM4MDE2MDgzKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE0LCAtNjYwNDc4MzM1KTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgOV0sICA1LCAgNTY4NDQ2NDM4KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxNF0sICA5LCAtMTAxOTgwMzY5MCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKzEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgMl0sICA5LCAtNTE0MDM3ODQpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcblxyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA1XSwgIDQsIC0zNzg1NTgpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgMV0sICA0LCAtMTUzMDk5MjA2MCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsxM10sICA0LCAgNjgxMjc5MTc0KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgNl0sIDIzLCAgNzYwMjkxODkpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA5XSwgIDQsIC02NDAzNjQ0ODcpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzE1XSwgMTYsICA1MzA3NDI1MjApO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgMF0sICA2LCAtMTk4NjMwODQ0KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDYsICAxODczMzEzMzU5KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDRdLCAgNiwgLTE0NTUyMzA3MCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgICAgYSA9IChhICsgYWEpID4+PiAwO1xyXG4gICAgICBiID0gKGIgKyBiYikgPj4+IDA7XHJcbiAgICAgIGMgPSAoYyArIGNjKSA+Pj4gMDtcclxuICAgICAgZCA9IChkICsgZGQpID4+PiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjcnlwdC5lbmRpYW4oW2EsIGIsIGMsIGRdKTtcclxuICB9O1xyXG5cclxuICAvLyBBdXhpbGlhcnkgZnVuY3Rpb25zXHJcbiAgbWQ1Ll9mZiAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBjIHwgfmIgJiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9nZyAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBkIHwgYyAmIH5kKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9oaCAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faWkgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuXHJcbiAgLy8gUGFja2FnZSBwcml2YXRlIGJsb2Nrc2l6ZVxyXG4gIG1kNS5fYmxvY2tzaXplID0gMTY7XHJcbiAgbWQ1Ll9kaWdlc3RzaXplID0gMTY7XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGFyZ3VtZW50ICcgKyBtZXNzYWdlKTtcclxuXHJcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMobWQ1KG1lc3NhZ2UsIG9wdGlvbnMpKTtcclxuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcclxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxyXG4gICAgICAgIGNyeXB0LmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpO1xyXG4gIH07XHJcblxyXG59KSgpO1xyXG4iLCAiaW1wb3J0IG1kNSBmcm9tIFwibWQ1XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplRG9jdW1lbnQoYXJncykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkTGFiZWw6IHtcbiAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICBjb2xvcjogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxMaXN0OiBuZXcgTWFwKCksXG4gICAgICAgIHRhcmdldFRleHQ6IGFyZ3MudGV4dCxcbiAgICAgICAgaWQ6IGFyZ3MuaWQsXG4gICAgICAgIHN0YXRlOiBhcmdzLnN0YXRlLFxuICAgICAgICBhbm5vdGF0aW9uczogYXJncy5hbm5vdGF0aW9ucyxcbiAgICAgICAgbGFiZWxzOiBhcmdzLmxhYmVscyxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgICAgIHZhciBzdHlsZVRleHQgPSBcIlwiO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxhYmVscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbHNba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuZ2VuQ29sb3JDb2RlRnJvbVRleHQobGFiZWwubmFtZSk7XG4gICAgICAgICAgICAgICAgc3R5bGVUZXh0ICs9IGAucmFkaW8tbGFiZWwgLiR7bGFiZWwubmFtZX0geyBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTsgfSBgO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9IHN0eWxlVGV4dDtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbm5vdGF0aW9uID0gdGhpcy5zdGF0ZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ub3RhdGlvbi5zdGFydCA8IGFubm90YXRpb24uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTGlzdC5zZXQodGhpcy5nZW5lcmF0ZVVVSUQoKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IGFubm90YXRpb24ucGF0dGVybixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogYW5ub3RhdGlvbi5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGFubm90YXRpb24uZW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBhbm5vdGF0aW9uLmxhYmVsLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZ2VuQ29sb3JDb2RlRnJvbVRleHQoYW5ub3RhdGlvbi5sYWJlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCB0aGlzLnJlbW92ZUxhYmVsLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFNlbGVjdGVkTGFiZWw6IGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gbGFiZWw7XG4gICAgICAgIH0sXG4gICAgICAgIGdlbkNvbG9yQ29kZUZyb21UZXh0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nVG9Db2xvdXIgPSAoc3RyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgaW5wdXQgc3RyaW5nIHRvIGxvd2VyY2FzZSB0byBlbnN1cmUgY29uc2lzdGVudCBjb2xvciBnZW5lcmF0aW9uXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaGFzaCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzaCA9IHN0ci5jaGFyQ29kZUF0KGkpICsgKChoYXNoIDw8IDUpIC0gaGFzaCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2F0dXJhdGlvbiA9IDAuNjsgLy8gU2F0dXJhdGlvbiBsZXZlbCAoMC4wIHRvIDEuMClcbiAgICAgICAgICAgICAgICBjb25zdCBsaWdodG5lc3MgPSAwLjU7IC8vIExpZ2h0bmVzcyBsZXZlbCAoMC4wIHRvIDEuMClcblxuICAgICAgICAgICAgICAgIC8vIEVuc3VyZSBodWUgdmFsdWVzIGFyZSBzcGFjZWQgb3V0IHRvIGF2b2lkIHRvbyBzaW1pbGFyIGNvbG9yc1xuICAgICAgICAgICAgICAgIGNvbnN0IGh1ZU9mZnNldCA9IGhhc2ggJSAzNjA7IC8vIFVzZSBoYXNoIHRvIG9mZnNldCBodWVcblxuICAgICAgICAgICAgICAgIGNvbnN0IGh1ZSA9IChodWVPZmZzZXQgKyAzNjApICUgMzYwOyAvLyBFbnN1cmUgaHVlIGlzIHdpdGhpbiBbMCwgMzYwKVxuXG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBIU0wgdG8gUkdCXG4gICAgICAgICAgICAgICAgY29uc3QgaCA9IGh1ZSAvIDM2MDtcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gc2F0dXJhdGlvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gbGlnaHRuZXNzO1xuXG4gICAgICAgICAgICAgICAgbGV0IHIsIGcsIGI7XG5cbiAgICAgICAgICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBBY2hyb21hdGljIChncmV5KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGh1ZVRvUmdiID0gKHAsIHEsIHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0IDwgMCkgdCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPiAxKSB0IC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA8IDEgLyA2KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPCAyIC8gMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSAyICogbCAtIHE7XG5cbiAgICAgICAgICAgICAgICAgICAgciA9IGh1ZVRvUmdiKHAsIHEsIGggKyAxIC8gMyk7XG4gICAgICAgICAgICAgICAgICAgIGcgPSBodWVUb1JnYihwLCBxLCBoKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IGh1ZVRvUmdiKHAsIHEsIGggLSAxIC8gMyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBSR0IgdG8gaGV4YWRlY2ltYWwgY29sb3JcbiAgICAgICAgICAgICAgICBjb25zdCB0b0hleCA9ICh4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhleCA9IE1hdGgucm91bmQoeCAqIDI1NSkudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/ICcwJyArIGhleCA6IGhleDtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3VyID0gYCMke3RvSGV4KHIpfSR7dG9IZXgoZyl9JHt0b0hleChiKX1gO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xvdXI7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nVG9Db2xvdXIodGV4dCk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICB1cGRhdGVTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxMaXN0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVtrZXldID0ge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB2YWx1ZS5wYXR0ZXJuLFxuICAgICAgICAgICAgICAgICAgICBzdGFydDogdmFsdWUuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogdmFsdWUuZW5kLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdmFsdWUubGFiZWwudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZ2VuQ29sb3JDb2RlRnJvbVRleHQodmFsdWUubGFiZWwpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYXJrVGV4dDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3RlZExhYmVsIHx8ICF0aGlzLnNlbGVjdGVkTGFiZWwubmFtZSB8fCBzZWxlY3Rpb24udG9TdHJpbmcoKS5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGV4dCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRPZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcbiAgICAgICAgICAgICAgICB2YXIgZW5kT2Zmc2V0ID0gcmFuZ2UuZW5kT2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgLy8gQWRqdXN0IHRoZSBzdGFydE9mZnNldCB0byB0aGUgc3RhcnQgb2YgdGhlIHdvcmRcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3RhcnRPZmZzZXQgPiAwICYmICEvXFxzLy50ZXN0KHJhbmdlLnN0YXJ0Q29udGFpbmVyLnRleHRDb250ZW50W3N0YXJ0T2Zmc2V0IC0gMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0LS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRqdXN0IHRoZSBlbmRPZmZzZXQgdG8gdGhlIGVuZCBvZiB0aGUgd29yZFxuICAgICAgICAgICAgICAgIHdoaWxlIChlbmRPZmZzZXQgPCByYW5nZS5zdGFydENvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGggJiYgIS9cXHMvLnRlc3QocmFuZ2Uuc3RhcnRDb250YWluZXIudGV4dENvbnRlbnRbZW5kT2Zmc2V0XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kT2Zmc2V0Kys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQocmFuZ2Uuc3RhcnRDb250YWluZXIsIHN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZXRFbmQocmFuZ2Uuc3RhcnRDb250YWluZXIsIGVuZE9mZnNldCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29tbW9uQW5jZXN0b3IgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5jYWxjdWxhdGVPZmZzZXQoc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50Tm9kZSwgc2VsZWN0aW9uLmFuY2hvck5vZGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gb2Zmc2V0ICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IG9mZnNldCArIHJhbmdlLmVuZE9mZnNldDtcblxuICAgICAgICAgICAgICAgIHZhciBpc1dpdGhpbkxhYmVsZWRTcGFuID1cbiAgICAgICAgICAgICAgICAgICAgY29tbW9uQW5jZXN0b3Iubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbkFuY2VzdG9yLmNsYXNzTGlzdC5jb250YWlucygnZHluYW1pYy1zcGFuJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzV2l0aGluTGFiZWxlZFNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYW55IHBhcnQgb2YgdGhlIHNlbGVjdGVkIHJhbmdlIGlzIGFscmVhZHkgbGFiZWxlZFxuICAgICAgICAgICAgICAgICAgICB2YXIgb3ZlcmxhcHBpbmdMYWJlbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTGlzdC5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZW5kIDw9IHZhbHVlLnN0YXJ0IHx8IHN0YXJ0ID49IHZhbHVlLmVuZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVybGFwcGluZ0xhYmVsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvdmVybGFwcGluZ0xhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxMaXN0LnNldChrZXksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiByYW5nZS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5zZWxlY3RlZExhYmVsLm5hbWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5nZW5Db2xvckNvZGVGcm9tVGV4dCh0aGlzLnNlbGVjdGVkTGFiZWwubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGV4dEZpZWxkKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmdlbkNvbG9yQ29kZUZyb21UZXh0KHRoaXMuc2VsZWN0ZWRMYWJlbC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnN1cnJvdW5kQ29udGVudHMobmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblxuICAgICAgICBjYWxjdWxhdGVPZmZzZXQ6IGZ1bmN0aW9uIChwYXJlbnROb2RlLCBzZWxlY3Rpb25Ob2RlKSB7XG4gICAgICAgICAgICB2YXIgdG90YWxMZW5ndGggPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBwYXJlbnROb2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT09IHNlbGVjdGlvbk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJDaGlsZCBvZiBjaGlsZC5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViQ2hpbGQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxMZW5ndGggKz0gc3ViQ2hpbGQudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxMZW5ndGggKz0gY2hpbGQudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b3RhbExlbmd0aDtcbiAgICAgICAgfSxcblxuICAgICAgICByZWZyZXNoVGV4dEZpZWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0SFRNTCA9ICcnO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBNYXAgdG8gYW4gYXJyYXkgb2YgZW50cmllcywgdGhlbiBzb3J0IGl0IGJhc2VkIG9uIHRoZSAnc3RhcnQnIHByb3BlcnR5XG4gICAgICAgICAgICBjb25zdCBzb3J0ZWRMYWJlbExpc3QgPSBbLi4udGhpcy5sYWJlbExpc3QuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdLnN0YXJ0IC0gYlsxXS5zdGFydCk7XG4gICAgICAgICAgICBzb3J0ZWRMYWJlbExpc3QuZm9yRWFjaCgoW2tleSwgbGFiZWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA8IGxhYmVsLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEhUTUwgKz0gdGhpcy50YXJnZXRUZXh0LnN1YnN0cmluZyhjdXJyZW50SW5kZXgsIGxhYmVsLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBhbm5vdGF0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIHJlc3VsdEhUTUwgKz0gdGhpcy5jcmVhdGVTcGFuKGxhYmVsLCBrZXkpO1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgY3VycmVudEluZGV4IHBhc3QgdGhpcyBhbm5vdGF0aW9uXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbGFiZWwuZW5kO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY3VycmVudEluZGV4IDwgdGhpcy50YXJnZXRUZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdEhUTUwgKz0gdGhpcy50YXJnZXRUZXh0LnN1YnN0cmluZyhjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gcmVzdWx0SFRNTDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVTcGFuOiBmdW5jdGlvbiAobGFiZWwsIGtleSkge1xuICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBuZXdOb2RlLmNsYXNzTGlzdC5hZGQoa2V5KTtcbiAgICAgICAgICAgIG5ld05vZGUuY2xhc3NMaXN0LmFkZCgnZHluYW1pYy1zcGFuJyk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gdGhpcy50YXJnZXRUZXh0LnN1YnN0cmluZyhsYWJlbC5zdGFydCwgbGFiZWwuZW5kKTtcbiAgICAgICAgICAgIG5ld05vZGUudGV4dENvbnRlbnQgPSBzZWxlY3RlZFRleHQ7XG4gICAgICAgICAgICBuZXdOb2RlLnN0eWxlLmJvcmRlckJvdHRvbSA9IGAzcHggc29saWQgJHtsYWJlbC5jb2xvcn1gO1xuICAgICAgICAgICAgdmFyIGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGxhYmVsLmxhYmVsO1xuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQgPSAnMC4zZW0nO1xuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGxhYmVsLmNvbG9yO1xuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSAnMC4yZW0nO1xuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcwLjJlbSc7XG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMC42ZW0nO1xuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnc3VwZXInO1xuICAgICAgICAgICAgbmV3Tm9kZS5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTGlzdC5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hUZXh0RmllbGQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld05vZGUub3V0ZXJIVE1MO1xuICAgICAgICB9LFxuXG5cblxuICAgICAgICByZW1vdmVMYWJlbDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHluYW1pYy1zcGFuJykpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCkuZmluZChjbHMgPT4gdGhpcy5sYWJlbExpc3QuaGFzKGNscykpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbExpc3QuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFRleHRGaWVsZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZW5lcmF0ZVVVSUQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAneHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDA7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xuICAgICAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59XG4iXSwKICAibWFw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QUksU0FBUztBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUksVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksTUFBTTtBQUN0QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFJLEdBQUksVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksU0FBUztBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUssVUFBVTtBQUUzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUssU0FBUztBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFJLEdBQUksUUFBUTtBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUksU0FBUztBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFJLEdBQUcsV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUssVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFJLEdBQUcsV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsU0FBUztBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUssVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksV0FBVztBQUUzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsT0FBTztBQUN2QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUssVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksU0FBUztBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUssVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFJLEdBQUksU0FBUztBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUssUUFBUTtBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUssU0FBUztBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksVUFBVTtBQUUxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUssVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksU0FBUztBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFJLEdBQUksVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksUUFBUTtBQUN4QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUksVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksU0FBUztBQUN6QyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUssVUFBVTtBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQyxHQUFJLEdBQUcsVUFBVTtBQUMxQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUUsRUFBRSxHQUFHLElBQUksV0FBVztBQUMzQyxjQUFJLEdBQUcsR0FBRyxHQUFHLEdB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
