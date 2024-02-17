import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

import BodySvg from "@/assets/body.svg";
import SeriesSvg from "@/assets/series.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";
import { Button } from "@/components/button";
import { AppError } from "@/utils/app-error";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@/dtos/exercise-dto";
import { Loading } from "@/components/loading";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDTO>(
    {} as ExerciseDTO
  );

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);

      setExerciseDetails(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      toast.show({ title, placement: "top", bgColor: "danger.500" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    try {
      setSendingRegister(true);

      await api.post("/history", { exercise_id: exerciseId });
      toast.show({
        title: "Parabéns! Exercício registrado no seu histórico.",
        placement: "top",
        bgColor: "green.700",
      });

      navigation.navigate("history")
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

      toast.show({ title, placement: "top", bgColor: "danger.500" });
    } finally {
      setSendingRegister(false);
    }
  };

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            flexShrink={1}
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
          >
            {exerciseDetails.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exerciseDetails.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Box mb={3} rounded="lg" overflow="hidden">
          <Image
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`,
            }}
            w="full"
            h={80}
            alt="Nome do exercício"
            resizeMode="cover"
          />
        </Box>

        <Box bg="gray.600" rounded="md" pb={4} px={4}>
          <HStack
            justifyContent="space-around"
            alignItems="center"
            mb={6}
            mt={5}
          >
            <HStack alignItems="center">
              <SeriesSvg />
              <Text color="gray.200" ml={2}>
                {exerciseDetails.series} Séries
              </Text>
            </HStack>

            <HStack alignItems="center">
              <RepetitionsSvg />
              <Text color="gray.200" ml={2}>
                {exerciseDetails.repetitions} Repetições
              </Text>
            </HStack>
          </HStack>

          <Button
            title="Marcar como realizado"
            isLoading={sendingRegister}
            onPress={handleExerciseHistoryRegister}
          />
        </Box>
      </VStack>
    </VStack>
  );
}
