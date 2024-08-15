"use strict";

import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { jsx as _jsx } from "react/jsx-runtime";
export const Body = ({
  content
}) => {
  const [webViewHeight, setWebViewHeight] = useState(0);
  const webviewRef = useRef(null);
  const injectedJavaScript = `
      (function() {
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height.toString());
      })();
    `;
  const body = useMemo(() => {
    return `${content}${bodyCss}`;
  }, [content]);
  return /*#__PURE__*/_jsx(View, {
    style: {
      height: webViewHeight / 4
    },
    children: /*#__PURE__*/_jsx(WebView, {
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
const bodyCss = `<style>
p{
font-size:36px;
}
</style>`;
//# sourceMappingURL=Body.js.map