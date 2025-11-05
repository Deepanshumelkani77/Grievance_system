# 📧 SendGrid Email Setup Guide for Render

## ✅ Why SendGrid Instead of Gmail?

**Gmail SMTP is BLOCKED on Render free tier** (ports 25, 465, 587 are restricted).  
**SendGrid works perfectly** and provides 100 free emails/day.

---

## 🚀 Step-by-Step Setup

### 1️⃣ Create SendGrid Account

1. Go to: https://signup.sendgrid.com/
2. Sign up (free account - 100 emails/day)
3. Verify your email address

### 2️⃣ Verify Sender Email (REQUIRED!)

⚠️ **SendGrid will NOT send emails from unverified addresses!**

1. Login to SendGrid dashboard
2. Navigate to: **Settings > Sender Authentication**
3. Click: **Verify a Single Sender**
4. Fill in your details:
   - From Name: `BIAS Grievance System`
   - From Email: Your email (e.g., `your.email@gmail.com`)
   - Reply To: Same as above
   - Company: Your college name
   - Address: Any address
5. Click **Create**
6. Check your email and click verification link
7. ✅ Your sender is now verified!

### 3️⃣ Create API Key

1. Go to: **Settings > API Keys**
2. Click: **Create API Key**
3. Name: `Render Backend Email`
4. Permissions: Select **Restricted Access**
   - Expand **Mail Send**
   - Toggle **Mail Send** to **Full Access**
5. Click: **Create & View**
6. **COPY THE KEY NOW** (you won't see it again!)
   - Format: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 4️⃣ Configure Local Development (.env)

Add to your `backend/.env` file:

```env
# SendGrid Configuration (for Render)
SENDGRID_API_KEY=SG.your_actual_api_key_here
EMAIL_USER=your-verified-sender@example.com

# Gmail Fallback (optional, for local dev only)
EMAIL_PASS=your_gmail_app_password_here
```

**Replace:**
- `SG.your_actual_api_key_here` → Your actual SendGrid API key
- `your-verified-sender@example.com` → The email you verified in Step 2

### 5️⃣ Test Locally

Run the SendGrid test script:

```bash
node test-sendgrid.js
```

✅ If successful, you'll see:
```
✅ SUCCESS! SendGrid email sent successfully!
```

❌ If it fails, check:
- API key is correct
- Sender email is verified in SendGrid
- No typos in .env file

### 6️⃣ Deploy to Render

1. Push your code to GitHub (if not already)
2. Go to Render dashboard: https://dashboard.render.com/
3. Select your backend service
4. Click **Environment** tab
5. Add these environment variables:

```
SENDGRID_API_KEY = SG.your_actual_api_key_here
EMAIL_USER = your-verified-sender@example.com
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
```

6. Click **Save Changes**
7. Render will automatically redeploy

### 7️⃣ Test on Render

After deployment:
1. Submit a complaint from your frontend
2. Check server logs on Render for:
   ```
   Email sent to admin: admin@example.com
   ```
3. Check recipient's inbox (and spam folder)

---

## 📋 Environment Variables Checklist

**Required on Render:**
- ✅ `SENDGRID_API_KEY` - Your SendGrid API key
- ✅ `EMAIL_USER` - Verified sender email
- ✅ `MONGO_URI` - MongoDB connection string
- ✅ `JWT_SECRET` - Secret key for JWT tokens

**Optional (auto-set by Render):**
- `PORT` - Render sets this automatically

---

## 🔍 Troubleshooting

### ❌ "Authentication failed"
- **Cause:** Wrong API key
- **Solution:** Regenerate API key in SendGrid, update in Render

### ❌ "Sender email not verified"
- **Cause:** EMAIL_USER not verified in SendGrid
- **Solution:** Verify sender in SendGrid dashboard

### ❌ "550 Unauthenticated senders not allowed"
- **Cause:** Using unverified email
- **Solution:** Complete Step 2 (Verify Sender Email)

### ❌ Emails not received
- **Check:** Spam/Junk folder
- **Check:** Render logs for errors
- **Check:** SendGrid Activity dashboard

---

## 📊 SendGrid Dashboard

Monitor your emails:
1. Go to: **Activity**
2. See all sent emails
3. Check delivery status
4. View bounce/spam reports

---

## 🎯 Current Configuration Status

### ✅ CORRECT: emailService.js
Your `emailService.js` is perfectly configured:
- Uses SendGrid for production (Render)
- Falls back to Gmail for local development
- All email functions implemented

### Configuration Code (Already in your emailService.js):
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // This is literal "apikey"
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

---

## 📧 Email Features in Your App

Your system sends emails for:
1. ✅ New complaint notifications (to HOD/Warden/Registrar)
2. ✅ Complaint accepted (to student/user)
3. ✅ Complaint rejected (to student/user)
4. ✅ Complaint completed (to student/user)
5. ✅ Complaint escalated (to Director)

---

## 💡 Best Practices

1. **Keep API keys secret** - Never commit to Git
2. **Use environment variables** - Different keys for dev/prod
3. **Monitor SendGrid quota** - Free tier = 100 emails/day
4. **Verify all sender emails** - SendGrid requires this
5. **Check Activity logs** - Monitor delivery issues

---

## 🔗 Useful Links

- SendGrid Dashboard: https://app.sendgrid.com/
- API Keys: https://app.sendgrid.com/settings/api_keys
- Sender Auth: https://app.sendgrid.com/settings/sender_auth/senders
- Activity Logs: https://app.sendgrid.com/email_activity
- Documentation: https://docs.sendgrid.com/

---

## ✅ Final Checklist

Before deploying to Render, ensure:
- [ ] SendGrid account created
- [ ] Sender email verified
- [ ] API key created with Mail Send permission
- [ ] Tested locally with `test-sendgrid.js`
- [ ] Environment variables set on Render
- [ ] Code pushed to GitHub
- [ ] Service redeployed on Render
- [ ] Test complaint submitted and email received

---

## 🎉 You're All Set!

Your backend is correctly configured for SendGrid on Render.  
No more "SMTP blocked" errors!

**Questions?** Check SendGrid documentation or Render logs for debugging.
