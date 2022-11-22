const menu = [
	{ menuId: "000_000000", menuName: "DashBord"	, pagePath: "views/dashbord", componentName: "Dashbord", url: "/"},
  { menuId: "000_000001",menuName: "About"	, pagePath: "views/common", componentName: "About", url: "/about"},

	{ menuId: "001_000010",menuName: "GuestIn"	, pagePath: "views/account", componentName: "GuestIn", url: "/account/guestin"},
	{ menuId: "001_000011",menuName: "SignIn"	, pagePath: "views/account", componentName: "SignIn", url: "/account/signin"},
	{ menuId: "001_000012",menuName: "SignUp"	, pagePath: "views/account", componentName: "SignUp", url: "/account/signup"},

	{ menuId: "002_000010",menuName: "CharacterList"	, pagePath: "views/search", componentName: "CharacterList", url: "/search/clist"},
	{ menuId: "002_000011",menuName: "ItemList"	, pagePath: "views/search", componentName: "ItemList", url: "/search/ilist"},
];

export default {
	menu
}