pipeline {
	agent any
	
	environment {
	    ENV = "dev"
	    TAG = sh(script: "echo dev-`date +%Y%m%d%H%M`", returnStdout: true).trim()
		Registry = "registry.gitlab.com/rayprosoft/turnkey-gaming-system/"
		Component = "lobby-gpi-t4"
		BuildEnv="staging"
		gitlab_user_pwd = credentials('gitlab-user-pwd')
	}
	
	stages {		
		stage('Deployment') {   
			steps {	  
			    sh "sudo docker login registry.gitlab.com -u ${gitlab_user_pwd_USR} -p ${gitlab_user_pwd_PSW}"
				sh "sudo docker build --build-arg BuildEnv=${BuildEnv} -t ${Registry}${Component}:${TAG} ."
				sh "sudo docker build --build-arg BuildEnv=${BuildEnv} -t ${Registry}${Component}:${ENV} ."
				sh "sudo docker push ${Registry}${Component}:${TAG}"
				sh "sudo docker push ${Registry}${Component}:${ENV}"
							
				withKubeConfig([credentialsId: 'k8s-kube-config']) {
					sh "kubectl set image deployment/${Component} ${Component}=${Registry}${Component}:${TAG} --record -n ${ENV}"
				}
			}
		}	
	}
	 post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK!\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
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
