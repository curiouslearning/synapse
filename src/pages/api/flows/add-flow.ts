import { NextApiRequest, NextApiResponse } from 'next';
import { adminDB } from '../../../config/firebaseAdmin'; // Adjust the import path as needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { AppFlowEntry } from '@/pages/dashboard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { flow }: { flow: AppFlowEntry } = req.body;

    const docRef = adminDB.collection('ContentMover').doc('appFlowsDoc');
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      let appFlows = data?.appFlows || [];
      
      // Check if flow with the same id already exists
      const existingFlowIndex = appFlows.findIndex((f: any) => f.id === flow.id);
      
      if (existingFlowIndex !== -1) {
        // Update existing flow
        appFlows[existingFlowIndex] = flow;
      } else {
        // Add new flow
        appFlows.push(flow);
      }

      await docRef.update({ appFlows });
    } else {
      // If document doesn't exist, create it with the new flow
      await docRef.set({ appFlows: [flow] });
    }

    res.status(200).json({ message: 'Flow added/updated successfully' });
  } catch (error) {
    console.error('Error adding/updating flow:', error);
    res.status(500).json({ error: 'Failed to add/update flow' });
  }
}
