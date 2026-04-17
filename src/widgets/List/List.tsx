import { SimpleGrid } from "@mantine/core";
import { LaunchCard } from "../Card/Card";
import { type Launch } from "./../../app/state.ts";

interface ListProps {
  launches: Launch[];
  onSeeMore: (launch: Launch) => void;
}

export function List({ launches, onSeeMore }: ListProps) {
  return (
    <SimpleGrid cols={3} spacing="lg" mb="xl">
      {launches.map((launch) => (
        <LaunchCard
          key={launch.id}
          missionName={launch.missionName}
          rocketName={launch.rocketName}
          imageUrl={launch.imageUrl}
          onSeeMore={() => onSeeMore(launch)}
        />
      ))}
    </SimpleGrid>
  );
}