import { Text, View, ScrollView, Image, Button } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Bluetooth,
  BluetoothConnected,
  BluetoothOff,
  Wallet2,
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { useContext } from "react";
import ConfigContext from "../../context/config-context";
import ConfigForm from "../../components/config-form";

export default function Home() {
  const configObj = useContext(ConfigContext);
  const bluetoothStatus = configObj?.config.bleStatus;
  const walletAddress = configObj?.config.walletAddress;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.cardContainer}>
        <View style={styles.qrContainer}>
          {walletAddress !== "" ? (
            <QRCode value={walletAddress} size={200} />
          ) : (
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={{
              display: "flex",
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Link href="/bluetooth-modal" asChild>
              <Button
                style={styles.button}
                backgroundColor={
                  bluetoothStatus === "connected"
                    ? "$color"
                    : bluetoothStatus === "off"
                    ? "$background"
                    : "$backgroundHover"
                }
              >
                {bluetoothStatus === "connected" ? (
                  <BluetoothConnected color="$background" />
                ) : bluetoothStatus === "off" ? (
                  <BluetoothOff color="$color" />
                ) : (
                  <Bluetooth color="$color" />
                )}
              </Button>
            </Link>
            <Button
              style={styles.button}
              backgroundColor={walletAddress ? "$color" : "$background"}
            >
              <Wallet2 color={walletAddress ? "$background" : "$color"} />
            </Button>
          </View>
          <Button style={styles.qrCodeGenerateButton}>
            <Text>Refresh</Text>
          </Button>
          <Button
            style={styles.qrCodeGenerateButton}
            disabled={!walletAddress}
          >
            <Text>Generate QR code</Text>
          </Button>
        </View>
      </View>
      <ScrollView>
        <ConfigForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    aspectRatio: 1.5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  qrContainer: {
    height: "85%",
    aspectRatio: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "45%",
    height: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  button: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeGenerateButton: {
    width: "90%",
    height: "30%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
