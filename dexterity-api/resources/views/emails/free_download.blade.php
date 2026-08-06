<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $download['title'] }}</title>
</head>
<body style="font-family:Arial,sans-serif; background:#f5f7fb; color:#111827; margin:0; padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:20px; overflow:hidden;">
                    <tr>
                        <td style="padding:32px;">
                            <h1 style="margin:0 0 16px; font-size:24px; color:#0f172a;">Your requested download is ready</h1>
                            <p style="margin:0 0 24px; font-size:16px; line-height:1.7; color:#475569;">
                                Thank you for requesting <strong>{{ $download['title'] }}</strong> from Dexterity Institute. We have attached the document to this email where possible.
                            </p>
                            <p style="margin:0 0 24px; font-size:16px; line-height:1.7; color:#475569;">
                                If you would prefer to download directly, use the link below:
                            </p>
                            <p style="margin:0 0 32px;">
                                <a href="{{ $downloadUrl }}" style="display:inline-block; padding:12px 20px; background:#2563eb; color:#ffffff; border-radius:12px; text-decoration:none; font-weight:700;">Download {{ $download['title'] }}</a>
                            </p>
                            <p style="margin:0 0 12px; font-size:14px; color:#64748b;">
                                Document: {{ $download['title'] }}<br>
                                Description: {{ $download['description'] }}
                            </p>
                            <p style="margin:0; font-size:14px; color:#94a3b8;">
                                If you did not request this email, please ignore it.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
