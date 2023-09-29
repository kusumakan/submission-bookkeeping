import { Link, useLoaderData, Form, redirect } from "react-router-dom";
import { ActionIcon, Button, Flex, Table, Title } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

export async function loader() {
	const response = await fetch("http://localhost:1337/api/account-types");
	const account_type = await response.json();

	return {
		account_type,
	};
}

export async function action({ request }) {
	const formData = await request.formData();
	const id = formData.get("id");
	await fetch(`http://localhost:1337/api/account-types/${id}`, {
		method: "DELETE",
	});

	return redirect("/account-type");
}

export default function PageCategoryList() {
	const data = useLoaderData();
	console.log(data);
	return (
		<>
			<Flex direction="row" align="center" justify="space-between" mb="md">
				<Title
					order={3}
					variant="gradient"
					gradient={{ from: "cyan", to: "indigo", deg: 90 }}
				>
					Account Type List
				</Title>

				<Button
					component={Link}
					to="/account-type/create"
					leftIcon={<IconPlus />}
				>
					Add
				</Button>
			</Flex>

			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{data.account_type.data.map((account_type) => (
						<tr key={account_type.id}>
							<td>{account_type.attributes.name_type}</td>
							<td style={{ width: 150 }}>
								<Flex gap="sm">
									<ActionIcon
										component={Link}
										to={`/account-type/${account_type.id}/edit`}
										variant="gradient"
										size="md"
										gradient={{ from: "red", to: "yellow", deg: 72 }}
									>
										<IconPencil size={20} />
									</ActionIcon>

									<Form method="post">
										<input
											type="hidden"
											name="id"
											defaultValue={account_type.id}
										/>
										<ActionIcon
											variant="gradient"
											size="md"
											gradient={{ from: "grape", to: "red", deg: 110 }}
											type="submit"
										>
											<IconTrash size={20} />
										</ActionIcon>
									</Form>
								</Flex>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
