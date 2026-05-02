<?php
namespace STP;

if ( ! defined( 'ABSPATH' ) ) exit;

class Functions {
	public static function get_meta( $id, $key, $default = null ) {
		$value = get_post_meta( $id, $key, true );
		return $value ?: $default;
	}
}

// Global wrapper for convenience and backward compatibility
if ( ! function_exists( 'stp_get_meta' ) ) {
	function stp_get_meta( $id, $key, $default = null ) {
		return \STP\Functions::get_meta( $id, $key, $default );
	}
}
