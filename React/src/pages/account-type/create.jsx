import { Link, redirect, Form } from "react-router-dom";
import { Button, Flex, Group, TextInput, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";

export async function action({ request }) {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData);
	const newData = { data: payload };
	console.log(newData);

	await fetch("http://localhost:1337/api/account-types", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	});

	return redirect("/account-type");
}

export default function PageAccountTypeCreate() {
	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Add AccountType
				</Title>

				<Button
					component={Link}
					to="/account-type"
					variant="outline"
					leftIcon={<IconArrowBack />}
				>
					Back
				</Button>
			</Flex>

			<Form
				method="POST"
				style={{ display: "flex", flexDirection: "column", gap: "16px" }}
			>
				<TextInput
					withAsterisk
					size="md"
					label="Name"
					placeholder="Input account-type name"
					name="name_type"
					required
				/>

				<Group position="left" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</Form>
		</>
	);
}
