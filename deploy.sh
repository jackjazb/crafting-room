#!/bin/bash
cd ~/crafting-room
git pull
DOCKER_BUILDKIT=0 docker compose up -d --build