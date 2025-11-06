# 📧 SendGrid Email Service Setup Guide

## ✅ What's Already Done

Your project is now configured with **SendGrid** email service!

### Completed Steps:
- ✅ Installed `@sendgrid/mail` package
- ✅ Created `utils/emailService.js` with SendGrid
- ✅ Updated `complaintController.js` with email notifications
- ✅ Created test script `test-sendgrid.js`

---

## 🚀 Quick Start - Follow These Steps

### Step 1: Create SendGrid Account

1. **Go to SendGrid:**
   - Visit: https://signup.sendgrid.com/
   - Create a free account
   - Verify your email address
   - Login to SendGrid Dashboard

**Free Tier:**
- ✅ 100 emails/day forever free
- ✅ Perfect for college projects
- ✅ No credit card required

---

### Step 2: Create API Key

1. **Navigate to API Keys:**
   - Go to: **Settings** → **API Keys**
   - Or direct link: https://app.sendgrid.com/settings/api_keys

2. **Create New API Key:**
   - Click **"Create API Key"**
   - Name: `BIAS Grievance System`
   - Choose: **"Full Access"** (for testing)
   
3. **Copy Your API Key:**
   - It starts with `SG.`
   - Example: `SG.abc123xyz789...`
   - **IMPORTANT:** Copy it now - you won't see it again!

---

### Step 3: Verify Sender Email (CRITICAL!)

SendGrid requires you to verify who you send emails from.

1. **Navigate to Sender Authentication:**
   - Go to: **Settings** → **Sender Authentication**
   - Or direct link: https://app.sendgrid.com/settings/sender_auth

2. **Choose "Verify a Single Sender":**
   - Click **"Create New Sender"** or **"Verify a Single Sender"**

3. **Fill in the Form:**
   ```
   From Name: BIAS Grievance System
   From Email Address: your-email@example.com  ← Use your real email
   Reply To: your-email@example.com
   Company Name: Your College Name
   Address: Your college address
   City: Your city
   Country: India
   ```

4. **Verify Email:**
   - Check your email inbox (the email you entered above)
   - Look for email from SendGrid
   - Subject: "Please Verify Your Single Sender"
   - **Click the verification link**
   - You'll see: ✅ "Email verified successfully!"

**CRITICAL:** The email you verify here MUST match `EMAIL_SENDER` in your `.env` file!

---

### Step 4: Add to .env File

Open your `.env` file and add these lines:

```env
# SendGrid Configuration
SENDGRID_API_KEY=SG.paste_your_api_key_here
EMAIL_SENDER=the-email-you-just-verified@example.com

# Optional: Test email
TEST_EMAIL=your-personal-email@gmail.com
```

**Example:**
```env
SENDGRID_API_KEY=SG.abc123xyz789_your_actual_key
EMAIL_SENDER=biasgrievance@gmail.com
TEST_EMAIL=youremail@gmail.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=9000
```

**IMPORTANT:**
- Replace `SG.abc123xyz789...` with your actual API key
- Replace email with the one you verified in Step 3
- The `EMAIL_SENDER` MUST be verified in SendGrid!

---

### Step 5: Test Email Service

Run the test script:

```bash
cd backend
node test-sendgrid.js
```

**Expected Output:**
```
✅ EMAIL SENT SUCCESSFULLY!
📧 Email Details:
   From: biasgrievance@gmail.com
   To: youremail@gmail.com
✅ SendGrid email service is working perfectly!
```

**Check Your Email:**
- Open your inbox (TEST_EMAIL)
- Look for: "✅ SendGrid Test - BIAS Grievance System"
- From: Your verified sender email
- **Check spam folder** if not in inbox!

---

## 📊 Email Notifications

Your system now sends emails for:

| Action | Recipient | Email Subject |
|--------|-----------|---------------|
| **New Complaint** | HOD/Warden/Registrar | "New Complaint Submitted - [TYPE]" |
| **Accepted** | Student/User | "Your Complaint Has Been Accepted" |
| **Rejected** | Student/User | "Your Complaint Has Been Rejected" |
| **Resolved** | Student/User | "Your Complaint Has Been Resolved" |
| **Escalated** | Director | "⚠️ Escalated Complaint - Requires Attention" |

---

## 🧪 Testing Locally

### 1. Start Backend:
```bash
cd backend
npm run dev
```

### 2. Test Complaint Flow:
- Submit a complaint from frontend
- Watch backend terminal for:
  ```
  📧 Sending email notification to admin...
  ✅ Email sent successfully!
  ```

### 3. Check Emails:
- Check HOD/admin email inbox
- Check student email after accept/reject/resolve

---

## 🚀 Deployment to Render

### Environment Variables to Set:

Go to: **Render Dashboard** → **Your Service** → **Environment**

Add these variables:
```
SENDGRID_API_KEY=SG.your_api_key
EMAIL_SENDER=your-verified-email@example.com
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=9000
```

### Important:
- ✅ Use the same API key from SendGrid
- ✅ Use the same verified sender email
- ✅ Click "Save Changes" to auto-redeploy

---

## 🔍 Troubleshooting

### Issue: "API key not found"

