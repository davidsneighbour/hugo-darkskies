import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";
import intersect from "@alpinejs/intersect";

import ClickSpark from "./components/click-effect.js";
import ProgressBar from "./components/progress-bar.js";

import "./scripts/keyboard-layout.js";
import "./plugins/clipboard.js";

// Import bootstrap scripts
import "./scripts/bs-tooltips.js";

// Import parameters from GoHugo
// @ts-ignore - this is loaded at runtime by GoHugo
import * as params from "@params";

// YouTube element
// @ts-ignore - this is loaded at runtime by GoHugo
import LiteYTEmbed from "./lite-yt-embed.js";

// Initiate custom elements
customElements.define("lite-youtube", LiteYTEmbed);
customElements.define("click-effect", ClickSpark);
customElements.define("progress-bar", ProgressBar);

// Initialize theme switcher
document.addEventListener("alpine:init", () => {
	Alpine.data("themeSwitcher", () => ({
		theme: "dark",
		_giscusPath: "https://giscus.app",
		init() {
			this.theme = this.getColorPreference();
			this.reflectPreference();
			this.changeGiscusTheme();
			setTimeout(() => this.changeGiscusTheme(), 2000);

			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					this.theme = e.matches ? "dark" : "light";
					this.setPreference();
				});
		},
		toggleTheme() {
			this.theme = this.theme === "light" ? "dark" : "light";
			this.setPreference();
			this.changeGiscusTheme();
			setTimeout(() => this.changeGiscusTheme(), 2000);
		},
		getColorPreference() {
			return (
				localStorage.getItem("dnb-theme") ||
				(window.matchMedia("(prefers-color-scheme: light)").matches
					? "light"
					: "dark")
			);
		},
		setPreference() {
			localStorage.setItem("dnb-theme", this.theme);
			this.reflectPreference();
		},
		reflectPreference() {
			if (document.firstElementChild) {
				document.firstElementChild.setAttribute("data-bs-theme", this.theme);
			}
			document.body.classList.add(this.theme);
			document.body.classList.remove(this.theme === "dark" ? "light" : "dark");
		},
		changeGiscusTheme() {
			const giscusTheme = this.theme === "dark" ? "dark" : "light";
			const iframe = document.querySelector("iframe.giscus-frame");
			if (iframe instanceof HTMLIFrameElement && iframe.contentWindow) {
				iframe.contentWindow.postMessage(
					{ giscus: { setConfig: { theme: giscusTheme } } },
					this._giscusPath,
				);
			}
		},
	}));
});

// Extend the Window interface to include the Alpine property
// declare global {
// 	interface Window {
// 		Alpine: typeof Alpine;
// 	}
// }

document.onreadystatechange = () => {
	if (document.readyState === "complete") {
		window.Alpine = Alpine;
		Alpine.plugin(collapse);
		Alpine.plugin(intersect);

		// Define the Alpine.js data component with initial placeholder values
		Alpine.data("versionData", () => {
			return {
				version: "Loading...",
				url: "#",
				init() {
					this.fetchVersionData();
				},
				async fetchVersionData() {
					const apiUrl = `https://api.github.com/repos/davidsneighbour/kollitsch.dev/releases/tags/v${params.version}`;
					try {
						const response = await fetch(apiUrl);
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						const data = await response.json();
						this.version = data.tag_name;
						this.url = data.html_url;
					} catch (error) {
						console.error("Failed to fetch version data:", error);
						this.version = "Error";
						this.url = "#";
					}
				},
			};
		});
		Alpine.start();
	}
};

document.addEventListener("scroll", () => {
	const scroll =
		(
      (document.documentElement.scrollTop || document.body.scrollTop) /
			(
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
				document.documentElement.clientHeight
      )
    ) * 100;
	const progress = document.querySelector(".progress");
	// Check if the progress element is not null before accessing its properties
		if (progress) {
			progress.style.setProperty("--scroll", scroll + "%");
			progress.setAttribute("aria-valuenow", scroll);
		}
});

document.addEventListener("DOMContentLoaded", () => {
  const placeholderSelector = ".section--sitetitle";
  const navbarSelector = ".sticky-top";
  const brandSelector = ".sticky-top .navbar-brand";

  const body = document.body;
  const placeholder = document.querySelector(placeholderSelector);
  const navbar = document.querySelector(navbarSelector);
  const stickyBrand = document.querySelector(brandSelector);

  if (!placeholder || !navbar || !stickyBrand) {
    console.error("Required elements not found!");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isVisible = entry.isIntersecting;

      // Toggle `sticky-visible` class on the navbar brand
      if (isVisible) {
        stickyBrand.classList.remove("sticky-visible");
      } else {
        stickyBrand.classList.add("sticky-visible");
      }

      // Update body class for nav state
      const currentState = isVisible ? "nav-state1" : "nav-state2";
      const oppositeState = currentState === "nav-state1" ? "nav-state2" : "nav-state1";

      if (!body.classList.contains(currentState)) {
        body.classList.remove(oppositeState);
        body.classList.add(currentState);
      }
    },
    {
      root: null, // Observe within the viewport
      threshold: 0, // Trigger as soon as the placeholder is out of sight
    }
  );

  observer.observe(placeholder);
});
