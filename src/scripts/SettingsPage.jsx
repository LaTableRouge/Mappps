import { __ } from '@wordpress/i18n'

export default function SettingsPage() {
	const args = window.mappps_admin_args || {}
	const pluginVersion = args.plugin_version || ''

	return (
		<>
			<header className="settings-page__header">
				<div className="header__title">
					<h1>{__('Mappps', 'mappps')}</h1>
					{pluginVersion && (
						<p className="title__plugin-version">
							{__('Version', 'mappps')} {pluginVersion} -{' '}
							<a
								aria-label={__('View Mappps changelog on WordPress.org (opens in a new tab)', 'mappps')}
								href="https://wordpress.org/plugins/mappps/#developers"
								rel="noopener noreferrer"
								target="_blank"
							>
								{__("What's new ?", 'mappps')}
							</a>
						</p>
					)}
				</div>
				<div className="header__navigation">
					<a
						aria-label={__('Read the Mappps documentation (opens in a new tab)', 'mappps')}
						href="https://github.com/LaTableRouge/Mappps"
						rel="noopener noreferrer"
						target="_blank"
					>
						{__('Documentation', 'mappps')}
					</a>
					<a
						aria-label={__('Leave a review for Mappps on WordPress.org (opens in a new tab)', 'mappps')}
						href="https://wordpress.org/plugins/mappps/#reviews"
						rel="noopener noreferrer"
						target="_blank"
					>
						{__('Leave a review', 'mappps')}
					</a>
				</div>
			</header>

			<main className="settings-page__main" id="mappps-settings">
				<h2>{__('Getting Started with the Mappps Plugin', 'mappps')}</h2>
				<p>
					{__(
						'Welcome to the comprehensive guide on how to get started with our Mappps Plugin. This plugin allows you to display maps with markers based on the latitude and longitude provided in your posts. Follow the steps below to set up and utilize the plugin effectively.',
						'mappps'
					)}
				</p>

				<details>
					<summary>{__('Table of Contents', 'mappps')}</summary>
					<nav>
						<menu>
							<li>
								<a href="#creating-posts-with-location-data">{__('Creating Posts with Location Data', 'mappps')}</a>
							</li>
							<li>
								<a href="#displaying-the-map">{__('Displaying the Map', 'mappps')}</a>
							</li>
							<li>
								<a href="#individual-marker-pictures">{__('Individual Marker Pictures', 'mappps')}</a>
							</li>
							<li>
								<a href="#troubleshooting">{__('Troubleshooting', 'mappps')}</a>
							</li>
							<li>
								<a href="#qa">{__('Q&A', 'mappps')}</a>
							</li>
						</menu>
					</nav>
				</details>

				<h3 id="creating-posts-with-location-data">{__('Creating Posts with Location Data', 'mappps')}</h3>
				<p>{__('To display markers on the map, you need to add latitude and longitude custom fields to your posts. Follow these steps:', 'mappps')}</p>
				<ol>
					<li>
						<strong>{__('Add a New Post:', 'mappps')}</strong> {__('Go to "Posts" > "Add New".', 'mappps')}
					</li>
					<li>
						<strong>{__('Enter Post Details:', 'mappps')}</strong> {__('Fill in the title, excerpt, category, tags and picture.', 'mappps')}
					</li>
					<li>
						<strong>{__('Add Custom Fields:', 'mappps')}</strong>
						<ol>
							<li>{__('Scroll down to the "Custom Fields" section.', 'mappps')}</li>
							<li>
								{__(
									'If the "Custom Fields" section is not visible, enable it by clicking on "Screen Options" at the top right of the screen (the three dots) and go to "Preferences" then check "Custom Fields".',
									'mappps'
								)}
							</li>
							<li>
								{__('Click on "Add Custom Field".', 'mappps')}{' '}
								{__('In the "Name" field, enter or select "lat" or "mappps_lat" and in the "Value" field, enter the latitude coordinate.', 'mappps')}
							</li>
							<li>{__('Repeat the above step for the "lng" or "mappps_lng" field.', 'mappps')}</li>
						</ol>
					</li>
					<li>
						<strong>{__('Publish the Post:', 'mappps')}</strong> {__('Once all details are filled in, click on "Publish".', 'mappps')}
					</li>
				</ol>

				<h3 id="displaying-the-map">{__('Displaying the Map', 'mappps')}</h3>
				<p>{__('To display the map on your site, you can use the provided Gutenberg block.', 'mappps')}</p>

				<h4 id="individual-marker-pictures">{__('Individual Marker Pictures', 'mappps')}</h4>
				<p>
					{__(
						'For the "Mappps (blocks)" block, you can set individual marker pictures for each post. This feature allows each marker to display a unique image instead of using the global marker settings.',
						'mappps'
					)}
				</p>
				<ol>
					<li>
						<strong>{__('Add Custom Fields:', 'mappps')}</strong> {__('In your post editor, scroll down to the "Custom Fields" section and add a new custom field.', 'mappps')}
					</li>
					<li>
						<strong>{__('Set Field Name:', 'mappps')}</strong> {__('Use "mappps_marker" as the field name (this is the exact name required).', 'mappps')}
					</li>
					<li>
						<strong>{__('Set Field Value:', 'mappps')}</strong> {__('Select the image you want to use as the marker picture in the media library.', 'mappps')}
					</li>
					<li>
						<strong>{__('Enable Individual Pictures:', 'mappps')}</strong>{' '}
						{__(
							'In the "Mappps (blocks)" block, select the "Markers" block and in the "Marker settings" section, toggle "Individual marker pictures" to enable this feature.',
							'mappps'
						)}
					</li>
				</ol>

				<h4>{__('Using Gutenberg Block', 'mappps')}</h4>
				<ol>
					<li>
						<strong>{__('Edit Page/Post:', 'mappps')}</strong> {__('Open the page or post where you want to add the map.', 'mappps')}
					</li>
					<li>
						<strong>{__('Add Block:', 'mappps')}</strong> {__('Click the "+" icon to add a new block and search for "Mappps" or "Mappps (blocks)".', 'mappps')}
					</li>
					<li>
						<strong>{__('Configure Block:', 'mappps')}</strong> {__('Select the block and configure any additional settings if necessary.', 'mappps')}
					</li>
					<li>
						<strong>{__('Publish/Update:', 'mappps')}</strong> {__('Save your changes.', 'mappps')}
					</li>
				</ol>

				<h3 id="troubleshooting">{__('Troubleshooting', 'mappps')}</h3>
				<p>{__('If the map does not display correctly, consider the following:', 'mappps')}</p>
				<ul>
					<li>
						<strong>{__('Check Custom Fields:', 'mappps')}</strong> {__('Ensure that the latitude and longitude fields are correctly added to your posts.', 'mappps')}
					</li>
					<li>
						<strong>{__('Block:', 'mappps')}</strong> {__('Verify that the block is correctly added to your page or post.', 'mappps')}
					</li>
					<li>
						<strong>{__('Multiple blocks:', 'mappps')}</strong>{' '}
						{__('"Mappps" and "Mappps (blocks)" cannot cohexist on the same page. Consider choosing one or the other.', 'mappps')}
					</li>
				</ul>

				<h3 id="qa">{__('Q&A', 'mappps')}</h3>
				<h4>{__('Advanced Custom Field (ACF/SCF) compatibility', 'mappps')}</h4>
				<p>
					{__("In order to make the plugin work with ACF (or SCF), you'll need to create new fields for your desired post types.", 'mappps')}
					<br />
					{__('Go to "Field groups" and add a new one:', 'mappps')}
					<br />
					{__('Then add a new "Field" with the type "Text" and use "mappps_lat" as field name.', 'mappps')}
					<br />
					{__('Add another one and name it "mappps_lng".', 'mappps')}
					<br />
					{__('It is also possible to add a new field for the marker picture, name it "mappps_marker".', 'mappps')}
					<br />
					{__('In the "Settings" below, go to the "Group Settings" tab and check "Show in REST API".', 'mappps')}
				</p>

				<h4>{__('Can I customize the markers on the map?', 'mappps')}</h4>
				<p>{__('Yes, you can customize the marker color and size inside the "Block settings" > "Render settings".', 'mappps')}</p>

				<h4>{__('What if I have multiple posts with the same location?', 'mappps')}</h4>
				<p>{__('The plugin support the clustering for the markers, you can disable it but then the map will display overlapping markers.', 'mappps')}</p>

				<h4>{__('Can I put multiple "Mappps" blocks in the same page?', 'mappps')}</h4>
				<p>{__('Yes.', 'mappps')}</p>

				<h4>{__('Can I put "Mappps" and "Mappps (blocks)" blocks in the same page?', 'mappps')}</h4>
				<p>{__('Yes.', 'mappps')}</p>

				<h4>{__('Known bug', 'mappps')}</h4>
				<p>
					{__('Leaflet is not compatible with Gridjs somehow Gridjs and Leaflet both uses the property "window.L".', 'mappps')}
					{__("Depending on which library is called first, the other takes priority and the first one don't work.", 'mappps')}
				</p>

				<br />

				<p>
					{__(
						'We hope this guide helps you get started with the Mappps Plugin. Should you have any questions or need further assistance, please use the issue section in the Github.',
						'mappps'
					)}{' '}
					<a href="https://github.com/LaTableRouge/Mappps/issues">{__('Submit an issue', 'mappps')}</a>
				</p>
			</main>

			<footer className="settings-page__footer">
				<div className="footer__title">
					<p>
						{__('Made with', 'mappps')}
						<span aria-hidden="true"> 🍕 </span>
						{__(' by LaTableRouge', 'mappps')}
					</p>
				</div>
				<div className="footer__navigation">
					<a aria-label={__('Visit the developer website', 'mappps')} href="https://mlnop.fr/" rel="noopener noreferrer" target="_blank">
						{__('My website', 'mappps')}
					</a>
					<a aria-label={__('Review the code on Github', 'mappps')} href="https://github.com/LaTableRouge/Mappps" rel="noopener noreferrer" target="_blank">
						{__('Code repository', 'mappps')}
					</a>
				</div>
			</footer>
		</>
	)
}
