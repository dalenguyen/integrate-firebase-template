<?php

/**
 * The extension template for expanding Integrate Firebase PRO plugin.
 *
 * @category     WordPress_Plugin
 * @package      integrate-firebase-template
 * @author       dalenguyen
 * @link         https://techcater.com
 *
 * Plugin Name:  Integrate Firebase Template
 * Plugin URI:   https://techcater.com
 * Description:  Extension template plugin for Integrate Firebase PRO
 * Author:       dalenguyen
 * Author URI:   http://dalenguyen.me
 * Contributors: Dale Nguyen (@dalenguyen)
 *
 * Version:      1.1.0
 *
 * Text Domain:  integrate-firebase-template
 * Domain Path: /languages/
 *
 *
 *
 * This is an add-on for WordPress
 * https://wordpress.org/
 *
 */

// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
  echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
  exit;
}

define('FIREBASE_TEMPLATE_VERSION', '1.1.0');
define('FIREBASE_TEMPLATE__MINIMUM_WP_VERSION', '4.0.0');
define('FIREBASE_TEMPLATE__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FIREBASE_TEMPLATE__PLUGIN_URL', plugin_dir_url(__FILE__));

// Template

add_action('firebase_pro_init', 'init_template');

function init_template() {
  error_log(FIREBASE_TEMPLATE__PLUGIN_DIR);
  if (class_exists('Firebase')) {
    require_once FIREBASE_TEMPLATE__PLUGIN_DIR . 'includes/public/class.if-template.php';
    Firebase_Template::init();

    // Admin configuration
    if (is_admin() || (defined('WP_CLI') && WP_CLI)) {
      require_once FIREBASE_TEMPLATE__PLUGIN_DIR . 'includes/dashboard/class.if-template.php';
      Firebase_Template_Admin::init();


      // Trigger custom function
      require_once FIREBASE_TEMPLATE__PLUGIN_DIR . 'includes/dashboard/class.if-trigger-functions.php';
      Firebase_Trigger_Functions_Admin::init();
    }
  }
}

// add_filter('firebase_before_saving_user_to_database', 'edit_user_data_before_saving');

// function edit_user_data_before_saving($user) {
//   error_log('----edit_user_data_before_saving');
//   // add custom data to user
//   $user['custom_data'] = 'custom data 123';
//   return $user;
// }

// add_filter('firebase_before_saving_post_to_database', 'edit_post_before_saving');

// function edit_post_before_saving($post) {
//   // add custom data to post

//   if ($post->post_type == 'post') {
//     $post->custom_data = 'post custom data 123';
//   }

//   if ($post->post_type == 'page') {
//     $post->custom_data = 'page custom data 123';
//   }

//   return $post;
// }
