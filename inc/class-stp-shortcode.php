<?php
namespace STP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Shortcode {
	public function __construct() {
		add_shortcode( 'radio_player', [ $this, 'radio_player_callback' ] );
	}

	public function radio_player_callback( $atts ) {
		extract( shortcode_atts( [
			'id'         => null,
			'url'        => null,
			'background' => null,
		], $atts ) );

		$post_type = get_post_type( $id );
		if ( 'streamcast' != $post_type ) {
			return false;
		}

		$player_type = stp_get_meta( $id, 'opt-radio', "minimal" );

		// 1. Determine dynamic values based on player type and metabox
		$streamURL       = stp_get_meta( $id, 'stream_url', "https://media-ssl.musicradio.com/HeartLondon" );
		$stationName     = stp_get_meta( $id, 'station_name', "Station Name" );
		$welcomeMsg      = stp_get_meta( $id, 'welcome_msgs', "Welcome Message" );
		$artWork         = ""; // Default from block.json
		$backgroundColor = stp_get_meta( $id, 'background', "#f09f8b" );
		$playerWidth     = stp_get_meta( $id, 'playerWidth', "100%" );

		if ( $player_type === "ultimate" ) {
			$stationName = stp_get_meta( $id, "radioName", "Station Name" );
			$streamURL   = stp_get_meta( $id, "streamURL", "http://s5-webradio.antenne.de/antenne?icy=https" );
			$artWork     = "https://templates.bplugins.com/wp-content/uploads/2025/02/streamcast-demo-ultimate-1.png";
		} elseif ( in_array( $player_type, [ "auroraPlay", "echoStream", "wooden" ] ) ) {
			$stationName = stp_get_meta( $id, 'station_name_echoXauroraXwooden', "Hello London" );
			$welcomeMsg  = stp_get_meta( $id, 'welcomeMsg_echoXaurora', '106.2' );
			$streamURL   = stp_get_meta( $id, 'stream_url_echoXaurora', "https://media-ssl.musicradio.com/HeartLondon" );
			if ( $player_type === "auroraPlay" ) {
				$artWork         = "https://danialsabagh.com/singleaudioplayer/img/radio.jpg";
				$playerWidth     = stp_get_meta( $id, 'widthXaurora', "100%" );
				$backgroundColor = stp_get_meta( $id, 'bgXaurora', "#000000" );
			} elseif ( $player_type === "wooden" ) {
				$playerWidth     = stp_get_meta( $id, 'widthXaurora', "100%" );
				$backgroundColor = stp_get_meta( $id, 'bgXwooden', "#693328" );
			} else {
				$playerWidth = stp_get_meta( $id, 'widthXecho', "450px" );
			}
		}

		// 2. Construct the block array with attrs matching block.json structure
		$block = [
			"blockName" => "scb/streamcast-block",
			"attrs"     => [
				"radioPlayer" => [
					"playerType"       => $player_type === 'plyr' ? 'minimal' : $player_type,
					"streamURL"        => $streamURL,
					"streamProvider"   => stp_get_meta( $id, 'streamProvider', 'shout-cast' ),
					"streamPort"       => (int) stp_get_meta( $id, 'streamPort', 8000 ),
					"streamMountPoint" => stp_get_meta( $id, 'streamMountPoint', "" ),
					"fetchNameFromUrl" => false,
					"stationName"      => $stationName,
					"welcomeMessage"   => $welcomeMsg,
					"artWork"          => $artWork,
					"autoPlay"         => false,
					"showTime"         => true,
					"playerPosition"   => "center",
					"skin"             => [
						"name"   => stp_get_meta( $id, 'player_skin', 'mcclean' ),
						"width"  => 180,
						"height" => 60
					],
					"initialVolume"    => 65
				],
				"radioStyles" => [
					"playerWidth"     => $playerWidth,
					"ultimate"        => [
						"playerColors"         => "theme",
						"playerTheme"          => "dodgerBlue",
						"playerOverlayColor"   => "rgba(15,17,21,0.5)",
						"thumbnailBorderColor" => "rgba(255, 255, 255, 0.2)",
						"contentColor"         => stp_get_meta( $id, 'contentColor', "#fff" ),
						"buttonHoverColor"     => "orangered",
						"progressActiveColor"  => "orangered",
						"visualizerColor"      => "orangered",
						"playerBackgroundImg"  => "",
						"posterImg"            => [
							"url" => "https://templates.bplugins.com/wp-content/uploads/2025/02/streamcast-demo-ultimate-1.png"
						]
					],
					"echoStream"      => [
						"bgImg" => [
							"url" => "https://danialsabagh.com/singleaudioplayer/img/radio.jpg"
						],
						"blur"  => (int) stp_get_meta( $id, 'blur_effect', 7 )
					],
					"backgroundColor" => $backgroundColor,
					"stationName"     => [
						"color"        => "#fff",
						"hoverColor"   => "",
						"typo"         => [
							"fontSize"   => [ "desktop" => 18 ],
							"fontFamily" => "Default"
						],
						"bgColor"      => "#50241b",
						"hoverBgColor" => ""
					],
					"artistFmName"    => [
						"color" => "#fff",
						"typo"  => [
							"fontSize"   => [ "desktop" => 15 ],
							"fontFamily" => "Default"
						]
					],
					"contentColor"    => stp_get_meta( $id, 'contentColorEchoXauroraXwooden', "#fff" ),
					"playBtnColor"    => "red",
					"timeStamp"       => [
						"color"        => "#fff",
						"hoverColor"   => "",
						"typo"         => [
							"fontSize"   => [ "desktop" => 18 ],
							"fontFamily" => "Default"
						],
						"bgColor"      => "#50241b",
						"hoverBgColor" => ""
					]
				],
				"css"         => stp_get_meta( $id, 'custom_css', "/* Your Custom CSS here */" ),
			],
			"innerBlocks"  => [],
			"innerHTML"    => "",
			"innerContent" => []
		];

		return render_block( $block );
	}
}
