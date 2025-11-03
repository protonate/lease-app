import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { populateLeaseTemplate } from '@/lib/populateLease';
import { LeaseFormData } from '@/types';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const data: LeaseFormData = await request.json();

    // Validate required fields
    if (!data.tenantName1 || !data.startDate || !data.endDate || !data.monthlyRentAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Populate the lease template
    const populatedLease = populateLeaseTemplate(data);

    // Send email with the populated lease
    const emailSubject = `New Lease Application - ${data.tenantName1}${data.tenantName2 ? ` & ${data.tenantName2}` : ''}`;

    const emailText = `A new lease application has been submitted.\n\nTenant: ${data.tenantName1}${data.tenantName2 ? ` & ${data.tenantName2}` : ''}\nProperty: ${data.streetAddress}${data.unitName ? `, Unit: ${data.unitName}` : ''}\nLease Term: ${data.startDate} to ${data.endDate}\n\nSee attached lease document.`;

    const resend = getResend();
    const { data: emailData, error } = await resend.emails.send({
      from: 'Lease App <onboarding@resend.dev>', // Update this with your verified domain
      to: ['nathan.g.wolff@gmail.com'],
      subject: emailSubject,
      text: emailText,
      attachments: [
        {
          filename: `lease-${data.tenantName1.replace(/\s+/g, '-')}-${Date.now()}.md`,
          content: Buffer.from(populatedLease).toString('base64'),
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: emailData?.id 
    });
  } catch (error) {
    console.error('Error processing lease:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

