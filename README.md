# AzeemLab - Modern Agency Website

A professional, modern agency website built with Next.js 16, React 19, and Tailwind CSS v4. This website showcases digital agency services with a clean, minimalist design and comprehensive features.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 with App Router, React 19, TypeScript, and Tailwind CSS v4
- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Dynamic Routes**: Automatic static generation for service and portfolio pages
- **SEO Optimized**: Server-side rendering and metadata configuration
- **Performance**: Optimized with React Server Components and static generation
- **Type Safety**: Full TypeScript implementation

## 📁 Project Structure

```
azeemlab/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/             # About Us page
│   │   ├── contact/           # Contact page with form
│   │   ├── portfolio/         # Portfolio with case studies
│   │   │   └── [slug]/       # Dynamic case study pages
│   │   ├── privacy/           # Privacy Policy
│   │   ├── services/          # Services listing
│   │   │   └── [slug]/       # Dynamic service detail pages
│   │   ├── terms/             # Terms of Service
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── layout/            # Header & Footer
│   │   ├── sections/          # Home page sections
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   └── data.ts            # Sample data (services, case studies, team)
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   └── styles/
│       └── globals.css        # Global styles and CSS variables
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## 🎨 Design System

### Colors
- **Accent**: Vibrant teal (#0891b2) for CTAs and highlights
- **Neutral Dark**: Deep charcoal (#1a202c) for text
- **Neutral Light**: Soft off-white (#f7fafc) for backgrounds

### Typography
- **Headings**: Poppins (weights 400-800)
- **Body**: Inter (weights 400-800)

### Components
- **Button**: Primary, secondary, and outline variants
- **Card**: Hover effects with shadow and transform
- **Form Inputs**: Input, TextArea, and Select with consistent styling

## 📄 Pages

### Home (`/`)
- Hero section with CTAs
- Services overview (4 services)
- Featured portfolio item
- About section
- Call-to-action section

### Services (`/services`)
- Service listing grid
- Individual service pages with:
  - Problem/solution statements
  - Process steps
  - Pricing tiers
  - Feature lists

### Portfolio (`/portfolio`)
- Filterable case study grid
- Individual case study pages with:
  - Challenge description
  - Solution approach
  - Quantifiable results
  - Client testimonials

### About Us (`/about`)
- Company story and philosophy
- Team member profiles (4 members)
- Core values (4 values)
- Process overview (4-step flow)

### Contact (`/contact`)
- Contact form with validation
- Contact information (email, phone, location)
- Office hours
- Social media links

### Legal
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

### Error Page
- Custom 404 page (`not-found.tsx`)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📊 Sample Data

The website includes sample data in `src/lib/data.ts`:
- **4 Services**: Web Design, Branding, SEO, E-Commerce
- **3 Case Studies**: TechStart Rebrand, GreenLife E-Commerce, LawFirm SEO
- **4 Team Members**: With bios and social links

Replace this data with your actual content.

## 🎯 Key Features by Page

### Dynamic Routes
- Service pages: `/services/web-design`, `/services/branding`, etc.
- Case studies: `/portfolio/techstart-rebrand`, `/portfolio/greenlife-ecommerce`, etc.

### Forms
- Contact form with client-side validation
- Success/error state management
- Form fields: Name, Email, Project Type, Message

### Navigation
- Fixed header with mobile menu
- Footer with sitemap and social links
- Breadcrumbs on detail pages

## 🔧 Customization

### Update Brand Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  accent: '#YOUR_COLOR',
  'accent-dark': '#YOUR_DARKER_COLOR',
  // ...
}
```

### Add New Services
Edit `src/lib/data.ts` and add to the `services` array:
```typescript
{
  id: 'new-service',
  title: 'Service Name',
  slug: 'service-slug',
  // ... other fields
}
```

### Modify Layout
- Header: `src/components/layout/Header.tsx`
- Footer: `src/components/layout/Footer.tsx`
- Root layout: `src/app/layout.tsx`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
Build the static site:
```bash
pnpm build
```

Deploy the `.next` folder to your hosting provider.

## 📝 Environment Variables

Create a `.env.local` file for environment-specific variables:
```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🤝 Contributing

This is a template project. Feel free to customize and extend it for your needs.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Inter, Poppins)
- **Icons**: Heroicons (embedded SVGs)

---

**Built with ❤️ using Next.js and Tailwind CSS**
