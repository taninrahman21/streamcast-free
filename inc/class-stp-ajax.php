<?php
namespace STP;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Handle AJAX requests for StreamCast
 */
class AJAX {
	public function __construct() {
		add_action( 'wp_ajax_my_user_vote', array( $this, 'fetch_stream_data' ) );
		add_action( 'wp_ajax_nopriv_my_user_vote', array( $this, 'fetch_stream_data' ) );
	}

	/**
	 * Fetch stream data (proxy request to avoid CORS issues)
	 */
	public function fetch_stream_data() {
		// Verify nonce
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'stp_fetch_nonce' ) ) {
			wp_send_json_error( 'Invalid nonce', 403 );
		}

		// Get and validate URL
		$url = isset( $_POST['url'] ) ? esc_url_raw( $_POST['url'] ) : '';
		if ( empty( $url ) ) {
			wp_send_json_error( 'Invalid URL', 400 );
		}

		// Fetch the data
		$response = wp_remote_get( $url, array(
			'timeout' => 5,
		) );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( $response->get_error_message(), 500 );
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Return the data
		wp_send_json_success( $body );
	}
}
