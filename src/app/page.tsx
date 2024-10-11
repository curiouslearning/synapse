"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";
import { AppFlowEntry, NextEntry } from "@/pages/dashboard";
import { redirect } from "next/dist/server/api-utils";

interface Props {
  selectedEntry: AppFlowEntry;
  initialURL: string;
}

export default function Home() {
  // const [currentlyOpenAssessmentURL, setCurrentlyOpenAssessmentURL] = useState<string | null>(initialURL);
  const currentURLIndex = useRef<number>(0);

  useEffect(() => {
    // if (initialURL.includes('google')) {
    //   window.location.href = initialURL;
    //   return;
    // }

    // const handleMessage = (event: any) => {
    //   if (event.origin !== 'http://127.0.0.1:8080') {
    //     return;
    //   }
    //   const { type, score } = event.data;
    //   console.log('Type', type);
    //   console.log('Score', score);

    //   if (score > selectedEntry.flow[currentURLIndex.current].conditional) {
    //     if (currentURLIndex.current + 1 < selectedEntry.flow.length) {
    //       currentURLIndex.current = currentURLIndex.current + 1; // Move to the next entry
    //       const nextURL = selectedEntry.flow[currentURLIndex.current]?.url; // Assuming next entry is at index 1
    //       if (nextURL) {
    //         setCurrentlyOpenAssessmentURL(nextURL);
    //       }
    //     }
    //   }
    // };

    // window.addEventListener('message', handleMessage);

    // return () => {
    //   window.removeEventListener('message', handleMessage);
    // };
  }, []);

  return (
    <main className="flex min-h-screen bg-[#3d85d1]">
      {/* <iframe src={currentlyOpenAssessmentURL!} className="min-w-full min-h-full" /> */}
    </main>
  );
}

// export async function fetchEntries(): Promise<AppFlowEntry[]> {
//   const filePath = path.join(process.cwd(), 'data', 'app-flows.json');
//   const jsonData = fs.readFileSync(filePath, 'utf-8');
//   const entries: AppFlowEntry[] = JSON.parse(jsonData);
//   return entries;
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { flow } = context.query;
//   const entries = await fetchEntries();

//   const selectedEntry = entries.find(entry => entry.id === flow);

//   if (!selectedEntry) {
//     return {
//       notFound: true,
//     };
//   }

//   const initialURL = selectedEntry.flow[0]?.url || '';

//   return {
//     props: {
//       selectedEntry,
//       initialURL,
//     },
//   };
// };
