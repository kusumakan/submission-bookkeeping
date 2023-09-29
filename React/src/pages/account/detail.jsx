import { Link, useLoaderData } from "react-router-dom";
import { Button, Flex, Title, Image, Text, Badge, Group } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";

import imgAccount from "../../assets/images/shoe-example.jpg";

export async function loader({ params }) {
	const response = await fetch(
		`http://localhost:1337/api/accounts/${params.id}`
	);
	const json = await response.json();

	return {
		account: json,
	};
}

export default function PageAccountDetail() {
	const data = useLoaderData();

	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Detail Account
				</Title>

				<Button
					component={Link}
					to="/account"
					variant="outline"
					leftIcon={<IconArrowBack />}
				>
					Back
				</Button>
			</Flex>

			<Flex align="center" gap="xl">
				<Image maw={450} radius="md" src={imgAccount} alt="Account img" />

				<Flex direction="column" gap="xs">
					<Flex direction="column" gap="xs" style={{ width: 500 }}>
						<Flex>
							<Badge color="blue"> Sport Account</Badge>
							<Badge color="green">Available</Badge>
						</Flex>

						<Title order={1}>{data?.account.name}</Title>

						<Text size="xl" fs="italic">
							Quantity: {data?.account.qty}
						</Text>

						<Title order={2} color="blue">
							{data?.account.price}
						</Title>

						<Text size="md">{data?.account.desc}</Text>
					</Flex>

					<Group position="left" mt="sm">
						<Button
							component="a"
							href="/account/1/edit"
							type="submit"
							color="gray"
							variant="outline"
						>
							Edit Account
						</Button>
					</Group>
				</Flex>
			</Flex>
		</>
	);
}
