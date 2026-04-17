import { useEffect, useReducer } from "react";
import { MantineProvider, Container, Title, Loader, Text, Stack } from "@mantine/core";
import { List } from "./widgets/List/List";
import { LaunchModal } from "./widgets/Modal/Modal";
import "./App.css";
import {
  reducer,
  initialState,
  mapApiLaunches,
  type Launch,
} from "./app/state";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { launches, isLoading, error, selectedLaunch, isModalOpen } = state;

  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    fetch("https://api.spacexdata.com/v3/launches?launch_year=2020")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Request failed with status ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: mapApiLaunches(data) });
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : "Unknown error";
        dispatch({ type: "FETCH_ERROR", payload: message });
      });
  }, []);

  const handleSeeMore = (launch: Launch) => {
    dispatch({ type: "OPEN_MODAL", payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
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

        <LaunchModal
          opened={isModalOpen}
          onClose={handleCloseModal}
          launch={selectedLaunch}
        />
      </Container>
    </MantineProvider>
  );
}

export default App;