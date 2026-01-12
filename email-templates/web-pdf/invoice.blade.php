<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{config('app.name')}} - Invoice</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles for email clients */
        body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .mobile-full { width: 100% !important; }
            .mobile-padding { padding: 10px !important; }
            .mobile-text-center { text-align: center !important; }
            .mobile-hide { display: none !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333;">
    <!-- Email Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
        <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
                <!-- Main Content Table -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 660px; background-color: #ffffff;">
                    <tr>
                        <td align="center" valign="top">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;">
                                <tr><td>
                            <![endif]-->
                            
                            <!-- Header Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 2px solid #BFEB5B; padding-bottom: 20px; margin-bottom: 20px;">
                                <tr>
                                    <td valign="top" width="50%" style="padding: 20px 0;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td>
                                                    <img src="{{public_path('site/assets/image/logo-dark-green.webp')}}" 
                                                         alt="{{config('app.name')}} Logo" 
                                                         width="180" 
                                                         style="display: block; max-width: 180px; height: auto; border: 0;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 15px;">
                                                    <h2 style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: #084C3D; margin: 0 0 10px 0; letter-spacing: 1px;">
                                                        Tax Invoice
                                                    </h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; margin: 0 0 5px 0; color: #333333;">
                                                        {{ $companyName }}
                                                    </p>
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; margin: 0; color: #333333;">
                                                        ABN: {{ $abn }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="top" width="50%" style="padding: 20px 0; text-align: right;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="right">
                                                    <div style="background-color: #BFEB5B; color: #084C3D; font-weight: bold; border-radius: 6px; padding: 8px 16px; font-size: 14px; display: inline-block; margin-bottom: 10px;">
                                                        PAID
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <h3 style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; margin: 0 0 8px 0; color: #333333;">
                                                        Invoice #{{ $invoiceNumber }}
                                                    </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0 0 5px 0; color: #333333;">
                                                        Order No: <span style="color: #BFEB5B; font-weight: 600;">{{ $orderNumber }}</span>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0 0 5px 0; color: #333333;">
                                                        Total: <span style="color: #BFEB5B; font-weight: 600;">{{$currencyWithSymbol . $discountedTotalPrice}}</span>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                        Date: {{ $paymentDate }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Customer Information Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                                <tr>
                                    <td valign="top" width="50%" style="padding: 10px 0;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td>
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; margin: 0; color: #333333;">
                                                        Invoice To: <span style="font-size: 18px; font-weight: 600;">{{ $customerName }}</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="top" width="50%" style="padding: 10px 0; text-align: right;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="right">
                                                    <h4 style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 600; margin: 0 0 8px 0; color: #333333;">
                                                        Billing Information:
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 0 5px 0; color: #333333;">
                                                        {{ $customerEmail }}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 0 5px 0; color: #333333;">
                                                        {{ $address1 }}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; color: #333333;">
                                                        {{ $address2 }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Items Table -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 0 20px;">
                                        <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid #e5e5e5; font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                            <!-- Table Header -->
                                            <tr style="background-color: #084C3D; color: #ffffff;">
                                                <th width="10%" style="padding: 12px; text-align: center; border: 1px solid #084C3D; font-weight: 600; font-size: 14px;">
                                                    SN.
                                                </th>
                                                <th width="50%" style="padding: 12px; text-align: left; border: 1px solid #084C3D; font-weight: 600; font-size: 14px;">
                                                    ITEM DESCRIPTION
                                                </th>
                                                <th width="15%" style="padding: 12px; text-align: center; border: 1px solid #084C3D; font-weight: 600; font-size: 14px;">
                                                    PRICE
                                                </th>
                                                <th width="15%" style="padding: 12px; text-align: center; border: 1px solid #084C3D; font-weight: 600; font-size: 14px;">
                                                    QTY.
                                                </th>
                                                <th width="10%" style="padding: 12px; text-align: center; border: 1px solid #084C3D; font-weight: 600; font-size: 14px;">
                                                    TOTAL
                                                </th>
                                            </tr>
                                            
                                            <!-- Table Body -->
                                            @foreach($orderItems as $key => $orderItem)
                                                @if(!$orderItem->business)
                                                    <tr>
                                                        <td style="text-align: center; font-weight: 600; background-color: #f8f9fa; padding: 12px; border: 1px solid #e5e5e5; font-size: 14px;">
                                                            {{ ++$key }}
                                                        </td>
                                                        <td style="padding: 12px; border: 1px solid #e5e5e5; font-size: 14px;">
                                                            @if($orderItem->item_type === \App\Models\Variant::class)
                                                                {{ \App\Models\PrintifyProduct::find($orderItem->item->printify_product_id)->title }}
                                                                ({{ $orderItem->item->title }})
                                                            @else
                                                                {{ $orderItem->item->name }}
                                                            @endif
                                                        </td>
                                                        <td style="text-align: center; font-weight: 600; background-color: #f8f9fa; padding: 12px; border: 1px solid #e5e5e5; font-size: 14px;">
                                                            @php($unitPrice = $orderItem->crossed_unit_price ?: $orderItem->unit_price)
                                                            {{ $currencyWithSymbol . $unitPrice }}
                                                        </td>
                                                        <td style="text-align: center; font-weight: 600; padding: 12px; border: 1px solid #e5e5e5; font-size: 14px;">
                                                            {{ $orderItem->qty }}
                                                        </td>
                                                        <td style="text-align: center; font-weight: 600; background-color: #f8f9fa; padding: 12px; border: 1px solid #e5e5e5; font-size: 14px;">
                                                            {{ $currencyWithSymbol . $unitPrice * $orderItem->qty }}
                                                        </td>
                                                    </tr>
                                                @endif
                                            @endforeach
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Totals Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                                <tr>
                                    <td width="50%">&nbsp;</td>
                                    <td width="50%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="padding: 5px 0;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td>
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                    Subtotal
                                                                </p>
                                                            </td>
                                                            <td align="right">
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                    {{ $currencyWithSymbol . $subTotalPrice }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                            @foreach($orderItems as $orderItem)
                                                @if($orderItem->coupon && !$orderItem->business)
                                                    <tr>
                                                        <td style="padding: 5px 0;">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td>
                                                                        <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                            {{ $orderItem->coupon->code }}
                                                                            <br><span style="font-size: 12px; color: #666666;">({{ $orderItem->coupon->getDescription() }})</span>
                                                                        </p>
                                                                    </td>
                                                                    <td align="right">
                                                                        <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #ff0000;">
                                                                            @php($couponDiscount = $orderItem->crossed_unit_price - $orderItem->unit_price)
                                                                            -{{$currencyWithSymbol.$couponDiscount}}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                @endif
                                            @endforeach
                                            
                                            @if($shipping)
                                                <tr>
                                                    <td style="padding: 5px 0;">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td>
                                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                        Shipping Cost
                                                                    </p>
                                                                </td>
                                                                <td align="right">
                                                                    <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                        {{ $currencyWithSymbol.$shipping->cost }}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            @endif
                                            
                                            <tr>
                                                <td style="padding: 5px 0;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td>
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                    Tax
                                                                </p>
                                                            </td>
                                                            <td align="right">
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333333;">
                                                                    {{ $currencyWithSymbol.$tax }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                            <!-- Total Paid Row -->
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #BFEB5B; border-radius: 6px;">
                                                        <tr>
                                                            <td style="padding: 12px;">
                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <h2 style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; margin: 0; color: #084C3D;">
                                                                                Total Paid
                                                                            </h2>
                                                                        </td>
                                                                        <td align="right">
                                                                            <h2 style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; margin: 0; color: #084C3D;">
                                                                                {{ $currencyWithSymbol .  ($shipping ? $discountedTotalPrice + $shipping->cost : $discountedTotalPrice) }}
                                                                            </h2>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                            <!-- Payment Information -->
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td align="right">
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin: 0 0 5px 0; color: #666666;">
                                                                    Paid via credit card
                                                                </p>
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin: 0 0 5px 0; color: #666666;">
                                                                    Card category: {{ $cardCategory }}
                                                                </p>
                                                                <p style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin: 0; color: #666666;">
                                                                    Card number: ************{{ $cardNumber }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Section -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="50%" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #084C3D; border-radius: 6px;">
                                                        <tr>
                                                            <td style="padding: 15px; text-align: center;">
                                                                <h3 style="font-family: 'Intel', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; margin: 0; color: #ffffff;">
                                                                    Thank you for your support!
                                                                </h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 15px; text-align: center;">
                                                    <img src="{{public_path('/site/assets/image/sticker.webp')}}" 
                                                         alt="Thank You" 
                                                         width="80" 
                                                         style="display: inline-block; max-width: 80px; height: auto; border: 0;">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%">&nbsp;</td>
                                </tr>
                            </table>
                            
                            <!--[if (gte mso 9)|(IE)]>
                            </td></tr></table>
                            <![endif]-->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
