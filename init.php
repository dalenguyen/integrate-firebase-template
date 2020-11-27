<?php
/**
 * The extention template for expanding Integrate Firebase PRO plugin.
 *
 * @category     WordPress_Plugin
 * @package      integrate-firebase-template
 * @author       dalenguyen
 * @link         https://firebase.dalenguyen.me
 *
 * Plugin Name:  Integrate Firebase Template
 * Plugin URI:   https://firebase.dalenguyen.me
 * Description:  Extention template plugin for Integrate Firebase PRO
 * Author:       dalenguyen
 * Author URI:   http://dalenguyen.me
 * Contributors: Dale Nguyen (@dalenguyen)
 *
 * Version:      1.0.0
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

define('FIREBASE_TEMPLATE_VERSION', '1.0.0');
define('FIREBASE_TEMPLATE__MINIMUM_WP_VERSION', '4.0.0');
define('FIREBASE_TEMPLATE__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FIREBASE_TEMPLATE__PLUGIN_URL', plugin_dir_url(__FILE__));

// Template

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
