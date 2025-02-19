import type { RequestHandler } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const resend = new Resend(env.RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { subject, body, to } = await request.json();
		const response = await resend.emails.send({
			from: 'no-reply@sethmorton.xyz',
			to,
			subject,
			text: body
		});

		return new Response(JSON.stringify({ success: true, response }), {
			status: 200
		});
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ success: false, error: error.message }), {
			status: 500
		});
	}
};
