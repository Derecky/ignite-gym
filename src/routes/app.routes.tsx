import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import { Exercise } from "@/screens/exercise";
import { History } from "@/screens/history";
import { Home } from "@/screens/home";
import { Profile } from "@/screens/profile";

import HomeSvg from "@/assets/home.svg";
import ProfileSvg from "@/assets/profile.svg";
import HistorySvg from "@/assets/history.svg";

const { Navigator, Screen } = createBottomTabNavigator();

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: { exerciseId: string };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const IconSize = sizes[6];

  const screenOption: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: colors.green[500],
    tabBarInactiveTintColor: colors.gray[200],
    tabBarStyle: {
      backgroundColor: colors.gray[600],
      borderTopWidth: 0,
      height: Platform.OS === "android" ? "auto" : 96,
      paddingBottom: sizes[10],
      paddingTop: sizes[6],
    },
  };

  const hideTabBarOption: BottomTabNavigationOptions = {
    tabBarButton: () => null,
  };

  return (
    <Navigator screenOptions={screenOption}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} height={IconSize} width={IconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} height={IconSize} width={IconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} height={IconSize} width={IconSize} />
          ),
        }}
      />

      <Screen name="exercise" component={Exercise} options={hideTabBarOption} />
    </Navigator>
  );
}
