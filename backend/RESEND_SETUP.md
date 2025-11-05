# 📧 Resend Email Service Setup Guide

## ✅ What's Already Done

Your project is now configured with **Resend** email service!

### Completed Steps:
- ✅ Installed `resend` package
- ✅ Created `utils/emailService.js` with Resend
- ✅ Updated `complaintController.js` with email notifications
- ✅ Created test script `test-resend.js`

---

## 🚀 Quick Start

### Step 1: Get Your Resend API Key

1. **Sign up at Resend:**
   - Go to: https://resend.com
   - Create a free account (3,000 emails/month free!)

2. **Get API Key:**
   - Login to Resend dashboard
   - Go to: **API Keys** section
   - Click **Create API Key**
   - Copy the API key (starts with `re_`)

### Step 2: Add API Key to .env File

Open your `.env` file and add:

```env
RESEND_API_KEY=re_your_actual_api_key_here
TEST_EMAIL=your-email@example.com
```

**Example:**
```env
RESEND_API_KEY=re_abc123xyz789...
TEST_EMAIL=youremail@gmail.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=9000
```

### Step 3: Test Email Service

Run the test script:
```bash
node test-resend.js
```

**Expected Output:**
```
✅ EMAIL SENT SUCCESSFULLY!
📧 Email Details:
   Message ID: abc-123-xyz
   To: youremail@gmail.com
✅ Resend email service is working perfectly!
```

### Step 4: Check Your Email

- Open your email inbox
- Look for email from: **BIAS Grievance <onboarding@resend.dev>**
- Subject: "✅ Test Email from BIAS Grievance System"
- **Check spam folder** if not in inbox

---

## 📊 Email Notifications Enabled

Your system now sends emails for:

| Action | Recipient | When |
|--------|-----------|------|
| **New Complaint** | HOD/Warden/Registrar | When student submits complaint |
| **Accepted** | Student/User | When admin accepts complaint |
| **Rejected** | Student/User | When admin rejects complaint |
| **Resolved** | Student/User | When complaint is completed |
| **Escalated** | Director | When complaint is escalated |

---

## 🔧 Email Configuration

### Default Sender Address:
```
BIAS Grievance <onboarding@resend.dev>
```

### Want to Use Your Own Domain?

1. **Add domain in Resend:**
   - Go to: https://resend.com/domains
   - Add your domain
   - Verify DNS records

2. **Update sender in `emailService.js`:**
```javascript
const FROM_EMAIL = "BIAS Grievance <noreply@yourdomain.com>";
```

---

## 📝 Code Structure

### Email Service Location:
```
backend/utils/emailService.js
```

### Available Functions:
```javascript
// 1. Send notification to admin when complaint submitted
sendComplaintNotificationToAdmin(complaint, adminEmail, adminName)

// 2. Send acceptance notification to user
sendComplaintAcceptedEmail(complaint, userEmail, userName)

// 3. Send rejection notification to user
sendComplaintRejectedEmail(complaint, userEmail, userName, reason)

// 4. Send resolution notification to user
sendComplaintResolvedEmail(complaint, userEmail, userName, response)

// 5. Send escalation notification to Director
sendComplaintEscalatedToDirectorEmail(complaint, directorEmail, directorName, escalatedBy)
```

---

## 🧪 Testing Locally

### 1. Start Backend:
```bash
cd backend
npm run dev
```

### 2. Submit a Complaint:
- Use your frontend or Postman
- Submit a test complaint
- Watch backend terminal for:
  ```
  📧 Sending email notification to admin...
  ✅ Email sent successfully!
  ```

### 3. Check Emails:
- Check HOD/admin email inbox
- Check spam folder if needed

---

## 🚀 Deployment to Render

### Environment Variables to Set:

Go to Render Dashboard → Your Service → Environment

Add these variables:
```
RESEND_API_KEY=re_your_api_key_here
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=9000
```

### Test on Production:
1. Deploy backend to Render
2. Submit test complaint from frontend
3. Check Render logs: **"✅ Email sent successfully!"**
4. Check recipient email inbox

---

## 🔍 Troubleshooting

### Issue: "RESEND_API_KEY not found"

**Fix:**
```bash
# Check if .env file exists
ls -la

# Make sure it has:
RESEND_API_KEY=re_...
```

### Issue: "API key invalid"

**Fix:**
1. Go to https://resend.com/api-keys
2. Create a new API key
3. Copy the full key (starts with `re_`)
4. Update .env file
5. Restart server

### Issue: "Email not received"

**Checks:**
- ✅ Check spam/junk folder
- ✅ Verify recipient email is correct
- ✅ Check Resend dashboard: https://resend.com/emails
- ✅ Look for delivery status in Resend logs

### Issue: "Error 403"

**Fix:** Your API key might be wrong or expired
- Create new API key in Resend
- Update .env file
- Restart backend

---

## 📊 Resend Dashboard

Monitor your emails:
- **URL:** https://resend.com/emails
- **Features:**
  - View all sent emails
  - Check delivery status
  - See open/click rates
  - Debug failed emails

---

## 💰 Pricing

**Free Tier:**
- ✅ 3,000 emails/month
- ✅ All features included
- ✅ No credit card required

**Perfect for:**
- Development
- Testing
- Small to medium projects
- College grievance system (estimated 100-500 emails/month)

---

## 🎨 Email Design

All emails include:
- ✅ Professional HTML design
- ✅ Color-coded status (green, red, orange)
- ✅ Complaint details in formatted boxes
- ✅ Clear call-to-action
- ✅ Mobile-responsive layout

---

## 📝 Example Email Preview

### New Complaint Email:
```
Subject: New Complaint Submitted - ACADEMIC
From: BIAS Grievance <onboarding@resend.dev>
To: hod@college.edu

─────────────────────────
📧 New Complaint Notification

Dear HOD Computer Science,

A new complaint has been submitted and assigned to you.

[Blue Box]
Complaint Details:
Title: Library Books Not Available
Type: ACADEMIC
Description: ...
Submitted by: John Doe (john@college.edu)
Department: Computer Science
Date: Nov 5, 2025
─────────────────────────

Please log in to review and take action.
```

---

## ✅ Setup Checklist

Before going live, verify:

- [ ] Resend account created
- [ ] API key obtained
- [ ] API key added to `.env` file
- [ ] Test script run successfully: `node test-resend.js`
- [ ] Test email received in inbox
- [ ] Backend running without errors
- [ ] Complaint submission triggers email
- [ ] Accept/Reject actions send emails
- [ ] Escalation sends email to Director
- [ ] Environment variables set on Render
- [ ] Production deployment tested

---

## 🆘 Need Help?

**Resend Documentation:**
- https://resend.com/docs

**API Reference:**
- https://resend.com/docs/api-reference

**Support:**
- https://resend.com/support

**Your Email Service:**
- Location: `backend/utils/emailService.js`
- Test Script: `backend/test-resend.js`
- Controller: `backend/controller/complaintController.js`

---

## 🎉 You're All Set!

Your BIAS Grievance System now has a professional email notification system powered by Resend!

**Benefits:**
- ✅ Free tier (3,000 emails/month)
- ✅ No SMTP configuration needed
- ✅ Works perfectly on Render
- ✅ Modern, simple API
- ✅ Beautiful HTML emails
- ✅ Detailed delivery tracking

**Next Steps:**
1. Run test: `node test-resend.js`
2. Start backend: `npm run dev`
3. Test complaints and notifications
4. Deploy to production!

---

**Setup Date:** November 5, 2025  
**Service:** Resend  
**Status:** ✅ Ready to use  
**Free Emails:** 3,000/month
