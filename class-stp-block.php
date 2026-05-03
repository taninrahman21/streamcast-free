<?php
namespace STP;

if ( ! defined( 'ABSPATH' ) ) exit;

if (!class_exists('STP_Block')) {
	class STP_Block {
		public function __construct() {
			add_action('init', [__CLASS__, 'onInit']);
			add_action('enqueue_block_assets', [__CLASS__, 'scb_enqueue_block_assets']);
		}
		public static function onInit() {
			register_block_type(STP_PLUGIN_PATH . '/build');

			// Register external Muses player script.
			wp_register_script('muses-player', STP_PLUGIN_DIR . 'assets/vendor/muses-player/mrp.js', [], '1.0', false);
		}

		public static function scb_enqueue_block_assets() {
			wp_enqueue_style('scb-style', STP_PLUGIN_DIR . 'public/css/radio.css', array(), STP_PLUGIN_VERSION, 'all');
			wp_enqueue_style('scb-player-style', STP_PLUGIN_DIR . 'public/css/styles.css', array(), STP_PLUGIN_VERSION, 'all');
			wp_enqueue_script('scb-script', STP_PLUGIN_DIR . 'public/js/streamcast-final.js', array('jquery'), STP_PLUGIN_VERSION, true);

			// Enqueue Muses player script.
			wp_enqueue_script('muses-player');

			$data = array(
				'iframePath' => STP_PLUGIN_DIR . 'iframe.html',
				'ajaxUrl' => admin_url('admin-ajax.php'),
				'plyrSvg' => STP_PLUGIN_DIR . 'assets/vendor/plyr/plyr.svg',
				'plyrBlankVideo' => STP_PLUGIN_DIR . 'assets/vendor/plyr/blank.mp4',
				'nonce' => wp_create_nonce('stp_fetch_nonce'),
			);

			// Pass data to JavaScript.
			wp_localize_script('scb-streamcast-block-editor-script', 'myScriptData', $data);
			wp_localize_script('scb-streamcast-block-view-script', 'myScriptData', $data);
			wp_localize_script('scb-script', 'myScriptData', $data);
		}

	}

	new STP_Block();
}

