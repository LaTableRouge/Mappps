<?php

/**
 * Server-side rendering of the `mppps/post-details` block.
 */
if (!isset($block) || !isset($attributes)) {
    return '';
}

$context = $block->context;
$postIDs = $context['mppps/postIDs'];
$postType = $context['mppps/postType'];
$detailsSize = $attributes['selectedDetailsSize'];
$showViewItinerary = isset($attributes['showViewItinerary']) ? (bool) $attributes['showViewItinerary'] : true;
$showOpenInNewTab = isset($attributes['showOpenInNewTab']) ? (bool) $attributes['showOpenInNewTab'] : true;

if (empty($postIDs)) {
    return '';
}

$query = new WP_Query([
    'post_type' => $postType,
    'post__in' => $postIDs,
    'posts_per_page' => -1
]);

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

    if (function_exists('get_field')) {
        $lat = get_field('mappps_lat', $post_id);
        $lng = get_field('mappps_lng', $post_id);
    }

    // Get an instance of the current Post Template block.
    $block_instance = $block->parsed_block;

    // Set the block name to one that does not correspond to an existing registered block.
    // This ensures that for the inner instances of the Post Template block, we do not render any block supports.
    $block_instance['blockName'] = 'core/null';

    $post_type = get_post_type();
    $filter_block_context = static function ($context) use ($post_id, $post_type) {
        $context['postType'] = $post_type;
        $context['postId'] = $post_id;

        return $context;
    };

    // Use an early priority to so that other 'render_block_context' filters have access to the values.
    add_filter('render_block_context', $filter_block_context, 1);
    // Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
    // `render_callback` and ensure that no wrapper markup is included.
    $block_content = (new WP_Block($block_instance))->render(['dynamic' => false]);
    remove_filter('render_block_context', $filter_block_context, 1);

    // Wrap the render inner blocks in a `article` element with the appropriate post classes.
    $post_classes = implode(' ', get_post_class('wp-block-post'));

    // Build CTA header
    $cta_header = '<div class="header__cta-wrapper">
        <button
            aria-label="' . esc_attr__('Expand', 'mappps') . '"
            class="custom-button custom-button__only-icon cta-wrapper__expand"
            title="' . esc_attr__('Expand', 'mappps') . '"
            data-text-shrink="' . esc_attr__('Shrink', 'mappps') . '"
            data-text-expand="' . esc_attr__('Expand', 'mappps') . '"
            data-icon-shrink="icon-mappps-shrink"
            data-icon-expand="icon-mappps-enlarge"
        >
            <span class="icon-mappps-enlarge"></span>
            <span class="screen-reader-text">' . esc_html__('Expand/Shrink', 'mappps') . '</span>
        </button>';

    if ($showOpenInNewTab) {
        $cta_header .= '
        <a
            class="custom-button custom-button__only-icon cta-wrapper__new-tab"
            href="' . esc_url(get_permalink($post_id)) . '"
            target="_blank"
            title="' . esc_attr__('Open in new tab', 'mappps') . '"
        >
            <span class="icon-mappps-new-tab"></span>
            <span class="screen-reader-text">' . esc_html__('Open in new tab', 'mappps') . '</span>
        </a>';
    }

    if ($showViewItinerary) {
        $cta_header .= '
        <a
            class="custom-button custom-button__only-icon cta-wrapper__map"
            href="https://maps.google.com/maps?daddr=' . esc_attr($lat) . ',' . esc_attr($lng) . '&amp;ll="
            rel="noreferrer"
            target="_blank"
            title="' . esc_attr__('View itinerary', 'mappps') . '"
        >
            <span class="icon-mappps-map"></span>
            <span class="screen-reader-text">' . esc_html__('View itinerary', 'mappps') . '</span>
        </a>';
    }

    $cta_header .= '
        <button
            aria-label="' . esc_attr__('Close preview', 'mappps') . '"
            class="custom-button custom-button__only-icon cta-wrapper__close"
            title="' . esc_attr__('Close preview', 'mappps') . '"
        >
            <span class="icon-mappps-cross"></span>
            <span class="screen-reader-text">' . esc_html__('Close preview', 'mappps') . '</span>
        </button>
    </div>';

    // Replace article tag with shrinked version
    $article_open = '<article class="wp-block-mppps-post-details" style="--details-size:' . esc_attr($detailsSize) . '">';
    $article_open_shrinked = '<article class="wp-block-mppps-post-details" style="--details-size:' . esc_attr($detailsSize) . '" data-expanded="false">';
    $block_content = str_replace($article_open, $article_open_shrinked . $cta_header, $block_content);

    // Process HTML
    $block_html = new WP_HTML_Tag_Processor($block_content);
    if ($block_html->next_tag(['class_name' => 'wp-block-mppps-post-details'])) {
        $block_html->add_class($post_classes);
        $block_html->set_attribute('data-wp-key', 'post-details-item-' . $post_id);
        $block_html->set_attribute('data-hidden', 'true');
    }

    $content .= $block_html->get_updated_html();
}

$content .= '</div>';

wp_reset_postdata();

echo $content;
