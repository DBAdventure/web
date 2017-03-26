DEPLOY_TARGET ?= root@msg1.naboo.aksrv.net:/var/www/artemis/

install:
	yarn install

upgrade:
	yarn upgrade

deploy:
	yarn run build
	# rsync -azP dist/ $(DEPLOY_TARGET)

update:
	./node_modules/.bin/ncu -u
