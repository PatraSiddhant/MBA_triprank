export interface ShareData {
    title: string;
    region: string;
    duration: number;
    budget: number;
    vibes: string[];
    slug: string;
    highlights: string[];
}

export function generateWhatsAppInvite(data: ShareData) {
    const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://mbatriprank.com'}/templates/${data.slug}`;

    const message = `🚀 *Join the ${data.title}!* 🌍

I'm coordinating this MBA Trek and would love for you to join! Here's the vibe:

📅 *Duration:* ${data.duration} Days
📍 *Region:* ${data.region}
🧬 *Trek DNA:* ${data.vibes.map(v => `#${v}`).join(' ')}
💰 *Est. Budget:* $${data.budget}+

✨ *Highlights:*
${data.highlights.slice(0, 2).map(h => `• ${h}`).join('\n')}

🎯 *Next Steps:*
1. Check out the full itinerary here: ${url}
2. Hit the "Interested" button so I can keep you in the loop.
3. Add it to your Planner to see how it fits your schedule.

Let's make this legendary! 🥂`;

    return message;
}
