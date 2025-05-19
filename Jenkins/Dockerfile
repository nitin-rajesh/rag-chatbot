FROM jenkins/jenkins:lts
USER root

# Install Docker
RUN apt update
RUN apt install -y docker.io

# Install Node.js and NPM
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - 
RUN apt-get install -y nodejs

VOLUME /var/jenkins

EXPOSE 3000 8080
