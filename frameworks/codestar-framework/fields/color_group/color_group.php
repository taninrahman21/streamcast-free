<?php if ( ! defined( 'ABSPATH' ) ) { die; } // Cannot access directly.
/**
 *
 * Field: color_group
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 */
if ( ! class_exists( 'CSF_Field_color_group' ) ) {
  class CSF_Field_color_group extends CSF_Fields {

    public function __construct( $field, $value = '', $unique = '', $where = '', $parent = '' ) {
      parent::__construct( $field, $value, $unique, $where, $parent );
    }

    public function render() {

      $options = ( ! empty( $this->field['options'] ) ) ? $this->field['options'] : array();

      echo $this->field_before(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

      if ( ! empty( $options ) ) {
        foreach ( $options as $key => $option ) {

          $color_value  = ( ! empty( $this->value[$key] ) ) ? $this->value[$key] : '';
          $default_attr = ( ! empty( $this->field['default'][$key] ) ) ? ' data-default-color="'. esc_attr( $this->field['default'][$key] ) .'"' : '';

          echo '<div class="csf--left csf-field-color">';
          echo '<div class="csf--title">'. wp_kses_post( $option ) .'</div>';
          echo '<input type="text" name="'. esc_attr( $this->field_name( '['. $key .']' ) ) .'" value="'. esc_attr( $color_value ) .'" class="csf-color"'. $default_attr . $this->field_attributes() .'/>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
          echo '</div>';

        }
      }

      echo $this->field_after(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

    }

  }
}
