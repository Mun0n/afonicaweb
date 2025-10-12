# Scripts

This directory contains scripts for updating the band website with new reviews.

## Available Scripts

### 1. Band Context Updater (`update-band-context.js`)
Updates the BandContext.tsx file with new reviews.

**Usage:**
```bash
npm run update
```

**Features:**
- Merges new reviews with existing ones
- Prevents duplicates
- Updates both BandContext.tsx and ReviewsMap.tsx

### 2. Manual Review Entry (`manual-review-entry.js`)
Allows manual entry of reviews.

**Usage:**
```bash
npm run manual
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add reviews manually to the BandContext.tsx file
3. Update the website:
```bash
npm run update
```

## Manual Review Entry

To add reviews manually:

1. Open `src/context/BandContext.tsx`
2. Add new review objects to the `reviews` array
3. Run `npm run update` to update the map coordinates