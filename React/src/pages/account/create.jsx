import {
	Link,
	redirect,
	Form,
	useNavigation,
	useActionData,
	useLoaderData,
} from "react-router-dom";
import {
	Button,
	Flex,
	Group,
	NumberInput,
	Radio,
	Select,
	TextInput,
	Title,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { z } from "zod";

export async function loader() {
	const response = await fetch("http://localhost:1337/api/account-types");
	const AccountTypes = await response.json();

	return {
		AccountTypes,
	};
}

export async function action({ request }) {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData);
	const newData = { data: payload };
	console.log(newData);

	const createAccountSchema = z.object({
		name: z.string().nonempty(),
		account_type: z.string().nonempty(),
		balance: z.coerce.number().gte(0),
		dk: z.enum(["Debet", "Kredit"]),
	});

	const createAccount = createAccountSchema.safeParse(payload);
	if (!createAccount.success) {
		return { errors: createAccount.error.flatten() };
	}

	await fetch("http://localhost:1337/api/accounts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	});

	return redirect("/account");
}

export default function PageAccountCreate() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const actionData = useActionData();
	const errors = actionData?.errors?.fieldErrors;

	const data = useLoaderData();

	const AccountTypeOptions = data.AccountTypes.data.map((AccountType) => {
		return {
			label: AccountType.attributes.name_type,
			value: AccountType.id,
		};
	});

	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Add Account
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
					required
					error={errors?.name?.[0]}
				/>

				<Select
					label="Type"
					placeholder="Please choose one"
					withAsterisk
					size="md"
					name="account_type"
					required
					data={AccountTypeOptions}
					error={errors?.account_type?.[0]}
				/>

				<Radio.Group
					label="Normal Balance"
					withAsterisk
					size="md"
					name="dk"
					required
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
