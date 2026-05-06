<?php
namespace STP;

if (!defined('ABSPATH')) {
	exit;
}

class STP_Main {

	public function __construct() {
		self::load_dependencies(); 
		new \STP\AJAX();
		do_action('csf_init');
		add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_assets']);
		add_action('admin_menu', [__CLASS__, 'add_help_pages']);
		add_shortcode('stream', [__CLASS__, 'stream_shortcode']); 
		add_filter('plugin_action_links_' . plugin_basename(STP_PLUGIN_FILE), [$this, 'add_action_links']);
	}

	private static function load_dependencies() {
		require_once STP_PLUGIN_PATH . 'mimes/enable-mime-type.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-functions.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-admin.php';
		require_once STP_PLUGIN_PATH . 'class-stp-block.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-shortcode.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-ajax.php';

		if (!class_exists('CSF')) {
			require_once STP_PLUGIN_PATH . 'frameworks/codestar-framework/codestar-framework.php';
		}

		add_action('csf_init', function () {
			require_once STP_PLUGIN_PATH . 'inc/class-stp-metabox.php';
		});
	}
	
	public static function load_metabox() {
		if(class_exists('CSF')) { 
			require_once STP_PLUGIN_PATH . 'inc/class-stp-metabox.php';
		}
	}



	public static function enqueue_admin_assets($hook) {
		global $typenow;
		if ('streamcast' === $typenow) {
			wp_enqueue_script('stp-admin-post-js', STP_PLUGIN_DIR . 'build/admin-post.js', [], STP_PLUGIN_VERSION, true);
			wp_enqueue_style('stp-admin-post-css', STP_PLUGIN_DIR . 'build/admin-post.css', [], STP_PLUGIN_VERSION);
			wp_enqueue_style('stp-admin-css', STP_PLUGIN_DIR . 'assets/admin.css', [], STP_PLUGIN_VERSION); 
			wp_enqueue_script('stp-admin-js', STP_PLUGIN_DIR . 'assets/admin.js', [], STP_PLUGIN_VERSION, true);
		}

		if ('streamcast_page_streamcast' === $hook) {
			wp_enqueue_style('stp-dashboard-css', STP_PLUGIN_DIR . 'build/admin-dashboard.css', [], STP_PLUGIN_VERSION);

			$asset_file = include STP_PLUGIN_PATH . 'build/admin-dashboard.asset.php';
			wp_enqueue_script('apb-admin-dashboard', STP_PLUGIN_DIR . 'build/admin-dashboard.js', array_merge($asset_file['dependencies'], ['wp-util']), STP_PLUGIN_VERSION, true);
		}
	}

	public static function add_help_pages()
	{
		add_submenu_page(
			'edit.php?post_type=streamcast',
			'Demo & Help',
			'Demo & Help',
			'manage_options',
			'streamcast',
			[__CLASS__, 'render_dashboard']
		);
	}

	public static function render_dashboard()
	{
		?>
		<div id="stpAdminDashboardWrapper" data-info='<?php echo esc_attr(wp_json_encode([
			'version' => STP_PLUGIN_VERSION,
			'isPremium' => false,
			'hasPro' => false,
			'licenseActiveNonce' => wp_create_nonce('bPlLicenseActivation')
		])); ?>'></div>
		<?php
	}

	public static function stream_shortcode($atts) {
		$atts = shortcode_atts(
			[
				'url' => null,
				'background' => null,
			],
			$atts
		);

		$url = esc_url($atts['url']);
		$background = sanitize_hex_color($atts['background']) ?: 'transparent';

		ob_start();
		?>
		<div style="width:200px;">
			<audio id="player" controls>
				<source src="<?php echo esc_url($url); ?>" type="audio/mp3" />
			</audio>
		</div>

		<style>
			.plyr__control {
				margin-right: 0 !important;
			}

			.plyr--audio .plyr__controls {
				background:
					<?php echo esc_attr($background); ?>
					!important;
				border-radius: 3px !important;
			}
		</style>

		<script>
			const player = new Plyr('#player', {
				controls: ['play', 'mute', 'volume']
			});
		</script>
		<?php
		return ob_get_clean();
	}

	public function add_action_links($links) {
		$help_link = '<a href="' . admin_url('edit.php?post_type=streamcast&page=streamcast') . '"><span style="color: #f18500; font-weight: 600;">' . __('Help & Demo\'s', 'streamcast') . '</span></a>';
		array_unshift($links, $help_link);
		return $links;
	}

}

