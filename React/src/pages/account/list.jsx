import { useEffect } from "react";
import {
	Link,
	redirect,
	useLoaderData,
	useSubmit,
	useNavigation,
} from "react-router-dom";
import {
	ActionIcon,
	Badge,
	Button,
	Flex,
	Loader,
	Table,
	Text,
	Title,
} from "@mantine/core";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export async function loader() {
	const response = await fetch("http://localhost:1337/api/accounts?populate=*");
	const accounts = await response.json();

	return {
		accounts,
	};
}

export async function action({ request }) {
	const formData = await request.formData();
	const id = formData.get("id");
	await fetch(`http://localhost:1337/api/accounts/${id}`, {
		method: "DELETE",
	});

	return redirect("/account");
}

export default function PageAccountList() {
	const data = useLoaderData();
	console.log(data);

	// untuk separate angka biaya dengan titik
	function formatNumberWithDots(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

	const submit = useSubmit();

	const openModal = (id) =>
		modals.openConfirmModal({
			title: "Please confirm your action",
			children: (
				<Text size="sm">Are you sure you want to delete this account?</Text>
			),
			labels: { confirm: "Delete", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onCancel: () => console.log("Cancel"),
			onConfirm: () => {
				const formData = new FormData();
				formData.append("id", id);
				submit(formData, { method: "POST" });
			},
		});

	const navigation = useNavigation();
	useEffect(() => {
		if (navigation.state === "submitting") {
			modals.open({
				title: "Loading...",
				closeOnClickOutside: true,
				closeOnEscape: false,
				withCloseButton: false,
				children: (
					<Flex justify="center" align="center" direction="row">
						<Loader size="lg" />
					</Flex>
				),
			});
		} else {
			modals.closeAll();
		}
	}, [navigation.state]);

	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Account List
				</Title>

				<Button component={Link} to="/account/create" leftIcon={<IconPlus />}>
					Add
				</Button>
			</Flex>

			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Normal Balance</th>
						<th>Balance</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{data.accounts.data.map((account) => (
						<tr key={account.id}>
							<td>{account.attributes.name}</td>
							<td>
								{account.attributes.account_type.data.attributes.name_type}
							</td>
							<td>
								{account.attributes.dk === "Debet" ? (
									<Badge color="blue">Debet</Badge>
								) : (
									<Badge color="red">Kredit</Badge>
								)}
							</td>
							<td>
								<Badge color="green">
									{formatNumberWithDots(account.attributes.balance)}
								</Badge>
							</td>
							<td style={{ width: 150 }}>
								<Flex gap="sm">
									<ActionIcon
										component={Link}
										to="/account/1/detail"
										variant="gradient"
										size="md"
										gradient={{ from: "blue", to: "green", deg: 72 }}
									>
										<IconEye size={20} />
									</ActionIcon>

									<ActionIcon
										component={Link}
										to={`/account/${account.id}/edit`}
										variant="gradient"
										size="md"
										gradient={{ from: "red", to: "yellow", deg: 72 }}
									>
										<IconPencil size={20} />
									</ActionIcon>

									<ActionIcon
										variant="gradient"
										size="md"
										gradient={{ from: "grape", to: "red", deg: 110 }}
										type="submit"
										onClick={() => openModal(account.id)}
									>
										<IconTrash size={20} />
									</ActionIcon>
								</Flex>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
