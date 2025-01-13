import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  type TextStyle,
  ScrollView,
} from 'react-native';
import AccessibilityManager, {
  type AccessibilityServiceType,
} from 'react-native-accessibility-service-checker';

export default function App() {
  const [enabledService, setEnabledService] = useState<
    AccessibilityServiceType[]
  >([]);
  const [installedService, setInstalledService] = useState<
    AccessibilityServiceType[]
  >([]);

  const [isEnabled, setIsEnabled] = useState(false);

  // const eventhandler = (isEnabled: boolean) => {
  //   setIsEnabled(isEnabled);
  // };
  const eventhandler = (val: boolean) => {
    console.log(`ASC: ${val}`);
    setIsEnabled(val);
  };

  useEffect(() => {
    setEnabledService(AccessibilityManager.getEnabledServices());
    setInstalledService(AccessibilityManager.getInstalledService());
    const serviceListener = AccessibilityManager.addListener(eventhandler);
    return () => {
      serviceListener.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 24 }}>{`isEnabled: ${isEnabled}`}</Text>
      <SectionList
        scrollEnabled={false}
        sections={[
          {
            title: 'Enabled',
            data: enabledService,
          },
          {
            title: 'Installed',
            data: installedService,
          },
        ]}
        keyExtractor={(item) => item.id}
        renderSectionHeader={(props) => {
          return (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTxt}>{props.section.title}</Text>
            </View>
          );
        }}
        renderItem={(props) => {
          return (
            <View>
              <RowItem title="id" value={props.item.id} bold />
              <RowItem title="desc" value={props.item.description} />
              <RowItem title="events" value={props.item.eventTypes} />
              <RowItem title="flag" value={props.item.flag} />
              <RowItem title="capa" value={props.item.capabilities} />
              <View style={styles.itemEnd} />
            </View>
          );
        }}
      />
    </ScrollView>
  );
}

type RowItemPropsType = {
  title: string;
  value: any;
  fontSize?: number;
  bold?: boolean;
};
const RowItem = (props: RowItemPropsType) => {
  const selectedFontSize: TextStyle = { fontSize: props.fontSize || 16 };
  const selectedFontWeight: TextStyle = {
    fontWeight: props.bold ? 'bold' : 'normal',
  };
  return (
    <View style={styles.rowItem}>
      <Text
        style={[selectedFontSize, selectedFontWeight, styles.titleContainer]}
      >{`${props.title}: `}</Text>
      <Text
        style={[selectedFontSize, selectedFontWeight]}
      >{`${props.value}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    borderTopWidth: 4,
  },
  headerTxt: {
    fontSize: 24,
  },
  itemEnd: {
    height: 2,
    width: '100%',
    borderTopWidth: 2,
    borderStyle: 'dashed',
  },
  rowItem: {
    flexDirection: 'row',
  },
  titleContainer: {
    width: 50,
  },
});
