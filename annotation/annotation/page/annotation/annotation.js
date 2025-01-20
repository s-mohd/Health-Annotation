frappe.pages["annotation"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Annotation"),
		single_column: true,
	});
	
	// Define process.env globally
	window.process = window.process || {};
	window.process.env = {
		NODE_ENV: "production", // or "development"
		IS_PREACT: "false", // set this based on your requirement
	};
};

frappe.pages["annotation"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require(["annotation.bundle.jsx", "annotation.bundle.css"]).then(() => {
		frappe.annotation = new frappe.ui.Annotation({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}