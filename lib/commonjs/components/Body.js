"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeWebview = _interopRequireDefault(require("react-native-webview"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Body = ({
  content
}) => {
  const [webViewHeight, setWebViewHeight] = (0, _react.useState)(0);
  const webviewRef = (0, _react.useRef)(null);
  const injectedJavaScript = `
      (function() {
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height.toString());
      })();
    `;
  const body = (0, _react.useMemo)(() => {
    return `${content}${bodyCss}`;
  }, [content]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: {
      height: webViewHeight / 4
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeWebview.default, {
      ref: webviewRef,
      originWhitelist: ['*'],
      source: {
        html: body
      },
      injectedJavaScript: injectedJavaScript,
      onMessage: event => {
        setWebViewHeight(Number(event.nativeEvent.data));
      }
    })
  });
};
exports.Body = Body;
const bodyCss = `<style>
p{
font-size:36px;
}
</style>`;
//# sourceMappingURL=Body.js.map