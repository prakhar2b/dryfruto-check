# DryFruto - Dry Fruits E-commerce

## Deploy on Hostinger Docker Manager

### Using "Compose from URL":
1. Go to Hostinger Docker Manager
2. Select **"Compose from URL"**
3. Enter URL:
   ```
   https://raw.githubusercontent.com/prakhar2b/dryfruto/main/docker-compose.yml
   ```
4. Click **Deploy**

### Access
http://srv1225994.hstgr.cloud

---

## Local Development

```bash
docker-compose up -d
```

## Manual Database Seed (if needed)
```bash
curl -X POST http://localhost/api/seed-data
```

## Admin Panel
Access at: http://srv1225994.hstgr.cloud/admin
