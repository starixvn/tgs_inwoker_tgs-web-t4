docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg BuildEnv=ufa01 -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-ufa01:demo .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-ufa01:demo
pause