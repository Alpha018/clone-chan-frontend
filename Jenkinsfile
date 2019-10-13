pipeline {
    agent any
    stages {
        stage('Build-QA') {
            when {
                branch 'staging'
            }
            steps {
                sh 'docker build -t ucn-chan-frontend:Prod . '
            }
        }
        stage('Build-Prod') {
            when {
                branch 'master'
            }
            steps {
                sh 'docker build -t ucn-chan-frontend:Prod . '
            }
        }

        stage('Deploy-QA') {
            when {
                branch 'staging'
            }
            steps {
                sh 'docker ps -q --filter "name=ucn-chan-front-prod" | grep -q . && docker stop ucn-chan-front-prod || echo Not Found'
                sh 'docker run --name ucn-chan-front-prod --rm --net ucn-chan-prod -d -it -p 3000:80 ucn-chan-frontend:Prod'
            }
        }
        stage('Deploy-Prod') {
            when {
                branch 'master'
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
