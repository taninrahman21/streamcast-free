<?php


//Lets register our shortcode
function stp_muses_player_cb($atts)
{
    extract(shortcode_atts(array(
        'id'         => null,
        'url'        => null,
        'background' => null,
    ), $atts));
    
    wp_enqueue_script('stp');
    
    $player_type = stp_get_meta($id, 'opt-radio', "minimal");
    $player_skin = stp_get_meta($id, 'player_skin', "mcclean");
    
    $stationName = stp_get_meta($id, 'station_name', "Station Name");
    $welcomeMsg = stp_get_meta($id, 'welcome_msgs', "Welcome Message");
    $streamURL = stp_get_meta($id, 'stream_url', "https://media-ssl.musicradio.com/HeartLondon");
    $artWork = stp_get_meta($id, 'artwork', [ "url" => "https://templates.bplugins.com/wp-content/uploads/2025/02/streamcast-demo-ultimate-1.png"]);
    $playerWidth =  stp_get_meta($id, 'playerWidth', "100%");
    $backgroundColor = stp_get_meta($id, 'background', "#f09f8b");


    if ($player_type === "ultimate") {
        $stationName = stp_get_meta($id, "radioName", "Station Name");
        $streamURL = esc_attr(stp_get_meta($id, "streamURL", "http://s5-webradio.antenne.de/antenne?icy=https"));
        $playerWidth =  stp_get_meta($id, 'playerWidth', "100%");
    } elseif (in_array($player_type, ["auroraPlay", "echoStream", "wooden"])) {
        $stationName = stp_get_meta($id, 'station_name_echoXaurora', "Hello London");
        $welcomeMsg = stp_get_meta($id, 'welcomeMsg_echoXaurora', "106.2");
        $streamURL = stp_get_meta($id, 'stream_url_echoXaurora', "https://media-ssl.musicradio.com/HeartLondon");
        if ($player_type === "auroraPlay") {
            $artWork = stp_get_meta($id, 'aurora_art_image', [ "url" => "https://danialsabagh.com/singleaudioplayer/img/radio.jpg"]);
            $playerWidth =  stp_get_meta($id, 'widthXaurora', "100%");
            $backgroundColor = stp_get_meta($id, 'bgXaurora', "#302929");
        } elseif ($player_type === "wooden") {
            $playerWidth =  stp_get_meta($id, 'widthXaurora', "100%");
            $backgroundColor = stp_get_meta($id, 'bgXwooden', "#50241b");
        } else {
            $playerWidth =  stp_get_meta($id, 'widthXecho', "450px");
        }
    } elseif ($player_type === "standard") {
        $welcomeMsg = stp_get_meta($id, 'welcome_msgs', "Station Name");
        $streamURL = esc_attr(stp_get_meta($id, 'stream_url', "https://media-ssl.musicradio.com/HeartLondon"));
        if($player_skin === "b_circle") {
            $playerWidth =  stp_get_meta($id, 'width', "256px");
        }
    } else {
        $streamURL = esc_attr(stp_get_meta($id, 'stream_url', "https://media-ssl.musicradio.com/HeartLondon"));
        $playerWidth = stp_get_meta($id, 'width', "100%");
        $backgroundColor = stp_get_meta($id, 'background', "#f09f8b");
    }


    $default_dimensions = ['width' => 180, 'height' => 60];

    $skin_dimensions = [
        'b_circle'           => ['width' => 100, 'height' => 100],
        'mcclean'            => ['width' => 180, 'height' => 60],
        'radiovoz'           => ['width' => 220, 'height' => 69],
        'faredirfare'        => ['width' => 269, 'height' => 52],
        'tweety'             => ['width' => 189, 'height' => 62],
        'compact'            => ['width' => 191, 'height' => 46],
        'cassette'           => ['width' => 200, 'height' => 120],
        'repvku-100'         => ['width' => 100, 'height' => 25],
        'darkconsole'        => ['width' => 190, 'height' => 62],
        'tiny'               => ['width' => 130, 'height' => 60],
        'universelle'        => ['width' => 155, 'height' => 65],
        'uuskin'             => ['width' => 166, 'height' => 83],
        'e76'                => ['width' => 130, 'height' => 75],
        'original'           => ['width' => 329, 'height' => 21],
        'arvyskin'           => ['width' => 560, 'height' => 30],
        'eastanbul'          => ['width' => 467, 'height' => 26],
        'substream'          => ['width' => 180, 'height' => 30],
        'banita'             => ['width' => 110, 'height' => 25],
        'listen-live'        => ['width' => 250, 'height' => 100],
        'easyplay'           => ['width' => 231, 'height' => 30],
        'stockblue'          => ['width' => 476, 'height' => 26],
        'largebayfm'         => ['width' => 451, 'height' => 90],
        'simple-blue'        => ['width' => 300, 'height' => 122],
        'simple-gray'        => ['width' => 300, 'height' => 122],
        'simple-green'       => ['width' => 300, 'height' => 122],
        'simple-orange'      => ['width' => 300, 'height' => 122],
        'simple-red'         => ['width' => 300, 'height' => 122],
        'simple-violet'      => ['width' => 300, 'height' => 122],
        'scradio'            => ['width' => 160, 'height' => 100],
        'repvku-115'         => ['width' => 115, 'height' => 25],
        'rb1'                => ['width' => 250, 'height' => 70],
        'tandem-115'         => ['width' => 115, 'height' => 25],
        'simcha-232-toggle'  => ['width' => 232, 'height' => 58],
        'simcha-232'         => ['width' => 232, 'height' => 58],
        'simcha-320'         => ['width' => 320, 'height' => 58],
        'kplayer'            => ['width' => 220, 'height' => 200],
        'appy'               => ['width' => 250, 'height' => 213],
        'blueberry'          => ['width' => 338, 'height' => 102],
        'oldradio'           => ['width' => 205, 'height' => 132],
        'oldradio-christmas' => ['width' => 205, 'height' => 132],
        'oldstereo'          => ['width' => 318, 'height' => 130],
        'xm'                 => ['width' => 234, 'height' => 66],
        'abrahadabra'        => ['width' => 100, 'height' => 141],
        'abrahadabra2'       => ['width' => 100, 'height' => 141],
        'wmp'                => ['width' => 386, 'height' => 47],
        'radioport'          => ['width' => 700, 'height' => 150],
        'alberto'            => ['width' => 250, 'height' => 95],
        'ff'                 => ['width' => 288, 'height' => 68],
        'neon'               => ['width' => 240, 'height' => 76],
        'player-stm'         => ['width' => 128, 'height' => 30],
        'neonslim'           => ['width' => 501, 'height' => 32],
        'greyslim'           => ['width' => 494, 'height' => 35],
        'demon'              => ['width' => 468, 'height' => 117],
        'xavi'               => ['width' => 250, 'height' => 95],
        'xavi2'              => ['width' => 95, 'height' => 95],
        'xavi3'              => ['width' => 250, 'height' => 95],
        'minimal'            => ['width' => 220, 'height' => 80],
        'grind'              => ['width' => 400, 'height' => 336],
        'cpr-180'            => ['width' => 180, 'height' => 40],
        'ammascota'          => ['width' => 290, 'height' => 100],
        'miniradio'          => ['width' => 275, 'height' => 112],
        'myradio'            => ['width' => 262, 'height' => 165],
        'terawhite'          => ['width' => 255, 'height' => 100],
        'kelabu-yellow'      => ['width' => 253, 'height' => 100],
        'cristal'            => ['width' => 300, 'height' => 113],
        'bintang'            => ['width' => 300, 'height' => 113],
        'tatarradiosi'       => ['width' => 418, 'height' => 150],
        'redsradiosml'       => ['width' => 500, 'height' => 158],
        'bogusblue'          => ['width' => 660, 'height' => 266],
        'bones'              => ['width' => 341, 'height' => 125],
        'combat'             => ['width' => 675, 'height' => 247],
        'dragonblues'        => ['width' => 400, 'height' => 145],
        'lemon'              => ['width' => 410, 'height' => 60],
        'limed'              => ['width' => 397, 'height' => 115],
        'longtail'           => ['width' => 498, 'height' => 61],
        'pinhead'            => ['width' => 421, 'height' => 120],
        'retro'              => ['width' => 669, 'height' => 259],
        'silvertune'         => ['width' => 200, 'height' => 104],
        'testskin'           => ['width' => 189, 'height' => 61],
        'retromatic'         => ['width' => 700, 'height' => 150],
        'retromaticsmall'    => ['width' => 298, 'height' => 150],
        'e90'                => ['width' => 190, 'height' => 59],
        'shmusic'            => ['width' => 300, 'height' => 190],
        'brujulalatina'      => ['width' => 330, 'height' => 100],
        'adn'                => ['width' => 700, 'height' => 150],
    ];

    // Check if skin exists, otherwise fallback
    $dimensions = isset($skin_dimensions[$player_skin]) ? $skin_dimensions[$player_skin] : $default_dimensions;


    $block = [
        "blockName" => "scb/streamcast-block",
        "attrs" => [
            "radioPlayer" => [
                "playerType" => $player_type === 'plyr' ? 'minimal' : $player_type,
                "streamURL" => $streamURL,
                "streamProvider" => esc_attr(stp_get_meta($id, 'streamProvider', "house.320k.mp3")),
                "streamPort" => esc_attr(stp_get_meta($id, 'streamPort', 8000)),
                "streamMountPoint" => esc_attr(stp_get_meta($id, 'streamMountPoint', true)),
                "fetchNameFromUrl" => $player_type === "ultimate" ? stp_get_meta($id, "fetch_name_from_url_ultimate", false) === "1" : get_post_meta($id, 'fetch_name_from_url', false) === "1",
                "stationName" =>  $stationName,
                "welcomeMessage" => $welcomeMsg,
                "artWork" => $artWork,
                "autoPlay" => stp_get_meta($id, 'autoplay', 0) === "1",
                "showTime" => stp_get_meta($id, 'timeholder', 1) === "1",
                "playerPosition" => stp_get_meta($id, 'player_postiion', "center"),
                "skin" => [
                    "name" => stp_get_meta($id, 'player_skin', "mcclean"),
                    "width" => $dimensions["width"],
                    "height" => $dimensions["height"]
                ],
                "initialVolume" => stp_get_meta($id, 'volume', 65)
            ],
            "radioStyles" => [
                "playerWidth" => $playerWidth,
                "ultimate" => [
                    "playerColors" => stp_get_meta($id, 'playerColors', "theme"),
                    "playerTheme" => stp_get_meta($id, 'playerThemes', "dodgerBlue"),
                    "playerOverlayColor" => stp_get_meta($id, 'playerOverlayColor', "rgba(15,17,21,0.5)"),
                    "thumbnailBorderColor" => stp_get_meta($id, 'imgBorderColor',  "rgba(255, 255, 255, 0.2)"),
                    "contentColor" => stp_get_meta($id, 'contentColor', "#fff"),
                    "buttonHoverColor" => stp_get_meta($id, 'btnHoverColor', "orangered"),
                    "progressActiveColor" => stp_get_meta($id, 'progressColor', "orangered"),
                    "visualizerColor" => stp_get_meta($id, 'visualizerColor', "orangered"),
                    "playerBackgroundImg" => stp_get_meta($id, 'bgImage', ""),
                    "posterImg" => stp_get_meta($id, 'radioImage', [
						"url" => "https://templates.bplugins.com/wp-content/uploads/2025/02/streamcast-demo-ultimate-1.png"
					])
                ],
                "echoStream" => [
                    "bgImg" =>  stp_get_meta($id, 'echo_bg_image', [
						"url" => "https://danialsabagh.com/singleaudioplayer/img/radio.jpg"
					]),
                    "blur" => stp_get_meta($id, 'blur_effect', 7)
                ],
                "backgroundColor" => $backgroundColor,
                "stationName" => [
                    "color" => stp_get_meta($id, "station_name_colorEchoXAuroraXwooden", "#fff"),
                    "hoverColor" => stp_get_meta($id, "station_name_hover_color", "#fff"),
                    "typo" => [
                        "fontSize" => [
                            "desktop" => 18
                        ]
                        ],
                    "bgColor" => stp_get_meta($id, "station_name_bg_color", "#50241b"),
                    "hoverBgColor" => stp_get_meta($id, "station_name_bg_hover_color", "")
                ],
                "artistFmName" => [
                    "color" => stp_get_meta($id, "welcome_msg_colorEchoXAurora", "#fff"),
                    "typo" => [
                        "fontSize" => [
                            "desktop" => 15
                        ]
                    ]
                ],
                "contentColor" => stp_get_meta($id, "contentColorEchoXauroraXwooden", "#fff"),
                "playBtnColor" => stp_get_meta($id, "play_btn_color", true),
                "timeStamp" => [
                    "color" => stp_get_meta($id, "timeStamp_color", "#fff"),
                    "hoverColor" => stp_get_meta($id, "timeStamp_hover_color", "#fff"),
                    "typo" => [
                        "fontSize" => [
                            "desktop" => 18
                        ]
                        ],
                    "bgColor" => stp_get_meta($id, "timeStamp_bg_color", "#50241b"),
                    "hoverBgColor" => stp_get_meta($id, "timeStamp_bg_hover_color", "")
                ]
            ],
            'css' =>  esc_html(stp_get_meta($id, 'custom_css', "/* Your Custom CSS here	  */")),
        ],
        "innerBlocks" => [],
        "innerHTML" => "",
        "innerContent" => []
    ];


    return render_block($block);
}
add_shortcode('radio_player', 'stp_muses_player_cb');

function my_user_vote()
{
    if(wp_verify_nonce(sanitize_text_field($_POST("nonce")))) {
        wp_send_json_error("Invalid Request");
    }

    if (isset($_POST["url"])) {
        $streamUrl = sanitize_text_field($_POST['url']);
        $title = wp_remote_get($streamUrl);
        if (!is_wp_error($title)) {
            wp_send_json_success(wp_kses_post($title["body"]));
        }

        wp_send_json_error();
    }
}



add_action("wp_ajax_my_user_vote", "my_user_vote");
add_action("wp_ajax_nopriv_my_user_vote", "my_user_vote");
