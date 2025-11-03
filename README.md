# Lease Application Web App

A Next.js web application that allows prospective tenants to fill out lease information through a web form. The completed lease document is automatically populated and emailed to the property owner.

## Features

- Interactive web form for collecting tenant information
- Automatic lease template population
- Email delivery of completed lease documents
- Responsive design for desktop and mobile devices

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- A Resend account (for email sending)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Get your Resend API key from https://resend.com/api-keys
   - Add your API key to `.env.local`:
     ```
     RESEND_API_KEY=re_your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Resend Setup

1. Sign up for a free account at [https://resend.com](https://resend.com)
2. Navigate to API Keys in your dashboard
3. Create a new API key
4. Copy the key and add it to your `.env.local` file
5. Note: For production, you'll want to verify your sending domain. For development, Resend allows sending from `onboarding@resend.dev`

## Deployment to Vercel

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project to Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

3. **Configure environment variables:**
   - In your Vercel project settings, go to "Environment Variables"
   - Add `RESEND_API_KEY` with your Resend API key value
   - Select all environments (Production, Preview, Development)

4. **Deploy:**
   - Vercel will automatically deploy when you push to your main branch
   - Or click "Deploy" in the Vercel dashboard

5. **Verify email settings:**
   - For production, verify your sending domain in Resend
   - Update the `from` field in `app/api/submit-lease/route.ts` with your verified domain

## Project Structure

```
lease-app/
├── app/
│   ├── api/
│   │   └── submit-lease/
│   │       └── route.ts          # API endpoint for processing form submission
│   ├── page.tsx                   # Main page component
│   └── layout.tsx                 # Root layout
├── components/
│   └── LeaseForm.tsx              # Main lease application form
├── lib/
│   └── populateLease.ts           # Function to populate lease template
├── types.ts                       # TypeScript type definitions
├── lease_template.md             # Lease template with placeholders
└── .env.example                   # Example environment variables
```

## How It Works

1. User fills out the lease application form with tenant information
2. Form submission is sent to `/api/submit-lease`
3. The API route:
   - Validates the form data
   - Populates the lease template by replacing placeholders
   - Sends the completed lease as an email attachment to nathan.g.wolff@gmail.com
4. User receives confirmation that the application was submitted

## Customization

- **Email recipient**: Update the `to` field in `app/api/submit-lease/route.ts`
- **Email sender**: Update the `from` field (requires verified domain in Resend)
- **Form fields**: Modify `components/LeaseForm.tsx` to add or remove fields
- **Template**: Edit `lease_template.md` to modify the lease document structure

## Notes

- The form includes default values for common fields (e.g., owner information, fees)
- Required fields are marked with an asterisk (*)
- The lease template uses placeholders in the format `[PLACEHOLDER NAME]` that are replaced with form data
- For production use, consider adding form validation, CAPTCHA, and rate limiting
