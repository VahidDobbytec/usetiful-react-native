"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slideout = void 0;
var _reactNative = require("react-native");
var _Body = require("../Body.js");
var _index = require("../Action/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const Slideout = ({
  step,
  onColse
}) => {
  const {
    title,
    actions,
    content
  } = step;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.slidout,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.slidoutHeader,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.slidoutText,
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: styles.crossBtn,
        onPress: onColse,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          children: "X"
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.slidoutBody,
      children: !!content && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Body.Body, {
        content: content
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.slidoutFooter,
      children: actions.map(action => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Action, {
          action,
          onColse
        }, action.id);
      })
    })]
  });
};
exports.Slideout = Slideout;
const styles = _reactNative.StyleSheet.create({
  slidout: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 30
  },
  slidoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  slidoutFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10
  },
  slidoutText: {
    textAlign: 'center'
  },
  slidoutBody: {
    paddingVertical: 8
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  }
});
//# sourceMappingURL=Slideout.js.map