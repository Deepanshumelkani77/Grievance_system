# 📧 Email Configuration for Render Deployment

## Problem
After deploying to Render, emails are not being sent because Gmail blocks "less secure apps" and environment variables may not be configured properly.

## ✅ Solution: Use Gmail App Password

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", enable **2-Step Verification**
4. Follow the prompts to set it up

### Step 2: Generate App Password
1. After enabling 2FA, go back to **Security**
2. Under "Signing in to Google", click on **App passwords**
3. Select:
   - **App**: Mail
   - **Device**: Other (Custom name) → Type "BIAS Grievance System"
4. Click **Generate**
5. **Copy the 16-character password** (it looks like: `xxxx xxxx xxxx xxxx`)

### Step 3: Configure Environment Variables on Render

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your backend service
3. Go to **Environment** tab
4. Add/Update these variables:

```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx (the app password from Step 2, include spaces or remove them)
```

5. Click **Save Changes**
6. Your service will automatically redeploy

## 🔧 Backend Changes Already Applied

The backend has been updated to send emails **asynchronously** (non-blocking):
- ✅ Responses are sent immediately
- ✅ Emails are sent in the background
- ✅ No more timeout issues
- ✅ If email fails, it logs error but doesn't break the app

## 🎯 How It Works Now

### Before (Blocking):
```
Submit Complaint → Wait for email → Send response (SLOW, causes timeout)
```

### After (Non-Blocking):
```
Submit Complaint → Send response immediately ⚡
                 → Send email in background 📧
```

## 📝 Functions Updated

All these functions now send emails asynchronously:
1. `submitComplaint` - New complaint notification to admin
2. `acceptComplaint` - Acceptance email to user
3. `rejectComplaint` - Rejection email to user
4. `resolveComplaint` - Completion email to user
5. `escalateComplaint` - Escalation email to director

## 🧪 Testing Email Setup

After configuring on Render:

1. Submit a new complaint
2. Check Render logs: `https://dashboard.render.com/` → Your service → **Logs**
3. Look for:
   - ✅ `Email sent to admin: admin@example.com`
   - ❌ `Email error:` (if there's an issue)

## ⚠️ Important Notes

### If Emails Still Don't Work:

1. **Check Render Logs** for email errors
2. **Verify EMAIL_USER and EMAIL_PASS** are set correctly
3. **Try removing spaces** from app password: `xxxxxxxxxxxxxxxx`
4. **Ensure Gmail account** isn't blocking the login attempt
5. **Check spam folder** - emails might be filtered

### Alternative: Use a Dedicated Email Service

For production, consider using:
- **SendGrid** (12,000 free emails/month)
- **Mailgun** (5,000 free emails/month)
- **AWS SES** (62,000 free emails/month)

Update `backend/utils/emailService.js` transporter config:

```javascript
// Example for SendGrid
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

## 🚀 Quick Fix Checklist

- [x] Backend updated to send emails asynchronously
- [x] Frontend timeout increased to 30 seconds
- [x] Better error handling added
- [ ] Gmail App Password generated
- [ ] Environment variables set on Render
- [ ] Test email functionality

## 📊 Expected Behavior

### Working Correctly:
- ✅ Complaints submit instantly
- ✅ Admin actions (accept/reject/escalate) work immediately
- ✅ Emails arrive within 1-2 minutes (may be delayed on Render free tier)
- ✅ No need to refresh page

### If Still Not Working:
- Check Render logs for errors
- Verify environment variables
- Ensure Gmail App Password is correct
- Consider using dedicated email service

## 💡 Pro Tips

1. **Monitor Logs**: Always check Render logs when testing
2. **Email Delays**: Render's free tier can have cold starts, emails may be delayed
3. **Upgrade Plan**: Consider upgrading Render plan for better performance
4. **Backup**: Keep email credentials in a secure password manager

---

**Last Updated**: After fixing non-blocking email issue
**Status**: ✅ Backend optimized, Frontend timeout increased, Ready for email configuration
