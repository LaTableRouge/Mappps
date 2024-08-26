<?php
/**
 * Server-side rendering of the `mps/post-details` block.
 */

$context = $block->context;
$postIDs = $context['mps/postIDs'];
$postType = $context['mps/postType'];

if (empty($postIDs)) {
    return '';
}

$query_args = [
    'post_type' => $postType,
    'post__in' => $postIDs,
    'posts_per_page' => -1
];
$query = new WP_Query($query_args);

if (!$query->have_posts()) {
    return '';
}

$content = '<div class="details-wrapper">';
while ($query->have_posts()) {
    $query->the_post();

    $post_id = get_the_ID();

    if (!in_array($post_id, $postIDs)) {
        continue;
    }

    $lat = get_post_meta($post_id, 'lat', true);
    $lng = get_post_meta($post_id, 'lng', true);

    // Get an instance of the current Post Details block.
    $block_instance = $block->parsed_block;

    // Set the block name to one that does not correspond to an existing registered block.
    // This ensures that for the inner instances of the Post Details block, we do not render any block supports.
    $block_instance['blockName'] = 'core/null';

    $post_type = get_post_type();
    $filter_block_context = static function ($context) use ($post_id, $post_type) {
        $context['postType'] = $post_type;
        $context['postId'] = $post_id;

        return $context;
    };

    // Use an early priority to so that other 'render_block_context' filters have access to the values.
    add_filter('render_block_context', $filter_block_context, 1);
    // Render the inner blocks of the Post Details block with `dynamic` set to `false` to prevent calling
    // `render_callback` and ensure that no wrapper markup is included.
    $block_content = (new WP_Block($block_instance))->render(['dynamic' => false]);
    remove_filter('render_block_context', $filter_block_context, 1);

    // Wrap the render inner blocks in a `article` element with the appropriate post classes.
    $post_classes = implode(' ', get_post_class('wp-block-post'));

    $inner_block_directives = ' data-wp-key="post-details-item-' . $post_id . '"';

    $cta_header = '<div class="header__cta-wrapper">
                    <button
                        aria-label="' . __('Expand', 'mappps') . '"
                        class="custom-button custom-button__only-icon cta-wrapper__expand"
                        title="' . __('Expand', 'mappps') . '"
                        data-text-shrink="' . __('Shrink', 'mappps') . '"
                        data-text-expand="' . __('Expand', 'mappps') . '"
                        data-icon-shrink="icon-mappps-shrink"
                        data-icon-expand="icon-mappps-enlarge"
                    >
                        <span class="icon-mappps-enlarge"></span>
                        <span class="screen-reader-text">' . __('Expand/Shrink', 'mappps') . '</span>
                    </button>

                    <a
                        class="custom-button custom-button__only-icon cta-wrapper__new-tab"
                        href="' . get_permalink($post_id) . '"
                        target="_blank"
                        title="' . __('Open in new tab', 'mappps') . '"
                    >
                        <span class="icon-mappps-new-tab"></span>
                        <span class="screen-reader-text">' . __('Open in new tab', 'mappps') . '</span>
                    </a>

                    <a
                        class="custom-button custom-button__only-icon cta-wrapper__map"
                        href="https://maps.google.com/maps?daddr=' . $lat . ',' . $lng . '&amp;ll="
                        rel="noreferrer"
                        target="_blank"
                        title=' . __('View itinerary', 'mappps') . '
                    >
                        <span class="icon-mappps-map"></span>
                        <span class="screen-reader-text">' . __('View itinerary', 'mappps') . '</span>
                    </a>

                    <button
                        aria-label="' . __('Close preview', 'mappps') . '"
                        class="custom-button custom-button__only-icon cta-wrapper__close"
                        title="' . __('Close preview', 'mappps') . '"
                    >
                        <span class="icon-mappps-cross"></span>
                        <span class="screen-reader-text">' . __('Close preview', 'mappps') . '</span>
                    </button>
                </div>
    ';

    $block_content = str_replace('<article class="wp-block-mps-post-details">',  '<article class="wp-block-mps-post-details" data-expanded="false"> ' . $cta_header, $block_content);

    $block_html = new WP_HTML_Tag_Processor($block_content);
    if ($block_html->next_tag(['class_name' => 'wp-block-mps-post-details'])) {
        $block_html->add_class($post_classes);
        $block_html->set_attribute('data-wp-key', 'post-details-item-' . $post_id);
        $block_html->set_attribute('data-hidden', 'true');
    }

    $content .= $block_html->get_updated_html();
}

$content .= '</div>';

wp_reset_postdata();

echo $content;
