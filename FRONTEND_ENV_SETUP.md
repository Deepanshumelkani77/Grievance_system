# ✅ Frontend Environment Configuration

## 🎯 What Was Done

Added environment variable support to your frontend to configure the backend URL.

---

## 📁 Files Created/Modified

### **1. Created: `frontend/.env`**
```env
VITE_BACKEND_URL=http://89.233.104.66:9000
```
- **Purpose:** Store your backend URL
- **Note:** This file is NOT committed to git (private)

### **2. Created: `frontend/.env.example`**
```env
VITE_BACKEND_URL=http://localhost:9000
```
- **Purpose:** Template showing what env variables are needed
- **Note:** This file IS committed to git (public)

### **3. Updated: `frontend/src/context/AppContext.jsx`**
```javascript
// Before:
baseURL: "https://grievance-system-u2c5.onrender.com"

// After:
baseURL: import.meta.env.VITE_BACKEND_URL || "https://grievance-system-u2c5.onrender.com"
```
- Now reads from environment variable
- Fallback to Render URL if env variable not set

### **4. Updated: `frontend/.gitignore`**
```
# Environment variables
.env
.env.local
.env.production
```
- Prevents committing sensitive environment files

---

## 🔧 How It Works

### **Development (Local):**
```
Frontend reads: .env file
Backend URL: http://89.233.104.66:9000
```

### **Production (Vercel):**
```
Frontend reads: Vercel environment variables
Backend URL: Set in Vercel dashboard
```

---

## 🚀 Usage

### **1. Restart Development Server**

After creating/modifying `.env`, you MUST restart the dev server:

```bash
cd frontend

# Stop current server (Ctrl+C)

# Restart
npm run dev
```

### **2. Verify It's Working**

Open browser console and check network requests:
- Should see requests going to: `http://89.233.104.66:9000`
- Not to the old Render URL

---

## 🌐 Backend URL Explained

### **Your Backend URL:**
```
http://89.233.104.66:9000
```

**Parts:**
- `http://` - Protocol (not HTTPS)
- `89.233.104.66` - IP address of your backend server
- `9000` - Port number

**Important:** 
- Your backend server must be running on this IP and port
- No trailing slash `/` at the end

---

## 🔐 Security Notes

### **✅ Safe (Not Committed):**
- `.env` - Your actual backend URL
- `.env.local` - Local overrides
- `.env.production` - Production settings

### **✅ Safe (Committed):**
- `.env.example` - Template with dummy values
- Shows what variables are needed

### **⚠️ Important:**
- Never commit actual `.env` files to git
- Always use `.env.example` for sharing structure

---

## 📊 Different Environments

### **Local Development:**
```bash
# frontend/.env
VITE_BACKEND_URL=http://89.233.104.66:9000
```

### **Production (Vercel):**
Go to Vercel Dashboard:
1. Select your project
2. Settings → Environment Variables
3. Add: `VITE_BACKEND_URL` = `http://89.233.104.66:9000`
4. Redeploy

---

## 🧪 Testing

### **Test 1: Check Environment Variable**
```javascript
// Add this temporarily in AppContext.jsx
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
```

Should log: `http://89.233.104.66:9000`

### **Test 2: Network Requests**
1. Open browser DevTools
2. Go to Network tab
3. Login/perform any action
4. Check request URLs - should use your IP

### **Test 3: API Health Check**
Open in browser:
```
http://89.233.104.66:9000/
```
Should show: "College Grievance Management System API"

---

## 🔄 Changing Backend URL

### **Method 1: Edit .env File**
```bash
# frontend/.env
VITE_BACKEND_URL=http://new-ip:9000
```

Then restart dev server.

### **Method 2: Command Line (Temporary)**
```bash
VITE_BACKEND_URL=http://another-ip:9000 npm run dev
```

---

## 🚨 Troubleshooting

### **Issue 1: Still Using Old URL**
**Solution:** Restart dev server
```bash
Ctrl+C  # Stop
npm run dev  # Start
```

### **Issue 2: CORS Errors**
**Solution:** Update backend CORS settings to allow your IP
```javascript
// backend/index.js
cors({
  origin: [
    "http://localhost:5173",
    "http://89.233.104.66:5173",  // Add your IP
    // ... other origins
  ]
})
```

### **Issue 3: Env Variable Not Loading**
**Check:**
- File name must be exactly `.env` (with dot)
- Variable must start with `VITE_`
- Dev server was restarted after creating .env

### **Issue 4: Network Error**
**Check:**
- Backend is actually running at `http://89.233.104.66:9000`
- Port 9000 is accessible
- No firewall blocking

---

## 📋 File Structure

```
frontend/
├── .env                    # ← Your backend URL (NOT in git)
├── .env.example            # ← Template (IN git)
├── .gitignore              # ← Updated to ignore .env
├── src/
│   └── context/
│       └── AppContext.jsx  # ← Updated to use env variable
└── ...
```

---

## 🎯 Benefits

✅ **Flexible:** Easy to change backend URL  
✅ **Secure:** .env file not committed to git  
✅ **Multi-environment:** Different URLs for dev/prod  
✅ **Team-friendly:** .env.example shows what's needed  
✅ **Best Practice:** Industry standard approach  

---

## 📝 Quick Reference

### **Vite Environment Variables:**

**Naming:**
- Must start with `VITE_`
- Example: `VITE_BACKEND_URL`, `VITE_API_KEY`

**Usage:**
```javascript
import.meta.env.VITE_BACKEND_URL
```

**Built-in Variables:**
- `import.meta.env.MODE` - 'development' or 'production'
- `import.meta.env.DEV` - boolean
- `import.meta.env.PROD` - boolean

---

## 🚀 Deploy to Vercel

### **Set Environment Variable:**

1. **Vercel Dashboard:**
   - Go to your project
   - Settings → Environment Variables
   - Add variable:
     - Name: `VITE_BACKEND_URL`
     - Value: `http://89.233.104.66:9000`
   - Select: Production, Preview, Development
   - Save

2. **Redeploy:**
   - Deployments tab → Redeploy

3. **Verify:**
   - Check browser console logs
   - Verify network requests use correct URL

---

## ✅ Summary

**Status:** ✅ Complete  
**Backend URL:** `http://89.233.104.66:9000`  
**Environment File:** Created  
**Git Protection:** Enabled  
**Code Updated:** ✅  

**Next Steps:**
1. Restart dev server: `npm run dev`
2. Test login/signup
3. Verify requests go to new backend URL
4. Deploy to Vercel with env variable

---

**Your frontend now uses environment variables for backend configuration!** 🎉✅
