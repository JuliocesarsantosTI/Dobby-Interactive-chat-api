import fetch from 'node-fetch';

// Replace with your Fireworks API Key
const API_KEY = '<YOUR_API_KEY>';  // Be sure to replace this with your actual API key

// Function to make API requests to the Fireworks API
async function sendMessageToDobby(message: string): Promise<string> {
    const url = 'https://api.fireworks.ai/inference/v1/chat/completions';
    
    const requestBody = {
        model: 'accounts/sentientfoundation/models/dobby-unhinged-llama-3-3-70b-new',
        max_tokens: 2048,  // Adjust based on the desired length of the response
        top_p: 1,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        temperature: 0.7,
        messages: [
            {
                role: 'user',
                content: message,
            }
        ],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return reply;
    } catch (error) {
        console.error('Error during the request:', error);
        return 'An error occurred. Please try again.';
    }
}

// Main function for interactive chat session
async function interactiveChat() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('Interactive Chat with Dobby-70B. Type "exit" to quit.');

    rl.on('line', async (input: string) => {
        if (input.trim().toLowerCase() === 'exit') {
            console.log('Exiting chat session...');
            rl.close();
            return;
        }

        console.log('You:', input);

        // Send user message to Dobby-70B and get the response
        const reply = await sendMessageToDobby(input);
        
        // Output the reply from Dobby-70B
        console.log('Dobby-70B:', reply);
    });
}

// Run the interactive chat
interactiveChat();
