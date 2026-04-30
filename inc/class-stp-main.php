<?php
namespace STP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Main {

	public static $_instance = null;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct() {
		self::load_dependencies();

		add_action( 'init', [ $this, 'init' ], 0 );
		add_action( 'plugins_loaded', [ __CLASS__, 'load_textdomain' ] );
		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_admin_assets' ] );
		add_action( 'admin_menu', [ __CLASS__, 'add_help_pages' ] );
		add_shortcode( 'stream', [ __CLASS__, 'stream_shortcode' ] );

		new Admin();
		new Block();
		new Shortcode();
	}

	public static function init() {
		if ( ! class_exists( 'CSF' ) ) {
			require_once STP_PLUGIN_PATH . 'frameworks/codestar-framework/codestar-framework.php';
		}
	}

	private static function load_dependencies() {
		require_once STP_PLUGIN_PATH . 'frameworks/codestar-framework/codestar-framework.php';
		require_once STP_PLUGIN_PATH . 'mimes/enable-mime-type.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-functions.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-admin.php';
		require_once STP_PLUGIN_PATH . 'class-stp-block.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-metabox.php';
		require_once STP_PLUGIN_PATH . 'inc/class-stp-shortcode.php';

		
	}

	public static function load_textdomain() {
		load_plugin_textdomain( 'streamcast', false, dirname( dirname( __FILE__ ) ) . "/languages" );
	}

	public static function enqueue_admin_assets( $hook ) {
		global $typenow;
		if ( 'streamcast' === $typenow ) {
			wp_enqueue_script( 'stp-admin-post-js', STP_PLUGIN_DIR . 'build/admin-post.js', [], STP_PLUGIN_VERSION, true );
			wp_enqueue_style( 'stp-admin-post-css', STP_PLUGIN_DIR . 'build/admin-post.css', [], STP_PLUGIN_VERSION );
			wp_enqueue_style( 'stp-admin-css', STP_PLUGIN_DIR . 'assets/admin.css', [], STP_PLUGIN_VERSION );
		}

		if ( 'streamcast_page_streamcast' === $hook ) {
			wp_enqueue_style( 'stp-dashboard-css', STP_PLUGIN_DIR . 'build/admin-dashboard.css', [], STP_PLUGIN_VERSION );

			$asset_file = include STP_PLUGIN_PATH . 'build/admin-dashboard.asset.php';
			wp_enqueue_script( 'apb-admin-dashboard', STP_PLUGIN_DIR . 'build/admin-dashboard.js', array_merge( $asset_file['dependencies'], [ 'wp-util' ] ), STP_PLUGIN_VERSION, true );
		}
	}

	public static function add_help_pages() {
		add_submenu_page(
			'edit.php?post_type=streamcast',
			'Demo & Help',
			'Demo & Help',
			'manage_options',
			'streamcast',
			[ __CLASS__, 'render_dashboard' ]
		);
	}

	public static function render_dashboard() {
		?>
        <div id="stpAdminDashboardWrapper"
             data-info='<?php echo esc_attr( wp_json_encode( [
			     'version'            => STP_PLUGIN_VERSION,
			     'isPremium'          => str_fs()->can_use_premium_code(),
			     'hasPro'             => STP_HAS_PRO,
			     'licenseActiveNonce' => wp_create_nonce( 'bPlLicenseActivation' )
		     ] ) ); ?>'
        ></div>
		<?php
	}

	

	public static function stream_shortcode( $atts ) {
		extract( shortcode_atts( [
			'url'        => null,
			'background' => null,
		], $atts ) );

		ob_start();
		?>
        <div style="width:200px;">
            <audio id="player" controls>
                <source src="<?php echo esc_url( $url ); ?>" type="audio/mp3"/>
            </audio>
        </div>

        <style>
            .plyr__control {
                margin-right: 0 !important;
            }

            .plyr--audio .plyr__controls {
                <?php echo 'background:' . esc_html($background ?? 'transparent') . '!important; border-radius:3px !important;'; ?>
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

	public static function activation_redirect() {
		add_option( 'stp_do_activation_redirect', true );
	}
}
