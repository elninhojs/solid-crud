#!/bin/bash
echo "⌛ Generating config file"
[ $1 ] && PORT=$1 || PORT=1234
echo -e "//autocreated via scripts/make-config.js\nexport const API_HOST = 'http://localhost:$PORT'" > src/config.ts
echo -e "🙌 Done! src/config.ts created.\n"

