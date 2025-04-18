#!/bin/bash

# USAGE:

# Use this script on the EC2!
# First pull the new image from the ECR
# Then get the IMAGE_ID using `docker images`
# Then `chmod +x docker_reset.sh`
# Then `./docker_reset.sh`

# Network name
NETWORK_NAME="my_custom_network"

# Step 1: Create a new custom network (if it doesn't exist)
if ! docker network ls | grep -q "$NETWORK_NAME"; then
  echo "Creating custom Docker network: $NETWORK_NAME"
  docker network create --driver bridge "$NETWORK_NAME"
else
  echo "Network '$NETWORK_NAME' already exists."
fi

# Step 2: Stop and remove specific containers
CONTAINERS=("appraise" "caddy")

for CONTAINER in "${CONTAINERS[@]}"; do
  if [ "$(docker ps -a -q -f name=^/${CONTAINER}$)" ]; then
    echo "Stopping container: $CONTAINER"
    docker stop "$CONTAINER"

    echo "Removing container: $CONTAINER"
    docker rm "$CONTAINER"
  else
    echo "Container '$CONTAINER' does not exist."
  fi
done

# Step 3: Ask user for appraise image name or ID
read -p "Enter Docker image name or ID for 'appraise': " APPRAISE_IMAGE

# Check if the image exists locally
if docker image inspect "$APPRAISE_IMAGE" > /dev/null 2>&1; then
  echo "Running 'appraise' container..."
  docker run -d \
    --name appraise \
    --network "$NETWORK_NAME" \
    -p 8000:8000 \
    "$APPRAISE_IMAGE"
else
  echo "Image '$APPRAISE_IMAGE' not found locally. Please pull or build it before running this script."
  exit 1
fi

# Step 4: Run 'caddy' container with default image
echo "Running 'caddy' container using default image..."
docker run -d \
  --name caddy \
  --network "$NETWORK_NAME" \
  -p 80:80 \
  -p 443:443 \
  -v $(pwd)/Caddyfile:/etc/caddy/Caddyfile \
  -v caddy_data:/data \
  -v caddy_config:/config \
  caddy:2

# Step 5: Now it's safe to remove ALL images (optional, except the ones in use)
echo "Removing all Docker images not currently used by running containers..."
docker image prune -a -f

# Step 6: Clean up unused volumes and networks
echo "Pruning unused volumes and networks..."
docker volume prune -f
docker network prune -f

echo "All done!"
