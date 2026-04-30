<?php 

    // Fields data.
    if ( empty( $attributes['data'] ) ) {
        return;
    }
    ?>
<?php
    $asasas = '';
    $player_selector = mb_get_block_field( 'player_selector' );
	if(is_admin()){
		
	echo "<div class='sc_block'style=''>";
	echo '<center><h3>StreamCast Radio Player</h3></center>';
	echo "Selected Player: ". get_the_title($player_selector );
	echo "<br /><i><small>To change the player, select this block and check Block Settings on the right sidebar.</small></i>";
	echo "</div>";			
	}
	else{
	echo do_shortcode( '[radio_player id=' . $player_selector .']' ); 
	}