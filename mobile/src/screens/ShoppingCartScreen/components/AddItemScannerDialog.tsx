import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import BarcodeMask from 'react-native-barcode-mask';
import { ButtonSize, View } from 'react-native-ui-lib';
import { Button } from 'react-native-ui-lib/core';
import Dialog, { DialogProps } from '../../../components/Dialog';

const TEST_SHIM_PRODUCTS = [
  ['2f79f446-a78c-404f-8ae5-b979c27997fe', 'Marinara'],
  ['5f575ad3-4832-4df3-a3e4-462b09f0eb42', 'Steak'],
  ['62a8991f-d283-4bfd-b02f-e91f3ec9d76a', 'Pasta'],
  ['d29a53fb-322b-463c-99dd-13d955f3b5c2', 'Oatmeal'],
  ['asfd', 'Error'],
];

type AddItemScannerDialogProps = {
  onBarcodeScanned: (data: string) => void;
} & DialogProps;

const AddItemScannerDialogContent: React.FC<AddItemScannerDialogProps> = ({
  onBarcodeScanned,
  visible,
  onDismiss,
}) => {
  // Use state to avoid calling callback multiple times
  const [scannedBarcodeData, setScannedBarcodeData] = useState<string>();
  useEffect(() => {
    if (scannedBarcodeData) {
      onBarcodeScanned(scannedBarcodeData);
    }
  }, [scannedBarcodeData]);

  const onDialogDismissed = (props: any) => {
    onDismiss?.(props);
    setScannedBarcodeData(undefined);
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={onDialogDismissed}
      disableContentPadding
      onDialogDismissed={onDialogDismissed}
    >
      <View width="100%" height={400}>
        <BarCodeScanner
          style={{ flex: 1 }}
          onBarCodeScanned={(barcodeEvent) =>
            setScannedBarcodeData(barcodeEvent.data)
          }
        >
          <BarcodeMask showAnimatedLine={false} />
        </BarCodeScanner>
        {/*Testing shim*/}
        <View row center padding-medium>
          {TEST_SHIM_PRODUCTS.map(([productId, name]) => {
            return (
              <Button
                size={'xSmall' as ButtonSize}
                label={name}
                link
                onPress={() => setScannedBarcodeData(productId)}
                key={name}
                marginH-small
              />
            );
          })}
        </View>
      </View>
    </Dialog>
  );
};

export default AddItemScannerDialogContent;
