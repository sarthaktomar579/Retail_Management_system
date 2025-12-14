# Retail Sales Management System

A comprehensive web application for managing and analyzing retail sales data. This system provides powerful search, filtering, sorting, and pagination capabilities to help users efficiently navigate through large datasets of sales transactions. Built with React and TypeScript on the frontend, and Node.js with Express and MongoDB on the backend.

## Tech Stack

### Frontend
- **React 19** - UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for storing sales data
- **Mongoose** - MongoDB object modeling for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **csvtojson** - CSV to JSON converter for data import

### Deployment
- **Vercel** - Frontend and backend hosting platform
- **MongoDB Atlas** - Cloud database service

## Search Implementation Summary

The search functionality allows users to find sales records by customer name using a real-time search input.

**Frontend Implementation:**
- `SearchBar` component provides a text input field
- Search query is managed by the `useSalesData` hook
- Debounced search triggers API calls on user input
- Search state is synchronized with URL parameters

**Backend Implementation:**
- MongoDB regex query for case-insensitive search: `{ "Customer Name": { $regex: search, $options: "i" } }`
- Search is applied before pagination and sorting
- Returns matching records across all pages

**Features:**
- Case-insensitive search
- Real-time filtering as user types
- Works in combination with filters and sorting

## Filter Implementation Summary

Multi-criteria filtering system allows users to narrow down sales data by multiple attributes simultaneously.

**Filter Categories:**
- **Region**: North, South, East, West, Central
- **Gender**: Male, Female
- **Category**: Electronics, Clothing, Beauty
- **Payment Method**: UPI, Credit Card, Debit Card, Cash, Wallet, Net Banking

**Frontend Implementation:**
- `FilterPanel` component with checkbox-based filter groups
- Each filter category supports multiple selections
- Filter state managed in `useSalesData` hook
- Filters are combined using AND logic (all selected filters must match)

**Backend Implementation:**
- MongoDB `$in` operator for multiple value matching: `{ "Customer Region": { $in: region.split(",") } }`
- Multiple filters are combined in a single query object
- Filters are applied before pagination and sorting

**Features:**
- Multiple selections per filter category
- Real-time filtering without page reload
- Filters persist across pagination
- Can be combined with search and sorting

## Sorting Implementation Summary

Flexible sorting system allows users to organize sales data by different criteria in ascending or descending order.

**Sort Options:**
- **Amount**: Sort by transaction amount (High to Low / Low to High)
- **Date**: Sort by transaction date (Newest First / Oldest First)
- **Default**: Sorted by Transaction ID (ascending) to ensure consistent ordering

**Frontend Implementation:**
- `SortDropdown` component with select menu
- Sort options: `amount_desc`, `amount_asc`, `date_desc`, `date_asc`
- Sort state managed in `useSalesData` hook
- Sort value is passed as query parameter to API

**Backend Implementation:**
- MongoDB `sort()` method applied to query cursor
- Primary sort by selected field, secondary sort by Transaction ID for consistency
- Sorting applied before pagination
- Default sort ensures ID 1 always appears first

**Features:**
- Multiple sort criteria (Amount, Date)
- Ascending and descending order options
- Maintains consistent ordering with Transaction ID as secondary sort
- Works seamlessly with search and filters

## Pagination Implementation Summary

Efficient pagination system handles large datasets by displaying records in manageable chunks.

**Pagination Details:**
- **Page Size**: 10 records per page
- **Navigation**: Previous/Next buttons with page indicator
- **Total Pages**: Calculated based on filtered results

**Frontend Implementation:**
- `Pagination` component with Prev/Next buttons and page counter
- Page state managed in `useSalesData` hook
- Disabled states for first/last page navigation
- Page number displayed as "current / total"

**Backend Implementation:**
- MongoDB `skip()` and `limit()` methods for pagination
- `skip = (page - 1) * limit`
- Total pages calculated: `Math.ceil(total / limit)`
- Pagination applied after filtering and sorting

**Features:**
- Efficient data loading (only 10 records per request)
- Smooth navigation between pages
- Page count updates based on active filters
- Prevents navigation beyond available pages

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Import data (optional):**
   ```bash
   # Using MongoDB import tool
   mongoimport --uri "your_mongodb_uri" --collection transactions --type csv --file dataset.csv --headerline --drop
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API URL (if needed):**
   Edit `frontend/src/services/salesApi.ts` and update `API_BASE` with your backend URL.

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

### Deployment

**Backend Deployment (Vercel):**
1. Connect your GitHub repository to Vercel
2. Set root directory to `backend`
3. Add `MONGO_URI` environment variable
4. Deploy

**Frontend Deployment (Vercel):**
1. Create a new Vercel project
2. Set root directory to `frontend`
3. Update API URL in `salesApi.ts` to point to deployed backend
4. Deploy

### Project Structure

```
retail-sales-management-system/
├── backend/
│   ├── api/
│   │   └── Sale.js          # API endpoint handler
│   ├── model/
│   │   └── Sale.js          # Mongoose model
│   ├── scripts/
│   │   └── importCSV.js     # CSV import script
│   ├── src/
│   │   └── utils/
│   │       └── db.js        # Database connection
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   └── package.json
└── README.md
```

### Environment Variables

**Backend (.env):**
- `MONGO_URI` - MongoDB connection string

**Frontend:**
- Update `API_BASE` in `frontend/src/services/salesApi.ts` with your backend URL

### API Endpoints

**GET `/api/Sale`**
- Query Parameters:
  - `page` - Page number (default: 1)
  - `search` - Customer name search query
  - `sort` - Sort option (amount_desc, amount_asc, date_desc, date_asc)
  - `region` - Comma-separated regions
  - `gender` - Comma-separated genders
  - `category` - Comma-separated categories
  - `paymentMethod` - Comma-separated payment methods

- Response:
  ```json
  {
    "data": [...],
    "totalPages": 78400,
    "currentPage": 1
  }
  ```

### Troubleshooting

**Backend Issues:**
- Ensure MongoDB connection string is correct
- Check CORS settings if frontend can't connect
- Verify environment variables are set

**Frontend Issues:**
- Update API_BASE URL in salesApi.ts
- Check browser console for CORS errors
- Verify backend is running and accessible

**Data Import Issues:**
- Use `--drop` flag to clear existing data
- Ensure CSV has proper headers
- Check MongoDB free tier limits (500MB storage)

---

**Note:** This project is optimized for handling large datasets (700K+ records) with efficient pagination, filtering, and sorting capabilities.

