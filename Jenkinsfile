pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t ucn-chan-frontend:QA . '
            }
        }
        stage('Deploy') {
            when {
                branch 'dev'
            }
            steps {
                sh 'docker ps -q --filter "name=ucn-chan-front" | grep -q . && docker stop ucn-chan-front || echo Not Found'
                sh 'docker run --name ucn-chan-front --rm --net qa-ucn-chan -d -it -p 3000:80 ucn-chan-frontend:QA'
            }
        }
    }

    post {
        failure {
            echo 'build is broken. notify team!'
        }
    }
}
