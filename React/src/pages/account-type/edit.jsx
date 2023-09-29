import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { Button, Flex, Group, TextInput, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";

export async function loader({ params }) {
	const response = await fetch(
		`http://localhost:1337/api/account-types/${params.id}`
	);
	const json = await response.json();

	return {
		account_type: json,
	};
}

export async function action({ request, params }) {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData);
	const newData = { data: payload };
	console.log(newData);

	await fetch(`http://localhost:1337/api/account-types/${params.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	});

	return redirect("/account-type");
}

export default function PageCategoryEdit() {
	const data = useLoaderData();
	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Edit Category
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
					placeholder="Input account_type name"
					name="name_type"
					defaultValue={data?.account_type.data.attributes.name_type}
				/>

				<Group position="left" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</Form>
		</>
	);
}
