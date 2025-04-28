pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'devops-frontend'
        BACKEND_IMAGE = 'devops-backend'
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

        stage('Test Inside Backend Container') {
      steps {
        script {
          // Run the tests inside a disposable container
          sh """
            docker run --rm \
              -v $(pwd)/backend:/app \            # mount code so nodemon/dev files are there if needed
              -w /app \
              $BACKEND_IMAGE \
              npm test
          """
        }
      }
    }

        stage('Deploy Containers') {
            steps {
                script {
                    // Run Docker Compose to deploy
                    echo 'Deploying containers...'
                    sh 'docker-compose up -d --build --remove-orphans'
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
