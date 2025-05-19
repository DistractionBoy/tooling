import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const tips = [
  {
    title: "Temperature Control",
    description:
      "Maintain a consistent temperature between 225-250°F (107-121°C) for most meats. Use a good quality thermometer to monitor both the grill and meat temperature.",
    icon: "🌡️",
  },
  {
    title: "Wood Selection",
    description:
      "Choose the right wood for your meat. Hickory and oak are great for beef, while fruit woods like apple and cherry work well with pork and poultry.",
    icon: "🪵",
  },
  {
    title: "The 3-2-1 Method",
    description:
      "For perfect ribs: 3 hours unwrapped, 2 hours wrapped in foil, 1 hour unwrapped with sauce. This creates tender, fall-off-the-bone ribs.",
    icon: "⏱️",
  },
  {
    title: "Rest Your Meat",
    description:
      "Always let your meat rest for 10-15 minutes after cooking. This allows the juices to redistribute, making your meat more tender and juicy.",
    icon: "⏳",
  },
  {
    title: "Clean Your Grill",
    description:
      "Keep your grill grates clean and oiled. This prevents sticking and ensures even cooking. Clean while the grill is hot for easier maintenance.",
    icon: "🧹",
  },
];

interface Contributor {
  id: number;
  name: string;
  email: string;
}

const fetcher = async (url: string): Promise<Contributor[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch contributors");
  }
  return res.json();
};

export default function Tips() {
  const {
    data: contributors,
    error,
    isLoading,
  } = useSWR<Contributor[]>("/api/contributors", fetcher);

  return (
    <>
      <Head>
        <title>BBQ Tips - Next.js App</title>
        <meta name="description" content="Essential barbecue cooking tips" />
      </Head>

      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 pt-6 text-blue-500">
            <h1 className="text-4xl font-bold text-foreground">BBQ Tips</h1>
            <Link href="/" className="text-sm text-foreground hover:underline">
              ← Back to Home
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow xl:bg-slate-500"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{tip.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-foreground">
                      {tip.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              BBQ Tips Contributors
            </h2>
            {isLoading && (
              <p className="text-gray-600 dark:text-gray-300">
                Loading contributors...
              </p>
            )}
            {error && (
              <p className="text-red-500">Failed to load contributors</p>
            )}
            {contributors && (
              <div className="grid gap-4 md:grid-cols-2">
                {contributors.map((contributor) => (
                  <div
                    key={contributor.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      {contributor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {contributor.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {contributor.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
