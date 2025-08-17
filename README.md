Purpose and Overview of the Code
--
The main purpose of this TypeScript code is to create an interactive chat session with the Dobby-70B language model (from Sentient, accessible via the Fireworks API). The code enables real-time communication between a user and the Dobby-70B AI model by sending messages from the user to the model and receiving responses.

Overview of What the Code Does
--
Set Up API Communication: The code connects to Fireworks' API, which hosts the Dobby-70B model, and sends user inputs to the model via HTTP requests. It then receives AI-generated responses.

User Interaction: The program interacts with the user in real-time through a command-line interface. The user types a message, and the AI (Dobby-70B) responds based on the message provided.

Handling User Input: The program waits for the user to type a message, sends it to the API for processing, and outputs the response from the AI model. This cycle repeats until the user decides to exit..

Steps to Set Up Interactive Chat Session
-
Install Required Dependencies: You'll need node-fetch (or any other HTTP request library) to make API requests and ts-node for running TypeScript directly in Node.js.

Run the following commands to install the required dependencies:

    npm init -y
    npm install node-fetch
    npm install --save-dev typescript ts-node @types/node

2-Create a TypeScript file to handle your chat session (e.g., chat.ts).

3-Implement the Interactive Chat Session: Here's a basic example using TypeScript that sends a message and gets a response from Dobby-70B in real-time.

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

How to Run the Code:
-
1-Save the code in a file called chat.ts.
2-Run the TypeScript file using ts-node:

    npx ts-node chat.ts
    
3-Start chatting: You'll be able to enter messages interactively, and Dobby-70B will respond in real time.

