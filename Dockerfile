FROM nginx:alpine

# Copy static files to the Nginx serving directory
COPY . /usr/share/nginx/html

# The standard Nginx docker image exposes port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
