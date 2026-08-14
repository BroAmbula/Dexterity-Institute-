<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Purchase confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
                    <tr>
                        <td style="background:#ffffff; padding:32px; border-radius:16px;">
                            <h1 style="margin:0 0 16px; font-size:20px; color:#0f172a;">Purchase confirmed</h1>
                            <p style="margin:0 0 16px; color:#475569;">Thank you for purchasing <strong>{{ $product['title'] }}</strong>. Your download is attached where possible and is also available via the link below.</p>
                            <p style="margin:0 0 24px;"><a href="{{ $downloadUrl }}" style="background:#2563eb;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:700;">Download {{ $product['title'] }}</a></p>
                            <p style="margin:0; font-size:13px; color:#94a3b8;">If you have any issues, contact us and we'll help.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
