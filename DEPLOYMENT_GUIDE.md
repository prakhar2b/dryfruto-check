# DryFruto Deployment Guide for Hostinger VPS

## Prerequisites
- Hostinger VPS (Ubuntu 22.04 recommended, minimum 2GB RAM)
- Domain name pointed to your VPS IP
- SSH access to your VPS

---

## Step 1: Initial VPS Setup

### Connect via SSH
```bash
ssh root@your-vps-ip
```

### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### Install Required Packages
```bash
sudo apt install python3 python3-pip python3-venv nodejs npm nginx git curl -y
```

---

## Step 2: Install MongoDB

```bash
# Import MongoDB GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt update
sudo apt install mongodb-org -y

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### Create Database and User
```bash
mongosh

# In MongoDB shell:
use dryfruto
db.createUser({
  user: "dryfruto_user",
  pwd: "your_secure_password",
  roles: ["readWrite"]
})
exit
```

---

## Step 3: Upload Application Files

### Create Application Directory
```bash
sudo mkdir -p /var/www/dryfruto
cd /var/www/dryfruto
```

### Option A: Clone from Git (if you have a repository)
```bash
git clone your-repo-url .
```

### Option B: Upload via SFTP
Use FileZilla or similar to upload:
- `/app/backend/` -> `/var/www/dryfruto/backend/`
- `/app/frontend/build/` -> `/var/www/dryfruto/frontend/`

---

## Step 4: Setup Backend (FastAPI)

### Create Virtual Environment
```bash
cd /var/www/dryfruto/backend
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Create Environment File
```bash
nano .env
```

Add the following content:
```env
MONGO_URL=mongodb://dryfruto_user:your_secure_password@localhost:27017/dryfruto?authSource=dryfruto
DB_NAME=dryfruto
```

### Test Backend
```bash
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
# Press Ctrl+C to stop after testing
```

### Create Systemd Service
```bash
sudo nano /etc/systemd/system/dryfruto-backend.service
```

Add:
```ini
[Unit]
Description=DryFruto FastAPI Backend
After=network.target mongod.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/dryfruto/backend
Environment="PATH=/var/www/dryfruto/backend/venv/bin"
ExecStart=/var/www/dryfruto/backend/venv/bin/gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:8001
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Install Gunicorn and Start Service
```bash
source venv/bin/activate
pip install gunicorn

# Fix permissions
sudo chown -R www-data:www-data /var/www/dryfruto

# Start service
sudo systemctl daemon-reload
sudo systemctl start dryfruto-backend
sudo systemctl enable dryfruto-backend
sudo systemctl status dryfruto-backend
```

---

## Step 5: Setup Frontend (React)

### Copy Build Files
```bash
sudo mkdir -p /var/www/dryfruto/frontend
# If you built locally, upload the build folder contents here
# Or build on server:
cd /var/www/dryfruto/frontend-source
npm install
npm run build
sudo cp -r build/* /var/www/dryfruto/frontend/
```

### Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/dryfruto/frontend
```

---

## Step 6: Configure Nginx

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/dryfruto
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (React)
    root /var/www/dryfruto/frontend;
    index index.html;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/dryfruto /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

---

## Step 7: Setup SSL (HTTPS)

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts to complete SSL setup.

### Auto-Renewal (already configured by Certbot)
```bash
sudo certbot renew --dry-run  # Test renewal
```

---

## Step 8: Configure Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Step 9: Seed Initial Data

Visit your website and go to `/admin`, then click "Seed Initial Data" button.

Or via command line:
```bash
curl -X POST https://yourdomain.com/api/seed-data
```

---

## Step 10: Update Frontend Environment

Before building frontend, update the `.env` file:
```bash
# In /var/www/dryfruto/frontend-source/.env
REACT_APP_BACKEND_URL=https://yourdomain.com
```

Then rebuild:
```bash
npm run build
sudo cp -r build/* /var/www/dryfruto/frontend/
```

---

## Useful Commands

### Check Service Status
```bash
sudo systemctl status dryfruto-backend
sudo systemctl status nginx
sudo systemctl status mongod
```

### View Logs
```bash
# Backend logs
sudo journalctl -u dryfruto-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Restart Services
```bash
sudo systemctl restart dryfruto-backend
sudo systemctl restart nginx
sudo systemctl restart mongod
```

### Update Application
```bash
cd /var/www/dryfruto
git pull  # If using Git

# Restart backend
sudo systemctl restart dryfruto-backend

# Rebuild frontend (if changed)
cd frontend-source
npm run build
sudo cp -r build/* /var/www/dryfruto/frontend/
```

---

## Troubleshooting

### Backend not starting
```bash
# Check logs
sudo journalctl -u dryfruto-backend -n 50

# Check if port is in use
sudo lsof -i :8001

# Test manually
cd /var/www/dryfruto/backend
source venv/bin/activate
python -c "from server import app; print('OK')"
```

### MongoDB connection issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Test connection
mongosh "mongodb://dryfruto_user:your_password@localhost:27017/dryfruto?authSource=dryfruto"
```

### Nginx 502 Bad Gateway
```bash
# Check if backend is running
curl http://127.0.0.1:8001/api/

# Check backend service
sudo systemctl status dryfruto-backend
```

### Permission Issues
```bash
sudo chown -R www-data:www-data /var/www/dryfruto
sudo chmod -R 755 /var/www/dryfruto
```

---

## File Structure on Server

```
/var/www/dryfruto/
├── backend/
│   ├── venv/
│   ├── server.py
│   ├── seed_data.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── index.html
    ├── static/
    │   ├── js/
    │   └── css/
    └── ...
```

---

## Security Recommendations

1. **Change default MongoDB port** (optional)
2. **Use strong passwords** for MongoDB
3. **Enable MongoDB authentication**
4. **Regular backups**: 
   ```bash
   mongodump --db dryfruto --out /backup/$(date +%Y%m%d)
   ```
5. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
6. **Monitor server resources**:
   ```bash
   htop
   df -h
   ```

---

## Support

- Hostinger VPS Documentation: https://support.hostinger.com/en/articles/1583227-vps-tutorial
- MongoDB Documentation: https://docs.mongodb.com/
- Nginx Documentation: https://nginx.org/en/docs/
- FastAPI Documentation: https://fastapi.tiangolo.com/
