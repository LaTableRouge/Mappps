<article>
    <h1><?php esc_html_e('Getting Started with the Maaaps Plugin', 'maaaps'); ?></h1>
    <p><?php esc_html_e('Welcome to the comprehensive guide on how to get started with our Maaaps Plugin. This plugin allows you to display maps with markers based on the latitude and longitude provided in your posts. Follow the steps below to set up and utilize the plugin effectively.', 'maaaps'); ?></p>

    <h2><?php esc_html_e('Table of Contents', 'maaaps'); ?></h2>
    <ul class="toc">
        <li><a href="#creating-posts-with-location-data"><?php esc_html_e('Creating Posts with Location Data', 'maaaps'); ?></a></li>
        <li><a href="#displaying-the-map"><?php esc_html_e('Displaying the Map', 'maaaps'); ?></a></li>
        <li><a href="#troubleshooting"><?php esc_html_e('Troubleshooting', 'maaaps'); ?></a></li>
        <li><a href="#faqs"><?php esc_html_e('FAQs', 'maaaps'); ?></a></li>
    </ul>

    <h2 id="creating-posts-with-location-data"><?php esc_html_e('Creating Posts with Location Data', 'maaaps'); ?></h2>
    <p><?php esc_html_e('To display markers on the map, you need to add latitude and longitude custom fields to your posts. Follow these steps:', 'maaaps'); ?></p>
    <ol>
        <li><strong><?php esc_html_e('Add a New Post:', 'maaaps'); ?></strong> <?php esc_html_e('Go to "Posts" > "Add New".', 'maaaps'); ?></li>
        <li><strong><?php esc_html_e('Enter Post Details:', 'maaaps'); ?></strong> <?php esc_html_e('Fill in the title, excerpt, category, tags and picture.', 'maaaps'); ?></li>
        <li><strong><?php esc_html_e('Add Custom Fields:', 'maaaps'); ?></strong>
            <ol>
                <li><?php esc_html_e('Scroll down to the "Custom Fields" section.', 'maaaps'); ?></li>
                <li><?php esc_html_e('If the "Custom Fields" section is not visible, enable it by clicking on "Screen Options" at the top right of the screen (the three dots) and go to "Preferences" then check "Custom Fields".', 'maaaps'); ?></li>
                <li><?php esc_html_e('Click on "Add Custom Field".', 'maaaps'); ?> <?php esc_html_e('In the "Name" field, enter or select "lat" and in the "Value" field, enter the latitude coordinate.', 'maaaps'); ?></li>
                <li><?php esc_html_e('Repeat the above step for the "lng" field.', 'maaaps'); ?></li>
            </ol>
        </li>
        <li><strong><?php esc_html_e('Publish the Post:', 'maaaps'); ?></strong> <?php esc_html_e('Once all details are filled in, click', 'maaaps'); ?> "Publish".</li>
    </ol>

    <h2 id="displaying-the-map"><?php esc_html_e('Displaying the Map', 'maaaps'); ?></h2>
    <p><?php esc_html_e('To display the map on your site, you can use the provided Gutenberg block.', 'maaaps'); ?></p>

    <h3><?php esc_html_e('Using Gutenberg Block', 'maaaps'); ?></h3>
    <ol>
        <li><strong><?php esc_html_e('Edit Page/Post:', 'maaaps'); ?></strong> <?php esc_html_e('Open the page or post where you want to add the map.', 'maaaps'); ?></li>
        <li><strong><?php esc_html_e('Add Block:', 'maaaps'); ?></strong> <?php esc_html_e('Click the "+" icon to add a new block and search for "Maaaps".', 'maaaps'); ?></li>
        <li><strong><?php esc_html_e('Configure Block:', 'maaaps'); ?></strong> <?php esc_html_e('Select the block and configure any additional settings if necessary.', 'maaaps'); ?></li>
        <li><strong><?php esc_html_e('Publish/Update:', 'maaaps'); ?></strong> <?php esc_html_e('Save your changes.', 'maaaps'); ?></li>
    </ol>

    <h2 id="troubleshooting"><?php esc_html_e('Troubleshooting', 'maaaps'); ?></h2>
    <p><?php esc_html_e('If the map does not display correctly, consider the following:', 'maaaps'); ?></p>
    <ul>
        <li><strong><?php esc_html_e('Check Custom Fields:', 'maaaps'); ?></strong> <?php esc_html_e('Ensure that the latitude and longitude fields are correctly added to your posts.', 'maaaps'); ?></li>
        <li><strong><?php esc_html_e('Block:', 'maaaps'); ?></strong> <?php esc_html_e('Verify that the block is correctly added to your page or post.', 'maaaps'); ?></li>
    </ul>

    <h2 id="faqs"><?php esc_html_e('FAQs', 'maaaps'); ?></h2>
    <h3><?php esc_html_e('Can I customize the markers on the map?', 'maaaps'); ?></h3>

    <p><?php esc_html_e('Yes, you can customize the marker color and size inside the "Block settings" > "Render settings".', 'maaaps'); ?></p>

    <h3><?php esc_html_e('What if I have multiple posts with the same location?', 'maaaps'); ?></h3>
    <p><?php esc_html_e('The plugin support the clustering for the markers, you can disable it but then the map will display overlapping markers.', 'maaaps'); ?></p>

    <p>
        <?php esc_html_e('We hope this guide helps you get started with the Maaaps Plugin. Should you have any questions or need further assistance, please use the issue section in the Github.', 'maaaps'); ?>
        <a href="https://github.com/LaTableRouge/Maaaps/issues"><?php esc_html_e('Submit an issue', 'maaaps'); ?></a>
    </p>
</article>


