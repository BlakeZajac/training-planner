## API

training-planner/
├── .env.example              # Example environment variables for documentation
├── app/                      # App Router pages
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── dashboard/            # Dashboard route
│   │   └── page.tsx
│   ├── auth/                 # Auth-related routes
│   │   ├── callback/         # Strava OAuth callback
│   │   │   │   └── page.tsx
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── profile/          # User profile
│   │   │   └── page.tsx
│   │   ├── plans/            # Training plans
│   │   │   ├── page.tsx      # Plans overview
│   │   │   └── [planId]/     # Specific plan
│   │   │       └── page.tsx
│   │   └── api/              # API routes
│   │       ├── auth/         # Auth-related API routes
│   │       │   ├── strava/   # Strava auth endpoints
│   │       │   │   ├── route.ts
│   │       │   │   └── callback/
│   │       │   │       └── route.ts
│   │       │   └── refresh/  # Token refresh endpoint
│   │       │       └── route.ts
│   │       ├── strava/       # Strava data endpoints
│   │       │   ├── activities/
│   │       │   │   └── route.ts
│   │       │   └── athlete/
│   │       │       └── route.ts
│   │       └── plans/        # Training plan endpoints
│   │           └── route.ts
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Basic UI components
│   │   ├── auth/             # Auth-related components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── plans/            # Training plan components
│   │   └── nutrition/        # Nutrition-related components
│   ├── lib/                  # Utility functions and libraries
│   │   ├── strava/           # Strava API utilities
│   │   │   ├── api.ts        # Strava API client
│   │   │   ├── auth.ts       # Strava authentication utilities
│   │   │   └── types.ts      # Strava data types
│   │   ├── firebase/         # Firebase utilities
│   │   │   ├── config.ts     # Firebase configuration
│   │   │   ├── db.ts         # Firestore utilities
│   │   │   └── auth.ts       # Firebase auth utilities
│   │   ├── plans/            # Training plan generation logic
│   │   │   ├── generator.ts  # Plan generation algorithms
│   │   │   └── templates.ts  # Plan templates
│   │   └── nutrition/        # Nutrition calculation utilities
│   │       └── calculator.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useStrava.ts      # Strava data hook
│   │   └── usePlans.ts       # Training plans hook
│   ├── types/                # TypeScript type definitions
│   │   ├── strava.ts         # Strava data types
│   │   ├── user.ts           # User data types
│   │   └── plans.ts          # Training plan types
│   ├── context/              # React context providers
│   │   ├── AuthContext.tsx   # Authentication context
│   │   └── PlanContext.tsx   # Training plan context
└── firebase/                 # Firebase configuration (optional)
    └── firebaseConfig.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
