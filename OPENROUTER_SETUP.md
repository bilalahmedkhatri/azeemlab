# OpenRouter AI Setup Guide

## 🎯 Quick Start

Your chatbot is now integrated with OpenRouter AI for powerful conversational AI!

---

## 📋 Setup Steps

### 1. Get Your OpenRouter API Key

1. Visit **https://openrouter.ai/**
2. Sign up or log in
3. Go to **https://openrouter.ai/keys**
4. Click "Create Key"
5. Copy your API key

### 2. Configure Environment Variables

Open `.env.local` and update:

```bash
# OpenRouter API Key (REQUIRED)
OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here

# Model to use (FREE models available)
OPENROUTER_MODEL=meta-llama/llama-3.2-3b-instruct:free

# Your site information
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AzeemLab
```

### 3. Restart Development Server

```bash
npm run dev
```

---

## 🆓 Free Models Available

OpenRouter offers several free models you can use:

| Model | Description | Best For |
|-------|-------------|----------|
| `meta-llama/llama-3.2-3b-instruct:free` | Fast, efficient, good quality | General chatbot (Recommended) |
| `google/gemini-flash-1.5` | Google's fast model | Quick responses |
| `qwen/qwen-2-7b-instruct:free` | Larger model, better understanding | Complex queries |
| `nousresearch/hermes-3-llama-3.1-405b:free` | Very capable model | Advanced conversations |

**To change models**, update `OPENROUTER_MODEL` in `.env.local`

---

## 🎨 Features Implemented

### Conversation History
- ✅ Chatbot remembers last 10 messages
- ✅ Context-aware responses
- ✅ Natural conversation flow

### System Prompt
The AI is configured with knowledge about:
- AzeemLab services (Web Design, SEO, E-commerce)
- Portfolio results (160% engagement, 267% mobile conversions)
- Pricing (starting from $2,999)
- Project timelines (2-8 weeks)
- Technologies (Next.js, React, Node.js)

### Error Handling
- ✅ API key validation
- ✅ Network error handling
- ✅ User-friendly error messages

---

## 🧪 Testing Your Chatbot

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open your site:**
   ```
   http://localhost:3000
   ```

3. **Click the chatbot icon** (bottom right)

4. **Try these test messages:**
   - "What services do you offer?"
   - "Show me your portfolio"
   - "What's your pricing?"
   - "How long does a project take?"
   - "What technologies do you use?"

---

## 💻 How It Works

### API Endpoint: `/api/chat/route.ts`

```typescript
// Sends message to OpenRouter
POST https://openrouter.ai/api/v1/chat/completions

Headers:
- Authorization: Bearer {API_KEY}
- HTTP-Referer: {SITE_URL}
- X-Title: {SITE_NAME}

Body:
{
  "model": "meta-llama/llama-3.2-3b-instruct:free",
  "messages": [
    { "role": "system", "content": "System prompt..." },
    { "role": "user", "content": "User message" },
    { "role": "assistant", "content": "Bot response" },
    ...
  ],
  "max_tokens": 500,
  "temperature": 0.7
}
```

### Chatbot Component: `ChatbotWindow.tsx`

```typescript
// Sends conversation history for context
fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: userMessage,
    history: messages.slice(-10) // Last 10 messages
  })
})
```

---

## ⚙️ Configuration Options

### Adjust Response Length

In `src/app/api/chat/route.ts`:

```typescript
body: JSON.stringify({
  model: model,
  messages: messages,
  max_tokens: 500,  // Change this (100-2000)
  temperature: 0.7, // Creativity (0.0-1.0)
})
```

- **max_tokens:** 100 = short, 500 = medium, 1000 = long
- **temperature:** 0.0 = focused, 0.7 = balanced, 1.0 = creative

### Change Conversation History Length

In `src/components/chatbot/ChatbotWindow.tsx`:

```typescript
history: messages.slice(-10) // Change -10 to -5, -20, etc.
```

### Customize System Prompt

In `src/app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `Your custom instructions here...`;
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep your API key in `.env.local`
- Add `.env.local` to `.gitignore`
- Use environment variables
- Set rate limits (optional)

### ❌ DON'T:
- Commit API keys to Git
- Expose keys in client-side code
- Share your `.env.local` file

---

## 💰 Pricing & Credits

### Free Tier
- OpenRouter offers **free credits** for new users
- Free models have **no cost**
- Check balance: https://openrouter.ai/credits

### Paid Models
If you want to use premium models like GPT-4:
1. Add credits to your account
2. Change model in `.env.local`:
   ```bash
   OPENROUTER_MODEL=openai/gpt-4-turbo
   ```

### Cost Monitoring
- View usage: https://openrouter.ai/activity
- Set spending limits in your OpenRouter dashboard

---

## 🐛 Troubleshooting

### "API key not configured" Error

**Solution:** Add your API key to `.env.local`
```bash
OPENROUTER_API_KEY=sk-or-v1-your-actual-key
```

### "Unauthorized" Error

**Solution:** Check your API key is valid
- Visit https://openrouter.ai/keys
- Regenerate key if needed

### Slow Responses

**Solutions:**
1. Try a faster model:
   ```bash
   OPENROUTER_MODEL=google/gemini-flash-1.5
   ```
2. Reduce max_tokens:
   ```typescript
   max_tokens: 200
   ```

### Out of Credits

**Solutions:**
1. Use free models only
2. Add credits to your account
3. Check usage limits

---

## 📊 Advanced Features (Optional)

### Add Streaming Responses

For real-time typing effect:

```typescript
// In route.ts
body: JSON.stringify({
  model: model,
  messages: messages,
  stream: true // Enable streaming
})
```

### Add Rate Limiting

Prevent abuse:

```typescript
// In route.ts
import rateLimit from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  await rateLimit(req); // Check rate limit
  // ... rest of code
}
```

### Multiple AI Models

Let users choose:

```typescript
// Add model selector in chatbot UI
const model = userPreference || 'meta-llama/llama-3.2-3b-instruct:free';
```

---

## 📚 Resources

- **OpenRouter Docs:** https://openrouter.ai/docs
- **Available Models:** https://openrouter.ai/models
- **API Keys:** https://openrouter.ai/keys
- **Usage Stats:** https://openrouter.ai/activity
- **Pricing:** https://openrouter.ai/docs#models

---

## 🎉 You're All Set!

Your chatbot is now powered by AI! Test it out and adjust the configuration to your needs.

**Next Steps:**
1. ✅ Add your OpenRouter API key
2. ✅ Test the chatbot
3. ✅ Customize system prompt
4. ✅ Deploy to production

For support, visit https://openrouter.ai/docs
