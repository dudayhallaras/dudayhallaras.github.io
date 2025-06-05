let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)");
let theme = localStorage.getItem('theme');

const iconSun = "/assets/img/sun.svg";
const iconMoon = "/assets/img/moon.svg";

function changeIconImgSrc(src) {
	const iconDesktop = document.getElementById("theme-toggle-img");
	const iconMobile = document.getElementById("theme-toggle-img--mobile");
	if (iconDesktop) iconDesktop.src = src;
	if (iconMobile) iconMobile.src = src;
}

function applyTheme(theme) {
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', 'dark');
		changeIconImgSrc(iconMoon);
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		changeIconImgSrc(iconSun);
	}
}

// 1. Al cargar la página: aplica el tema guardado, o el del sistema si no hay ninguno
if (theme === "dark" || theme === "light") {
	applyTheme(theme);
} else {
	theme = systemInitiatedDark.matches ? "dark" : "light";
	localStorage.setItem('theme', theme);
	applyTheme(theme);
}

// 2. Cambios en la preferencia del sistema (sólo si el usuario no ha fijado uno manualmente)
systemInitiatedDark.addEventListener("change", (e) => {
	if (!localStorage.getItem('theme')) {
		const newTheme = e.matches ? "dark" : "light";
		applyTheme(newTheme);
	}
});

// 3. Cambiar tema manualmente con el botón
function modeSwitcher() {
	let currentTheme = localStorage.getItem('theme') || (systemInitiatedDark.matches ? "dark" : "light");
	let newTheme = currentTheme === "dark" ? "light" : "dark";
	localStorage.setItem('theme', newTheme);
	applyTheme(newTheme);
}
document.addEventListener("DOMContentLoaded", function () {
	let storedTheme = localStorage.getItem("theme");

	// Aplica el tema guardado o detectado
	if (storedTheme === "dark" || storedTheme === "light") {
		applyTheme(storedTheme);
	} else {
		let defaultTheme = systemInitiatedDark.matches ? "dark" : "light";
		localStorage.setItem("theme", defaultTheme);
		applyTheme(defaultTheme);
	}

	// Detecta cambio en preferencia del sistema (opcional)
	systemInitiatedDark.addEventListener("change", (e) => {
		if (!localStorage.getItem("theme")) {
			const newTheme = e.matches ? "dark" : "light";
			applyTheme(newTheme);
		}
	});
});
