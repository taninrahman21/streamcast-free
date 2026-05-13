<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$id = wp_unique_id( 'streamcast-' );

$streamUrl      = $attributes['radioPlayer']['streamURL'];
$streamPort     = $attributes['radioPlayer']['streamPort'];
$playerType     = $attributes['radioPlayer']['playerType'];
$welcomeMessage = $attributes['radioPlayer']['welcomeMessage'];
$skin           = $attributes['radioPlayer']['skin']['name'];
$width          = $attributes['radioPlayer']['skin']['width'];
$height         = $attributes['radioPlayer']['skin']['height'];
$autoPlay       = $attributes['radioPlayer']['autoPlay'];
$volume         = $attributes['radioPlayer']['initialVolume'];
$playerPosition = $attributes['radioPlayer']['playerPosition'];
$nonce          = wp_create_nonce( 'streamcast_fetch_nonce' );

if ( ! function_exists( 'streamcast_get_player_position_styles' ) ) {
	function streamcast_get_player_position_styles( $id, $playerPosition ) {
		$styles = '';
		if ( $playerPosition === 'center' ) {
			$styles = 'margin: auto; display: block;';
		} elseif ( $playerPosition === 'left' ) {
			$styles = 'margin-left: 0; margin-right: auto;';
		} elseif ( $playerPosition === 'right' ) {
			$styles = 'margin-left: auto; margin-right: 0;';
		}

		return '#' . esc_attr( $id ) . ' .musesStyleReset { ' . $styles . ' }';
	}
}

$dynamicPlayerStyles = streamcast_get_player_position_styles( $id, $playerPosition );

if ( $skin !== 'b_circle' && $playerType === 'standard' ) {
	$stationName      = $attributes['radioPlayer']['stationName'];
	$fetchNameFromUrl = $attributes['radioPlayer']['fetchNameFromUrl'];

	?>
	<div id='<?php echo esc_attr( $id ); ?>'>
		<style>
			<?php echo esc_html( wp_strip_all_tags( $dynamicPlayerStyles ) ); ?>
		</style>
		<script type="text/javascript">
			window.MRP?.insert({
				url: <?php echo wp_json_encode( $streamUrl ); ?>,
				lang: "en",
				codec: "mp3",
				volume: <?php echo (int) $volume; ?>,
				autoplay: <?php echo $autoPlay ? 'true' : 'false'; ?>,
				forceHTML5: true,
				welcome: <?php echo wp_json_encode( $welcomeMessage ); ?>,
				jsevents: true,
				buffering: 0,
				wmode: "transparent",
				skin: <?php echo wp_json_encode( $skin ); ?>,
				width: <?php echo (int) $width; ?>,
				height: <?php echo (int) $height; ?>,
				metadataMode: "shoutcast",
				metadataInterval: 15
			});

			var title = <?php echo wp_json_encode( $stationName ); ?>;

			async function fetchData() {
				try {
					const fetchUrl = <?php echo wp_json_encode( esc_url( $streamUrl ) . '/currentsong?sid=1' ); ?>;
					const formData = new FormData();
					formData.append('action', 'streamcast_fetch_stream');
					formData.append("url", fetchUrl);
					formData.append("nonce", <?php echo wp_json_encode( $nonce ); ?>);

					const response = await fetch(<?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>, {
						method: "POST",
						body: formData,
					});

					if (!response.ok) {
						throw new Error('Network response was not ok');
					}

					const data = await response.json();
					return data?.data || null;
				} catch (error) {
					return null;
				}
			}

			async function fetchIceCastData() {
				try {
					const fetchUrl = <?php echo wp_json_encode( esc_url( $streamUrl ) . '/status-json.xsl' ); ?>;
					const formData = new FormData();
					formData.append('action', 'streamcast_fetch_stream');
					formData.append("url", fetchUrl);
					formData.append("nonce", <?php echo wp_json_encode( $nonce ); ?>);

					const response = await fetch(<?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>, {
						method: "POST",
						body: formData,
					});

					if (!response.ok) {
						throw new Error('Network response was not ok');
					}

					const result = await response.json();
					if (result?.success && result?.data) {
						const data = JSON.parse(result.data);
						const stream = data.icestats?.source || null;
						if (stream) {
							return stream.title || stream.song || stream.server_name || "No Title Available";
						}
					}
					return null;
				} catch (error) {
					return null;
				}
			}

			async function updateTitle() {
				let title = <?php echo wp_json_encode( $stationName ); ?>;

				<?php if ( $fetchNameFromUrl ) { ?>
					let fetchedTitle = await fetchData();
					if (!fetchedTitle) {
						fetchedTitle = await fetchIceCastData();
					}
					if (fetchedTitle) {
						title = fetchedTitle;
					}
				<?php } ?>

				window.MRP?.setTitle(title);
			}

			updateTitle();
		</script>

	</div>
	<?php
} else {
	?>
	<div <?php echo wp_kses_post( get_block_wrapper_attributes() ); ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>
<?php }

