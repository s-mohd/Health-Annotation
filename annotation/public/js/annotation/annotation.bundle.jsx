import * as React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";


class Annotation {
	constructor({ page, wrapper }) {
		this.$wrapper = $(wrapper);
		this.page = page;

		// Create a ref for the App component
        this.appRef = React.createRef();

		this.init();
	}

	init() {
		this.setup_page_actions();
		this.setup_app();
	}

	setup_page_actions() {
		// setup page actions
		this.primary_btn = this.page.set_primary_action(__("Save"), () => {
	  		// Call the function in the App component via the ref
			if (this.appRef.current) {
				this.appRef.current.handleSave();
			}
		});
	}

	setup_app() {
		// create and mount the react app
		const root = createRoot(this.$wrapper.get(0));
		root.render(<App ref={this.appRef}/>);
		this.$annotation = root;
	}
}

frappe.provide("frappe.ui");
frappe.ui.Annotation = Annotation;
export default Annotation;