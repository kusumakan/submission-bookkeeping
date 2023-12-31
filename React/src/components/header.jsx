import { Header, Title, MediaQuery, Flex } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

export function HeaderMain({ onToggle }) {
	return (
		<Header height={{ base: 50, md: 70 }} p="md">
			<Flex direction="row" align="center" gap="sm" style={{ height: "100%" }}>
				<MediaQuery largerThan="sm" styles={{ display: "none" }}>
					<IconMenu2 size={30} strokeWidth={2} onClick={() => onToggle()} />
				</MediaQuery>
				<Title order={4}>Accounting</Title>
			</Flex>
		</Header>
	);
}
