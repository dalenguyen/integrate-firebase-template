<?php

/**
 * Trigger custom functions
 */

defined('ABSPATH') || exit;

class Firebase_Trigger_Functions_Admin {
  private static $initiated = false;

  public static function init() {
      if (!self::$initiated) {
          self::init_hooks();
      }
  }

  public static function init_hooks() {
    self::$initiated = true;

    add_action( 'admin_enqueue_scripts', array('Firebase_Trigger_Functions_Admin', 'load_firebase_trigger_functions_js') );
    add_action( 'admin_post_firebase_trigger_functions', array('Firebase_Trigger_Functions_Admin', 'firebase_call_functions') );
  }

  public static function load_firebase_trigger_functions_js() {
    wp_enqueue_script('firebase-trigger-functions', FIREBASE_TEMPLATE__PLUGIN_URL . 'js/firebase-trigger-functions.js', array('jquery'), FIREBASE_TEMPLATE_VERSION, false);
  }

  public static function firebase_call_functions() {
    // Should trigger custom functions
    echo 'Custom functions triggered!<br>';

    // Save data to firebase
    $database_type = 'realtime'; // firestore
    $collection_name = 'wpTest';
    $doc_id = '1';

    // Data obj will be saved to realtime
    $filtered_data = new stdClass();
    $filtered_data->fullName = 'Dale Nguyen';

    // You need to install PRO plugin & set up cloud functions
    // in order for the saving feature to work
    $result = apply_filters('firebase_save_data_to_database', $database_type, $collection_name, $doc_id, $filtered_data);

    if ($result && $result->status) {
      echo $result->message;
    } else {
      echo 'Error: saving data to firebase >.<';
    }
  }
}
