#!/bin/bash
# ──────────────────────────────────────────────
# LG Factory — SSL Setup Script
# Run once after DNS is pointing to your server.
# Usage: ./setup-ssl.sh factory.yourdomain.com
# ──────────────────────────────────────────────

set -euo pipefail

DOMAIN="${1:?Usage: ./setup-ssl.sh YOUR_DOMAIN}"
EMAIL="sergiocoper@gmail.com"

echo "═══════════════════════════════════════"
echo "  LG Factory — SSL Setup"
echo "  Domain: $DOMAIN"
echo "═══════════════════════════════════════"

# Step 1: Create temporary HTTP-only nginx config
echo ""
echo "→ Step 1/4: Creating temporary nginx config..."
cat > nginx.conf << NGINX
server {
    listen 80;
    server_name $DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    client_max_body_size 10M;

    location /api/ {
        proxy_pass http://api:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 600s;
    }

    location / {
        proxy_pass http://api:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
NGINX

# Step 2: Start with SSL compose file
echo "→ Step 2/4: Starting containers..."
cp docker-compose.ssl.yml docker-compose.yml
docker compose up -d --build

echo "  Waiting 5 seconds for containers to start..."
sleep 5

# Step 3: Request certificate
echo "→ Step 3/4: Requesting Let's Encrypt certificate..."
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    -d "$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email

# Step 4: Install full HTTPS nginx config
echo "→ Step 4/4: Enabling HTTPS..."
sed "s/beppo-app.online/$DOMAIN/g" nginx.ssl.conf > nginx.conf
docker compose restart nginx

echo ""
echo "═══════════════════════════════════════"
echo "  ✓ SSL setup complete!"
echo "  https://$DOMAIN"
echo "═══════════════════════════════════════"
echo ""
echo "  Test: curl https://$DOMAIN/api/health"
echo ""