**Fix:**
```bash
# Check .env file exists
ls -la

# Verify it contains:
SENDGRID_API_KEY=SG.xxx
EMAIL_SENDER=your-email@example.com
```

### Issue: "from address does not match a verified Sender"

**Fix:**
1. Go to: https://app.sendgrid.com/settings/sender_auth
2. Check if your email has ✅ green checkmark
3. If not, resend verification email
4. Click verification link
5. Update `.env` with verified email
6. Restart backend

### Issue: "Email not received"

**Checks:**
- ✅ Check spam/junk folder (very common!)
- ✅ Verify sender email is verified in SendGrid
- ✅ Check SendGrid Activity: https://app.sendgrid.com/email_activity
- ✅ Look for delivery status in SendGrid dashboard
- ✅ Verify backend logs show "Email sent successfully"

### Issue: "403 Forbidden"

**Fix:** API key is invalid or expired
1. Go to: https://app.sendgrid.com/settings/api_keys
2. Create new API key
3. Update `.env` file
4. Restart backend

---

## 📊 SendGrid Dashboard

Monitor your emails at: https://app.sendgrid.com/email_activity

**Features:**
- View all sent emails
- Check delivery status
- See bounce/spam reports
- Debug failed emails
- View email statistics

---

## 💰 Pricing & Limits

**Free Plan:**
- ✅ 100 emails/day (3,000/month)
- ✅ All features included
- ✅ Email activity tracking
- ✅ No credit card required

**Perfect for:**
- Development and testing
- College projects
- Small complaint systems
- Expected usage: 10-50 emails/day

---

## 🎨 Email Design

All emails include:
- ✅ Professional HTML design
- ✅ Color-coded status indicators
- ✅ Complete complaint details
- ✅ Clear formatting
- ✅ Mobile-responsive layout
- ✅ BIAS Grievance branding

---

## 📝 Code Structure

### Email Service:
```
backend/utils/emailService.js
```

**Functions:**
```javascript
sendComplaintNotificationToAdmin(complaint, adminEmail, adminName)
sendComplaintAcceptedEmail(complaint, userEmail, userName)
sendComplaintRejectedEmail(complaint, userEmail, userName, reason)
sendComplaintResolvedEmail(complaint, userEmail, userName, response)
sendComplaintEscalatedToDirectorEmail(complaint, directorEmail, directorName, escalatedBy)
```

### Controller Integration:
```
backend/controller/complaintController.js
```
- Emails sent asynchronously (non-blocking)
- Error handling included
- Detailed logging

---

## ✅ Setup Checklist

Before going live:

- [ ] SendGrid account created
- [ ] API key obtained
- [ ] Sender email verified in SendGrid (green checkmark)
- [ ] API key added to `.env` file
- [ ] Sender email added to `.env` file
- [ ] Test script run: `node test-sendgrid.js`
- [ ] Test email received successfully
- [ ] Backend running without errors
- [ ] Complaint submission triggers email
- [ ] Accept/reject actions send emails
- [ ] Escalation sends email to Director
- [ ] Environment variables set on Render
- [ ] Production deployment tested

---

## 🔐 Security Best Practices

1. **Never commit .env file:**
   - Already in `.gitignore`
   - API key should stay secret

2. **Use environment variables:**
   - Store API key in `.env` locally
   - Store in Render environment for production

3. **Restrict API key if needed:**
   - In SendGrid, create restricted key
   - Only give "Mail Send" permission

4. **Rotate API keys:**
   - Change keys periodically
   - Delete old keys in SendGrid

---

## 📞 Support Resources

**SendGrid Documentation:**
- Main Docs: https://docs.sendgrid.com/
- API Reference: https://docs.sendgrid.com/api-reference
- Node.js Guide: https://docs.sendgrid.com/for-developers/sending-email/v3-nodejs-code-example

**SendGrid Dashboard:**
- API Keys: https://app.sendgrid.com/settings/api_keys
- Sender Auth: https://app.sendgrid.com/settings/sender_auth
- Email Activity: https://app.sendgrid.com/email_activity

**Your Project Files:**
- Email Service: `backend/utils/emailService.js`
- Test Script: `backend/test-sendgrid.js`
- Controller: `backend/controller/complaintController.js`

---

## 🆘 Common Errors

### Error: "Unauthorized"
```
statusCode: 401
message: "Unauthorized"
```
**Fix:** API key is wrong. Re-create in SendGrid and update `.env`

### Error: "The from address does not match a verified Sender Identity"
```
statusCode: 403
message: "The from address does not match..."
```
**Fix:** Verify your sender email in SendGrid dashboard

### Error: "ECONNREFUSED"
```
Error: connect ECONNREFUSED
```
**Fix:** Check internet connection. SendGrid API requires internet.

---

## 🎉 You're All Set!

Your BIAS Grievance System now has professional email notifications powered by SendGrid!

**Next Steps:**
1. ✅ Run test: `node test-sendgrid.js`
2. ✅ Check inbox (and spam!)
3. ✅ Start backend: `npm run dev`
4. ✅ Test complaints and notifications
5. ✅ Deploy to production!

---

**Setup Date:** November 6, 2025  
**Service:** SendGrid  
**Status:** ✅ Ready to configure  
**Free Emails:** 100/day
