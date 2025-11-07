import { NextRequest, NextResponse } from 'next/server';
import { appendCareerApplication, CareerApplication } from '@/lib/google-sheets';
import { sendApplicationConfirmationEmail, sendInternalNotificationEmail } from '@/lib/email';

export const runtime = 'nodejs';

/**
 * POST /api/careers/apply
 * Submit a career application
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'position', 'department'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Prepare application data
    const application: CareerApplication = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      linkedIn: body.linkedIn || '',
      portfolio: body.portfolio || '',
      experience: body.experience,
      availability: body.availability,
      expectedSalary: body.expectedSalary || '',
      whyJoin: body.whyJoin,
      position: body.position,
      department: body.department,
      appliedAt: new Date().toISOString(),
      resume: body.resume || '',
    };

    // Save to Google Sheets
    await appendCareerApplication(application);

    // Send confirmation email to applicant (don't block on failure)
    try {
      await sendApplicationConfirmationEmail({
        applicantName: application.fullName,
        applicantEmail: application.email,
        position: application.position,
        department: application.department,
      });

      // Send internal notification to HR
      await sendInternalNotificationEmail({
        applicantName: application.fullName,
        applicantEmail: application.email,
        phone: application.phone,
        position: application.position,
        department: application.department,
        experience: application.experience,
        resumeLink: application.resume || '',
      });
    } catch (emailError) {
      // Log email errors but don't fail the request
      console.error('Email sending failed (non-critical):', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    
    // Check if it's a Google Sheets configuration error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('GOOGLE_SHEETS')) {
      return NextResponse.json(
        {
          error: 'Server configuration error. Please contact support.',
          details: 'Google Sheets integration not configured',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to submit application',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/careers/apply
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Career applications API is running',
  });
}
