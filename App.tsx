import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  PermissionsAndroid,
  View,
  Text,
  Image
} from 'react-native';

import base64 from 'react-native-base64';
import { StyleSheet } from 'react-native';


import { BleManager, Device } from 'react-native-ble-plx';
import { LogBox } from 'react-native';
import MedicineDropdown from './src/components/MedicineDropdown/MedicineDropdown';
import FrequencyDropdown from './src/components/FrequencyDropdown/FrequencyDropdown';
import DaysDropdown from './src/components/DaysDropdown/DaysDropdown';
import PillSizeDropdown from './src/components/PillSizeDropdown/PillSizeDropdown';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';
const CONFIG_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';

export default function App() {
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();

  const [message, setMessage] = useState('Nothing Yet');

  const [selectedMedicines, setSelectedMedicines] = useState([null, null, null, null]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([null, null, null, null]);
  const [selectedDays, setSelectedDays] = useState([null, null, null, null]);
  const [selectedPillSizes, setSelectedPillSizes] = useState([null, null, null, null]);

  const [configvalue, setConfigValue] = useState("0000");



  const handleMedicineChange = (index, value) => {
    const newMedicines = [...selectedMedicines];
    newMedicines[index] = value;
    setSelectedMedicines(newMedicines);
    handleConfigChange(index);
    console.log("Medicine Value is :", value)
  };

  const handleFrequencyChange = (index, value) => {
    const newFrequencies = [...selectedFrequencies];
    newFrequencies[index] = value;
    setSelectedFrequencies(newFrequencies);
    handleConfigChange(index);
    console.log("Freq Value is :", value)
  };

  const handleDaysChange = (index, value) => {
    const newDays = [...selectedDays];
    newDays[index] = value;
    setSelectedDays(newDays);
    handleConfigChange(index);
    console.log("Days Value is :", value)
  };

  const handlePillSizesChange = (index, value) => {
    const newPillSizes = [...selectedPillSizes];
    newPillSizes[index] = value;
    setSelectedPillSizes(newPillSizes);
    handleConfigChange(index);
    console.log("Pills Sizes Value is :", value)
  };

  const handleConfigChange = (index) => {
    let value = `${index + 1}${selectedFrequencies[index]}${selectedDays[index]}`
    console.log("Medicines Values are :", selectedMedicines)
    console.log("Frq Values are :", selectedFrequencies)
    console.log("Days Values are :", selectedDays)
    setConfigValue(value);
    console.log("Config Value is :", value)
  };

  const checkReadyForConfig = (index) => {
    let realIndex = index - 1
    let check = (selectedMedicines[realIndex] === null || selectedFrequencies[realIndex] === null || selectedDays[realIndex] === null || selectedPillSizes[realIndex] === null)
    return check;
  }

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(answere => {
      console.log('scanning');
      // display the Activityindicator

      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }

        console.log(scannedDevice?.name)
        if (scannedDevice && scannedDevice.name == 'MediMate') {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);
    });
  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('DC completed'),
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  //Function to send data to ESP32
  async function sendConfigValue() {
    /* it will be called when queues did update */
    console.log("Config value sending is: ", configvalue)
    await BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      CONFIG_UUID,
      base64.encode(configvalue.toString()),
    ).then(characteristic => {
      console.log('Config value changed to :', base64.decode(characteristic.value));
    });
  }
  //Connect the device and start monitoring characteristics
  async function connectDevice(device: Device) {
    console.log('connecting to Device:', device.name);

    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device Disconnected');
          setIsConnected(false);
        });

        //Read inital values

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
          });

        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, CONFIG_UUID)
          .then(valenc => {
            setConfigValue(base64.decode(valenc?.value));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'messagetransaction',
        );

        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          CONFIG_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setConfigValue(base64.decode(characteristic?.value));
              console.log(
                'Box Value update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'boxtransaction',
        );

        console.log('Connection established');
      });
  }

  return (
    <View style={{ flex: 1 }}>
      {!isConnected ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
          {/* Title */}
          <View style={styles.rowViewCenter}>
            <Text style={styles.subtitleText}>Hello, I am your</Text>
          </View>
          <View style={styles.rowViewCenter}>
            <Text style={styles.titleTextBlue}>Medi</Text>
            <Text style={styles.titleText}>Mate</Text>
          </View>
          <View style={{ paddingBottom: 20 }}></View>
          <View style={styles.rowViewCenter}>
            <Text style={styles.baseText}>Please connect to start interacting with me!</Text>
          </View>
          {/* Connect Button */}
          <View style={styles.rowView}>
            <TouchableOpacity onPress={() => {
              scanDevices();
            }}
              disabled={false} style={{ padding: 10, margin: 20, backgroundColor: '#38B6FF', borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "stretch" }}>
          <View style={[styles.rowView, { justifyContent: 'space-around' }]}>
            <View style={[styles.rowViewCenter, { flex: 1, justifyContent: "flex-start", paddingHorizontal: 20 }]}>
              <Text style={styles.titleTextBlue}>Medi</Text>
              <Text style={styles.titleText}>Mate</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={() => {
                disconnectDevice();
              }}
                disabled={false} style={{ padding: 10, margin: 20, backgroundColor: '#ff3853', borderRadius: 5 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Disonnect</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.rowView, { flex: 1, alignItems: "center", marginHorizontal: 20 }]}>
            {/* Line 1 */}
            <View style={[styles.columnView, { flex: 1, alignItems: "stretch", marginHorizontal: 8 }]}>
              <Text style={{ fontSize: 20, marginBottom: 16 }}>Line 1</Text>
              <MedicineDropdown
                line={1}
                selectedValue={selectedMedicines[0]}
                onValueChange={handleMedicineChange}
              />
              <FrequencyDropdown
                line={1}
                selectedValue={selectedFrequencies[0]}
                onValueChange={handleFrequencyChange}
              />
              <DaysDropdown
                line={1}
                selectedValue={selectedDays[0]}
                onValueChange={handleDaysChange}
              />
              <PillSizeDropdown
                line={1}
                selectedValue={selectedPillSizes[0]}
                onValueChange={handlePillSizesChange}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  sendConfigValue();
                  console.log("Sending config value")
                }}
                  disabled={checkReadyForConfig(1)} style={{ padding: 10, backgroundColor: '#38B6FF', borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Configure line 1</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Line 1 */}
            <View style={[styles.columnView, { flex: 1, alignItems: "stretch", marginHorizontal: 8 }]}>
              <Text style={{ fontSize: 20, marginBottom: 16 }}>Line 2</Text>
              <MedicineDropdown
                line={2}
                selectedValue={selectedMedicines[1]}
                onValueChange={handleMedicineChange}
              />
              <FrequencyDropdown
                line={2}
                selectedValue={selectedFrequencies[1]}
                onValueChange={handleFrequencyChange}
              />
              <DaysDropdown
                line={2}
                selectedValue={selectedDays[1]}
                onValueChange={handleDaysChange}
              />
              <PillSizeDropdown
                line={2}
                selectedValue={selectedPillSizes[1]}
                onValueChange={handlePillSizesChange}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  sendConfigValue();
                  console.log("Sending config value")
                }}
                  disabled={false} style={{ padding: 10, backgroundColor: '#38B6FF', borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Configure line 2</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Line 1 */}
            <View style={[styles.columnView, { flex: 1, alignItems: "stretch", marginHorizontal: 8 }]}>
              <Text style={{ fontSize: 20, marginBottom: 16 }}>Line 3</Text>
              <MedicineDropdown
                line={3}
                selectedValue={selectedMedicines[2]}
                onValueChange={handleMedicineChange}
              />
              <FrequencyDropdown
                line={3}
                selectedValue={selectedFrequencies[2]}
                onValueChange={handleFrequencyChange}
              />
              <DaysDropdown
                line={3}
                selectedValue={selectedDays[2]}
                onValueChange={handleDaysChange}
              />
              <PillSizeDropdown
                line={3}
                selectedValue={selectedPillSizes[2]}
                onValueChange={handlePillSizesChange}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  sendConfigValue();
                  console.log("Sending config value")
                }}
                  disabled={false} style={{ padding: 10, backgroundColor: '#38B6FF', borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Configure line 3</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Line 1 */}
            <View style={[styles.columnView, { flex: 1, alignItems: "stretch", marginHorizontal: 8 }]}>
              <Text style={{ fontSize: 20, marginBottom: 16 }}>Line 4</Text>
              <MedicineDropdown
                line={4}
                selectedValue={selectedMedicines[3]}
                onValueChange={handleMedicineChange}
              />
              <FrequencyDropdown
                line={4}
                selectedValue={selectedFrequencies[3]}
                onValueChange={handleFrequencyChange}
              />
              <DaysDropdown
                line={4}
                selectedValue={selectedDays[3]}
                onValueChange={handleDaysChange}
              />
              <PillSizeDropdown
                line={4}
                selectedValue={selectedPillSizes[3]}
                onValueChange={handlePillSizesChange}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  sendConfigValue();
                  console.log("Sending config value")
                }}
                  disabled={false} style={{ padding: 10, backgroundColor: '#38B6FF', borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Configure line 4</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
      }
    </View >


  );

}

export const styles = StyleSheet.create({
  baseText: {
    fontSize: 15,
    fontFamily: 'Cochin',
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  titleTextBlue: {
    fontSize: 60,
    fontWeight: 'bold',
    color: "#38B6FF"
  },
  rowViewCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rowView: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  columnView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  }
});