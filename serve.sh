#!/bin/bash

PORT=3092
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Kawai Dev Preview"
echo "Local preview: http://localhost:$PORT"

cd "$DIR"
python3 -m http.server "$PORT"
