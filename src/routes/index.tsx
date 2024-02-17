import { useTheme, Box, VStack, Center } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { Loading } from "@/components/loading";

export function Routes() {
  const { colors } = useTheme();

  const { user, isLoadingUserStorageData } = useContext(AuthContext);

  const isAuthenticated = !!user.id;

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
