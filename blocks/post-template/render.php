<?php
/**
 * Server-side rendering of the `mppps/post-template` block.
 */

$context = $block->context;
$postIDs = $context['mppps/postIDs'] ?? [];
$postType = $context['mppps/postType'] ?? '';
$putStickyFirst = $context['mppps/putStickyFirst'];

if (empty($postIDs)) {
    return '';
}

$query = new WP_Query([
    'post_type' => $postType,
    'post__in' => $postIDs,
    'posts_per_page' => -1,
    'ignore_sticky_posts' => $putStickyFirst ? 0 : 1
]);

if (!$query->have_posts()) {
    return '';
}

$content = '<div class="post-template__posts-wrapper"><div class="post-template__scroll-wrapper">';

while ($query->have_posts()) {
    $query->the_post();
    $post_id = get_the_ID();

    if (!in_array($post_id, $postIDs)) {
        continue;
    }

    // Get an instance of the current Post Template block.
    $block_instance = $block->parsed_block;

    // Set the block name to one that does not correspond to an existing registered block.
    // This ensures that for the inner instances of the Post Template block, we do not render any block supports.
    $block_instance['blockName'] = 'core/null';

    // Setup context filter
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

    // Process HTML
    $block_html = new WP_HTML_Tag_Processor($block_content);
    if ($block_html->next_tag(['class_name' => 'wp-block-mppps-post-template'])) {
        $block_html->add_class($post_classes);
        $block_html->set_attribute('data-wp-key', 'post-template-item-' . $post_id);
    }

    $content .= $block_html->get_updated_html();
}

$content .= '</div></div>';

wp_reset_postdata();

echo $content;
