docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg BuildEnv=stag_gpi -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t4:staging .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t4:staging
pause