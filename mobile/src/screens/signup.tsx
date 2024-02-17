import { useNavigation } from "@react-navigation/native";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import BackgroundImage from "@/assets/background.png";
import LogoSvg from "@/assets/logo.svg";
import { api } from "@/services/api";
import { AppError } from "@/utils/app-error";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const defaultValues: FormDataProps = {
  name: "",
  email: "",
  password: "",
  password_confirm: "",
};

const signupSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("E-mail inválido.")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "Sua senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues,
    resolver: yupResolver(signupSchema),
  });
  const navigation = useNavigation();
  const toast = useToast();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async ({ email, name, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await api.post("/users", {
        name,
        email,
        password,
      });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({ title, placement: "top", bgColor: "danger.500" });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Pessoas treinando na academia"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb="6" fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Nome"
                errorMessage={errors.name?.message}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                errorMessage={errors.password?.message}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para o login"
          variant="outline"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
