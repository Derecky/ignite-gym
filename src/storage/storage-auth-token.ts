import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storage-config";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};

export async function storageAuthTokenSave(
  token: string,
  refreshToken: string
) {
  const payload = JSON.stringify({
    token,
    refresh_token: refreshToken,
  });

  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, payload);
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  console.log(response)

  const { token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {};

  return { token, refresh_token };
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
