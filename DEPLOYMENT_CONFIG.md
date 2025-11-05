# 🚀 Deployment Configuration

## Backend & Frontend URLs

### ✅ Current Configuration

**Backend (Deployed on Render):**
```
https://grievance-system-backend.onrender.com
```

**Frontend Configuration:**
- Updated in: `frontend/src/context/AppContext.jsx`
- Lines updated: 9, 43

---

## 📊 URL Configuration Details

### Backend API Base URL
```javascript
// frontend/src/context/AppContext.jsx

// Axios instance
const api = axios.create({
  baseURL: "https://grievance-system-backend.onrender.com"
});

// Context provider
const backendUrl = "https://grievance-system-backend.onrender.com";
```

### API Endpoints
All API calls are now pointing to:
- Auth: `https://grievance-system-backend.onrender.com/api/auth/*`
- Complaints: `https://grievance-system-backend.onrender.com/api/complaints/*`

---

## ✅ Changes Made

### Updated Files:
1. **`frontend/src/context/AppContext.jsx`**
   - Line 9: axios instance baseURL
   - Line 43: backendUrl constant

### Previous URL (Removed):
```
❌ https://grievance-backend-sily.onrender.com
```

### New URL (Active):
```
✅ https://grievance-system-backend.onrender.com
```

---

## 🔧 Next Steps

### 1. Verify Backend is Running
Test your backend URL:
```bash
curl https://grievance-system-backend.onrender.com
```

**Expected Response:**
```
College Grievance Management System API
```

### 2. Test API Endpoints

**Test Health:**
```bash
curl https://grievance-system-backend.onrender.com/api/auth/login
```

### 3. Rebuild Frontend
If using Vite:
```bash
cd frontend
npm run build
```

### 4. Deploy Frontend
Deploy your updated frontend to your hosting platform (Netlify, Vercel, etc.)

---

## 🌐 Environment Variables Required on Backend (Render)

Make sure these are set on your Render backend service:

```env
# Database
MONGO_URI=mongodb+srv://...

# Authentication
JWT_SECRET=your_secret_key_here

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_USER=your-verified-sender@example.com

# Server (auto-set by Render)
PORT=10000
```

---

## 🔍 Testing Checklist

After deploying frontend with new backend URL:

- [ ] Frontend loads without errors
- [ ] Can view login page
- [ ] Can signup (student/teacher/worker)
- [ ] Can login with credentials
- [ ] Can submit complaint
- [ ] Can view complaints
- [ ] Email notifications work
- [ ] All dashboards load properly

---

## 🐛 Troubleshooting

### Issue: "Network Error" or "Failed to fetch"

**Check:**
1. Backend is running on Render
   - Visit: https://grievance-system-backend.onrender.com
   - Should see: "College Grievance Management System API"

2. CORS is enabled in backend
   - Already configured in your `index.js`

3. Frontend URL is correct
   - Check `AppContext.jsx` lines 9 and 43

### Issue: "401 Unauthorized"

**Check:**
1. JWT_SECRET is set on Render
2. Token is being sent in headers
3. Token hasn't expired (7-day expiry)

### Issue: Emails not sending

**Check:**
1. SENDGRID_API_KEY is set on Render
2. Sender email is verified in SendGrid
3. Check Render logs for email errors

---

## 📱 Frontend Deployment Options

### Option 1: Netlify
```bash
cd frontend
npm run build
# Drag & drop 'dist' folder to Netlify
```

### Option 2: Vercel
```bash
cd frontend
npm run build
vercel --prod
```

### Option 3: Render Static Site
```bash
# Connect GitHub repo
# Build command: npm run build
# Publish directory: dist
```

---

## 🔗 Quick Links

**Backend:**
- URL: https://grievance-system-backend.onrender.com
- Dashboard: https://dashboard.render.com/

**Frontend (to be deployed):**
- Build command: `npm run build`
- Output directory: `dist`

**Database:**
- MongoDB Atlas: https://cloud.mongodb.com/

**Email:**
- SendGrid Dashboard: https://app.sendgrid.com/

---

## 📝 Configuration Summary

| Component | Value | Status |
|-----------|-------|--------|
| Backend URL | https://grievance-system-backend.onrender.com | ✅ Updated |
| Frontend Config | AppContext.jsx | ✅ Updated |
| Old URL | grievance-backend-sily.onrender.com | ❌ Removed |
| CORS | Enabled | ✅ Working |
| Email Service | SendGrid | ✅ Configured |

---

## ✅ Deployment Status

- [x] Backend deployed on Render
- [x] Frontend updated with new backend URL
- [ ] Frontend deployed (pending)
- [ ] End-to-end testing (pending)

---

**Last Updated:** November 5, 2025  
**Backend Platform:** Render  
**Frontend Framework:** React + Vite  
**Database:** MongoDB Atlas  
**Email Provider:** SendGrid
