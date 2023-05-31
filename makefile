all: clean build run

run:
	cd server && php -S 10.0.0.110:8080 -t public

build:
	cd client && npm run build
	cp -r client/dist/assets/ server/public/assets
	cp client/dist/index.html server/public/index.php

all_wp: clean build_wp run_wp

run_wp:
	cd server_wp/wordpress && php -S 10.0.0.110:8080

build_wp:
	cd client && npm run build
	cp -r client/dist/assets/ server_wp/wordpress/assets
	cp client/dist/index.html server_wp/wordpress/index.php

clean:
	rm -rf client/dist
	rm -rf server_wp/wordpress/assets
	rm -rf server_wp/wordpress/index.php
	rm -rf server/public/assets
	rm -rf server/public/index.php