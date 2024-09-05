# usetiful-react-native

Usetiful react native app

## Installation

```sh
npm install https://github.com/usetiful/usetiful-react-native
```

```sh
yarn add usetiful-react-native@https://github.com/usetiful/usetiful-react-native
```

## Usage

```js
import { Usetiful } from 'usetiful-react-native';
```

Wrap your APP with Usetiful tag
Note: Usetiful must be child of NavigationContainer

```js
<NavigationContainer>
  <Usetiful token="YOUR_USETIFUL_TOKEN">
    <YourApp />
  </Usetiful>
</NavigationContainer>
```

To use Pointers you need to register your element to our custom hook.
You can pick any key for your Ref and register it by useRefRegister, then use your key as a selector on Usetiful control panel selector.

```js
useRefRegister(
  { key: 'Test1', ref: viewRef },
  { key: 'SecondView', ref: secondViewRef },
  { key: 'NextView', ref: nextViewRef }
);
```

Example:
```js
const viewRef = useRef < View > null;
const secondViewRef = useRef < View > null;
const nextViewRef = useRef < View > null;

useRefRegister(
  { key: 'Test1', ref: viewRef },
  { key: 'SecondView', ref: secondViewRef },
  { key: 'NextView', ref: nextViewRef }
);

return (
  <View>
    <View ref={viewRef}>
      <Text>First Pointer</Text>
    </View>
    <View ref={secondViewRef}>
      <Text>Second Pointer</Text>
    </View>
    <View ref={nextViewRef}>
      <Text>Third Pointer</Text>
    </View>
  </View>
);
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
