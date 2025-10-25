/*
 * WUITemplateLightDarkMode - v0.1
 * Author: Sergio E. Belmar (sbelmar@1640lab.com)
 * Copyright (c) Sergio E. Belmar (sbelmar@1640lab.com)
 */

class WUITemplateLightDarkMode {

	static version = "0.1";

	getScheme() {
		return getComputedStyle(document.documentElement).getPropertyValue("color-scheme").trim();
	}

	getCurrentScheme() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	setScheme(value) {
		if (typeof(value) == "string" && value.match(/^(light|only light|dark|only dark|light dark|dark light|system)$/i)) {
			value = value.match(/system/i) ? "light dark" : value.toLowerCase();
			if (this._colorScheme != value) {
				let delay = getComputedStyle(document.documentElement).getPropertyValue("--wui-template-lightdarkmode-transition-delay").trim() || "0";
				delay = (delay.match(/\d+s$/) ? 1000 : 1) * parseFloat(delay.replace(/m?s$/, ""));
				document.documentElement.querySelectorAll(".wui-template-lightdarkmode").forEach(element => {
					element.classList.add("transition");
				});
				document.documentElement.style.colorScheme = value;
				document.documentElement.dataset.scheme = value;
				this._colorScheme = value;
				setTimeout(() => {
					document.documentElement.querySelectorAll(".wui-template-lightdarkmode").forEach(element => {
						element.classList.remove("transition");
					});
				}, delay);
			}
		}
	}
}