pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'frontend-image'
        BACKEND_IMAGE = 'backend-image'
    }

    stages {
        stage('Build Frontend') {
            steps {
                script {
                    // Build the frontend Docker image
                    echo 'Building Frontend...'
                    sh 'docker build -t $FRONTEND_IMAGE ./frontend'
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Build the backend Docker image
                    echo 'Building Backend...'
                    sh 'docker build --no-cache -t $BACKEND_IMAGE ./backend'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    // Run Docker Compose to deploy
                    echo 'Deploying containers...'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline successfully completed!'
        }
        failure {
            echo 'CI/CD pipeline failed.'
        }
    }
}
