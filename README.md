# Maaaps plugin

![WordPress Version](https://img.shields.io/badge/wordpress-%3E%3D%206.2-blue)
![Node](https://img.shields.io/badge/node-%3E%3D%2018-brightgreen)
![PHP](https://img.shields.io/badge/php-%5E8.0-blue)

Maaaps, is a plugin designed to display maps with the help of Leaflet. 
It's main purpose is to quickly make store locator for Wordpress webistes.

## Development Guide

### Installing Dependencies

If not already done, run `npm install` in this directory

### 🧙‍♂️ Development Scripts

We use vite.js and wp-scripts to facilitate and optimize our development.

The list of development scripts is listed below:

| NPM Command                | Action                                                                                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm run prod               | compiles `maaaps` plugin files (\*.scss, \*.js) and deploys static files to the **build/** directory of the plugin.                                  |
| npm run build              | lints, formats, and compiles `maaaps` plugin files (\*.php, \*.scss, \*.js) and deploys static files to the **build/** directory of the plugin.      |
| npm run watch              | starts a local development server accessible directly on **local.your-host.com**, compiles and reloads static files (\*.scss, \*.js) on each change. |
| npm run watch:blocks       | compiles `maaaps` blocks files (\*.scss, \*.js, \*.jsx) and deploys static files to the **build/** directory of the blocks.                          |
| npm run build:blocks       | lints, formats, and compiles `maaaps` blocks files (\*.scss, \*.js, \*.jsx) and deploys static files to the **build/** directory of the blocks.      |

### Creating REACT Blocks

Blocks should be created and edited in the `blocks/src/` directory ([see README](./blocks/src/README.md)).


### Translation

To generate the .pot file (from the plugin's directory):

```bash
wp i18n make-pot . lang/maaaps.pot --domain=maaaps --exclude=node_modules,vendor,lang --include=*.php,build
```

To generate the translation json files for JS (from the plugin's directory):

```bash
wp i18n make-json lang/ --no-purge
```

## Roadmap

- [ ] Translation (English/French)
- [ ] Edit part
- [ ] Save part
- [ ] Style desktop
- [ ] Style mobile

### Documentation

Resources:

- [Leaflet](https://leafletjs.com/)
- [Leaflet GeoSearch](https://smeijer.github.io/leaflet-geosearch/)
- [React Leaflet](https://react-leaflet.js.org/)
- [React leaflet markercluster](https://www.npmjs.com/package/@changey/react-leaflet-markercluster)
