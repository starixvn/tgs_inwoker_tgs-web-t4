docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg BuildEnv=prod_gpi -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t4:prod .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t4:prod
pause