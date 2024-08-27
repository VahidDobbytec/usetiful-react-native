"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefRegister = void 0;
var _react = require("react");
var _useStore = require("../stores/useStore.js");
const useRefRegister = (...ref) => {
  const setElementRef = (0, _useStore.useStore)(s => s.setElementRef);
  (0, _react.useEffect)(() => {
    setElementRef(...ref);
  }, [ref, setElementRef]);
};
exports.useRefRegister = useRefRegister;
//# sourceMappingURL=useRefRegister.js.map