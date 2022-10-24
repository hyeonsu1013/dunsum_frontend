const menu = [
	{ menuId: "000_000000", menuName: "DashBord"	, pagePath: "views/dashbord", componentName: "Dashbord", url: "/"},
  { menuId: "000_000001",menuName: "About"	, pagePath: "views/common", componentName: "About", url: "/about"},

	{ menuId: "001_000010",menuName: "GuestIn"	, pagePath: "views/account", componentName: "GuestIn", url: "/account/guestin"},
	{ menuId: "001_000011",menuName: "SignIn"	, pagePath: "views/account", componentName: "SignIn", url: "/account/signin"},
	{ menuId: "001_000012",menuName: "SignUp"	, pagePath: "views/account", componentName: "SignUp", url: "/account/signup"},
];

export default {
	menu
}