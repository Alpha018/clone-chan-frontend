pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t alphacode/ucn-chan-backend:latest . '
            }
        }

        stage('Test') {
            steps {
                sh 'docker run --name ucn-chan-backend alphacode/ucn-chan-backend:latest npm run test'
            }
        }

        stage('Deploy') {
            when {
                branch 'dev'
            }
            steps {
                sh 'docker run --name ucn-chan-backend alphacode/ucn-chan-backend:latest'
            }
        }
    }

    post {
        failure {
            echo 'build is broken. notify team!'
        }
    }
}
