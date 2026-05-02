<?php

/*
 * Plugin Name: StreamCast Free
 * Plugin URI:  https://wordpress.org/plugins/streamcast
 * Description: Play iceCast, Shoutcast, Radioco, Radionomy Live stream in Wordpress.
 * Version: 2.4.0
 * Author: bPlugins
 * Author URI: http://bPlugins.com
 * License: GPLv2
 * Requires at least: 6.2
 * Tested up to: 6.9
 * Text Domain:  streamcast
 * Domain Path:  /languages
 */

// ABS PATH
if ( ! defined( 'ABSPATH' ) ) exit;
    // Some Setup
    define( 'STP_PLUGIN_DIR', plugin_dir_url( __FILE__ ) );
    define( 'STP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
    define( 'STP_PLUGIN_VERSION', '2.4.0' );
    define('STP_PLUGIN_FILE', __FILE__);
    define( 'STP_HAS_PRO', 'streamcast-premium/streamcast.php' === plugin_basename(__FILE__));


    // Load main plugin class
    require_once plugin_dir_path( __FILE__ ) . 'inc/class-stp-main.php';
    // Initialize
    new \STP\STP_Main();