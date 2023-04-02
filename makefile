all: clean build run

run:
	cd server/wordpress && php -S localhost:8080

build:
	cd client && npm run build
	cp -r client/dist/assets/ server/wordpress/assets
	cp client/dist/index.html server/wordpress/index.php

clean:
	rm -rf client/dist
	rm -rf server/wordpress/assets
	rm -rf server/wordpress/index.php