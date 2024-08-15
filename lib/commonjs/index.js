"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Usetiful = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _index = require("./components/Modal/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const useCurrentRouteName = () => {
  const [currentRouteName, setCurrentRouteName] = (0, _react.useState)('');
  const state = (0, _native.useNavigationState)(s => s);
  (0, _react.useEffect)(() => {
    if (state) {
      let route = state.routes[state.index];
      const pathResult = [];
      if (route) {
        pathResult.push(route.name);
        let subState = route.state;
        while (subState) {
          route = subState.routes[subState.index ?? 0];
          if (route) {
            pathResult.push(route.name);
            subState = route.state;
          } else {
            subState = undefined;
          }
        }
      }
      setCurrentRouteName(pathResult.join('/'));
    }
  }, [state]);
  return currentRouteName;
};
const Usetiful = ({
  children
}) => {
  const currentRouteName = useCurrentRouteName();
  console.log('====USETIFUL LOG=====>', currentRouteName);
  const [tours, setTours] = (0, _react.useState)();
  const [tourStepIndex, setTourStepIndex] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.usetiful.com/api-space/data.json?lang=en', {
          method: 'GET',
          headers: {
            'X-Auth-Token': '34ae1d22e7615d614bd3a17920a907c0',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const {
          tours: _tours
        } = await response.json();
        setTours(_tours);
      } catch (error) {
        // console.log('=====error====>', error.message);
      }
    };
    fetchData();
  }, []);
  const availableTour = (0, _react.useMemo)(() => {
    setTourStepIndex(0);
    if (tours && tours.length) {
      return tours.find(tour => tour.targets.find(target => !!target.url && currentRouteName.includes(target.url)));
    } else {
      return undefined;
    }
  }, [currentRouteName, tours]);
  (0, _react.useEffect)(() => {
    setSelfClosed(false);
  }, [currentRouteName]);
  const [selfClosed, setSelfClosed] = (0, _react.useState)(false);

  // const measureElement = () => {
  //   if (viewRef.current) {
  //     viewRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       Alert.alert(`Element position: X: ${pageX}, Y: ${pageY}, Width: ${width}, Height: ${height}`);
  //     });
  //   }
  // };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.UsetifulContainer,
    children: [children, !!availableTour && !selfClosed && availableTour.steps[tourStepIndex] && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.usetifulLayer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Modal, {
        step: availableTour.steps[tourStepIndex],
        onColse: () => setSelfClosed(true),
        tourStepIndex: tourStepIndex,
        setTourStepIndex: to => {
          if (availableTour.steps.length - 1 >= to && to >= 0) {
            setTourStepIndex(to);
          }
        }
      })
    })]
  });
};
exports.Usetiful = Usetiful;
const styles = _reactNative.StyleSheet.create({
  UsetifulContainer: {
    flex: 1
  },
  usetifulLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000cc'
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  },
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
//# sourceMappingURL=index.js.map