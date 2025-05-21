# BUD Calculator

A modern web application for calculating Beyond Use Dates (BUDs) in pharmaceutical compounding based on USP guidelines.

![BUD Calculator Screenshot](/placeholder.svg?height=400&width=800&query=screenshot%20of%20a%20pharmaceutical%20beyond%20use%20date%20calculator%20web%20application)

## Overview

The BUD Calculator is a tool designed for pharmacists and pharmacy technicians to quickly determine appropriate beyond-use dates for compounded preparations. It follows USP <795> and <797> guidelines for non-sterile and sterile preparations, respectively.

## Features

- **Intuitive Date Selection**: Easy-to-use date picker with quick date options (Today, Yesterday, Last Week, Last Month)
- **Multiple Calculation Methods**:
  - Standard USP guideline-based calculations
  - Custom day calculations for special cases
- **Comprehensive Preparation Categories**:
  - Non-sterile solid preparations
  - Non-sterile liquid preparations
  - Sterile preparations
- **Storage Condition Options**:
  - Room temperature (20-25°C)
  - Refrigerated (2-8°C)
  - Frozen (-25 to -10°C)
- **Detailed Results**:
  - Clear display of preparation and beyond-use dates
  - Explanatory notes citing relevant USP guidelines
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/bud-calculator.git
   cd bud-calculator
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage Guide

1. **Select Preparation Date**:
   - Use the date input field to select when the preparation was compounded
   - Alternatively, use the quick date buttons (Today, Yesterday, etc.)

2. **Choose Calculation Method**:
   - **Standard USP Guidelines**: Uses official USP <795> and <797> guidelines
   - **Custom Days**: Allows you to specify a custom number of days

3. **For Standard Calculations**:
   - Select the appropriate preparation category
   - Choose the storage condition

4. **For Custom Calculations**:
   - Enter the desired number of days or use preset buttons

5. **Calculate**:
   - Click the "Calculate Beyond Use Date" button to generate results

6. **Review Results**:
   - The calculated beyond-use date will be displayed
   - Notes explaining the calculation basis are provided

## Technical Details

This application is built with:

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive, utility-first styling
- **Shadcn UI**: Component library for consistent design
- **date-fns**: Modern JavaScript date utility library

## USP Guidelines

The calculator follows the United States Pharmacopeia (USP) guidelines:

- **USP <795>**: For non-sterile pharmaceutical compounding
- **USP <797>**: For sterile pharmaceutical compounding

These guidelines provide standards for determining beyond-use dates based on preparation type, storage conditions, and other factors.

> **Important Note**: This calculator provides general guidance based on USP standards. Always refer to current USP guidelines, consider the stability of specific ingredients, and use professional judgment when assigning BUDs.

## Disclaimer

This tool is provided for informational purposes only. The calculated beyond-use dates are based on general guidelines and may not account for all factors that could affect the stability or safety of a specific compounded preparation. Professional judgment should always be exercised when determining appropriate beyond-use dates.

## Credits

A project by [Eric Treacy](https://etreacy.me)

## License

[MIT License](LICENSE)
