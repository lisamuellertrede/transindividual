(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_server/server_settings.js
  var require_server_settings = __commonJS({
    "node_server/server_settings.js"(exports) {
      var settings3 = {
        debug: false,
        protocol: "http",
        host: "localhost",
        port: 8080,
        socket_protocol: "ws",
        hotreload: 5e3,
        python: 7e3,
        python_node: 7001,
        startpage: "BreathTrainer.html",
        errpage: "src/other/404.html",
        certpath: "node_server/ssl/cert.pem",
        keypath: "node_server/ssl/key.pem"
      };
      exports.settings = settings3;
    }
  });

  // src/components/sse.component.html
  var require_sse_component = __commonJS({
    "src/components/sse.component.html"(exports, module) {
      module.exports = '<div style="display:none">SSE Test Component (check console)</div>';
    }
  });

  // src/components/socket.component.html
  var require_socket_component = __commonJS({
    "src/components/socket.component.html"(exports, module) {
      module.exports = "<h3>Quart server test page (built from node):</h3>\n<br>\nWebSocket output:\n<ul></ul>";
    }
  });

  // src/components/component.html
  var require_component = __commonJS({
    "src/components/component.html"(exports, module) {
      module.exports = "<div>Hello World!</div>";
    }
  });

  // node_modules/fragelement/DOMElement.js
  var DOMElement = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "template", (props) => {
        return `<div> Custom Fragment Props: ${JSON.stringify(props)} </div>`;
      });
      __publicField(this, "props", { test: true });
      __publicField(this, "useShadow", false);
      __publicField(this, "oncreate");
      __publicField(this, "onresize");
      __publicField(this, "ondelete");
      __publicField(this, "onchanged");
      __publicField(this, "FRAGMENT");
      __publicField(this, "attachedShadow", false);
      __publicField(this, "obsAttributes", ["props", "options", "onchanged", "onresize", "ondelete", "oncreate", "template"]);
      __publicField(this, "delete", () => {
        this.remove();
        if (typeof this.ondelete === "function")
          this.ondelete(this.props);
      });
      __publicField(this, "render", (props = this.props) => {
        if (typeof this.template === "function")
          this.templateString = this.template(props);
        else
          this.templateString = this.template;
        const t = document.createElement("template");
        t.innerHTML = this.templateString;
        const fragment = t.content;
        if (this.FRAGMENT) {
          if (this.useShadow) {
            this.shadowRoot.removeChild(this.FRAGMENT);
          } else
            this.removeChild(this.FRAGMENT);
        }
        if (this.useShadow) {
          if (!this.attachedShadow)
            this.attachShadow({ mode: "open" });
          this.shadowRoot.appendChild(fragment);
          this.FRAGMENT = this.shadowRoot.childNodes[this.shadowRoot.childNodes.length - 1];
        } else
          this.appendChild(fragment);
        this.FRAGMENT = this.childNodes[this.childNodes.length - 1];
        if (this.oncreate)
          this.oncreate(props);
      });
      __publicField(this, "state", {
        pushToState: {},
        data: {},
        triggers: {},
        setState(updateObj) {
          Object.assign(this.pushToState, updateObj);
          if (Object.keys(this.triggers).length > 0) {
            for (const prop of Object.getOwnPropertyNames(this.triggers)) {
              if (this.pushToState[prop]) {
                this.data[prop] = this.pushToState[prop];
                delete this.pushToState[prop];
                this.triggers[prop].forEach((obj) => {
                  obj.onchanged(this.data[prop]);
                });
              }
            }
          }
          return this.pushToState;
        },
        subscribeTrigger(key, onchanged = (res) => {
        }) {
          if (key) {
            if (!this.triggers[key]) {
              this.triggers[key] = [];
            }
            let l = this.triggers[key].length;
            this.triggers[key].push({ idx: l, onchanged });
            return this.triggers[key].length - 1;
          } else
            return void 0;
        },
        unsubscribeTrigger(key, sub) {
          let idx = void 0;
          let triggers = this.triggers[key];
          if (triggers) {
            if (!sub)
              delete this.triggers[key];
            else {
              let obj = triggers.find((o) => {
                if (o.idx === sub) {
                  return true;
                }
              });
              if (obj)
                triggers.splice(idx, 1);
              return true;
            }
          }
        },
        subscribeTriggerOnce(key = void 0, onchanged = (value) => {
        }) {
          let sub;
          let changed = (value) => {
            onchanged(value);
            this.unsubscribeTrigger(key, sub);
          };
          sub = this.subscribeTrigger(key, changed);
        }
      });
    }
    get observedAttributes() {
      return this.obsAttributes;
    }
    get obsAttributes() {
      return this.obsAttributes;
    }
    set obsAttributes(att) {
      if (typeof att === "string") {
        this.obsAttributes.push(att);
      } else if (Array.isArray(att))
        this.obsAttributes = att;
    }
    static get tag() {
      return this.name.toLowerCase() + "-";
    }
    static addElement(tag = this.tag, cls = this, extend = void 0) {
      addCustomElement(cls, tag, extend);
    }
    attributeChangedCallback(name, old, val) {
      if (name === "onchanged") {
        let onchanged = val;
        if (typeof onchanged === "string")
          onchanged = parseFunctionFromText(onchanged);
        if (typeof onchanged === "function") {
          this.onchanged = onchanged;
          this.state.data.props = this.props;
          this.state.unsubscribeTrigger("props");
          this.state.subscribeTrigger("props", this.onchanged);
          let changed = new CustomEvent("changed", { detail: { props: this.props } });
          this.state.subscribeTrigger("props", () => {
            this.dispatchEvent(changed);
          });
        }
      } else if (name === "onresize") {
        let onresize = val;
        if (typeof onresize === "string")
          onresize = parseFunctionFromText(onresize);
        if (typeof onresize === "function") {
          if (this.ONRESIZE) {
            try {
              window.removeEventListener("resize", this.ONRESIZE);
            } catch (err2) {
            }
          }
          this.ONRESIZE = (ev) => {
            this.onresize(this.props);
          };
          this.onresize = onresize;
          window.addEventListener("resize", this.ONRESIZE);
        }
      } else if (name === "ondelete") {
        let ondelete = val;
        if (typeof ondelete === "string")
          ondelete = parseFunctionFromText(ondelete);
        if (typeof ondelete === "function") {
          this.ondelete = () => {
            if (this.ONRESIZE)
              window.removeEventListener("resize", this.ONRESIZE);
            this.state.unsubscribeTrigger("props");
            if (ondelete)
              ondelete(this.props);
          };
        }
      } else if (name === "oncreate") {
        let oncreate = val;
        if (typeof oncreate === "string")
          oncreate = parseFunctionFromText(oncreate);
        if (typeof oncreate === "function") {
          this.oncreate = oncreate;
        }
      } else if (name === "props") {
        let newProps = val;
        if (typeof newProps === "string")
          newProps = JSON.parse(newProps);
        Object.assign(this.props, newProps);
        this.state.setState({ props: this.props });
      } else if (name === "template") {
        let template = val;
        this.template = options.template;
        if (typeof template === "function")
          this.templateString = this.template(this.props);
        else
          this.templateString = template;
        this.render(this.props);
        let created = new CustomEvent("created", { detail: { props: this.props } });
        this.dispatchEvent(created);
      } else {
        let parsed = val;
        if (name.includes("eval_")) {
          name = name.split("_");
          name.shift();
          name = name.join();
          parsed = parseFunctionFromText(val);
        } else if (typeof val === "string") {
          try {
            parsed = JSON.parse(val);
          } catch (err2) {
            parsed = val;
          }
        }
        this[name] = parsed;
        this.props[name] = parsed;
      }
    }
    connectedCallback() {
      let newProps = this.getAttribute("props");
      if (typeof newProps === "string")
        newProps = JSON.parse(newProps);
      Object.assign(this.props, newProps);
      this.state.setState({ props: this.props });
      Array.from(this.attributes).forEach((att) => {
        let name = att.name;
        let parsed = att.value;
        if (name.includes("eval_")) {
          name = name.split("_");
          name.shift();
          name = name.join();
          parsed = parseFunctionFromText(att.value);
        } else if (typeof att.value === "string") {
          try {
            parsed = JSON.parse(att.value);
          } catch (err2) {
            parsed = att.value;
          }
        }
        if (!this[name]) {
          Object.defineProperties(this, att, {
            value: parsed,
            writable: true,
            get() {
              return this[name];
            },
            set(val) {
              this.setAttribute(name, val);
            }
          });
        }
        this[name] = parsed;
        this.props[name] = parsed;
        this.obsAttributes.push(name);
      });
      let resizeevent = new CustomEvent("resized", { detail: { props: this.props } });
      let changed = new CustomEvent("changed", { detail: { props: this.props } });
      let deleted = new CustomEvent("deleted", { detail: { props: this.props } });
      let created = new CustomEvent("created", { detail: { props: this.props } });
      this.render(this.props);
      this.dispatchEvent(created);
      this.state.subscribeTrigger("props", () => {
        this.dispatchEvent(changed);
      });
      if (typeof this.onresize === "function") {
        if (this.ONRESIZE) {
          try {
            window.removeEventListener("resize", this.ONRESIZE);
          } catch (err2) {
          }
        }
        this.ONRESIZE = (ev) => {
          this.onresize(this.props);
        };
        window.addEventListener("resize", this.ONRESIZE);
      }
      if (typeof this.ondelete === "function") {
        let ondelete = this.ondelete;
        this.ondelete = (props = this.props) => {
          if (this.ONRESIZE)
            window.removeEventListener("resize", this.ONRESIZE);
          this.state.unsubscribeTrigger("props");
          ondelete(props);
        };
      }
      if (typeof this.onchanged === "function") {
        this.state.data.props = this.props;
        this.state.subscribeTrigger("props", this.onchanged);
      }
    }
    get props() {
      return this.props;
    }
    set props(newProps = {}) {
      this.setAttribute("props", newProps);
    }
    get template() {
      return this.template;
    }
    set template(template) {
      this.setAttribute("template", template);
    }
    get render() {
      return this.render;
    }
    get delete() {
      return this.delete;
    }
    get state() {
      return this.state;
    }
    get onchanged() {
      return this.onchanged;
    }
    set onchanged(onchanged) {
      this.setAttribute("onchanged", onchanged);
    }
    get onresize() {
      return this.props;
    }
    set onresize(onresize) {
      this.setAttribute("onresize", onresize);
    }
    get ondelete() {
      return this.props;
    }
    set ondelete(ondelete) {
      this.setAttribute("ondelete", ondelete);
    }
    get oncreate() {
      return this.oncreate;
    }
    set oncreate(oncreate) {
      this.setAttribute("oncreated", oncreate);
    }
  };
  function addCustomElement(cls, tag, extend = null) {
    try {
      if (extend) {
        if (tag)
          window.customElements.define(tag, cls, { extends: extend });
        else
          window.customElements.define(cls.name.toLowerCase() + "-", cls, { extends: extend });
      } else {
        if (tag)
          window.customElements.define(tag, cls);
        else
          window.customElements.define(cls.name.toLowerCase() + "-", cls);
      }
    } catch (err2) {
    }
  }
  function randomId(tag = "") {
    return tag + Math.floor(Math.random() * 1e15);
  }
  function parseFunctionFromText(method) {
    let getFunctionBody = (methodString) => {
      return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
    };
    let getFunctionHead = (methodString) => {
      let startindex = methodString.indexOf(")");
      return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
    };
    let newFuncHead = getFunctionHead(method);
    let newFuncBody = getFunctionBody(method);
    let newFunc;
    try {
      if (newFuncHead.includes("function ")) {
        let varName = newFuncHead.split("(")[1].split(")")[0];
        newFunc = new Function(varName, newFuncBody);
      } else {
        if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
          let varName = newFuncHead.split("(")[1].split(")")[0];
          newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
        } else {
          try {
            newFunc = eval(newFuncHead + newFuncBody + "}");
          } catch (err) {
            newFunc = eval(method);
          }
        }
      }
    } catch (err2) {
    }
    return newFunc;
  }

  // src/components/sse.component.js
  var import_server_settings = __toESM(require_server_settings());
  var component = require_sse_component();
  var SSE = class extends DOMElement {
    constructor() {
      super(...arguments);
      __publicField(this, "props", { host: import_server_settings.settings.host, port: import_server_settings.settings.python, es: void 0 });
      __publicField(this, "template", component);
      __publicField(this, "oncreate", (props) => {
        props.es = new EventSource(`http://${props.host}:${props.port}/sse`);
        props.es.onmessage = function(event) {
          console.log("Event Source:", event.data);
        };
      });
      __publicField(this, "ondelete", (props) => {
        props.es.close();
      });
    }
  };
  addCustomElement(SSE, "sse-test");

  // src/components/socket.component.js
  var import_server_settings2 = __toESM(require_server_settings());
  var component2 = require_socket_component();
  var Socket = class extends DOMElement {
    constructor() {
      super(...arguments);
      __publicField(this, "props", { host: import_server_settings2.settings.host, port: import_server_settings2.settings.python, ws: void 0 });
      __publicField(this, "template", component2);
      __publicField(this, "oncreate", (props) => {
        props.ws = new WebSocket(`ws://${props.host}:${props.port}/`);
        props.ws.onmessage = (event) => {
          const messagesDOM = this.getElementsByTagName("ul")[0];
          const messageDOM = document.createElement("li");
          const message = event.data;
          const contentDOM = document.createTextNode(message);
          messageDOM.appendChild(contentDOM);
          messagesDOM.appendChild(messageDOM);
        };
      });
      __publicField(this, "ondelete", (props) => {
        props.ws.close();
      });
    }
  };
  addCustomElement(Socket, "socket-test");

  // src/components/component.js
  var component3 = require_component();
  var Custom = class extends DOMElement {
    constructor() {
      super(...arguments);
      __publicField(this, "props", {});
      __publicField(this, "template", component3);
      __publicField(this, "oncreate", (props) => {
        console.log("Custom html component created!");
      });
      __publicField(this, "ondelete", (props) => {
        console.log("Custom html component deleted!");
      });
    }
  };
  Custom.addElement("custom-");

  // node_modules/objectlisteners/ObjectListener.js
  var ObjectListener = class {
    constructor(debug = false, synchronous = false) {
      __publicField(this, "addFunc", (key = null, newCallback = null, start = true) => {
        var callbackIdx = null;
        if (newCallback !== null) {
          if (key == null) {
            this.listeners.forEach((obj, i) => {
              callbackIdx = obj.listener.addFunc(newCallback);
              if (obj.listener.running == false && start == true)
                obj.listener.start();
            });
          } else {
            var found = this.listeners.find((obj, i) => {
              if (obj.key === key) {
                callbackIdx = obj.listener.addFunc(newCallback);
                if (obj.listener.running == false && start == true)
                  obj.listener.start();
              }
            });
          }
        }
        return callbackIdx;
      });
      __publicField(this, "getFuncs", (key = void 0) => {
        if (key) {
          var found = this.listeners.find((o, i) => {
            if (o.key === key) {
              return true;
            }
          });
          return found.onchangeFuncs;
        } else
          return void 0;
      });
      __publicField(this, "removeFuncs", (key = null, idx = null, stop = false) => {
        if (key == null) {
          this.listeners.forEach((obj, i) => {
            obj.listener.removeFuncs(idx);
          });
        } else {
          var found = this.listeners.find((o, i) => {
            if (o.key === key) {
              o.listener.removeFuncs(idx);
              if (o.listener.onchangeFuncs.length === 0 || stop === true) {
                o.listener.stop();
              }
            }
          });
        }
      });
      this.debug = debug;
      this.listeners = [];
      this.synchronous = synchronous;
      this.syncInterval = "FRAMERATE";
      this.syncAnim = void 0;
      if (synchronous === true)
        this.startSync();
    }
    addListener(listenerKey = null, objectToListenTo, propToListenTo = void 0, onchange = void 0, interval = void 0, debug = this.debug, startRunning = true) {
      if (objectToListenTo === void 0) {
        console.error("You must assign an object");
        return;
      }
      var key = listenerKey;
      if (key == null) {
        key = Math.floor(Math.random() * 1e5);
      }
      if (this.synchronous === true)
        startRunning = false;
      var listener = { key, listener: new ObjectListenerInstance(objectToListenTo, propToListenTo, onchange, interval, debug, startRunning) };
      this.listeners.push(listener);
    }
    getListener(key) {
      let found = this.listeners.find((item, i) => {
        if (item.key === key)
          return true;
      });
      return found;
    }
    hasKey(key) {
      var found = false;
      this.listeners.forEach((item, i) => {
        if (item.key === key) {
          found = true;
          return true;
        }
      });
      return found;
    }
    getKeyIndices(key) {
      var indices = [];
      this.listeners.find((o, i) => {
        if (o.key === key) {
          indices.push(i);
        }
      });
      return indices;
    }
    onchange(key = null, newCallback = null) {
      if (key == null) {
        this.listeners.forEach((obj, i) => {
          obj.listener.onchange = newCallback;
        });
      } else {
        var found = this.listeners.find((o, i) => {
          if (o.name === key) {
            o.listener.onchange = newCallback;
          }
        });
      }
    }
    stop(key = null) {
      if (this.synchronous)
        this.stopSync();
      if (key == null) {
        this.listeners.forEach((obj, i) => {
          obj.listener.stop();
        });
      } else {
        var found = this.listeners.find((o, i) => {
          if (o.name === key) {
            o.listener.stop();
          }
        });
      }
    }
    start(key = null) {
      if (this.synchronous)
        this.stopSync();
      if (key == null) {
        this.listeners.forEach((obj, i) => {
          obj.listener.start();
        });
      } else {
        var found = this.listeners.find((o, i) => {
          if (o.name === key) {
            o.listener.start();
          }
        });
      }
    }
    startSync() {
      if (this.synchronous === false) {
        this.synchronous = true;
        this.stop();
        let runChecks = () => {
          if (this.synchronous === true) {
            this.listeners.forEach((l) => {
              l.listener.check();
            });
            if (this.syncInterval === "FRAMERATE") {
              this.syncAnim = requestAnimationFrame(runChecks);
            } else if (typeof this.syncInterval === "number") {
              setTimeout(runChecks, this.syncInterval);
            }
          }
        };
        runChecks();
      }
    }
    stopSync() {
      this.synchronous = false;
      if (this.syncAnim)
        cancelAnimationFrame(this.syncAnim);
    }
    remove(key = null) {
      if (key == null) {
        this.listeners.forEach((o) => {
          o.listener.stop();
        });
        this.listeners.splice(0, this.listeners.length);
      } else {
        var indices = [];
        var found = this.listeners.forEach((o, i) => {
          if (o.key === key) {
            indices.push(i);
          }
        });
        indices.reverse().forEach((idx) => {
          this.listeners[idx].listener.stop();
          this.listeners.splice(idx, 1);
        });
      }
    }
  };
  var ObjectListenerInstance = class {
    constructor(object, propName = "__ANY__", onchange = this.onchange, interval = "FRAMERATE", debug = false, startRunning = true) {
      __publicField(this, "onchange", (newData) => {
        console.log(this.propName, " changed from: ", this.propOld, " to: ", this.object[this.propName]);
      });
      __publicField(this, "addFunc", (onchange = null) => {
        let sub = 0;
        if (onchange !== null) {
          this.onchangeFuncs.push({ idx: this.funcs, onchange });
          sub = this.funcs;
          this.funcs++;
        }
        return sub;
      });
      __publicField(this, "onchangeMulti", (newData) => {
        let onChangeCache = [...this.onchangeFuncs];
        onChangeCache.forEach((func, i) => {
          if (this.debug === true) {
            console.log(func.onchange);
          }
          func.onchange(newData);
        });
      });
      __publicField(this, "setListenerRef", (propName) => {
        if (propName === "__ANY__" || propName === null || propName === void 0) {
          this.propOld = JSON.stringifyFast(this.object);
        } else if (Array.isArray(this.object[propName])) {
          this.propOld = JSON.stringifyFast(this.object[propName].slice(this.object[propName].length - 20));
        } else if (typeof this.object[propName] === "object") {
          this.propOld = JSON.stringifyFast(this.object[propName]);
        } else if (typeof this.object[propName] === "function") {
          this.propOld = this.object[propName].toString();
        } else {
          this.propOld = this.object[propName];
        }
        if (this.debug === true) {
          console.log("propname", propName, ", new assignment: ", this.propOld);
        }
      });
      __publicField(this, "check", () => {
        let changed = false;
        if (this.propName === "__ANY__" || this.propName === null || this.propName === void 0) {
          if (this.propOld !== JSON.stringifyFast(this.object)) {
            if (this.debug === true) {
              console.log("onchange: ", this.onchange);
            }
            this.onchange(this.object);
            if (this.onchangeFuncs.length > 0) {
              this.onchangeMulti(this.object);
            }
            this.setListenerRef(this.propName);
            changed = true;
          }
        } else if (Array.isArray(this.object[this.propName])) {
          if (this.propOld !== JSON.stringifyFast(this.object[this.propName].slice(this.object[this.propName].length - 20))) {
            if (this.debug === true) {
              console.log("onchange: ", this.onchange);
            }
            this.onchange(this.object[this.propName]);
            if (this.onchangeFuncs.length > 0) {
              this.onchangeMulti(this.object[this.propName]);
            }
            this.setListenerRef(this.propName);
            changed = true;
          }
        } else if (typeof this.object[this.propName] === "object") {
          let string = JSON.stringifyFast(this.object[this.propName]);
          if (this.propOld !== string) {
            if (this.debug === true) {
              console.log("onchange: ", this.onchange);
            }
            this.onchange(this.object[this.propName]);
            if (this.onchangeFuncs.length > 0) {
              this.onchangeMulti(this.object[this.propName]);
            }
            this.setListenerRef(this.propName);
            changed = true;
          }
        } else if (typeof this.object[this.propName] === "function") {
          if (this.propOld !== this.object[this.propName].toString()) {
            if (this.debug === true) {
              console.log("onchange: ", this.onchange);
            }
            this.onchange(this.object[this.propName].toString());
            if (this.onchangeFuncs.length > 0) {
              this.onchangeMulti(this.object[this.propName].toString());
            }
            this.setListenerRef(this.propName);
            changed = true;
          }
        } else if (this.object[this.propName] !== this.propOld) {
          if (this.debug === true) {
            console.log("onchange: ", this.onchange);
          }
          this.onchange(this.object[this.propName]);
          if (this.onchangeFuncs.length > 0) {
            this.onchangeMulti(this.object[this.propName]);
          }
          this.setListenerRef(this.propName);
          changed = true;
        }
        if (this.running === true) {
          if (this.debug === true) {
            console.log("checking", this.object, this.propName);
          }
          if (this.interval === "FRAMERATE") {
            if (typeof window === "undefined") {
              setTimeout(() => {
                this.check();
              }, 16);
            } else {
              this.checker = requestAnimationFrame(this.check);
            }
          } else {
            setTimeout(() => {
              this.check();
            }, this.interval);
          }
        }
        ;
        return changed;
      });
      this.debug = debug;
      this.onchange = onchange;
      this.onchangeFuncs = [];
      this.object = object;
      this.propName = propName;
      this.propOld = void 0;
      this.setListenerRef(propName);
      this.running = startRunning;
      this.funcs = 0;
      this.interval;
      if (interval < 10) {
        this.interval = 10;
        console.log("Min recommended interval set: 10ms");
      } else {
        this.interval = interval;
      }
      if (startRunning === true) {
        if (typeof window === "undefined") {
          setTimeout(() => {
            this.check();
          }, 60);
        } else {
          this.checker = requestAnimationFrame(this.check);
        }
      }
    }
    removeFuncs(idx = null) {
      let i = 0;
      if (idx === null) {
        this.onchangeFuncs = [];
      } else if (this.onchangeFuncs.find((o, j) => {
        if (o.idx === idx) {
          i = j;
          return true;
        }
      }) !== void 0) {
        this.onchangeFuncs.splice(i, 1);
      }
    }
    start() {
      this.running = true;
      if (typeof window === "undefined") {
        setTimeout(() => {
          this.check();
        }, 16);
      } else {
        this.checker = requestAnimationFrame(this.check);
      }
    }
    stop() {
      this.running = false;
      cancelAnimationFrame(this.checker);
    }
  };
  if (JSON.stringifyFast === void 0) {
    JSON.stringifyFast = function() {
      const refs = /* @__PURE__ */ new Map();
      const parents = [];
      const path = ["this"];
      function clear() {
        refs.clear();
        parents.length = 0;
        path.length = 1;
      }
      function updateParents(key, value) {
        var idx = parents.length - 1;
        if (parents[idx]) {
          var prev = parents[idx];
          if (typeof prev === "object") {
            if (prev[key] === value || idx === 0) {
              path.push(key);
              parents.push(value.pushed);
            } else {
              while (idx-- >= 0) {
                prev = parents[idx];
                if (typeof prev === "object") {
                  if (prev[key] === value) {
                    idx += 2;
                    parents.length = idx;
                    path.length = idx;
                    --idx;
                    parents[idx] = value;
                    path[idx] = key;
                    break;
                  }
                }
                idx--;
              }
            }
          }
        }
      }
      function checkValues(key, value) {
        let val;
        if (value != null) {
          if (typeof value === "object") {
            let c = value.constructor.name;
            if (key && c === "Object") {
              updateParents(key, value);
            }
            let other = refs.get(value);
            if (other) {
              return "[Circular Reference]" + other;
            } else {
              refs.set(value, path.join("."));
            }
            if (c === "Array") {
              if (value.length > 20) {
                val = value.slice(value.length - 20);
              } else
                val = value;
            } else if (c.includes("Set")) {
              val = Array.from(value);
            } else if (c !== "Object" && c !== "Number" && c !== "String" && c !== "Boolean") {
              val = "instanceof_" + c;
            } else if (c === "Object") {
              let obj = {};
              for (const prop in value) {
                if (value[prop] == null) {
                  obj[prop] = value[prop];
                } else if (Array.isArray(value[prop])) {
                  if (value[prop].length > 20)
                    obj[prop] = value[prop].slice(value[prop].length - 20);
                  else
                    obj[prop] = value[prop];
                } else if (value[prop].constructor.name === "Object") {
                  obj[prop] = {};
                  for (const p in value[prop]) {
                    if (Array.isArray(value[prop][p])) {
                      if (value[prop][p].length > 20)
                        obj[prop][p] = value[prop][p].slice(value[prop][p].length - 20);
                      else
                        obj[prop][p] = value[prop][p];
                    } else {
                      if (value[prop][p] != null) {
                        let con = value[prop][p].constructor.name;
                        if (con.includes("Set")) {
                          obj[prop][p] = Array.from(value[prop][p]);
                        } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                          obj[prop][p] = "instanceof_" + con;
                        } else {
                          obj[prop][p] = value[prop][p];
                        }
                      } else {
                        obj[prop][p] = value[prop][p];
                      }
                    }
                  }
                } else {
                  let con = value[prop].constructor.name;
                  if (con.includes("Set")) {
                    obj[prop] = Array.from(value[prop]);
                  } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                    obj[prop] = "instanceof_" + con;
                  } else {
                    obj[prop] = value[prop];
                  }
                }
              }
              val = obj;
            } else {
              val = value;
            }
          } else {
            val = value;
          }
        }
        return val;
      }
      return function stringifyFast(obj, space) {
        parents.push(obj);
        let res = JSON.stringify(obj, checkValues, space);
        clear();
        return res;
      };
    }();
  }
  if (JSON.stringifyWithCircularRefs === void 0) {
    JSON.stringifyWithCircularRefs = function() {
      const refs = /* @__PURE__ */ new Map();
      const parents = [];
      const path = ["this"];
      function clear() {
        refs.clear();
        parents.length = 0;
        path.length = 1;
      }
      function updateParents(key, value) {
        var idx = parents.length - 1;
        var prev = parents[idx];
        if (prev[key] === value || idx === 0) {
          path.push(key);
          parents.push(value);
        } else {
          while (idx-- >= 0) {
            prev = parents[idx];
            if (prev[key] === value) {
              idx += 2;
              parents.length = idx;
              path.length = idx;
              --idx;
              parents[idx] = value;
              path[idx] = key;
              break;
            }
          }
        }
      }
      function checkCircular(key, value) {
        if (value != null) {
          if (typeof value === "object") {
            if (key) {
              updateParents(key, value);
            }
            let other = refs.get(value);
            if (other) {
              return "[Circular Reference]" + other;
            } else {
              refs.set(value, path.join("."));
            }
          }
        }
        return value;
      }
      return function stringifyWithCircularRefs(obj, space) {
        try {
          parents.push(obj);
          return JSON.stringify(obj, checkCircular, space);
        } finally {
          clear();
        }
      };
    }();
  }
  var ObjectListener_default = ObjectListener;

  // src/DOMFragment.js
  var DOMFragment = class {
    constructor(templateStringGen = this.templateStringGen, parentNode = document.body, props = {}, onRender = (props2) => {
    }, onchange = (props2) => {
    }, propUpdateInterval = "NEVER", ondelete = (props2) => {
    }, onresize = void 0) {
      __publicField(this, "onchange", (props = this.renderSettings.props) => {
      });
      __publicField(this, "onRender", (props = this.renderSettings.props) => {
      });
      __publicField(this, "ondelete", (props = this.renderSettings.props) => {
      });
      __publicField(this, "onresize");
      __publicField(this, "isElement", (element) => {
        return element instanceof Element || element instanceof HTMLDocument;
      });
      this.onRender = onRender;
      this.onchange = onchange;
      this.ondelete = ondelete;
      this.onresize = onresize;
      this.parentNode = parentNode;
      if (typeof parentNode === "string") {
        this.parentNode = document.getElementById(parentNode);
      }
      this.renderSettings = {
        templateStringGen,
        props
      };
      this.props = this.renderSettings.props;
      this.templateString = ``;
      if (typeof templateStringGen === "function") {
        this.templateString = templateStringGen(props);
      } else {
        this.templateString = templateStringGen;
      }
      var interval = propUpdateInterval;
      if (Object.keys(this.renderSettings.props).length === 0) {
        interval = "NEVER";
      }
      this.node = null;
      this.listener = void 0;
      if (Object.keys(this.renderSettings.props).length > 0 && !(interval === null || interval === void 0 || interval === "NEVER")) {
        console.log("making listeners for ", templateStringGen);
        this.listener = new ObjectListener_default();
        const templateChange = () => {
          this.updateNode();
        };
        this.listener.addListener("templateChange", this.renderSettings, "templateStringGen", templateChange, interval);
        const propsChange = () => {
          this.updateNode();
          this.onchange();
        };
        this.listener.addListener("props", this.renderSettings, "props", propsChange, interval);
      }
      this.renderNode();
    }
    appendFragment(toAppend, parentNode) {
      if (this.isElement(toAppend))
        parentNode.appendChild(toAppend);
      else {
        var template = document.createElement("template");
        template.innerHTML = toAppend;
        var fragment = template.content;
        parentNode.appendChild(fragment);
      }
      return parentNode.children[parentNode.children.length - 1];
    }
    deleteFragment(parentNode, nodeId) {
      this.ondelete(this.renderSettings.props);
      var node = document.getElementById(nodeId);
      parentNode.removeChild(node);
    }
    removeParent(elementId) {
      if (typeof this.onresize === "function") {
        this.removeNodeResizing();
      }
      this.ondelete(this.renderSettings.props);
      var element = document.getElementById(elementId);
      element.parentNode.parentNode.removeChild(element.parentNode);
    }
    renderNode(parentNode = this.parentNode) {
      this.node = this.appendFragment(this.templateString, parentNode);
      this.onRender(this.renderSettings.props);
      if (typeof this.onresize === "function") {
        this.setNodeResizing();
      }
    }
    setNodeResizing() {
      if (typeof this.onresize === "function") {
        if (window.attachEvent) {
          window.attachEvent("onresize", this.onresize);
        } else if (window.addEventListener) {
          window.addEventListener("resize", this.onresize, true);
        }
      }
    }
    removeNodeResizing() {
      if (typeof this.onresize === "function") {
        if (window.detachEvent) {
          window.detachEvent("onresize", this.onresize);
        } else if (window.removeEventListener) {
          window.removeEventListener("resize", this.onresize, true);
        }
      }
    }
    updateNode(parentNode = this.parentNode, node = this.node, props = this.props) {
      parentNode.removeChild(node);
      if (typeof this.renderSettings.templateStringGen === "function") {
        this.templateString = this.renderSettings.templateStringGen(this.props);
      } else {
        this.templateString = this.renderSettings.templateStringGen;
      }
      this.renderNode(parentNode, props);
    }
    deleteNode(node = this.node) {
      if (typeof this.onresize === "function") {
        this.removeNodeResizing();
      }
      if (typeof node === "string") {
        this.ondelete(this.renderSettings.props);
        thisNode = document.getElementById(node);
        thisNode.parentNode.removeChild(thisNode);
        this.node = null;
      } else if (typeof node === "object") {
        this.ondelete(this.renderSettings.props);
        if (node)
          node.parentNode.removeChild(node);
        this.node = null;
      }
    }
    appendStylesheet(styles = "", node = this.node) {
      if (typeof styles === "string") {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = styles;
        node.insertAdjacentElement("afterbegin", link);
      } else if (Array.isArray(styles)) {
        styles.forEach((style) => {
          var link2 = document.createElement("link");
          link2.rel = "stylesheet";
          link2.type = "text/css";
          link2.href = style;
          node.insertAdjacentElement("afterbegin", link2);
        });
      } else if (typeof styles === "function") {
        let styleResult = styles();
        if (node) {
          if (typeof styleResult === "string")
            node.insertAdjacentHTML("afterbegin", styleResult);
          else
            node.insertAdjacentElement("afterbegin", styleResult);
        }
      }
    }
  };

  // ../src/Sound.js
  var SoundJS = class {
    constructor() {
      __publicField(this, "finishedLoading", (bufferList) => {
        let newBufferSourceIndices = [];
        bufferList.forEach((element) => {
          this.sourceList.push(this.ctx.createBufferSource());
          var idx = this.sourceList.length - 1;
          newBufferSourceIndices.push(idx);
          let sauce = this.sourceList[idx];
          this.sourceGains.push(this.ctx.createGain());
          let gainz = this.sourceGains[idx];
          sauce.buffer = element;
          sauce.onended = () => {
            sauce.disconnect();
            gainz.disconnect();
            let l = 0, k = 0;
            this.sourceList.find((o, j) => {
              if (JSON.stringify(o) === JSON.stringify(sauce)) {
                l = j;
                this.sourceList.splice(l, 1);
                return true;
              }
            });
            this.sourceGains.find((o, j) => {
              if (JSON.stringify(o) === JSON.stringify(gainz)) {
                k = j;
                this.sourceGains.splice(k, 1);
                return true;
              }
            });
          };
          sauce.connect(gainz);
          gainz.connect(this.gainNode);
        });
        return newBufferSourceIndices;
      });
      window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
      this.ctx = null;
      try {
        this.ctx = new AudioContext();
      } catch (e) {
        alert("Your browser does not support AudioContext!");
        console.log(e);
      }
      this.sourceList = [];
      this.sourceGains = [];
      this.recordedData = [];
      this.recorder = null;
      this.buffer = [];
      this.osc = [];
      this.gainNode = this.ctx.createGain();
      this.analyserNode = this.ctx.createAnalyser();
      this.out = this.ctx.destination;
      this.gainNode.connect(this.analyserNode);
      this.analyserNode.connect(this.out);
    }
    playFreq(freq = [1e3], seconds = 0, type = "sine", startTime = this.ctx.currentTime) {
      freq.forEach((element) => {
        var len = this.osc.length;
        this.osc[len] = this.ctx.createOscillator();
        this.osc[len].start();
        this.osc[len].onended = () => {
          this.osc[len].disconnect();
          this.osc.splice(len, 1);
        };
        this.osc[len].type = type;
        this.osc[len].connect(this.gainNode);
        this.osc[len].frequency.setValueAtTime(element, startTime);
        if (seconds != 0) {
          this.osc[len].stop(startTime + seconds);
        }
      });
    }
    stopFreq(firstIndex = 0, number = 1, delay = 0) {
      for (var i = firstIndex; i < number; i++) {
        if (this.osc[oscIndex]) {
          this.osc[oscIndex].stop(this.ctx.currentTime + delay);
        } else {
          console.log("No oscillator found.");
        }
      }
    }
    addSounds(urlList = [""], onReady = (sourceListIdx) => {
    }, onBeginDecoding = () => {
    }, canAddFile = false) {
      if (typeof urlList === "string")
        urlList = [urlList];
      var bufferLoader = new BufferLoader(this, urlList, this.finishedLoading, onReady, onBeginDecoding);
      bufferLoader.load(canAddFile);
    }
    copySound(soundbuffer) {
      let buf = this.ctx.createBuffer(soundbuffer.buffers.length, soundbuffer.duration / soundbuffer.samplerate, soundbuffer.samplerate);
      soundbuffer.buffers.forEach((b, j) => {
        if (typeof b === "string")
          buf.copyToChannel(Float32Array.from(textdecoder.decode(b)), j + 1, 0);
        else
          buf.copyToChannel(b, j + 1, 0);
      });
      let newSourceIndices = this.finishedLoading([buf]);
      return newSourceIndices[0];
    }
    decodeLocalAudioFile(onReady = (sourceListIdx) => {
    }, onBeginDecoding = () => {
    }) {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "audio/*";
      input.onchange = (e) => {
        if (e.target.files.length !== 0) {
          var file = e.target.files[0];
          var fr = new FileReader();
          fr.onload = (ev) => {
            var fileResult = ev.target.result;
            if (this.ctx === null) {
              return;
            }
            ;
            onBeginDecoding();
            this.ctx.decodeAudioData(fileResult, (buffer2) => {
              this.finishedLoading([buffer2]);
              onReady(this.sourceList.length - 1);
            }, (er) => {
              console.error(er);
            });
          };
          fr.onerror = function(er) {
            console.error(er);
          };
          fr.readAsArrayBuffer(file);
        }
      };
      input.click();
    }
    playSound(bufferIndex, seconds = 0, repeat = false, startTime = this.ctx.currentTime) {
      if (repeat === true) {
        this.sourceList[bufferIndex].loop = true;
      }
      this.sourceList[bufferIndex].start(startTime);
      if (seconds !== 0) {
        this.sourceList[bufferIndex].stop(startTime + seconds);
      }
    }
    stopSound(bufferIndex) {
      if (this.sourceList[bufferIndex])
        this.sourceList[bufferIndex].stop(0);
    }
    setPlaybackRate(bufferIndex, rate) {
      if (this.sourceList[bufferIndex])
        this.sourceList[bufferIndex].playbackRate.value = rate;
    }
    record(name = new Date().toISOString(), args = { audio: true, video: false }, type = null, streamElement = null, save = false, onbegin = () => {
    }) {
      var supported = null;
      var ext = null;
      var types = type;
      if (types === null) {
        if (args.video !== false) {
          types = [
            "video/webm",
            "video/webm;codecs=vp8",
            "video/webm;codecs=vp9",
            "video/webm;codecs=vp8.0",
            "video/webm;codecs=vp9.0",
            "video/webm;codecs=h264",
            "video/webm;codecs=H264",
            "video/webm;codecs=avc1",
            "video/webm;codecs=vp8,opus",
            "video/WEBM;codecs=VP8,OPUS",
            "video/webm;codecs=vp9,opus",
            "video/webm;codecs=vp8,vp9,opus",
            "video/webm;codecs=h264,opus",
            "video/webm;codecs=h264,vp9,opus",
            "video/x-matroska;codecs=avc1"
          ];
        } else if (args.audio === true) {
          types = [
            "audio/wav",
            "audio/mp3",
            "audio/webm",
            "audio/webm;codecs=opus",
            "audio/webm;codecs=pcm",
            "audio/ogg",
            "audio/x-matroska"
          ];
        }
      }
      for (var i = 0; i < types.length; i++) {
        if (MediaRecorder.isTypeSupported(types[i]) === true) {
          supported = types[i];
          console.log("Supported type: ", supported);
          if (types[i].indexOf("webm") !== -1) {
            ext = ".webm";
          }
          if (types[i].indexOf("ogg") !== -1) {
            ext = ".ogg";
          }
          if (types[i].indexOf("mp3") !== -1) {
            ext = ".mp3";
          }
          if (types[i].indexOf("wav") !== -1) {
            ext = ".wav";
          }
          if (types[i].indexOf("x-matroska") !== -1) {
            ext = ".mkv";
          }
          break;
        }
      }
      if (supported !== null) {
        let errfunc = function(e) {
          console.log(e);
        };
        navigator.mediaDevices.getUserMedia(args).then((recordingDevice) => {
          console.log("Media stream created.");
          if (supported.indexOf("audio") !== -1) {
            let mic_src = this.ctx.createMediaStreamSource(recordingDevice);
            let mic_gain = this.ctx.createGain();
            this.sourceList.push(mic_src);
            this.sourceGains.push(mic_gain);
            mic_src.onended = () => {
              mic_src.disconnect();
              mic_gain.disconnect();
              let l = 0, k = 0;
              this.sourceList.find((o, j) => {
                if (JSON.stringify(o) === JSON.stringify(mic_src)) {
                  l = j;
                  this.sourceList.splice(l, 1);
                  return true;
                }
              });
              this.sourceGains.find((o, j) => {
                if (JSON.stringify(o) === JSON.stringify(mic_gain)) {
                  k = j;
                  this.sourceGains.splice(k, 1);
                  return true;
                }
              });
            };
            mic_src.connect(mic_gain);
            mic_gain.connect(this.analyserNode);
          }
          onbegin();
          if (streamElement !== null) {
            streamElement.src = window.URL.createObjectURL(recordingDevice);
          }
          if (save === true) {
            this.recorder = new MediaRecorder(recordingDevice);
            this.recorder.onstop = (e) => {
              console.log("Media recorded, saving...");
              var blob = new Blob(this.recordedData, {
                type: supported
              });
              var url = URL.createObjectURL(blob);
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.style = "display: none";
              a.href = url;
              a.download = name + ext;
              a.click();
              window.URL.revokeObjectURL(url);
            };
            this.recorder.ondataavailable = (e) => {
              this.recordedData.push(e.data);
            };
            this.recorder.start();
          }
        }, errfunc);
        return this.sourceList.length;
      } else {
        alert("Cannot record! Check function call settings, ensure browser is compatible.");
        return void 0;
      }
    }
    replayRecording(streamElement) {
      if (this.recordedData.length > 1) {
        this.buffer = new Blob(this.recordedData);
        streamElement.src = window.URL.createObjectURL(buffer);
      }
    }
  };
  var BufferLoader = class {
    constructor(SoundJSInstance, urlList, callback, onReady = (sourceListIdx) => {
    }, onBeginDecoding = () => {
    }) {
      __publicField(this, "onReady", (sourceListIdx) => {
      });
      __publicField(this, "onBeginDecoding", () => {
      });
      this.audio = SoundJSInstance;
      this.ctx = this.audio.ctx;
      this.urlList = urlList;
      this.onload = callback;
      this.bufferList = new Array();
      this.loadCount = 0;
      this.onBeginDecoding = onBeginDecoding;
      this.onReady = onReady;
    }
    loadBuffer(url = "", index, canAddFile = false) {
      var request = new XMLHttpRequest();
      request.responseType = "arraybuffer";
      var responseBuf = null;
      if (url.length > 1) {
        request.open("GET", url, true);
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status === 200 || request.status === 0) {
              responseBuf = request.response;
            }
          }
        };
        var loader = this;
        request.onload = () => {
          this.onBeginDecoding();
          loader.ctx.decodeAudioData(responseBuf, (buffer2) => {
            if (!buffer2) {
              alert("error decoding file data: " + url);
              return;
            }
            loader.bufferList[index] = buffer2;
            if (++loader.loadCount === loader.urlList.length)
              loader.onload(loader.bufferList);
            this.onReady(this.audio.sourceList.length - 1);
          }, (error) => {
            console.error("decodeAudioData error: " + error + ", from url: " + url);
          });
        };
        request.onerror = function() {
          alert("BufferLoader: XHR error");
        };
        request.send();
      } else if (canAddFile) {
        var loader = this;
        var fr = new FileReader();
        fr.onload = (e) => {
          var fileResult = e.target.result;
          var audioContext = loader.ctx;
          if (audioContext === null) {
            return;
          }
          console.log("Decoding audio...");
          this.onBeginDecoding();
          audioContext.decodeAudioData(fileResult, (buffer2) => {
            if (!buffer2) {
              alert("Error decoding file data: " + url);
              return;
            } else {
              console.log("File decoded successfully!");
            }
            loader.bufferList[index] = buffer2;
            if (++loader.loadCount === loader.urlList.length)
              loader.onload(loader.bufferList);
            this.onReady(this.audio.sourceList.length - 1);
          }, (error) => {
            console.error("decodeAudioData error: ", error);
          });
        };
        fr.onerror = (e) => {
          console.log(e);
        };
        var input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.onchange = (e) => {
          fr.readAsArrayBuffer(e.target.files[0]);
          input.value = "";
        };
        input.click();
      }
    }
    load(canAddFile = true) {
      for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i, canAddFile);
    }
  };

  // ../src/index.js
  var BreathCapture = class {
    constructor(onUpdate = () => {
    }, onBreath = () => {
    }) {
      __publicField(this, "analyze", () => {
        if (this.analyzing === false) {
          this.analyzing = true;
          this.loop();
        }
      });
      __publicField(this, "resetVars", () => {
        this.audsum = 0;
        this.peaksfast = [];
        this.valsfast = [];
        this.peaksslow = [];
        this.valsslow = [];
        this.peakslong = [];
        this.valslong = [];
        this.audSumGraph = new Array(1024).fill(0);
        this.audSumSmoothedFast = new Array(1024).fill(0);
        this.audSumSmoothedSlow = new Array(1024).fill(0);
        this.audSumSmoothedLong = new Array(1024).fill(0);
        this.audSpect = new Array(1024).fill(new Array(250).fill(0));
        this.audTime = new Array(1024).fill(0);
        this.lastInPeak = 0;
        this.lastOutPeak = 0;
        this.fastPeakTimes = [];
        this.fastPeakDt = [];
        this.slowPeakTimes = [];
        this.longPeakTimes = [];
        this.peakThreshold = 0;
        this.wasBelowThreshold = false;
        this.inPeakVolumes = [];
        this.outPeakVolumes = [];
        this.inPeakTimes = [];
        this.outPeakTimes = [];
        this.inToOutTimes = [];
        this.breathingRate = [];
        this.breathingRateVariability = [];
        this.resetOutput();
      });
      __publicField(this, "resetOutput", () => {
        this.output = {
          belowThreshold: false,
          isHolding: false,
          inVolumes: this.inPeakVolumes,
          outVolumes: this.outPeakVolumes,
          inTimes: this.inPeakTimes,
          outTimes: this.outPeakTimes,
          inToOutTimes: this.inToOutTimes,
          fastTimes: this.fastPeakTimes,
          fastRate: this.fastPeakDt,
          breathRate: this.breathingRate,
          brv: this.breathingRateVariability,
          audioFFT: [],
          fastSmoothedVolume: this.audSumSmoothedFast,
          slowSmoothedVolume: this.audSumSmoothedSlow,
          longSmoothedVolume: this.audSumSmoothedLong
        };
      });
      __publicField(this, "stop", () => {
        this.analyzing = false;
      });
      __publicField(this, "peakDetect", (smoothedArray, type = "peak", window2 = 49) => {
        let mid = Math.floor(window2 * 0.5);
        let peaks = [];
        for (let i = 0; i < smoothedArray.length - window2; i++) {
          let isPeak = this.isExtrema(smoothedArray.slice(i, i + window2), type);
          if (isPeak) {
            peaks.push(i + mid - 1);
          }
        }
        return peaks;
      });
      __publicField(this, "calibrate", () => {
        if (this.slowPeakTimes.length > 0) {
          this.inPeakTimes = [this.slowPeakTimes[this.slowPeakTimes.length - 1]];
          this.outPeakTimes = [];
          this.inPeakVolumes = [this.audSumSmoothedSlow[this.peaksslow[this.peaksslow.length - 1]]];
          this.outPeakVolumes = [this.audSumSmoothedSlow[this.valsslow[this.valsslow.length - 1]]];
          this.inToOutTimes = [];
          this.breathingRate = [];
          this.breathingRateVariability = [];
          this.resetOutput();
          this.output.isHolding = true;
        }
      });
      __publicField(this, "onUpdate", () => {
      });
      __publicField(this, "onBreath", () => {
      });
      __publicField(this, "calcBreathing", () => {
        this.output.audioFFT = this.getAudioData().slice(6);
        this.audsum = this.sumAudioData();
        this.audSumGraph.shift();
        this.audSumGraph.push(this.audsum);
        this.audSpect.shift();
        this.audSpect.push(this.output.audioFFT);
        this.audTime.shift();
        this.audTime.push(Date.now());
        let smoothedfast = this.mean(this.audSumGraph.slice(this.audSumGraph.length - 5));
        this.audSumSmoothedFast.shift();
        this.audSumSmoothedFast.push(smoothedfast);
        let smoothedslow = this.mean(this.audSumGraph.slice(this.audSumGraph.length - 40));
        this.audSumSmoothedSlow.shift();
        this.audSumSmoothedSlow.push(smoothedslow);
        let smoothed2 = this.mean(this.audSumGraph.slice(this.audSumGraph.length - 120));
        this.audSumSmoothedLong.shift();
        this.audSumSmoothedLong.push(smoothed2);
        this.peaksfast = this.peakDetect(this.audSumSmoothedFast, "peak", 10);
        this.valsfast = this.peakDetect(this.audSumSmoothedFast, "valley", 10);
        this.peaksslow = this.peakDetect(this.audSumSmoothedSlow, "peak", 25);
        this.valsslow = this.peakDetect(this.audSumSmoothedSlow, "valley", 25);
        this.peakslong = this.peakDetect(this.audSumSmoothedLong, "peak", 80);
        this.valslong = this.peakDetect(this.audSumSmoothedLong, "valley", 80);
        let l1 = this.longPeakTimes.length;
        let slowThreshold = 0;
        if (l1 > 1) {
          this.peakThreshold = this.getPeakThreshold(this.audSumSmoothedLong, this.peakslong, this.peakThreshold);
          slowThreshold = this.getPeakThreshold(this.audSumSmoothedSlow, this.peaksslow, 0);
          if (this.audSumSmoothedSlow[this.audSumSmoothedSlow.length - 1] < this.peakThreshold) {
            this.wasBelowThreshold = true;
          }
        }
        if (slowThreshold > this.peakThreshold || l1 < 2 || this.inPeakTimes.length > 0) {
          if (this.output.belowThreshold === true)
            this.output.belowThreshold = false;
          if (this.fastPeakTimes[this.fastPeakTimes.length - 1] !== this.audTime[this.peaksfast[this.peaksfast.length - 1]]) {
            this.fastPeakTimes.push(this.audTime[this.peaksfast[this.peaksfast.length - 1]]);
            if (this.fastPeakTimes.length > 1) {
              this.fastPeakDt.push(this.fastPeakTimes[this.fastPeakTimes.length - 1] - this.fastPeakTimes[this.fastPeakTimes.length - 2]);
            }
          }
          if (this.slowPeakTimes[this.slowPeakTimes.length - 1] !== this.audTime[this.peaksslow[this.peaksslow.length - 1]]) {
            this.slowPeakTimes.push(this.audTime[this.peaksslow[this.peaksslow.length - 1]]);
            let l = this.longPeakTimes.length;
            let s = this.slowPeakTimes.length;
            let latestSlow = this.audSumSmoothedSlow[this.peaksslow[this.peaksslow.length - 1]];
            let latestLong = this.audSumSmoothedLong[this.peakslong[this.peakslong.length - 1]];
            if (l > 1 && s > 2 || this.inPeakTimes.length > 0) {
              if (latestSlow > latestLong && (this.longPeakTimes[l - 1] <= this.slowPeakTimes[s - 1] || this.longPeakTimes[l - 1] - this.slowPeakTimes[s - 1] < 200) || this.inPeakTimes.length > 0 && this.outPeakTimes.length === 0) {
                if ((this.inPeakTimes[this.inPeakTimes.length - 1] > this.outPeakTimes[this.outPeakTimes.length - 1] || this.inPeakTimes.length > 0 && this.outPeakTimes.length === 0) && this.wasBelowThreshold === true) {
                  this.outPeakTimes.push(this.slowPeakTimes[s - 1]);
                  this.outPeakVolumes.push(latestSlow);
                  if (this.inPeakTimes.length > 0)
                    this.inToOutTimes.push(this.slowPeakTimes[s - 1] - this.inPeakTimes[this.inPeakTimes.length - 1]);
                  if (this.inPeakTimes.length > 1 && this.outPeakTimes.length > 1) {
                    this.breathingRate.push(0.5 * (this.inPeakTimes[this.inPeakTimes.length - 1] - this.inPeakTimes[this.inPeakTimes.length - 2] + (this.outPeakTimes[this.outPeakTimes.length - 1] - this.outPeakTimes[this.outPeakTimes.length - 2])));
                    if (this.breathingRate.length > 1) {
                      this.breathingRateVariability.push(Math.abs(this.breathingRate[this.breathingRate.length - 1] - this.breathingRate[this.breathingRate.length - 2]));
                    }
                  }
                  this.output.isHolding = false;
                  this.wasBelowThreshold = false;
                  this.onBreath();
                } else if (this.inPeakTimes[this.inPeakTimes.length - 1] < this.outPeakTimes[this.outPeakTimes.length - 1] && this.inPeakTimes[this.inPeakTimes.length - 1] < this.longPeakTimes[l - 1] && this.wasBelowThreshold === true) {
                  this.inPeakTimes.push(this.slowPeakTimes[s - 1]);
                  this.inPeakVolumes.push(latestSlow);
                  this.output.isHolding = true;
                  this.wasBelowThreshold = false;
                }
              }
            }
          }
          if (this.longPeakTimes[this.longPeakTimes.length - 1] !== this.audTime[this.peakslong[this.peakslong.length - 1]]) {
            this.longPeakTimes.push(this.audTime[this.peakslong[this.peakslong.length - 1]]);
            let placeholder = this.inPeakTimes[this.inPeakTimes.length - 1];
            if (placeholder == void 0)
              placeholder = Date.now();
            let l = this.longPeakTimes.length;
            let s = this.slowPeakTimes.length;
            let latestSlow = this.audSumSmoothedSlow[this.peaksslow[this.peaksslow.length - 1]];
            let latestLong = this.audSumSmoothedLong[this.peakslong[this.peakslong.length - 1]];
            if (l > 1 && s > 2 && latestSlow > latestLong && (this.inPeakTimes.length === 0 && this.outPeakTimes.length === 0 || Date.now() - placeholder > 2e4)) {
              if ((this.longPeakTimes[l - 2] <= this.slowPeakTimes[s - 2] || this.longPeakTimes[l - 2] - this.slowPeakTimes[s - 2] < 200 || this.longPeakTimes[l - 2] - this.slowPeakTimes[s - 2] < 200) && (this.longPeakTimes[l - 1] >= this.slowPeakTimes[s - 1] || this.longPeakTimes[l - 1] - this.slowPeakTimes[s - 1] < 200)) {
                if (this.longPeakTimes[l - 2] < this.slowPeakTimes[s - 3]) {
                  this.inPeakTimes.push(this.slowPeakTimes[s - 2]);
                  this.outPeakTimes.push(this.slowPeakTimes[s - 1]);
                  this.inPeakVolumes.push(this.audSumSmoothedSlow[this.peaksslow[this.peaksslow.length - 2]]);
                  this.outPeakVolumes.push(latestSlow);
                  this.inToOutTimes.push(this.slowPeakTimes[s - 1] - this.slowPeakTimes[s - 2]);
                  if (this.inPeakTimes.length > 1 && this.outPeakTimes.length > 1) {
                    this.breathingRate.push(0.5 * (this.inPeakTimes[this.inPeakTimes.length - 1] - this.inPeakTimes[this.inPeakTimes.length - 2] + (this.outPeakTimes[this.outPeakTimes.length - 1] - this.outPeakTimes[this.outPeakTimes.length - 2])));
                    if (this.breathingRate.length > 1) {
                      this.breathingRateVariability.push(Math.abs(this.breathingRate[this.breathingRate.length - 1] - this.breathingRate[this.breathingRate.length - 2]));
                    }
                  }
                  this.onBreath();
                } else {
                  this.inPeakTimes.push(this.slowPeakTimes[s - 2]);
                  this.outPeakTimes.push(this.slowPeakTimes[s - 1]);
                  this.inPeakVolumes.push(this.audSumSmoothedSlow[this.peaksslow[this.peaksslow.length - 2]]);
                  this.outPeakVolumes.push(latestSlow);
                  this.inToOutTimes.push(this.slowPeakTimes[s - 1] - this.slowPeakTimes[s - 2]);
                  if (this.inPeakTimes.length > 1 && this.outPeakTimes.length > 1) {
                    this.breathingRate.push(0.5 * (this.inPeakTimes[this.inPeakTimes.length - 1] - this.inPeakTimes[this.inPeakTimes.length - 2] + (this.outPeakTimes[this.outPeakTimes.length - 1] - this.outPeakTimes[this.outPeakTimes.length - 2])));
                    if (this.breathingRate.length > 1) {
                      this.breathingRateVariability.push(Math.abs(this.breathingRate[this.breathingRate.length - 1] - this.breathingRate[this.breathingRate.length - 2]));
                    }
                  }
                  this.onBreath();
                }
              } else if (this.longPeakTimes[l - 1] <= this.slowPeakTimes[s - 1] || this.longPeakTimes[l - 1] - this.slowPeakTimes[s - 1] < 200) {
                if (this.inPeakTimes[this.inPeakTimes.length - 1] > this.outPeakTimes[this.outPeakTimes.length - 1] && this.wasBelowThreshold === true) {
                  this.outPeakTimes.push(this.slowPeakTimes[s - 1]);
                  this.outPeakVolumes.push(latestSlow);
                  if (this.inPeakTimes.length > 0)
                    this.inToOutTimes.push(this.slowPeakTimes[s - 1] - this.inPeakTimes[this.inPeakTimes.length - 1]);
                  if (this.inPeakTimes.length > 1 && this.outPeakTimes.length > 1) {
                    this.breathingRate.push(0.5 * (this.inPeakTimes[this.inPeakTimes.length - 1] - this.inPeakTimes[this.inPeakTimes.length - 2] + (this.outPeakTimes[this.outPeakTimes.length - 1] - this.outPeakTimes[this.outPeakTimes.length - 2])));
                    if (this.breathingRate.length > 1) {
                      this.breathingRateVariability.push(Math.abs(this.breathingRate[this.breathingRate.length - 1] - this.breathingRate[this.breathingRate.length - 2]));
                    }
                  }
                  this.wasBelowThreshold = false;
                  this.onBreath();
                } else if (this.inPeakTimes[this.inPeakTimes.length - 1] < this.outPeakTimes[this.outPeakTimes.length - 1] && this.inPeakTimes[this.inPeakTimes.length - 1] < this.longPeakTimes[l - 1] && this.wasBelowThreshold === true) {
                  this.inPeakTimes.push(this.slowPeakTimes[s - 1]);
                  this.inPeakVolumes.push(latestSlow);
                  this.output.isHolding = true;
                  this.wasBelowThreshold = false;
                }
              }
            }
          }
        } else if (slowThreshold < this.peakThreshold) {
          if (!this.output.belowThreshold)
            this.output.belowThreshold = true;
        }
      });
      __publicField(this, "loop", () => {
        if (this.analyzing === true) {
          this.calcBreathing();
          this.onUpdate();
          setTimeout(() => {
            this.loop();
          }, 15);
        }
      });
      this.effects = [];
      this.fxStruct = { sourceIdx: void 0, source: void 0, playing: false, id: void 0 };
      this.onUpdate = onUpdate;
      this.onBreath = onBreath;
      this.audsum = 0;
      this.peaksfast = [];
      this.valsfast = [];
      this.peaksslow = [];
      this.valsslow = [];
      this.peakslong = [];
      this.valslong = [];
      this.audSumGraph = new Array(1024).fill(0);
      this.audSumSmoothedFast = new Array(1024).fill(0);
      this.audSumSmoothedSlow = new Array(1024).fill(0);
      this.audSumSmoothedLong = new Array(1024).fill(0);
      this.audSpect = new Array(1024).fill(new Array(512).fill(0));
      this.audTime = new Array(1024).fill(0);
      this.lastInPeak = 0;
      this.lastOutPeak = 0;
      this.fastPeakTimes = [];
      this.fastPeakDt = [];
      this.slowPeakTimes = [];
      this.longPeakTimes = [];
      this.peakThreshold = 0;
      this.wasBelowThreshold = false;
      this.inPeakVolumes = [];
      this.outPeakVolumes = [];
      this.inPeakTimes = [];
      this.outPeakTimes = [];
      this.inToOutTimes = [];
      this.breathingRate = [];
      this.breathingRateVariability = [];
      this.output = {
        belowThreshold: false,
        isHolding: false,
        inVolumes: this.inPeakVolumes,
        outVolumes: this.outPeakVolumes,
        inTimes: this.inPeakTimes,
        outTimes: this.outPeakTimes,
        inToOutTimes: this.inToOutTimes,
        fastTimes: this.fastPeakTimes,
        fastRate: this.fastPeakDt,
        breathRate: this.breathingRate,
        brv: this.breathingRateVariability,
        audioFFT: [],
        fastSmoothedVolume: this.audSumSmoothedFast,
        slowSmoothedVolume: this.audSumSmoothedSlow,
        longSmoothedVolume: this.audSumSmoothedLong
      };
      this.analyzing = false;
    }
    connectMic() {
      if (this.effects.length === 0) {
        if (!window.audio)
          window.audio = new SoundJS();
        if (window.audio.ctx === null) {
          return;
        }
        ;
        let fx = JSON.parse(JSON.stringify(this.fxStruct));
        fx.sourceIdx = window.audio.record(void 0, void 0, null, null, false, () => {
          if (fx.sourceIdx !== void 0) {
            fx.source = window.audio.sourceList[window.audio.sourceList.length - 1];
            fx.playing = true;
            fx.id = "Micin";
          }
        });
        this.effects.push(fx);
        try {
          window.audio.gainNode.disconnect(window.audio.analyserNode);
          window.audio.analyserNode.disconnect(window.audio.out);
          window.audio.gainNode.connect(window.audio.out);
        } catch (er) {
        }
        return fx;
      }
    }
    stopMic() {
      if (this.effects.length === 1) {
        let idx;
        let found = this.effects.find((o, i) => {
          if (o.id === "Micin") {
            idx = i;
            return true;
          }
        });
        if (found) {
          found.source.mediaStream.getTracks()[0].stop();
          this.effects.splice(idx, 1);
        }
        try {
          window.audio.gainNode.disconnect(window.audio.out);
          window.audio.gainNode.connect(window.audio.analyserNode);
          window.audio.analyserNode.connect(window.audio.out);
        } catch (er) {
        }
      }
    }
    getAudioData() {
      let audioDat = [];
      if (window.audio) {
        var array = new Uint8Array(window.audio.analyserNode.frequencyBinCount);
        window.audio.analyserNode.getByteFrequencyData(array);
        audioDat = this.reduceArrByFactor(Array.from(array), 4);
      } else {
        audioDat = new Array(512).fill(0);
      }
      return audioDat;
    }
    sum(arr = []) {
      if (arr.length > 0) {
        var sum = arr.reduce((prev, curr) => curr += prev);
        return sum;
      } else {
        return 0;
      }
    }
    mean(arr = []) {
      if (arr.length > 0) {
        var sum = arr.reduce((prev, curr) => curr += prev);
        return sum / arr.length;
      } else {
        return 0;
      }
    }
    reduceArrByFactor(arr, factor = 2) {
      let x = arr.filter((element, index) => {
        return index % factor === 0;
      });
      return x;
    }
    sma(arr, window2) {
      var smaArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (i == 0) {
          smaArr.push(arr[0]);
        } else if (i < window2) {
          var arrslice = arr.slice(0, i + 1);
          smaArr.push(arrslice.reduce((previous, current) => current += previous) / (i + 1));
        } else {
          var arrslice = arr.slice(i - window2, i);
          smaArr.push(arrslice.reduce((previous, current) => current += previous) / window2);
        }
      }
      return smaArr;
    }
    sumAudioData() {
      let audioDat = this.getAudioData();
      let sum = this.sum(audioDat);
      return sum;
    }
    makeArr(startValue, stopValue, nSteps) {
      var arr = [];
      var step = (stopValue - startValue) / (nSteps - 1);
      for (var i = 0; i < nSteps; i++) {
        arr.push(startValue + step * i);
      }
      return arr;
    }
    isExtrema(arr, critical = "peak") {
      let ref = [...arr];
      if (ref.length % 2 === 0)
        ref.pop();
      if (arr.length > 1) {
        let pass = true;
        for (let i = 0; i < ref.length; i++) {
          let val = ref[i];
          if (critical === "peak") {
            if (i < Math.floor(ref.length * 0.5) && val >= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            } else if (i > Math.floor(ref.length * 0.5) && val >= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            }
          } else if (critical === "valley") {
            if (i < Math.floor(ref.length * 0.5) && val <= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            } else if (i > Math.floor(ref.length * 0.5) && val <= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            }
          } else {
            if (i < Math.floor(ref.length * 0.5) && val <= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            } else if (i > Math.floor(ref.length * 0.5) && val <= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            }
          }
        }
        if (critical !== "peak" && critical !== "valley" && pass === false) {
          pass = true;
          for (let i = 0; i < ref.length; i++) {
            let val = ref[i];
            if (i < Math.floor(ref.length * 0.5) && val >= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            } else if (i > Math.floor(ref.length * 0.5) && val >= ref[Math.floor(ref.length * 0.5)]) {
              pass = false;
              break;
            }
          }
        }
        return pass;
      } else
        return void 0;
    }
    isCriticalPoint(arr, critical = "peak") {
      let ref = [...arr];
      if (ref.length % 2 === 0)
        ref.pop();
      if (arr.length > 1) {
        let pass = true;
        for (let i = 0; i < ref.length; i++) {
          let val = ref[i];
          if (critical === "peak") {
            if (i < ref.length * 0.5 && val <= 0) {
              pass = false;
              break;
            } else if (i > ref.length * 0.5 && val > 0) {
              pass = false;
              break;
            }
          } else if (critical === "valley") {
            if (i < ref.length * 0.5 && val >= 0) {
              pass = false;
              break;
            } else if (i > ref.length * 0.5 && val < 0) {
              pass = false;
              break;
            }
          } else {
            if (i < ref.length * 0.5 && val >= 0) {
              pass = false;
              break;
            } else if (i > ref.length * 0.5 && val < 0) {
              pass = false;
              break;
            }
          }
        }
        if (critical !== "peak" && critical !== "valley" && pass === false) {
          pass = true;
          for (let i = 0; i < ref.length; i++) {
            let val = ref[i];
            if (i < ref.length * 0.5 && val <= 0) {
              pass = false;
              break;
            } else if (i > ref.length * 0.5 && val > 0) {
              pass = false;
              break;
            }
          }
        }
        return pass;
      } else
        return void 0;
    }
    interpolateArray(data, fitCount, normalize = 1) {
      var norm = normalize;
      var linearInterpolate = function(before2, after2, atPoint2) {
        return (before2 + (after2 - before2) * atPoint2) * norm;
      };
      var newData = new Array();
      var springFactor = new Number((data.length - 1) / (fitCount - 1));
      newData[0] = data[0];
      for (var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = new Number(Math.floor(tmp)).toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
      }
      newData[fitCount - 1] = data[data.length - 1];
      return newData;
    }
    getPeakThreshold(arr, peakIndices, thresholdVar = 0) {
      let threshold;
      let filtered = arr.filter((o, i) => {
        if (peakIndices.indexOf(i) > -1)
          return true;
      });
      if (thresholdVar === 0) {
        threshold = this.mean(filtered);
      } else
        threshold = (thresholdVar + this.mean(filtered)) * 0.5;
      return threshold;
    }
  };

  // src/BreathTrainerApplet.js
  var BreathTrainerApplet = class {
    constructor(parent = document.body) {
      __publicField(this, "drawAudio", () => {
        this.lastFrame = this.currentFrame;
        this.currentFrame = performance.now();
        this.fps = (this.currentFrame - this.lastFrame) * 1e-3;
        let height = this.canvas.height;
        let width = this.canvas.width;
        let audInterval = this.fps;
        this.timeScaled += audInterval + (width / 1024 - this.fps);
        this.time += this.fps;
        let freq = this.currentFrequency;
        let amp = this.currentFrequencyMap.map[this.currentMapIndex].amplitude + height / 4;
        this.ctx2.clearRect(0, 0, width, height);
        let x = width - 1;
        let sineAmp = Math.sin((x + this.timeScaled + width) / (width * freq));
        let amplitude = height * 0.5 + amp * sineAmp;
        this.amplitudesY.shift();
        this.amplitudesY.push(amplitude);
        this.ctx2.strokeStyle = "limegreen";
        this.ctx2.beginPath();
        this.ctx2.moveTo(-10, this.amplitudesY[0]);
        this.amplitudesY.forEach((a, i) => {
          if (i > 0) {
            this.ctx2.lineTo(this.amplitudesX[i], a + height * 0.2);
          }
        });
        this.ctx2.stroke();
        if (this.currentFrequency !== this.currentFrequencyMap.map[this.currentMapIndex].frequency) {
          this.currentFrequency = this.currentFrequencyMap.map[this.currentMapIndex].frequency;
        }
        if (this.currentFrequency === this.currentFrequencyMap.map[this.currentMapIndex].frequency) {
          let timeaccum = 0;
          let duration = this.currentFrequencyMap.duration;
          for (let i = 0; i < this.currentMapIndex + 1; i++) {
            timeaccum += this.currentFrequencyMap.map[i].duration;
          }
          if (this.time > timeaccum + duration * this.rounds + this.latentTime) {
            if (this.currentMapIndex === this.currentFrequencyMap.map.length - 1) {
              this.currentMapIndex = 0;
              this.rounds++;
            } else {
              this.currentMapIndex++;
            }
          }
        }
        let foundidx = void 0;
        let found = this.Capture.inPeakTimes.find((t, k) => {
          if (t > this.Capture.audTime[0]) {
            foundidx = k;
            return true;
          }
        });
        if (foundidx) {
          let inpeakindices = [];
          let intimes = this.Capture.audTime.filter((o, z) => {
            if (this.Capture.inPeakTimes.slice(this.Capture.inPeakTimes.length - foundidx).indexOf(o) > -1) {
              inpeakindices.push(z);
              return true;
            }
          });
          this.inpeaks = inpeakindices;
          let foundidx2 = void 0;
          let found2 = this.Capture.outPeakTimes.find((t, k) => {
            if (t > this.Capture.audTime[0]) {
              foundidx2 = k;
              return true;
            }
          });
          if (foundidx2) {
            let outpeakindices = [];
            let outtimes = this.Capture.audTime.filter((o, z) => {
              if (this.Capture.outPeakTimes.slice(this.Capture.outPeakTimes.length - foundidx2).indexOf(o) > -1) {
                outpeakindices.push(z);
                return true;
              }
            });
            this.outpeaks = outpeakindices;
          }
        } else {
          let inpeakindices = [];
          let intimes = this.Capture.audTime.filter((o, z) => {
            if (this.Capture.inPeakTimes.indexOf(o) > -1) {
              inpeakindices.push(z);
              return true;
            }
          });
          let outpeakindices = [];
          let outtimes = this.Capture.audTime.filter((o, z) => {
            if (this.Capture.outPeakTimes.indexOf(o) > -1) {
              outpeakindices.push(z);
              return true;
            }
          });
          this.inpeaks = inpeakindices;
          this.outpeaks = outpeakindices;
        }
        let xaxis = this.makeArr(0, this.canvas.width, this.Capture.output.audioFFT.length);
        let xaxis2 = this.makeArr(0, this.canvas.width, this.Capture.audSumGraph.length);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.linewidth = 2;
        this.ctx.moveTo(0, this.canvas.height - this.Capture.output.audioFFT[0]);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "royalblue";
        this.Capture.output.audioFFT.forEach((amp2, i) => {
          if (i > 0) {
            this.ctx.lineTo(xaxis[i], this.canvas.height - amp2 * (this.canvas.height / 255));
          }
        });
        this.ctx.stroke();
        this.ctx.linewidth = 3;
        this.ctx.moveTo(0, this.canvas.height - this.Capture.audSumGraph[0]);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.Capture.audSumGraph.forEach((amp2, i) => {
          if (i > 0) {
            this.ctx.lineTo(xaxis2[i], this.canvas.height - amp2 * (this.canvas.height / Math.max(...this.Capture.audSumGraph)));
          }
        });
        this.ctx.stroke();
        this.ctx.moveTo(0, this.canvas.height - this.Capture.audSumSmoothedFast[0]);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "orange";
        this.Capture.audSumSmoothedFast.forEach((amp2, i) => {
          if (i > 0) {
            this.ctx.lineTo(xaxis2[i], this.canvas.height - amp2 * (this.canvas.height / Math.max(...this.Capture.audSumGraph)));
          }
        });
        this.ctx.stroke();
        this.ctx.moveTo(0, this.canvas.height - this.Capture.audSumSmoothedSlow[0]);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "gold";
        this.Capture.audSumSmoothedSlow.forEach((amp2, i) => {
          if (i > 0) {
            this.ctx.lineTo(xaxis2[i], this.canvas.height - amp2 * (this.canvas.height / Math.max(...this.Capture.audSumGraph)));
          }
        });
        this.ctx.stroke();
        this.ctx.moveTo(0, this.canvas.height - this.Capture.audSumSmoothedLong[0]);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "yellow";
        this.Capture.audSumSmoothedLong.forEach((amp2, i) => {
          if (i > 0) {
            this.ctx.lineTo(xaxis2[i], this.canvas.height - amp2 * (this.canvas.height / Math.max(...this.Capture.audSumGraph)));
          }
        });
        this.ctx.stroke();
        this.ctx.fillStyle = "chartreuse";
        this.inpeaks.forEach((pidx) => {
          this.ctx.beginPath();
          this.ctx.arc(xaxis2[pidx], this.canvas.height - this.Capture.audSumSmoothedSlow[pidx] * (this.canvas.height / Math.max(...this.Capture.audSumGraph)), 5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        });
        this.ctx.fillStyle = "green";
        this.outpeaks.forEach((pidx) => {
          this.ctx.beginPath();
          this.ctx.arc(xaxis2[pidx], this.canvas.height - this.Capture.audSumSmoothedSlow[pidx] * (this.canvas.height / Math.max(...this.Capture.audSumGraph)), 5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        });
        this.ctx.fillStyle = "pink";
        this.Capture.peakslong.forEach((pidx) => {
          this.ctx.beginPath();
          this.ctx.arc(xaxis2[pidx], this.canvas.height - this.Capture.audSumSmoothedLong[pidx] * (this.canvas.height / Math.max(...this.Capture.audSumGraph)), 5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        });
        this.ctx.fillStyle = "purple";
        this.Capture.valslong.forEach((pidx) => {
          this.ctx.beginPath();
          this.ctx.arc(xaxis2[pidx], this.canvas.height - this.Capture.audSumSmoothedLong[pidx] * (this.canvas.height / Math.max(...this.Capture.audSumGraph)), 5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        });
        this.ctx.fillStyle = "red";
        this.Capture.peaksfast.forEach((pidx) => {
          this.ctx.beginPath();
          this.ctx.arc(xaxis2[pidx], this.canvas.height - this.Capture.audSumSmoothedFast[pidx] * (this.canvas.height / Math.max(...this.Capture.audSumGraph)), 5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        });
        this.ctx.fillStyle = "crimson";
        this.Capture.valsfast.forEach((pidx) => {
          this.ctx.beginPath();
          this.ctx.arc(xaxis2[pidx], this.canvas.height - this.Capture.audSumSmoothedFast[pidx] * (this.canvas.height / Math.max(...this.Capture.audSumGraph)), 5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        });
      });
      __publicField(this, "animate", () => {
        this.drawAudio();
        if (this.animating)
          setTimeout(() => {
            this.animate();
          }, 15);
      });
      this.parentNode = parent;
      this.AppletHTML = null;
      this.props = {
        id: String(Math.floor(Math.random() * 1e6))
      };
      this.canvas;
      this.ctx;
      this.canvas2;
      this.ctx2;
      this.offscreen = null;
      this.offscreenctx = null;
      this.mode = "dvb";
      this.animation = "sine";
      this.fs = 10;
      this.amplitudes = [];
      this.startTime = void 0;
      this.rounds = 0;
      this.lastFrame = 0;
      this.latentTime = 0;
      this.currentFrame = 0;
      this.time = 0;
      this.fps = 60;
      this.thisFrame = Date.now();
      this.frequencyMaps = [
        { type: "diaphragmatic", duration: 60, map: [{ frequency: 0.1, amplitude: 2, duration: 60 }] },
        { type: "breathhold", duration: 60, map: [{ frequency: 0.1, amplitude: 2, duration: 5 }, { frequency: 0, amplitude: 1, duration: 10 }, { frequency: 0.1, amplitude: 2, duration: 5 }] },
        { type: "wimhof", duration: 60, map: [{ frequency: 0.01, amplitude: 1, duration: 30 }, { frequency: 0.1, amplitude: 2, duration: 30 }] },
        { type: "relaxation", duration: 60, map: [{ frequency: 0.08, amplitude: 2, duration: 60 }] },
        { type: "jacobsons", duration: 60, map: [{ frequency: 0.08, amplitude: 2, duration: 60 }] }
      ];
      this.currentFrequencyMap = { type: "diaphragmatic", map: [{ frequency: 0.1, amplitude: 2, duration: 60 }] };
      this.currentFrequency = 0.1;
      this.currentMapIndex = 0;
      this.lastAmplitude = 0;
      this.timeScaled = 0;
      this.amplitudesY = new Array(1024).fill(0);
      this.amplitudesX = new Array(1024).fill(0);
      this.scaling = 10;
      this.animating = false;
      this.step = -4;
      this.Capture = new BreathCapture();
    }
    init() {
      let HTMLtemplate = (props = this.props) => {
        return `
            <div id='${props.id}' style='height:100vh; width:100vw; background-color:#101010;'>
                <div id='${props.id}menu'>
                    <button id='${props.id}startmic'>Start Mic</button>
                    <button id='${props.id}stopmic'>Stop Mic</button>
                    <button id='${props.id}calibrate'>Calibrate (Breathe-in then click after ~1 sec)</button>
                    <select id='${props.id}select'>
                        <option value='none'>None</option>
                        <option value='diaphragmatic' selected>Diaphragmatic</option>
                        <option value='breathhold'>Breath Hold</option>
                        <option value='relaxation'>Relaxation Breathing</option>
                        <option value='jacobsons'>Jacobson's Muscular Relaxation</option>
                        <option value='wimhof'>Wim Hof Method</option>
                    </select>
                </div> 
                <canvas id='${props.id}sinecanvas' style='position:absolute;width:100%;height:100%;'></canvas>
                <canvas id='${props.id}canvas' style='width:100%;height:100%;background-color:rgba(0,0,0,0);'></canvas>
            </div>`;
      };
      let setupHTML = (props = this.props) => {
        this.canvas = document.getElementById(props.id + "canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas2 = document.getElementById(props.id + "sinecanvas");
        this.ctx2 = this.canvas2.getContext("2d");
        this.offscreen = new OffscreenCanvas(this.canvas.width, this.canvas.height);
        this.offscreenctx = this.offscreen.getContext("2d");
        this.yscaling = this.canvas.height * 0.2;
        this.xscaling = this.canvas.width * 0.1;
        document.getElementById(props.id + "select").onchange = (event) => {
          let t = event.target.value;
          if (t === "none") {
            this.canvas2.style.display = "none";
          } else {
            this.canvas2.style.display = "";
            let found = this.frequencyMaps.find((o) => {
              if (o.type === t)
                return true;
            });
            if (found)
              this.currentFrequencyMap = found;
          }
          this.time = 0;
          this.timeScaled = 0;
        };
        document.getElementById(props.id + "startmic").onclick = () => {
          this.Capture.analyze();
          this.Capture.connectMic();
        };
        document.getElementById(props.id + "stopmic").onclick = () => {
          this.Capture.stopMic();
        };
        document.getElementById(props.id + "calibrate").onclick = () => {
          this.Capture.calibrate();
        };
        this.animating = true;
        this.animate();
      };
      this.AppletHTML = new DOMFragment(HTMLtemplate, this.parentNode, this.props, setupHTML, void 0, "NEVER");
      setTimeout(() => {
        this.responsive();
      }, 300);
    }
    deinit() {
      this.animating = false;
      this.Capture.stop();
      this.AppletHTML.deleteNode();
    }
    responsive() {
      this.canvas.width = this.AppletHTML.node.clientWidth;
      this.canvas.height = this.AppletHTML.node.clientHeight;
      this.canvas2.width = this.AppletHTML.node.clientWidth;
      this.canvas2.height = this.AppletHTML.node.clientHeight;
      this.offscreen.width = this.AppletHTML.node.clientWidth;
      this.offscreen.height = this.AppletHTML.node.clientHeight;
      this.yscaling = this.canvas.height * 0.2;
      this.xscaling = this.canvas.width * 0.1;
      if (this.amplitudesY[0] === 0)
        this.amplitudesY = new Array(1024).fill(this.canvas2.height);
      this.amplitudesX = new Array(1024).fill(0);
      this.amplitudesX.forEach((x, i) => {
        this.amplitudesX[i] = i / 1023 * this.canvas2.width;
      });
    }
    configure(settings3 = []) {
      settings3.forEach((cmd, i) => {
      });
    }
    makeArr(startValue, stopValue, nSteps) {
      var arr = [];
      var step = (stopValue - startValue) / (nSteps - 1);
      for (var i = 0; i < nSteps; i++) {
        arr.push(startValue + step * i);
      }
      return arr;
    }
  };

  // src/app.js
  var trainer = new BreathTrainerApplet();
  console.log(trainer);
  trainer.init();
  window.addEventListener("resize", (ev) => {
    trainer.responsive();
  });
})();
//# sourceMappingURL=app.js.map
