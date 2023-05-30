<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ilot_software_wp' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'Harley0727' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '!_5[Ly%]U2lO)BuC /eQ@cQJ[/wv<b>P(A7cT#`yKz#;.,t!5jq(Cm;@DkmT$G]_' );
define( 'SECURE_AUTH_KEY',  'xKfGk$#wD#dz$Hf>6.KJ05O8MYzAW aiTYcpE?c2[d^(lk8|<)5z1:&$`&%[MX}F' );
define( 'LOGGED_IN_KEY',    'Xk&S]Dp4TKeZPF(X![o{1eFmpCWqNC(R7K$_(Q|l2;v3c2%@w1t!6@f1gvrBzGEb' );
define( 'NONCE_KEY',        ']XA*:Eph`&bv.yxJhuFCa`k9MR02xAPW<P:N-CRuA@pTixj>)470QOR)fy9O,=^%' );
define( 'AUTH_SALT',        'G%h?]D;j4|g.b/ B{~:>^B$oKl?xa_^FmbAIR/rikB4t,g~/!aY`Mz;V2,FA<nK!' );
define( 'SECURE_AUTH_SALT', '>;eP&jG[H-jik `I]$Ag@.`=*vqZC{!RvK[K^UL+ c[X|;O=3YWK^kP{vA{p?G%u' );
define( 'LOGGED_IN_SALT',   '#1/[/dQ&#>(mx:h%p_11>tgN[p[T:Crc4|sEJYW=`td1ot#VhXe@`bjW!8@q2.3k' );
define( 'NONCE_SALT',       '?y@Is%(5LP}4Q%Zt)X3 ^@QhMW-GHdxzRp<oR1N)woiMd@+qUkev/{LtsJW~O!pX' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */

define( 'WP_ENVIRONMENT_TYPE', 'local' );


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
