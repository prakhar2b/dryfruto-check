# DryFruto Docker Configuration Checklist

## ✅ Configuration Verified

### Node Version
- **Dockerfile.frontend**: `node:14-alpine` ✓

### Domain: statellmarketing.com
- **HTTP Server** (Port 9001): `statellmarketing.com`, `www.statellmarketing.com`, `localhost` ✓
- **HTTPS Server** (Port 443): `statellmarketing.com`, `www.statellmarketing.com` ✓

### Ports
| Protocol | External Port | Internal Port | Purpose |
|----------|---------------|---------------|---------|
| HTTP | **9001** | 80 | Main HTTP access |
| HTTPS | **443** | 443 | Secure HTTPS access |

### SSL Configuration
- Certificate: `/etc/letsencrypt/live/statellmarketing.com/fullchain.pem`
- Private Key: `/etc/letsencrypt/live/statellmarketing.com/privkey.pem`
- Protocols: TLSv1.2, TLSv1.3 ✓

### Backend API URL
- Production: `https://statellmarketing.com` ✓

---

## Access URLs After Deployment

| URL | Protocol | Port |
|-----|----------|------|
| http://statellmarketing.com:9001 | HTTP | 9001 |
| https://statellmarketing.com | HTTPS | 443 |
| http://statellmarketing.com:9001/admin | HTTP | 9001 |
| https://statellmarketing.com/admin | HTTPS | 443 |
| http://statellmarketing.com:9001/api/health | HTTP | 9001 |
| https://statellmarketing.com/api/health | HTTPS | 443 |

---

## How HTTP & HTTPS Work Together

```
Internet Request
       │
       ▼
┌──────────────────────────────────────────┐
│              Nginx Proxy                  │
│  ┌─────────────────┐ ┌─────────────────┐ │
│  │   HTTP :9001    │ │   HTTPS :443    │ │
│  │  (Port 80 int)  │ │  (SSL/TLS)      │ │
│  └────────┬────────┘ └────────┬────────┘ │
│           │                   │          │
│           └─────────┬─────────┘          │
│                     ▼                    │
│           ┌─────────────────┐            │
│           │  Route Traffic  │            │
│           └────────┬────────┘            │
└────────────────────┼─────────────────────┘
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│ Frontend  │ │  Backend  │ │  MongoDB  │
│  (React)  │ │ (FastAPI) │ │ (Database)│
│   :80     │ │   :8001   │ │  :27017   │
└───────────┘ └───────────┘ └───────────┘
```

---

## Hostinger DNS Setup Required

Add these DNS records in Hostinger control panel:

| Type | Host | Points To | TTL |
|------|------|-----------|-----|
| A | @ | YOUR_VPS_IP | 14400 |
| A | www | YOUR_VPS_IP | 14400 |

**Note**: Replace `YOUR_VPS_IP` with your actual Hostinger VPS IP address.

---

## Quick Test Commands (After Deployment)

```bash
# Test HTTP on port 9001
curl -I http://statellmarketing.com:9001

# Test HTTPS on port 443
curl -I https://statellmarketing.com

# Test API endpoint (HTTP)
curl http://statellmarketing.com:9001/api/health

# Test API endpoint (HTTPS)
curl https://statellmarketing.com/api/health

# Check SSL certificate
openssl s_client -connect statellmarketing.com:443 -servername statellmarketing.com
```

---

## Deployment Commands

```bash
# Development (HTTP only on port 9001)
./deploy.sh dev

# Production (HTTP:9001 + HTTPS:443)
./deploy.sh prod

# Setup SSL only
./deploy.sh ssl
```
