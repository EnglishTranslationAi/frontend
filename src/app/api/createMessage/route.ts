import {  NextApiResponse } from 'next'

export async function POST(
    req: Request,
    res: NextApiResponse
) {
    const requestData = await req.json()
    const messages = requestData.messages

    console.log('RRE',messages)
    const apiKey = process.env.OPENAI_API_KEY
    const url = 'https://api.openai.com/v1/chat/completions'
    console.log('SOME')

    const body = JSON.stringify({
        messages,
        model: 'gpt-3.5-turbo',
        stream: false,
    });

    try {
        const re = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${apiKey}`,
            },
           body
        })
        const data = await re.json()

        console.log('SOME DATA', data)
        console.log('SOME DATA', data.choices[0].message)

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "message": "Blurblur~"
            },
        });
    } catch (error: unknown) {
        console.log('RR Error')
        // Check if error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            // If it's not an Error instance, you might want to handle it differently
            res.status(500).json({error: 'An unknown error occurred'});
        }
    }
}

