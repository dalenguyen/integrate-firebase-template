<?php

/**
 * Add Template to the frontend
 */

defined('ABSPATH') || exit;

class Firebase_Template {
  private static $initiated = false;

  public static function init() {
    if (!self::$initiated) {
      self::init_hooks();
    }
  }

  public static function init_hooks() {
    self::$initiated = true;
    add_action('wp_enqueue_scripts', array('Firebase_Template', 'load_firebase_template_js'));
  }

  public static function load_firebase_template_js() {
    wp_enqueue_script('firebase-template', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/firebase-template.js', array('firebase'), FIREBASE_TEMPLATE_VERSION, false);
    wp_enqueue_style('firebase-template', FIREBASE_TEMPLATE__PLUGIN_URL . 'css/firebase-template.css');
  }
}
