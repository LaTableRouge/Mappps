import { __ } from '@wordpress/i18n'

export default function SettingsPage() {
  return (
    <>
      <h1>{__('Getting Started with the Maaaps Plugin', 'maaaps')}</h1>
      <p>
        {__(
          'Welcome to the comprehensive guide on how to get started with our Maaaps Plugin. This plugin allows you to display maps with markers based on the latitude and longitude provided in your posts. Follow the steps below to set up and utilize the plugin effectively.',
          'maaaps'
        )}
      </p>

      <h2>{__('Table of Contents', 'maaaps')}</h2>
      <ul>
        <li>
          <a href="#creating-posts-with-location-data">{__('Creating Posts with Location Data', 'maaaps')}</a>
        </li>
        <li>
          <a href="#displaying-the-map">{__('Displaying the Map', 'maaaps')}</a>
        </li>
        <li>
          <a href="#troubleshooting">{__('Troubleshooting', 'maaaps')}</a>
        </li>
        <li>
          <a href="#faqs">{__('FAQs', 'maaaps')}</a>
        </li>
      </ul>

      <h2 id="creating-posts-with-location-data">{__('Creating Posts with Location Data', 'maaaps')}</h2>
      <p>{__('To display markers on the map, you need to add latitude and longitude custom fields to your posts. Follow these steps:', 'maaaps')}</p>
      <ol>
        <li>
          <strong>{__('Add a New Post:', 'maaaps')}</strong> {__('Go to "Posts" > "Add New".', 'maaaps')}
        </li>
        <li>
          <strong>{__('Enter Post Details:', 'maaaps')}</strong> {__('Fill in the title, excerpt, category, tags and picture.', 'maaaps')}
        </li>
        <li>
          <strong>{__('Add Custom Fields:', 'maaaps')}</strong>
          <ol>
            <li>{__('Scroll down to the "Custom Fields" section.', 'maaaps')}</li>
            <li>
              {__(
                'If the "Custom Fields" section is not visible, enable it by clicking on "Screen Options" at the top right of the screen (the three dots) and go to "Preferences" then check "Custom Fields".',
                'maaaps'
              )}
            </li>
            <li>
              {__('Click on "Add Custom Field".', 'maaaps')} {__('In the "Name" field, enter or select "lat" and in the "Value" field, enter the latitude coordinate.', 'maaaps')}
            </li>
            <li>{__('Repeat the above step for the "lng" field.', 'maaaps')}</li>
          </ol>
        </li>
        <li>
          <strong>{__('Publish the Post:', 'maaaps')}</strong> {__('Once all details are filled in, click on "Publish".', 'maaaps')}
        </li>
      </ol>

      <h2 id="displaying-the-map">{__('Displaying the Map', 'maaaps')}</h2>
      <p>{__('To display the map on your site, you can use the provided Gutenberg block.', 'maaaps')}</p>

      <h3>{__('Using Gutenberg Block', 'maaaps')}</h3>
      <ol>
        <li>
          <strong>{__('Edit Page/Post:', 'maaaps')}</strong> {__('Open the page or post where you want to add the map.', 'maaaps')}
        </li>
        <li>
          <strong>{__('Add Block:', 'maaaps')}</strong> {__('Click the "+" icon to add a new block and search for "Maaaps".', 'maaaps')}
        </li>
        <li>
          <strong>{__('Configure Block:', 'maaaps')}</strong> {__('Select the block and configure any additional settings if necessary.', 'maaaps')}
        </li>
        <li>
          <strong>{__('Publish/Update:', 'maaaps')}</strong> {__('Save your changes.', 'maaaps')}
        </li>
      </ol>

      <h2 id="troubleshooting">{__('Troubleshooting', 'maaaps')}</h2>
      <p>{__('If the map does not display correctly, consider the following:', 'maaaps')}</p>
      <ul>
        <li>
          <strong>{__('Check Custom Fields:', 'maaaps')}</strong> {__('Ensure that the latitude and longitude fields are correctly added to your posts.', 'maaaps')}
        </li>
        <li>
          <strong>{__('Block:', 'maaaps')}</strong> {__('Verify that the block is correctly added to your page or post.', 'maaaps')}
        </li>
      </ul>

      <h2 id="faqs">{__('FAQs', 'maaaps')}</h2>
      <h3>{__('Can I customize the markers on the map?', 'maaaps')}</h3>

      <p>{__('Yes, you can customize the marker color and size inside the "Block settings" > "Render settings".', 'maaaps')}</p>

      <h3>{__('What if I have multiple posts with the same location?', 'maaaps')}</h3>
      <p>{__('The plugin support the clustering for the markers, you can disable it but then the map will display overlapping markers.', 'maaaps')}</p>

      <p>
        {__(
          'We hope this guide helps you get started with the Maaaps Plugin. Should you have any questions or need further assistance, please use the issue section in the Github.',
          'maaaps'
        )}
        <a href="https://github.com/LaTableRouge/Maaaps/issues">{__('Submit an issue', 'maaaps')}</a>
      </p>
    </>
  )
}
