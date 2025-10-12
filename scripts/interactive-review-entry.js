#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// File paths
const BAND_CONTEXT_FILE = path.join(__dirname, '../src/context/BandContext.tsx');
const REVIEWS_MAP_FILE = path.join(__dirname, '../src/components/ReviewsMap.tsx');

class InteractiveReviewEntry {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.bandContextContent = '';
    this.reviewsMapContent = '';
  }

  async loadFiles() {
    console.log('📖 Loading files...');
    this.bandContextContent = fs.readFileSync(BAND_CONTEXT_FILE, 'utf8');
    this.reviewsMapContent = fs.readFileSync(REVIEWS_MAP_FILE, 'utf8');
    console.log('✅ Files loaded successfully');
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async getReviewData() {
    console.log('\n📝 Enter review information:');
    console.log('(Press Enter to skip optional fields)\n');

    const businessName = await this.askQuestion('Business Name: ');
    if (!businessName) {
      console.log('❌ Business name is required');
      return null;
    }

    const businessUrl = await this.askQuestion('Business URL (Google Maps): ');
    const rating = await this.askQuestion('Rating (1-5, default 5): ') || '5';
    const content = await this.askQuestion('Review content: ');
    const date = await this.askQuestion('Date (YYYY-MM-DD, default today): ') || new Date().toISOString().split('T')[0];
    const location = await this.askQuestion('Location (Address, City, Province): ');
    const reviewUrl = await this.askQuestion('Review URL (optional): ') || businessUrl;

    return {
      businessName,
      businessUrl: businessUrl || '',
      rating: parseInt(rating) || 5,
      content: content || `Review for ${businessName}`,
      date,
      location: location || '',
      reviewUrl: reviewUrl || businessUrl || ''
    };
  }

  async confirmReview(review) {
    console.log('\n📋 Review Summary:');
    console.log(`Business: ${review.businessName}`);
    console.log(`Rating: ${review.rating}/5`);
    console.log(`Date: ${review.date}`);
    console.log(`Location: ${review.location}`);
    console.log(`Content: ${review.content.substring(0, 100)}${review.content.length > 100 ? '...' : ''}`);
    console.log(`URL: ${review.businessUrl}`);

    const confirm = await this.askQuestion('\n✅ Add this review? (y/n): ');
    return confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes';
  }

  updateBandContext(review) {
    console.log('🔄 Updating BandContext.tsx...');
    
    // Find the reviews array
    const reviewsArrayRegex = /reviews:\s*\[([\s\S]*?)\]/;
    const match = this.bandContextContent.match(reviewsArrayRegex);
    
    if (!match) {
      throw new Error('Could not find reviews array in BandContext.tsx');
    }
    
    // Get existing reviews
    const existingReviews = this.extractExistingReviews();
    const allReviews = [...existingReviews, review];
    
    // Generate the new reviews array
    const reviewsArrayContent = allReviews.map(review => {
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
    console.log(`✅ Updated BandContext.tsx with ${allReviews.length} total reviews`);
  }

  extractExistingReviews() {
    // Simple extraction - look for review objects in the array
    const reviews = [];
    const reviewRegex = /{\s*businessName:\s*"([^"]+)",[\s\S]*?}/g;
    let match;
    
    while ((match = reviewRegex.exec(this.bandContextContent)) !== null) {
      // This is a simplified extraction - in production you'd want more robust parsing
      const businessName = match[1];
      if (businessName && !businessName.includes('Business')) {
        reviews.push({ businessName });
      }
    }
    
    return reviews;
  }

  updateReviewsMap(review) {
    console.log('🔄 Updating ReviewsMap.tsx...');
    
    // Extract coordinates from URL if possible
    const coords = this.getCoordinatesFromUrl(review.businessUrl);
    if (coords) {
      // Add to knownLocations object
      const knownLocationsRegex = /const knownLocations:\s*Record<string,\s*\[number,\s*number\]>\s*=\s*{([\s\S]*?)}/;
      const match = this.reviewsMapContent.match(knownLocationsRegex);
      
      if (match) {
        const existingLocations = match[1];
        const newLocation = `\n    '${review.businessName}': [${coords[0]}, ${coords[1]}],`;
        
        const updatedLocations = existingLocations + newLocation;
        const newContent = this.reviewsMapContent.replace(
          knownLocationsRegex,
          `const knownLocations: Record<string, [number, number]> = {${updatedLocations}\n  }`
        );
        
        fs.writeFileSync(REVIEWS_MAP_FILE, newContent);
        console.log(`✅ Added coordinates for ${review.businessName}: [${coords[0]}, ${coords[1]}]`);
      }
    } else {
      console.log(`⚠️  Could not extract coordinates from URL: ${review.businessUrl}`);
    }
  }

  getCoordinatesFromUrl(url) {
    if (!url) return null;
    
    try {
      const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        return [parseFloat(coordMatch[1]), parseFloat(coordMatch[2])];
      }
      return null;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  }

  async addReview() {
    try {
      const review = await this.getReviewData();
      if (!review) return false;

      const confirmed = await this.confirmReview(review);
      if (!confirmed) {
        console.log('❌ Review not added');
        return false;
      }

      this.updateBandContext(review);
      this.updateReviewsMap(review);
      
      console.log('✅ Review added successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error adding review:', error);
      return false;
    }
  }

  async run() {
    console.log('🎵 Interactive Review Entry for Afónica Naranjo');
    console.log('===============================================\n');

    await this.loadFiles();

    let continueAdding = true;
    let reviewCount = 0;

    while (continueAdding) {
      console.log(`\n📝 Adding review #${reviewCount + 1}`);
      const success = await this.addReview();
      
      if (success) {
        reviewCount++;
      }

      const continueAnswer = await this.askQuestion('\n🔄 Add another review? (y/n): ');
      continueAdding = continueAnswer.toLowerCase() === 'y' || continueAnswer.toLowerCase() === 'yes';
    }

    console.log(`\n🎉 Session complete! Added ${reviewCount} reviews.`);
    console.log('📁 Files updated:');
    console.log('  - src/context/BandContext.tsx');
    console.log('  - src/components/ReviewsMap.tsx');
    console.log('\n💡 Next steps:');
    console.log('  1. Test your changes locally');
    console.log('  2. Commit and push to deploy');
  }

  close() {
    this.rl.close();
  }
}

// Run the interactive review entry
if (require.main === module) {
  const entry = new InteractiveReviewEntry();
  entry.run()
    .then(() => entry.close())
    .catch(error => {
      console.error('❌ Error:', error);
      entry.close();
    });
}

module.exports = InteractiveReviewEntry;
