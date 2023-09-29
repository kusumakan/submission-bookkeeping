import {
	Form,
	Link,
	redirect,
	useActionData,
	useLoaderData,
	useNavigation,
} from "react-router-dom";
import {
	Button,
	Flex,
	Group,
	NumberInput,
	Radio,
	TextInput,
	Title,
	Select,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";

export async function loader({ params }) {
	const accountResponse = await fetch(
		`http://localhost:1337/api/accounts/${params.id}?populate=*`
	);
	const accounts = await accountResponse.json();

	const account_typeResponse = await fetch(
		"http://localhost:1337/api/account-types"
	);
	const AccountTypes = await account_typeResponse.json();

	return {
		accounts,
		AccountTypes,
	};
}

export async function action({ request, params }) {
	// const formData = await request.formData();
	// const payload = Object.fromEntries(formData);

	const formData = await request.formData();
	const payload = Object.fromEntries(formData);
	const newData = { data: payload };
	console.log(newData);

	await fetch(`http://localhost:1337/api/accounts/${params.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	});

	return redirect("/account");
}

export default function PageAccountEdit() {
	const data = useLoaderData();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const errors = useActionData();

	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Edit Account
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

			<Form
				method="post"
				style={{ display: "flex", flexDirection: "column", gap: "16px" }}
			>
				<TextInput
					withAsterisk
					size="md"
					label="Name"
					placeholder="Input account name"
					name="name"
					defaultValue={data?.accounts.data.attributes.name}
					error={errors?.name?.[0]}
				/>

				<Select
					label="Account Type"
					placeholder="Please choose one"
					name="account_type"
					searchable
					nothingFound="No options"
					required
					data={data?.AccountTypes.data.map((account_type) => {
						return {
							label: account_type?.attributes.name_type,
							value: account_type?.id,
						};
					})}
					defaultValue={data?.accounts.data.attributes.account_type.data.id}
				/>

				<Radio.Group
					label="Normal Balance"
					withAsterisk
					size="md"
					name="dk"
					required
					defaultValue={String(data?.accounts.data.attributes.dk)}
					error={errors?.dk?.[0]}
				>
					<Group mt="xs">
						<Radio value="Debet" label="Debet" />
						<Radio value="Kredit" label="Kredit" />
					</Group>
				</Radio.Group>

				<NumberInput
					withAsterisk
					size="md"
					label="Balance"
					placeholder="Input account balance"
					name="balance"
					required
					defaultValue={data?.accounts.data.attributes.balance}
					error={errors?.balance?.[0]}
				/>

				<Group position="left" mt="md">
					<Button type="submit" loading={isSubmitting}>
						Submit
					</Button>
				</Group>
			</Form>
		</>
	);
}
