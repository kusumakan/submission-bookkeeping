import { Outlet, createBrowserRouter } from "react-router-dom";

import LayoutMain from "./layouts/main";
import PageHome from "./pages/home";

import PageAccountList, {
	loader as loaderAccountList,
	action as deleteAccount,
} from "./pages/account/list";
import PageAccountDetail, {
	loader as loaderAccountDetail,
} from "./pages/account/detail";
import PageAccountCreate, {
	action as actionAccountCreate,
	loader as loaderAccountCreate,
} from "./pages/account/create";
import PageAccountEdit, {
	loader as loaderAccountEdit,
	action as actionAccountEdit,
} from "./pages/account/edit";

import PageAccountTypeList, {
	loader as loaderAccountType,
	action as deleteAccountType,
} from "./pages/account-type/list";
import PageAccountTypeCreate, {
	action as actionAccountTypeCreate,
} from "./pages/account-type/create";
import PageAccountTypeEdit, {
	loader as loaderAccountTypeEdit,
	action as actionAccountTypeEdit,
} from "./pages/account-type/edit";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutMain />,
		children: [
			{
				index: true,
				element: <PageHome />,
			},
			{
				path: "/account",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <PageAccountList />,
						loader: loaderAccountList,
						action: deleteAccount,
					},
					{
						path: ":id/detail",
						element: <PageAccountDetail />,
						loader: loaderAccountDetail,
					},
					{
						path: "create",
						element: <PageAccountCreate />,
						action: actionAccountCreate,
						loader: loaderAccountCreate,
					},
					{
						path: ":id/edit",
						element: <PageAccountEdit />,
						loader: loaderAccountEdit,
						action: actionAccountEdit,
					},
				],
			},
			{
				path: "/account-type",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <PageAccountTypeList />,
						loader: loaderAccountType,
						action: deleteAccountType,
					},
					{
						path: "create",
						element: <PageAccountTypeCreate />,
						action: actionAccountTypeCreate,
					},
					{
						path: ":id/edit",
						element: <PageAccountTypeEdit />,
						loader: loaderAccountTypeEdit,
						action: actionAccountTypeEdit,
					},
				],
			},
		],
	},
]);

export default router;
