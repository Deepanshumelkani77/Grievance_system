# 📧 Email Troubleshooting Guide - Step by Step

## ⚠️ Current Status: Emails Not Working

This means one of these is missing:
1. Backend code not deployed to Render
2. Gmail App Password not set up
3. Environment variables not configured on Render
4. Gmail is blocking the app

---

## ✅ Step 1: Check if Backend Changes are Deployed

### Did you push the updated `complaintController.js` to Render?

Run these commands in your backend folder:

```bash
cd backend
git status
git add .
git commit -m "Fix: Non-blocking email sending"
git push origin main
```

**Important**: After pushing, Render will automatically redeploy (takes 5-10 minutes).

Check deployment status at: https://dashboard.render.com/

---

## ✅ Step 2: Generate Gmail App Password

### A. Enable 2-Factor Authentication

1. Go to: https://myaccount.google.com/security
2. Under "Signing in to Google", click **2-Step Verification**
3. Click **Get Started** and follow the prompts
4. Verify with your phone number

### B. Generate App Password

1. After 2FA is enabled, go back to: https://myaccount.google.com/security
2. Under "Signing in to Google", click **App passwords**
   - If you don't see this option, make sure 2FA is enabled
3. Click **Select app** → Choose **Mail**
4. Click **Select device** → Choose **Other (Custom name)**
5. Type: `BIAS Grievance System`
6. Click **Generate**
7. **COPY THE 16-CHARACTER PASSWORD** (looks like: `abcd efgh ijkl mnop`)
   - You won't see this again!
   - Save it somewhere safe

---

## ✅ Step 3: Configure Environment Variables on Render

### A. Go to Render Dashboard

1. Visit: https://dashboard.render.com/
2. Click on your backend service (e.g., `grievance-system-backend`)
3. Click **Environment** in the left menu

### B. Add/Update Variables

Add or update these **exact** variables:

```
EMAIL_USER = your_actual_email@gmail.com
EMAIL_PASS = abcdefghijklmnop (remove spaces from app password)
```

**Example**:
```
EMAIL_USER = heymayank69@gmail.com
EMAIL_PASS = abcdefghijklmnop
```

**Important Notes**:
- Remove ALL spaces from the app password
- Use the actual Gmail address you generated the app password for
- Don't use quotes around the values
- Click **Save Changes** when done

### C. Wait for Redeploy

After saving, Render will automatically redeploy your service (5-10 minutes).

Check the **Logs** tab to see if it's running.

---

## ✅ Step 4: Test Email Functionality

### A. Submit a Test Complaint

1. Login as a student/teacher
2. Submit a new complaint
3. Watch for console errors

### B. Check Render Logs

1. Go to your Render dashboard
2. Click your backend service
3. Click **Logs** tab
4. Submit a complaint and watch for:

**Good Signs** ✅:
```
Email sent to admin: admin@example.com
```

**Bad Signs** ❌:
```
Email error: Invalid login
Email error: Username and Password not accepted
Error sending email to admin:
```

### C. Check Email

1. Check the admin's inbox (the one you submitted complaint to)
2. **Also check SPAM folder** (Gmail often puts these there initially)
3. Wait 2-3 minutes (Render free tier can be slow)

---

## 🔧 Common Issues & Fixes

### Issue 1: "Invalid login" or "Username and Password not accepted"

**Cause**: Wrong email or app password

**Fix**:
1. Double-check EMAIL_USER is correct Gmail address
2. Regenerate app password and update on Render
3. Make sure you removed all spaces from app password

### Issue 2: "Auth failed"

**Cause**: App password not generated correctly

**Fix**:
1. Make sure 2FA is enabled first
2. Generate a new app password
3. Update EMAIL_PASS on Render with NO spaces

### Issue 3: No logs about email in Render

**Cause**: Backend changes not deployed

**Fix**:
```bash
cd backend
git add .
git commit -m "Fix email sending"
git push origin main
```

Wait for Render to redeploy (check dashboard).

### Issue 4: Email goes to spam

**Cause**: Gmail sees it as spam

