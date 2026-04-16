import { useEffect, useState } from "react";
import { MantineProvider, Container, Title, Loader, Text, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { List } from "./widgets/List/List";
import { LaunchModal } from "./widgets/Modal/Modal";
import emptyRocketImg from "./assets/empty-rocket.png";
import "./App.css";

export interface ApiLaunch {
  flight_number: number;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string | null;
  };
  details: string | null;
}

export interface Launch {
  id: number;
  missionName: string;
  rocketName: string;
  imageUrl: string;
  description: string;
}

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.spacexdata.com/v3/launches?launch_year=2020")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Request failed with status ${resp.status}`);
        }
        return resp.json();
      })
      .then((data: ApiLaunch[]) => {
        const mapped: Launch[] = data.map((item) => ({
          id: item.flight_number,
          missionName: item.mission_name,
          rocketName: item.rocket.rocket_name,
          imageUrl:
            item.links.mission_patch || emptyRocketImg,
          description: item.details ?? "No details provided",
        }));
        setLaunches(mapped);
        setError(null);
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSeeMore = (launch: Launch) => {
    setSelectedLaunch(launch);
    open();
  };

  return (
    <MantineProvider>
      <Container pt='xl'>
        <Title order={1} ta="center" mb="xl">
          SpaceX Launches 2020
        </Title>

        {/* Состояния загрузки/ошибки/данных */}
        {isLoading && (
          <Stack align="center" mt="lg">
            <Loader />
            <Text c="dimmed">Loading launches...</Text>
          </Stack>
        )}

        {error && !isLoading && (
          <Text c="red" ta="center" mt="lg">
            Failed to load launches: {error}
          </Text>
        )}

        {!isLoading && !error && launches.length > 0 && (
          <List launches={launches} onSeeMore={handleSeeMore} />
        )}

        <LaunchModal opened={opened} onClose={close} launch={selectedLaunch} />

      </Container>
    </MantineProvider>
  );
}

export default App;