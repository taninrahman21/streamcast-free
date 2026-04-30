<?php

function get_list() {
    $options = array();
    $args = array(
        'post_type' => array( 'streamcast' ),
        'posts_per_page' => -1,
    );
    $causes = new WP_Query( $args );
    if ( $causes->have_posts() ) {
        while ( $causes->have_posts() ) {
            $causes->the_post();
            $options[ get_the_ID() ] = get_the_title();
        }
    }
    wp_reset_postdata();
    return $options;
}



add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title'           => 'StreamCast Radio Player',
		'id'              => 'streamcast',
		'type'            => 'block',
		'icon'            => 'controls-play',
		'context'         => 'side',
		'render_template' => KAHF_PLUGIN_DIR . '/inc/incfix/index-view.php',
		'fields'          => [
			array(
                'name'            => 'Select Player',
                'id'              => 'player_selector',
                'type'            => 'select',
                'options'         => get_list(),
                'multiple'        => false,
                'placeholder'     => 'Select an Item',
                'select_all_none' => true,
            ),
		],
    ];
	return $meta_boxes;
} );