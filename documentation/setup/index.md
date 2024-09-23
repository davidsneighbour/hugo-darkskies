---
title: "Setup"
date: 2023-12-08T15:58:19+07:00
draft: true
---

## Installing _DarkSky_

_DarkSky_ can be easily installed in your GoHugo project using one of two methods: as a Git submodule, or by adding it as a theme component. We highly recommend installing _DarkSky_ as a theme component for the most seamless experience.

### Installing as a Theme Component

To install _DarkSky_ as a theme component, navigate to your site's root directory in your terminal and run:

```bash
hugo add https://github.com/davidsneighbour/hugo-darksky.git#main --name darksky
```

### Installing as a Git Submodule

Alternatively, you can install _DarkSky_ as a Git submodule by running:

```bash
git submodule add https://github.com/davidsneighbour/hugo-darksky.git themes/darksky
```

Then, update your `config.toml` file to use the theme:

```toml
[params]
theme = "darksky"
```

## Upgrading _DarkSky_

To upgrade _DarkSky_ from within a theme component installation, run:

```bash
hugo add https://github.com/davidsneighbour/hugo-darksky.git#main --name darksky --upgrade
```

If you've installed _DarkSky_ as a Git submodule, simply pull the latest changes and update your `config.toml` file to use the new theme version.

We recommend using the theme component method for installation, as it simplifies upgrades and provides a more integrated experience with GoHugo.
