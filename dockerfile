FROM node:22.21.1-alpine

# Create and use /app directory
WORKDIR /app

# Required system dependency
# RUN apt-get install --no-cache libc6-compat

# Enable and activate pnpm
# RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only dependency files from app directory
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN npm --version

# Install dependencies
RUN npm install --frozen-lockfile

# Copy app source
COPY . .

# Expose Next.js dev port
EXPOSE 3000


# IMPORTANT: run with pnpm, not npm
CMD ["pnpm", "dev"]


# Hello,

# I would like to ask about a UAE transit/visit visa for my trip.

# Nationality: Pakistani

# Arrival flight: Aeroflot from Moscow to Dubai Al Maktoum (DWC)

# Departure flight with Air Arabia: Sharjah (SHJ) to Karachi

# Date of travel: 09 November, 2026

# Time between arrival at DWC and departure from SHJ: 20+ hours

# Because I arrive at Al Maktoum airport and then need to travel by road to Sharjah airport for my Air Arabia flight, I need to know:

# Can Air Arabia sponsor a 48‑hour or 96‑hour transit visa, or a short visit visa, for me in this situation (different arrival airport and departure airport)?

# If yes, what are the exact requirements, fees, and process for Pakistani passport holders, and where should I apply (online or by email)?

# If a transit visa is not possible, can you please advise what type of visa I need to use my Air Arabia ticket from Sharjah?

# Thank you very much for your help.