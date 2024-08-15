"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USAction = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const USAction = ({
  action,
  setTourStepIndex,
  tourStepIndex,
  onColse
}) => {
  const {
    styleType,
    type,
    value
  } = action;
  const onPress = (0, _react.useMemo)(() => {
    switch (type) {
      case 'next':
        return () => setTourStepIndex(tourStepIndex + 1);
      case 'previous':
        return () => setTourStepIndex(tourStepIndex - 1);
      default:
        return onColse;
    }
  }, [onColse, setTourStepIndex, tourStepIndex, type]);
  const style = (0, _react.useMemo)(() => {
    switch (styleType) {
      case 'Primary':
        return {
          ...styles.footerBtn,
          ...styles.primaryBtn
        };
      case 'Secondary':
        return {
          ...styles.footerBtn,
          ...styles.secondaryBrn
        };
      default:
        return {
          ...styles.footerBtn
        };
    }
  }, [styleType]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    style: style,
    onPress: onPress,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      children: value
    })
  });
};
exports.USAction = USAction;
const styles = _reactNative.StyleSheet.create({
  footerBtn: {
    marginRight: 10,
    padding: 8,
    borderRadius: 6
  },
  primaryBtn: {
    backgroundColor: '#387DFF'
  },
  secondaryBrn: {
    borderColor: '#464646',
    borderWidth: 1
  }
});
//# sourceMappingURL=Action.js.map