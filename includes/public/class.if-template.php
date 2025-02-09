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
    global $post;
    wp_enqueue_script('firebase-template', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/firebase-template.js', array('firebase'), FIREBASE_TEMPLATE_VERSION, false);
    wp_enqueue_style('firebase-template', FIREBASE_TEMPLATE__PLUGIN_URL . 'css/firebase-template.css');

    // Send verification email
    wp_enqueue_script('firebase-send-verification-email', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/send-verification-email.js', array('firebase'), FIREBASE_TEMPLATE_VERSION, false);
    wp_enqueue_script('firebase-verify-email', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/verify-email.js', array('firebase'), FIREBASE_TEMPLATE_VERSION, false);


    // Add script to a specific page
    if (is_page() || is_single()) {
      switch ($post->post_name) // post_name is the post slug which is more consistent for matching to here
      {
        case 'auth-handler':
          wp_enqueue_script('firebase-auth-handler', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/email-action-handler.js', array('firebase'), FIREBASE_TEMPLATE_VERSION, false);
          break;
        default:
          break;
      }
    }
  }
}
