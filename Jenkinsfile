def componentArray = [];
def message = "";
pipeline {
	agent any
		
	environment {
		TAG = sh(script: "echo `date +%Y%m%d%H%M`", returnStdout: true).trim()
		Registry = "registry.gitlab.com/rayprosoft/turnkey-gaming-system/"
		GitUrl = "gitlab.com/inwoker/tgs/tgs-web-t4.git"
		Image = "lobby-t4"
		gitlab_user_pwd = credentials('gitlab-user-pwd')
		branch = "develop" 
		DevComponents = "lobby-t4"
		StagingComponents = "lobby-gpi-t4"
		ProdComponents = "lobby-gpi-t4"
	}
	
	stages {		    	
		stage('Prepare Env') {
            steps {
			    sh "sudo docker login registry.gitlab.com -u ${gitlab_user_pwd_USR} -p ${gitlab_user_pwd_PSW}"
			    sh "echo 'Branch: ${env.GIT_BRANCH}'";
                script {
                    switch(env.GIT_BRANCH)
                    {
                        case ['master', 'origin/master']:
                            env.kube_ns = "prod";
							env.k8s_config = 'stag-k8s-config';
							componentArray = "${ProdComponents}".split(",") 	
                            break;
                        case ['release/current', 'origin/release/current']:
                            env.kube_ns = "staging";
							env.k8s_config = 'stag-k8s-config';
							componentArray = "${StagingComponents}".split(",") 
                            break;
                        default:
                            env.kube_ns = "dev";
							env.k8s_config = 'k8s-kube-config' 
							componentArray = "${DevComponents}".split(",")
                            break;
                    }
					TAG = env.kube_ns + '-' + TAG
					message += "\nBranch:${env.GIT_BRANCH}" 
					message += "\nImage:${Image}"
					message += "\nTag:${TAG}"
					message += "\nEnv:$env.kube_ns"
                }

				sh "echo 'env: $env.kube_ns'"
				sh "echo 'tag: ${TAG}'"
            }
        }
		
		stage('Docker Build') {   
			steps {	  			    
				sh "sudo docker build -t ${Registry}${Image}:${TAG} ."
				sh "sudo docker build -t ${Registry}${Image}:$env.kube_ns ."
			}
		}	
		
		stage('Docker Push') {   
			steps {	  
				sh "sudo docker push ${Registry}${Image}:${TAG}"
				sh "sudo docker push ${Registry}${Image}:$env.kube_ns"
			}
		}	
		
		stage('Deployment') {   
			steps {	  
                script {			
					withKubeConfig([credentialsId: env.k8s_config]) {
					    message += "\nComponent:"
						for (i = 0;i < componentArray.length; i++) {
							message += "\n    ${componentArray[i]}"
						    sh "kubectl set image deployment/${componentArray[i]} ${componentArray[i]}=${Registry}${Image}:${TAG} --record -n $env.kube_ns"
						}
					}
				}
			}
		}
		
		stage('Add Tag on Prod') {
            when {
                expression {
                    return env.kube_ns == 'prod';
                }
            }					
            steps {	
				withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'gitssh-user-pwd', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
				    sh "git tag -a ${TAG} -m ${TAG}"
				    sh "git push https://$USERNAME:$PASSWORD@${GitUrl} --tags"
				}
            }
        }
	}
	 post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}

def sendTelegram(message) {
    def encodedMessage = URLEncoder.encode(message, "UTF-8")

    withCredentials([string(credentialsId: "telegramToken", variable: "TOKEN"), string(credentialsId: "telegramChatId", variable: "CHAT_ID")]) {

        response = httpRequest (consoleLogResponseBody: true,
                contentType: 'APPLICATION_JSON',
                httpMode: 'GET',
                url: "https://api.telegram.org/bot${TOKEN}/sendMessage?text=${encodedMessage}&chat_id=${CHAT_ID}",
                validResponseCodes: '200')
        return response
    }
}