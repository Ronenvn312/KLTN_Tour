import { StyleSheet, Text, View } from 'react-native';
import { NavigationMain, NavigationAccount } from './navigation';
 
export default function App() {
  return (
    <NavigationMain />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
