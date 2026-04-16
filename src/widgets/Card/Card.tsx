import { Card, Image, Text, Button, Stack } from "@mantine/core";

export interface LaunchCardProps {
  missionName: string;
  rocketName: string;
  imageUrl: string;
  onSeeMore?: () => void;
}

export function LaunchCard({
  missionName,
  rocketName,
  imageUrl,
  onSeeMore,
}: LaunchCardProps) {
  if (!onSeeMore) return null;

  function onClick() {
    if (onSeeMore) onSeeMore()
  }

  return (
    <Card 
        shadow="sm" 
        padding="lg" 
        display="flex"
        h="100%"
        withBorder
    >
    <Image src={imageUrl} alt={missionName} fit="cover"/>
      <Stack gap="xs" mt="md" ta="center"         
        flex={1}
        justify="flex-end"
      >
        <Text fw={500} >{missionName}</Text>
        <Text size="sm" c="dimmed">
          {rocketName}
        </Text>
        <Button variant="light" color="blue" mt="md" onClick={onClick}>
          See more
        </Button>
      </Stack>
    </Card>
  );
}