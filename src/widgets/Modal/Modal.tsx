import { Image, Text, Stack, Group, CloseButton, Center } from "@mantine/core";
import { type Launch } from "./../../app/state.ts";
import { PortalModal } from "./PortalModal";


interface LaunchModalProps {
  opened: boolean;
  onClose: () => void;
  launch: Launch | null;
}

export function LaunchModal({ opened, onClose, launch }: LaunchModalProps) {
  if (!launch) return null;

  return (
    <PortalModal opened={opened} onClose={onClose}>
      <Group justify="space-between" mb="md">
        <Text fw={600} size="lg">
          {launch.missionName}
        </Text>
        <CloseButton onClick={onClose} />
      </Group>

      <Center mb="md">
        <Image
          src={launch.imageUrl}
          alt={launch.missionName}
          w={240}
          h={240}
          fit="cover"
          radius="md"
        />
      </Center>

      <Stack gap="md">
        {/* Mission name */}
        <Stack gap={2}>
          <Text fw={600}>Mission name</Text>
          <Text c="dimmed">{launch.missionName}</Text>
        </Stack>

        {/* Rocket name */}
        <Stack gap={2}>
          <Text fw={600}>Rocket name</Text>
          <Text c="dimmed">{launch.rocketName}</Text>
        </Stack>

        {/* Details */}
        <Stack gap={2}>
          <Text fw={600}>Details</Text>
          <Text c="dimmed">{launch.description}</Text>
        </Stack>
      </Stack>
    </PortalModal>
  );
}