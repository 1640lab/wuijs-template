/*
 * WUITemplateLightDarkMode - v0.1
 * Author: Sergio E. Belmar (sbelmar@1640lab.com)
 * Distributed by: 1640 Lab S.p.A. (https://1640lab.com)
 * Copyright (c) Sergio E. Belmar (sbelmar@1640lab.com)
 */

class WUITemplateLightDarkMode {

	static version = "0.1";

	getScheme() {
		return tgetComputedStyle(document.documentElement).getPropertyValue("color-scheme").trim();
	}

	setScheme(value) {
		if (typeof(value) == "string" && value.match(/^(light|only light|dark|only dark|light dark|dark light|auto)$/i)) {
			if (value.match(/auto/i)) {
				value = "light dark";
			}
			document.documentElement.style.colorScheme = value.toLowerCase();
		}
	}
}