/*
 * WUIPluginsThemes - v0.1
 * Author: Sergio E. Belmar (sbelmar@wuijs.dev)
 * Copyright (c) Sergio E. Belmar (sbelmar@wuijs.dev)
 */

class WUIPluginsThemes {

	static version = "0.1";

	getScheme() {
		return getComputedStyle(document.documentElement).getPropertyValue("color-scheme").trim();
	}

	getCurrentScheme() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	getTheme() {
		[...document.body.classList].forEach(name => {
			if (name.match(/^theme-(\d+|default)$/i)) {
				return name.toLowerCase();
			}
		});
		return "";
	}

	setScheme(value) {
		if (typeof(value) == "string" && value.trim().match(/^(light|only light|dark|only dark|light dark|dark light|system)$/i)) {
			const colorScheme = value.match(/dark light|system/i) ? "light dark" : value.toLowerCase().replace("only ", "").trim();
			if (this._colorScheme != colorScheme) {
				const className = colorScheme.replace("light dark", "system");
				let delay = getComputedStyle(document.documentElement).getPropertyValue("--wuiplugins-theme-transition-delay").trim() || "0";
				delay = (delay.match(/\d+s$/) ? 1000 : 1) * parseFloat(delay.replace(/m?s$/, ""));
				document.documentElement.querySelectorAll(".wuiplugins-themes").forEach(element => {
					element.classList.add("transition");
				});
				document.documentElement.style.colorScheme = colorScheme;
				document.body.classList.remove("system", "light", "dark");
				document.body.classList.add(className);
				this._colorScheme = colorScheme;
				setTimeout(() => {
					document.documentElement.querySelectorAll(".wuiplugins-themes").forEach(element => {
						element.classList.remove("transition");
					});
				}, delay);
			}
		}
	}
}