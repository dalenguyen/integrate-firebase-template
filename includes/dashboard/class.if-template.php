<?php

/**
 * Add Template to Firebase Menu
 */

defined('ABSPATH') || exit;

class Firebase_Template_Admin {
  private static $initiated = false;

  public static function init() {
    if (!self::$initiated) {
      self::init_hooks();
    }
  }

  public static function init_hooks() {
    self::$initiated = true;

    add_action('admin_menu', array('Firebase_Template_Admin', 'add_firebase_template_menu'));
    add_action('admin_enqueue_scripts', array('Firebase_Template_Admin', 'load_firebase_template_js'));
  }

  public static function load_firebase_template_js() {
    wp_enqueue_script('firebase-template', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/dashboard-firebase-template.js', array('jquery'), FIREBASE_TEMPLATE_VERSION, false);
  }

  public static function add_firebase_template_menu() {
    if ((is_plugin_active('integrate-firebase-PRO/init.php')) && class_exists('Firebase')) {
      add_submenu_page(
        'firebase-setting', // string $parent_slug
        'Firebase Template Integration', // string $page_title,
        'Template', // string $menu_title,
        'manage_options', // string $capability,
        'firebase-template', // string $menu_slug,
        array('Firebase_Template_Admin', 'add_firebase_template_menu_html') // callable $function = ''
      );
    }
  }

  public static function add_firebase_template_menu_html() {
    // check user capabilities
    if (!current_user_can('manage_options')) {
      return;
    }

    echo "<div class='wrap'>";
    echo "<h1>Template (v" . FIREBASE_TEMPLATE_VERSION . ")</h1>";
    // Errors & Messages
    echo "<div id='firebase-error' class='error notice notice-error is-dismissible'></div>";
    echo "<div id='firebase-message' class='message notice notice-success is-dismissible'></div>";
    echo "<div id='firebase-warning' class='message notice notice-warning is-dismissible'></div>";
    settings_errors();

    // Form
    echo "<form method='post' action='options.php'>";
    echo "
          <h2>Template Extension</h2>

          <p>This is the sample template for extending Integrate Firebase PRO.</p>
        ";

    echo "
              <button class='button button-primary' type='button' id='firebase-trigger-functions' data-url=" . admin_url('admin-post.php') . ">
                Trigger Custom Function
              </button>
            ";
    echo '</form>';
    echo '</div>';
  }
}
