export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (url.pathname === "/callback") {
            return handleCallback(request);
        }
        
        return new Response("Website Running!", { status: 200 });
    }
};

async function handleCallback(request) {
    try {
        const tripayData = await request.json();

        // Kirim data ke backend di Railway
        const response = await fetch("https://backend-topup-production.up.railway.app/callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripayData)
        });

        const responseData = await response.json();

        return new Response(JSON.stringify(responseData), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}
