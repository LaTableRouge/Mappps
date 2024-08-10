# React Blocks

- Blocks are created by referring to this [tutorial](https://developer.wordpress.org/block-editor/getting-started/create-block/), or by referring to an existing block in this directory.

## File Structure

- 📂 your-block
  - 📂 assets
    - 📂 fonts
    - 📂 img
    - 📂 styles
      - editor.scss
      - style.scss
    - 📂 scripts
      - save.jsx
      - edit.jsx
    - index.jsx
    - view.js
  - block.json
  - render.php (optionnal)

## Compilation

- see [package.json](../../package.json)

## Translation

- The translations for the blocks should be generated at the same time as those for the theme (See [README](../../README.md#translation))