**Fix**:
1. Mark email as "Not Spam" in Gmail
2. Add sender to contacts
3. Future emails will go to inbox

### Issue 5: "Less secure app access"

**Cause**: Using password instead of app password

**Fix**:
- DON'T use your Gmail password
- USE the 16-character app password
- This requires 2FA to be enabled

---

## 🧪 Quick Test Script

Create a simple test to verify email setup:

**File**: `backend/test-email.js`

```javascript
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const testEmail = async () => {
  try {
    console.log("Testing email with:");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "***hidden***" : "NOT SET");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "Test Email - BIAS Grievance System",
      text: "If you receive this, email is working!",
      html: "<b>If you receive this, email is working!</b>",
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Email failed:");
    console.error(error.message);
  }
};

testEmail();
```

**Run locally to test**:
```bash
cd backend
node test-email.js
```

If this works locally but not on Render, the issue is with Render's environment variables.

---

## 📝 Checklist

Before reporting it's not working, verify:

- [ ] 2FA is enabled on Gmail account
- [ ] App password generated (16 characters)
- [ ] App password copied correctly (no spaces)
- [ ] EMAIL_USER set on Render (exact Gmail address)
- [ ] EMAIL_PASS set on Render (app password with no spaces)
- [ ] Backend code changes pushed to Git
- [ ] Render has redeployed successfully (check dashboard)
- [ ] Checked Render logs after submitting complaint
- [ ] Checked spam folder in email
- [ ] Waited at least 2-3 minutes for email

---

## 🔍 Debug Steps

### 1. Check Environment Variables on Render

Go to Render → Your Service → Environment

Verify these are set:
- `EMAIL_USER` (should be your Gmail)
- `EMAIL_PASS` (should be 16-char app password)
- `MONGO_URI` (should be your MongoDB connection)
- `JWT_SECRET` (should be set)

### 2. Check Render Logs

Go to Render → Your Service → Logs

Look for these patterns:

**When submitting complaint**:
```
✅ Good: "Email sent to admin: someone@gmail.com"
❌ Bad: "Email error: Invalid login"
❌ Bad: No email logs at all (backend not updated)
```

### 3. Test Locally First

Before testing on Render, test locally:

1. Update your local `.env` file with:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

2. Run backend locally:
   ```bash
   cd backend
   npm start
   ```

3. Submit a complaint from frontend (pointing to localhost:9000)

4. Check console for email logs

If it works locally but not on Render → Environment variable issue

If it doesn't work locally → Gmail setup issue

---

## 💡 Alternative: Use SendGrid (Free)

If Gmail doesn't work, use SendGrid (simpler, more reliable):

### A. Sign Up
1. Go to: https://signup.sendgrid.com/
2. Sign up (free tier: 100 emails/day)
3. Verify your email

### B. Get API Key
1. Go to Settings → API Keys
2. Create API Key
3. Copy the key

### C. Update Email Service

**File**: `backend/utils/emailService.js`

```javascript
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // This is literal "apikey"
    pass: process.env.SENDGRID_API_KEY, // Your actual API key
  },
});

// Rest of the code stays the same
```

### D. Update Render Environment Variables
```
SENDGRID_API_KEY = your_sendgrid_api_key_here
EMAIL_USER = noreply@yourdomain.com (or any email)
```

SendGrid doesn't require app passwords and is more reliable for production.

---

## 📞 Still Not Working?

If you've completed ALL steps above and it's still not working, share:

1. **Render Logs** (screenshot or copy relevant lines)
2. **Environment Variables** (screenshot - hide the actual values)
3. **Error Messages** (from Render logs when submitting complaint)
4. **Test Results** (did test-email.js work locally?)

This will help diagnose the exact issue.

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Submit complaint → Admin receives email within 2-3 minutes
2. ✅ Admin accepts → User receives email
3. ✅ Admin rejects → User receives email with reason
4. ✅ Admin escalates → Director receives email
5. ✅ Admin resolves → User receives completion email
6. ✅ Render logs show: "Email sent to..." messages

---

**Remember**: The backend code changes I made ensure emails won't block your app anymore. Even if email fails, complaints will still work instantly. Emails send in the background.
