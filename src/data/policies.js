/**
 * Sample policy content for the KSR Gift Store frontend demonstration.
 * Nothing here constitutes a real commercial policy.
 */

export const policyUpdated = '1 October 2026';

export const policies = [
  {
    slug: 'shipping-delivery',
    title: 'Shipping & Delivery',
    shortTitle: 'Shipping',
    intro:
      'Everything you need to know about how our gifts travel from our studio to your door.',
    sections: [
      {
        heading: 'Where we deliver',
        paragraphs: [
          'We currently deliver to addresses across India. This demo storefront uses sample delivery information, so no shipping network is actually connected.',
          'For this demonstration, every destination within India is treated as serviceable. In a live store, availability would be confirmed using your six-digit PIN code at checkout.',
        ],
      },
      {
        heading: 'Processing times',
        paragraphs: [
          'Orders are prepared by hand in our studio. Most gifts are packed within 1–2 business days, and bespoke or personalised pieces take 3–5 business days.',
          'If you have chosen a handwritten note or engraving, please allow one additional business day for finishing.',
        ],
        list: [
          'Standard gifts: dispatched within 1–2 business days',
          'Personalised or engraved gifts: dispatched within 3–5 business days',
          'Fresh flowers and cakes: scheduled for the requested delivery date',
        ],
      },
      {
        heading: 'Delivery estimates',
        paragraphs: [
          'Metro cities usually receive their gifts within 2–4 business days. Other locations may take 4–7 business days. These timings are indicative and would be confirmed at checkout in a live store.',
          'Fresh flowers and chilled desserts are delivered on the selected date wherever possible. Our studio would contact you if a delivery window needed to change.',
        ],
      },
      {
        heading: 'Shipping charges',
        paragraphs: [
          'Complimentary standard shipping applies to orders above ₹999. Orders below this amount carry a flat ₹99 shipping fee, shown at checkout.',
          'Gift wrapping is complimentary on all eligible products. There are no hidden handling charges in this demo.',
        ],
      },
      {
        heading: 'Tracking your gift',
        paragraphs: [
          'Once dispatched, you would receive a tracking link by email and SMS. As this is a frontend demonstration, no tracking messages are sent.',
        ],
      },
      {
        heading: 'Delays beyond our control',
        paragraphs: [
          'Weather, public holidays, local restrictions and courier delays can occasionally affect delivery. We would always keep you informed and work to resolve any issue as quickly as possible.',
        ],
      },
    ],
  },
  {
    slug: 'returns',
    title: 'Returns',
    shortTitle: 'Returns',
    intro:
      'A considered approach to returns, because gifting should never feel complicated.',
    sections: [
      {
        heading: 'Our approach',
        paragraphs: [
          'We want every gift to arrive exactly as intended. If something is not right, please contact us within 48 hours of delivery so we can help.',
          'The following information is sample policy content for this demonstration. No real returns can be requested through this site.',
        ],
      },
      {
        heading: 'Eligible items',
        paragraphs: [
          'Unused, unopened products in their original packaging may be eligible for return within 7 days of delivery. Items must be in a resalable condition.',
        ],
        list: [
          'Unopened candles, homeware and stationery',
          'Unused jewellery in its original pouch with tags attached',
          'Sealed beauty and skincare products',
          'Non-personalised gift hampers',
        ],
      },
      {
        heading: 'Items we cannot accept',
        paragraphs: [
          'For hygiene, safety and freshness reasons, some items are final sale unless they arrive damaged or incorrect.',
        ],
        list: [
          'Fresh flowers, plants and perishable food',
          'Cakes and chilled desserts',
          'Personalised, engraved or made-to-order pieces',
          'Opened beauty, skincare or fragrance products',
          'Gift cards',
        ],
      },
      {
        heading: 'How to start a return',
        paragraphs: [
          'In a live store, you would email our care team with your order number and a photograph of the item. We would reply within two business days with the next steps.',
          'This demo site does not process returns or send emails. The contact form is a frontend-only demonstration.',
        ],
      },
      {
        heading: 'Damaged or incorrect items',
        paragraphs: [
          'If your gift arrives damaged, please keep the packaging and contact us within 48 hours with photographs. We would arrange a replacement or a refund as appropriate.',
        ],
      },
    ],
  },
  {
    slug: 'refunds',
    title: 'Refunds',
    shortTitle: 'Refunds',
    intro:
      'Clear, fair and straightforward — how refunds would work once an approved return reaches us.',
    sections: [
      {
        heading: 'Approved refunds',
        paragraphs: [
          'Once a returned item has been inspected and approved, a refund would be issued to the original payment method. Please allow 5–7 business days for the amount to appear, depending on your bank.',
          'All refund information on this page is sample content for the demonstration. No real payments are taken and no refunds are processed.',
        ],
      },
      {
        heading: 'Original shipping charges',
        paragraphs: [
          'Standard shipping charges are non-refundable unless the item was damaged, incorrect or the return is due to an error on our part.',
        ],
      },
      {
        heading: 'Partial refunds',
        paragraphs: [
          'Where a returned hamper is missing components, or an item shows signs of use, we may offer a partial refund after inspection. We would always explain the reason clearly before processing.',
        ],
      },
      {
        heading: 'Cancellations',
        paragraphs: [
          'Orders can usually be cancelled before dispatch for a full refund. Personalised items cannot be cancelled once production has begun. Fresh flowers and cakes cannot be cancelled within 24 hours of the requested delivery date.',
        ],
      },
      {
        heading: 'Failed or refused deliveries',
        paragraphs: [
          'If a delivery is refused or cannot be completed after reasonable attempts, a refund may be issued minus the original shipping cost. Perishable items are not eligible for refund in these circumstances.',
        ],
      },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    shortTitle: 'Privacy',
    intro:
      'How this demonstration handles the small amount of information you enter.',
    sections: [
      {
        heading: 'A frontend-only demonstration',
        paragraphs: [
          'This website is a frontend portfolio demonstration. It has no backend, database or payment integration. Information entered into the contact or checkout forms is processed only in your browser and is not transmitted to us or stored on a server.',
          'Cart contents and recently viewed products are saved in your browser’s localStorage so the experience works across pages. You can clear this at any time by clearing your browser storage.',
        ],
      },
      {
        heading: 'Information we would collect',
        paragraphs: [
          'In a live store, we would collect only the information needed to fulfil an order and provide customer care.',
        ],
        list: [
          'Contact details such as name, email address and phone number',
          'Delivery address and PIN code',
          'Order details, gift messages and preferences',
          'Basic, aggregated analytics about how the site is used',
        ],
      },
      {
        heading: 'How information would be used',
        paragraphs: [
          'Order information would be used to prepare, personalise and deliver your gift, to provide updates, and to handle any questions or returns. We would never sell personal information.',
        ],
      },
      {
        heading: 'Cookies and local storage',
        paragraphs: [
          'This demo uses browser localStorage for the cart and recently viewed items. No third-party advertising cookies are set. A live store would use a short, clearly explained cookie notice for essential functionality and analytics.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You may request access to, correction of, or deletion of your personal information in a live store. To clear the information saved by this demo, use your browser settings to delete site data for this domain.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about this sample policy can be sent to hello@ksrgiftstore.example. This address is a placeholder and is not monitored.',
        ],
      },
    ],
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    shortTitle: 'Terms',
    intro:
      'The terms that would govern use of this storefront and the purchase of gifts from KSR Gift Store.',
    sections: [
      {
        heading: 'Sample terms',
        paragraphs: [
          'This is a frontend demonstration of an e-commerce storefront. No real orders, payments or contractual relationships are created through this site. The terms below are illustrative sample content.',
        ],
      },
      {
        heading: 'Using this website',
        paragraphs: [
          'By browsing this demonstration, you agree to use it lawfully and not to interfere with its operation. Product information, prices and availability are fictional and may be changed at any time.',
        ],
      },
      {
        heading: 'Orders and pricing',
        paragraphs: [
          'In a live store, an order would be confirmed only after payment authorisation and our acceptance. Prices would be shown in Indian Rupees and include applicable taxes unless stated otherwise. We would reserve the right to correct pricing errors before dispatch.',
        ],
      },
      {
        heading: 'Product descriptions and imagery',
        paragraphs: [
          'We aim to describe every gift accurately. Natural materials, handmade pieces and seasonal flowers vary slightly, so small differences in colour, texture and arrangement are normal. Product photography in this demo is sourced from Unsplash for illustrative purposes.',
        ],
      },
      {
        heading: 'Gift messages and content',
        paragraphs: [
          'Gift messages and personalised text must be appropriate and lawful. In a live store, we would reserve the right to decline messages that are abusive, discriminatory or otherwise unsuitable.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The KSR Gift Store name, layout and original written content are presented for demonstration. Please do not reproduce this site as your own commercial storefront.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'This demo is provided as-is, without warranties of any kind. To the fullest extent permitted by law, KSR Gift Store would not be liable for indirect or consequential loss arising from use of the site. Nothing in these terms limits rights that cannot be excluded by law.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'For questions about these sample terms, write to hello@ksrgiftstore.example. This is a placeholder address for the demonstration only.',
        ],
      },
    ],
  },
];

export const findPolicy = (slug) =>
  policies.find((policy) => policy.slug === slug);
