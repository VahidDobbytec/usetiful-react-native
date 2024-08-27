import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Body } from '../Body';
import { Action } from '../Action';
import type { TourStep } from '../../types';
import { useStore } from '../../stores/useStore';
import { useEffect, useState } from 'react';

type Props = {
  step: TourStep;
  onColse: () => void;
};
export const Pointer = ({ step, onColse }: Props) => {
  const { title, actions, content, element } = step;
  const refs = useStore((s) => s.elementRefs);
  const ref = refs[element];
  const [result, setResult] = useState<string>();

  const [top, setTop] = useState<number>(0);

  useEffect(() => {
    if (ref && ref.current) {
      //@ts-ignore
      ref?.current.measure((x, y, width, height, pageX, pageY) => {
        const msg = `Element position new: X: ${pageX}, Y: ${pageY}, Width: ${width}, Height: ${height}`;
        setTop(pageY + height + 20);
        setResult(msg);
      });
    }
  }, [ref]);

  return (
    <View style={{ ...styles.pointer, marginTop: top }}>
      <View style={styles.pointerHeader}>
        <Text style={styles.pointerText}>{title}</Text>
        <TouchableOpacity style={styles.crossBtn} onPress={onColse}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pointerBody}>
        <Text>PP: {result}</Text>
      </View>
      <View style={styles.pointerBody}>
        {!!content && <Body content={content} />}
      </View>
      <View style={styles.pointerFooter}>
        {actions.map((action) => {
          return <Action key={action.id} {...{ action, onColse }} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pointer: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pointerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pointerFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  pointerText: {
    textAlign: 'center',
  },
  pointerBody: {
    paddingVertical: 8,
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end',
  },
});
