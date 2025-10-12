#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const SCRAPED_REVIEWS_FILE = path.join(__dirname, '../src/data/scrapedReviews.json');
const BAND_CONTEXT_FILE = path.join(__dirname, '../src/context/BandContext.tsx');

class BandContextUpdater {
  constructor() {
    this.scrapedReviews = null;
    this.bandContextContent = null;
  }

  loadScrapedReviews() {
    if (!fs.existsSync(SCRAPED_REVIEWS_FILE)) {
      throw new Error(`Scraped reviews file not found: ${SCRAPED_REVIEWS_FILE}`);
    }
    
    const data = JSON.parse(fs.readFileSync(SCRAPED_REVIEWS_FILE, 'utf8'));
    this.scrapedReviews = data.reviews;
    console.log(`📖 Loaded ${this.scrapedReviews.length} scraped reviews`);
  }

  loadBandContext() {
    this.bandContextContent = fs.readFileSync(BAND_CONTEXT_FILE, 'utf8');
    console.log('📖 Loaded BandContext.tsx');
  }

  convertToReviewObject(scrapedReview) {
    return {
      businessName: scrapedReview.businessName,
      businessUrl: scrapedReview.businessUrl,
      rating: scrapedReview.rating,
      content: scrapedReview.content,
      date: scrapedReview.date,
      location: scrapedReview.location,
      reviewUrl: scrapedReview.reviewUrl
    };
  }

  updateBandContext() {
    console.log('🔄 Updating BandContext.tsx with new reviews...');
    
    // Convert scraped reviews to the format expected by BandContext
    const newReviews = this.scrapedReviews.map(review => this.convertToReviewObject(review));
    
    // Find the reviews array in the BandContext
    const reviewsArrayRegex = /reviews:\s*\[([\s\S]*?)\]/;
    const match = this.bandContextContent.match(reviewsArrayRegex);
    
    if (!match) {
      throw new Error('Could not find reviews array in BandContext.tsx');
    }
    
    // Get existing reviews to avoid duplicates
    const existingReviews = this.extractExistingReviews();
    const allReviews = [...existingReviews, ...newReviews];
    
    // Remove duplicates based on businessName
    const uniqueReviews = allReviews.filter((review, index, self) => 
      index === self.findIndex(r => r.businessName === review.businessName)
    );
    
    // Generate the new reviews array
    const reviewsArrayContent = uniqueReviews.map(review => {
      return `      {
        businessName: "${review.businessName}",
        businessUrl: "${review.businessUrl}",
        rating: ${review.rating},
        content: ${JSON.stringify(review.content)},
        date: "${review.date}",
        location: "${review.location}",
        reviewUrl: "${review.reviewUrl}"
      }`;
    }).join(',\n');
    
    // Replace the reviews array
    const newBandContextContent = this.bandContextContent.replace(
      reviewsArrayRegex,
      `reviews: [\n${reviewsArrayContent}\n    ]`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(BAND_CONTEXT_FILE, newBandContextContent);
    console.log(`✅ Updated BandContext.tsx with ${uniqueReviews.length} total reviews (${newReviews.length} new)`);
  }

  extractExistingReviews() {
    // For now, return empty array to avoid memory issues
    // In production, you'd want to parse existing reviews properly
    console.log('⚠️  Skipping existing reviews extraction to avoid memory issues');
    return [];
  }

  updateReviewsMap() {
    console.log('🗺️ Updating ReviewsMap.tsx with new coordinates...');
    
    const reviewsMapFile = path.join(__dirname, '../src/components/ReviewsMap.tsx');
    let reviewsMapContent = fs.readFileSync(reviewsMapFile, 'utf8');
    
    // Extract coordinates from scraped reviews
    const coordinates = {};
    this.scrapedReviews.forEach(review => {
      if (review.coordinates) {
        coordinates[review.businessName] = review.coordinates;
      }
    });
    
    // Update the knownLocations object
    const knownLocationsRegex = /const knownLocations: Record<string, \[number, number\]> = \{([\s\S]*?)\};/;
    const match = reviewsMapContent.match(knownLocationsRegex);
    
    if (match) {
      const newKnownLocations = Object.entries(coordinates)
        .map(([name, coords]) => `    '${name}': [${coords[0]}, ${coords[1]}]`)
        .join(',\n');
      
      const newKnownLocationsContent = `const knownLocations: Record<string, [number, number]> = {
${newKnownLocations}
  };`;
      
      reviewsMapContent = reviewsMapContent.replace(knownLocationsRegex, newKnownLocationsContent);
      
      fs.writeFileSync(reviewsMapFile, reviewsMapContent);
      console.log('✅ Updated ReviewsMap.tsx with new coordinates');
    }
  }

  async run() {
    try {
      console.log('🚀 Starting BandContext update process...');
      
      this.loadScrapedReviews();
      this.loadBandContext();
      this.updateBandContext();
      this.updateReviewsMap();
      
      console.log('\n🎉 BandContext update completed successfully!');
      console.log(`📊 Updated with ${this.scrapedReviews.length} reviews`);
      console.log('📁 Files updated:');
      console.log('   - src/context/BandContext.tsx');
      console.log('   - src/components/ReviewsMap.tsx');
      
    } catch (error) {
      console.error('❌ Error during update:', error);
      throw error;
    }
  }
}

// Run the updater
if (require.main === module) {
  const updater = new BandContextUpdater();
  updater.run().catch(console.error);
}

module.exports = BandContextUpdater;
