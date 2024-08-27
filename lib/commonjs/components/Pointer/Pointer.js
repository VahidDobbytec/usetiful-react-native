"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pointer = void 0;
var _reactNative = require("react-native");
var _Body = require("../Body.js");
var _index = require("../Action/index.js");
var _useStore = require("../../stores/useStore.js");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const Pointer = ({
  step,
  onColse
}) => {
  const {
    title,
    actions,
    content,
    element
  } = step;
  const refs = (0, _useStore.useStore)(s => s.elementRefs);
  const ref = refs[element];
  const [result, setResult] = (0, _react.useState)();
  const [top, setTop] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    if (ref && ref.current) {
      //@ts-ignore
      ref?.current.measure((x, y, width, height, pageX, pageY) => {
        const msg = `Element position new: X: ${pageX}, Y: ${pageY}, Width: ${width}, Height: ${height}`;
        setTop(pageY + height + 20);
        setResult(msg);
      });
    }
  }, [ref]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: {
      ...styles.pointer,
      marginTop: top
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.pointerHeader,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.pointerText,
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: styles.crossBtn,
        onPress: onColse,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          children: "X"
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.pointerBody,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
        children: ["PP: ", result]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.pointerBody,
      children: !!content && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Body.Body, {
        content: content
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.pointerFooter,
      children: actions.map(action => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Action, {
          action,
          onColse
        }, action.id);
      })
    })]
  });
};
exports.Pointer = Pointer;
const styles = _reactNative.StyleSheet.create({
  pointer: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  pointerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  pointerFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10
  },
  pointerText: {
    textAlign: 'center'
  },
  pointerBody: {
    paddingVertical: 8
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  }
});
//# sourceMappingURL=Pointer.js.map