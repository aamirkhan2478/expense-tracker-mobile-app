import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { Text } from "~/components/ui/text";
import { Separator } from "~/components/ui/separator";
import { useColorScheme } from "~/lib/useColorScheme";
import { View } from "react-native";

function Dialog({
  openDialog,
  closeDialog,
  onPress,
  title,
  desc,
  actionText,
  cancelText,
}) {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent
        className={`${isDarkColorScheme ? "bg-[#1E293B]" : "bg-white"}`}
      >
        <AlertDialogHeader>
          <View>
            {title && (
              <AlertDialogTitle
                className={`${isDarkColorScheme ? "text-white" : "text-black"}`}
              >
                {title}
              </AlertDialogTitle>
            )}
          </View>
        </AlertDialogHeader>
        {desc && (
          <AlertDialogDescription
            className={`${isDarkColorScheme ? "text-white" : "text-black"}`}
          >
            {desc}
          </AlertDialogDescription>
        )}
        <Separator className="w-[280px] mt-4" />
        <AlertDialogFooter className="flex-row-reverse">
          <AlertDialogCancel onPress={closeDialog}>
            <Text>{cancelText}</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={onPress}>
            <Text>{actionText}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Dialog;
