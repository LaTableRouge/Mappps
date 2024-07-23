<article>
    <h1><?php _e('Getting Started with the Maaaps Plugin', 'maaaps'); ?></h1>
    <p><?php _e('Welcome to the comprehensive guide on how to get started with our Maaaps Plugin. This plugin allows you to display maps with markers based on the latitude and longitude provided in your posts. Follow the steps below to set up and utilize the plugin effectively.', 'maaaps'); ?></p>

    <h2><?php _e('Table of Contents', 'maaaps'); ?></h2>
    <ul class="toc">
        <li><a href="#creating-posts-with-location-data"><?php _e('Creating Posts with Location Data', 'maaaps'); ?></a></li>
        <li><a href="#displaying-the-map"><?php _e('Displaying the Map', 'maaaps'); ?></a></li>
        <li><a href="#troubleshooting"><?php _e('Troubleshooting', 'maaaps'); ?></a></li>
        <li><a href="#faqs"><?php _e('FAQs', 'maaaps'); ?></a></li>
    </ul>

    <h2 id="creating-posts-with-location-data"><?php _e('Creating Posts with Location Data', 'maaaps'); ?></h2>
    <p><?php _e('To display markers on the map, you need to add latitude and longitude custom fields to your posts. Follow these steps:', 'maaaps'); ?></p>
    <ol>
        <li><strong><?php _e('Add a New Post:', 'maaaps'); ?></strong> <?php _e('Go to', 'maaaps'); ?> <code><?php _e('Posts', 'maaaps'); ?></code> > <code><?php _e('Add New', 'maaaps'); ?></code>.</li>
        <li><strong><?php _e('Enter Post Details:', 'maaaps'); ?></strong> <?php _e('Fill in the title, excerpt, category, tags and picture.', 'maaaps'); ?></li>
        <li><strong><?php _e('Add Custom Fields:', 'maaaps'); ?></strong>
            <ol>
                <li><?php _e('Scroll down to the "Custom Fields" section.', 'maaaps'); ?></li>
                <li><?php _e('If the "Custom Fields" section is not visible, enable it by clicking on', 'maaaps'); ?> <code><?php _e('Screen Options', 'maaaps'); ?></code> <?php _e('at the top right of the screen (the three dots) and go to', 'maaaps'); ?> <code><?php _e('Preferences', 'maaaps'); ?></code> <?php _e('then check', 'maaaps'); ?> <code><?php _e('Custom Fields', 'maaaps'); ?></code>.</li>
                <li><?php _e('Click on', 'maaaps'); ?> <code><?php _e('Add Custom Field', 'maaaps'); ?></code>. <?php _e('In the', 'maaaps'); ?> <code><?php _e('Name', 'maaaps'); ?></code> <?php _e('field, enter or select', 'maaaps'); ?> <code><?php _e('lat', 'maaaps'); ?></code> <?php _e('and in the', 'maaaps'); ?> <code><?php _e('Value', 'maaaps'); ?></code> <?php _e('field, enter the latitude coordinate.', 'maaaps'); ?></li>
                <li><?php _e('Repeat the above step for the', 'maaaps'); ?> <code><?php _e('lng', 'maaaps'); ?></code> <?php _e('field.', 'maaaps'); ?></li>
            </ol>
        </li>
        <li><strong><?php _e('Publish the Post:', 'maaaps'); ?></strong> <?php _e('Once all details are filled in, click', 'maaaps'); ?> <code><?php _e('Publish', 'maaaps'); ?></code>.</li>
    </ol>

    <h2 id="displaying-the-map"><?php _e('Displaying the Map', 'maaaps'); ?></h2>
    <p><?php _e('To display the map on your site, you can use the provided Gutenberg block.', 'maaaps'); ?></p>

    <h3><?php _e('Using Gutenberg Block', 'maaaps'); ?></h3>
    <ol>
        <li><strong><?php _e('Edit Page/Post:', 'maaaps'); ?></strong> <?php _e('Open the page or post where you want to add the map.', 'maaaps'); ?></li>
        <li><strong><?php _e('Add Block:', 'maaaps'); ?></strong> <?php _e('Click the', 'maaaps'); ?> <code><?php _e('+', 'maaaps'); ?></code> <?php _e('icon to add a new block and search for', 'maaaps'); ?> <code><?php _e('Maaaps', 'maaaps'); ?></code>.</li>
        <li><strong><?php _e('Configure Block:', 'maaaps'); ?></strong> <?php _e('Select the block and configure any additional settings if necessary.', 'maaaps'); ?></li>
        <li><strong><?php _e('Publish/Update:', 'maaaps'); ?></strong> <?php _e('Save your changes.', 'maaaps'); ?></li>
    </ol>

    <h2 id="troubleshooting"><?php _e('Troubleshooting', 'maaaps'); ?></h2>
    <p><?php _e('If the map does not display correctly, consider the following:', 'maaaps'); ?></p>
    <ul>
        <li><strong><?php _e('Check Custom Fields:', 'maaaps'); ?></strong> <?php _e('Ensure that the latitude and longitude fields are correctly added to your posts.', 'maaaps'); ?></li>
        <li><strong><?php _e('Block:', 'maaaps'); ?></strong> <?php _e('Verify that the block is correctly added to your page or post.', 'maaaps'); ?></li>
    </ul>

    <h2 id="faqs"><?php _e('FAQs', 'maaaps'); ?></h2>
    <h3><?php _e('Can I customize the markers on the map?', 'maaaps'); ?></h3>

    <p><?php _e('Yes, you can customize the marker color and size inside the', 'maaaps'); ?> <code><?php _e('Block settings', 'maaaps'); ?></code> > <code><?php _e('Render settings', 'maaaps'); ?></code>.</p>

    <h3><?php _e('What if I have multiple posts with the same location?', 'maaaps'); ?></h3>
    <p><?php _e('The plugin support the clustering for the markers, you can disable it but then the map will display overlapping markers.', 'maaaps'); ?></p>

    <p>
        <?php _e('We hope this guide helps you get started with the Maaaps Plugin. Should you have any questions or need further assistance, please use the issue section in the Github.', 'maaaps'); ?>
        <a href="https://github.com/LaTableRouge/Maaaps/issues"><?php _e('Submit an issue', 'maaaps'); ?></a>
    </p>
</article>


