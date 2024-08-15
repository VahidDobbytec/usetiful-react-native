"use strict";

import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { Modal } from "./components/Modal/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useCurrentRouteName = () => {
  const [currentRouteName, setCurrentRouteName] = useState('');
  const state = useNavigationState(s => s);
  useEffect(() => {
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
export const Usetiful = ({
  children
}) => {
  const currentRouteName = useCurrentRouteName();
  console.log('====USETIFUL LOG=====>', currentRouteName);
  const [tours, setTours] = useState();
  const [tourStepIndex, setTourStepIndex] = useState(0);
  useEffect(() => {
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
  const availableTour = useMemo(() => {
    setTourStepIndex(0);
    if (tours && tours.length) {
      return tours.find(tour => tour.targets.find(target => !!target.url && currentRouteName.includes(target.url)));
    } else {
      return undefined;
    }
  }, [currentRouteName, tours]);
  useEffect(() => {
    setSelfClosed(false);
  }, [currentRouteName]);
  const [selfClosed, setSelfClosed] = useState(false);

  // const measureElement = () => {
  //   if (viewRef.current) {
  //     viewRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       Alert.alert(`Element position: X: ${pageX}, Y: ${pageY}, Width: ${width}, Height: ${height}`);
  //     });
  //   }
  // };

  return /*#__PURE__*/_jsxs(View, {
    style: styles.UsetifulContainer,
    children: [children, !!availableTour && !selfClosed && availableTour.steps[tourStepIndex] && /*#__PURE__*/_jsx(View, {
      style: styles.usetifulLayer,
      children: /*#__PURE__*/_jsx(Modal, {
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
const styles = StyleSheet.create({
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