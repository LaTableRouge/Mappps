# Query Component

This folder contains code adapted from the WordPress Gutenberg Query block implementation.

## Origin

The code in this folder is based on the WordPress Gutenberg Query block implementation, specifically from:

[WordPress Gutenberg Query Block](https://github.com/WordPress/gutenberg/tree/55cb36b2de59b8869bf48e725ded1832a21be992/packages/block-library/src/query)

## Adaptations

The original code has been adapted to meet the specific requirements of the Mappps plugin:

1. **Simplified Structure**: The component structure has been streamlined to focus on the core functionality needed for the Mappps plugin.

2. **Custom Controls**: The query controls have been customized to match the Mappps plugin's UI and UX requirements.

3. **Optimized State Management**:

   - Implemented more efficient state updates
   - Added proper dependency tracking in useEffect hooks
   - Improved error handling and edge cases

4. **Performance Improvements**:
   - Reduced unnecessary re-renders
   - Optimized query parameter handling
   - Improved data flow between components

## Key Files

- `ControlQuery.jsx`: Main component for managing query parameters
- `utils/`: Utility functions for query handling
- `controls/`: UI components for query controls

## Usage

This component is used within the Mappps plugin to provide query functionality for displaying posts on maps. It allows users to:

- Select post types
- Configure ordering and pagination
- Filter by taxonomies, authors, and keywords
- Control sticky post behavior

## License

This code is adapted from WordPress Gutenberg, which is licensed under the [GNU General Public License v2 (or later)](https://www.gnu.org/licenses/gpl-2.0.html).
