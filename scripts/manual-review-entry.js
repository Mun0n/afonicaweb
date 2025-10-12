#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

class ManualReviewEntry {
  constructor() {
    this.reviews = [];
  }

  async addReview() {
    console.log('\n📝 Adding a new review...');
    
    const businessName = await question('Business name: ');
    const businessUrl = await question('Google Maps URL: ');
    const rating = await question('Rating (1-5): ');
    const content = await question('Review content: ');
    const date = await question('Date (YYYY-MM-DD): ');
    const location = await question('Location: ');
    const reviewUrl = await question('Review URL (optional): ');
    
    const review = {
      businessName,
      businessUrl,
      rating: parseInt(rating) || 5,
      content,
      date,
      location,
      reviewUrl: reviewUrl || businessUrl
    };
    
    this.reviews.push(review);
    console.log(`✅ Added review for ${businessName}`);
  }

  async run() {
    console.log('🎯 Manual Review Entry Tool');
    console.log('Add all your Google Reviews manually\n');
    
    let continueAdding = true;
    while (continueAdding) {
      await this.addReview();
      
      const answer = await question('\nAdd another review? (y/n): ');
      continueAdding = answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
    }
    
    // Save to scraped reviews file
    const outputFile = path.join(__dirname, '../src/data/scrapedReviews.json');
    const output = {
      scrapedAt: new Date().toISOString(),
      totalReviews: this.reviews.length,
      reviews: this.reviews
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    console.log(`\n✅ Saved ${this.reviews.length} reviews to ${outputFile}`);
    
    rl.close();
  }
}

const entry = new ManualReviewEntry();
entry.run().catch(console.error);
