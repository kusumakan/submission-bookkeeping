import { Title } from "@mantine/core";

export default function PageHome() {
	return (
		<>
			<Title
				variant="gradient"
				gradient={{ from: "violet", to: "cyan", deg: 50 }}
			>
				Welcome to My Bookkeeping website!
			</Title>
			<br></br>
			<br></br>
			<Title order={4}>
				This website was made with love and passion by Ni Putu Noviyanti Kusuma,
				A.Md., S.Ak., M.Ak., EHE
			</Title>
		</>
	);
}
