pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t ucn-chan-frontend:Prod . '
            }
        }
        stage('Deploy') {
            when {
                branch 'dev'
            }
            steps {
                sh 'docker ps -q --filter "name=ucn-chan-front-prod" | grep -q . && docker stop ucn-chan-front-prod || echo Not Found'
                sh 'docker run --name ucn-chan-front-prod --rm --net ucn-chan-prod -d -it -p 3000:80 ucn-chan-frontend:Prod'
            }
        }
    }

    post {
        failure {
            echo 'build is broken. notify team!'
        }
    }
}
