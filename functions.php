<?php

/* ---------------------------------------------------------------------------
 * Child Theme URI | DO NOT CHANGE
 * --------------------------------------------------------------------------- */
define( 'CHILD_THEME_URI', get_stylesheet_directory_uri() );


/* ---------------------------------------------------------------------------
 * Define | YOU CAN CHANGE THESE
 * --------------------------------------------------------------------------- */

// White Label --------------------------------------------
define( 'WHITE_LABEL', false );

// Static CSS is placed in Child Theme directory ----------
define( 'STATIC_IN_CHILD', false );


/* ---------------------------------------------------------------------------
 * Enqueue Style
 * --------------------------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', 'mfnch_enqueue_styles', 101 );
function mfnch_enqueue_styles() {

	// Enqueue the parent stylesheet
// 	wp_enqueue_style( 'parent-style', get_template_directory_uri() .'/style.css' );		//we don't need this if it's empty

	// Enqueue the parent rtl stylesheet
	if ( is_rtl() ) {
		wp_enqueue_style( 'mfn-rtl', get_template_directory_uri() . '/rtl.css' );
	}

	// Enqueue the child stylesheet
	wp_dequeue_style( 'style' );
	wp_enqueue_style( 'style', get_stylesheet_directory_uri() .'/style.css' );

}


/* ---------------------------------------------------------------------------
 * Enqueue Script
 * --------------------------------------------------------------------------- */

function add_custom_script() {

    wp_register_script('TweenMax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js','','',true);
    wp_register_script('ScrollMagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.js','','',true);
    wp_register_script('ScrollMagicjQuery', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/jquery.ScrollMagic.js','','',true);
    wp_register_script('animation', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js','','',true);
    wp_register_script('scrollmagicfunctions', get_stylesheet_directory_uri() . '/js/scrollmagicfunctions.js', array ( 'jquery' ), 1.1, true);
		wp_register_script('modernizr-custom-mq', get_stylesheet_directory_uri() . '/js/modernizr-custom-mq.js', '','', true);

    wp_enqueue_script('TweenMax');
    wp_enqueue_script('ScrollMagic');
    wp_enqueue_script('ScrollMagicjQuery');
    wp_enqueue_script('animation');
    wp_enqueue_script('scrollmagicfunctions');
		wp_enqueue_script('modernizr-custom-mq');

}
add_action( 'wp_enqueue_scripts', 'add_custom_script' );






/* ---------------------------------------------------------------------------
 * Load Textdomain
 * --------------------------------------------------------------------------- */
add_action( 'after_setup_theme', 'mfnch_textdomain' );
function mfnch_textdomain() {
    load_child_theme_textdomain( 'betheme',  get_stylesheet_directory() . '/languages' );
    load_child_theme_textdomain( 'mfn-opts', get_stylesheet_directory() . '/languages' );
}

/* CHANGE LOGIN PAGE LOGO */
function my_login_logo() { ?>
    <style type="text/css">
        .login h1 a {
            background-image: url('/wp-content/uploads/2016/12/logo.png') !important;
        background-size: contain !important;
        width:100% !important;
        }
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );

function my_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return 'JLF';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );
/* END OF CHANGE LOGIN PAGE LOGO */


/* CHANGE FOOTER TEXT ON WP DASHBOARD */
function change_footer_admin () {
  echo 'Website developed by <a href="http://www.9cloudwebworks.com/" target="_blank"> 9 Cloud Web Works </a>';
}

add_filter('admin_footer_text', 'change_footer_admin');
/* END CHANGE FOOTER TEXT ON WP DASHBOARD */

/* SHOW CURRENT YEAR IN FOOTER */
// [getyear]
function get_current_year(){
    $currentYear = date('Y', mktime());
    return $currentYear;
}
add_shortcode( 'getyear', 'get_current_year' );
/* END SHOW CURRENT YEAR IN FOOTER */



?>
