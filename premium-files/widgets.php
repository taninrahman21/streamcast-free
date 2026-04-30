<?php 
class SC_Widget extends \WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops = array( 
			'classname' => 'SC_Widget',
			'description' => 'StreamCast Radio Player',
		);
		parent::__construct( 'SC_Widget', 'StreamCast Radio Player', $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$player = ! empty( $instance['player'] ) ? $instance['player'] : '';
		echo $args['before_widget'];
		if ( ! empty( $title ) ) {
			echo $args['before_title'] . $title . $args['after_title'];
		}

		$shortcode = '[radio_player id="'.$player.'"]';

		?>
			<div class="textwidget"><?php echo do_shortcode($shortcode); ?></div>
		<?php
		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
	
		$title = ! empty( $instance['title'] ) ? $instance['title'] : ''; 
		$player = ! empty( $instance['player'] ) ? $instance['player'] : ''; ?>


				
				<?php
				
				$args = array(
							'post_type' => 'streamcast',
							'post_status ' => 'published',
							);						
				// The Query
				$the_query = new WP_Query( $args );
				 
				// The Loop
				if ( $the_query->have_posts() ) { ?>
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>">Title:</label>
				<input class="widefat" type="text" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
			</p>					
			<p>
				<label for="<?php echo $this->get_field_id( 'player' ); ?>">Select Player:</label>
				
				<select  name="<?php echo $this->get_field_name( 'player' ); ?>" id="<?php echo $this->get_field_id( 'player' ); ?>">
				
				<?php

					while ( $the_query->have_posts() ) {
						$the_query->the_post();
						?>
						<option <?php if(get_the_id()==$player){echo "selected";} ?> value="<?php echo get_the_id(); ?>"><?php echo get_the_title(); ?></option>
					
					<?php
					}
					
				}
				?>

				</select>				
			</p>			
			<?php
			if ( !$the_query->have_posts() ) {
				echo '<p>You have not created any Radio Player Yet. Please <a href="post-new.php?post_type=streamcast">Create a readio player</a> first and try again.</p>'; 
				}
			
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance[ 'title' ] = strip_tags( $new_instance[ 'title' ] );
		$instance[ 'player' ] = strip_tags( $new_instance[ 'player' ] );
		return $instance;
}
	}


add_action( 'widgets_init', function () { 
	register_widget( 'SC_Widget' );
  } );