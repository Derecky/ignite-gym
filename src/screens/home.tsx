import { ExerciseCard } from "@/components/exercise-card";
import { Group } from "@/components/group";
import { HomeHeader } from "@/components/home-header";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { useState } from "react";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costa");
  const [groups, setGroups] = useState(["Costa", "ombro", "bíceps", "Tríceps"]);
  const [exercises, setExercises] = useState([
    "puxada frontal",
    "remada unilateral",
    "remada curvada",
    "levantamento terra",
    "Barra simétrica",
    "Crucifixo quadril alto",
  ]);

  const navigation = useNavigation();

  const handleSelectExercise = () => {};

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleSelectExercise} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
