# Project Context

## Overview
Afónica Naranjo's official website, built with Next.js 14. The site serves as the band's digital hub, featuring their music, shows, merchandise, and latest updates.

## Current State
- Next.js 14 application with TypeScript
- Vercel deployment with automatic builds
- SEO optimization implemented
- Analytics tracking in place
- Basic layout structure with fixed toolbar
- Social media integration with correct URLs
- Section-based navigation with smooth scrolling
- CSS optimization with critters
- Mobile-responsive design
- PrestaShop store at **shop.afonicanaranjo.com** with **Afonica Dark** child theme (v1.2.5)
- Theme source in `public/shop/theme-src/`; build via `public/shop/build-theme.sh`
- Theme docs: [`public/shop/README.md`](public/shop/README.md)

## Technical Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Icons**: React Icons
- **Image Optimization**: Next/Image
- **CSS Optimization**: Critters

## Design Principles
- Mobile-first responsive design
- Fast loading and performance
- Clean and modern UI
- Brand consistency
- Accessible navigation
- Smooth scrolling behavior
- Brand-colored hover states

## Development Practices
- Git version control
- Component-based architecture
- Responsive design
- SEO best practices
- Performance optimization
- Accessibility considerations
- Automated deployments

## Infrastructure
- Vercel hosting
- GitHub repository
- Automatic deployments
- Environment variables management
- CDN for static assets
- CSS optimization

## PrestaShop store
- **URL:** https://shop.afonicanaranjo.com
- **Theme:** Afonica Dark child of Classic (PrestaShop 8.1.x)
- **Import artifact:** `public/shop/afonica-child-theme.zip` (also on CDN at `/shop/afonica-child-theme.zip`)
- **Home products:** `ps_featuredproducts` → category **Camisetas** (id `3`), set in `theme.yml` as `HOME_FEATURED_CAT`
- **Do not use:** `afonica-dark-child-theme.zip` (obsolete)

## Next Steps
1. Implement main content sections
2. Deeper main-site ↔ PrestaShop integration (cart embed, product sync API)
3. Create shows/concerts section
4. Develop media gallery
5. Add contact functionality
6. Set up custom domain