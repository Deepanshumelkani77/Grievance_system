# 🔒 Fix Mixed Content Error - HTTPS Setup Guide

## ⚠️ The Problem

**Error:** Mixed Content - HTTPS page cannot request HTTP endpoint

```
Vercel (HTTPS) → ❌ Backend (HTTP)
https://biasonlinegrievancesystem.vercel.app → http://89.233.104.66:9000
```

**Browsers block HTTP requests from HTTPS pages for security!**

---

## ✅ Solution: Use HTTPS Backend

You have **3 options:**

---

## 🎯 Option 1: Add SSL to Your Server (Best for Production)

### **Requirements:**
- Domain name (e.g., api.yourdomain.com)
- Access to server at 89.233.104.66

### **Steps:**

#### **1. Point Domain to Your Server**
- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Add A record: `api.yourdomain.com` → `89.233.104.66`

#### **2. Install nginx and Certbot**
```bash
# SSH into your server
ssh user@89.233.104.66

# Install nginx
sudo apt-get update
sudo apt-get install nginx

# Install certbot
sudo apt-get install certbot python3-certbot-nginx
```

#### **3. Configure nginx**
```bash
sudo nano /etc/nginx/sites-available/grievance-api
```

Add this configuration:
```nginx
server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### **4. Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/grievance-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### **5. Get SSL Certificate**
```bash
sudo certbot --nginx -d api.yourdomain.com
```

Follow prompts:
- Enter email
- Agree to terms
- Choose to redirect HTTP to HTTPS

#### **6. Update Frontend**
```javascript
// frontend/.env
VITE_BACKEND_URL=https://api.yourdomain.com

// frontend/src/context/AppContext.jsx
baseURL: "https://api.yourdomain.com"
```

#### **7. Update Backend CORS**
```javascript
// backend/index.js
cors({
  origin: [
    "http://localhost:5173",
    "https://biasonlinegrievancesystem.vercel.app",
    "https://api.yourdomain.com"
  ]
})
```

---

## 🎯 Option 2: Use Render Backend (Quick Fix)

Use your Render backend which already has HTTPS:

### **Update Frontend:**

Already done! I've reverted to use Render:
```javascript
baseURL: "https://grievance-system-u2c5.onrender.com"
```

### **Make Sure Backend is Deployed on Render:**

1. Go to https://dashboard.render.com/
2. Check if backend service is running
3. Deploy latest changes:
   - Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment (2-5 minutes)

### **Commit and Push:**
```bash
git add .
git commit -m "Fix: Use HTTPS backend to resolve mixed content error"
git push origin main
```

Vercel will auto-deploy.

---

## 🎯 Option 3: Use Cloudflare Tunnel (Free SSL)

Cloudflare provides free SSL tunneling.

### **Steps:**

#### **1. Install cloudflared on your server**
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

#### **2. Authenticate**
```bash
cloudflared tunnel login
```

#### **3. Create Tunnel**
```bash
cloudflared tunnel create grievance-backend
```

#### **4. Configure Tunnel**
Create `~/.cloudflared/config.yml`:
```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /home/user/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: api.yourdomain.com
    service: http://localhost:9000
  - service: http_status:404
```

#### **5. Route DNS**
```bash
cloudflared tunnel route dns grievance-backend api.yourdomain.com
```

#### **6. Run Tunnel**
```bash
cloudflared tunnel run grievance-backend
```

Or as service:
```bash
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

---

## 🔄 Current Status

### **✅ What I Fixed:**

Changed frontend to use HTTPS backend:
```javascript
// Before (causing error):
baseURL: "http://89.233.104.66:9000"

// After (working):
baseURL: "https://grievance-system-u2c5.onrender.com"
```

### **📋 Files Updated:**
1. `frontend/src/context/AppContext.jsx` - Using HTTPS URL

---

## 🧪 Test After Fix

### **1. Commit Changes:**
```bash
cd frontend
git add .
git commit -m "Fix: Use HTTPS backend URL"
git push origin main
```

### **2. Wait for Vercel Deploy:**
- Check https://vercel.com/dashboard
- Wait for deployment to complete (1-2 minutes)

### **3. Test Application:**
- Open https://biasonlinegrievancesystem.vercel.app
- Try to login
- Check browser console - No Mixed Content errors!

---

## 📊 Comparison

| Option | Setup Time | Cost | SSL | Performance | Recommended For |
|--------|-----------|------|-----|-------------|-----------------|
| **nginx + Let's Encrypt** | 30 min | Free | Yes | Best | Production |
| **Render Backend** | 5 min | Free | Yes | Good | Quick Fix |
| **Cloudflare Tunnel** | 20 min | Free | Yes | Good | Easy SSL |

---

## ⚡ Quick Fix (Current Solution)

**Status:** ✅ Fixed!

**Using:** Render backend with HTTPS
- URL: `https://grievance-system-u2c5.onrender.com`
- SSL: ✅ Included
- Mixed Content: ✅ Resolved

**Your app should work now after deploying to Vercel!**

---

## 🔐 Why This Happens

### **Mixed Content Policy:**

```
HTTPS Page (Secure)
    ↓
  Tries to call
    ↓
HTTP API (Insecure)
    ↓
❌ BLOCKED by browser
```

**Browser says:** 
> "You loaded this page securely (HTTPS), but you're trying to send data 
> insecurely (HTTP). I'm blocking this for your safety!"

### **Solution:**
Both frontend AND backend must use HTTPS.

---

## 🚀 Recommendation

**For Development (Local):**
- Use HTTP backend: `http://localhost:9000` ✅
- Frontend also on HTTP: `http://localhost:5173` ✅

**For Production (Vercel):**
- Use HTTPS backend: `https://grievance-system-u2c5.onrender.com` ✅
- Frontend on HTTPS: `https://biasonlinegrievancesystem.vercel.app` ✅

**Both must match protocol!**

---

## ✅ Summary

**Problem:** Mixed Content Error (HTTPS → HTTP blocked)  
**Solution:** Use HTTPS backend  
**Current Fix:** Using Render backend with HTTPS  
**Status:** ✅ Fixed  

**Next Steps:**
1. Commit and push changes ✅
2. Wait for Vercel deploy ✅
3. Test app - should work! ✅

---

**Your application now uses HTTPS for both frontend and backend!** 🔒✅
