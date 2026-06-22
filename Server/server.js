import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import OpenAI from "openai";


const app = express();


//security Middleware

app.use(helmet()); //Helmet is a security middleware that helps protect your Express app by setting various HTTP headers.

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    })

);
                  

//reteLimite limits users access in a website 
const limiter = rateLimit({
    windowMs:15*60*1000, //time
    max:100, // in 15 min user can send req only 100 times
    message:"Too many requests from this IP, please try agian after some time"
})

app.use(limiter);


//if user sends bigger file then 10mb then the server will not accept it .
app.use(express.json({ limit: "10mb" }));


const API_KEY=process.env.NEBIUS_API_KEY;


//code from nebius
const client = new OpenAI({
    baseURL: 'https://api.tokenfactory.nebius.com/v1/',
    apiKey: API_KEY,
});


 
//app.post() is used when we want to SEND data to the server.
app.post("/api/explain-code",async (req, res)=>{
        
    try{ 
        const{code,language }=req.body;

        if(!code){
            return res.status(400).json({
                error:"Code is required."
            });

        }                                 

        const messages=[ 
            {
                role:"user",
                content:`Please explain this ${
                    language||""
                }code in simple terms :\n\n\`\`\`${language || ""}\n${code}\n\`\`\``,
            }              
        ];

        const response= await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages,      //This is the actual input you are sending to the AI.
            temperature:0.3, //"Creativity Dial." It usually ranges from 0 to 1.
            max_tokens:800, //okens are basically pieces of words. 800 tokens is roughly equivalent to 600 words.
        });



        const explanation = response?.choices[0]?.message?.content; //Dig through the AI's complex response package to find and save the specific text of the first answer.

        if(!explanation){
            return res.status(500).json({error:"Failed to explain code."});
        }


        res.json({explanation,language: language || "unknown"}); //This line sends a JSON response back to the user containing the AI's explanation and the detected language (or "unknown" if the language is missing).


    }catch(err){
       console.error("Code Explain API Error:",err);
       res.status(500).json({
        error:"Server error",
        details:err.message
    }); //500 server crashed
    }
});


const PORT = process.env.PORT || 3002; 

app.listen(PORT,()=>{
    console.log(`API server listening on http://localhost:${PORT}`);
})

