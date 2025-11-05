# 📧 SendGrid Setup for Render (FREE & WORKS!)

## ⚠️ Why SendGrid?

**Render's free tier blocks Gmail SMTP** (all ports: 587, 465, 25).  
SendGrid works because it uses SMTP on Render's allowed network.

**Benefits**:
- ✅ Works on Render free tier
- ✅ Free 100 emails/day (plenty for your app)
- ✅ More reliable than Gmail
- ✅ No app passwords needed
- ✅ Better deliverability

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create SendGrid Account

1. Go to: https://signup.sendgrid.com/
2. Fill in:
   - Email: your_email@gmail.com
   - Password: (create one)
   - Click "Create Account"
3. **Verify your email** (check inbox)
4. Complete the "Tell us about yourself" form:
   - Role: Developer
   - Company: BIAS
   - Use case: Transactional Emails
   - Number of emails: 0-100/day

### Step 2: Get API Key

1. Login to SendGrid dashboard
2. Go to: https://app.sendgrid.com/settings/api_keys
3. Click **"Create API Key"** (blue button)
4. Settings:
   - Name: `BIAS Grievance System`
   - Permissions: **Full Access** (or Restricted → Mail Send only)
5. Click **"Create & View"**
6. **COPY THE API KEY NOW** (you won't see it again!)
   - Looks like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Save it somewhere safe

### Step 3: Configure Render

1. Go to: https://dashboard.render.com/
2. Click your backend service
3. Click **"Environment"** tab
4. Add these variables:

```
SENDGRID_API_KEY = SG.your_api_key_here
EMAIL_USER = your_email@gmail.com
```

**Important**:
- Use the FULL API key (starts with `SG.`)
- EMAIL_USER is just for the FROM address
- Click **"Save Changes"**

5. Wait for Render to redeploy (5-10 minutes)

### Step 4: Deploy Backend Changes

```bash
cd backend
git add .
git commit -m "Switch to SendGrid for email (Render compatibility)"
git push origin main
```

Wait for deployment to finish.

### Step 5: Test It!

1. Submit a complaint
2. Check Render logs: https://dashboard.render.com/ → Your Service → Logs
3. Look for:
   ```
   ✅ Email sent to admin: admin@example.com
   ```
4. Check email inbox (also spam folder)

---

## 📝 What Changed

### Before (Gmail - Didn't Work on Render):
```javascript
service: "gmail"  // ❌ Blocked by Render
```

### After (SendGrid - Works on Render):
```javascript
host: "smtp.sendgrid.net",
port: 587,
auth: {
  user: "apikey",  // Literal word "apikey"
  pass: process.env.SENDGRID_API_KEY
}
```

---

## ✅ Verification Checklist

Before testing, make sure:

- [ ] SendGrid account created and verified
- [ ] API key copied (starts with `SG.`)
- [ ] `SENDGRID_API_KEY` set on Render
- [ ] `EMAIL_USER` set on Render (your email)
- [ ] Backend changes pushed to Git
- [ ] Render finished redeploying (check dashboard)

---

## 🧪 Testing

### Test 1: Check Environment Variables

Go to Render → Your Service → Environment

Should see:
```
SENDGRID_API_KEY = SG.xxxx...
EMAIL_USER = your@email.com
MONGO_URI = mongodb+srv://...
JWT_SECRET = ...
```

### Test 2: Check Render Logs

After submitting a complaint:

**Good** ✅:
```
Email sent to admin: admin@example.com
```

**Bad** ❌:
```
Error sending email to admin: ...
```

If error, check:
1. Is SENDGRID_API_KEY correct?
2. Did you use the full key (starts with `SG.`)?
3. Is the API key active (check SendGrid dashboard)?

### Test 3: Submit Complaint

1. Login as student
2. Submit complaint
3. Should work instantly (no timeout)
4. Admin should receive email within 1-2 minutes
5. Check spam folder if not in inbox

---

## 🔧 Troubleshooting

### Issue: "Error sending email"

**Cause**: Wrong API key

**Fix**:
1. Go to SendGrid → Settings → API Keys
2. Create a new one
3. Update `SENDGRID_API_KEY` on Render
4. Make sure you copied the FULL key

### Issue: "Unauthorized"

**Cause**: API key not active or wrong format

**Fix**:
1. Check SendGrid dashboard - is key active?
2. Make sure key starts with `SG.`
3. No extra spaces before/after key
4. Regenerate if needed

### Issue: Email in spam

**Cause**: SendGrid domain not verified yet (new accounts)

**Fix**:
1. Mark as "Not Spam" in Gmail
2. Add sender to contacts
3. Future emails will go to inbox
4. (Optional) Verify domain in SendGrid for better deliverability

### Issue: Still using Gmail

**Cause**: Backend changes not deployed

**Fix**:
```bash
git status  # Check if changes are committed
git add .
git commit -m "Switch to SendGrid"
git push origin main
```

---

## 📊 SendGrid Dashboard

### Check Email Activity:

1. Go to: https://app.sendgrid.com/
2. Click **"Activity"** in left menu
3. You'll see:
   - ✅ Delivered emails
   - 📬 Email status
   - 🚫 Bounces/spam

### Monitor Usage:

1. Go to: https://app.sendgrid.com/stats
2. See how many emails sent
3. Free tier: 100/day

---

## 🎁 SendGrid Benefits

### Better Than Gmail:
- ✅ Works on Render free tier
- ✅ No 2FA or app passwords needed
- ✅ Better deliverability
- ✅ Email tracking & analytics
- ✅ Professional sender reputation
- ✅ Scalable (can upgrade later)

### Stats You Get:
- Open rates
- Click rates  
- Bounce rates
- Spam reports
- Delivery status

---

## 💡 Pro Tips

### 1. Verify Sender Domain (Optional)

For better deliverability:
1. Go to SendGrid → Settings → Sender Authentication
2. Authenticate your domain
3. Emails will be from `@yourdomain.com` instead of SendGrid

### 2. Email Templates (Optional)

Create beautiful email templates:
1. Go to SendGrid → Email API → Dynamic Templates
2. Design templates with drag-and-drop
3. Use in your code

### 3. Monitor Emails

Check SendGrid dashboard regularly:
- See if emails are being delivered
- Check for bounces
- Monitor spam reports

---

## 📞 Support

### SendGrid Issues:
- Docs: https://docs.sendgrid.com/
- Support: https://support.sendgrid.com/

### Still Not Working?

Share these with me:
1. Render logs (screenshot)
2. SendGrid API key status (screenshot - hide key)
3. Environment variables (screenshot - hide values)

---

## ✅ Success Looks Like

After setup:

1. ✅ Submit complaint → Works instantly
2. ✅ Render logs show: "Email sent to admin: ..."
3. ✅ Admin receives email within 1-2 minutes
4. ✅ No more connection timeout errors
5. ✅ SendGrid dashboard shows delivered email

---

**Your app will finally have working emails!** 🎉

The code already supports SendGrid - you just need to:
1. Get API key from SendGrid
2. Add to Render environment variables
3. Push changes to Git

That's it!
